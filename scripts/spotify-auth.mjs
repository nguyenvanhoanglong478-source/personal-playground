import { execFileSync, spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const REDIRECT_HOST = '127.0.0.1';
const REDIRECT_PORT = 4389;
const REDIRECT_PATH = '/callback';
const REDIRECT_URI = `http://${REDIRECT_HOST}:${REDIRECT_PORT}${REDIRECT_PATH}`;
const SPOTIFY_SCOPE = 'user-read-currently-playing';
const CF_PAGES_PROJECT = 'longhoang';
const DEV_VARS_FILE = '.dev.vars';

function stripSurroundingQuotes(raw) {
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function openExternalBrowser(url) {
  try {
    if (process.platform === 'win32') {
      execFileSync('cmd', ['/c', 'start', '', url], { stdio: 'ignore' });
      return true;
    }
    if (process.platform === 'darwin') {
      execFileSync('open', [url], { stdio: 'ignore' });
      return true;
    }
    execFileSync('xdg-open', [url], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderCallbackPage(title, message, isError = false) {
  const accent = isError ? '#EA4335' : '#34A853';
  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
      background: #131314;
      color: #F8F9FA;
      font-family: system-ui, -apple-system, sans-serif;
    }
    main {
      max-width: 460px;
      width: 100%;
      padding: 28px;
      border-radius: 16px;
      background: #1E1F20;
      border: 1px solid rgba(255,255,255,0.12);
    }
    h1 {
      margin: 0 0 12px;
      font-size: 20px;
      color: ${accent};
    }
    p {
      margin: 0;
      line-height: 1.6;
      color: #D2D5DB;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <main>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(message)}</p>
  </main>
</body>
</html>`;
}

/**
 * Wait for the Spotify OAuth loopback redirect on 127.0.0.1:4389.
 * @param {string} expectedState
 * @param {string} authorizeUrl
 * @returns {Promise<string>} Authorization code
 */
function waitForAuthorizationCode(expectedState, authorizeUrl) {
  return new Promise((resolve, reject) => {
    let settled = false;
    let timeoutId = null;

    const finish = (handler, value) => {
      if (settled) return;
      settled = true;
      if (timeoutId) clearTimeout(timeoutId);
      server.close(() => handler(value));
    };

    const server = http.createServer((req, res) => {
      if (!req.url) {
        res.writeHead(400);
        res.end();
        return;
      }

      const requestUrl = new URL(req.url, `http://${REDIRECT_HOST}:${REDIRECT_PORT}`);
      if (requestUrl.pathname !== REDIRECT_PATH) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      const returnedState = requestUrl.searchParams.get('state');
      const authError = requestUrl.searchParams.get('error');
      const code = requestUrl.searchParams.get('code');

      if (authError) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(
          renderCallbackPage(
            'Không thể cấp quyền Spotify',
            `Spotify trả về lỗi: ${authError}. Bạn có thể đóng tab này và chạy lại lệnh.`,
            true
          )
        );
        finish(reject, new Error(`Spotify authorization denied: ${authError}`));
        return;
      }

      if (!code || returnedState !== expectedState) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(
          renderCallbackPage(
            'Phiên xác thực không khớp',
            'Thiếu mã code hoặc state không hợp lệ. Vui lòng đóng tab này và chạy lại script.',
            true
          )
        );
        finish(reject, new Error('Invalid OAuth callback state or missing code.'));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(
        renderCallbackPage(
          'Đã lấy mã Spotify thành công',
          'Bạn có thể đóng tab trình duyệt này và quay lại cửa sổ terminal.'
        )
      );
      finish(resolve, code);
    });

    server.on('error', (err) => {
      finish(
        reject,
        new Error(
          `Không mở được cổng callback ${REDIRECT_HOST}:${REDIRECT_PORT} (${err.message}).`
        )
      );
    });

    server.listen(REDIRECT_PORT, REDIRECT_HOST, () => {
      console.log('');
      console.log('2. Trình duyệt sẽ mở trang cấp quyền Spotify.');
      console.log('   Nếu trình duyệt không tự mở, hãy copy URL dưới đây dán vào trình duyệt:');
      console.log(`   ${authorizeUrl}`);
      console.log('');
      console.log('   Đang chờ bạn bấm "Agree" trên Spotify...');

      openExternalBrowser(authorizeUrl);

      timeoutId = setTimeout(() => {
        finish(
          reject,
          new Error('Hết thời gian chờ (5 phút) phản hồi từ trang đăng nhập Spotify.')
        );
      }, 5 * 60 * 1000);
    });
  });
}

async function exchangeCodeForTokens(clientId, clientSecret, code) {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`, 'utf8').toString('base64');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }).toString(),
  });

  const payload = await response.json();
  if (!response.ok || !payload?.refresh_token || !payload?.access_token) {
    const reason =
      payload?.error_description || payload?.error || `HTTP ${response.status}`;
    throw new Error(`Không đổi được Refresh Token từ Spotify: ${reason}`);
  }

  return {
    accessToken: String(payload.access_token),
    refreshToken: String(payload.refresh_token),
  };
}

async function testCurrentlyPlaying(accessToken) {
  const response = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 204) {
    return { reachable: true, summary: 'Kết nối OK (hiện tại Spotify đang dừng nhạc).' };
  }

  if (!response.ok) {
    return {
      reachable: false,
      summary: `Kiểm tra /currently-playing trả về HTTP ${response.status}.`,
    };
  }

  const data = await response.json();
  if (data?.is_playing && data?.item?.name) {
    const artist = Array.isArray(data.item.artists)
      ? data.item.artists.map((entry) => entry?.name).filter(Boolean).join(', ')
      : data.item.show?.name ?? '';
    return {
      reachable: true,
      summary: `Đang phát thử nghiệm: "${data.item.name}"${artist ? ` — ${artist}` : ''}`,
    };
  }

  return { reachable: true, summary: 'Kết nối OK (hiện không phát bài nào).' };
}

function writeDevVars(clientId, clientSecret, refreshToken) {
  const targetPath = path.join(process.cwd(), DEV_VARS_FILE);
  const content = [
    '# Local Cloudflare Pages Functions secrets (auto-generated, gitignored)',
    `SPOTIFY_CLIENT_ID=${clientId}`,
    `SPOTIFY_CLIENT_SECRET=${clientSecret}`,
    `SPOTIFY_REFRESH_TOKEN=${refreshToken}`,
    '',
  ].join('\n');
  fs.writeFileSync(targetPath, content, { encoding: 'utf8', mode: 0o600 });
  return targetPath;
}

function uploadSecretsToCloudflare() {
  const args = [
    'wrangler',
    'pages',
    'secret',
    'bulk',
    DEV_VARS_FILE,
    '--project-name',
    CF_PAGES_PROJECT,
  ];
  const result =
    process.platform === 'win32'
      ? spawnSync('cmd.exe', ['/c', 'npx', ...args], {
          cwd: process.cwd(),
          stdio: 'inherit',
        })
      : spawnSync('npx', args, {
          cwd: process.cwd(),
          stdio: 'inherit',
        });
  return result.status === 0;
}

async function main() {
  const rl = readline.createInterface({ input, output });

  try {
    console.log('');
    console.log('=== Thiết lập Spotify Web API (Cloudflare Pages Function) ===');
    console.log('');
    console.log('1. Chuẩn bị app trên Spotify Developer Dashboard:');
    console.log('   - Mở: https://developer.spotify.com/dashboard');
    console.log('   - Bấm "Create app" -> Tích chọn "Web API"');
    console.log(`   - Điền Redirect URI chính xác là: ${REDIRECT_URI}`);
    console.log('   - Lưu lại rồi vào Settings để lấy Client ID và Client Secret.');
    console.log('');

    const rawClientId = await rl.question('Nhập Spotify Client ID: ');
    const clientId = stripSurroundingQuotes(rawClientId);
    if (!clientId) {
      throw new Error('Client ID không được để trống.');
    }

    const rawClientSecret = await rl.question('Nhập Spotify Client Secret: ');
    const clientSecret = stripSurroundingQuotes(rawClientSecret);
    if (!clientSecret) {
      throw new Error('Client Secret không được để trống.');
    }

    const state = crypto.randomBytes(16).toString('hex');
    const authParams = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: SPOTIFY_SCOPE,
      redirect_uri: REDIRECT_URI,
      state,
      show_dialog: 'true',
    });
    const authorizeUrl = `https://accounts.spotify.com/authorize?${authParams.toString()}`;

    const code = await waitForAuthorizationCode(state, authorizeUrl);
    console.log('3. Đã nhận authorization code, đang đổi sang Refresh Token...');

    const { accessToken, refreshToken } = await exchangeCodeForTokens(
      clientId,
      clientSecret,
      code
    );

    const playbackCheck = await testCurrentlyPlaying(accessToken);
    console.log(`   ${playbackCheck.summary}`);

    writeDevVars(clientId, clientSecret, refreshToken);
    console.log(`4. Đã lưu secrets vào ${DEV_VARS_FILE} (file này được .gitignore bỏ qua).`);

    const answer = (
      await rl.question(
        `\nĐẩy 3 biến mật lên Cloudflare Pages project "${CF_PAGES_PROJECT}" ngay bây giờ? (Y/n): `
      )
    )
      .trim()
      .toLowerCase();

    if (answer === '' || answer === 'y' || answer === 'yes') {
      console.log('');
      const uploaded = uploadSecretsToCloudflare();
      if (uploaded) {
        console.log('');
        console.log('Xong! Từ giờ tab "Không gian" trên cả Cloudflare Pages và GitHub Pages');
        console.log('sẽ tự hiển thị bài hát Spotify thật của bạn.');
      } else {
        console.log('');
        console.log('Không đẩy tự động được qua wrangler.');
        console.log(
          `Hãy chạy lại "npx wrangler login" hoặc tải file ${DEV_VARS_FILE} bằng lệnh:`
        );
        console.log(
          `npx wrangler pages secret bulk ${DEV_VARS_FILE} --project-name=${CF_PAGES_PROJECT}`
        );
      }
    } else {
      console.log('');
      console.log('Khi nào sẵn sàng, chạy lệnh sau để đẩy secrets lên Cloudflare Pages:');
      console.log(
        `npx wrangler pages secret bulk ${DEV_VARS_FILE} --project-name=${CF_PAGES_PROJECT}`
      );
    }
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error(`\n[spotify:setup] Lỗi: ${err.message}`);
  process.exitCode = 1;
});
