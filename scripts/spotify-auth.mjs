import { execFileSync, spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const REDIRECT_HOST = '127.0.0.1';
const REDIRECT_PORT = 4389;
const REDIRECT_PATH = '/callback';
const BASE_URL = `http://${REDIRECT_HOST}:${REDIRECT_PORT}`;
const REDIRECT_URI = `${BASE_URL}${REDIRECT_PATH}`;
const SPOTIFY_SCOPE = 'user-read-currently-playing';
const CF_PAGES_PROJECT = 'longhoang';
const DEV_VARS_FILE = '.dev.vars';
const MAX_FORM_BODY_BYTES = 8192;

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
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderHtmlShell(title, bodyHtml) {
  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    :root {
      color-scheme: dark;
    }
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
      background: #131314;
      color: #F8F9FA;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    }
    main {
      max-width: 520px;
      width: 100%;
      padding: 28px;
      border-radius: 16px;
      background: #1E1F20;
      border: 1px solid rgba(255,255,255,0.12);
      box-shadow: 0 20px 50px rgba(0,0,0,0.4);
    }
    h1 {
      margin: 0 0 8px;
      font-size: 20px;
      line-height: 1.3;
    }
    p, li {
      margin: 0;
      line-height: 1.6;
      color: #D2D5DB;
      font-size: 14px;
    }
    ol {
      margin: 14px 0 18px;
      padding-left: 20px;
      display: grid;
      gap: 8px;
    }
    a {
      color: #8AB4F8;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .box {
      padding: 12px 14px;
      border-radius: 10px;
      background: #131314;
      border: 1px solid rgba(255,255,255,0.1);
      margin-bottom: 18px;
    }
    .copy-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
    }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 12px;
      color: #F8F9FA;
      word-break: break-all;
      flex: 1;
    }
    label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #E8EAED;
      margin-bottom: 6px;
    }
    .field {
      margin-bottom: 14px;
    }
    .input-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    input {
      width: 100%;
      min-height: 44px;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.16);
      background: #131314;
      color: #F8F9FA;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 13px;
    }
    input:focus {
      outline: 2px solid #8AB4F8;
      outline-offset: 1px;
    }
    button {
      min-height: 44px;
      padding: 0 16px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.16);
      background: #28292C;
      color: #F8F9FA;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
    }
    button:hover {
      background: #33353A;
    }
    button.primary {
      width: 100%;
      margin-top: 6px;
      background: #F8F9FA;
      color: #131314;
      border-color: transparent;
      font-size: 14px;
    }
    button.primary:hover {
      background: #E2E5E9;
    }
    .alert {
      padding: 10px 12px;
      border-radius: 10px;
      margin-bottom: 16px;
      font-size: 13px;
      line-height: 1.5;
    }
    .alert-error {
      background: rgba(234,67,53,0.14);
      border: 1px solid rgba(234,67,53,0.4);
      color: #FCA5A5;
    }
    .alert-ok {
      background: rgba(52,168,83,0.14);
      border: 1px solid rgba(52,168,83,0.4);
      color: #86EFAC;
    }
    .muted {
      font-size: 12px;
      color: #9AA0A6;
    }
  </style>
</head>
<body>
  <main>
    ${bodyHtml}
  </main>
</body>
</html>`;
}

function renderSetupFormPage(formToken, errorMessage = '') {
  const errorBlock = errorMessage
    ? `<div class="alert alert-error">${escapeHtml(errorMessage)}</div>`
    : '';

  return renderHtmlShell(
    'Kết nối Spotify - Portfolio Long Hoàng',
    `
    <h1>Kết nối Spotify cho Portfolio</h1>
    <p>Dán thông tin Spotify Developer app tại đây để tự lấy Refresh Token và đẩy bí mật lên Cloudflare Pages (chạy hoàn toàn trên máy bạn).</p>

    <ol>
      <li>Mở <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer">Spotify Developer Dashboard</a> và bấm <strong>Create app</strong>.</li>
      <li>Tích chọn <strong>Web API</strong>, điền đúng <strong>Redirect URI</strong> bên dưới rồi bấm <strong>Save</strong>:
        <div class="box" style="margin-top:8px;margin-bottom:0">
          <div class="muted">Redirect URI bắt buộc (dùng 127.0.0.1, không dùng localhost)</div>
          <div class="copy-row">
            <code id="redirect-uri">${escapeHtml(REDIRECT_URI)}</code>
            <button type="button" id="copy-uri-btn">Chép URI</button>
          </div>
        </div>
      </li>
      <li>Vào <strong>Settings</strong> của app vừa tạo để lấy <strong>Client ID</strong> và bấm <em>View client secret</em> lấy <strong>Client Secret</strong>.</li>
    </ol>

    ${errorBlock}

    <form method="POST" action="/start" autocomplete="off">
      <input type="hidden" name="token" value="${escapeHtml(formToken)}" />

      <div class="field">
        <label for="client_id">Spotify Client ID</label>
        <input id="client_id" name="clientId" type="text" required placeholder="Dán Client ID bằng Ctrl + V" />
      </div>

      <div class="field">
        <label for="client_secret">Spotify Client Secret</label>
        <div class="input-row">
          <input id="client_secret" name="clientSecret" type="password" required placeholder="Dán Client Secret bằng Ctrl + V" />
          <button type="button" id="toggle-secret-btn">Hiện</button>
        </div>
      </div>

      <button type="submit" class="primary">Tiếp tục cấp quyền Spotify →</button>
    </form>

    <script>
      const copyBtn = document.getElementById('copy-uri-btn');
      const uriEl = document.getElementById('redirect-uri');
      if (copyBtn && uriEl) {
        copyBtn.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(uriEl.textContent || '');
            copyBtn.textContent = 'Đã chép!';
            setTimeout(() => { copyBtn.textContent = 'Chép URI'; }, 2000);
          } catch {
            copyBtn.textContent = 'Chọn thủ công';
          }
        });
      }

      const secretInput = document.getElementById('client_secret');
      const toggleBtn = document.getElementById('toggle-secret-btn');
      if (secretInput && toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          const hidden = secretInput.type === 'password';
          secretInput.type = hidden ? 'text' : 'password';
          toggleBtn.textContent = hidden ? 'Ẩn' : 'Hiện';
        });
      }
    </script>
    `
  );
}

function renderStatusPage(title, summary, detailsHtml, isError = false) {
  const alertClass = isError ? 'alert-error' : 'alert-ok';
  return renderHtmlShell(
    title,
    `
    <h1>${escapeHtml(title)}</h1>
    <div class="alert ${alertClass}">${escapeHtml(summary)}</div>
    ${detailsHtml}
    `
  );
}

function readFormBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let totalBytes = 0;

    req.on('data', (chunk) => {
      totalBytes += chunk.length;
      if (totalBytes > MAX_FORM_BODY_BYTES) {
        reject(new Error('Form payload too large.'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf8'));
    });

    req.on('error', reject);
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
    throw new Error(`Spotify rejected token exchange: ${reason}`);
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
    return {
      reachable: true,
      viSummary: 'Kiểm tra API Spotify thành công (hiện tài khoản chưa phát bài nào).',
      asciiSummary: 'Spotify API OK (nothing currently playing).',
    };
  }

  if (!response.ok) {
    return {
      reachable: false,
      viSummary: `API /currently-playing trả về mã HTTP ${response.status}.`,
      asciiSummary: `Check /currently-playing returned HTTP ${response.status}.`,
    };
  }

  const data = await response.json();
  if (data?.is_playing && data?.item?.name) {
    const artist = Array.isArray(data.item.artists)
      ? data.item.artists.map((entry) => entry?.name).filter(Boolean).join(', ')
      : data.item.show?.name ?? '';
    return {
      reachable: true,
      viSummary: `Đang phát thử: "${data.item.name}"${artist ? ` - ${artist}` : ''}`,
      asciiSummary: `Now playing test: "${data.item.name}"${artist ? ` - ${artist}` : ''}`,
    };
  }

  return {
    reachable: true,
    viSummary: 'Kiểm tra API Spotify thành công (đang tạm dừng phát nhạc).',
    asciiSummary: 'Spotify API OK (playback is currently paused).',
  };
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

/**
 * Run the local browser setup wizard and upload Cloudflare Pages secrets.
 * Exporting `startSetupServer` allows automated local tests without spawning interactive UI.
 */
export function startSetupServer({ openBrowser = true, autoCloseOnSuccess = true } = {}) {
  const formToken = crypto.randomBytes(16).toString('hex');
  const pendingAuth = {
    clientId: '',
    clientSecret: '',
    oauthState: '',
  };

  let closed = false;
  let timeoutId = null;

  const server = http.createServer(async (req, res) => {
    if (!req.url) {
      res.writeHead(400);
      res.end();
      return;
    }

    const requestUrl = new URL(req.url, BASE_URL);

    if (req.method === 'GET' && requestUrl.pathname === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      });
      res.end(renderSetupFormPage(formToken));
      return;
    }

    if (req.method === 'POST' && requestUrl.pathname === '/start') {
      try {
        const rawBody = await readFormBody(req);
        const params = new URLSearchParams(rawBody);
        const submittedToken = params.get('token') ?? '';

        if (submittedToken !== formToken) {
          res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(
            renderSetupFormPage(
              formToken,
              'Phiên biểu mẫu không hợp lệ. Vui lòng tải lại trang và thử lại.'
            )
          );
          return;
        }

        const clientId = stripSurroundingQuotes(params.get('clientId') ?? '');
        const clientSecret = stripSurroundingQuotes(params.get('clientSecret') ?? '');

        if (!clientId || !clientSecret) {
          res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(
            renderSetupFormPage(
              formToken,
              'Vui lòng dán đủ cả Spotify Client ID và Client Secret.'
            )
          );
          return;
        }

        const oauthState = crypto.randomBytes(16).toString('hex');
        pendingAuth.clientId = clientId;
        pendingAuth.clientSecret = clientSecret;
        pendingAuth.oauthState = oauthState;

        console.log('[2/4] Received Client ID & Secret from setup page.');
        console.log('      Redirecting browser to Spotify authorization...');

        const authParams = new URLSearchParams({
          response_type: 'code',
          client_id: clientId,
          scope: SPOTIFY_SCOPE,
          redirect_uri: REDIRECT_URI,
          state: oauthState,
          show_dialog: 'true',
        });

        res.writeHead(303, {
          Location: `https://accounts.spotify.com/authorize?${authParams.toString()}`,
        });
        res.end();
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(
          renderSetupFormPage(
            formToken,
            `Không đọc được dữ liệu biểu mẫu (${err.message}).`
          )
        );
      }
      return;
    }

    if (req.method === 'GET' && requestUrl.pathname === REDIRECT_PATH) {
      const returnedState = requestUrl.searchParams.get('state');
      const authError = requestUrl.searchParams.get('error');
      const code = requestUrl.searchParams.get('code');

      if (authError) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(
          renderStatusPage(
            'Chưa cấp quyền Spotify',
            `Spotify trả về lỗi: ${authError}. Bạn có thể quay về trang thiết lập để thử lại.`,
            `<p><a href="/">← Quay lại trang nhập Client ID / Secret</a></p>`,
            true
          )
        );
        return;
      }

      if (
        !code ||
        !pendingAuth.oauthState ||
        returnedState !== pendingAuth.oauthState
      ) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(
          renderStatusPage(
            'Phiên xác thực hết hạn hoặc không khớp',
            'Thiếu mã code hoặc phiên làm việc đã đổi. Vui lòng điền lại từ trang thiết lập.',
            `<p><a href="/">← Quay lại trang thiết lập</a></p>`,
            true
          )
        );
        return;
      }

      try {
        console.log('[3/4] Received callback code, exchanging for Refresh Token...');
        const { accessToken, refreshToken } = await exchangeCodeForTokens(
          pendingAuth.clientId,
          pendingAuth.clientSecret,
          code
        );

        const playbackCheck = await testCurrentlyPlaying(accessToken);
        console.log(`      ${playbackCheck.asciiSummary}`);

        writeDevVars(pendingAuth.clientId, pendingAuth.clientSecret, refreshToken);
        console.log(`[4/4] Saved ${DEV_VARS_FILE} and uploading secrets to Cloudflare Pages...`);

        const uploaded = uploadSecretsToCloudflare();

        if (uploaded) {
          console.log('');
          console.log('DONE! Spotify secrets uploaded to Cloudflare Pages project "longhoang".');
          console.log('Play any track on Spotify and open https://longhoang.pages.dev/?tab=workspace');
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(
            renderStatusPage(
              'Kết nối Spotify thành công!',
              playbackCheck.viSummary,
              `
              <div class="box">
                <p>Đã tự động lưu <code>${escapeHtml(DEV_VARS_FILE)}</code> và đẩy 3 secrets lên Cloudflare Pages (<strong>${escapeHtml(CF_PAGES_PROJECT)}</strong>).</p>
              </div>
              <p>Bây giờ bạn có thể mở nhạc bất kỳ trên Spotify rồi vào <a href="https://longhoang.pages.dev/?tab=workspace" target="_blank" rel="noopener noreferrer">tab Không gian</a> để kiểm tra trực tiếp. Bạn có thể đóng tab này lại.</p>
              `
            )
          );
        } else {
          console.log('');
          console.log('Saved .dev.vars locally, but wrangler upload failed.');
          console.log(
            `Run: npx wrangler pages secret bulk ${DEV_VARS_FILE} --project-name=${CF_PAGES_PROJECT}`
          );
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(
            renderStatusPage(
              'Đã lấy Refresh Token, cần đẩy thủ công lên Cloudflare',
              `${playbackCheck.viSummary} Tuy nhiên bước đẩy tự động qua Wrangler chưa thành công.`,
              `
              <div class="box">
                <p>Đã lưu sẵn <code>${escapeHtml(DEV_VARS_FILE)}</code> trên máy bạn. Hãy kiểm tra cửa sổ terminal hoặc chạy lại:</p>
                <p style="margin-top:8px"><code>npx wrangler pages secret bulk ${escapeHtml(DEV_VARS_FILE)} --project-name=${escapeHtml(CF_PAGES_PROJECT)}</code></p>
              </div>
              `,
              true
            )
          );
        }

        if (autoCloseOnSuccess && !closed) {
          closed = true;
          if (timeoutId) clearTimeout(timeoutId);
          setTimeout(() => server.close(), 250);
        }
      } catch (err) {
        console.error(`[spotify:setup] Token exchange failed: ${err.message}`);
        res.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(
          renderStatusPage(
            'Không lấy được Refresh Token',
            err.message,
            `<p><a href="/">← Kiểm tra lại Client ID / Secret và thử lại</a></p>`,
            true
          )
        );
      }
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  });

  server.on('error', (err) => {
    console.error(
      `[spotify:setup] Could not bind ${BASE_URL}: ${err.message}`
    );
    process.exitCode = 1;
  });

  server.listen(REDIRECT_PORT, REDIRECT_HOST, () => {
    console.log('');
    console.log('=== Spotify Web API Setup (Local Browser Wizard) ===');
    console.log('');
    console.log(`[1/4] Opening setup page in your browser: ${BASE_URL}`);
    console.log('      If your browser does not open, visit that URL manually.');
    console.log('      Press Ctrl+C in this window to stop anytime.');
    console.log('');

    if (openBrowser) {
      openExternalBrowser(BASE_URL);
    }

    if (autoCloseOnSuccess) {
      timeoutId = setTimeout(() => {
        if (!closed) {
          closed = true;
          console.error('[spotify:setup] Timed out after 10 minutes without finishing setup.');
          server.close();
          process.exitCode = 1;
        }
      }, 10 * 60 * 1000);
    }
  });

  return server;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  startSetupServer();
}
