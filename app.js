const STORAGE_KEY = "personal_playground_vault_v1";
const IDENTITY_KEY = "personal_playground_identity_v1";
const THEME_KEY = "personal_playground_theme_v1";

// Sample items carry isPlaceholder: true so the UI renders an explicit [REAL DATA] marker until replaced (R-23, R-38).
const DEFAULT_VAULT_ITEMS = [
  {
    id: "item-1",
    category: "book",
    categoryLabel: "Sách tâm đắc",
    title: "[REAL DATA] Điền tựa sách gối đầu giường của bạn",
    creator: "Tác giả sách (Chỉnh sửa tại Mục 04)",
    note: "Đây là khung mẫu trung thực dành cho cuốn sách định hình tư duy làm sản phẩm của bạn. Hãy dùng Xưởng Dữ liệu ở Mục 04 để ghi lại tựa sách thật và bài học tâm đắc nhất.",
    freq: 261.63,
    isSpotlight: true,
    isPlaceholder: true
  },
  {
    id: "item-2",
    category: "music",
    categoryLabel: "Âm nhạc & Giai điệu",
    title: "[REAL DATA] Bản nhạc giúp tập trung sâu khi viết mã",
    creator: "Nghệ sĩ / Album yêu thích",
    note: "Nhấn nút Nghe giai điệu bên cạnh để trải nghiệm bộ tổng hợp âm thanh Web Audio API mô phỏng hợp âm phòng thu ở tần số 329.6 Hz.",
    freq: 329.63,
    isSpotlight: false,
    isPlaceholder: true
  },
  {
    id: "item-3",
    category: "tool",
    categoryLabel: "Công cụ & Đồ nghề",
    title: "[REAL DATA] Thiết bị phần cứng & Môi trường lập trình",
    creator: "Cấu hình máy trạm / Bàn phím cơ / Trình soạn thảo",
    note: "Nơi liệt kê những công cụ vật lý và phần mềm bạn tinh chỉnh hàng ngày để biến ý tưởng thành sản phẩm thực tế.",
    freq: 220.0,
    isSpotlight: false,
    isPlaceholder: true
  },
  {
    id: "item-4",
    category: "hobby",
    categoryLabel: "Sở thích cá nhân",
    title: "[REAL DATA] Thú vui tái tạo năng lượng ngoài màn hình",
    creator: "Nhiếp ảnh / Cà phê thủ công / Chạy bộ",
    note: "Góc lưu giữ nhịp sống đời thường giúp cân bằng lại trực giác sáng tạo sau những giờ làm việc với hệ thống kỹ thuật.",
    freq: 392.0,
    isSpotlight: false,
    isPlaceholder: true
  }
];

const LAB_BLUEPRINTS = [
  {
    code: "MÃ BẢN VẼ: EXP-01 [REAL DATA]",
    title: "Kiến trúc Điều phối Tác vụ Thời gian thực",
    node1Title: "NGUỒN TÍN HIỆU",
    node1Sub: "Đầu vào trực tiếp",
    node2Title: "BỘ ĐIỀU PHỐI",
    node2Sub: "Hàng đợi ưu tiên",
    node3Title: "ĐẦU RA THỰC TẾ",
    node3Sub: "Phản hồi tức thời",
    unit: "Hz",
    defaultRate: 60,
    problem: "Giải quyết độ trễ khi đồng bộ trạng thái giữa nhiều luồng tương tác của người dùng mà không làm nghẽn giao diện chính.",
    architecture: "Tách biệt vòng lặp tính toán trạng thái khỏi tầng hiển thị DOM, chỉ cập nhật các thuộc tính thay đổi thực sự.",
    takeaway: "Một hệ thống tốt không nằm ở sự phức tạp của công cụ mà ở khả năng kiểm soát và quan sát được từng bước chạy."
  },
  {
    code: "MÃ BẢN VẼ: EXP-02 [REAL DATA]",
    title: "Bộ tổng hợp Âm thanh & Thị giác Trình duyệt",
    node1Title: "TƯƠNG TÁC VẬT LÝ",
    node1Sub: "Vận tốc & Va chạm",
    node2Title: "WEB AUDIO DSP",
    node2Sub: "Dao động ký đa âm",
    node3Title: "SÓNG THỊ GIÁC",
    node3Sub: "Canvas 60 khung hình",
    unit: "BPM",
    defaultRate: 84,
    problem: "Tạo phản hồi âm thanh tự nhiên trên web mà không buộc người xem tải hàng chục megabyte tệp âm thanh tĩnh.",
    architecture: "Kết hợp bộ tạo dao động hình sin và tam giác với đường bao âm lượng (ADSR envelope) để tạo âm sắc ấm áp.",
    takeaway: "Khi âm thanh và chuyển động tuân theo cùng một quy luật vật lý, trải nghiệm số trở nên sống động và có chiều sâu."
  },
  {
    code: "MÃ BẢN VẼ: EXP-03 [REAL DATA]",
    title: "Hệ thống Quản trị Tri thức Cá nhân Cục bộ",
    node1Title: "NHẬP LIỆU TRỰC TIẾP",
    node1Sub: "Biểu mẫu tại chỗ",
    node2Title: "LƯU TRỮ CỤC BỘ",
    node2Sub: "Kiểm tra lược đồ",
    node3Title: "XUẤT BẢN JSON",
    node3Sub: "Độc lập nền tảng",
    unit: "Bản ghi/s",
    defaultRate: 45,
    problem: "Giúp chủ nhân trang web cập nhật sách đọc, bản nhạc và dự án ngay lập tức mà không phụ thuộc máy chủ phức tạp.",
    architecture: "Lưu trữ trạng thái trực tiếp trên trình duyệt kết hợp bộ xuất tệp JSON chuẩn hóa để sao lưu bất cứ lúc nào.",
    takeaway: "Quyền sở hữu dữ liệu cá nhân bắt đầu từ những định dạng văn bản thuần túy, minh bạch và dễ di chuyển."
  }
];

const CATEGORY_MAP = {
  book: "Sách tâm đắc",
  music: "Âm nhạc & Giai điệu",
  tool: "Công cụ & Đồ nghề",
  hobby: "Sở thích cá nhân"
};

const state = {
  theme: "dark",
  identity: {
    monogram: "[LOGO]",
    name: "Founder / Builder [REAL DATA]",
    isCustom: false
  },
  vaultItems: [],
  activeCategory: "all",
  searchQuery: "",
  uiState: "ready",
  expandedItemIds: new Set(),
  physicsMode: "elastic",
  interactiveAudioEnabled: false,
  activeLabIndex: 0,
  simRate: 60
};

// Web Audio engine is initialized lazily on user gesture to respect browser autoplay policies.
let audioCtx = null;
let activeChordTimer = null;
let waveformAnimId = null;
let soundEnergy = 0;

function ensureAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playHarmonicChord(baseFreq = 261.63, durationSec = 1.4) {
  const ctx = ensureAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const ratios = [1, 1.25, 1.5, 2];

  ratios.forEach((ratio, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = idx % 2 === 0 ? "sine" : "triangle";
    osc.frequency.setValueAtTime(baseFreq * ratio, now);

    const peakGain = 0.06 / (idx + 1);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + durationSec + 0.04);
  });

  soundEnergy = 1.0;
  updateAudioIndicator(true, `Đang phát hợp âm: ${baseFreq.toFixed(1)} Hz`);
}

function updateAudioIndicator(isActive, labelText) {
  const pill = document.getElementById("audio-status-pill");
  const text = document.getElementById("audio-status-text");
  if (pill && text) {
    pill.setAttribute("data-active", String(isActive));
    text.textContent = labelText;
  }
}

function loadPersistedState() {
  try {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
      state.theme = savedTheme;
    }

    const savedIdentity = localStorage.getItem(IDENTITY_KEY);
    if (savedIdentity) {
      const parsedId = JSON.parse(savedIdentity);
      if (parsedId && parsedId.monogram && parsedId.name) {
        state.identity = parsedId;
      }
    }

    const savedVault = localStorage.getItem(STORAGE_KEY);
    if (savedVault) {
      const parsedVault = JSON.parse(savedVault);
      if (Array.isArray(parsedVault)) {
        state.vaultItems = parsedVault;
        return;
      }
    }
  } catch (err) {
    // Fall back to default in-memory state when storage access is restricted.
  }
  state.vaultItems = DEFAULT_VAULT_ITEMS.map((item) => ({ ...item }));
}

function saveVaultToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.vaultItems));
  } catch (err) {
    // Ignore quota errors in private browsing contexts.
  }
}

function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  const btn = document.getElementById("theme-toggle-btn");
  if (btn) {
    const isLight = theme === "light";
    btn.setAttribute("aria-pressed", String(isLight));
    btn.textContent = isLight ? "Giao diện: Sáng (Paper)" : "Giao diện: Tối (Carbon)";
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (err) {
    // Ignore storage write failures.
  }
}

function renderIdentity() {
  const { monogram, name, isCustom } = state.identity;
  const headerMono = document.getElementById("header-monogram");
  const headerName = document.getElementById("header-builder-name");
  const footerLabel = document.getElementById("footer-identity-label");
  const badge = document.getElementById("identity-status-badge");
  const monoInput = document.getElementById("quick-monogram-input");
  const nameInput = document.getElementById("quick-name-input");

  if (headerMono) headerMono.textContent = monogram;
  if (headerName) headerName.textContent = name;
  if (footerLabel) footerLabel.textContent = `${monogram} ${name} | Personal Playground`;
  if (monoInput && document.activeElement !== monoInput) monoInput.value = monogram;
  if (nameInput && document.activeElement !== nameInput) nameInput.value = name;

  if (badge) {
    badge.textContent = isCustom
      ? "Đã áp dụng định danh của bạn"
      : "[REAL DATA] Giữ chỗ trung thực";
  }
}

// Render all three mandatory UI data states (Empty, Loading, Error) plus the populated view (R-27).
function renderVault() {
  const container = document.getElementById("vault-content-region");
  if (!container) return;

  if (state.uiState === "loading") {
    container.innerHTML = `
      <div class="ui-state-box" data-state="loading" role="status">
        <span class="mono-meta">TRẠNG THÁI DỮ LIỆU: ĐANG ĐỒNG BỘ KỆ CÁ NHÂN</span>
        <h3 style="margin: 0; font-size: 1.35rem;">Đang tải danh mục Sách, Âm nhạc, Công cụ và Sở thích...</h3>
        <p style="margin: 0; color: var(--text-muted);">
          Hệ thống đang đọc cấu trúc dữ liệu cục bộ và chuẩn bị bộ tổng hợp tần số âm thanh cho từng hạng mục.
        </p>
        <div class="loading-bar-track" aria-hidden="true">
          <div class="loading-bar-fill"></div>
        </div>
        <button type="button" class="btn btn-compact" data-recover-state="ready">
          Hoàn tất tải ngay lập tức
        </button>
      </div>
    `;
    bindStateRecoveryButtons(container);
    return;
  }

  if (state.uiState === "error") {
    container.innerHTML = `
      <div class="ui-state-box" data-state="error" role="alert">
        <span class="mono-meta">CẢNH BÁO ĐỒNG BỘ: KHÔNG THỂ ĐỌC KỆ DỮ LIỆU</span>
        <h3 style="margin: 0; font-size: 1.35rem;">Đã xảy ra gián đoạn khi truy xuất dữ liệu Góc Cá Nhân</h3>
        <p style="margin: 0;">
          Nguyên nhân: Kết nối dữ liệu đang ở chế độ mô phỏng lỗi kiểm thử hoặc tệp cấu hình cục bộ không hợp lệ. Bạn có thể kết nối lại để khôi phục danh sách ngay lập tức.
        </p>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button type="button" class="btn btn-accent" data-recover-state="ready">
            Khôi phục kết nối kệ dữ liệu
          </button>
          <a href="#studio" class="btn">Mở Xưởng nhập dữ liệu mới</a>
        </div>
      </div>
    `;
    bindStateRecoveryButtons(container);
    return;
  }

  const query = state.searchQuery.trim().toLowerCase();
  const filtered = state.vaultItems.filter((item) => {
    const matchesCategory = state.activeCategory === "all" || item.category === state.activeCategory;
    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.creator.toLowerCase().includes(query) ||
      item.note.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  if (state.uiState === "empty" || filtered.length === 0) {
    const reasonText =
      state.uiState === "empty"
        ? "Bạn đang bật chế độ xem Trạng thái Trống (Empty State) để kiểm thử giao diện khi chưa có mục nào trong kệ."
        : `Không tìm thấy mục nào khớp với từ khóa "${escapeHtml(state.searchQuery)}" trong phân loại hiện tại.`;

    container.innerHTML = `
      <div class="ui-state-box" data-state="empty">
        <span class="mono-meta">TRẠNG THÁI TRỐNG (EMPTY STATE)</span>
        <h3 style="margin: 0; font-size: 1.35rem;">Chưa có mục nào hiển thị trên kệ sưu tầm</h3>
        <p style="margin: 0; color: var(--text-muted);">${reasonText}</p>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button type="button" class="btn btn-accent" data-recover-state="reset-filters">
            Hiển thị lại toàn bộ danh mục
          </button>
          <a href="#studio" class="btn">Thêm sách, nhạc hoặc đồ nghề thật ở Mục 04</a>
        </div>
      </div>
    `;
    bindStateRecoveryButtons(container);
    return;
  }

  const spotlightItem = filtered.find((item) => item.isSpotlight) || filtered[0];
  const ledgerItems = filtered.filter((item) => item.id !== spotlightItem.id);

  const spotlightBadge = spotlightItem.isPlaceholder
    ? `<span class="real-data-tag">[REAL DATA] Mẫu giữ chỗ</span>`
    : `<span class="real-data-tag">Dữ liệu thật của bạn</span>`;

  const ledgerHtml =
    ledgerItems.length > 0
      ? ledgerItems
          .map((item) => {
            const isExpanded = state.expandedItemIds.has(item.id);
            const itemBadge = item.isPlaceholder
              ? `<span class="real-data-tag">[REAL DATA]</span>`
              : `<span class="real-data-tag">Dữ liệu thật</span>`;
            return `
              <article class="ledger-row">
                <div class="ledger-row-main">
                  <div class="ledger-row-info">
                    <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                      <span class="category-chip">${escapeHtml(item.categoryLabel)}</span>
                      ${itemBadge}
                      <span class="mono-meta">${Number(item.freq).toFixed(1)} Hz</span>
                    </div>
                    <h4 class="ledger-item-title">${escapeHtml(item.title)}</h4>
                    <span class="ledger-item-sub">${escapeHtml(item.creator)}</span>
                  </div>
                  <div class="ledger-row-actions">
                    <button type="button" class="btn btn-compact" data-play-freq="${Number(item.freq)}" data-play-title="${escapeHtml(item.title)}">
                      Nghe giai điệu
                    </button>
                    <button type="button" class="btn btn-compact" data-toggle-drawer="${escapeHtml(item.id)}" aria-expanded="${isExpanded}">
                      ${isExpanded ? "Thu gọn góc nhìn" : "Đọc góc nhìn cá nhân"}
                    </button>
                    <button type="button" class="btn btn-compact" data-delete-item="${escapeHtml(item.id)}" aria-label="Xóa mục ${escapeHtml(item.title)}">
                      Xóa mục
                    </button>
                  </div>
                </div>
                ${
                  isExpanded
                    ? `<div class="ledger-drawer">${escapeHtml(item.note)}</div>`
                    : ""
                }
              </article>
            `;
          })
          .join("")
      : `
        <div class="ledger-row">
          <p style="margin: 0; color: var(--text-muted);">
            Đang hiển thị duy nhất mục tiêu điểm cho bộ lọc này. Bạn có thể chọn "Tất cả hạng mục" hoặc thêm mục mới tại Mục 04.
          </p>
        </div>
      `;

  container.innerHTML = `
    <div class="vault-layout">
      <article class="vault-spotlight" aria-label="Mục tiêu điểm trong Góc Cá Nhân">
        <div class="spotlight-meta-row">
          <span class="category-chip">TIÊU ĐIỂM / ${escapeHtml(spotlightItem.categoryLabel)}</span>
          ${spotlightBadge}
        </div>
        <h3 class="spotlight-title">${escapeHtml(spotlightItem.title)}</h3>
        <p class="spotlight-creator">${escapeHtml(spotlightItem.creator)}</p>
        <blockquote class="spotlight-quote">
          ${escapeHtml(spotlightItem.note)}
        </blockquote>
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
          <span class="mono-meta">TẦN SỐ ĐẠI DIỆN: ${Number(spotlightItem.freq).toFixed(1)} Hz</span>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button type="button" class="btn btn-compact btn-accent" data-play-freq="${Number(spotlightItem.freq)}" data-play-title="${escapeHtml(spotlightItem.title)}">
              Phát hợp âm tiêu điểm
            </button>
            <a href="#studio" class="btn btn-compact">Sửa tại Xưởng</a>
          </div>
        </div>
      </article>

      <div class="vault-ledger" aria-label="Danh sách chi tiết trong kệ">
        ${ledgerHtml}
      </div>
    </div>
  `;

  bindVaultItemActions(container);
}

function bindStateRecoveryButtons(container) {
  container.querySelectorAll("[data-recover-state]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-recover-state");
      if (action === "reset-filters") {
        state.activeCategory = "all";
        state.searchQuery = "";
        const searchInput = document.getElementById("vault-search-input");
        if (searchInput) searchInput.value = "";
        document.querySelectorAll(".filter-tab").forEach((tab) => {
          tab.setAttribute("aria-selected", String(tab.getAttribute("data-category") === "all"));
        });
      }
      setUiState("ready");
    });
  });
}

function bindVaultItemActions(container) {
  container.querySelectorAll("[data-play-freq]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const freq = parseFloat(btn.getAttribute("data-play-freq")) || 261.63;
      const title = btn.getAttribute("data-play-title") || "Giai điệu Studio";
      const trackHeading = document.getElementById("sonic-track-title");
      if (trackHeading) {
        trackHeading.textContent = `Đang phát: ${title} (${freq.toFixed(1)} Hz)`;
      }
      playHarmonicChord(freq, 1.8);
    });
  });

  container.querySelectorAll("[data-toggle-drawer]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-toggle-drawer");
      if (state.expandedItemIds.has(id)) {
        state.expandedItemIds.delete(id);
      } else {
        state.expandedItemIds.add(id);
      }
      renderVault();
    });
  });

  container.querySelectorAll("[data-delete-item]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-delete-item");
      state.vaultItems = state.vaultItems.filter((item) => item.id !== id);
      saveVaultToStorage();
      renderVault();
    });
  });
}

function setUiState(nextState) {
  state.uiState = nextState;
  document.querySelectorAll(".state-btn").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.getAttribute("data-ui-state") === nextState));
  });
  renderVault();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Section 02 Blueprint Inspector updates SVG diagram text and packet animation speed.
function renderLabBlueprint(index) {
  state.activeLabIndex = index;
  const bp = LAB_BLUEPRINTS[index] || LAB_BLUEPRINTS[0];
  state.simRate = bp.defaultRate;

  document.querySelectorAll(".blueprint-tab").forEach((tab, idx) => {
    tab.setAttribute("aria-selected", String(idx === index));
  });

  const panel = document.getElementById("lab-inspector-panel");
  if (panel) {
    panel.setAttribute("aria-labelledby", `lab-tab-${index}`);
  }

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setText("inspector-code", bp.code);
  setText("inspector-title", bp.title);
  setText("svg-node-1-title", bp.node1Title);
  setText("svg-node-1-sub", bp.node1Sub);
  setText("svg-node-2-title", bp.node2Title);
  setText("svg-node-2-sub", bp.node2Sub);
  setText("svg-node-3-title", bp.node3Title);
  setText("svg-node-3-sub", bp.node3Sub);
  setText("svg-telemetry-label", `TỐC ĐỘ XỬ LÝ: ${bp.defaultRate} ${bp.unit}`);
  setText("sim-slider-value", `${bp.defaultRate} ${bp.unit}`);
  setText("inspector-problem", bp.problem);
  setText("inspector-architecture", bp.architecture);
  setText("inspector-takeaway", bp.takeaway);

  const slider = document.getElementById("sim-intensity-slider");
  if (slider) {
    slider.value = String(bp.defaultRate);
  }
}

function initBlueprintPacketAnimation() {
  let tick = 0;
  const p1 = document.getElementById("svg-packet-1");
  const p2 = document.getElementById("svg-packet-2");

  function step() {
    const speed = Math.max(0.4, state.simRate / 45);
    tick = (tick + speed) % 100;
    if (p1 && p2) {
      const x1 = 160 + (tick / 100) * 90;
      const x2 = 432 + (tick / 100) * 80;
      p1.setAttribute("x", x1.toFixed(1));
      p2.setAttribute("x", x2.toFixed(1));
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Section 01 Interactive Kinetic Field Canvas responds to pointer dragging, shockwaves, and keyboard shortcuts.
function initKineticCanvas() {
  const canvas = document.getElementById("kinetic-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const nodes = [
    { label: "CÔNG NGHỆ", freq: 220.0, angle: 0.2, radius: 115, x: 0, y: 0, vx: 0, vy: 0 },
    { label: "SẢN PHẨM", freq: 261.63, angle: 1.45, radius: 125, x: 0, y: 0, vx: 0, vy: 0 },
    { label: "SÁCH & TƯ DUY", freq: 329.63, angle: 2.7, radius: 110, x: 0, y: 0, vx: 0, vy: 0 },
    { label: "ÂM NHẠC", freq: 392.0, angle: 3.95, radius: 120, x: 0, y: 0, vx: 0, vy: 0 },
    { label: "ĐỒ NGHỀ", freq: 440.0, angle: 5.2, radius: 115, x: 0, y: 0, vx: 0, vy: 0 }
  ];

  const ripples = [];
  let width = 600;
  let height = 410;
  let draggedNode = null;
  let pointerX = 300;
  let pointerY = 205;
  let time = 0;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = Math.max(280, Math.floor(rect.width));
    height = Math.max(260, Math.floor(rect.height));
    canvas.width = width;
    canvas.height = height;

    const cx = width / 2;
    const cy = height / 2;
    const scale = Math.min(width, height) / 340;
    nodes.forEach((node) => {
      if (node.x === 0 && node.y === 0) {
        node.x = cx + Math.cos(node.angle) * node.radius * scale;
        node.y = cy + Math.sin(node.angle) * node.radius * scale;
      }
    });
  }

  resize();
  window.addEventListener("resize", resize);

  function triggerShockwave(originX, originY) {
    const cx = originX ?? width / 2;
    const cy = originY ?? height / 2;
    ripples.push({ x: cx, y: cy, r: 8, alpha: 1.0 });

    nodes.forEach((node, idx) => {
      const dx = node.x - cx;
      const dy = node.y - cy;
      const dist = Math.max(20, Math.hypot(dx, dy));
      const force = 14 / (dist / 45);
      node.vx += (dx / dist) * force + (idx % 2 === 0 ? 2.5 : -2.5);
      node.vy += (dy / dist) * force;
    });

    if (state.interactiveAudioEnabled) {
      playHarmonicChord(261.63, 1.1);
    }
  }

  const pulseBtn = document.getElementById("pulse-field-btn");
  if (pulseBtn) {
    pulseBtn.addEventListener("click", () => triggerShockwave(width / 2, height / 2));
  }

  canvas.addEventListener("pointerdown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pointerX = x;
    pointerY = y;

    let hit = null;
    for (const node of nodes) {
      if (Math.hypot(node.x - x, node.y - y) < 34) {
        hit = node;
        break;
      }
    }

    if (hit) {
      draggedNode = hit;
      if (state.interactiveAudioEnabled) {
        playHarmonicChord(hit.freq, 0.9);
      }
    } else {
      triggerShockwave(x, y);
    }
  });

  canvas.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    pointerX = Math.max(0, Math.min(width, e.clientX - rect.left));
    pointerY = Math.max(0, Math.min(height, e.clientY - rect.top));

    const coordsEl = document.getElementById("canvas-coords");
    if (coordsEl) {
      const px = String(Math.round(pointerX)).padStart(3, "0");
      const py = String(Math.round(pointerY)).padStart(3, "0");
      coordsEl.textContent = `TỌA ĐỘ: [X: ${px}, Y: ${py}]`;
    }

    if (draggedNode) {
      draggedNode.x = pointerX;
      draggedNode.y = pointerY;
      draggedNode.vx = 0;
      draggedNode.vy = 0;
    }
  });

  const releaseDrag = () => {
    draggedNode = null;
  };
  canvas.addEventListener("pointerup", releaseDrag);
  canvas.addEventListener("pointercancel", releaseDrag);

  // Keyboard support on the canvas ensures mouse-free operation (R-32).
  canvas.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      triggerShockwave(width / 2, height / 2);
    } else if (e.key.toLowerCase() === "m") {
      e.preventDefault();
      const modes = ["elastic", "orbital", "wave"];
      const nextIdx = (modes.indexOf(state.physicsMode) + 1) % modes.length;
      setPhysicsMode(modes[nextIdx]);
    }
  });

  function draw() {
    time += 0.02;
    const isLight = state.theme === "light";
    const bg = isLight ? "#F4F3EE" : "#111210";
    const fg = isLight ? "#111210" : "#EDEDEA";
    const muted = isLight ? "#6B6E65" : "#6A6D64";
    const accent = "#D4FF00";

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const scale = Math.min(width, height) / 330;

    // Crosshair reference axes.
    ctx.strokeStyle = muted;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, height);
    ctx.moveTo(0, cy);
    ctx.lineTo(width, cy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Active shockwave ripples.
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += 4.2;
      rp.alpha -= 0.022;
      if (rp.alpha <= 0) {
        ripples.splice(i, 1);
        continue;
      }
      ctx.strokeStyle = isLight ? "#3D4D00" : accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.stroke();
    }

    let totalKinetic = 0;

    nodes.forEach((node, idx) => {
      if (node !== draggedNode) {
        if (state.physicsMode === "orbital") {
          node.angle += 0.012 + idx * 0.002;
        }
        const waveOffset =
          state.physicsMode === "wave" ? Math.sin(time * 2.2 + idx * 1.3) * 28 : 0;
        const targetX = cx + Math.cos(node.angle) * (node.radius * scale + waveOffset);
        const targetY = cy + Math.sin(node.angle) * (node.radius * scale + waveOffset);

        node.vx += (targetX - node.x) * 0.045;
        node.vy += (targetY - node.y) * 0.045;
        node.vx *= 0.86;
        node.vy *= 0.86;
        node.x += node.vx;
        node.y += node.vy;
      }

      totalKinetic += Math.hypot(node.vx, node.vy);

      // Connect each pillar node to the central Builder hub and adjacent node.
      const nextNode = nodes[(idx + 1) % nodes.length];
      ctx.strokeStyle = muted;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(node.x, node.y);
      ctx.lineTo(nextNode.x, nextNode.y);
      ctx.stroke();
    });

    // Draw central Builder monogram hub.
    ctx.fillStyle = accent;
    ctx.strokeStyle = "#111210";
    ctx.lineWidth = 2;
    ctx.fillRect(cx - 34, cy - 22, 68, 44);
    ctx.strokeRect(cx - 34, cy - 22, 68, 44);

    ctx.fillStyle = "#111210";
    ctx.font = "700 13px 'IBM Plex Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(state.identity.monogram.slice(0, 7), cx, cy);

    // Draw interactive pillar nodes.
    nodes.forEach((node) => {
      const isHovered = Math.hypot(node.x - pointerX, node.y - pointerY) < 32;
      ctx.fillStyle = isHovered || node === draggedNode ? accent : bg;
      ctx.strokeStyle = fg;
      ctx.lineWidth = 2;

      const boxW = 114;
      const boxH = 34;
      ctx.fillRect(node.x - boxW / 2, node.y - boxH / 2, boxW, boxH);
      ctx.strokeRect(node.x - boxW / 2, node.y - boxH / 2, boxW, boxH);

      ctx.fillStyle = isHovered || node === draggedNode ? "#111210" : fg;
      ctx.font = "600 11px 'IBM Plex Mono', monospace";
      ctx.fillText(node.label, node.x, node.y);
    });

    const energyEl = document.getElementById("canvas-energy");
    if (energyEl) {
      const norm = (1 + totalKinetic / 18).toFixed(2);
      energyEl.textContent = `NĂNG LƯỢNG HẠT: ${norm}x`;
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

function setPhysicsMode(mode) {
  state.physicsMode = mode;
  document.querySelectorAll("[data-physics-mode]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.getAttribute("data-physics-mode") === mode));
  });
}

// Live waveform oscilloscope in Section 03 visualizes Web Audio harmonic playback.
function initWaveformVisualizer() {
  const canvas = document.getElementById("waveform-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let phase = 0;

  function renderWave() {
    phase += 0.08;
    soundEnergy = Math.max(0.06, soundEnergy * 0.965);
    const isLight = state.theme === "light";
    ctx.fillStyle = isLight ? "#F4F3EE" : "#111210";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = isLight ? "#3D4D00" : "#D4FF00";
    ctx.lineWidth = 2;
    ctx.beginPath();

    const midY = canvas.height / 2;
    for (let x = 0; x < canvas.width; x += 3) {
      const amp = soundEnergy * 20;
      const y =
        midY +
        Math.sin(x * 0.045 + phase) * amp * Math.cos(x * 0.015 - phase * 0.5);
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    waveformAnimId = requestAnimationFrame(renderWave);
  }

  waveformAnimId = requestAnimationFrame(renderWave);
}

function showFeedback(elId, type, message) {
  const banner = document.getElementById(elId);
  if (!banner) return;
  banner.hidden = false;
  banner.setAttribute("data-type", type);
  banner.textContent = message;
}

function bindEvents() {
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      applyTheme(state.theme === "dark" ? "light" : "dark");
    });
  }

  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const primaryNav = document.getElementById("primary-nav");
  if (mobileMenuBtn && primaryNav) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = primaryNav.getAttribute("data-open") === "true";
      primaryNav.setAttribute("data-open", String(!isOpen));
      mobileMenuBtn.setAttribute("aria-expanded", String(!isOpen));
      mobileMenuBtn.textContent = !isOpen ? "Đóng trình đơn" : "Trình đơn";
    });

    primaryNav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.querySelectorAll(".nav-link").forEach((l) => l.removeAttribute("aria-current"));
        link.setAttribute("aria-current", "true");
        primaryNav.setAttribute("data-open", "false");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.textContent = "Trình đơn";
      });
    });
  }

  const quickIdentityForm = document.getElementById("quick-identity-form");
  if (quickIdentityForm) {
    quickIdentityForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const monoVal = document.getElementById("quick-monogram-input").value.trim() || "[LOGO]";
      const nameVal = document.getElementById("quick-name-input").value.trim() || "Founder / Builder";
      state.identity = {
        monogram: monoVal,
        name: nameVal,
        isCustom: monoVal !== "[LOGO]" || nameVal !== "Founder / Builder [REAL DATA]"
      };
      try {
        localStorage.setItem(IDENTITY_KEY, JSON.stringify(state.identity));
      } catch (err) {
        // Ignore storage write error.
      }
      renderIdentity();
    });
  }

  document.querySelectorAll("[data-physics-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setPhysicsMode(btn.getAttribute("data-physics-mode"));
    });
  });

  const synthBtn = document.getElementById("toggle-synth-btn");
  if (synthBtn) {
    synthBtn.addEventListener("click", () => {
      state.interactiveAudioEnabled = !state.interactiveAudioEnabled;
      synthBtn.setAttribute("aria-pressed", String(state.interactiveAudioEnabled));
      synthBtn.textContent = state.interactiveAudioEnabled
        ? "Tắt âm thanh tương tác"
        : "Bật âm thanh tương tác";
      if (state.interactiveAudioEnabled) {
        playHarmonicChord(261.63, 1.0);
      } else {
        updateAudioIndicator(false, "Âm thanh Web Audio: Đang tắt");
      }
    });
  }

  document.querySelectorAll(".blueprint-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const idx = parseInt(tab.getAttribute("data-lab-index"), 10) || 0;
      renderLabBlueprint(idx);
    });
  });

  const simSlider = document.getElementById("sim-intensity-slider");
  if (simSlider) {
    simSlider.addEventListener("input", () => {
      const bp = LAB_BLUEPRINTS[state.activeLabIndex] || LAB_BLUEPRINTS[0];
      state.simRate = parseInt(simSlider.value, 10) || 60;
      const valEl = document.getElementById("sim-slider-value");
      const svgLabel = document.getElementById("svg-telemetry-label");
      if (valEl) valEl.textContent = `${state.simRate} ${bp.unit}`;
      if (svgLabel) svgLabel.textContent = `TỐC ĐỘ XỬ LÝ: ${state.simRate} ${bp.unit}`;
    });
  }

  const triggerStepBtn = document.getElementById("trigger-diagram-step-btn");
  if (triggerStepBtn) {
    triggerStepBtn.addEventListener("click", () => {
      state.simRate = Math.min(120, state.simRate + 20);
      const bp = LAB_BLUEPRINTS[state.activeLabIndex] || LAB_BLUEPRINTS[0];
      if (simSlider) simSlider.value = String(state.simRate);
      const valEl = document.getElementById("sim-slider-value");
      const svgLabel = document.getElementById("svg-telemetry-label");
      if (valEl) valEl.textContent = `${state.simRate} ${bp.unit}`;
      if (svgLabel) svgLabel.textContent = `TỐC ĐỘ XỬ LÝ: ${state.simRate} ${bp.unit} (XUNG KIỂM THỬ)`;
      if (state.interactiveAudioEnabled) {
        playHarmonicChord(329.63, 0.8);
      }
    });
  }

  const playChordBtn = document.getElementById("play-ambient-chord-btn");
  const stopChordBtn = document.getElementById("stop-ambient-chord-btn");
  if (playChordBtn) {
    playChordBtn.addEventListener("click", () => {
      const chords = [220.0, 261.63, 329.63, 392.0];
      let stepIdx = 0;
      if (activeChordTimer) clearInterval(activeChordTimer);

      const playStep = () => {
        const freq = chords[stepIdx % chords.length];
        stepIdx += 1;
        const trackTitle = document.getElementById("sonic-track-title");
        if (trackTitle) {
          trackTitle.textContent = `Đang phát chuỗi hợp âm Studio (${freq.toFixed(1)} Hz)`;
        }
        playHarmonicChord(freq, 1.6);
      };

      playStep();
      activeChordTimer = setInterval(playStep, 1700);
    });
  }

  if (stopChordBtn) {
    stopChordBtn.addEventListener("click", () => {
      if (activeChordTimer) {
        clearInterval(activeChordTimer);
        activeChordTimer = null;
      }
      soundEnergy = 0.05;
      const trackTitle = document.getElementById("sonic-track-title");
      if (trackTitle) {
        trackTitle.textContent = "Đã dừng phát âm thanh Studio";
      }
      updateAudioIndicator(false, "Âm thanh Web Audio: Đã dừng");
    });
  }

  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.activeCategory = tab.getAttribute("data-category") || "all";
      document.querySelectorAll(".filter-tab").forEach((t) => {
        t.setAttribute("aria-selected", String(t === tab));
      });
      if (state.uiState !== "ready") {
        setUiState("ready");
      } else {
        renderVault();
      }
    });
  });

  const searchInput = document.getElementById("vault-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      state.searchQuery = searchInput.value;
      if (state.uiState !== "ready") {
        setUiState("ready");
      } else {
        renderVault();
      }
    });
  }

  document.querySelectorAll(".state-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setUiState(btn.getAttribute("data-ui-state") || "ready");
    });
  });

  const vaultForm = document.getElementById("vault-item-form");
  if (vaultForm) {
    vaultForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const category = document.getElementById("item-category-select").value;
      const freq = parseFloat(document.getElementById("item-freq-select").value) || 261.63;
      const title = document.getElementById("item-title-input").value.trim();
      const creator = document.getElementById("item-creator-input").value.trim();
      const note = document.getElementById("item-note-input").value.trim();
      const isSpotlight = document.getElementById("item-spotlight-check").checked;

      if (!title || !creator || !note) {
        showFeedback(
          "vault-form-feedback",
          "error",
          "Lỗi nhập liệu: Vui lòng điền đầy đủ Tên mục, Tác giả/Thông số và Góc nhìn thực tế trước khi lưu."
        );
        return;
      }

      if (isSpotlight) {
        state.vaultItems.forEach((item) => {
          item.isSpotlight = false;
        });
      }

      const newItem = {
        id: `custom-${Date.now()}`,
        category,
        categoryLabel: CATEGORY_MAP[category] || "Sách tâm đắc",
        title,
        creator,
        note,
        freq,
        isSpotlight,
        isPlaceholder: false
      };

      state.vaultItems.unshift(newItem);
      saveVaultToStorage();
      setUiState("ready");
      vaultForm.reset();

      showFeedback(
        "vault-form-feedback",
        "success",
        `Đã lưu "${title}" vào Góc Cá Nhân (Dữ liệu thật của bạn).`
      );
    });
  }

  const exportBtn = document.getElementById("export-json-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const payload = {
        exportedAt: new Date().toISOString(),
        identity: state.identity,
        vaultItems: state.vaultItems
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "personal-playground-data.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showFeedback(
        "vault-form-feedback",
        "success",
        "Đã xuất tệp personal-playground-data.json thành công."
      );
    });
  }

  const resetBtn = document.getElementById("reset-default-data-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      state.vaultItems = DEFAULT_VAULT_ITEMS.map((item) => ({ ...item }));
      saveVaultToStorage();
      setUiState("ready");
      showFeedback(
        "vault-form-feedback",
        "success",
        "Đã khôi phục danh sách mẫu [REAL DATA] ban đầu."
      );
    });
  }

  const contactForm = document.getElementById("contact-signal-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("sender-name-input").value.trim();
      const email = document.getElementById("sender-email-input").value.trim();
      const topic = document.getElementById("sender-topic-select").value;
      const message = document.getElementById("sender-message-input").value.trim();

      if (!name || !email || !email.includes("@") || !message) {
        showFeedback(
          "contact-form-feedback",
          "error",
          "Lỗi xác thực: Vui lòng nhập Tên của bạn, địa chỉ email hợp lệ (có ký tự @) và nội dung tin nhắn cụ thể."
        );
        return;
      }

      const subject = encodeURIComponent(`[${topic}] Tín hiệu từ ${name}`);
      const body = encodeURIComponent(`Người gửi: ${name} (${email})\nChủ đề: ${topic}\n\nNội dung:\n${message}`);
      const mailtoLink = document.getElementById("direct-mailto-link");
      if (mailtoLink) {
        mailtoLink.setAttribute("href", `mailto:hello@example.com?subject=${subject}&body=${body}`);
      }

      showFeedback(
        "contact-form-feedback",
        "success",
        `Đã chuẩn bị bản tin từ ${name} (${email}). Nhấn "Mở trình gửi thư trực tiếp" bên dưới để gửi đi.`
      );
    });
  }

  // Modal dialog supports opening, closing, and Escape key dismissal with focus return (R-26, R-32).
  const modalBackdrop = document.getElementById("guide-modal-backdrop");
  const openModalBtn = document.getElementById("open-guide-modal-btn");
  const closeModalBtn = document.getElementById("close-guide-modal-btn");
  const confirmModalBtn = document.getElementById("confirm-guide-modal-btn");

  function openModal() {
    if (!modalBackdrop) return;
    modalBackdrop.hidden = false;
    if (closeModalBtn) closeModalBtn.focus();
  }

  function closeModal() {
    if (!modalBackdrop || modalBackdrop.hidden) return;
    modalBackdrop.hidden = true;
    if (openModalBtn) openModalBtn.focus();
  }

  if (openModalBtn) openModalBtn.addEventListener("click", openModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (confirmModalBtn) confirmModalBtn.addEventListener("click", closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modalBackdrop && !modalBackdrop.hidden) {
        closeModal();
      }
      if (primaryNav && primaryNav.getAttribute("data-open") === "true") {
        primaryNav.setAttribute("data-open", "false");
        if (mobileMenuBtn) {
          mobileMenuBtn.setAttribute("aria-expanded", "false");
          mobileMenuBtn.textContent = "Trình đơn";
          mobileMenuBtn.focus();
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadPersistedState();
  applyTheme(state.theme);
  renderIdentity();
  renderLabBlueprint(0);
  renderVault();
  bindEvents();
  initKineticCanvas();
  initBlueprintPacketAnimation();
  initWaveformVisualizer();
});
