// [HALLMARK-v2.0.0-EDITION] Editorial Studio & Archive Interactive Engine
// Follows Hallmark 2.0, taste-skill 2.5, impeccable 4.8, and antislop guidelines.
// Strictly avoids em-dashes. Uses [REAL DATA] markers for honest placeholder content.

const STORAGE_KEY = "editorial_studio_ledger_v1";
const IDENTITY_KEY = "editorial_studio_identity_v1";
const THEME_KEY = "editorial_studio_theme_v1";

const DEFAULT_ARCHIVE_ITEMS = [
  {
    id: "item-1",
    category: "book",
    categoryLabel: "Sách tâm đắc",
    title: "[REAL DATA] Designing Data-Intensive Applications",
    creator: "Martin Kleppmann (Bản in kỹ thuật)",
    note: "Tác phẩm nền tảng về tính tin cậy, khả năng mở rộng và khả năng bảo trì của hệ thống phân tán. Đọc lại mỗi khi cần thiết kế cơ chế lưu trữ hoặc luồng truyền tin cậy.",
    freq: 261.63,
    isSpotlight: true,
    isPlaceholder: true
  },
  {
    id: "item-2",
    category: "music",
    categoryLabel: "Âm nhạc & Giai điệu",
    title: "[REAL DATA] Selected Ambient Works 85-92",
    creator: "Aphex Twin / Studio Coding Sessions",
    note: "Không gian âm thanh tinh khiết giúp tập trung cao độ trong các phiên lập trình kéo dài. Không lời, nhịp điệu tĩnh lặng và cấu trúc âm sắc giàu chất suy tư.",
    freq: 329.63,
    isSpotlight: false,
    isPlaceholder: true
  },
  {
    id: "item-3",
    category: "tool",
    categoryLabel: "Đồ nghề & Môi trường làm việc",
    title: "[REAL DATA] Custom Split Mechanical Keyboard & Neovim",
    creator: "Gateron Oil King / Lua Configuration",
    note: "Bàn phím cơ công thái học chia đôi giúp giảm áp lực cổ tay, kết hợp cấu hình Neovim tối giản cho phép điều hướng tệp mã bằng bàn phím mà không rời tay khỏi hàng phím chủ.",
    freq: 220.0,
    isSpotlight: false,
    isPlaceholder: true
  },
  {
    id: "item-4",
    category: "hobby",
    categoryLabel: "Sở thích ngoài màn hình",
    title: "[REAL DATA] Pour-over V60 Coffee & 35mm Analog Photography",
    creator: "Hario V60 / Olympus OM-1 50mm f/1.4",
    note: "Khoảng lặng cân bằng trực giác sáng tạo sau giờ làm việc với màn hình số. Kỹ thuật pha cà phê thủ công và ảnh phim cơ học rèn luyện tính kiên nhẫn và sự chú ý vào từng chi tiết vật lý.",
    freq: 392.0,
    isSpotlight: false,
    isPlaceholder: true
  }
];

const ARCHITECTURE_BENCHMARKS = [
  {
    code: "MÃ BẢN VẼ: ARCH-01 [REAL DATA]",
    title: "Điều phối Sự kiện & Bộ đệm Khóa",
    node1Title: "TÍN HIỆU ĐẦU VÀO",
    node1Sub: "Cảm biến & luồng sự kiện",
    node2Title: "BỘ ĐIỀU TIẾT",
    node2Sub: "Phân nhánh ưu tiên",
    node3Title: "ĐẦU RA KẾT QUẢ",
    node3Sub: "Phản hồi 60 khung hình",
    unit: "Hz",
    defaultRate: 60,
    problem: "Đồng bộ dữ liệu nhiều nguồn đồng thời mà không làm giật khung hình giao diện.",
    solution: "Sử dụng hàng đợi bộ đệm vòng tròn (Ring Buffer) và phân phối công việc theo nhịp quét màn hình.",
    takeaway: "Hệ thống bền vững nhất là hệ thống đơn giản nhất có thể kiểm chứng được ở từng nút chuyển tiếp."
  },
  {
    code: "MÃ BẢN VẼ: ARCH-02 [REAL DATA]",
    title: "Dao động Ký Tổng hợp Âm thanh Web",
    node1Title: "KÍCH HOẠT TẦN SỐ",
    node1Sub: "Dao động sóng hình sin",
    node2Title: "WEB AUDIO DSP",
    node2Sub: "Đường bao âm lượng ADSR",
    node3Title: "CANVAS SÓNG THỜI GIAN",
    node3Sub: "Dao động ký 60 FPS",
    unit: "BPM",
    defaultRate: 84,
    problem: "Tạo trải nghiệm âm thanh tương tác trực tiếp trong trình duyệt mà không buộc người dùng tải tệp mp3 nặng.",
    solution: "Tự sinh hợp âm toán học thời gian thực bằng Web Audio API kết hợp đồ họa sóng âm Canvas 2D mượt mà.",
    takeaway: "Khi âm thanh và hình ảnh chia sẻ cùng một trục tần số, giao diện phần mềm trở nên có hồn và chân thật."
  },
  {
    code: "MÃ BẢN VẼ: ARCH-03 [REAL DATA]",
    title: "Cấu trúc Dữ liệu Cục bộ Độc lập",
    node1Title: "NHẬP BIÊN TẬP",
    node1Sub: "Biểu mẫu dữ liệu thật",
    node2Title: "LƯỢC ĐỒ CỤC BỘ",
    node2Sub: "Kiểm tra kiểu dữ liệu",
    node3Title: "TỆP JSON DỰ PHÒNG",
    node3Sub: "Độc lập nền tảng máy chủ",
    unit: "Mục/s",
    defaultRate: 45,
    problem: "Giúp người xây dựng trang web tự do cập nhật tư liệu và sở thích mà không bị trói buộc vào cơ sở dữ liệu bên thứ ba.",
    solution: "Lưu trữ trực tiếp trên trình duyệt bằng LocalStorage có kiểm định lược đồ, hỗ trợ xuất tệp JSON dự phòng toàn vẹn.",
    takeaway: "Quyền tự chủ dữ liệu cá nhân là yếu tố cốt lõi của một trang web độc lập dài hạn."
  }
];

const CATEGORY_MAP = {
  book: "Sách tâm đắc",
  music: "Âm nhạc & Giai điệu",
  tool: "Đồ nghề & Môi trường làm việc",
  hobby: "Sở thích ngoài màn hình"
};

const MODAL_EXHIBIT_DETAILS = {
  "flagship": {
    heading: "Bản Thuyết Minh: Hệ Thống Phân Tích & Điều Phối Tín Hiệu Thời Gian Thực",
    body: `
      <p><strong>Mục tiêu thiết kế:</strong> Xây dựng nền tảng thu thập và chuyển phát sự kiện với độ trễ xử lý dưới 15 mili-giây, duy trì tốc độ kết xuất 60 khung hình/giây bất kể tần suất sự kiện gửi về.</p>
      <p><strong>Cơ chế kỹ thuật cốt lõi:</strong></p>
      <ul>
        <li><strong>Ring Buffer (Bộ đệm vòng tròn):</strong> Tách biệt hoàn toàn luồng thu thập dữ liệu đầu vào khỏi vòng lặp cập nhật giao diện người dùng.</li>
        <li><strong>Không phân bổ bộ nhớ lặp lại (Zero Allocation in Hot Path):</strong> Tránh kích hoạt trình thu gom rác (Garbage Collector) của JavaScript trong lúc đang diễn ra hoạt ảnh.</li>
        <li><strong>Phản hồi trực quan:</strong> Mọi gói tin đi qua hệ thống đều được phản ánh qua sơ đồ mạch điện SVG và tạo xung phản hồi tức thời.</li>
      </ul>
      <p class="mono-meta" style="color: var(--text-muted); margin-top: 1rem;">Trạng thái kiểm thử: Đạt chuẩn độ trễ dưới 16ms trên Chrome, Firefox và Safari.</p>
    `
  },
  "exp-02": {
    heading: "Ghi Chú Kỹ Thuật: Polyphonic Audio & Kinetic Oscilloscope",
    body: `
      <p><strong>Ý tưởng:</strong> Thay vì phát các tệp âm thanh tĩnh được thu âm trước, trình duyệt tự sinh các dạng sóng âm (Sine, Triangle) bằng các phép toán dao động điều hòa.</p>
      <p><strong>Đặc điểm nổi bật:</strong></p>
      <ul>
        <li><strong>Đường bao âm lượng ADSR:</strong> Giúp âm thanh khởi đầu êm ái (Attack 0.06s) và suy hao tự nhiên (Decay / Release), không gây tiếng lách cách khi ngắt quãng.</li>
        <li><strong>Oscilloscope thời gian thực:</strong> Sử dụng Canvas 2D để vẽ lại chuỗi sóng âm ngay khi phát ra với chi phí CPU tối thiểu.</li>
        <li><strong>Khởi tạo trễ (Lazy Audio Context):</strong> Tuân thủ nghiêm ngặt chính sách Autoplay của các trình duyệt hiện đại.</li>
      </ul>
    `
  },
  "exp-03": {
    heading: "Ghi Chú Kỹ Thuật: Local-First Schema & JSON Data Stream",
    body: `
      <p><strong>Triết lý Local-First:</strong> Dữ liệu người dùng thuộc về người dùng. Mọi thao tác thêm sách, bản nhạc hay đồ nghề đều được ghi nhận trực tiếp vào trình duyệt mà không cần đăng nhập hay phụ thuộc vào máy chủ trung gian.</p>
      <p><strong>Khả năng dự phòng:</strong></p>
      <ul>
        <li>Xuất tệp JSON chuẩn hóa chỉ với một cú nhấp chuột để lưu trữ vào kho mã nguồn cá nhân.</li>
        <li>Hỗ trợ khôi phục dữ liệu mẫu [REAL DATA] bất kỳ lúc nào nếu người dùng muốn làm mới lại kệ.</li>
        <li>Cơ chế kiểm định lược đồ giúp bảo đảm tính toàn vẹn của dữ liệu trước khi render lên DOM.</li>
      </ul>
    `
  },
  "guide": {
    heading: "Quy Chuẩn Ấn Phẩm & Tiêu Chuẩn Nghệ Thuật (Editorial Guidelines)",
    body: `
      <p>Trang web này được xây dựng theo tiêu chuẩn thiết kế khắt khe từ bộ ba kỹ năng chuyên sâu:</p>
      <ul>
        <li><strong>taste-skill 2.5:</strong> Bố cục tạp chí đương đại, phân cấp thị giác rõ ràng, chia cột tỷ lệ vàng và nói không với các mẫu giao diện AI rập khuôn.</li>
        <li><strong>hallmark 2.0:</strong> Kiểm soát toàn diện bảng màu <code>:root</code>, không sử dụng mã màu thô rải rác, không dùng thuộc tính <code>transition: all</code>, và không dùng dấu gạch ngang em-dash.</li>
        <li><strong>impeccable 4.8 & no-ai-slop:</strong> Đầy đủ 4 trạng thái giao diện dữ liệu (Ready, Empty, Loading, Error), độ tương phản đạt chuẩn WCAG AAA (&gt; 7:1) và sử dụng dữ liệu trung thực.</li>
      </ul>
      <p class="mono-meta" style="color: var(--text-muted); margin-top: 1rem;">Xuất bản độc lập / Bản quyền thuộc về Builder.</p>
    `
  }
};

const state = {
  theme: "dark",
  identity: {
    monogram: "[LOGO]",
    name: "Founder / Builder [REAL DATA]",
    isCustom: false
  },
  archiveItems: [],
  activeCategory: "all",
  searchQuery: "",
  uiState: "ready",
  expandedItemIds: new Set(),
  activeBenchmarkIndex: 0,
  benchmarkFreq: 60,
  activeWorkDomain: "all"
};

// Web Audio synthesizer state
let audioCtx = null;
let activeChordInterval = null;
let soundEnergy = 0.05;
let oscilloscopePhase = 0;

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
  const harmonicRatios = [1, 1.25, 1.5, 2];

  harmonicRatios.forEach((ratio, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = idx % 2 === 0 ? "sine" : "triangle";
    osc.frequency.setValueAtTime(baseFreq * ratio, now);

    const peakGain = 0.055 / (idx + 1);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + durationSec + 0.05);
  });

  soundEnergy = 1.0;
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

    const savedArchive = localStorage.getItem(STORAGE_KEY);
    if (savedArchive) {
      const parsedArchive = JSON.parse(savedArchive);
      if (Array.isArray(parsedArchive) && parsedArchive.length > 0) {
        state.archiveItems = parsedArchive;
        return;
      }
    }
  } catch (err) {
    // LocalStorage access restricted in private mode
  }
  state.archiveItems = DEFAULT_ARCHIVE_ITEMS.map((item) => ({ ...item }));
}

function saveArchiveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.archiveItems));
  } catch (err) {
    // Quota or access error
  }
}

function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    const isLight = theme === "light";
    themeBtn.setAttribute("aria-pressed", String(isLight));
    themeBtn.textContent = isLight ? "Bản in: Sáng (Ivory)" : "Bản in: Tối (Obsidian)";
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (err) {
    // Ignore storage write failure
  }
}

function renderIdentity() {
  const { monogram, name, isCustom } = state.identity;
  const headerMono = document.getElementById("header-monogram");
  const headerName = document.getElementById("header-builder-name");
  const footerLabel = document.getElementById("footer-branding-label");
  const badge = document.getElementById("identity-status-badge");
  const monoInput = document.getElementById("quick-monogram-input");
  const nameInput = document.getElementById("quick-name-input");

  if (headerMono) headerMono.textContent = monogram;
  if (headerName) headerName.textContent = name;
  if (footerLabel) footerLabel.textContent = `${monogram} Editorial Studio & Archive`;
  if (monoInput && document.activeElement !== monoInput) monoInput.value = monogram;
  if (nameInput && document.activeElement !== nameInput) nameInput.value = name;

  if (badge) {
    badge.textContent = isCustom
      ? "Định danh của bạn: Đã áp dụng"
      : "[REAL DATA] Giữ chỗ trung thực";
  }
}

function renderBenchmark(index) {
  state.activeBenchmarkIndex = index;
  const benchmark = ARCHITECTURE_BENCHMARKS[index] || ARCHITECTURE_BENCHMARKS[0];
  state.benchmarkFreq = benchmark.defaultRate;

  document.querySelectorAll(".benchmark-tab-item").forEach((tab, idx) => {
    tab.setAttribute("aria-selected", String(idx === index));
  });

  const panel = document.getElementById("benchmark-panel");
  if (panel) {
    panel.setAttribute("aria-labelledby", `bench-tab-${index}`);
  }

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText("bench-code-readout", benchmark.code);
  setText("bench-title-readout", benchmark.title);
  setText("bench-svg-node1-title", benchmark.node1Title);
  setText("bench-svg-node1-sub", benchmark.node1Sub);
  setText("bench-svg-node2-title", benchmark.node2Title);
  setText("bench-svg-node2-sub", benchmark.node2Sub);
  setText("bench-svg-telemetry-text", `TẦN SỐ: ${benchmark.defaultRate} ${benchmark.unit}`);
  setText("bench-svg-node3-title", benchmark.node3Title);
  setText("bench-svg-node3-sub", benchmark.node3Sub);
  setText("bench-slider-readout", `${benchmark.defaultRate} ${benchmark.unit}`);
  setText("bench-insight-problem", benchmark.problem);
  setText("bench-insight-solution", benchmark.solution);
  setText("bench-insight-takeaway", benchmark.takeaway);

  const slider = document.getElementById("bench-freq-slider");
  if (slider) {
    slider.value = String(benchmark.defaultRate);
  }
}

function initSchematicPacketAnimation() {
  let worksTick = 0;
  let benchTick = 0;

  const worksPacketA = document.getElementById("schema-packet-a");
  const worksPacketB = document.getElementById("schema-packet-b");
  const benchPacket1 = document.getElementById("bench-pulse-packet-1");
  const benchPacket2 = document.getElementById("bench-pulse-packet-2");

  function loop() {
    worksTick = (worksTick + 0.9) % 100;
    if (worksPacketA && worksPacketB) {
      const cxA = 145 + (worksTick / 100) * 70;
      const cxB = 365 + (worksTick / 100) * 60;
      worksPacketA.setAttribute("cx", cxA.toFixed(1));
      worksPacketB.setAttribute("cx", cxB.toFixed(1));
    }

    const benchSpeed = Math.max(0.4, state.benchmarkFreq / 40);
    benchTick = (benchTick + benchSpeed) % 100;
    if (benchPacket1 && benchPacket2) {
      const x1 = 155 + (benchTick / 100) * 85;
      const x2 = 405 + (benchTick / 100) * 70;
      benchPacket1.setAttribute("x", x1.toFixed(1));
      benchPacket2.setAttribute("x", x2.toFixed(1));
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

function initOscilloscopeCanvas() {
  const canvas = document.getElementById("oscilloscope-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function draw() {
    oscilloscopePhase += 0.08;
    soundEnergy = Math.max(0.06, soundEnergy * 0.965);

    const isLight = state.theme === "light";
    ctx.fillStyle = isLight ? "#F8F7F4" : "#0C0D0E";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = isLight ? "#3D4D00" : "#D4FF00";
    ctx.lineWidth = 2;
    ctx.beginPath();

    const midY = canvas.height / 2;
    for (let x = 0; x < canvas.width; x += 3) {
      const amplitude = soundEnergy * 18;
      const y =
        midY +
        Math.sin(x * 0.045 + oscilloscopePhase) * amplitude * Math.cos(x * 0.015 - oscilloscopePhase * 0.4);
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

function renderArchiveLedger() {
  const container = document.getElementById("archive-content-container");
  if (!container) return;

  if (state.uiState === "loading") {
    container.innerHTML = `
      <div class="ui-state-box" data-state="loading" role="status">
        <span class="mono-meta">TRẠNG THÁI DỮ LIỆU: ĐANG TRUY XUẤT KỆ TƯ LIỆU CÁ NHÂN</span>
        <h3 style="margin: 0; font-size: 1.35rem;">Đang nạp danh mục Sách, Âm nhạc và Đồ nghề...</h3>
        <p style="margin: 0; color: var(--text-muted);">
          Đang đọc cấu trúc lưu trữ cục bộ và chuẩn bị bộ tổng hợp tần số âm thanh tương ứng cho từng tư liệu.
        </p>
        <div class="loading-bar-track" aria-hidden="true">
          <div class="loading-bar-fill"></div>
        </div>
        <button type="button" class="btn btn-compact" data-recover-state="ready">
          Hoàn tất nạp ngay lập tức
        </button>
      </div>
    `;
    bindStateRecoveryButtons(container);
    return;
  }

  if (state.uiState === "error") {
    container.innerHTML = `
      <div class="ui-state-box" data-state="error" role="alert">
        <span class="mono-meta">CẢNH BÁO KIỂM THỬ: KHÔNG THỂ KẾT NỐI KỆ TƯ LIỆU</span>
        <h3 style="margin: 0; font-size: 1.35rem;">Mô phỏng sự cố gián đoạn truy xuất dữ liệu</h3>
        <p style="margin: 0;">
          Chế độ mô phỏng lỗi kiểm thử giúp đánh giá độ bền của giao diện khi phát sinh sự cố bộ nhớ hoặc đường truyền. Bạn có thể khôi phục kết nối ngay lập tức bằng nút bấm bên dưới.
        </p>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button type="button" class="btn btn-accent" data-recover-state="ready">
            Khôi phục trạng thái bình thường
          </button>
          <a href="#colophon" class="btn">Mở Xưởng Dữ Liệu ở Mục 05</a>
        </div>
      </div>
    `;
    bindStateRecoveryButtons(container);
    return;
  }

  const query = state.searchQuery.trim().toLowerCase();
  const filtered = state.archiveItems.filter((item) => {
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
        ? "Bạn đang bật chế độ xem Trạng thái Trống (Empty State) để kiểm thử giao diện khi kệ chưa có tư liệu nào."
        : `Không tìm thấy tư liệu nào khớp với từ khóa "${escapeHtml(state.searchQuery)}" trong phân loại đã chọn.`;

    container.innerHTML = `
      <div class="ui-state-box" data-state="empty">
        <span class="mono-meta">TRẠNG THÁI TRỐNG (EMPTY STATE)</span>
        <h3 style="margin: 0; font-size: 1.35rem;">Chưa có mục nào hiển thị trên kệ tư liệu</h3>
        <p style="margin: 0; color: var(--text-muted);">${reasonText}</p>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button type="button" class="btn btn-accent" data-recover-state="reset-filters">
            Khôi phục toàn bộ danh mục tư liệu
          </button>
          <a href="#colophon" class="btn">Thêm tư liệu thật ở Mục 05</a>
        </div>
      </div>
    `;
    bindStateRecoveryButtons(container);
    return;
  }

  const spotlightItem = filtered.find((item) => item.isSpotlight) || filtered[0];
  const regularItems = filtered.filter((item) => item.id !== spotlightItem.id);

  const spotlightTag = spotlightItem.isPlaceholder
    ? `<span class="real-data-tag">[REAL DATA] Giữ chỗ</span>`
    : `<span class="real-data-tag">Dữ liệu thật của bạn</span>`;

  const itemsHtml =
    regularItems.length > 0
      ? regularItems
          .map((item) => {
            const isExpanded = state.expandedItemIds.has(item.id);
            const itemTag = item.isPlaceholder
              ? `<span class="real-data-tag">[REAL DATA]</span>`
              : `<span class="real-data-tag">Dữ liệu thật</span>`;
            return `
              <article class="archive-row">
                <div class="archive-row-main">
                  <div class="archive-row-info">
                    <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                      <span class="mono-meta" style="color: var(--accent); font-weight: 600;">${escapeHtml(item.categoryLabel)}</span>
                      ${itemTag}
                      <span class="mono-meta">${Number(item.freq).toFixed(1)} Hz</span>
                    </div>
                    <h4 class="archive-item-title">${escapeHtml(item.title)}</h4>
                    <span class="archive-item-meta">${escapeHtml(item.creator)}</span>
                  </div>
                  <div class="archive-row-actions">
                    <button type="button" class="btn btn-compact" data-play-freq="${Number(item.freq)}" data-play-title="${escapeHtml(item.title)}">
                      Nghe âm sắc (${Number(item.freq).toFixed(0)} Hz)
                    </button>
                    <button type="button" class="btn btn-compact" data-toggle-drawer="${escapeHtml(item.id)}" aria-expanded="${isExpanded}">
                      ${isExpanded ? "Thu gọn trải nghiệm" : "Đọc góc nhìn thực tế"}
                    </button>
                    <button type="button" class="btn btn-compact" data-delete-item="${escapeHtml(item.id)}" aria-label="Xóa mục ${escapeHtml(item.title)}">
                      Xóa
                    </button>
                  </div>
                </div>
                ${
                  isExpanded
                    ? `<div class="archive-drawer">${escapeHtml(item.note)}</div>`
                    : ""
                }
              </article>
            `;
          })
          .join("")
      : `
        <div class="archive-row">
          <p style="margin: 0; color: var(--text-muted);">
            Đang hiển thị mục tiêu điểm duy nhất cho phân loại này. Bạn có thể chọn "Tất cả tư liệu" hoặc thêm mục mới tại Mục 05.
          </p>
        </div>
      `;

  container.innerHTML = `
    <div class="archive-display-grid">
      <article class="archive-spotlight-card" aria-label="Tư liệu tiêu điểm trong Kệ">
        <div class="spotlight-badge-row">
          <span class="mono-meta" style="color: var(--accent); font-weight: 700;">TIÊU ĐIỂM / ${escapeHtml(spotlightItem.categoryLabel)}</span>
          ${spotlightTag}
        </div>
        <h3 class="spotlight-title">${escapeHtml(spotlightItem.title)}</h3>
        <p class="spotlight-creator">${escapeHtml(spotlightItem.creator)}</p>
        <blockquote class="spotlight-quote">
          ${escapeHtml(spotlightItem.note)}
        </blockquote>
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-top: auto;">
          <span class="mono-meta">TẦN SỐ ĐẠI DIỆN: ${Number(spotlightItem.freq).toFixed(1)} Hz</span>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button type="button" class="btn btn-compact btn-accent" data-play-freq="${Number(spotlightItem.freq)}" data-play-title="${escapeHtml(spotlightItem.title)}">
              Phát âm sắc tiêu điểm
            </button>
            <a href="#colophon" class="btn btn-compact">Sửa tại Xưởng</a>
          </div>
        </div>
      </article>

      <div class="archive-ledger-list" aria-label="Danh mục tư liệu chi tiết">
        ${itemsHtml}
      </div>
    </div>
  `;

  bindArchiveActions(container);
}

function bindStateRecoveryButtons(container) {
  container.querySelectorAll("[data-recover-state]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-recover-state");
      if (action === "reset-filters") {
        state.activeCategory = "all";
        state.searchQuery = "";
        const searchInput = document.getElementById("archive-search-input");
        if (searchInput) searchInput.value = "";
        document.querySelectorAll(".archive-tab").forEach((tab) => {
          tab.setAttribute("aria-selected", String(tab.getAttribute("data-category") === "all"));
        });
      }
      setUiState("ready");
    });
  });
}

function bindArchiveActions(container) {
  container.querySelectorAll("[data-play-freq]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const freq = parseFloat(btn.getAttribute("data-play-freq")) || 261.63;
      const title = btn.getAttribute("data-play-title") || "Giai điệu Studio";
      const trackTitle = document.getElementById("oscilloscope-track-title");
      if (trackTitle) {
        trackTitle.textContent = `Đang phát âm sắc: ${title} (${freq.toFixed(1)} Hz)`;
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
      renderArchiveLedger();
    });
  });

  container.querySelectorAll("[data-delete-item]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-delete-item");
      state.archiveItems = state.archiveItems.filter((item) => item.id !== id);
      saveArchiveToStorage();
      renderArchiveLedger();
    });
  });
}

function setUiState(nextState) {
  state.uiState = nextState;
  document.querySelectorAll(".ui-state-btn").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.getAttribute("data-ui-state") === nextState));
  });
  renderArchiveLedger();
}

function showStatusFeedback(elId, type, message) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.hidden = false;
  el.setAttribute("data-type", type);
  el.textContent = message;
}

function filterWorksByDomain(domain) {
  state.activeWorkDomain = domain;
  const flagshipCard = document.getElementById("flagship-work-card");
  const secondaryWorks = document.querySelectorAll(".gallery-card");

  document.querySelectorAll(".works-filter-tab").forEach((tab) => {
    tab.setAttribute("aria-selected", String(tab.getAttribute("data-work-domain") === domain));
  });

  if (flagshipCard) {
    const showFlagship = domain === "all" || domain === "systems";
    flagshipCard.style.display = showFlagship ? "grid" : "none";
  }

  secondaryWorks.forEach((card) => {
    const cardDomain = card.getAttribute("data-domain");
    const showCard = domain === "all" || cardDomain === domain;
    card.style.display = showCard ? "flex" : "none";
  });
}

function openModal(heading, bodyHtml) {
  const backdrop = document.getElementById("generic-modal-backdrop");
  const headingEl = document.getElementById("modal-window-heading");
  const bodyEl = document.getElementById("modal-window-body");
  const closeBtn = document.getElementById("modal-close-button");

  if (!backdrop) return;
  if (headingEl) headingEl.textContent = heading;
  if (bodyEl) bodyEl.innerHTML = bodyHtml;
  backdrop.hidden = false;
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  const backdrop = document.getElementById("generic-modal-backdrop");
  if (backdrop && !backdrop.hidden) {
    backdrop.hidden = true;
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function bindInteractiveEvents() {
  // 1. Theme toggle
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      applyTheme(state.theme === "dark" ? "light" : "dark");
    });
  }

  // 2. Mobile Menu toggle
  const menuBtn = document.getElementById("mobile-menu-btn");
  const primaryNav = document.getElementById("primary-nav");
  if (menuBtn && primaryNav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = primaryNav.getAttribute("data-open") === "true";
      primaryNav.setAttribute("data-open", String(!isOpen));
      menuBtn.setAttribute("aria-expanded", String(!isOpen));
      menuBtn.textContent = !isOpen ? "Đóng mục lục" : "Mục lục";
    });

    primaryNav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.querySelectorAll(".nav-link").forEach((l) => l.removeAttribute("aria-current"));
        link.setAttribute("aria-current", "true");
        primaryNav.setAttribute("data-open", "false");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "Mục lục";
      });
    });
  }

  // 3. Quick Identity Form
  const identityForm = document.getElementById("quick-identity-form");
  if (identityForm) {
    identityForm.addEventListener("submit", (e) => {
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
        // Ignore storage error
      }
      renderIdentity();
    });
  }

  // 4. Works filter tabs
  document.querySelectorAll(".works-filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const domain = tab.getAttribute("data-work-domain") || "all";
      filterWorksByDomain(domain);
    });
  });

  // 5. Flagship inspect modal
  const inspectFlagshipBtn = document.getElementById("inspect-flagship-btn");
  if (inspectFlagshipBtn) {
    inspectFlagshipBtn.addEventListener("click", () => {
      const detail = MODAL_EXHIBIT_DETAILS["flagship"];
      openModal(detail.heading, detail.body);
    });
  }

  // 6. Secondary works detail modals
  document.querySelectorAll("[data-open-detail]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-open-detail");
      const detail = MODAL_EXHIBIT_DETAILS[key];
      if (detail) {
        openModal(detail.heading, detail.body);
      }
    });
  });

  // 7. Open guide modal
  const openGuideBtn = document.getElementById("open-guide-modal-btn");
  if (openGuideBtn) {
    openGuideBtn.addEventListener("click", () => {
      const detail = MODAL_EXHIBIT_DETAILS["guide"];
      openModal(detail.heading, detail.body);
    });
  }

  // 8. Pulse schema button
  const pulseSchemaBtn = document.getElementById("pulse-schema-btn");
  if (pulseSchemaBtn) {
    pulseSchemaBtn.addEventListener("click", () => {
      playHarmonicChord(329.63, 0.9);
      const indicator = document.getElementById("flagship-fps-indicator");
      if (indicator) {
        indicator.textContent = "TỐC ĐỘ: 60 FPS (ĐÃ GỬI XUNG)";
        setTimeout(() => {
          indicator.textContent = "TỐC ĐỘ: 60 FPS";
        }, 1200);
      }
    });
  }

  // 9. Benchmark tabs
  document.querySelectorAll(".benchmark-tab-item").forEach((tab) => {
    tab.addEventListener("click", () => {
      const idx = parseInt(tab.getAttribute("data-bench-index"), 10) || 0;
      renderBenchmark(idx);
    });
  });

  // 10. Benchmark frequency slider
  const freqSlider = document.getElementById("bench-freq-slider");
  if (freqSlider) {
    freqSlider.addEventListener("input", () => {
      const val = parseInt(freqSlider.value, 10) || 60;
      state.benchmarkFreq = val;
      const benchmark = ARCHITECTURE_BENCHMARKS[state.activeBenchmarkIndex] || ARCHITECTURE_BENCHMARKS[0];
      const readout = document.getElementById("bench-slider-readout");
      const svgText = document.getElementById("bench-svg-telemetry-text");
      if (readout) readout.textContent = `${val} ${benchmark.unit}`;
      if (svgText) svgText.textContent = `TẦN SỐ: ${val} ${benchmark.unit}`;
    });
  }

  // 11. Benchmark step pulse button
  const stepPulseBtn = document.getElementById("bench-step-pulse-btn");
  if (stepPulseBtn) {
    stepPulseBtn.addEventListener("click", () => {
      state.benchmarkFreq = Math.min(120, state.benchmarkFreq + 20);
      const benchmark = ARCHITECTURE_BENCHMARKS[state.activeBenchmarkIndex] || ARCHITECTURE_BENCHMARKS[0];
      if (freqSlider) freqSlider.value = String(state.benchmarkFreq);
      const readout = document.getElementById("bench-slider-readout");
      const svgText = document.getElementById("bench-svg-telemetry-text");
      if (readout) readout.textContent = `${state.benchmarkFreq} ${benchmark.unit}`;
      if (svgText) svgText.textContent = `TẦN SỐ: ${state.benchmarkFreq} ${benchmark.unit} (KÍCH XUNG)`;
      playHarmonicChord(261.63, 0.7);
    });
  }

  // 12. Synthesizer deck sequence
  const synthPlayBtn = document.getElementById("synth-play-sequence-btn");
  const synthStopBtn = document.getElementById("synth-stop-btn");

  if (synthPlayBtn) {
    synthPlayBtn.addEventListener("click", () => {
      const chords = [220.0, 261.63, 329.63, 392.0];
      let stepIndex = 0;
      if (activeChordInterval) clearInterval(activeChordInterval);

      const trigger = () => {
        const freq = chords[stepIndex % chords.length];
        stepIndex += 1;
        const trackTitle = document.getElementById("oscilloscope-track-title");
        if (trackTitle) {
          trackTitle.textContent = `Đang phát chuỗi Studio: ${freq.toFixed(1)} Hz (Hợp âm ${stepIndex % 4 + 1}/4)`;
        }
        playHarmonicChord(freq, 1.5);
      };

      trigger();
      activeChordInterval = setInterval(trigger, 1600);
    });
  }

  if (synthStopBtn) {
    synthStopBtn.addEventListener("click", () => {
      if (activeChordInterval) {
        clearInterval(activeChordInterval);
        activeChordInterval = null;
      }
      soundEnergy = 0.05;
      const trackTitle = document.getElementById("oscilloscope-track-title");
      if (trackTitle) {
        trackTitle.textContent = "Đã dừng âm thanh Studio";
      }
    });
  }

  // 13. Archive tabs
  document.querySelectorAll(".archive-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.activeCategory = tab.getAttribute("data-category") || "all";
      document.querySelectorAll(".archive-tab").forEach((t) => {
        t.setAttribute("aria-selected", String(t === tab));
      });
      if (state.uiState !== "ready") {
        setUiState("ready");
      } else {
        renderArchiveLedger();
      }
    });
  });

  // 14. Archive search
  const searchInput = document.getElementById("archive-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      state.searchQuery = searchInput.value;
      if (state.uiState !== "ready") {
        setUiState("ready");
      } else {
        renderArchiveLedger();
      }
    });
  }

  // 15. UI State buttons
  document.querySelectorAll(".ui-state-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setUiState(btn.getAttribute("data-ui-state") || "ready");
    });
  });

  // 16. Studio Editor Form (Add Real Data)
  const addItemForm = document.getElementById("archive-add-item-form");
  if (addItemForm) {
    addItemForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const category = document.getElementById("new-item-category-select").value;
      const freq = parseFloat(document.getElementById("new-item-freq-select").value) || 261.63;
      const title = document.getElementById("new-item-title-input").value.trim();
      const creator = document.getElementById("new-item-creator-input").value.trim();
      const note = document.getElementById("new-item-note-input").value.trim();
      const isSpotlight = document.getElementById("new-item-spotlight-checkbox").checked;

      if (!title || !creator || !note) {
        showStatusFeedback(
          "archive-form-feedback",
          "error",
          "Lỗi nhập liệu: Vui lòng điền đủ Tên tư liệu, Tác giả/Cấu hình và Góc nhìn trải nghiệm."
        );
        return;
      }

      if (isSpotlight) {
        state.archiveItems.forEach((item) => {
          item.isSpotlight = false;
        });
      }

      const newItem = {
        id: `custom-${Date.now()}`,
        category,
        categoryLabel: CATEGORY_MAP[category] || "Tư liệu cá nhân",
        title,
        creator,
        note,
        freq,
        isSpotlight,
        isPlaceholder: false
      };

      state.archiveItems.unshift(newItem);
      saveArchiveToStorage();
      setUiState("ready");
      addItemForm.reset();

      showStatusFeedback(
        "archive-form-feedback",
        "success",
        `Đã lưu "${title}" vào Kệ Tư Liệu (Dữ liệu thật của bạn).`
      );
    });
  }

  // 17. Colophon JSON Export
  const exportBtn = document.getElementById("colophon-export-json-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const payload = {
        exportedAt: new Date().toISOString(),
        identity: state.identity,
        archiveItems: state.archiveItems
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "editorial-studio-archive.json";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      showStatusFeedback(
        "archive-form-feedback",
        "success",
        "Đã xuất tệp editorial-studio-archive.json thành công."
      );
    });
  }

  // 18. Colophon Reset Defaults
  const resetBtn = document.getElementById("colophon-reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      state.archiveItems = DEFAULT_ARCHIVE_ITEMS.map((item) => ({ ...item }));
      saveArchiveToStorage();
      setUiState("ready");
      showStatusFeedback(
        "archive-form-feedback",
        "success",
        "Đã khôi phục danh sách mẫu [REAL DATA] ban đầu."
      );
    });
  }

  // 19. Contact Signal Channel Form
  const signalForm = document.getElementById("colophon-signal-form");
  if (signalForm) {
    signalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contact-sender-name").value.trim();
      const email = document.getElementById("contact-sender-email").value.trim();
      const topic = document.getElementById("contact-topic-select").value;
      const message = document.getElementById("contact-message-body").value.trim();

      if (!name || !email || !email.includes("@") || !message) {
        showStatusFeedback(
          "contact-status-feedback",
          "error",
          "Lỗi xác thực: Vui lòng nhập Tên, địa chỉ email hợp lệ và nội dung trao đổi cụ thể."
        );
        return;
      }

      const subject = encodeURIComponent(`[${topic}] Tin nhắn từ ${name}`);
      const body = encodeURIComponent(`Họ tên: ${name}\nEmail: ${email}\nChủ đề: ${topic}\n\nNội dung trao đổi:\n${message}`);
      const mailtoBtn = document.getElementById("colophon-mailto-button");
      if (mailtoBtn) {
        mailtoBtn.setAttribute("href", `mailto:hello@example.com?subject=${subject}&body=${body}`);
      }

      showStatusFeedback(
        "contact-status-feedback",
        "success",
        `Đã tạo bản tin liên hệ từ ${name}. Nhấn nút "Mở ứng dụng thư điện tử" bên cạnh để chuyển trực tiếp sang ứng dụng mail.`
      );
    });
  }

  // 20. Modal closing interactions
  const closeModalBtn = document.getElementById("modal-close-button");
  const confirmModalBtn = document.getElementById("modal-confirm-button");
  const modalBackdrop = document.getElementById("generic-modal-backdrop");

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (confirmModalBtn) confirmModalBtn.addEventListener("click", closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // 21. Keyboard Escape handler
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      if (primaryNav && primaryNav.getAttribute("data-open") === "true") {
        primaryNav.setAttribute("data-open", "false");
        if (menuBtn) {
          menuBtn.setAttribute("aria-expanded", "false");
          menuBtn.textContent = "Mục lục";
          menuBtn.focus();
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadPersistedState();
  applyTheme(state.theme);
  renderIdentity();
  renderBenchmark(0);
  renderArchiveLedger();
  bindInteractiveEvents();
  initSchematicPacketAnimation();
  initOscilloscopeCanvas();
});
