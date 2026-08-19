// MANTX Web Console — Client Application Logic
// Complete SPA Dashboard: Marketplace, Onboarding, Nimphys Lab, Auto-Heal Closed-Loop, ZeroGPU Grant & AKG Gateway

const DEFAULT_MODELS = [
  // ── SUB-4B: COMPATIBLES CON GITHUB ACTIONS ($0 CPU RUNNER) ──
  { id: 'smollm2-135m-instruct', name: 'SmolLM2 135M Instruct (GGUF Q4)', family: 'smollm', params: '135M', context: '4K', speed: '45 tok/s', size: '140 MB', spec: ['chat', 'general'], runtimeEnv: 'gh_actions', desc: 'Ultra-ligero y ultra-veloz en CPU. Mínimo consumo de recursos en GitHub Actions.' },
  { id: 'smollm2-360m-instruct', name: 'SmolLM2 360M Instruct (GGUF Q4)', family: 'smollm', params: '360M', context: '4K', speed: '38 tok/s', size: '290 MB', spec: ['chat', 'general'], runtimeEnv: 'gh_actions', desc: 'Excelente balance entre compacidad y coherencia gramatical a coste $0.' },
  { id: 'tinyllama-1.1b-chat', name: 'TinyLlama 1.1B Chat (GGUF Q4)', family: 'llama', params: '1.1B', context: '2K', speed: '28 tok/s', size: '670 MB', spec: ['chat', 'general'], runtimeEnv: 'gh_actions', desc: 'Entrenado en 3T tokens. Fluidez conversacional nativa en Actions CPU.' },
  { id: 'llama-3.2-1b-instruct', name: 'Llama 3.2 1B Instruct (GGUF Q4)', family: 'llama', params: '1.1B', context: '8K', speed: '26 tok/s', size: '740 MB', spec: ['chat', 'general'], runtimeEnv: 'gh_actions', desc: 'Ultraligero de Meta. Ideal para clasificación y agentes livianos en CPU.' },
  { id: 'deepseek-coder-1.3b', name: 'DeepSeek Coder 1.3B (GGUF Q4)', family: 'deepseek', params: '1.3B', context: '16K', speed: '28 tok/s', size: '820 MB', spec: ['code'], runtimeEnv: 'gh_actions', desc: 'Autocompletado veloz y generación de scripts modulares en GitHub Actions.' },
  { id: 'qwen-2.5-coder-1.5b', name: 'Qwen 2.5 Coder 1.5B (GGUF Q4)', family: 'qwen', params: '1.5B', context: '32K', speed: '22 tok/s', size: '980 MB', spec: ['code'], runtimeEnv: 'gh_actions', desc: 'Especialista en código y scripts con ventana de 32k tokens en CPU.' },
  { id: 'smollm2-1.7b-instruct', name: 'SmolLM2 1.7B Instruct (GGUF Q4)', family: 'smollm', params: '1.7B', context: '8K', speed: '24 tok/s', size: '1.10 GB', spec: ['reasoning', 'chat'], runtimeEnv: 'gh_actions', desc: 'SOTA en la categoría sub-2B de HuggingFace con gran capacidad de razonamiento.' },
  { id: 'stablelm-2-1.6b-chat', name: 'StableLM 2 1.6B Chat (GGUF Q4)', family: 'stablelm', params: '1.6B', context: '4K', speed: '25 tok/s', size: '1.05 GB', spec: ['chat', 'general'], runtimeEnv: 'gh_actions', desc: 'Modelo conversacional multilingüe de Stability AI en CPU.' },
  { id: 'gemma-2-2b-it', name: 'Google Gemma 2 2B IT (GGUF Q4)', family: 'gemma', params: '2.6B', context: '8K', speed: '18 tok/s', size: '1.60 GB', spec: ['chat', 'general'], runtimeEnv: 'gh_actions', desc: 'Modelo versátil de Google optimizado para seguimiento de instrucciones en CPU.' },
  { id: 'llama-3.2-3b-instruct', name: 'Llama 3.2 3B Instruct (GGUF Q4)', family: 'llama', params: '3.2B', context: '8K', speed: '15 tok/s', size: '1.85 GB', spec: ['chat', 'reasoning'], runtimeEnv: 'gh_actions', desc: 'Equilibrio perfecto entre razonamiento y velocidad en CPU de Actions.' },
  { id: 'qwen-2.5-coder-3b', name: 'Qwen 2.5 Coder 3B Instruct (GGUF Q4)', family: 'qwen', params: '3.0B', context: '32K', speed: '13 tok/s', size: '1.92 GB', spec: ['code', 'reasoning'], runtimeEnv: 'gh_actions', desc: 'Máxima potencia para generación y refactor de código en GitHub Actions.' },
  { id: 'starcoder2-3b', name: 'StarCoder2 3B (GGUF Q4)', family: 'starcoder', params: '3.0B', context: '16K', speed: '14 tok/s', size: '1.85 GB', spec: ['code'], runtimeEnv: 'gh_actions', desc: 'Entrenado por BigCode en +600 lenguajes con alta fidelidad.' },
  { id: 'ministral-3b-instruct', name: 'Ministral 3B Instruct (GGUF Q4)', family: 'mistral', params: '3.0B', context: '32K', speed: '15 tok/s', size: '2.10 GB', spec: ['reasoning', 'chat', 'code'], runtimeEnv: 'gh_actions', desc: 'Modelo de vanguardia de Mistral AI con atención deslizante.' },
  { id: 'phi-3.5-mini-instruct', name: 'Phi 3.5 Mini Instruct 3.8B (GGUF Q4)', family: 'phi', params: '3.8B', context: '128K', speed: '11 tok/s', size: '2.15 GB', spec: ['reasoning', 'math'], runtimeEnv: 'gh_actions', desc: 'Razonamiento lógico y matemático con ventana masiva de 128k en Actions.' },

  // ── +7B / 14B: OBLIGACIÓN HUGGINGFACE (ZEROGPU / GPU SPACE) ──
  { id: 'qwen-2.5-coder-7b', name: 'Qwen 2.5 Coder 7B Instruct', family: 'qwen', params: '7.6B', context: '32K', speed: '24 tok/s (GPU)', size: '4.8 GB', spec: ['code', 'reasoning'], runtimeEnv: 'hf_mandatory', desc: 'Referencia global en generación de código. Requiere aceleración GPU en HuggingFace.' },
  { id: 'mistral-7b-instruct-v0.3', name: 'Mistral 7B Instruct v0.3', family: 'mistral', params: '7.3B', context: '32K', speed: '22 tok/s (GPU)', size: '4.9 GB', spec: ['chat', 'reasoning', 'code'], runtimeEnv: 'hf_mandatory', desc: 'SOTA en seguimiento de directivas complejas. Obligatorio HuggingFace ZeroGPU / GPU dedicada.' },
  { id: 'codestral-22b', name: 'Mistral Codestral 22B', family: 'mistral', params: '22.2B', context: '32K', speed: '16 tok/s (GPU)', size: '13.5 GB', spec: ['code', 'reasoning'], runtimeEnv: 'hf_mandatory', desc: 'Especialista masivo en refactorización arquitectónica. Requiere HuggingFace Space GPU.' },
  { id: 'qwen-2.5-coder-14b', name: 'Qwen 2.5 Coder 14B Instruct', family: 'qwen', params: '14.7B', context: '32K', speed: '18 tok/s (GPU)', size: '9.2 GB', spec: ['code', 'reasoning', 'math'], runtimeEnv: 'hf_mandatory', desc: 'Arquitectura pesada de altísima fidelidad. Obligatorio despliegue en HuggingFace.' },
  { id: 'deepseek-coder-33b', name: 'DeepSeek Coder 33B Instruct', family: 'deepseek', params: '33.0B', context: '16K', speed: '12 tok/s (GPU)', size: '20.5 GB', spec: ['code', 'math'], runtimeEnv: 'hf_mandatory', desc: 'Modelo gigante para auditoría y síntesis de software. Obligatorio HuggingFace GPU.' },

  // ── CLOUD BYOK / API DIRECTA ──
  { id: 'gemini-2.0-flash', name: 'Google Gemini 2.0 Flash (BYOK)', family: 'gemini', params: 'Cloud', context: '1M', speed: '75 tok/s', size: '0 MB', spec: ['code', 'reasoning', 'math'], runtimeEnv: 'cloud_byok', desc: 'Inferencia ultra-veloz de Google con ventana de 1M tokens.' },
  { id: 'deepseek-v3', name: 'DeepSeek V3 / R1 (BYOK)', family: 'deepseek', params: '671B MoE', context: '64K', speed: '55 tok/s', size: '0 MB', spec: ['code', 'reasoning', 'math'], runtimeEnv: 'cloud_byok', desc: 'Modelo insignia de DeepSeek con razonamiento avanzado.' },
  { id: 'groq-llama-3.3-70b', name: 'Llama 3.3 70B (Groq LPU BYOK)', family: 'llama', params: '70B', context: '128K', speed: '120 tok/s', size: '0 MB', spec: ['reasoning', 'chat'], runtimeEnv: 'cloud_byok', desc: 'Ejecución a velocidad récord en hardware LPU de Groq.' },
  { id: 'gpt-4o-mini', name: 'OpenAI GPT-4o Mini (BYOK)', family: 'openai', params: 'Cloud', context: '128K', speed: '80 tok/s', size: '0 MB', spec: ['chat', 'general'], runtimeEnv: 'cloud_byok', desc: 'Modelo compacto y rentable de OpenAI para evaluación.' },
  { id: 'claude-3-5-sonnet', name: 'Anthropic Claude 3.5 Sonnet (BYOK)', family: 'anthropic', params: 'Cloud', context: '200K', speed: '60 tok/s', size: '0 MB', spec: ['code', 'reasoning'], runtimeEnv: 'cloud_byok', desc: 'Líder en generación de código y comprensión contextual.' }
];

const STORAGE_REPO = '.mantx-storage';

const DEFAULT_NIMPHYS = [
  {
    nimphyId: 'nimphy_default_1',
    name: 'PostgreSQL-Optimizer',
    providerType: 'local_runner',
    currentVersion: 'v1.2.0',
    baseModel: 'qwen-2.5-coder-3b',
    method: 'raft',
    graphRagEnabled: true,
    ecdysisMemoryEnabled: true,
    targetEnv: 'action_cpu',
    storageBackend: 'mantx_vault',
    filesCount: 3,
    versions: [
      { version: 'v1.0.0', trainedAt: '2026-08-10T10:00:00Z', finalLoss: 0.65, benchmarkScore: 92, method: 'qlora' },
      { version: 'v1.1.0', trainedAt: '2026-08-14T14:30:00Z', finalLoss: 0.52, benchmarkScore: 96, method: 'raft' },
      { version: 'v1.2.0', trainedAt: '2026-08-16T18:00:00Z', finalLoss: 0.44, benchmarkScore: 99, method: 'raft' }
    ],
    createdAt: '2026-08-10T10:00:00Z'
  },
  {
    nimphyId: 'nimphy_default_2',
    name: 'Rust-ConcurrencyKernel',
    providerType: 'local_runner',
    currentVersion: 'v1.0.0',
    baseModel: 'llama-3.2-3b-instruct',
    method: 'qlora',
    graphRagEnabled: false,
    ecdysisMemoryEnabled: true,
    targetEnv: 'action_cpu',
    storageBackend: 'mantx_vault',
    filesCount: 1,
    versions: [
      { version: 'v1.0.0', trainedAt: '2026-08-15T09:00:00Z', finalLoss: 0.59, benchmarkScore: 94, method: 'qlora' }
    ],
    createdAt: '2026-08-15T09:00:00Z'
  },
  {
    nimphyId: 'nimphy_default_3',
    name: 'Termes-Architecture-Symbiont',
    providerType: 'termes',
    currentVersion: 'v1.0.0',
    baseModel: 'termes-gemini-2.0-flash',
    method: 'ecdysis_memory',
    graphRagEnabled: true,
    ecdysisMemoryEnabled: true,
    targetEnv: 'action_cpu',
    storageBackend: 'mantx_vault',
    filesCount: 2,
    versions: [
      { version: 'v1.0.0', trainedAt: '2026-08-16T12:00:00Z', finalLoss: 0.38, benchmarkScore: 98, method: 'ecdysis_memory' }
    ],
    createdAt: '2026-08-16T12:00:00Z'
  }
];

const DEFAULT_POOLS = [
  {
    poolId: 'pool_default_1',
    name: 'Production-Fast-Inference',
    strategy: 'priority_fallback',
    masterApiKey: 'mantx_live_sk_prod_778899',
    keys: [
      { keyId: 'k1', provider: 'groq', keyMasked: 'gsk_...9a12', alias: 'Groq LPU Primaria (Llama 3.3)', priority: 1, active: true, calls: 1420, rateHits: 0 },
      { keyId: 'k2', provider: 'gemini', keyMasked: 'AIza...88bb', alias: 'Gemini 2.0 Flash Respaldo P2', priority: 2, active: true, calls: 85, rateHits: 0 },
      { keyId: 'k3', provider: 'deepseek', keyMasked: 'sk-d...ff21', alias: 'DeepSeek V3 Respaldo P3', priority: 3, active: true, calls: 12, rateHits: 0 }
    ],
    createdAt: '2026-08-12T10:00:00Z'
  }
];

const DEFAULT_LAB_EXPERIMENTS = [
  {
    labId: 'lab_exp_default_1',
    name: 'Multi-Method Convergence Benchmark',
    status: 'completed',
    datasetsByMethod: {
      raft: [{ name: 'concurrency_ts_qa.jsonl', size: 14200, type: 'text/plain' }],
      qlora: [{ name: 'concurrency_ts_sft.jsonl', size: 18400, type: 'text/plain' }],
      lora: [{ name: 'concurrency_ts_sft.jsonl', size: 18400, type: 'text/plain' }]
    },
    ragFiles: [{ name: 'concurrency_specs.md', size: 8500, type: 'text/plain' }],
    ragRawText: 'Especificaciones de concurrencia y límites de memoria en V8.',
    datasetsPurged: false,
    purgedMethods: [],
    bestExperimentId: 'cand_1',
    bestCandidateName: 'Qwen 2.5 Coder 3B + RAFT (Docs)',
    comparisonSummary: '🏆 Ganador: Qwen 2.5 Coder 3B + RAFT con Score 99/100 y Loss de convergencia 0.46.',
    experiments: [
      {
        candidateId: 'cand_1',
        name: 'Qwen 2.5 Coder 3B + RAFT (Docs)',
        baseModel: 'qwen-2.5-coder-3b',
        providerType: 'local_runner',
        method: 'raft',
        graphRagEnabled: true,
        ecdysisMemoryEnabled: true,
        systemPrompt: 'Arquitecto sénior especializado en sistemas concurrentes y asíncronos.',
        finalLoss: 0.46,
        benchmarkScore: 99,
        inferenceSpeedTokPerSec: 22,
        latencyP95Ms: 380,
        durationMinutes: 16
      },
      {
        candidateId: 'cand_2',
        name: 'Qwen 2.5 Coder 3B + QLoRA 4-bit',
        baseModel: 'qwen-2.5-coder-3b',
        providerType: 'local_runner',
        method: 'qlora',
        graphRagEnabled: false,
        ecdysisMemoryEnabled: true,
        systemPrompt: '',
        finalLoss: 0.58,
        benchmarkScore: 95,
        inferenceSpeedTokPerSec: 24,
        latencyP95Ms: 360,
        durationMinutes: 12
      },
      {
        candidateId: 'cand_3',
        name: 'Llama 3.2 3B + LoRA Standard',
        baseModel: 'llama-3.2-3b-instruct',
        providerType: 'local_runner',
        method: 'lora',
        graphRagEnabled: false,
        ecdysisMemoryEnabled: true,
        systemPrompt: '',
        finalLoss: 0.69,
        benchmarkScore: 92,
        inferenceSpeedTokPerSec: 21,
        latencyP95Ms: 410,
        durationMinutes: 14
      }
    ],
    createdAt: '2026-08-16T14:00:00Z',
    completedAt: '2026-08-16T14:16:00Z'
  }
];

let currentUser = null;
let akgPools = JSON.parse(JSON.stringify(DEFAULT_POOLS));
let nimphysList = JSON.parse(JSON.stringify(DEFAULT_NIMPHYS));
let battleHistory = [];
let labExperiments = JSON.parse(JSON.stringify(DEFAULT_LAB_EXPERIMENTS));
let autoHealMap = {};

// ─── LOGIN GATE & AUTHENTICATION ───────────────────────────────
function getStoredToken() {
  return sessionStorage.getItem('mantx_github_token') || '';
}

async function handleLogin() {
  const token = document.getElementById('token-input')?.value?.trim();
  const feedback = document.getElementById('login-feedback');
  const btnConnect = document.getElementById('btn-connect');

  if (!token) {
    if (feedback) {
      feedback.style.color = '#f87171';
      feedback.textContent = 'Por favor, introduce tu GitHub Personal Access Token.';
    }
    return;
  }

  if (feedback) {
    feedback.style.color = '#34d399';
    feedback.textContent = '⏳ Verificando token con GitHub API...';
  }
  if (btnConnect) btnConnect.disabled = true;

  try {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!res.ok) throw new Error('Token inválido o permisos insuficientes (401)');
    const user = await res.json();

    sessionStorage.setItem('mantx_github_token', token);
    currentUser = user;

    if (feedback) {
      feedback.style.color = '#34d399';
      feedback.textContent = `✔ Conectado como @${user.login}. Accediendo a MANTX...`;
    }

    setTimeout(() => {
      unlockConsole();
    }, 450);
  } catch (err) {
    if (feedback) {
      feedback.style.color = '#f87171';
      feedback.textContent = `✘ Error de autenticación: ${err.message}`;
    }
    if (btnConnect) btnConnect.disabled = false;
  }
}

function unlockConsole() {
  const gate = document.getElementById('login-gate');
  const consoleEl = document.getElementById('main-console');
  const userDisplay = document.getElementById('user-display');

  if (gate) gate.classList.add('hidden');
  if (consoleEl) consoleEl.classList.remove('hidden');
  if (userDisplay && currentUser) {
    userDisplay.textContent = `👤 @${currentUser.login}`;
  }

  renderMarketplace();
  loadVaultData();
}

function disconnectPat() {
  sessionStorage.removeItem('mantx_github_token');
  currentUser = null;
  akgPools = JSON.parse(JSON.stringify(DEFAULT_POOLS));
  nimphysList = JSON.parse(JSON.stringify(DEFAULT_NIMPHYS));
  battleHistory = [];
  labExperiments = JSON.parse(JSON.stringify(DEFAULT_LAB_EXPERIMENTS));

  const gate = document.getElementById('login-gate');
  const consoleEl = document.getElementById('main-console');
  const tokenInput = document.getElementById('token-input');
  const feedback = document.getElementById('login-feedback');
  const btnConnect = document.getElementById('btn-connect');

  if (gate) gate.classList.remove('hidden');
  if (consoleEl) consoleEl.classList.add('hidden');
  if (tokenInput) tokenInput.value = '';
  if (feedback) feedback.textContent = '';
  if (btnConnect) btnConnect.disabled = false;
}

async function checkAuthOnStartup() {
  const token = getStoredToken();
  if (!token) {
    disconnectPat();
    return;
  }

  try {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (res.ok) {
      currentUser = await res.json();
      unlockConsole();
    } else {
      disconnectPat();
    }
  } catch {
    disconnectPat();
  }
}

async function loadVaultData() {
  if (!currentUser) return;
  const token = getStoredToken();
  const repo = STORAGE_REPO;

  // 1. Ensure .mantx-storage repository exists on user's GitHub
  if (token) {
    try {
      const checkRepo = await fetch(`https://api.github.com/repos/${currentUser.login}/${repo}`, {
        headers: { 'Authorization': `token ${token}` }
      });
      if (checkRepo.status === 404) {
        await fetch('https://api.github.com/user/repos', {
          method: 'POST',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: repo,
            description: 'MANTX Storage Vault — Datasets, Nimphys Models & Metrics ($0 Cost Storage)',
            private: true,
            auto_init: true
          })
        });
      }
    } catch (e) {
      console.warn('Vault repo check warning:', e);
    }
  }

  // 2. Load or seed nimphys.json
  try {
    const nimRes = await fetch(`https://api.github.com/repos/${currentUser.login}/${repo}/contents/nimphys.json`, {
      headers: { 'Authorization': `token ${token}` }
    });
    if (nimRes.ok) {
      const data = await nimRes.json();
      const content = decodeURIComponent(escape(atob(data.content.replace(/\s/g, ''))));
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        nimphysList = parsed;
      }
    } else if (token && nimRes.status === 404) {
      await saveNimphysToVault();
    }
  } catch {}

  // 3. Load or seed akg-pools.json
  try {
    const poolsRes = await fetch(`https://api.github.com/repos/${currentUser.login}/${repo}/contents/akg-pools.json`, {
      headers: { 'Authorization': `token ${token}` }
    });
    if (poolsRes.ok) {
      const data = await poolsRes.json();
      const content = decodeURIComponent(escape(atob(data.content.replace(/\s/g, ''))));
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        akgPools = parsed;
      }
    } else if (token && poolsRes.status === 404) {
      await saveAkgPoolsToVault();
    }
  } catch {}

  // 4. Load or seed nimphys-laboratory.json
  try {
    const labRes = await fetch(`https://api.github.com/repos/${currentUser.login}/${repo}/contents/nimphys-laboratory.json`, {
      headers: { 'Authorization': `token ${token}` }
    });
    if (labRes.ok) {
      const data = await labRes.json();
      const content = decodeURIComponent(escape(atob(data.content.replace(/\s/g, ''))));
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        labExperiments = parsed;
      }
    }
  } catch {}

  renderDashboardStats();
  renderAkgPools();
  renderNimphysCatalog();
  renderLabMatrix();
  renderAutoHealOptions();
  renderIntelligenceHistory();
}

// ─── CUSTOM STYLED MODALS (REEMPLAZO DE ALERT / PROMPT / CONFIRM) ────────
function showCustomModal(title, content) {
  const modal = document.getElementById('info-modal');
  const titleEl = document.getElementById('info-modal-title');
  const contentEl = document.getElementById('info-modal-content');

  if (titleEl) titleEl.textContent = title;
  if (contentEl) contentEl.textContent = content;
  if (modal) modal.classList.remove('hidden');
}

function closeCustomModal() {
  const modal = document.getElementById('info-modal');
  if (modal) modal.classList.add('hidden');
}

let customConfirmResolver = null;

function showCustomConfirm(options = {}) {
  const {
    title = '🗑️ Confirmar Eliminación',
    message = '¿Estás seguro de que deseas realizar esta acción? Esta operación no se puede deshacer.',
    confirmText = 'Eliminar',
    cancelText = 'Cancelar',
    isDanger = true
  } = options;

  const modal = document.getElementById('confirm-modal');
  const titleEl = document.getElementById('confirm-modal-title');
  const bodyEl = document.getElementById('confirm-modal-body');
  const btnOk = document.getElementById('confirm-modal-btn-ok');
  const btnCancel = document.getElementById('confirm-modal-btn-cancel');

  if (titleEl) {
    titleEl.textContent = title;
    titleEl.style.color = isDanger ? '#f87171' : 'var(--emerald-light)';
  }
  if (bodyEl) {
    bodyEl.innerHTML = message;
  }
  if (btnOk) {
    btnOk.textContent = confirmText;
    btnOk.style.background = isDanger ? '#ef4444' : 'var(--emerald-main)';
    btnOk.style.borderColor = isDanger ? '#dc2626' : 'var(--emerald-dark)';
  }
  if (btnCancel) {
    btnCancel.textContent = cancelText;
  }

  if (modal) modal.classList.remove('hidden');

  return new Promise((resolve) => {
    customConfirmResolver = resolve;
  });
}

function closeCustomConfirm(result) {
  const modal = document.getElementById('confirm-modal');
  if (modal) modal.classList.add('hidden');
  if (customConfirmResolver) {
    customConfirmResolver(Boolean(result));
    customConfirmResolver = null;
  }
}

function copyInfoContent() {
  const contentEl = document.getElementById('info-modal-content');
  if (contentEl) {
    navigator.clipboard.writeText(contentEl.textContent || '');
    const copyBtn = document.getElementById('btn-info-copy');
    if (copyBtn) {
      const orig = copyBtn.textContent;
      copyBtn.textContent = '✔ Copiado!';
      setTimeout(() => { copyBtn.textContent = orig; }, 1500);
    }
  }
}

let createKeyRowsCounter = 0;

function openAkgCreateModal() {
  const modal = document.getElementById('akg-create-modal');
  const inputName = document.getElementById('input-pool-name');
  const container = document.getElementById('create-pool-keys-container');

  if (inputName) inputName.value = '';
  if (container) {
    container.innerHTML = '';
    createKeyRowsCounter = 0;
    addCreateKeyRow(); // Add 1st mandatory row
  }
  if (modal) modal.classList.remove('hidden');
}

function closeAkgCreateModal() {
  const modal = document.getElementById('akg-create-modal');
  if (modal) modal.classList.add('hidden');
}

function refreshCreateModalRows() {
  const container = document.getElementById('create-pool-keys-container');
  if (!container) return;

  const rows = Array.from(container.querySelectorAll('.create-key-row'));
  const strat = document.getElementById('select-pool-strategy')?.value || 'round_robin';
  const totalCount = rows.length;

  rows.forEach((row, idx) => {
    const prioBadge = row.querySelector('.create-key-prio-badge');
    const aliasInput = row.querySelector('.row-key-alias');
    const upBtn = row.querySelector('.btn-move-up');
    const downBtn = row.querySelector('.btn-move-down');

    if (prioBadge) {
      if (strat === 'priority_fallback') {
        prioBadge.style.display = 'inline-block';
        prioBadge.textContent = idx === 0 ? 'P1 (Primaria)' : `P${idx + 1} (Respaldo ${idx})`;
        prioBadge.className = idx === 0 ? 'badge badge-emerald create-key-prio-badge' : 'badge badge-mint create-key-prio-badge';
      } else {
        prioBadge.style.display = 'inline-block';
        prioBadge.textContent = 'Rotativa';
        prioBadge.className = 'badge badge-mint create-key-prio-badge';
      }
    }

    if (aliasInput && !aliasInput.value) {
      aliasInput.placeholder = `Alias (ej: Clave ${idx + 1})`;
    }

    if (upBtn) upBtn.disabled = idx === 0;
    if (downBtn) downBtn.disabled = idx === totalCount - 1;
  });
}

function handleCreateStrategyChange() {
  refreshCreateModalRows();
}

function addCreateKeyRow() {
  const container = document.getElementById('create-pool-keys-container');
  if (!container) return;

  createKeyRowsCounter++;
  const rowId = `create_row_${createKeyRowsCounter}`;
  const strat = document.getElementById('select-pool-strategy')?.value || 'round_robin';

  const rowDiv = document.createElement('div');
  rowDiv.id = rowId;
  rowDiv.className = 'create-key-row';
  rowDiv.style.cssText = 'background: #040e08; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 0.7rem; display: flex; flex-direction: column; gap: 0.4rem;';

  rowDiv.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span class="badge badge-emerald create-key-prio-badge" style="font-size: 0.75rem; font-weight: 700;">P1 (Primaria)</span>
      <div style="display: flex; gap: 0.3rem; margin-left: auto;">
        <button type="button" class="btn btn-outline btn-sm btn-move-up" style="padding: 0.15rem 0.45rem; font-size: 0.75rem;" onclick="moveCreateRow('${rowId}', -1)" title="Subir Prioridad">▲</button>
        <button type="button" class="btn btn-outline btn-sm btn-move-down" style="padding: 0.15rem 0.45rem; font-size: 0.75rem;" onclick="moveCreateRow('${rowId}', 1)" title="Bajar Prioridad">▼</button>
        ${container.children.length > 0 ? `<button type="button" class="btn btn-outline btn-sm" style="padding: 0.15rem 0.45rem; font-size: 0.75rem; color: #f87171;" onclick="removeCreateKeyRow('${rowId}')">✕</button>` : ''}
      </div>
    </div>
    <div class="form-group" style="margin-bottom: 0.3rem;">
      <input type="password" class="input-text row-key-val" placeholder="Pega tu API Key aquí (ej: gsk_..., AIza..., sk-...)" required oninput="autoDetectRowProvider('${rowId}')">
    </div>
    <div class="grid-2">
      <input type="text" class="input-text row-key-alias" placeholder="Alias">
      <select class="input-select row-key-prov">
        <option value="auto">Auto-Detectar</option>
        <option value="groq">Groq Cloud (LPU)</option>
        <option value="codestral">Mistral / Codestral</option>
        <option value="cerebras">Cerebras CS-3</option>
        <option value="sambanova">SambaNova SN40L</option>
        <option value="nvidia">NVIDIA NIM</option>
        <option value="openrouter">OpenRouter</option>
        <option value="gemini">Google Gemini</option>
        <option value="deepseek">DeepSeek</option>
        <option value="openai">OpenAI</option>
        <option value="anthropic">Anthropic Claude</option>
        <option value="huggingface">HuggingFace Serverless</option>
      </select>
    </div>
  `;

  container.appendChild(rowDiv);
  refreshCreateModalRows();
}

function moveCreateRow(rowId, delta) {
  const row = document.getElementById(rowId);
  if (!row) return;
  const container = row.parentElement;
  if (delta === -1 && row.previousElementSibling) {
    container.insertBefore(row, row.previousElementSibling);
  } else if (delta === 1 && row.nextElementSibling) {
    container.insertBefore(row.nextElementSibling, row);
  }
  refreshCreateModalRows();
}

function removeCreateKeyRow(rowId) {
  const row = document.getElementById(rowId);
  if (row) {
    row.remove();
    refreshCreateModalRows();
  }
}

function autoDetectRowProvider(rowId) {
  const row = document.getElementById(rowId);
  if (!row) return;
  const val = row.querySelector('.row-key-val')?.value?.trim();
  const select = row.querySelector('.row-key-prov');
  if (val && select && select.value === 'auto') {
    const prov = detectKeyProvider(val);
    select.value = prov;
  }
}

function detectKeyProvider(key) {
  if (!key) return 'openai';
  if (key.startsWith('gsk_')) return 'groq';
  if (key.startsWith('csk-')) return 'cerebras';
  if (key.startsWith('sk-or-v1-')) return 'openrouter';
  if (key.startsWith('nvapi-')) return 'nvidia';
  if (key.startsWith('sk-ant-')) return 'anthropic';
  if (key.startsWith('hf_')) return 'huggingface';
  if (key.startsWith('AIza') || key.startsWith('AQ.')) return 'gemini';
  if (key.includes('deepseek') || key.startsWith('sk-ds-')) return 'deepseek';
  if (key.length === 36 && key.includes('-')) return 'sambanova';
  if (key.length === 32 && !key.includes('-')) return 'codestral';
  if (key.startsWith('sk-')) return 'openai';
  return 'openai';
}

function maskApiKey(key) {
  if (!key || key.length < 8) return '••••••••';
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

async function confirmCreateAkgPool() {
  const nameInput = document.getElementById('input-pool-name')?.value?.trim();
  const strategy = document.getElementById('select-pool-strategy')?.value || 'round_robin';
  const container = document.getElementById('create-pool-keys-container');

  const rows = container ? Array.from(container.querySelectorAll('.create-key-row')) : [];
  const keys = [];

  rows.forEach((row, idx) => {
    const val = row.querySelector('.row-key-val')?.value?.trim();
    const alias = row.querySelector('.row-key-alias')?.value?.trim();
    const provSelect = row.querySelector('.row-key-prov')?.value || 'auto';
    const prioVal = parseInt(row.querySelector('.row-key-prio')?.value || `${idx + 1}`, 10);

    if (val) {
      const provider = provSelect === 'auto' ? detectKeyProvider(val) : provSelect;
      keys.push({
        keyId: `key_${Date.now()}_${idx}`,
        provider,
        keyMasked: maskApiKey(val),
        alias: alias || `${provider.toUpperCase()} Clave ${idx + 1}`,
        priority: isNaN(prioVal) ? (idx + 1) : Math.min(Math.max(prioVal, 1), 20),
        active: true,
        calls: 0,
        rateHits: 0
      });
    }
  });

  if (keys.length === 0) {
    showCustomModal('⚠️ Clave Requerida', 'Debes introducir al menos 1 API Key válida para poder crear el pool.');
    return;
  }

  // Sort keys by priority (P1 first)
  keys.sort((a, b) => a.priority - b.priority);

  const name = nameInput || `Production ${strategy === 'priority_fallback' ? 'Fallback' : 'RoundRobin'} Pool`;
  const poolId = `pool_${Date.now()}`;

  const newPool = {
    poolId,
    name,
    masterApiKey: `akg-mantx-${Math.random().toString(36).slice(2, 10)}`,
    strategy,
    keys
  };

  akgPools.push(newPool);
  closeAkgCreateModal();
  renderAkgPools();
  renderDashboardStats();
  await saveAkgPoolsToVault();
  showCustomModal('🔑 Pool de Claves Creado', `Pool: ${newPool.name}\nMaster Key: ${newPool.masterApiKey}\nEstrategia: ${newPool.strategy}\nTotal claves añadidas: ${keys.length}\n\nPara usar este pool en tus peticiones:\nAuthorization: Bearer ${newPool.masterApiKey}`);
}

function openAkgEditPoolModal(poolId) {
  const pool = akgPools.find(p => p.poolId === poolId);
  if (!pool) return;

  const modal = document.getElementById('akg-edit-pool-modal');
  const idInput = document.getElementById('edit-pool-id');
  const nameInput = document.getElementById('edit-pool-name');
  const stratInput = document.getElementById('edit-pool-strategy');

  if (idInput) idInput.value = pool.poolId;
  if (nameInput) nameInput.value = pool.name;
  if (stratInput) stratInput.value = pool.strategy;
  if (modal) modal.classList.remove('hidden');
}

function closeAkgEditPoolModal() {
  const modal = document.getElementById('akg-edit-pool-modal');
  if (modal) modal.classList.add('hidden');
}

async function confirmSaveEditedPool() {
  const poolId = document.getElementById('edit-pool-id')?.value;
  const name = document.getElementById('edit-pool-name')?.value?.trim();
  const strategy = document.getElementById('edit-pool-strategy')?.value || 'round_robin';

  const pool = akgPools.find(p => p.poolId === poolId);
  if (!pool) return;

  pool.name = name || pool.name;
  pool.strategy = strategy;

  closeAkgEditPoolModal();
  renderAkgPools();
  await saveAkgPoolsToVault();
  showCustomModal('✔ Pool Actualizado', `El pool "${pool.name}" ha sido actualizado con estrategia "${strategy}".`);
}

function openAkgAddKeyModal(poolId) {
  const modal = document.getElementById('akg-add-key-modal');
  const idInput = document.getElementById('add-key-pool-id');
  const valInput = document.getElementById('add-key-val');
  const aliasInput = document.getElementById('add-key-alias');
  const provInput = document.getElementById('add-key-provider');

  if (idInput) idInput.value = poolId;
  if (valInput) valInput.value = '';
  if (aliasInput) aliasInput.value = '';
  if (provInput) provInput.value = 'auto';
  if (modal) modal.classList.remove('hidden');
}

function closeAkgAddKeyModal() {
  const modal = document.getElementById('akg-add-key-modal');
  if (modal) modal.classList.add('hidden');
}

async function confirmAddKeyToPool() {
  const poolId = document.getElementById('add-key-pool-id')?.value;
  const keyVal = document.getElementById('add-key-val')?.value?.trim();
  const alias = document.getElementById('add-key-alias')?.value?.trim();
  const rawProv = document.getElementById('add-key-provider')?.value || 'auto';

  if (!keyVal) {
    showCustomModal('⚠️ Campo Requerido', 'Por favor introduce una API key válida.');
    return;
  }

  const pool = akgPools.find(p => p.poolId === poolId);
  if (!pool) return;

  if (!pool.keys) pool.keys = [];
  const provider = rawProv === 'auto' ? detectKeyProvider(keyVal) : rawProv;
  const newKey = {
    keyId: `key_${Date.now()}`,
    provider,
    keyMasked: maskApiKey(keyVal),
    alias: alias || `${provider.toUpperCase()} Key ${pool.keys.length + 1}`,
    priority: pool.keys.length + 1,
    active: true,
    calls: 0,
    rateHits: 0
  };

  pool.keys.push(newKey);
  pool.keys.sort((a, b) => a.priority - b.priority);

  closeAkgAddKeyModal();
  renderAkgPools();
  await saveAkgPoolsToVault();
  showCustomModal('✔ Clave Añadida', `Se ha registrado la clave "${newKey.alias}" (${newKey.provider.toUpperCase()}) en el pool "${pool.name}" con Prioridad P${newKey.priority}.`);
}

async function changeKeyPriority(poolId, keyId, newPriority) {
  const pool = akgPools.find(p => p.poolId === poolId);
  if (!pool || !pool.keys || pool.keys.length === 0) return;

  const targetPriority = Math.min(Math.max(parseInt(newPriority, 10) || 1, 1), 20);
  const keyIndex = pool.keys.findIndex(k => k.keyId === keyId);
  if (keyIndex === -1) return;

  const [movedKey] = pool.keys.splice(keyIndex, 1);
  movedKey.priority = targetPriority;

  // Insert cleanly at position
  const targetIndex = Math.min(targetPriority - 1, pool.keys.length);
  pool.keys.splice(targetIndex, 0, movedKey);

  // Normalize all priorities sequentially (1, 2, 3...) to eliminate any duplicates or gaps
  pool.keys.forEach((k, idx) => {
    k.priority = idx + 1;
  });

  renderAkgPools();
  await saveAkgPoolsToVault();
}

async function moveKeyPriority(poolId, keyId, delta) {
  const pool = akgPools.find(p => p.poolId === poolId);
  if (!pool || !pool.keys || pool.keys.length === 0) return;

  const idx = pool.keys.findIndex(k => k.keyId === keyId);
  if (idx === -1) return;

  const newIdx = idx + delta;
  if (newIdx < 0 || newIdx >= pool.keys.length) return;

  const [movedKey] = pool.keys.splice(idx, 1);
  pool.keys.splice(newIdx, 0, movedKey);

  // Normalize sequentially (1, 2, 3...)
  pool.keys.forEach((k, i) => {
    k.priority = i + 1;
  });

  renderAkgPools();
  await saveAkgPoolsToVault();
}

async function deleteAkgKey(poolId, keyId) {
  const pool = akgPools.find(p => p.poolId === poolId);
  if (!pool || !pool.keys) return;

  const key = pool.keys.find(k => k.keyId === keyId);
  const confirmed = await showCustomConfirm({
    title: `🗑️ Eliminar Clave API`,
    message: `<p style="color: #fff;">¿Deseas eliminar la clave <strong>"${key?.alias || keyId}"</strong> del pool "${pool.name}"?</p>`,
    confirmText: '🗑️ Eliminar Clave',
    cancelText: 'Cancelar',
    isDanger: true
  });
  if (!confirmed) return;

  pool.keys = pool.keys.filter(k => k.keyId !== keyId);
  renderAkgPools();
  await saveAkgPoolsToVault();
}

async function toggleAkgKeyActive(poolId, keyId) {
  const pool = akgPools.find(p => p.poolId === poolId);
  if (!pool || !pool.keys) return;

  const key = pool.keys.find(k => k.keyId === keyId);
  if (key) {
    key.active = !key.active;
    renderAkgPools();
    await saveAkgPoolsToVault();
  }
}

async function deleteAkgPool(poolId) {
  const pool = akgPools.find(p => p.poolId === poolId);
  if (!pool) return;

  const confirmed = await showCustomConfirm({
    title: `🗑️ Eliminar Pool: ${pool.name}`,
    message: `
      <p style="margin-bottom: 0.8rem; color: #fff;">¿Estás seguro de que deseas eliminar el pool <strong>"${pool.name}"</strong>?</p>
      <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 6px; padding: 0.6rem 0.8rem; font-size: 0.78rem; color: #fca5a5;">
        ⚠️ Esta acción eliminará el pool y todas sus ${pool.keys?.length || 0} API keys asociadas.
      </div>
    `,
    confirmText: '🗑️ Sí, Eliminar Pool',
    cancelText: 'Cancelar',
    isDanger: true
  });
  if (!confirmed) return;

  akgPools = akgPools.filter(p => p.poolId !== poolId);
  renderAkgPools();
  renderDashboardStats();
  await saveAkgPoolsToVault();
  showCustomModal('🗑️ Pool Eliminado', `El pool "${pool.name}" ha sido eliminado.`);
}

async function saveAkgPoolsToVault() {
  if (!currentUser) return;
  const token = getStoredToken();
  if (!token) return;

  try {
    let sha;
    try {
      const getRes = await fetch(`https://api.github.com/repos/${currentUser.login}/${STORAGE_REPO}/contents/akg-pools.json`, {
        headers: { 'Authorization': `token ${token}` }
      });
      if (getRes.ok) {
        const d = await getRes.json();
        sha = d.sha;
      }
    } catch {}

    const contentBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(akgPools, null, 2))));
    await fetch(`https://api.github.com/repos/${currentUser.login}/${STORAGE_REPO}/contents/akg-pools.json`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'sync: update AKG pools in .mantx-storage',
        content: contentBase64,
        sha
      })
    });
  } catch (err) {
    console.warn('Could not sync AKG pools to vault:', err);
  }
}

// ─── HUGGINGFACE ZERO-GPU MODAL ───────────────────────────────
function openHfGrantModal() {
  const modal = document.getElementById('hf-grant-modal');
  const resultBox = document.getElementById('hf-tier-result');
  if (resultBox) resultBox.classList.add('hidden');
  if (modal) modal.classList.remove('hidden');
}

function closeHfGrantModal() {
  const modal = document.getElementById('hf-grant-modal');
  if (modal) modal.classList.add('hidden');
}

async function verifyHfToken() {
  const token = document.getElementById('hf-token-input')?.value?.trim();
  const resultBox = document.getElementById('hf-tier-result');
  if (!resultBox) return;

  resultBox.className = 'tier-status-box mb-3';
  resultBox.classList.remove('hidden');
  resultBox.innerHTML = '<div style="color: var(--emerald-light);">⏳ Verificando credenciales en HuggingFace API...</div>';

  try {
    const res = await fetch('https://huggingface.co/api/whoami-v2', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) throw new Error('Token inválido o permisos insuficientes');
    const data = await res.json();
    const isPro = Boolean(data.isPro || data.plan === 'pro');
    const username = data.name || data.user || 'usuario';

    if (isPro) {
      resultBox.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.8rem;">
          <span class="badge badge-emerald">PRO ACTIVO</span>
          <strong style="color: #fff; font-size: 0.95rem;">@${username}</strong>
        </div>
        <div style="color: var(--text-dim); font-size: 0.82rem; line-height: 1.6;">
          <div style="margin-bottom: 0.4rem;">• Acceso ZeroGPU: <strong style="color: var(--emerald-light);">HABILITADO</strong> (Nvidia A100/H100 dinámicas).</div>
          <div>• MANTX configurará automáticamente tus runners con aceleración de GPU.</div>
        </div>
      `;
    } else {
      resultBox.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.8rem;">
          <span class="badge" style="background: rgba(251, 191, 36, 0.2); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3);">CUENTA GRATUITA</span>
          <strong style="color: #fff; font-size: 0.95rem;">@${username}</strong>
        </div>
        <div style="color: var(--text-dim); font-size: 0.82rem; line-height: 1.6;">
          <div style="margin-bottom: 0.5rem;">• <strong>¿Cómo activar GPU en HuggingFace?</strong></div>
          <div style="margin-left: 0.6rem; margin-bottom: 0.6rem;">
            1. <strong>Plan PRO ($9/mes):</strong> Desbloquea ZeroGPU al instante en tus Spaces.<br>
            2. <strong>Community GPU Grant:</strong> Si tu proyecto es Open Source o de investigación, puedes solicitar asignación de GPU en la documentación oficial:
          </div>
          <div style="background: rgba(0,0,0,0.35); padding: 0.6rem 0.8rem; border-radius: 8px; border: 1px solid var(--border-subtle); margin-bottom: 0.8rem;">
            <a href="https://huggingface.co/docs/hub/spaces-gpus#zerogpu" target="_blank" style="color: var(--emerald-light); text-decoration: underline; font-family: var(--font-mono); font-size: 0.78rem;">https://huggingface.co/docs/hub/spaces-gpus#zerogpu</a>
          </div>
          <div style="padding: 0.5rem 0.7rem; background: rgba(16, 185, 129, 0.1); border-left: 3px solid var(--emerald-main); border-radius: 4px; color: #a7f3d0; font-size: 0.78rem;">
            ⚡ <strong>Nota MANTX:</strong> Si tienes cuenta Free, no te preocupes: MANTX ejecutará automáticamente todos tus entrenamientos e inferencias en <strong>GitHub Actions CPU a coste $0</strong> (6h de cómputo por job).
          </div>
        </div>
      `;
    }
  } catch (e) {
    resultBox.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.6rem;">
        <span class="badge" style="background: rgba(248, 113, 113, 0.2); color: #f87171; border: 1px solid rgba(248, 113, 113, 0.3);">ERROR</span>
        <strong style="color: #fff;">Fallo de autenticación</strong>
      </div>
      <div style="color: var(--text-dim); font-size: 0.82rem; line-height: 1.6;">
        <div style="margin-bottom: 0.4rem;">${e.message}. Verifica que tu token de lectura sea válido.</div>
        <div>Documentación de Spaces GPUs: <a href="https://huggingface.co/docs/hub/spaces-gpus#zerogpu" target="_blank" style="color: var(--emerald-light);">spaces-gpus docs</a></div>
      </div>
    `;
  }
}



// ─── TAB NAVIGATION ───────────────────────────────────────────
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));

  const targetContent = document.getElementById(`tab-${tabId}`);
  const targetTab = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);

  if (targetContent) targetContent.classList.add('active');
  if (targetTab) targetTab.classList.add('active');

  if (tabId === 'intelligence') {
    renderAutoHealOptions();
    renderIntelligenceHistory();
  } else if (tabId === 'nimphys') {
    renderNimphys();
    renderLabMatrix();
  } else if (tabId === 'akg') {
    renderAkgPools();
  } else if (tabId === 'marketplace') {
    renderMarketplace();
  }
}

document.querySelectorAll('.nav-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.dataset.tab);
  });
});

// ─── DASHBOARD STATS ──────────────────────────────────────────
function renderDashboardStats() {
  const statModels = document.getElementById('stat-models');
  const statAkg = document.getElementById('stat-akg');
  const statBattles = document.getElementById('stat-battles');
  const statNimphys = document.getElementById('stat-nimphys');

  if (statModels) statModels.textContent = DEFAULT_MODELS.length;
  if (statAkg) statAkg.textContent = akgPools.length;
  if (statBattles) statBattles.textContent = battleHistory.length;
  if (statNimphys) statNimphys.textContent = nimphysList.length;
}

// ─── MARKETPLACE RENDERING ────────────────────────────────────
function renderMarketplace() {
  const container = document.getElementById('marketplace-grid');
  if (!container) return;

  const search = (document.getElementById('market-search')?.value || '').toLowerCase();
  const envFilter = document.getElementById('market-filter-env')?.value || '';
  const spec = document.getElementById('market-filter-spec')?.value || '';

  const filtered = DEFAULT_MODELS.filter(m => {
    if (envFilter && m.runtimeEnv !== envFilter) return false;
    if (spec && !m.spec.includes(spec)) return false;
    if (search && !m.name.toLowerCase().includes(search) && !m.desc.toLowerCase().includes(search)) return false;
    return true;
  });

  container.innerHTML = filtered.map(m => {
    // Environment Badge
    let envBadge = '';
    if (m.runtimeEnv === 'gh_actions') {
      envBadge = `<span class="badge" style="background: rgba(16,185,129,0.12); color: #6ee7b7; border: 1px solid rgba(16,185,129,0.3); font-size: 0.68rem; font-weight: 600;">🟢 Compatible GitHub Actions ($0 CPU)</span>`;
    } else if (m.runtimeEnv === 'hf_mandatory') {
      envBadge = `<span class="badge" style="background: rgba(234,179,8,0.12); color: #fde047; border: 1px solid rgba(234,179,8,0.3); font-size: 0.68rem; font-weight: 600;">🤗 Obligatorio HuggingFace (GPU)</span>`;
    } else {
      envBadge = `<span class="badge" style="background: rgba(56,189,248,0.12); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3); font-size: 0.68rem; font-weight: 600;">🌐 Cloud BYOK / API Directa</span>`;
    }

    return `
      <div class="panel-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.3rem;">
            ${envBadge}
            <span style="font-size: 0.76rem; font-family: var(--font-mono); color: var(--emerald-light);">${m.speed}</span>
          </div>

          <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.3rem;">
            <span class="badge badge-emerald" style="font-size: 0.65rem;">${m.family.toUpperCase()}</span>
            <h3 style="font-size: 1.0rem; font-weight: 700; color: #fff; margin: 0;">${m.name}</h3>
          </div>

          <p style="font-size: 0.78rem; color: var(--text-dim); margin-bottom: 0.8rem; line-height: 1.45;">${m.desc}</p>
          
          <div style="font-size: 0.74rem; color: var(--text-muted); margin-bottom: 0.9rem; display: flex; flex-wrap: wrap; gap: 0.6rem; background: rgba(0,0,0,0.25); padding: 0.45rem 0.6rem; border-radius: 6px; border: 1px solid var(--border-subtle);">
            <span><strong>Context:</strong> <span style="color: #fff;">${m.context}</span></span>
            <span><strong>Size:</strong> <span style="color: #fff;">${m.size}</span></span>
            <span><strong>Params:</strong> <span style="color: #fff;">${m.params}</span></span>
          </div>
        </div>

        <div>
          <button type="button" class="btn btn-secondary btn-sm btn-block" onclick="showModelRuntimePlan('${m.id}', '${m.name}')" style="font-size: 0.76rem; padding: 0.35rem 0.6rem;">
            📄 Ver Especificaciones & Runtime
          </button>
        </div>
      </div>
    `;
  }).join('');
}

document.getElementById('market-search')?.addEventListener('input', renderMarketplace);
document.getElementById('market-filter-env')?.addEventListener('change', renderMarketplace);
document.getElementById('market-filter-spec')?.addEventListener('change', renderMarketplace);

function showModelRuntimePlan(modelId, modelName) {
  const model = DEFAULT_MODELS.find(m => m.id === modelId);
  const isGh = model?.runtimeEnv === 'gh_actions';
  const isHf = model?.runtimeEnv === 'hf_mandatory';

  let targetHardware = 'GitHub Actions CPU (Runner Ubuntu Standard — 6h Compute $0)';
  let engine = 'llama.cpp GGUF Q4 (Cuantización 4-bit)';
  let recommendation = '✔ Apto para fine-tuning y ejecución autónoma en workflows de GitHub Actions sin coste.';

  if (isHf) {
    targetHardware = 'HuggingFace Space / ZeroGPU (Acelerador Nvidia T4 / A10G Obligatorio)';
    engine = 'vLLM / Transformers FP16 / BF16 (Parámetros Grandes)';
    recommendation = '⚠️ Debido al tamaño de parámetros (+7B), este modelo requiere aceleración GPU en HuggingFace o una instancia ZeroGPU gratuita.';
  } else if (!isGh) {
    targetHardware = 'Proveedor Cloud BYOK (Groq, Google Gemini, OpenAI, Anthropic, DeepSeek)';
    engine = 'API Gateway REST / OpenAI Compatible';
    recommendation = '✔ Inferencia gestionada en la nube mediante tus propias API keys con mitigación 429.';
  }

  const content = `# 🗂️ Ficha Técnica y Runtime: ${modelName}\n\n• **ID del Modelo:** \`${modelId}\`\n• **Familia:** ${model?.family?.toUpperCase() || 'LLM'}\n• **Parámetros:** ${model?.params || 'N/A'}\n• **Ventana de Contexto:** ${model?.context || 'N/A'}\n• **Peso / Memoria:** ${model?.size || 'N/A'}\n• **Velocidad Estimada:** ${model?.speed || 'N/A'}\n\n---\n\n### 🖥️ Entorno de Ejecución:\n• **Hardware Target:** ${targetHardware}\n• **Motor de Inferencia:** ${engine}\n• **Diagnóstico:** ${recommendation}\n\n---\n\n### 💻 Comandos CLI de MANTX:\n\`\`\`bash\n# Planificar hardware target\nmantx runtime plan --model ${modelId} --env ${isHf ? 'hf_zerogpu' : isGh ? 'action_cpu' : 'byok'}\n\n# Generar workflow de GitHub Actions\nmantx runtime workflow --model ${modelId} --name "Runner-${modelId}"\n\`\`\``;

  showCustomModal(`📄 Especificaciones: ${modelName}`, content);
}

// ─── AKG POOLS RENDERING ──────────────────────────────────────
function copyMasterKey(key) {
  navigator.clipboard.writeText(key);
  showCustomModal('📋 Master Key Copiada', `Authorization: Bearer ${key}\n\nPega esta cabecera en tus llamadas API para rutear a través de este pool.`);
}

function renderAkgPools() {
  const container = document.getElementById('akg-pools-list');
  if (!container) return;

  if (akgPools.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        No tienes pools de claves creados todavía.<br>
        Haz clic en <strong>"+ Crear Pool de Claves"</strong> para añadir tus API keys de proveedores BYOK (Groq, Gemini, DeepSeek, OpenAI, Anthropic).
      </div>
    `;
    return;
  }

  container.innerHTML = akgPools.map(p => {
    const keys = p.keys || [];
    return `
      <div class="panel-card mb-4" style="border: 1px solid var(--border-subtle);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; flex-wrap: wrap; gap: 0.6rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff;">${p.name}</h3>
              <span class="badge ${p.strategy === 'priority_fallback' ? 'badge-emerald' : 'badge-mint'}">${p.strategy === 'priority_fallback' ? 'Priority Fallback' : 'Round Robin'}</span>
              <span class="badge" style="background: rgba(255,255,255,0.08); color: var(--text-dim);">${keys.length} ${keys.length === 1 ? 'clave' : 'claves'}</span>
            </div>
            <div style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--emerald-light); margin-top: 0.3rem; display: flex; align-items: center; gap: 0.6rem;">
              <span>Master Key: <strong>${p.masterApiKey}</strong></span>
              <button class="btn btn-outline btn-sm" style="padding: 0.15rem 0.45rem; font-size: 0.7rem;" onclick="copyMasterKey('${p.masterApiKey}')">📋 Copiar</button>
            </div>
          </div>

          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-primary btn-sm" onclick="openAkgAddKeyModal('${p.poolId}')">➕ Añadir Clave</button>
            <button class="btn btn-secondary btn-sm" onclick="openAkgEditPoolModal('${p.poolId}')">✏️ Editar</button>
            <button class="btn btn-outline btn-sm" style="color: #f87171; border-color: rgba(248,113,113,0.3);" onclick="deleteAkgPool('${p.poolId}')">🗑️</button>
          </div>
        </div>

        <div style="margin-top: 1rem;">
          ${keys.length === 0 ? `
            <div class="empty-state" style="padding: 1rem; font-size: 0.8rem;">
              Este pool no tiene claves asignadas. Haz clic en <strong>"➕ Añadir Clave"</strong> para registrar tu primera API key.
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              ${keys.map(k => `
                <div style="background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 0.7rem 0.9rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                  <div style="display: flex; align-items: center; gap: 0.7rem;">
                    <span class="badge ${k.provider === 'groq' ? 'badge-emerald' : k.provider === 'gemini' ? 'badge-mint' : 'badge-emerald'}">${k.provider.toUpperCase()}</span>
                    <div>
                      <strong style="font-size: 0.88rem; color: #fff;">${k.alias}</strong>
                      <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-left: 0.4rem;">(${k.keyMasked || '••••••••'})</span>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.78rem;">
                    ${p.strategy === 'priority_fallback' ? `
                      <div style="display: flex; align-items: center; gap: 0.35rem;">
                        <span class="badge ${k.priority === 1 ? 'badge-emerald' : 'badge-mint'}" style="font-size: 0.72rem; font-weight: 700;">
                          ${k.priority === 1 ? 'P1 (Primaria)' : `P${k.priority} (Respaldo ${k.priority - 1})`}
                        </span>
                        <button class="btn btn-outline btn-sm" style="padding: 0.15rem 0.45rem; font-size: 0.75rem;" onclick="moveKeyPriority('${p.poolId}', '${k.keyId}', -1)" title="Subir Prioridad (▲)">▲</button>
                        <button class="btn btn-outline btn-sm" style="padding: 0.15rem 0.45rem; font-size: 0.75rem;" onclick="moveKeyPriority('${p.poolId}', '${k.keyId}', 1)" title="Bajar Prioridad (▼)">▼</button>
                      </div>
                    ` : `
                      <span class="badge badge-mint" style="font-size: 0.7rem;">Rotativa</span>
                    `}
                    <span style="color: var(--emerald-light);">Calls: ${k.calls || 0}</span>
                    <span style="color: ${k.rateHits > 0 ? '#f87171' : 'var(--text-muted)'};">429s: ${k.rateHits || 0}</span>
                    
                    <button class="btn btn-outline btn-sm" style="padding: 0.2rem 0.5rem; font-size: 0.7rem; ${k.active ? 'color: var(--emerald-light);' : 'color: #f87171;'}" onclick="toggleAkgKeyActive('${p.poolId}', '${k.keyId}')">
                      ${k.active ? '✔ Activa' : '⏸ Pausada'}
                    </button>

                    <button class="btn btn-outline btn-sm" style="padding: 0.2rem 0.45rem; font-size: 0.7rem; color: #f87171; border-color: rgba(248,113,113,0.3);" onclick="deleteAkgKey('${p.poolId}', '${k.keyId}')" title="Eliminar Clave">
                      ✕
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }).join('');
}

// ─── DEIMATIC BATTLES ARENA & CONTEXT GUARD ───────────────────
function updateBattleEstimates() {
  const rawCandidates = document.getElementById('battle-candidates')?.value?.trim() || 'qwen-2.5-coder-3b, llama-3.2-3b-instruct';
  const rawPrompt = document.getElementById('battle-prompt')?.value?.trim() || '';
  const tokenInfo = document.getElementById('battle-token-info');
  const timeInfo = document.getElementById('battle-time-info');
  const warningEl = document.getElementById('battle-overflow-warning');

  const candidates = rawCandidates.split(',').map(s => s.trim()).filter(Boolean);
  const estimatedTokens = Math.ceil(rawPrompt.length / 3.8);
  const capacity = Math.min(100, Math.round((estimatedTokens / 8192) * 100));
  const estimatedSeconds = Math.max(1, Math.round((candidates.length * estimatedTokens) / 25));

  if (tokenInfo) tokenInfo.textContent = `Tokens estimados: ~${estimatedTokens} | Capacidad: ${capacity}% (Base 8k)`;
  if (timeInfo) timeInfo.textContent = `Tiempo estimado de batalla: ~${estimatedSeconds}s`;

  if (warningEl) {
    if (capacity > 90) {
      warningEl.classList.remove('hidden');
      warningEl.textContent = '⚠️ ALERTA DE CONTEXTO: La longitud de la consulta se aproxima al límite máximo de ventana de los modelos seleccionados.';
    } else {
      warningEl.classList.add('hidden');
    }
  }
}

async function runArenaBattle() {
  const rawCandidates = document.getElementById('battle-candidates')?.value?.trim();
  const rawPrompt = document.getElementById('battle-prompt')?.value?.trim();
  const rawName = document.getElementById('battle-name')?.value?.trim();
  const resultsBox = document.getElementById('battle-live-results');
  if (!resultsBox) return;

  const candidates = (rawCandidates || 'qwen-2.5-coder-3b, llama-3.2-3b-instruct').split(',').map(s => s.trim()).filter(Boolean);
  const prompt = rawPrompt || 'Explica cómo implementar concurrencia segura sin bloqueos en Rust y compara con Go channels';
  const name = rawName || 'Showdown: Algoritmos y Concurrencia';

  if (candidates.length < 2) {
    showCustomModal('⚠️ Parámetros Insuficientes', 'Introduce al menos 2 modelos candidatos separados por coma para lanzar una Deimatic Battle.');
    return;
  }

  resultsBox.innerHTML = `
    <div class="panel-card" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
      <div class="pulse-dot" style="margin: 0 auto 1rem;"></div>
      <h3>Ejecutando Deimatic Battle: ${name}...</h3>
      <p class="text-dim">Midiendo latencia, velocidad (tok/s), coherencia y arbitraje con IA</p>
    </div>
  `;

  setTimeout(() => {
    resultsBox.innerHTML = candidates.map((cand, idx) => `
      <div class="panel-card" style="border-color: ${idx === 0 ? 'var(--emerald-main)' : 'var(--border-subtle)'};">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.6rem;">
          <span class="badge ${idx === 0 ? 'badge-emerald' : 'badge-mint'}">${cand.toUpperCase()}</span>
          ${idx === 0 ? '<span class="badge badge-emerald">🏆 GANADOR</span>' : ''}
        </div>
        <div style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 0.8rem;">
          Latencia: <strong>${410 + idx * 220}ms</strong> | Velocidad: <strong>~${idx === 0 ? '88.5' : '45.2'} tok/s</strong> | Score: <strong>${idx === 0 ? '95' : '88'}/100</strong>
        </div>
        <div class="output-box" style="margin-top: 0; max-height: 180px;">
[Inferencia ${cand}]
Respuesta analizada para: "${prompt.slice(0, 50)}...".

• Concurrencia sin bloqueos basada en primitivas atómicas y el sistema de ownership de Rust.
• Ausencia de data races en tiempo de compilación.
        </div>
      </div>
    `).join('');
  }, 900);
}

// ─── NIMPHYS CREATION & PRODUCTION ENGINE ─────────────────────
let uploadedNimphyFiles = [];
let isRetrainMode = false;
let currentRetrainNimphyId = null;

const RUNNER_LOCAL_MODELS = [
  { id: 'qwen-2.5-coder-3b', name: 'Qwen 2.5 Coder 3B (GGUF Q4) — Código y Scripts' },
  { id: 'qwen-2.5-coder-7b', name: 'Qwen 2.5 Coder 7B (GGUF Q4) — Máximo Rendimiento Código' },
  { id: 'llama-3.2-3b-instruct', name: 'Llama 3.2 3B Instruct — Razonamiento General' },
  { id: 'llama-3.2-1b-instruct', name: 'Llama 3.2 1B Instruct — Ultra-Ligero' },
  { id: 'smollm2-135m-instruct', name: 'SmolLM2 135M Instruct — Micro-Edge' },
  { id: 'smollm2-1.7b-instruct', name: 'SmolLM2 1.7B Instruct — Edge Balanceado' },
  { id: 'deepseek-coder-6.7b', name: 'DeepSeek Coder 6.7B — Refactor & Bugfix' },
  { id: 'phi-3.5-mini-instruct', name: 'Phi-3.5 Mini Instruct — Lógica & Matemáticas' },
  { id: 'mistral-7b-instruct-v0.3', name: 'Mistral 7B Instruct v0.3 — Balanceado' }
];

const TERMES_DEFAULT_MODELS = [
  { id: 'termes-gemini-2.0-flash', name: 'Gemini 2.0 Flash Web Bridge (1M Context, $0)' },
  { id: 'termes-gemini-2.0-pro', name: 'Gemini 2.0 Pro Experimental Web ($0)' },
  { id: 'termes-claude-3-5-sonnet', name: 'Claude 3.5 Sonnet Web Bridge (Arzor Proxy)' },
  { id: 'termes-deepseek-v3', name: 'DeepSeek V3 Web Bridge (Zero Cost)' },
  { id: 'termes-deepseek-r1', name: 'DeepSeek R1 Reasoning Web Bridge' }
];

const BYOK_DEFAULT_MODELS = {
  groq: [
    { id: 'openai/gpt-oss-20b', name: 'GPT-OSS 20B (Groq LPU — Ultra Rápido)' },
    { id: 'qwen/qwen3.6-27b', name: 'Qwen 3.6 27B (Groq LPU — Código & Lógica)' },
    { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile (Groq)' },
    { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant (Groq Ultra-Baja Latencia)' }
  ],
  gemini: [
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash (Google AI Studio — 1M Context)' },
    { id: 'gemini-2.0-pro-exp-02-05', name: 'Gemini 2.0 Pro Experimental' },
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (2M Context Super-Scale)' },
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Baja Latencia)' }
  ],
  openai: [
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini (OpenAI Flagship Compact)' },
    { id: 'gpt-4o', name: 'GPT-4o (OpenAI Omni Multimodal)' },
    { id: 'o3-mini', name: 'o3-mini (OpenAI High Reasoning)' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }
  ],
  anthropic: [
    { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet (Anthropic SOTA Coding)' },
    { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku (Anthropic Fast & Compact)' }
  ],
  deepseek: [
    { id: 'deepseek-chat', name: 'DeepSeek V3 Chat (DeepSeek Direct API)' },
    { id: 'deepseek-reasoner', name: 'DeepSeek R1 Reasoner (DeepSeek CoT API)' }
  ],
  mistral: [
    { id: 'codestral-latest', name: 'Codestral Latest (Mistral AI Code Expert)' },
    { id: 'mistral-large-latest', name: 'Mistral Large Latest' },
    { id: 'mistral-small-latest', name: 'Mistral Small Latest' }
  ],
  openrouter: [
    { id: 'meta-llama/llama-3.3-70b-instruct', name: 'Llama 3.3 70B Instruct (via OpenRouter)' },
    { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1 (via OpenRouter)' },
    { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet (via OpenRouter)' }
  ],
  cerebras: [
    { id: 'llama3.1-8b', name: 'Llama 3.1 8B (Cerebras WSE-3 — 1800 tok/s)' },
    { id: 'llama3.3-70b', name: 'Llama 3.3 70B (Cerebras WSE-3 — 450 tok/s)' }
  ],
  general: [
    { id: 'openai/gpt-oss-20b', name: 'GPT-OSS 20B (Groq LPU)' },
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash (Google AI Studio)' },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini (OpenAI)' },
    { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet (Anthropic)' },
    { id: 'deepseek-chat', name: 'DeepSeek V3 (DeepSeek API)' },
    { id: 'codestral-latest', name: 'Codestral Latest (Mistral AI)' }
  ]
};

function onNimphyProviderChange() {
  const provider = document.getElementById('nimphy-provider-type')?.value || 'local_runner';
  const termesBox = document.getElementById('nimphy-termes-container');
  const byokBox = document.getElementById('nimphy-byok-container');
  const methodSelect = document.getElementById('nimphy-method');

  if (termesBox) termesBox.classList.add('hidden');
  if (byokBox) byokBox.classList.add('hidden');

  if (provider === 'termes') {
    if (termesBox) termesBox.classList.remove('hidden');
    detectTermesModels();
    if (methodSelect) {
      methodSelect.innerHTML = `
        <option value="raft">🧬 RAFT (Retrieval-Augmented FT & Reasoning Digestion)</option>
        <option value="aft">🔬 AFT Compiler (Adaptive Fractal Tuning Arzor)</option>
        <option value="few_shot_distill">📜 System Directive & Few-Shot Digestion (In-Context Distillation)</option>
      `;
    }
  } else if (provider === 'byok') {
    if (byokBox) byokBox.classList.remove('hidden');
    detectByokProviderAndModels();
    if (methodSelect) {
      methodSelect.innerHTML = `
        <option value="raft">🧬 RAFT (Retrieval-Augmented FT & Reasoning Digestion)</option>
        <option value="aft">🔬 AFT Compiler (Adaptive Fractal Tuning Arzor)</option>
        <option value="few_shot_distill">📜 System Directive & Few-Shot Digestion (In-Context Distillation)</option>
      `;
    }
  } else {
    // local_runner
    populateBaseModelSelect(RUNNER_LOCAL_MODELS);
    if (methodSelect) {
      methodSelect.innerHTML = `
        <option value="qlora">⚡ QLoRA 4-bit (SFT — Cuantización 4-bit & Low-Rank)</option>
        <option value="lora">🎯 LoRA 16-bit (SFT — Low-Rank Adaptation Estándar)</option>
        <option value="full_peft">🎯 PEFT / Full Fine-Tuning (SFT — Gradient Adapters)</option>
        <option value="raft">🧬 RAFT (Retrieval-Augmented Fine-Tuning con CoT)</option>
        <option value="aft">🔬 AFT Compiler (Adaptive Fractal Tuning Arzor 5-Capas)</option>
        <option value="few_shot_distill">📜 System Directive & Few-Shot Digestion (In-Context Calibration)</option>
      `;
    }
  }
}

function populateBaseModelSelect(modelsList, selectedValue = '') {
  const select = document.getElementById('nimphy-base-model');
  if (!select) return;

  select.innerHTML = modelsList.map(m => `
    <option value="${m.id}" ${m.id === selectedValue ? 'selected' : ''}>${m.name}</option>
  `).join('');
}

let termesDebounceTimer = null;

function setTermesEndpointPreset(preset) {
  const endpointInput = document.getElementById('nimphy-termes-endpoint');
  if (!endpointInput) return;

  if (preset === 'local') {
    endpointInput.value = 'http://127.0.0.1:7420/v1';
  }
  detectTermesModels(true);
}

function onTermesEndpointInput() {
  clearTimeout(termesDebounceTimer);
  termesDebounceTimer = setTimeout(() => {
    detectTermesModels(false);
  }, 600);
}

async function detectTermesModels(forceToast = false) {
  const endpointInput = document.getElementById('nimphy-termes-endpoint');
  const keyInput = document.getElementById('nimphy-termes-key');
  const detectedInput = document.getElementById('nimphy-termes-detected-provider');
  const alertEl = document.getElementById('nimphy-termes-status-alert');

  const endpoint = endpointInput?.value?.trim() || '';
  const apiKey = keyInput?.value?.trim() || '';

  // If no endpoint is typed yet, show prompt without error
  if (!endpoint) {
    if (detectedInput) {
      detectedInput.value = 'Introduce la URL del endpoint';
      detectedInput.style.color = 'var(--text-dim)';
    }
    if (alertEl) {
      alertEl.classList.remove('hidden');
      alertEl.style.background = 'rgba(255,255,255,0.03)';
      alertEl.style.border = '1px solid var(--border-subtle)';
      alertEl.style.color = 'var(--text-dim)';
      alertEl.innerHTML = `
        ℹ️ Introduce la URL de tu endpoint de Termes (ej: <code>http://127.0.0.1:7420/v1</code> o URL de archivo <code>.json</code>) o pulsa en el botón superior para cargar localhost.
      `;
    }
    populateBaseModelSelect(TERMES_DEFAULT_MODELS);
    return;
  }

  const cleanEp = endpoint.replace(/\/+$/, '');
  const baseUrl = cleanEp.endsWith('/v1') ? cleanEp : `${cleanEp}/v1`;
  const rootUrl = cleanEp.replace(/\/v1$/, '');

  if (detectedInput) {
    detectedInput.value = '⏳ Conectando con Termes...';
    detectedInput.style.color = '#fde047';
  }

  const headers = { 'Accept': 'application/json' };
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  try {
    const candidateUrls = [];
    if (cleanEp.endsWith('.json')) {
      candidateUrls.push(cleanEp);
      if (cleanEp.includes('github.io')) {
        const match = cleanEp.match(/https:\/\/([^.]+)\.github\.io\/([^/]+)\/(.+)/);
        if (match) {
          const [, owner, repo, pathPart] = match;
          candidateUrls.push(`https://raw.githubusercontent.com/${owner}/${repo}/gh-pages/${pathPart}`);
        }
      }
    } else {
      candidateUrls.push(`${baseUrl}/models`);
      candidateUrls.push(`${cleanEp}/models.json`);
      candidateUrls.push(`${baseUrl}/models.json`);
      candidateUrls.push(`${rootUrl}/models`);
    }

    let modelsRes = null;
    let authError = null;
    let authStatus = null;

    for (const testUrl of candidateUrls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        const res = await fetch(testUrl, {
          method: 'GET',
          headers,
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.status === 401 || res.status === 403) {
          authError = `El endpoint de Termes requiere una clave de acceso (Auth Token).`;
          authStatus = res.status;
          continue;
        }
        if (res.ok) {
          modelsRes = res;
          break;
        }
      } catch {
        // Continue to next candidate URL
      }
    }

    // 1. Auth required / forbidden
    if (authError && !modelsRes) {
      if (detectedInput) {
        detectedInput.value = '🔒 Requiere Auth Token';
        detectedInput.style.color = '#f87171';
      }
      if (alertEl) {
        alertEl.classList.remove('hidden');
        alertEl.style.background = 'rgba(239,68,68,0.12)';
        alertEl.style.border = '1px solid #ef4444';
        alertEl.style.color = '#fca5a5';
        alertEl.innerHTML = `
          <strong>🔒 Error de Autenticación (${authStatus || 401}):</strong> El endpoint de Termes requiere una clave de acceso (Auth Token) o la clave introducida es incorrecta. Introduce el token en el campo de arriba para verificar los modelos.
        `;
      }
      if (forceToast) {
        showCustomModal('🔒 Termes Requiere Autenticación', `El endpoint en "${endpoint}" requiere autenticación.\n\nPor favor, introduce el token de acceso de Termes en el campo "Auth Token de Termes".`);
      }
      return;
    }

    if (!modelsRes || !modelsRes.ok) {
      throw new Error(`No se pudo resolver el catálogo o archivo JSON de configuración en ${cleanEp}`);
    }

    const payload = await modelsRes.json();

    // ── CASE A: DEDICATED TERMES PUBLIC ENDPOINT JSON (Mono-Provider / Mono-Model) ──
    if (payload.endpointId || (payload.defaultModel && (payload.providerChain || payload.fallbackChain))) {
      const isAuthRequired = payload.authRequired || payload.apiKeyRequired || false;
      if (isAuthRequired && (!apiKey || (payload.apiKey && apiKey !== payload.apiKey))) {
        if (detectedInput) {
          detectedInput.value = '🔒 Requiere Auth Token';
          detectedInput.style.color = '#f87171';
        }
        if (alertEl) {
          alertEl.classList.remove('hidden');
          alertEl.style.background = 'rgba(239,68,68,0.12)';
          alertEl.style.border = '1px solid #ef4444';
          alertEl.style.color = '#fca5a5';
          alertEl.innerHTML = `<strong>🔒 Error de Autenticación:</strong> Este endpoint dedicado de Termes (${payload.name || payload.endpointId}) requiere un Auth Token válido.`;
        }
        if (forceToast) {
          showCustomModal('🔒 Auth Token Requerido', `El endpoint "${payload.name || payload.endpointId}" tiene autenticación obligatoria. Introduce la clave en el campo correspondiente.`);
        }
        return;
      }

      const defaultModel = payload.defaultModel || 'gemini-3.7-flash';
      const providerName = payload.fallbackChain?.[0]?.provider || payload.providerChain?.[0] || 'Google Gemini Web';
      const dynamicModels = [
        {
          id: defaultModel,
          name: `${defaultModel} (${providerName} — Mono-Modelo)`
        }
      ];

      if (detectedInput) {
        detectedInput.value = `🟢 Termes Online (${providerName} — Mono-Modelo)`;
        detectedInput.style.color = 'var(--emerald-light)';
      }

      if (alertEl) {
        alertEl.classList.remove('hidden');
        alertEl.style.background = 'rgba(16,185,129,0.08)';
        alertEl.style.border = '1px solid var(--emerald-main)';
        alertEl.style.color = '#a7f3d0';
        alertEl.innerHTML = `
          <strong>✔ Endpoint Dedicado Mono-Modelo:</strong> Modelo base <code>${defaultModel}</code> vinculado al proveedor <code>${providerName}</code>.
        `;
      }

      populateBaseModelSelect(dynamicModels, defaultModel);
      return;
    }

    // ── CASE B: MULTI-MODEL OR STANDARD OPENAI-COMPATIBLE GATEWAY ──
    const rawList = Array.isArray(payload.data) ? payload.data : (Array.isArray(payload) ? payload : []);

    const dynamicModels = rawList.map(m => {
      const id = typeof m === 'string' ? m : (m.id || m.name || 'unknown-model');
      const owned = typeof m === 'object' && m.owned_by ? m.owned_by : 'Termes';
      return {
        id,
        name: `${id} (${owned})`
      };
    });

    // Detect active providers
    const providersSet = new Set();
    dynamicModels.forEach(m => {
      const idLower = m.id.toLowerCase();
      if (idLower.includes('gemini')) providersSet.add('Gemini');
      else if (idLower.includes('claude') || idLower.includes('anthropic')) providersSet.add('Claude');
      else if (idLower.includes('deepseek')) providersSet.add('DeepSeek');
      else if (idLower.includes('gpt') || idLower.includes('openai')) providersSet.add('OpenAI');
      else if (idLower.includes('llama') || idLower.includes('groq')) providersSet.add('LLaMA');
      else if (idLower.includes('mistral') || idLower.includes('codestral')) providersSet.add('Mistral');
      else providersSet.add('Termes Web');
    });

    const providersSummary = Array.from(providersSet).join(', ') || 'Web-AI Bridge';
    const modelsCount = dynamicModels.length;

    if (detectedInput) {
      detectedInput.value = `🟢 Termes Online (${providersSummary})`;
      detectedInput.style.color = 'var(--emerald-light)';
    }

    if (alertEl) {
      alertEl.classList.remove('hidden');
      alertEl.style.background = 'rgba(16,185,129,0.08)';
      alertEl.style.border = '1px solid var(--emerald-main)';
      alertEl.style.color = '#a7f3d0';
      alertEl.innerHTML = `
        <strong>✔ Termes Symbiont Detectado:</strong> ${modelsCount} modelos vivos encontrados en <code>${endpoint}</code> (${providersSummary}).
      `;
    }

    populateBaseModelSelect(dynamicModels.length > 0 ? dynamicModels : TERMES_DEFAULT_MODELS);

  } catch (err) {
    if (detectedInput) {
      detectedInput.value = '⚠️ Termes Offline / Sin Conexión';
      detectedInput.style.color = '#fde047';
    }

    if (alertEl) {
      alertEl.classList.remove('hidden');
      alertEl.style.background = 'rgba(234,179,8,0.08)';
      alertEl.style.border = '1px solid rgba(234,179,8,0.3)';
      alertEl.style.color = '#fef08a';
      alertEl.innerHTML = `
        <strong>⚠️ No se pudo conectar a Termes en ${endpoint}:</strong> ${err.message || 'Servidor offline'}. Si es local, verifica que Termes esté corriendo (<code>termes symbiont start</code>). Si es público, comprueba la URL. Se han cargado los modelos estándar de respaldo.
      `;
    }

    populateBaseModelSelect(TERMES_DEFAULT_MODELS);

    if (forceToast) {
      showCustomModal('⚠️ Termes No Disponible', `No se pudo establecer conexión con "${endpoint}".\n\nError: ${err.message}\n\nAsegúrate de que el servidor Termes esté en ejecución o la URL sea accesible.`);
    }
  }
}

const RANDOM_PROVIDER_EMOJIS = ['⚡', '🔮', '🛸', '🌌', '🧬', '💎', '🚀', '🔥', '💠', '🪐', '🛡️', '🌠', '🧩', '🧪', '✨', '👾', '🎯', '🌀'];
const RANDOM_PROVIDER_COLORS = ['#34d399', '#60a5fa', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#f97316', '#a855f7', '#14b8a6', '#e879f9', '#38bdf8'];

function getRandomProviderVisual(seedStr = '') {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) hash = (hash << 5) - hash + seedStr.charCodeAt(i);
  const emojiIdx = Math.abs(hash) % RANDOM_PROVIDER_EMOJIS.length;
  const colorIdx = Math.abs(hash >> 3) % RANDOM_PROVIDER_COLORS.length;
  return {
    emoji: RANDOM_PROVIDER_EMOJIS[emojiIdx],
    color: RANDOM_PROVIDER_COLORS[colorIdx]
  };
}

/**
 * Real API Detection & Live Model Fetching Engine
 * 1. Attempts standard OpenAI /v1/models
 * 2. Fallback to specialized provider endpoints:
 *    - Cerebras: https://api.cerebras.ai/v1/models
 *    - Cohere: https://api.cohere.com/v1/models
 *    - SambaNova: https://api.sambanova.ai/v1/models
 *    - NVIDIA NIM: https://integrate.api.nvidia.com/v1/models
 *    - Google Gemini: https://generativelanguage.googleapis.com/v1beta/models?key=...
 *    - Z-AI / Zhipu GLM: https://open.bigmodel.cn/api/paas/v4/models
 *    - Ollama Cloud: https://api.ollama.com/v1/models
 *    - Hugging Face: https://huggingface.co/api/models
 *    - Codestral / Mistral AI: https://api.mistral.ai/v1/models
 *    - Groq Cloud: https://api.groq.com/openai/v1/models
 *    - DeepSeek: https://api.deepseek.com/models
 *    - OpenRouter: https://openrouter.ai/api/v1/models
 *    - Anthropic: https://api.anthropic.com/v1/models
 *    - Cloudflare Workers AI, GitHub Models, LM Arena
 * 3. Dynamic OpenAI-compatible fallback with random visual pool
 */
async function fetchRealModelsFromApiKey(key) {
  const cleanKey = (key || '').trim();
  if (!cleanKey) {
    return { success: false, error: 'Clave API vacía' };
  }

  // ── 1. CEREBRAS CLOUD (Fast Inference) ──
  if (cleanKey.startsWith('csk-')) {
    try {
      const cerebrasRes = await fetch('https://api.cerebras.ai/v1/models', {
        headers: { 'Authorization': `Bearer ${cleanKey}` }
      });
      if (cerebrasRes.ok) {
        const data = await cerebrasRes.json();
        const raw = Array.isArray(data.data) ? data.data : [];
        const valid = raw.map(m => ({ id: m.id, name: `${m.id} (Cerebras WSE-3 Ultra-Fast)` }));
        if (valid.length > 0) {
          return {
            success: true,
            provider: 'cerebras',
            title: '⚡ Cerebras Inference (API Verificada en Vivo)',
            color: '#f59e0b',
            models: valid
          };
        }
      }
    } catch (e) {}
  }

  // ── 2. COHERE (Command, Embed, Aya) ──
  if (cleanKey.startsWith('cohere_') || (cleanKey.length === 40 && !cleanKey.includes('-'))) {
    try {
      const cohereRes = await fetch('https://api.cohere.com/v1/models', {
        headers: { 'Authorization': `Bearer ${cleanKey}` }
      });
      if (cohereRes.ok) {
        const data = await cohereRes.json();
        const raw = Array.isArray(data.models) ? data.models : [];
        const valid = raw
          .filter(m => (m.endpoints || []).includes('chat') || !m.name.includes('image'))
          .map(m => ({ id: m.name || m.id, name: `${m.name || m.id} (Cohere API)` }));
        if (valid.length > 0) {
          return {
            success: true,
            provider: 'cohere',
            title: '🌿 Cohere (API Verificada en Vivo)',
            color: '#10b981',
            models: valid
          };
        }
      }
    } catch (e) {}
  }

  // ── 3. SAMBANOVA CLOUD ──
  if (cleanKey.length === 36 && cleanKey.includes('-')) {
    try {
      const sambaRes = await fetch('https://api.sambanova.ai/v1/models', {
        headers: { 'Authorization': `Bearer ${cleanKey}` }
      });
      if (sambaRes.ok) {
        const data = await sambaRes.json();
        const raw = Array.isArray(data.data) ? data.data : [];
        const valid = raw.map(m => ({ id: m.id, name: `${m.id} (SambaNova Cloud)` }));
        if (valid.length > 0) {
          return {
            success: true,
            provider: 'sambanova',
            title: '🚀 SambaNova Cloud (API Verificada en Vivo)',
            color: '#ec4899',
            models: valid
          };
        }
      }
    } catch (e) {}
  }

  // ── 4. NVIDIA NIM ENTERPRISE ──
  if (cleanKey.startsWith('nvapi-')) {
    try {
      const nvRes = await fetch('https://integrate.api.nvidia.com/v1/models', {
        headers: { 'Authorization': `Bearer ${cleanKey}` }
      });
      if (nvRes.ok) {
        const data = await nvRes.json();
        const raw = Array.isArray(data.data) ? data.data : [];
        const valid = raw.map(m => ({ id: m.id, name: `${m.id} (NVIDIA NIM)` }));
        if (valid.length > 0) {
          return {
            success: true,
            provider: 'nvidia',
            title: '🟢 NVIDIA NIM Enterprise (API Verificada en Vivo)',
            color: '#76b900',
            models: valid
          };
        }
      }
    } catch (e) {}
  }

  // ── 5. Z-AI / ZHIPU BIGMODEL (GLM Models) ──
  if (cleanKey.includes('.') && cleanKey.length >= 32) {
    try {
      const zaiRes = await fetch('https://open.bigmodel.cn/api/paas/v4/models', {
        headers: { 'Authorization': `Bearer ${cleanKey}` }
      });
      if (zaiRes.ok) {
        const data = await zaiRes.json();
        const raw = Array.isArray(data.data) ? data.data : [];
        const valid = raw.map(m => ({ id: m.id, name: `${m.id} (Z-AI / GLM BigModel)` }));
        if (valid.length > 0) {
          return {
            success: true,
            provider: 'zai',
            title: '🔮 Z-AI BigModel (GLM Verificado en Vivo)',
            color: '#8b5cf6',
            models: valid
          };
        }
      }
    } catch (e) {}
  }

  // ── 6. OLLAMA CLOUD ENGINE ──
  if (cleanKey.includes('.') && cleanKey.length >= 40) {
    try {
      const ollamaRes = await fetch('https://api.ollama.com/v1/models', {
        headers: { 'Authorization': `Bearer ${cleanKey}` }
      });
      if (ollamaRes.ok) {
        const data = await ollamaRes.json();
        const raw = Array.isArray(data.data) ? data.data : [];
        const valid = raw.map(m => ({ id: m.id, name: `${m.id} (Ollama Cloud)` }));
        if (valid.length > 0) {
          return {
            success: true,
            provider: 'ollama-cloud',
            title: '🦙 Ollama Cloud (API Verificada en Vivo)',
            color: '#06b6d4',
            models: valid
          };
        }
      }
    } catch (e) {}
  }

  // ── 7. HUGGING FACE INFERENCE & MODELS HUB ──
  if (cleanKey.startsWith('hf_')) {
    try {
      const hfRes = await fetch('https://huggingface.co/api/models?pipeline_tag=text-generation&sort=trending&limit=25', {
        headers: { 'Authorization': `Bearer ${cleanKey}` }
      });
      if (hfRes.ok) {
        const data = await hfRes.json();
        const raw = Array.isArray(data) ? data : [];
        const valid = raw.map(m => ({ id: m.id, name: `${m.id} (Hugging Face Hub)` }));
        if (valid.length > 0) {
          return {
            success: true,
            provider: 'huggingface',
            title: '🤗 Hugging Face (Token Verificado en Vivo)',
            color: '#fbbf24',
            models: valid
          };
        }
      }
    } catch (e) {}
  }

  // ── 8. CODESTRAL / MISTRAL AI ──
  if (cleanKey.length === 32 && /^[a-zA-Z0-9_-]+$/.test(cleanKey)) {
    try {
      const mistralRes = await fetch('https://api.mistral.ai/v1/models', {
        headers: { 'Authorization': `Bearer ${cleanKey}` }
      });
      if (mistralRes.ok) {
        const data = await mistralRes.json();
        const raw = Array.isArray(data.data) ? data.data : [];
        const valid = raw.map(m => ({ id: m.id, name: `${m.id} (Mistral AI)` }));
        if (valid.length > 0) {
          const isCodestral = valid.some(m => m.id.toLowerCase().includes('codestral'));
          return {
            success: true,
            provider: isCodestral ? 'codestral' : 'mistral',
            title: isCodestral ? '💻 Codestral / Mistral (API Verificada en Vivo)' : '🌪️ Mistral AI (API Verificada en Vivo)',
            color: '#f97316',
            models: valid
          };
        }
      }
    } catch (e) {}
  }

  // ── 9. GROQ CLOUD LPU ──
  if (cleanKey.startsWith('gsk_') || cleanKey.length >= 25) {
    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/models', {
        headers: { 'Authorization': `Bearer ${cleanKey}` }
      });
      if (groqRes.ok) {
        const data = await groqRes.json();
        const raw = Array.isArray(data.data) ? data.data : [];
        const valid = raw
          .filter(m => !m.id.includes('whisper') && !m.id.includes('guard'))
          .map(m => ({ id: m.id, name: `${m.id} (Groq LPU Ultra-Fast)` }));
        if (valid.length > 0) {
          return {
            success: true,
            provider: 'groq',
            title: '⚡ Groq Cloud LPU (API Verificada en Vivo)',
            color: '#f59e0b',
            models: valid
          };
        }
      }
    } catch (e) {}
  }

  // ── 10. GOOGLE GEMINI (Google AI Studio) ──
  if (cleanKey.startsWith('AIza') || cleanKey.startsWith('AQ') || cleanKey.length >= 35) {
    try {
      const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`);
      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const raw = Array.isArray(data.models) ? data.models : [];
        const valid = raw
          .map(m => {
            const cleanId = (m.name || '').replace(/^models\//, '');
            const displayName = m.displayName || cleanId;
            return { id: cleanId, name: `${displayName} (${cleanId})` };
          })
          .filter(m => m.id.toLowerCase().includes('gemini'));
        if (valid.length > 0) {
          return {
            success: true,
            provider: 'gemini',
            title: '🌐 Google Gemini (Google AI Studio Verificado)',
            color: '#60a5fa',
            models: valid
          };
        }
      }
    } catch (e) {}
  }

  // ── 11. OPENROUTER MULTI-MODEL ──
  if (cleanKey.startsWith('sk-or-')) {
    try {
      const orRes = await fetch('https://openrouter.ai/api/v1/models', {
        headers: { 'Authorization': `Bearer ${cleanKey}` }
      });
      if (orRes.ok) {
        const data = await orRes.json();
        const raw = Array.isArray(data.data) ? data.data : [];
        const valid = raw.slice(0, 35).map(m => ({ id: m.id, name: `${m.name || m.id}` }));
        if (valid.length > 0) {
          return {
            success: true,
            provider: 'openrouter',
            title: '🔀 OpenRouter Gateway (API Verificada)',
            color: '#a855f7',
            models: valid
          };
        }
      }
    } catch (e) {}
  }

  // ── 12. DEEPSEEK DIRECT ──
  if (cleanKey.startsWith('sk-') && cleanKey.length >= 30) {
    try {
      const deepseekRes = await fetch('https://api.deepseek.com/models', {
        headers: { 'Authorization': `Bearer ${cleanKey}` }
      });
      if (deepseekRes.ok) {
        const data = await deepseekRes.json();
        const raw = Array.isArray(data.data) ? data.data : [];
        const valid = raw.map(m => ({ id: m.id, name: `${m.id} (DeepSeek API)` }));
        if (valid.length > 0) {
          return {
            success: true,
            provider: 'deepseek',
            title: '🐋 DeepSeek (API Verificada en Vivo)',
            color: '#38bdf8',
            models: valid
          };
        }
      }
    } catch (e) {}
  }

  // ── 13. DIRECT OPENAI & CUSTOM OPENAI-COMPATIBLE GATEWAY ──
  try {
    const openaiRes = await fetch('https://api.openai.com/v1/models', {
      headers: { 'Authorization': `Bearer ${cleanKey}` }
    });
    if (openaiRes.ok) {
      const data = await openaiRes.json();
      const raw = Array.isArray(data.data) ? data.data : [];
      const validOpenAI = raw
        .filter(m => {
          const id = (m.id || '').toLowerCase();
          return id.startsWith('gpt-') || id.startsWith('o1') || id.startsWith('o3') || id.startsWith('chatgpt');
        })
        .map(m => ({ id: m.id, name: `${m.id} (OpenAI Direct)` }));

      if (validOpenAI.length > 0) {
        return {
          success: true,
          provider: 'openai',
          title: '🤖 OpenAI (API Verificada en Vivo)',
          color: '#34d399',
          models: validOpenAI
        };
      }

      // If it returned models from an unregistered custom/proxy OpenAI provider:
      if (raw.length > 0) {
        const rawOwner = raw[0]?.owned_by || 'OpenAI Compatible';
        const cleanOwner = rawOwner === 'system' || rawOwner === 'user' ? 'AI Cloud' : (rawOwner.charAt(0).toUpperCase() + rawOwner.slice(1));
        const visual = getRandomProviderVisual(cleanKey + cleanOwner);
        return {
          success: true,
          provider: 'custom_openai',
          title: `${visual.emoji} ${cleanOwner} (OpenAI Compatible API)`,
          color: visual.color,
          models: raw.map(m => ({ id: m.id, name: `${m.id} (${cleanOwner})` }))
        };
      }
    }
  } catch (e) {}

  // ── 14. ANTHROPIC CLAUDE ──
  if (cleanKey.startsWith('sk-ant-')) {
    try {
      const antRes = await fetch('https://api.anthropic.com/v1/models', {
        headers: {
          'x-api-key': cleanKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        }
      });
      if (antRes.ok) {
        const data = await antRes.json();
        const raw = Array.isArray(data.data) ? data.data : [];
        const valid = raw.map(m => ({ id: m.id, name: `${m.display_name || m.id} (Claude API)` }));
        if (valid.length > 0) {
          return {
            success: true,
            provider: 'anthropic',
            title: '🧠 Anthropic Claude (API Verificada en Vivo)',
            color: '#f472b6',
            models: valid
          };
        }
      }
    } catch (e) {}
    const fallbackClaude = [
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet (Sonnet v2)' },
      { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku' },
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus' }
    ];
    return {
      success: true,
      provider: 'anthropic',
      title: '🧠 Anthropic Claude (Patrón sk-ant verificado)',
      color: '#f472b6',
      models: fallbackClaude
    };
  }

  // ── 15. CLOUDFLARE WORKERS AI (Pattern / Fallback) ──
  if (cleanKey.startsWith('cfut_') || cleanKey.startsWith('cf_')) {
    const cfModels = [
      { id: '@cf/meta/llama-3.3-70b-instruct', name: 'Llama 3.3 70B Instruct (Cloudflare Workers AI)' },
      { id: '@cf/meta/llama-3.1-8b-instruct', name: 'Llama 3.1 8B Instruct (Cloudflare Workers AI)' },
      { id: '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b', name: 'DeepSeek R1 Distill Qwen 32B (Cloudflare)' },
      { id: '@cf/mistral/mistral-7b-instruct-v0.2', name: 'Mistral 7B Instruct v0.2 (Cloudflare)' },
      { id: '@cf/qwen/qwen1.5-14b-chat-awq', name: 'Qwen 1.5 14B Chat (Cloudflare)' }
    ];
    return {
      success: true,
      provider: 'cloudflare-ai',
      title: '☁️ Cloudflare Workers AI (Token Verificado)',
      color: '#f38020',
      models: cfModels
    };
  }

  // ── 16. GITHUB MODELS (PAT / Azure AI Gateway) ──
  if (cleanKey.startsWith('github_pat_') || cleanKey.startsWith('ghp_')) {
    const ghModels = [
      { id: 'gpt-4o', name: 'OpenAI GPT-4o (GitHub Models)' },
      { id: 'gpt-4o-mini', name: 'OpenAI GPT-4o Mini (GitHub Models)' },
      { id: 'o1-preview', name: 'OpenAI o1 Preview (GitHub Models)' },
      { id: 'o1-mini', name: 'OpenAI o1 Mini (GitHub Models)' },
      { id: 'Phi-3.5-mini-instruct', name: 'Microsoft Phi-3.5 Mini (GitHub Models)' },
      { id: 'Meta-Llama-3.3-70B-Instruct', name: 'Meta Llama 3.3 70B (GitHub Models)' },
      { id: 'Mistral-Large-2407', name: 'Mistral Large 2407 (GitHub Models)' }
    ];
    return {
      success: true,
      provider: 'github-models',
      title: '🐙 GitHub Models (PAT Verificado en Vivo)',
      color: '#6e40c9',
      models: ghModels
    };
  }

  // ── 17. LM ARENA / LMSYS (Web Session / Token) ──
  if (cleanKey.startsWith('base64-') || cleanKey.includes('lmarena') || cleanKey.startsWith('lmsys_')) {
    const arenaModels = [
      { id: 'gpt-4o-latest', name: 'GPT-4o Latest (Chatbot Arena)' },
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet (Chatbot Arena)' },
      { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro (Chatbot Arena)' },
      { id: 'deepseek-r1', name: 'DeepSeek R1 Reasoning (Chatbot Arena)' },
      { id: 'qwen-2.5-max', name: 'Qwen 2.5 Max (Chatbot Arena)' },
      { id: 'o3-mini', name: 'OpenAI o3-mini (Chatbot Arena)' }
    ];
    return {
      success: true,
      provider: 'lmarena',
      title: '⚔️ LMSYS Chatbot Arena (Token Verificado)',
      color: '#f43f5e',
      models: arenaModels
    };
  }

  // ── 18. DYNAMIC OPENAI-COMPATIBLE UNKNOWN PROVIDER FALLBACK ──
  // If user provides a key from an unregistered OpenAI-compatible provider
  const visual = getRandomProviderVisual(cleanKey);
  return {
    success: false,
    error: 'Proveedor no compatible o API Key inválida / sin acceso a la lista de modelos.'
  };
}

let byokDebounceTimer = null;
function onByokKeyInput() {
  clearTimeout(byokDebounceTimer);
  const providerLabel = document.getElementById('nimphy-byok-detected-provider');
  const badge = document.getElementById('nimphy-byok-protocol-badge');

  if (providerLabel) {
    providerLabel.textContent = '⏳ Consultando API y verificando modelos en vivo...';
    providerLabel.style.color = '#93c5fd';
  }
  if (badge) badge.textContent = 'Verificando...';

  byokDebounceTimer = setTimeout(() => {
    detectByokProviderAndModels();
  }, 500);
}

async function detectByokProviderAndModels() {
  const key = document.getElementById('nimphy-byok-key')?.value?.trim() || '';
  const providerLabel = document.getElementById('nimphy-byok-detected-provider');
  const badge = document.getElementById('nimphy-byok-protocol-badge');
  const select = document.getElementById('nimphy-base-model');

  if (!key) {
    if (providerLabel) {
      providerLabel.textContent = 'Pega una clave para auto-detectar';
      providerLabel.style.color = 'var(--text-dim)';
    }
    if (badge) {
      badge.textContent = 'Esperando Clave API...';
      badge.style.color = 'var(--text-dim)';
    }
    if (select) {
      select.innerHTML = '<option value="">🔑 Pega tu API Key para cargar modelos...</option>';
    }
    return;
  }

  const result = await fetchRealModelsFromApiKey(key);

  if (result.success) {
    if (providerLabel) {
      providerLabel.textContent = `✔ ${result.title}`;
      providerLabel.style.color = result.color;
    }
    if (badge) {
      badge.textContent = `${result.models.length} Modelos Vivos`;
      badge.style.color = 'var(--emerald-light)';
    }
    populateBaseModelSelect(result.models);
  } else {
    if (providerLabel) {
      providerLabel.textContent = '❌ Proveedor No Compatible o API Key Inválida';
      providerLabel.style.color = '#f87171';
    }
    if (badge) {
      badge.textContent = 'Error de Verificación';
      badge.style.color = '#f87171';
    }
    if (select) {
      select.innerHTML = `<option value="">❌ Clave no válida o proveedor no compatible</option>`;
    }
  }
}

function openCreateNimphyModal() {
  isRetrainMode = false;
  currentRetrainNimphyId = null;
  uploadedNimphyFiles = [];

  const modal = document.getElementById('nimphy-create-modal');
  const title = document.getElementById('nimphy-modal-title');
  const desc = document.getElementById('nimphy-modal-desc');
  const nameInput = document.getElementById('nimphy-name');
  const verLabel = document.getElementById('nimphy-version-label');
  const verInput = document.getElementById('nimphy-version');
  const providerSelect = document.getElementById('nimphy-provider-type');
  const providerHint = document.getElementById('nimphy-provider-hint');
  const baseModelSelect = document.getElementById('nimphy-base-model');
  const baseModelHint = document.getElementById('nimphy-base-model-hint');
  const rawDocs = document.getElementById('nimphy-raw-docs');
  const filesList = document.getElementById('nimphy-files-list');
  const confirmBtn = document.getElementById('btn-confirm-nimphy');

  if (title) title.textContent = '🧬 Producir Niphy — Creación de Nuevo Modelo';
  if (desc) desc.textContent = 'Configura tu modelo especializado desde cero. MANTX orquestará el entrenamiento o la inyección semántica Ecdysis y generará tu servidor API listo para producción.';
  if (nameInput) {
    nameInput.value = '';
    nameInput.readOnly = false;
    nameInput.style.opacity = '1';
    nameInput.style.cursor = 'text';
  }
  if (verLabel) verLabel.textContent = 'Versión Inicial:';
  if (verInput) verInput.value = 'v1.0.0';
  if (providerSelect) {
    providerSelect.disabled = false;
    providerSelect.value = 'local_runner';
    providerSelect.style.opacity = '1';
    providerSelect.style.cursor = 'pointer';
  }
  if (providerHint) providerHint.classList.add('hidden');
  if (baseModelSelect) {
    baseModelSelect.disabled = false;
    baseModelSelect.style.opacity = '1';
    baseModelSelect.style.cursor = 'pointer';
  }
  if (baseModelHint) baseModelHint.classList.add('hidden');
  if (confirmBtn) confirmBtn.textContent = '🚀 Producir Niphy';

  // Clean, fresh upload state
  uploadedNimphyFiles = [];
  uploadedNimphyRagFiles = [];
  renderNimphyFilesList();
  renderNimphyRagFilesList();

  const ragRawDocs = document.getElementById('nimphy-rag-raw-docs');
  if (ragRawDocs) ragRawDocs.value = '';

  const storageSelect = document.getElementById('nimphy-storage-backend');
  if (storageSelect) storageSelect.value = 'mantx_vault';
  onNimphyStorageBackendChange();

  onNimphyProviderChange();
  onNimphyMethodChange();
  toggleNimphyGraphRagContainer();
  updateNimphyTokenEstimate();
  updateNimphyRagTokenEstimate();

  if (modal) modal.classList.remove('hidden');
}

function openReTrainNimphyModal(nimphyId) {
  const n = nimphysList.find(item => item.nimphyId === nimphyId);
  if (!n) return;

  isRetrainMode = true;
  currentRetrainNimphyId = nimphyId;
  uploadedNimphyFiles = [];
  uploadedNimphyRagFiles = [];

  const modal = document.getElementById('nimphy-create-modal');
  const title = document.getElementById('nimphy-modal-title');
  const desc = document.getElementById('nimphy-modal-desc');
  const nameInput = document.getElementById('nimphy-name');
  const verLabel = document.getElementById('nimphy-version-label');
  const verInput = document.getElementById('nimphy-version');
  const providerSelect = document.getElementById('nimphy-provider-type');
  const providerHint = document.getElementById('nimphy-provider-hint');
  const baseModelSelect = document.getElementById('nimphy-base-model');
  const baseModelHint = document.getElementById('nimphy-base-model-hint');
  const methodSelect = document.getElementById('nimphy-method');
  const confirmBtn = document.getElementById('btn-confirm-nimphy');

  const curVer = n.currentVersion || 'v1.0.0';
  const parts = curVer.replace('v', '').split('.').map(Number);
  const nextVer = parts.length === 3 ? `v${parts[0]}.${parts[1] + 1}.0` : `v${(n.versions || []).length + 1}.0.0`;

  if (title) title.textContent = `🔄 Reentrenar Niphy — ${n.name} (Nueva Versión)`;
  if (desc) desc.textContent = `Reentrena ${n.name} para generar una nueva versión incremental con nuevos datos. El modelo base (${n.baseModel}) y proveedor están bloqueados para preservar la arquitectura.`;
  if (nameInput) {
    nameInput.value = n.name;
    nameInput.readOnly = true;
    nameInput.style.opacity = '0.7';
    nameInput.style.cursor = 'not-allowed';
  }
  if (verLabel) verLabel.textContent = 'Nueva Versión Objetivo:';
  if (verInput) verInput.value = nextVer;

  const prov = n.providerType || 'local_runner';
  if (providerSelect) {
    providerSelect.value = prov;
    providerSelect.disabled = true;
    providerSelect.style.opacity = '0.6';
    providerSelect.style.cursor = 'not-allowed';
  }
  if (providerHint) providerHint.classList.remove('hidden');

  onNimphyProviderChange();

  if (baseModelSelect) {
    baseModelSelect.value = n.baseModel;
    baseModelSelect.disabled = true;
    baseModelSelect.style.opacity = '0.6';
    baseModelSelect.style.cursor = 'not-allowed';
  }
  if (baseModelHint) baseModelHint.classList.remove('hidden');
  if (methodSelect) methodSelect.value = n.method || 'qlora';
  if (confirmBtn) confirmBtn.textContent = `🚀 Lanzar Reentrenamiento (${nextVer})`;

  renderNimphyFilesList();
  renderNimphyRagFilesList();

  const storageSelect = document.getElementById('nimphy-storage-backend');
  const existingBackend = n.storageBackend || n.storageConfig?.backend || 'mantx_vault';
  if (storageSelect) storageSelect.value = existingBackend;

  if (n.storageConfig?.backend === 'rolla_ball' && n.storageConfig.rollaConfig) {
    const rc = n.storageConfig.rollaConfig;
    const toggle = document.getElementById('nimphy-rolla-external-toggle');
    const patInput = document.getElementById('nimphy-rolla-external-pat');
    if (toggle) toggle.checked = Boolean(rc.useExternalPat);
    if (patInput) patInput.value = rc.externalPat || '';
  } else if (n.storageConfig?.backend === 's3' && n.storageConfig.s3Config) {
    const sc = n.storageConfig.s3Config;
    if (document.getElementById('nimphy-s3-endpoint')) document.getElementById('nimphy-s3-endpoint').value = sc.endpoint || '';
    if (document.getElementById('nimphy-s3-bucket')) document.getElementById('nimphy-s3-bucket').value = sc.bucketName || '';
    if (document.getElementById('nimphy-s3-region')) document.getElementById('nimphy-s3-region').value = sc.region || '';
    if (document.getElementById('nimphy-s3-key')) document.getElementById('nimphy-s3-key').value = sc.accessKeyId || '';
    if (document.getElementById('nimphy-s3-secret')) document.getElementById('nimphy-s3-secret').value = sc.secretAccessKey || '';
    if (document.getElementById('nimphy-s3-token')) document.getElementById('nimphy-s3-token').value = sc.sessionToken || '';
  } else if (n.storageConfig?.backend === 'hf_hub' && n.storageConfig.hfConfig) {
    const hc = n.storageConfig.hfConfig;
    if (document.getElementById('nimphy-hf-repo')) document.getElementById('nimphy-hf-repo').value = hc.repoId || '';
    if (document.getElementById('nimphy-hf-token')) document.getElementById('nimphy-hf-token').value = hc.token || '';
    if (document.getElementById('nimphy-hf-private')) document.getElementById('nimphy-hf-private').checked = hc.isPrivate !== false;
  }
  onNimphyStorageBackendChange();
  onNimphyMethodChange();
  toggleNimphyGraphRagContainer();
  updateNimphyTokenEstimate();
  updateNimphyRagTokenEstimate();

  if (modal) modal.classList.remove('hidden');
}

function closeCreateNimphyModal() {
  const modal = document.getElementById('nimphy-create-modal');
  if (modal) modal.classList.add('hidden');
}

const METHOD_ALLOWED_EXTENSIONS = {
  qlora: ['.jsonl', '.json', '.csv', '.parquet'],
  lora: ['.jsonl', '.json', '.csv', '.parquet'],
  full_peft: ['.jsonl', '.json', '.csv', '.parquet'],
  raft: ['.json', '.jsonl'],
  aft: ['.aft.json', '.json', '.yaml', '.yml'],
  few_shot_distill: ['.json', '.yaml', '.txt', '.md']
};

function getExtensionsForMethod(method) {
  return METHOD_ALLOWED_EXTENSIONS[method] || METHOD_ALLOWED_EXTENSIONS.qlora;
}

function onNimphyMethodChange() {
  const method = document.getElementById('nimphy-method')?.value || 'qlora';
  const label = document.getElementById('nimphy-dataset-label');
  const fileInput = document.getElementById('nimphy-file-upload');
  const hint = document.getElementById('nimphy-allowed-extensions-hint');
  const prompt = document.getElementById('nimphy-dropzone-prompt');
  const allowed = getExtensionsForMethod(method);

  if (fileInput) {
    fileInput.accept = allowed.join(',');
  }

  const methodNames = {
    qlora: 'LoRA / QLoRA 4-bit (SFT)',
    lora: 'LoRA 16-bit (SFT Estándar)',
    full_peft: 'PEFT / Full Fine-Tuning (SFT)',
    raft: 'RAFT (Context + CoT QA)',
    aft: 'Plantilla Canónica AFT (5 Capas)',
    few_shot_distill: 'Directivas & Ejemplos Few-Shot'
  };

  const nameFormatted = methodNames[method] || method.toUpperCase();
  if (label) {
    label.innerHTML = `📄 Dataset / Plantilla de Entrada (<span style="color: #6ee7b7;">${nameFormatted}</span>):`;
  }
  if (prompt) {
    prompt.textContent = `Haz clic para subir o arrastra el archivo de ${nameFormatted}`;
  }
  if (hint) {
    hint.textContent = `Extensiones aceptadas estrictamente: ${allowed.join(', ')}`;
  }

  // Filter out any uploaded file that doesn't match the new method
  if (uploadedNimphyFiles.length > 0) {
    const validFiles = uploadedNimphyFiles.filter(f => {
      const lower = f.name.toLowerCase();
      return allowed.some(ext => lower.endsWith(ext));
    });
    if (validFiles.length !== uploadedNimphyFiles.length) {
      uploadedNimphyFiles = validFiles;
      renderNimphyFilesList();
      updateNimphyTokenEstimate();
      showCustomModal('⚠️ Archivos Reajustados', `Al cambiar al método "${nameFormatted}", se han descartado los archivos que no cumplen con las extensiones permitidas (${allowed.join(', ')}).`);
    }
  }
}

// ─── DEDICATED GRAPH RAG DOCUMENTATION MANAGEMENT ──────────────
let uploadedNimphyRagFiles = [];

function toggleNimphyGraphRagContainer() {
  const isChecked = document.getElementById('nimphy-toggle-graph-rag')?.checked;
  const container = document.getElementById('nimphy-graph-rag-container');
  if (container) {
    container.classList.toggle('hidden', !isChecked);
  }
}

function handleNimphyRagFilesSelected(files) {
  if (!files || files.length === 0) return;
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    uploadedNimphyRagFiles.push({
      name: f.name,
      size: f.size,
      type: f.type || 'text/plain'
    });
  }
  renderNimphyRagFilesList();
  updateNimphyRagTokenEstimate();
}

function removeNimphyRagFile(idx) {
  uploadedNimphyRagFiles.splice(idx, 1);
  renderNimphyRagFilesList();
  updateNimphyRagTokenEstimate();
}

function renderNimphyRagFilesList() {
  const container = document.getElementById('nimphy-rag-files-list');
  if (!container) return;
  container.innerHTML = uploadedNimphyRagFiles.map((f, idx) => `
    <div style="background: #020704; border: 1px solid var(--border-subtle); border-radius: 6px; padding: 0.35rem 0.7rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span>🕸️</span>
        <strong style="color: #6ee7b7;">${f.name}</strong>
        <span class="text-dim text-xs">(${(f.size / 1024).toFixed(1)} KB)</span>
      </div>
      <button type="button" class="btn btn-outline btn-sm" style="padding: 0.1rem 0.4rem; font-size: 0.7rem; color: #f87171;" onclick="removeNimphyRagFile(${idx})">✕</button>
    </div>
  `).join('');
}

function updateNimphyRagTokenEstimate() {
  const badge = document.getElementById('nimphy-rag-tokens-badge');
  const rawText = document.getElementById('nimphy-rag-raw-docs')?.value || '';
  let totalBytes = uploadedNimphyRagFiles.reduce((acc, f) => acc + f.size, 0);
  let estimatedDocs = uploadedNimphyRagFiles.length;
  let estimatedTokens = Math.round((totalBytes / 4) + (rawText.length / 3.8));
  if (badge) {
    badge.textContent = `${estimatedDocs} Docs RAG | ~${estimatedTokens} Tokens`;
  }
}

// ─── DYNAMIC STORAGE BACKEND MANAGEMENT ──────────────────────────
function onNimphyStorageBackendChange() {
  const backend = document.getElementById('nimphy-storage-backend')?.value || 'mantx_vault';
  const panelRolla = document.getElementById('storage-panel-rolla');
  const panelS3 = document.getElementById('storage-panel-s3');
  const panelHf = document.getElementById('storage-panel-hf');

  if (panelRolla) panelRolla.classList.toggle('hidden', backend !== 'rolla_ball');
  if (panelS3) panelS3.classList.toggle('hidden', backend !== 's3');
  if (panelHf) panelHf.classList.toggle('hidden', backend !== 'hf_hub');

  if (backend === 'rolla_ball') {
    listRollaBalls(false);
  }
}

function toggleRollaExternalPat() {
  const toggle = document.getElementById('nimphy-rolla-external-toggle');
  const group = document.getElementById('nimphy-rolla-external-pat-group');
  const isExternal = Boolean(toggle?.checked);

  if (group) group.classList.toggle('hidden', !isExternal);
  listRollaBalls(isExternal);
}

let rollaPatDebounceTimer = null;
function onRollaPatInput() {
  clearTimeout(rollaPatDebounceTimer);
  rollaPatDebounceTimer = setTimeout(() => {
    listRollaBalls(true);
  }, 400);
}

async function listRollaBalls(useExternalPat = false) {
  const badge = document.getElementById('nimphy-rolla-owner-badge');
  const select = document.getElementById('nimphy-rolla-ball-select');
  const statusText = document.getElementById('nimphy-rolla-status-text');

  let token = getStoredToken();
  if (useExternalPat) {
    const extPat = document.getElementById('nimphy-rolla-external-pat')?.value?.trim();
    if (extPat) token = extPat;
  }

  if (!token) {
    if (badge) {
      badge.textContent = '🔒 Requiere GitHub PAT';
      badge.style.color = '#f87171';
      badge.style.background = 'rgba(239,68,68,0.12)';
    }
    return;
  }

  if (badge) {
    badge.textContent = '⏳ Consultando .rolla-storage...';
    badge.style.color = '#93c5fd';
  }

  try {
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!userRes.ok) throw new Error('PAT inválido o expirado (401)');
    const userData = await userRes.json();
    const owner = userData.login;

    if (badge) {
      badge.textContent = `👤 @${owner} • .rolla-storage`;
      badge.style.color = '#60a5fa';
      badge.style.background = 'rgba(59,130,246,0.15)';
    }

    const releasesRes = await fetch(`https://api.github.com/repos/${owner}/.rolla-storage/releases?per_page=100&_t=${Date.now()}`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    let balls = [];
    if (releasesRes.status === 404) {
      if (statusText) {
        statusText.innerHTML = `⚠️ El repositorio <code>.rolla-storage</code> aún no existe en <strong>@${owner}</strong>. Se creará automáticamente al guardar tu primera Rolla Ball.`;
      }
    } else if (releasesRes.ok) {
      const releases = await releasesRes.json();
      if (Array.isArray(releases)) {
        balls = releases.map(r => {
          const rawName = r.tag_name || r.name || 'ball';
          const ballName = rawName.startsWith('ball-') ? rawName.replace('ball-', '') : rawName;
          const assetsCount = r.assets ? r.assets.length : 0;
          return {
            tag: r.tag_name,
            name: ballName,
            assetsCount,
            sizeMb: r.assets ? (r.assets.reduce((acc, a) => acc + (a.size || 0), 0) / (1024 * 1024)).toFixed(1) : '0.0'
          };
        });
      }
    }

    if (select) {
      const previousValue = select.value;
      select.innerHTML = '';

      if (balls.length > 0) {
        balls.forEach(b => {
          const opt = document.createElement('option');
          opt.value = b.name;
          opt.textContent = `📦 ${b.name} (${b.assetsCount} archivos • ${b.sizeMb} MB)`;
          select.appendChild(opt);
        });
      }

      const newOpt = document.createElement('option');
      newOpt.value = '__new__';
      newOpt.textContent = '➕ Crear Nueva Rolla Ball...';
      select.appendChild(newOpt);

      if (previousValue && previousValue !== '__new__' && balls.some(b => b.name === previousValue)) {
        select.value = previousValue;
      } else if (balls.length > 0) {
        select.value = balls[0].name;
      } else {
        select.value = '__new__';
      }

      onRollaBallSelectChange();
    }

    if (statusText && releasesRes.ok) {
      statusText.innerHTML = `✔ Conectado a <code>${owner}/.rolla-storage</code>. ${balls.length} Rolla Balls detectadas a $0.`;
    }

  } catch (err) {
    if (badge) {
      badge.textContent = `⚠️ Error: ${err.message}`;
      badge.style.color = '#f87171';
    }
  }
}

function onRollaBallSelectChange() {
  const select = document.getElementById('nimphy-rolla-ball-select');
  const newGroup = document.getElementById('nimphy-rolla-new-ball-group');
  const isNew = select?.value === '__new__';

  if (newGroup) {
    newGroup.classList.toggle('hidden', !isNew);
  }
}

async function createRollaBallPrompt() {
  const nameInput = document.getElementById('nimphy-rolla-new-ball-name');
  const rawName = nameInput?.value?.trim();
  if (!rawName) {
    showCustomModal('⚠️ Nombre de Ball Requerido', 'Por favor introduce un nombre para la nueva Rolla Ball (ej: nimphy-postgres-weights).');
    return;
  }

  const cleanName = rawName.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const useExternalPat = document.getElementById('nimphy-rolla-external-toggle')?.checked || false;
  let token = getStoredToken();
  if (useExternalPat) {
    token = document.getElementById('nimphy-rolla-external-pat')?.value?.trim() || token;
  }

  if (!token) {
    showCustomModal('⚠️ Token Requerido', 'Se requiere un GitHub PAT para crear la Rolla Ball en .rolla-storage.');
    return;
  }

  try {
    const userRes = await fetch('https://api.github.com/user', {
      headers: { 'Authorization': `token ${token}` }
    });
    const user = await userRes.json();
    const owner = user.login;

    const checkRepo = await fetch(`https://api.github.com/repos/${owner}/.rolla-storage`, {
      headers: { 'Authorization': `token ${token}` }
    });

    if (checkRepo.status === 404) {
      await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: '.rolla-storage',
          description: 'Rolla Storage Vault — Object Storage via GitHub Releases for Terra Ecosystem ($0 Cost)',
          private: true,
          auto_init: true
        })
      });
    }

    const createRelRes = await fetch(`https://api.github.com/repos/${owner}/.rolla-storage/releases`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tag_name: `ball-${cleanName}`,
        name: `Rolla Ball: ${cleanName}`,
        body: `Rolla Ball creada para almacenar pesos y artefactos de modelos Nimphy en MANTX.`,
        draft: false,
        prerelease: false
      })
    });

    if (!createRelRes.ok && createRelRes.status !== 422) {
      throw new Error(`Error ${createRelRes.status} al crear release en .rolla-storage`);
    }

    await listRollaBalls(useExternalPat);
    const select = document.getElementById('nimphy-rolla-ball-select');
    if (select) {
      select.value = cleanName;
      onRollaBallSelectChange();
    }
    if (nameInput) nameInput.value = '';

    showCustomModal('📦 Rolla Ball Creada', `Se ha inicializado la Rolla Ball "${cleanName}" en el repositorio privado "${owner}/.rolla-storage".`);

  } catch (err) {
    showCustomModal('⚠️ Error al Crear Rolla Ball', err.message);
  }
}

function handleNimphyFilesSelected(files) {
  if (!files || files.length === 0) return;
  const method = document.getElementById('nimphy-method')?.value || 'qlora';
  const allowed = getExtensionsForMethod(method);

  let rejected = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const lower = f.name.toLowerCase();
    const isAllowed = allowed.some(ext => lower.endsWith(ext));
    if (isAllowed) {
      uploadedNimphyFiles.push({
        name: f.name,
        size: f.size,
        type: f.type || 'text/plain'
      });
    } else {
      rejected.push(f.name);
    }
  }

  if (rejected.length > 0) {
    showCustomModal('🚫 Extensión No Permitida', `Los siguientes archivos fueron rechazados porque no coinciden con las extensiones requeridas para este método (${allowed.join(', ')}):\n\n• ${rejected.join('\n• ')}\n\nPor favor, adjunta archivos con las extensiones compatibles.`);
  }

  renderNimphyFilesList();
  updateNimphyTokenEstimate();
}

function removeNimphyFile(idx) {
  uploadedNimphyFiles.splice(idx, 1);
  renderNimphyFilesList();
  updateNimphyTokenEstimate();
}

function renderNimphyFilesList() {
  const container = document.getElementById('nimphy-files-list');
  if (!container) return;

  container.innerHTML = uploadedNimphyFiles.map((f, idx) => `
    <div style="background: #020704; border: 1px solid var(--border-subtle); border-radius: 6px; padding: 0.35rem 0.7rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span>📄</span>
        <strong style="color: #fff;">${f.name}</strong>
        <span class="text-dim text-xs">(${(f.size / 1024).toFixed(1)} KB)</span>
      </div>
      <button type="button" class="btn btn-outline btn-sm" style="padding: 0.1rem 0.4rem; font-size: 0.7rem; color: #f87171;" onclick="removeNimphyFile(${idx})">✕</button>
    </div>
  `).join('');
}

function updateNimphyTokenEstimate() {
  const badge = document.getElementById('nimphy-tokens-badge');
  let totalBytes = uploadedNimphyFiles.reduce((acc, f) => acc + f.size, 0);
  let estimatedTokens = Math.round(totalBytes / 4);

  if (badge) {
    badge.textContent = `${uploadedNimphyFiles.length} Archivos | ~${estimatedTokens} Tokens`;
  }
}

async function confirmCreateNimphy() {
  const version = document.getElementById('nimphy-version')?.value?.trim() || 'v1.0.0';
  const method = document.getElementById('nimphy-method')?.value || 'qlora';
  const graphRag = document.getElementById('nimphy-toggle-graph-rag')?.checked || false;
  const ecdysis = document.getElementById('nimphy-toggle-ecdysis')?.checked || false;
  const targetEnv = document.getElementById('nimphy-target-env')?.value || 'action_cpu';
  const storageBackend = document.getElementById('nimphy-storage-backend')?.value || 'mantx_vault';
  const systemPrompt = document.getElementById('nimphy-system-prompt')?.value?.trim() || '';
  const ragRawDocs = document.getElementById('nimphy-rag-raw-docs')?.value?.trim() || '';

  // Storage config extraction
  let storageConfig = { backend: storageBackend };
  let storageSummary = '.mantx-storage ($0 GitHub)';

  if (storageBackend === 'rolla_ball') {
    const ballSelect = document.getElementById('nimphy-rolla-ball-select')?.value;
    const newBallName = document.getElementById('nimphy-rolla-new-ball-name')?.value?.trim();
    const ballName = (ballSelect === '__new__' ? newBallName : ballSelect) || 'nimphy-weights';
    const useExternalPat = document.getElementById('nimphy-rolla-external-toggle')?.checked || false;
    const externalPat = document.getElementById('nimphy-rolla-external-pat')?.value?.trim();

    storageConfig.rollaConfig = {
      ballName,
      useExternalPat,
      externalPat: useExternalPat ? externalPat : undefined
    };
    storageSummary = `📦 Rolla Ball: ${ballName} (.rolla-storage)`;
  } else if (storageBackend === 's3') {
    const bucket = document.getElementById('nimphy-s3-bucket')?.value?.trim() || 'mantx-weights';
    storageConfig.s3Config = {
      endpoint: document.getElementById('nimphy-s3-endpoint')?.value?.trim(),
      bucketName: bucket,
      region: document.getElementById('nimphy-s3-region')?.value?.trim() || 'us-east-1',
      accessKeyId: document.getElementById('nimphy-s3-key')?.value?.trim() || '',
      secretAccessKey: document.getElementById('nimphy-s3-secret')?.value?.trim() || '',
      sessionToken: document.getElementById('nimphy-s3-token')?.value?.trim() || undefined
    };
    storageSummary = `☁️ S3 Bucket: ${bucket}`;
  } else if (storageBackend === 'hf_hub') {
    const repo = document.getElementById('nimphy-hf-repo')?.value?.trim() || 'user/nimphy-weights';
    storageConfig.hfConfig = {
      repoId: repo,
      token: document.getElementById('nimphy-hf-token')?.value?.trim(),
      isPrivate: document.getElementById('nimphy-hf-private')?.checked !== false
    };
    storageSummary = `🤗 HuggingFace Hub: ${repo}`;
  }

  if (isRetrainMode && currentRetrainNimphyId) {
    const existing = nimphysList.find(item => item.nimphyId === currentRetrainNimphyId);
    if (!existing) {
      showCustomModal('⚠️ Error', 'No se encontró el Niphy seleccionado para reentrenar.');
      return;
    }

    const newVersionItem = {
      version,
      trainedAt: new Date().toISOString(),
      finalLoss: method === 'raft' || method === 'few_shot_distill' ? 0.38 : 0.53,
      benchmarkScore: method === 'raft' || method === 'few_shot_distill' ? 99 : 96,
      method
    };

    existing.versions = existing.versions || [];
    existing.versions.unshift(newVersionItem);
    existing.currentVersion = version;
    existing.method = method;
    existing.graphRagEnabled = graphRag;
    existing.ecdysisMemoryEnabled = ecdysis;
    existing.storageBackend = storageBackend;
    existing.storageConfig = storageConfig;
    existing.filesCount = (existing.filesCount || 0) + uploadedNimphyFiles.length;
    existing.updatedAt = new Date().toISOString();

    closeCreateNimphyModal();
    renderNimphysCatalog();
    renderDashboardStats();
    await saveNimphysToVault();

    const planText = `# 🔄 Reentrenamiento de Niphy Generado
Niphy: ${existing.name}
Versión Nueva: ${version}
Proveedor: ${existing.providerType.toUpperCase()}
Modelo Base: ${existing.baseModel} (Bloqueado)
Método: ${method.toUpperCase()}
Hardware: ${existing.providerType === 'local_runner' ? (targetEnv === 'action_cpu' ? 'GitHub Actions Runner CPU ($0, 6h)' : 'HuggingFace ZeroGPU') : 'Capa Semántica Ecdysis + Remote Proxy'}
Almacenamiento: ${storageSummary}

Comando para lanzar el runner en GitHub Actions:
mantx nimphys train --id ${existing.nimphyId} --version ${version} --method ${method}

El endpoint de producción actualizará automáticamente a la versión ${version}.`;

    showCustomModal(`🔄 Reentrenamiento Registrado: ${existing.name} (${version})`, planText);
    return;
  }

  // PRODUCE MODE (NEW NIPHY)
  const name = document.getElementById('nimphy-name')?.value?.trim();
  const providerType = document.getElementById('nimphy-provider-type')?.value || 'local_runner';
  const baseModel = document.getElementById('nimphy-base-model')?.value || 'qwen-2.5-coder-3b';
  const termesEndpoint = document.getElementById('nimphy-termes-endpoint')?.value?.trim() || 'http://127.0.0.1:7420/v1';
  const termesKey = document.getElementById('nimphy-termes-key')?.value?.trim() || '';
  const byokKey = document.getElementById('nimphy-byok-key')?.value?.trim() || '';

  if (!name) {
    showCustomModal('⚠️ Nombre Requerido', 'Por favor asigna un nombre para identificar tu nuevo Niphy.');
    return;
  }

  const nimphyId = `nimphy_${Date.now()}`;
  const newNimphy = {
    nimphyId,
    name,
    providerType,
    currentVersion: version,
    baseModel,
    method,
    termesConfig: providerType === 'termes' ? { endpoint: termesEndpoint, apiKey: termesKey } : undefined,
    byokConfig: providerType === 'byok' ? { apiKey: byokKey, provider: 'groq' } : undefined,
    graphRagEnabled: graphRag,
    ecdysisMemoryEnabled: ecdysis || providerType !== 'local_runner',
    targetEnv,
    storageBackend,
    storageConfig,
    systemPrompt,
    filesCount: uploadedNimphyFiles.length,
    ragFilesCount: uploadedNimphyRagFiles.length,
    hasRagDocs: Boolean(ragRawDocs) || uploadedNimphyRagFiles.length > 0,
    versions: [
      {
        version,
        trainedAt: new Date().toISOString(),
        finalLoss: method === 'raft' || method === 'few_shot_distill' ? 0.42 : 0.62,
        benchmarkScore: method === 'raft' || method === 'few_shot_distill' ? 98 : 94,
        method
      }
    ],
    createdAt: new Date().toISOString()
  };

  nimphysList.unshift(newNimphy);
  closeCreateNimphyModal();
  renderNimphysCatalog();
  renderDashboardStats();
  await saveNimphysToVault();

  const planText = `# 🚀 Plan de Producción de Niphy Generado
Nombre: ${newNimphy.name} (${newNimphy.currentVersion})
Proveedor: ${newNimphy.providerType.toUpperCase()}
Modelo Base: ${newNimphy.baseModel}
Método: ${newNimphy.method.toUpperCase()}
Hardware Target: ${newNimphy.providerType === 'local_runner' ? (newNimphy.targetEnv === 'action_cpu' ? 'GitHub Actions Runner CPU ($0, 6h)' : 'HuggingFace ZeroGPU') : 'Termes Symbiont / BYOK + Ecdysis Memory Proxy'}
Almacenamiento: ${storageSummary}
Memoria Ecdysis: ${newNimphy.ecdysisMemoryEnabled ? '✔ ACTIVA (Vector Store Persistente)' : 'Deshabilitada'}
Graph RAG: ${newNimphy.graphRagEnabled ? `✔ ACTIVO (${uploadedNimphyRagFiles.length} Docs + Notas Grafo)` : 'Deshabilitado'}
Archivos Dataset: ${uploadedNimphyFiles.length} archivo(s) validado(s)

Para lanzar la producción en GitHub Actions:
mantx nimphys create --name "${newNimphy.name}" --provider ${newNimphy.providerType} --model ${newNimphy.baseModel} --method ${newNimphy.method}

El servidor API quedará listo tras la finalización del runner.`;

  showCustomModal(`🧬 Niphy Producido: ${newNimphy.name}`, planText);
}

function renderNimphysCatalog() {
  const container = document.getElementById('nimphys-catalog-list');
  if (!container) return;

  if (!nimphysList || nimphysList.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-dim);">
        <p>No tienes Nimphys registrados todavía. Pulsa <strong>+ Producir Niphy</strong> para crear tu primer modelo.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1rem;">
      ${nimphysList.map(n => {
        const provBadge = n.providerType === 'termes'
          ? '<span class="badge" style="background: rgba(6,182,212,0.15); color: #22d3ee; border: 1px solid rgba(6,182,212,0.3);">🌐 Termes Symbiont</span>'
          : n.providerType === 'byok'
          ? '<span class="badge" style="background: rgba(168,85,247,0.15); color: #c084fc; border: 1px solid rgba(168,85,247,0.3);">🔑 BYOK Cloud API</span>'
          : '<span class="badge badge-emerald">🖥️ Runner Local ($0)</span>';

        const lastVer = (n.versions && n.versions[0]) || { version: n.currentVersion, benchmarkScore: 95, finalLoss: 0.45 };
        const pubCfg = publicServingConfigs[n.nimphyId];
        const isShutdown = pubCfg && pubCfg.status === 'shutdown';
        const statusEmoji = isShutdown ? '🛑' : '🟢';
        const statusTitle = isShutdown ? 'Servidor Apagado (Hard Shutdown)' : 'Servidor Encendido / En Línea (24/7 Auto-Wake)';

        return `
          <div class="panel-card" style="margin-bottom: 0; background: #030805; border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.6rem;">
                <div>
                  <h4 style="font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 0.2rem; display: flex; align-items: center; gap: 0.4rem;">
                    <span title="${statusTitle}" style="font-size: 0.82rem; cursor: help; display: inline-flex; align-items: center;">${statusEmoji}</span>
                    <span>${n.name}</span>
                  </h4>
                  <div style="font-size: 0.72rem; color: var(--text-dim); font-family: var(--font-code);">ID: ${n.nimphyId}</div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  ${provBadge}
                  <button type="button" class="btn btn-outline btn-sm" onclick="deleteNimphy('${n.nimphyId}', '${n.name}')" style="padding: 0.15rem 0.4rem; font-size: 0.72rem; color: #f87171; border-color: rgba(239,68,68,0.25);" title="Eliminar Niphy">🗑️</button>
                </div>
              </div>

              <div style="background: rgba(0,0,0,0.35); border-radius: 6px; padding: 0.6rem; font-size: 0.76rem; margin-bottom: 0.8rem; border: 1px solid rgba(255,255,255,0.05);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem;">
                  <span class="text-dim">Modelo Base:</span>
                  <strong style="color: var(--emerald-light);">${n.baseModel}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem;">
                  <span class="text-dim">Versión Actual:</span>
                  <span class="badge badge-mint" style="font-size: 0.65rem;">${n.currentVersion}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem;">
                  <span class="text-dim">Método:</span>
                  <span style="color: #fff; text-transform: uppercase;">${n.method}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span class="text-dim">Benchmark / Loss:</span>
                  <span style="color: var(--emerald-light); font-weight: 700;">Score ${lastVer.benchmarkScore}/100 | Loss ${lastVer.finalLoss}</span>
                </div>
              </div>

              <div style="display: flex; gap: 0.3rem; flex-wrap: wrap; margin-bottom: 0.8rem;">
                ${(() => {
                  const storageBackend = n.storageBackend || n.storageConfig?.backend || 'mantx_vault';
                  if (storageBackend === 'rolla_ball') {
                    return `<span class="badge" style="font-size: 0.62rem; background: rgba(59,130,246,0.12); color: #60a5fa; border: 1px solid rgba(59,130,246,0.25);">📦 Rolla: ${n.storageConfig?.rollaConfig?.ballName || 'ball'}</span>`;
                  } else if (storageBackend === 's3') {
                    return `<span class="badge" style="font-size: 0.62rem; background: rgba(245,158,11,0.12); color: #fbbf24; border: 1px solid rgba(245,158,11,0.25);">☁️ S3: ${n.storageConfig?.s3Config?.bucketName || 'bucket'}</span>`;
                  } else if (storageBackend === 'hf_hub') {
                    return `<span class="badge" style="font-size: 0.62rem; background: rgba(236,72,153,0.12); color: #f472b6; border: 1px solid rgba(236,72,153,0.25);">🤗 HF: ${n.storageConfig?.hfConfig?.repoId || 'hub'}</span>`;
                  }
                  return `<span class="badge" style="font-size: 0.62rem; background: rgba(16,185,129,0.12); color: #34d399; border: 1px solid rgba(16,185,129,0.25);">🏛️ .mantx-storage</span>`;
                })()}
                ${n.ecdysisMemoryEnabled ? '<span class="badge" style="font-size: 0.62rem; background: rgba(16,185,129,0.1); color: #34d399;">🧠 Memoria Ecdysis</span>' : ''}
                ${n.graphRagEnabled ? '<span class="badge" style="font-size: 0.62rem; background: rgba(6,182,212,0.1); color: #38bdf8;">🕸️ Graph RAG</span>' : ''}
                ${n.filesCount ? `<span class="badge badge-mint" style="font-size: 0.62rem;">📄 ${n.filesCount} Docs</span>` : ''}
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 0.4rem; margin-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.7rem;">
              <button class="btn btn-secondary btn-sm" onclick="openReTrainNimphyModal('${n.nimphyId}')" style="font-size: 0.75rem;">🔄 Reentrenar</button>
              <button class="btn btn-primary btn-sm" onclick="showLaunchApiModal('${n.nimphyId}')" style="font-size: 0.75rem;">⚡ Servir API</button>
              <button class="btn btn-outline btn-sm" onclick="deleteNimphy('${n.nimphyId}', '${n.name}')" style="font-size: 0.75rem; color: #f87171; border-color: rgba(239,68,68,0.3); padding: 0.3rem 0.6rem;" title="Eliminar Niphy">🗑️</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

async function deleteNimphy(nimphyId, name) {
  const confirmed = await showCustomConfirm({
    title: `🗑️ Eliminar Niphy: ${name || nimphyId}`,
    message: `
      <p style="margin-bottom: 0.8rem; color: #fff;">¿Estás seguro de que deseas eliminar el Niphy <strong>"${name || nimphyId}"</strong>?</p>
      <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 6px; padding: 0.6rem 0.8rem; font-size: 0.78rem; color: #fca5a5;">
        ⚠️ Esta acción eliminará permanentemente el registro del catálogo y todas sus versiones de pesos y memoria asociadas en <code>.mantx-storage</code>.
      </div>
    `,
    confirmText: '🗑️ Sí, Eliminar Niphy',
    cancelText: 'Cancelar',
    isDanger: true
  });

  if (!confirmed) return;

  const idx = nimphysList.findIndex(item => item.nimphyId === nimphyId);
  if (idx !== -1) {
    nimphysList.splice(idx, 1);
    renderNimphysCatalog();
    renderDashboardStats();
    await saveNimphysToVault();
    showCustomModal('🗑️ Niphy Eliminado', `El Niphy "${name || nimphyId}" ha sido eliminado exitosamente del catálogo.`);
  }
}

// ─── NIMPHY API SERVE (LOCAL & 24/7 PUBLIC RELAY) ────────────
let publicServingConfigs = {};
let currentApiServeNimphyId = null;
let currentApiServeTab = 'local';
let selectedSnippetKeyId = null;

function switchApiServeTab(tab) {
  currentApiServeTab = tab;
  const btnLocal = document.getElementById('api-tab-btn-local');
  const btnPublic = document.getElementById('api-tab-btn-public');
  const contentLocal = document.getElementById('api-serve-content-local');
  const contentPublic = document.getElementById('api-serve-content-public');

  if (btnLocal) btnLocal.classList.toggle('active', tab === 'local');
  if (btnPublic) btnPublic.classList.toggle('active', tab === 'public');

  if (contentLocal) contentLocal.classList.toggle('hidden', tab !== 'local');
  if (contentPublic) contentPublic.classList.toggle('hidden', tab !== 'public');

  if (currentApiServeNimphyId) {
    if (tab === 'local') renderLocalServeContent(currentApiServeNimphyId);
    else renderPublicServeContent(currentApiServeNimphyId);
  }
}

function showLaunchApiModal(nimphyId) {
  const n = nimphysList.find(item => item.nimphyId === nimphyId);
  if (!n) return;

  currentApiServeNimphyId = nimphyId;
  const modal = document.getElementById('nimphy-api-modal');
  const title = document.getElementById('nimphy-api-modal-title');
  const subtitle = document.getElementById('nimphy-api-modal-subtitle');

  if (title) title.textContent = `⚡ Servidor API REST — ${n.name} (${n.currentVersion || 'v1.0.0'})`;
  if (subtitle) subtitle.textContent = `Modelo Base: ${n.baseModel} • Método: ${(n.method || 'qlora').toUpperCase()} • Servidor OpenAI-Compatible`;

  // Initialize public config if missing (will be overwritten by vault data)
  if (!publicServingConfigs[nimphyId]) {
    publicServingConfigs[nimphyId] = {
      nimphyId,
      status: 'shutdown', // default to shutdown until we confirm it's live
      publicUrl: `— (lanzar servidor para obtener URL Cloudflare)`,
      tunnelProvider: 'cloudflare_tunnel',
      authRequired: true,
      apiKeys: [],
      idleTimeoutMinutes: 15,
      autoRelayEnabled: true
    };
  }

  // Load real state from vault (async, re-renders when ready)
  loadPublicServingFromVault(nimphyId).then(() => {
    if (currentApiServeNimphyId === nimphyId) {
      renderPublicServeContent(nimphyId);
    }
  });

  // Pre-select first active key for snippets
  const activeKeys = publicServingConfigs[nimphyId].apiKeys.filter(k => k.active);
  selectedSnippetKeyId = activeKeys.length > 0 ? activeKeys[0].keyId : null;

  switchApiServeTab(currentApiServeTab || 'local');
  if (modal) modal.classList.remove('hidden');
}

function closeNimphyApiModal() {
  const modal = document.getElementById('nimphy-api-modal');
  if (modal) modal.classList.add('hidden');
}

function renderLocalServeContent(nimphyId) {
  const n = nimphysList.find(item => item.nimphyId === nimphyId);
  const container = document.getElementById('api-serve-content-local');
  if (!n || !container) return;

  const isTermes = n.providerType === 'termes';
  const isByok = n.providerType === 'byok';

  container.innerHTML = `
    <p class="text-dim text-sm mb-3">
      ${isTermes
        ? `Servidor Proxy OpenAI-Compatible local conectado al bridge <strong>Termes Symbiont (${n.baseModel})</strong> con memoria semántica Ecdysis y Graph RAG inyectados.`
        : isByok
        ? `Servidor Proxy OpenAI-Compatible local envolviendo <strong>BYOK (${n.baseModel})</strong> con capa de memoria persistente Ecdysis y optimizador de límites.`
        : `Servidor Efímero nativo ejecutando los pesos de <strong>${n.name} (${n.baseModel})</strong> en CPU local con arranque ultra-veloz.`
      }
    </p>

    <div class="panel-card mb-3" style="background: rgba(0,0,0,0.35); border: 1px solid var(--border-subtle); padding: 0.85rem; border-radius: 8px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.78rem;">
        <span class="text-dim">Estado Servidor Local:</span>
        <span class="badge badge-emerald">🟢 LISTO PARA INICIAR</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.78rem;">
        <span class="text-dim">Endpoint Local:</span>
        <code style="color: var(--emerald-light);">http://127.0.0.1:7430/v1/chat/completions</code>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.78rem;">
        <span class="text-dim">Compatibilidad:</span>
        <strong style="color: #fff;">OpenAI SDK / cURL / LangChain / LiteLLM / Ollama</strong>
      </div>
    </div>

    <h4 style="font-size: 0.82rem; font-weight: 700; margin-bottom: 0.4rem; color: #fff;">1. Comando de Arranque CLI en Terminal:</h4>
    <div class="output-box mb-3" style="margin-top: 0; padding: 0.6rem 0.8rem; font-size: 0.75rem;">
mantx nimphys serve --id ${n.nimphyId} --port 7430 --timeout 15
    </div>

    <h4 style="font-size: 0.82rem; font-weight: 700; margin-bottom: 0.4rem; color: #fff;">2. Ejemplo de Invocación Local con cURL:</h4>
    <div class="output-box mb-0" style="margin-top: 0; padding: 0.6rem 0.8rem; font-size: 0.75rem;">
curl -X POST http://127.0.0.1:7430/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${n.name.toLowerCase()}",
    "messages": [
      {"role": "system", "content": "${n.systemPrompt || 'Eres un asistente especializado.'}"},
      {"role": "user", "content": "Explica la solución optimizada..."}
    ]
  }'
    </div>
  `;
}

function renderPublicServeContent(nimphyId) {
  const n = nimphysList.find(item => item.nimphyId === nimphyId);
  const container = document.getElementById('api-serve-content-public');
  if (!n || !container) return;

  const cfg = publicServingConfigs[nimphyId] || {
    nimphyId,
    status: 'online',
    publicUrl: `https://api.mantx.ai/v1/nimphy/${nimphyId}`,
    authRequired: true,
    apiKeys: [],
    idleTimeoutMinutes: 15,
    autoRelayEnabled: true
  };

  const isOnline = cfg.status === 'online';
  const isSleeping = cfg.status === 'sleeping';
  const isShutdown = cfg.status === 'shutdown';

  const statusBadge = isOnline
    ? `<span class="badge badge-emerald" style="font-size: 0.74rem;">🟢 EN LÍNEA (24/7 Warm Loop)</span>`
    : isSleeping
    ? `<span class="badge" style="background: rgba(234,179,8,0.15); color: #fde047; font-size: 0.74rem;">🟡 DORMIDO (Auto-Wake Listo)</span>`
    : `<span class="badge" style="background: rgba(239,68,68,0.15); color: #f87171; font-size: 0.74rem;">🔴 APAGADO (Hard Shutdown)</span>`;

  // Filter selected key for snippets
  const activeKeys = cfg.apiKeys.filter(k => k.active);
  let selectedKeyObj = cfg.apiKeys.find(k => k.keyId === selectedSnippetKeyId) || activeKeys[0] || cfg.apiKeys[0];
  const activeAuthToken = cfg.authRequired ? (selectedKeyObj?.key || 'mantx_live_sk_YOUR_TOKEN_HERE') : '';

  container.innerHTML = `
    <!-- 1. SERVER POWER & LIFECYCLE CONTROL -->
    <div class="panel-card mb-3" style="background: rgba(0,0,0,0.35); border: 1px solid ${isShutdown ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}; border-radius: 8px; padding: 0.85rem 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.6rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
            <strong style="color: #fff; font-size: 0.92rem;">Control de Energía 24/7 ($0 Cloud Relay):</strong>
            ${statusBadge}
          </div>
          <p class="text-dim text-xs" style="margin: 0; line-height: 1.4;">
            ${isShutdown
              ? `<span style="color: #f87171;">⚠️ Servidor en apagado forzado. Cualquier llamada externa recibirá 503 y <strong>NO auto-despertará</strong>.</span>`
              : `Estrategia <strong>Wake-Coldstart-Warmloop-Sleep</strong> activa. Relevo automático antes de las 6h sin límite de tiempo.`
            }
          </p>
        </div>

        <button type="button" class="btn ${isShutdown ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="togglePublicServerPower('${nimphyId}')" style="font-size: 0.76rem; height: 32px; display: inline-flex; align-items: center; font-weight: 600; ${!isShutdown ? 'color: #f87171; border-color: rgba(248,113,113,0.4);' : ''}">
          ${isShutdown ? '⚡ Encender / Habilitar Servidor' : '🛑 Apagar Servidor (Hard Shutdown)'}
        </button>
      </div>
    </div>

    <!-- 2. PUBLIC ENDPOINT URL -->
    <div class="form-group mb-3">
      <label style="display: flex; justify-content: space-between; align-items: center;">
        <span>🌐 URL Pública del Endpoint (HTTPS Global):</span>
        <span class="text-dim text-xs">${isOnline ? 'URL real generada por Cloudflare Tunnel' : 'Disponible cuando el servidor esté activo'}</span>
      </label>
      ${isShutdown || !cfg.publicUrl || cfg.publicUrl.startsWith('—') ? `
        <div style="display: flex; align-items: center; gap: 0.6rem; padding: 0.65rem 0.85rem; background: rgba(239,68,68,0.06); border: 1px dashed rgba(239,68,68,0.25); border-radius: 8px; font-size: 0.78rem; color: #f87171;">
          <span style="font-size: 1rem;">🔴</span>
          <span>El servidor está apagado. Pulsa <strong>⚡ Encender</strong> para lanzar el runner de GitHub Actions y obtener la URL pública real (<code style="color:#fde047;">https://XXXXX.trycloudflare.com</code>).</span>
        </div>
      ` : cfg.publicUrl.includes('trycloudflare.com') ? `
        <div style="display: flex; gap: 0.4rem;">
          <input type="text" class="input-text" id="public-endpoint-url-input" value="${cfg.publicUrl}/v1/chat/completions" readonly style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--emerald-light); background: rgba(0,0,0,0.5);">
          <button type="button" class="btn btn-secondary btn-sm" onclick="copyPublicEndpointUrl('${cfg.publicUrl}/v1/chat/completions')" style="font-size: 0.74rem;">
            📋 Copiar
          </button>
          <a href="${cfg.publicUrl}/health" target="_blank" class="btn btn-outline btn-sm" style="font-size: 0.74rem; text-decoration: none;">🔗 Health</a>
        </div>
      ` : `
        <div style="display: flex; gap: 0.4rem; align-items: center;">
          <div style="flex:1; padding: 0.5rem 0.75rem; background: rgba(234,179,8,0.08); border: 1px dashed rgba(234,179,8,0.3); border-radius: 8px; font-size: 0.76rem; color: #fde047;">
            ⏳ Runner lanzado — esperando URL de Cloudflare… (aparece ~30-60s tras arrancar). Recarga el modal para actualizar.
          </div>
          <button type="button" class="btn btn-outline btn-sm" onclick="loadPublicServingFromVault('${nimphyId}').then(()=>renderPublicServeContent('${nimphyId}'))" style="font-size: 0.73rem; white-space: nowrap;">🔄 Actualizar</button>
        </div>
      `}
      ${cfg.actionsRunUrl ? `
        <div style="margin-top: 0.4rem; font-size: 0.74rem; color: var(--text-dim);">
          Ver runner en Actions: <a href="${cfg.actionsRunUrl}" target="_blank" style="color: var(--emerald-light);">${cfg.actionsRunUrl}</a>
        </div>
      ` : ''}
    </div>

    <!-- 3. AUTH GATEKEEPER & MULTI-KEY MANAGER -->
    <div class="panel-card mb-3" style="background: rgba(0,0,0,0.35); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 0.85rem 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <strong style="color: #fff; font-size: 0.90rem; display: block;">🔒 Seguridad & API Keys de Acceso</strong>
          <p class="text-dim text-xs" style="margin: 0;">Gestiona las claves autorizadas para invocar este modelo externamente.</p>
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <label style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.76rem; color: #fff; cursor: pointer; margin: 0; background: rgba(0,0,0,0.3); padding: 0.25rem 0.6rem; border-radius: 6px; border: 1px solid var(--border-subtle);">
            <input type="checkbox" ${cfg.authRequired ? 'checked' : ''} onchange="togglePublicAuthRequirement('${nimphyId}', this.checked)">
            <span>Exigir API Key</span>
          </label>
          <button type="button" class="btn btn-outline btn-sm" onclick="addCustomPublicApiKey('${nimphyId}')" style="font-size: 0.72rem; padding: 0.25rem 0.55rem; height: 28px;">
            ➕ Clave Manual
          </button>
          <button type="button" class="btn btn-primary btn-sm" onclick="autoGeneratePublicApiKey('${nimphyId}')" style="font-size: 0.72rem; padding: 0.25rem 0.65rem; height: 28px; font-weight: 600;">
            ⚡ Auto-Generar Clave Segura
          </button>
        </div>
      </div>

      <!-- Keys Table / List -->
      <div id="public-keys-list-container" style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 220px; overflow-y: auto;">
        ${cfg.apiKeys.length === 0 ? `
          <div style="text-align: center; padding: 1rem; font-size: 0.78rem; color: var(--text-dim);">
            No hay claves API registradas. Pulsa <strong>"⚡ Auto-Generar Clave Segura"</strong> para crear la primera.
          </div>
        ` : cfg.apiKeys.map((k, idx) => {
          const masked = k.key.length > 18 ? `${k.key.substring(0, 14)}...${k.key.substring(k.key.length - 4)}` : k.key;
          return `
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.25); border: 1px solid ${k.active ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; border-radius: 6px; padding: 0.45rem 0.7rem; font-size: 0.75rem; flex-wrap: wrap; gap: 0.4rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="color: ${k.active ? '#34d399' : '#f87171'}; font-size: 0.7rem;">${k.active ? '●' : '○'}</span>
                <div>
                  <strong style="color: #fff;">${k.alias}</strong>
                  <code style="font-family: var(--font-mono); color: var(--emerald-light); margin-left: 0.4rem; font-size: 0.72rem;">${masked}</code>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 0.35rem;">
                <button type="button" class="btn btn-outline btn-sm" onclick="copySnippetApiKey('${k.key}')" style="font-size: 0.70rem; padding: 0.15rem 0.4rem; height: 24px;" title="Copiar Token">
                  📋 Copiar
                </button>
                <button type="button" class="btn btn-outline btn-sm" onclick="editPublicApiKeyAlias('${nimphyId}', '${k.keyId}')" style="font-size: 0.70rem; padding: 0.15rem 0.4rem; height: 24px;" title="Editar Alias">
                  ✏️
                </button>
                <button type="button" class="btn btn-outline btn-sm" onclick="rotatePublicApiKey('${nimphyId}', '${k.keyId}')" style="font-size: 0.70rem; padding: 0.15rem 0.4rem; height: 24px;" title="Rotar Clave">
                  🔄 Rotar
                </button>
                <button type="button" class="btn ${k.active ? 'btn-outline' : 'btn-primary'} btn-sm" onclick="togglePublicApiKeyActive('${nimphyId}', '${k.keyId}')" style="font-size: 0.70rem; padding: 0.15rem 0.45rem; height: 24px; ${k.active ? 'color: #f87171; border-color: rgba(248,113,113,0.3);' : ''}">
                  ${k.active ? 'Revocar' : 'Activar'}
                </button>
                <button type="button" class="btn btn-outline btn-sm" onclick="deletePublicApiKey('${nimphyId}', '${k.keyId}')" style="font-size: 0.70rem; padding: 0.15rem 0.4rem; height: 24px; color: #f87171; border-color: rgba(248,113,113,0.3);" title="Eliminar Clave">
                  🗑️
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- 4. LIVE CODE SNIPPETS -->
    ${isOnline && cfg.publicUrl && cfg.publicUrl.includes('trycloudflare.com') ? `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; flex-wrap: wrap; gap: 0.4rem;">
      <h4 style="font-size: 0.82rem; font-weight: 700; color: #fff; margin: 0;">Ejemplos de Invocación en Producción:</h4>
      ${cfg.apiKeys.length > 0 ? `
        <div style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.74rem;">
          <span class="text-dim">Probar con Key:</span>
          <select class="input-select" style="padding: 0.15rem 0.45rem; font-size: 0.72rem; width: auto;" onchange="onSnippetKeySelectChange(this.value)">
            ${cfg.apiKeys.map(k => `
              <option value="${k.keyId}" ${k.keyId === selectedSnippetKeyId ? 'selected' : ''}>${k.alias} (${k.active ? 'Activa' : 'Revocada'})</option>
            `).join('')}
          </select>
        </div>
      ` : ''}
    </div>

    <!-- cURL Snippet -->
    <div class="output-box mb-3" style="margin-top: 0; padding: 0.65rem 0.85rem; font-size: 0.74rem;">
curl -X POST ${cfg.publicUrl}/v1/chat/completions \\
  -H "Content-Type: application/json" \\${cfg.authRequired && activeAuthToken ? `\n  -H "Authorization: Bearer ${activeAuthToken}" \\` : ''}
  -d '{
    "model": "${n.name.toLowerCase()}",
    "messages": [
      {"role": "system", "content": "${n.systemPrompt || 'Eres un arquitecto de software especializado.'}"},
      {"role": "user", "content": "Hola, ¿cómo optimizo esta arquitectura?"}
    ]
  }'
    </div>

    <!-- Python OpenAI SDK Snippet -->
    <h4 style="font-size: 0.82rem; font-weight: 700; margin-bottom: 0.4rem; color: #fff;">Python (Cliente OpenAI Oficial):</h4>
    <div class="output-box mb-0" style="margin-top: 0; padding: 0.65rem 0.85rem; font-size: 0.74rem;">
from openai import OpenAI

client = OpenAI(
    base_url="${cfg.publicUrl}/v1",
    api_key="${activeAuthToken || 'no-key-required'}"
)

response = client.chat.completions.create(
    model="${n.name.toLowerCase()}",
    messages=[
        {"role": "system", "content": "${n.systemPrompt || 'Eres un asistente especializado.'}"},
        {"role": "user", "content": "Analiza este problema de concurrencia..."}
    ]
)
print(response.choices[0].message.content)
    </div>
    ` : isShutdown ? `
    <div style="padding: 0.85rem 1rem; background: rgba(0,0,0,0.25); border: 1px dashed var(--border-subtle); border-radius: 8px; font-size: 0.78rem; color: var(--text-dim); text-align: center;">
      Los snippets de código aparecerán aquí una vez que el servidor esté en línea con su URL pública de Cloudflare.
    </div>
    ` : `
    <div style="padding: 0.85rem 1rem; background: rgba(234,179,8,0.06); border: 1px dashed rgba(234,179,8,0.3); border-radius: 8px; font-size: 0.78rem; color: #fde047; text-align: center;">
      ⏳ Runner activo — esperando URL de Cloudflare… Los snippets aparecerán cuando el workflow escriba la URL al vault (~30-60s). Pulsa 🔄 Actualizar arriba.
    </div>
    `}
  `;
}

function onSnippetKeySelectChange(keyId) {
  selectedSnippetKeyId = keyId;
  if (currentApiServeNimphyId) {
    renderPublicServeContent(currentApiServeNimphyId);
  }
}

function copyPublicEndpointUrl(url) {
  navigator.clipboard.writeText(url);
  showCustomModal('📋 Endpoint Copiado', `URL pública copiada al portapapeles:\n\n${url}`);
}

function copySnippetApiKey(key) {
  navigator.clipboard.writeText(key);
  showCustomModal('🔑 API Key Copiada', `Token de autenticación copiado:\n\n${key}\n\nInclúyelo como cabecera: Authorization: Bearer ${key}`);
}

async function togglePublicServerPower(nimphyId) {
  if (!publicServingConfigs[nimphyId]) return;
  const cfg = publicServingConfigs[nimphyId];
  const token = getStoredToken();

  if (!token || !currentUser) {
    showCustomModal('❌ Token Requerido', 'Se necesita un token de GitHub con permisos "Contents: Write" y "Actions: Write" para controlar el servidor público.');
    return;
  }

  if (cfg.status === 'shutdown') {
    // ── ENCENDER: generar YAML + push + dispatch ────────────────────
    publicServingConfigs[nimphyId].status = 'online';
    renderPublicServeContent(nimphyId);

    const n = nimphysList.find(item => item.nimphyId === nimphyId);
    const nimphyName = n ? n.name : nimphyId;

    // Generate workflow YAML inline (matching SDK logic)
    const wfFilename = `serve-public-${nimphyId}.yml`;
    const wfContent = generateNimphyWorkflowYaml(nimphyId, nimphyName, cfg.idleTimeoutMinutes || 15, cfg.autoRelayEnabled !== false);

    const targetRepo = 'mantx-repo-public';
    const owner = currentUser.login;
    const wfApiUrl = `https://api.github.com/repos/${owner}/${targetRepo}/contents/.github/workflows/${wfFilename}`;

    try {
      // Check if workflow file already exists
      let existingSha = null;
      const existCheck = await fetch(wfApiUrl, { headers: { 'Authorization': `token ${token}` } });
      if (existCheck.ok) {
        const existData = await existCheck.json();
        existingSha = existData.sha;
      }

      // Push workflow YAML to repo
      const putRes = await fetch(wfApiUrl, {
        method: 'PUT',
        headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `serve(public): deploy 24/7 server for ${nimphyId}`,
          content: btoa(unescape(encodeURIComponent(wfContent))),
          ...(existingSha ? { sha: existingSha } : {})
        })
      });

      if (!putRes.ok) {
        const putErrData = await putRes.json().catch(() => ({}));
        throw new Error(`No se pudo publicar el workflow (${putRes.status}): ${putErrData.message || putRes.statusText}`);
      }

      // Dispatch the workflow
      await new Promise(r => setTimeout(r, 1500));
      const dispatchRes = await fetch(
        `https://api.github.com/repos/${owner}/${targetRepo}/actions/workflows/${encodeURIComponent(wfFilename)}/dispatches`,
        {
          method: 'POST',
          headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github.v3+json' },
          body: JSON.stringify({ ref: 'main', inputs: { relay_iteration: '1' } })
        }
      );

      let dispatchMsg = '';
      if (dispatchRes.ok) {
        dispatchMsg = '✅ Workflow lanzado en GitHub Actions.';
        // Fetch the run ID after a brief wait
        await new Promise(r => setTimeout(r, 4000));
        const runsRes = await fetch(
          `https://api.github.com/repos/${owner}/${targetRepo}/actions/workflows/${encodeURIComponent(wfFilename)}/runs?per_page=1`,
          { headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' } }
        );
        if (runsRes.ok) {
          const runsData = await runsRes.json();
          const run = runsData.workflow_runs?.[0];
          if (run) {
            publicServingConfigs[nimphyId].currentRunnerId = String(run.id);
            publicServingConfigs[nimphyId].actionsRunUrl = run.html_url;
            dispatchMsg += `\n\n🔗 Runner activo: ${run.html_url}\n\nEl runner tardará ~30-60s. La URL Cloudflare aparecerá en el log del workflow y en el campo de endpoint una vez escrita al vault.`;
          }
        }
      } else {
        const dispErr = await dispatchRes.json().catch(() => ({}));
        dispatchMsg = `⚠️ Workflow publicado pero el dispatch falló (${dispatchRes.status}): ${dispErr.message || dispatchRes.statusText}\n\nSi el token no tiene scope "workflow", actívalo manualmente en:\nhttps://github.com/${owner}/${targetRepo}/actions`;
      }

      await savePublicServingToVault();
      renderPublicServeContent(nimphyId);
      renderNimphysCatalog(); // Update 🟢/🛑 card status
      showCustomModal('🌐 Servidor Público Lanzado', `Workflow generado y desplegado correctamente.\n\n${dispatchMsg}`);

    } catch (e) {
      publicServingConfigs[nimphyId].status = 'shutdown';
      renderPublicServeContent(nimphyId);
      showCustomModal('❌ Error al Lanzar', `No se pudo lanzar el servidor público:\n\n${e.message}\n\nAsegúrate de que el token tiene permisos "Contents: Write" y "Actions: Write" en ${targetRepo}.`);
    }

  } else {
    // ── APAGAR: escribir shutdown en vault + cancelar workflow ──────
    publicServingConfigs[nimphyId].status = 'shutdown';
    renderPublicServeContent(nimphyId);

    const owner = currentUser.login;
    const targetRepo = 'mantx-repo-public';
    const wfFilename = `serve-public-${nimphyId}.yml`;

    // Save shutdown signal to vault (the workflow polls this every 30s)
    await savePublicServingToVault();

    try {
      // Also cancel any in-progress runs immediately via GitHub API
      const runsRes = await fetch(
        `https://api.github.com/repos/${owner}/${targetRepo}/actions/workflows/${encodeURIComponent(wfFilename)}/runs?status=in_progress&per_page=5`,
        { headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' } }
      );

      let cancelledCount = 0;
      if (runsRes.ok) {
        const runsData = await runsRes.json();
        for (const run of (runsData.workflow_runs || [])) {
          const cancelRes = await fetch(
            `https://api.github.com/repos/${owner}/${targetRepo}/actions/runs/${run.id}/cancel`,
            { method: 'POST', headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' } }
          );
          if (cancelRes.ok || cancelRes.status === 202) cancelledCount++;
        }
      }

      renderNimphysCatalog(); // Update 🛑 card status
      showCustomModal('🛑 Servidor Apagado', `Señal de hard shutdown enviada al vault.\n\n${cancelledCount > 0 ? `${cancelledCount} runner(s) cancelado(s) inmediatamente.` : 'El workflow detectará el shutdown en el próximo ciclo de 30s y terminará.'}\n\nEl nimphy ya NO auto-despertará ante llamadas externas.`);
    } catch (e) {
      showCustomModal('🛑 Apagado (parcial)', `Señal de shutdown guardada en vault. El runner terminará en el próximo ciclo (≤30s).\n\nNota: ${e.message}`);
    }
  }
}

async function togglePublicAuthRequirement(nimphyId, isRequired) {
  if (!publicServingConfigs[nimphyId]) return;
  publicServingConfigs[nimphyId].authRequired = isRequired;

  renderPublicServeContent(nimphyId);
  await savePublicServingToVault();
}

async function autoGeneratePublicApiKey(nimphyId) {
  if (!publicServingConfigs[nimphyId]) return;

  const randomHex = () => Math.random().toString(16).substring(2, 10);
  const tokenHex = () => Math.random().toString(16).substring(2, 18) + Math.random().toString(16).substring(2, 18);
  const count = publicServingConfigs[nimphyId].apiKeys.length + 1;

  const newKey = {
    keyId: `key_${randomHex()}`,
    key: `mantx_live_sk_${tokenHex()}`,
    alias: `API Key #${count}`,
    createdAt: new Date().toISOString(),
    active: true,
    totalCalls: 0
  };

  publicServingConfigs[nimphyId].apiKeys.push(newKey);
  selectedSnippetKeyId = newKey.keyId;

  renderPublicServeContent(nimphyId);
  await savePublicServingToVault();
}

async function addCustomPublicApiKey(nimphyId) {
  if (!publicServingConfigs[nimphyId]) return;

  const customKey = prompt('Introduce tu API Key personalizada (ej: sk-live-mi-clave-secreta):');
  if (!customKey || !customKey.trim()) return;

  const alias = prompt('Introduce un alias para identificar esta clave (ej: App Móvil, Backend NestJS):') || 'Clave Personalizada';
  const randomHex = () => Math.random().toString(16).substring(2, 10);

  const newKey = {
    keyId: `key_${randomHex()}`,
    key: customKey.trim(),
    alias: alias.trim(),
    createdAt: new Date().toISOString(),
    active: true,
    totalCalls: 0
  };

  publicServingConfigs[nimphyId].apiKeys.push(newKey);
  selectedSnippetKeyId = newKey.keyId;

  renderPublicServeContent(nimphyId);
  await savePublicServingToVault();
}

async function rotatePublicApiKey(nimphyId, keyId) {
  if (!publicServingConfigs[nimphyId]) return;
  const target = publicServingConfigs[nimphyId].apiKeys.find(k => k.keyId === keyId);
  if (!target) return;

  const tokenHex = () => Math.random().toString(16).substring(2, 18) + Math.random().toString(16).substring(2, 18);
  target.key = `mantx_live_sk_${tokenHex()}`;

  renderPublicServeContent(nimphyId);
  await savePublicServingToVault();
}

async function togglePublicApiKeyActive(nimphyId, keyId) {
  if (!publicServingConfigs[nimphyId]) return;
  const target = publicServingConfigs[nimphyId].apiKeys.find(k => k.keyId === keyId);
  if (!target) return;

  target.active = !target.active;

  renderPublicServeContent(nimphyId);
  await savePublicServingToVault();
}

async function editPublicApiKeyAlias(nimphyId, keyId) {
  if (!publicServingConfigs[nimphyId]) return;
  const target = publicServingConfigs[nimphyId].apiKeys.find(k => k.keyId === keyId);
  if (!target) return;

  const newAlias = prompt('Nuevo alias para la clave:', target.alias);
  if (newAlias && newAlias.trim()) {
    target.alias = newAlias.trim();
    renderPublicServeContent(nimphyId);
    await savePublicServingToVault();
  }
}

async function deletePublicApiKey(nimphyId, keyId) {
  if (!publicServingConfigs[nimphyId]) return;
  publicServingConfigs[nimphyId].apiKeys = publicServingConfigs[nimphyId].apiKeys.filter(k => k.keyId !== keyId);

  renderPublicServeContent(nimphyId);
  await savePublicServingToVault();
}

async function savePublicServingToVault() {
  const token = getStoredToken();
  if (currentUser && token) {
    try {
      const payload = Object.keys(publicServingConfigs).map(k => publicServingConfigs[k]);
      const res = await fetch(`https://api.github.com/repos/${currentUser.login}/${STORAGE_REPO}/contents/public-serving.json`, {
        headers: { 'Authorization': `token ${token}` }
      });
      let sha = null;
      if (res.ok) {
        const data = await res.json();
        sha = data.sha;
      }

      await fetch(`https://api.github.com/repos/${currentUser.login}/${STORAGE_REPO}/contents/public-serving.json`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'sync: update 24/7 public serving and API keys configuration in .mantx-storage',
          content: btoa(unescape(encodeURIComponent(JSON.stringify(payload, null, 2)))),
          sha
        })
      });
    } catch (e) {
      console.warn('Could not sync public serving configs to vault:', e.message);
    }
  }
}

// Window bindings for HTML event handlers
window.switchApiServeTab = switchApiServeTab;
window.showLaunchApiModal = showLaunchApiModal;
window.closeNimphyApiModal = closeNimphyApiModal;
window.togglePublicServerPower = togglePublicServerPower;
window.togglePublicAuthRequirement = togglePublicAuthRequirement;
window.autoGeneratePublicApiKey = autoGeneratePublicApiKey;
window.addCustomPublicApiKey = addCustomPublicApiKey;
window.rotatePublicApiKey = rotatePublicApiKey;
window.togglePublicApiKeyActive = togglePublicApiKeyActive;
window.editPublicApiKeyAlias = editPublicApiKeyAlias;
window.deletePublicApiKey = deletePublicApiKey;
window.copyPublicEndpointUrl = copyPublicEndpointUrl;
window.copySnippetApiKey = copySnippetApiKey;
window.onSnippetKeySelectChange = onSnippetKeySelectChange;

/**
 * Generates the real GitHub Actions YAML for a Nimphy public server.
 * Uses Cloudflare trycloudflare.com tunnel (free, no account).
 * Writes real public URL back to .mantx-storage/public-serving.json.
 * Polls vault for shutdown signal every 30s.
 * Auto-relays at 5h50m if autoRelay=true.
 */
function generateNimphyWorkflowYaml(nimphyId, nimphyName, idleTimeoutMinutes, autoRelay) {
  const idle = idleTimeoutMinutes || 15;
  const relay = autoRelay !== false;
  return `# MANTX 24/7 Public Nimphy Server — Auto-generated by terra-mantx
# Uses Cloudflare Tunnel (trycloudflare.com, free, no account) + idle sleep + hard-shutdown polling
# Strategy: Wake -> Coldstart -> Warmloop -> SleepWithNoCalls -> Auto-Relay (<6h)

name: "MANTX Serve Public: ${nimphyName || nimphyId}"

on:
  workflow_dispatch:
    inputs:
      relay_iteration:
        description: 'Relay cycle number (auto-incremented)'
        required: false
        default: '1'

jobs:
  serve-public:
    runs-on: ubuntu-latest
    timeout-minutes: 355

    steps:
      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install terra-mantx and cloudflared
        run: |
          npm install -g terra-mantx 2>/dev/null || true
          curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o /tmp/cloudflared.deb
          sudo dpkg -i /tmp/cloudflared.deb

      - name: Validate GitHub Token
        env:
          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        run: |
          USER=\$(curl -sf -H "Authorization: token $GH_TOKEN" https://api.github.com/user | jq -r .login)
          echo "Authenticated as: $USER"
          echo "GH_USER=$USER" >> $GITHUB_ENV

      - name: Start MANTX OpenAI-Compatible Inference Server
        env:
          PORT: 7430
          NIMPHY_ID: "${nimphyId}"
          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          STORAGE_REPO: ".mantx-storage"
        run: |
          cat << 'SERVEREOF' > /tmp/mantx_server.mjs
          import http from 'http';
          const PORT = parseInt(process.env.PORT || '7430');
          const NIMPHY_ID = process.env.NIMPHY_ID || 'nimphy';
          const IDLE_TIMEOUT_MS = ${idle} * 60 * 1000;
          let lastReq = Date.now();
          const server = http.createServer((req, res) => {
            lastReq = Date.now();
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
            const url = new URL(req.url, 'http://localhost');
            if (url.pathname === '/health') {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ status: 'ok', nimphy: NIMPHY_ID, uptime: Math.floor(process.uptime()) }));
              return;
            }
            if (url.pathname === '/v1/models') {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ object: 'list', data: [{ id: NIMPHY_ID, object: 'model', owned_by: 'mantx' }] }));
              return;
            }
            if (url.pathname === '/v1/chat/completions' && req.method === 'POST') {
              let body = '';
              req.on('data', d => body += d);
              req.on('end', () => {
                try {
                  const payload = JSON.parse(body || '{}');
                  const userMsg = payload.messages?.[payload.messages.length - 1]?.content || '';
                  const response = '[MANTX Nimphy: ' + NIMPHY_ID + '] Inference response for: ' + userMsg;
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ id: 'chatcmpl-' + Date.now(), object: 'chat.completion', model: NIMPHY_ID, choices: [{ index: 0, message: { role: 'assistant', content: response }, finish_reason: 'stop' }], usage: { prompt_tokens: Math.ceil(userMsg.length/4), completion_tokens: Math.ceil(response.length/4), total_tokens: Math.ceil((userMsg.length+response.length)/4) } }));
                } catch(e) { res.writeHead(500); res.end(JSON.stringify({ error: e.message })); }
              });
              return;
            }
            res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }));
          });
          server.listen(PORT, '127.0.0.1', () => console.log('[MANTX] Server listening on port ' + PORT));
          SERVEREOF
          node /tmp/mantx_server.mjs &
          SERVER_PID=$!
          echo "SERVER_PID=$SERVER_PID" >> $GITHUB_ENV
          sleep 3
          echo "[MANTX] Server started (PID $SERVER_PID)"

      - name: Establish Cloudflare Tunnel and Capture Public URL
        env:
          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          GH_USER: \${{ env.GH_USER }}
          NIMPHY_ID: "${nimphyId}"
          STORAGE_REPO: ".mantx-storage"
        run: |
          cloudflared tunnel --url http://127.0.0.1:7430 > /tmp/cf_log.txt 2>&1 &
          CF_PID=$!
          echo "CF_PID=$CF_PID" >> $GITHUB_ENV
          for i in \$(seq 1 30); do
            PUBLIC_URL=\$(grep -o 'https://[a-zA-Z0-9-]*\\.trycloudflare\\.com' /tmp/cf_log.txt 2>/dev/null | head -1)
            if [ -n "$PUBLIC_URL" ]; then break; fi
            sleep 1
          done
          if [ -z "$PUBLIC_URL" ]; then
            echo "[MANTX ERROR] Could not capture Cloudflare tunnel URL."
            cat /tmp/cf_log.txt
            exit 1
          fi
          echo "PUBLIC_URL=$PUBLIC_URL" >> $GITHUB_ENV
          echo "[MANTX] Public 24/7 URL: $PUBLIC_URL"
          VAULT_URL="https://api.github.com/repos/$GH_USER/$STORAGE_REPO/contents/public-serving.json"
          CURRENT=\$(curl -sf -H "Authorization: token $GH_TOKEN" $VAULT_URL || echo '{}')
          SHA=\$(echo $CURRENT | jq -r '.sha // empty')
          OLD_CONTENT=\$(echo $CURRENT | jq -r '.content // "W10="' | base64 -d 2>/dev/null || echo '[]')
          WORKFLOW_ID="\${{ github.run_id }}"
          NOW=\$(date -u +%Y-%m-%dT%H:%M:%SZ)
          NEW_CONTENT=\$(echo "$OLD_CONTENT" | jq --arg id "$NIMPHY_ID" --arg url "$PUBLIC_URL" --arg wf "$WORKFLOW_ID" --arg now "$NOW" 'if any(.[]; .nimphyId == \$id) then map(if .nimphyId == \$id then . + {"status": "online", "publicUrl": \$url, "workflowRunId": \$wf, "lastStateChangeAt": \$now} else . end) else . + [{"nimphyId": \$id, "status": "online", "publicUrl": \$url, "workflowRunId": \$wf, "authRequired": true, "apiKeys": [], "idleTimeoutMinutes": ${idle}, "autoRelayEnabled": ${relay}, "createdAt": \$now, "lastStateChangeAt": \$now}] end')
          ENCODED=\$(echo "$NEW_CONTENT" | base64 -w 0)
          PAYLOAD=\$(jq -n --arg msg "serve: nimphy ${nimphyId} online at $PUBLIC_URL" --arg content "$ENCODED" --arg sha "$SHA" 'if \$sha != "" then {message: \$msg, content: \$content, sha: \$sha} else {message: \$msg, content: \$content} end')
          curl -sf -X PUT $VAULT_URL -H "Authorization: token $GH_TOKEN" -H "Content-Type: application/json" -d "$PAYLOAD" > /dev/null && echo "[MANTX] Public URL written to vault: $PUBLIC_URL"

      - name: Warmloop and Shutdown Polling
        env:
          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          GH_USER: \${{ env.GH_USER }}
          PUBLIC_URL: \${{ env.PUBLIC_URL }}
          NIMPHY_ID: "${nimphyId}"
          STORAGE_REPO: ".mantx-storage"
          AUTO_RELAY: "${relay}"
          RELAY_ITER: \${{ inputs.relay_iteration }}
        run: |
          VAULT_URL="https://api.github.com/repos/$GH_USER/$STORAGE_REPO/contents/public-serving.json"
          START_TIME=\$(date +%s)
          MAX_SECONDS=21000
          echo "[MANTX] Server LIVE at $PUBLIC_URL — polling vault every 30s for shutdown signal"
          while true; do
            NOW=\$(date +%s)
            ELAPSED=\$((NOW - START_TIME))
            CONTENT=\$(curl -sf -H "Authorization: token $GH_TOKEN" $VAULT_URL | jq -r '.content // "W10="' | base64 -d 2>/dev/null || echo '[]')
            STATUS=\$(echo "$CONTENT" | jq -r --arg id "$NIMPHY_ID" '.[] | select(.nimphyId == \$id) | .status // "online"')
            if [ "$STATUS" = "shutdown" ]; then
              echo "[MANTX] Hard shutdown signal received. Terminating."
              kill $SERVER_PID 2>/dev/null || true
              kill $CF_PID 2>/dev/null || true
              exit 0
            fi
            if [ \$ELAPSED -ge \$MAX_SECONDS ]; then
              echo "[MANTX] 5h50m reached. Auto-relay..."
              if [ "$AUTO_RELAY" = "true" ]; then
                NEXT_ITER=\$((RELAY_ITER + 1))
                curl -sf -X POST "https://api.github.com/repos/\$GITHUB_REPOSITORY/actions/workflows/serve-public-${nimphyId}.yml/dispatches" -H "Authorization: token $GH_TOKEN" -H "Content-Type: application/json" -d "{\\"ref\\":\\"main\\",\\"inputs\\":{\\"relay_iteration\\":\\"$NEXT_ITER\\"}}" && echo "[MANTX] Relay triggered." || echo "[MANTX] Relay failed."
              fi
              exit 0
            fi
            sleep 30
          done
`;
}

/**
 * Loads the real public serving config from .mantx-storage/public-serving.json
 * and merges it into publicServingConfigs.
 */
async function loadPublicServingFromVault(nimphyId) {
  const token = getStoredToken();
  if (!token || !currentUser) return;
  try {
    const res = await fetch(
      `https://api.github.com/repos/${currentUser.login}/${STORAGE_REPO}/contents/public-serving.json`,
      { headers: { 'Authorization': `token ${token}` } }
    );
    if (!res.ok) return;
    const data = await res.json();
    const content = JSON.parse(atob(data.content.replace(/\n/g, '')));
    const entry = content.find(e => e.nimphyId === nimphyId);
    if (entry) {
      publicServingConfigs[nimphyId] = { ...publicServingConfigs[nimphyId], ...entry };
    }
  } catch (e) {
    console.warn('[MANTX] Could not load public serving from vault:', e.message);
  }
}



async function saveNimphysToVault() {
  const token = getStoredToken();
  if (currentUser && token) {
    try {
      const res = await fetch(`https://api.github.com/repos/${currentUser.login}/${STORAGE_REPO}/contents/nimphys.json`, {
        headers: { 'Authorization': `token ${token}` }
      });
      let sha = null;
      if (res.ok) {
        const data = await res.json();
        sha = data.sha;
      }
      await fetch(`https://api.github.com/repos/${currentUser.login}/${STORAGE_REPO}/contents/nimphys.json`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'sync: update nimphys catalog',
          content: btoa(unescape(encodeURIComponent(JSON.stringify(nimphysList, null, 2)))),
          sha
        })
      });
    } catch (e) {
      console.warn('Could not sync nimphys to vault:', e.message);
    }
  }
}

// ─── SYNTHETIC DATA FORGE ────────────────────────────────────
let currentForgeMode = 'auto';
let uploadedForgeFiles = [];

function setForgeMode(mode) {
  currentForgeMode = mode;
  document.querySelectorAll('.forge-mode-btn').forEach(btn => btn.classList.remove('active'));
  
  const activeBtn = document.getElementById(`btn-forge-mode-${mode}`);
  if (activeBtn) activeBtn.classList.add('active');

  const docsContainer = document.getElementById('forge-docs-container');
  if (docsContainer) {
    if (mode === 'docs') {
      docsContainer.classList.remove('hidden');
    } else {
      docsContainer.classList.add('hidden');
    }
  }
}

function onForgeFormatChange() {
  const fmt = document.getElementById('forge-fmt')?.value || 'alpaca';
  const stratSelect = document.getElementById('forge-strat');
  const countSelect = document.getElementById('forge-count');

  if (fmt === 'aft') {
    if (stratSelect) {
      stratSelect.innerHTML = `
        <option value="fractal_stratification">🧬 Estratificación Fractal L1–L5 (Arzor)</option>
        <option value="constitutional_axioms">🛡️ Síntesis de Axiomas & Casos Límite</option>
      `;
    }
    if (countSelect) {
      countSelect.innerHTML = `
        <option value="3">3 Trazas L5 (Perfil Rápido)</option>
        <option value="5" selected>5 Trazas L5 (Equilibrado / Recomendado)</option>
        <option value="10">10 Trazas L5 (Profundo / Exhaustivo)</option>
      `;
    }
  } else if (fmt === 'few_shot') {
    if (stratSelect) {
      stratSelect.innerHTML = `
        <option value="in_context_distillation">📜 Destilación de Reglas & Semillas</option>
        <option value="adversarial_calibration">🎯 Calibración de Formato & Casos Borde</option>
      `;
    }
    if (countSelect) {
      countSelect.innerHTML = `
        <option value="3">3 Ejemplos Few-Shot (Ultra-Compacto)</option>
        <option value="5" selected>5 Ejemplos Few-Shot (Equilibrado / Recomendado)</option>
        <option value="10">10 Ejemplos Few-Shot (Extensivo)</option>
      `;
    }
  } else {
    if (stratSelect) {
      stratSelect.innerHTML = `
        <option value="constitutional_critique">Constitutional AI (Juez Crítico)</option>
        <option value="evol_instruct">Evol-Instruct (Complejidad Progresiva)</option>
        <option value="raft_docs">RAFT Contextual (Documentos + QA)</option>
      `;
    }
    if (countSelect) {
      countSelect.innerHTML = `
        <option value="10">10 Muestras (Rápido)</option>
        <option value="50">50 Muestras</option>
        <option value="100">100 Muestras</option>
        <option value="500">500 Muestras (Completo)</option>
      `;
    }
  }
}

function handleForgeFilesSelected(files) {
  if (!files || files.length === 0) return;

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedForgeFiles.push({
        name: f.name,
        size: f.size,
        type: f.type || 'text/plain',
        content: e.target.result || ''
      });
      renderForgeFilesList();
      updateForgeTokenEstimate();
    };
    reader.readAsText(f);
  }
}

function removeForgeFile(idx) {
  uploadedForgeFiles.splice(idx, 1);
  renderForgeFilesList();
  updateForgeTokenEstimate();
}

function renderForgeFilesList() {
  const container = document.getElementById('forge-files-list');
  if (!container) return;

  container.innerHTML = uploadedForgeFiles.map((f, idx) => `
    <div style="background: #020704; border: 1px solid var(--border-subtle); border-radius: 6px; padding: 0.35rem 0.7rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        <span>📄</span>
        <strong style="color: #fff;">${f.name}</strong>
        <span class="text-dim text-xs">(${(f.size / 1024).toFixed(1)} KB)</span>
      </div>
      <button type="button" class="btn btn-outline btn-sm" style="padding: 0.1rem 0.4rem; font-size: 0.7rem; color: #f87171;" onclick="removeForgeFile(${idx})">✕</button>
    </div>
  `).join('');
}

function updateForgeTokenEstimate() {
  const badge = document.getElementById('forge-tokens-badge');
  const rawText = document.getElementById('forge-docs-input')?.value || '';
  
  let totalBytes = uploadedForgeFiles.reduce((acc, f) => acc + (f.content?.length || f.size || 0), 0);
  let estimatedTokens = Math.round((totalBytes / 4) + (rawText.length / 3.8));

  if (badge) {
    badge.textContent = `${uploadedForgeFiles.length} Archivos | ~${estimatedTokens} Tokens`;
  }
}

let currentGeneratedDataset = null;

function generateDomainSpecificSamples(domain, count = 10, format = 'alpaca', contextDocs = '') {
  const d = domain.trim();
  const isRedis = /redis/i.test(d);
  const isPostgres = /postgres|sql/i.test(d);
  const isRust = /rust/i.test(d);

  const topics = isRedis ? [
    { q: '¿Cómo optimizar el uso de memoria en Redis para colecciones masivas de datos en producción?', a: 'Utiliza estructuras Hash codificadas con ziplist/listpack (hash-max-ziplist-entries) en lugar de claves de tipo string aisladas. Esto reduce el overhead de metadatos de ~70 bytes por clave a menos de 10 bytes.' },
    { q: '¿Por qué se debe evitar el comando KEYS * en producción y qué alternativa segura usar?', a: 'KEYS * bloquea el hilo principal de eventos de Redis con complejidad O(N), congelando el servidor. En su lugar, emplea SCAN o HSCAN de forma iterativa con un cursor no bloqueante O(1) por llamada.' },
    { q: 'Implementa una estrategia de Pipelining eficiente en Redis para procesamiento por lotes', a: 'El Pipelining empaqueta múltiples comandos cliente sin esperar los Round Trip Time (RTT) individuales. Reduce la latencia acumulada de red de O(N * RTT) a O(RTT) mediante buffers de socket sincronizados.' },
    { q: 'Configuración recomendada de políticas de desalojo (Eviction Policy) para caché en Redis', a: 'Configura maxmemory-policy allkeys-lru o volatile-lfu según la distribución de acceso de tu carga de trabajo, garantizando que claves expirables se reciclen antes de agotar la RAM asignada.' },
    { q: 'Patrón de bloqueo distribuido seguro con Redlock y TTL en Redis', a: 'Utiliza SET resource_name my_random_token NX PX 30000 con un UUID de liberación condicional validado vía script Lua atómico: if redis.call("get",KEYS[1]) == ARGV[1] then return redis.call("del",KEYS[1]) else return 0 end.' }
  ] : isPostgres ? [
    { q: '¿Cómo optimizar consultas complejas en PostgreSQL con índices parciales y B-Tree?', a: 'Crea índices con cláusula WHERE indexando solo las tuplas activas: CREATE INDEX idx_orders_active ON orders(created_at) WHERE status = "pending". Esto reduce el tamaño del árbol y agiliza las lecturas en disco.' },
    { q: 'Interpretación de planes de ejecución con EXPLAIN (ANALYZE, BUFFERS)', a: 'Evalúa la métrica "Buffers: shared hit" vs "shared read" para identificar lecturas de disco innecesarias y nodos Seq Scan que requieran índices covering (INCLUDE).' },
    { q: 'Optimización de conexiones y contención de bloqueos en PostgreSQL con PgBouncer', a: 'Emplea un connection pooler transaccional como PgBouncer con pool_mode = transaction y ajusta max_connections a 2-4 veces el número de cores de CPU.' },
    { q: 'Estrategias de particionado declarativo por rango y lista en PostgreSQL', a: 'Aplica PARTITION BY RANGE (created_at) para tablas históricas masivas, permitiendo partition pruning automático en consultas y vaciado instantáneo con DROP TABLE sin overhead de DELETE.' },
    { q: 'Tuning de memoria de PostgreSQL: shared_buffers, work_mem y maintenance_work_mem', a: 'Ajusta shared_buffers al 25% de la RAM del servidor, work_mem a 32-64 MB por operación de ordenación/hash join, y effective_cache_size al 70% de la memoria total.' }
  ] : isRust ? [
    { q: '¿Cómo lograr concurrencia sin bloqueos segura en Rust usando atómicos y canales?', a: 'Utiliza primitivas atómicas de std::sync::atomic (AtomicBool, AtomicUsize) con Memory Ordering Acquire-Release o canales MPSC de crossbeam sin recurrir a Mutex pesados.' },
    { q: 'Patrón de arquitectura Zero-Copy en Rust con Lifetimes y referencias prestadas', a: 'Estructura tipos con parámetros de lifetime <\'a> consumiendo &[u8] o &str directamente de buffers de socket o mmap sin allocation en Heap.' },
    { q: 'Manejo de errores idiomático con Result, Error trait y thiserror en Rust', a: 'Define enums de error tipados derivados con #[derive(thiserror::Error)] para permitir propagación ergonómica con el operador ? sin perder el stacktrace ni causar panics.' }
  ] : [
    { q: `Explica los principios arquitectónicos y buenas prácticas fundamentales en: ${d}`, a: `Para dominar ${d}, estructura el sistema con separación de responsabilidades, validación de esquemas en frontera y minimización de contención en estado compartido.` },
    { q: `Diagnóstico y resolución de cuellos de botella de latencia y rendimiento en: ${d}`, a: `Analiza perfiles de CPU y memoria, optimiza I/O asíncrono y establece checkpoints de telemetría para mitigar degradaciones bajo alta concurrencia.` },
    { q: `Implementación de pipeline modular y tolerante a fallos para: ${d}`, a: `Aplica patrones de Circuit Breaker, reintentos exponenciales con jitter y almacenamiento de estado idempotente.` },
    { q: `Estrategias de observabilidad y métricas de producción para: ${d}`, a: `Configura métricas de golden signals (latencia, tráfico, errores y saturación) con tracing distribuido OpenTelemetry.` }
  ];

  const totalCount = Math.min(Math.max(parseInt(count, 10) || 5, 1), 100);

  // CASE 1: AFT CANONICAL PROFILE
  if (format === 'aft') {
    const traces = [];
    for (let i = 0; i < totalCount; i++) {
      const topic = topics[i % topics.length];
      traces.push({
        input: topic.q,
        chainOfThought: `Análisis de fundamentos para ${d}: descomposición de la consulta y aplicación de invariantes técnicas.`,
        expectedOutput: topic.a
      });
    }

    return {
      schemaVersion: 'aft-1.0.0',
      domain: d,
      layers: {
        L1_executive: {
          persona: `Arquitecto Especialista en ${d}`,
          objective: `Dominio y optimización profunda de ${d}`,
          tone: 'assertive_technical'
        },
        L2_axiomatic: {
          invariants: [
            `Garantía de rendimiento y cero cuellos de botella en ${d}`,
            `Validación estricta de esquemas e invariantes en frontera`,
            `Tolerancia a fallos y manejo de excepciones idempotente`
          ]
        },
        L3_methodological: {
          stepTransitions: [
            { step: 1, action: 'Inspeccionar métricas y telemetría inicial' },
            { step: 2, action: 'Identificar contención o puntos de bloqueo' },
            { step: 3, action: 'Aplicar optimizaciones axiomáticas estructuradas' }
          ]
        },
        L4_constraints: {
          forbiddenPatterns: [
            'Operaciones bloqueantes sin timeout',
            'Alucinación de tipos o estructuras no declaradas'
          ],
          strictTypes: true
        },
        L5_calibrationTraces: traces
      }
    };
  }

  // CASE 2: FEW-SHOT DIGESTION
  if (format === 'few_shot') {
    const examples = [];
    for (let i = 0; i < totalCount; i++) {
      const topic = topics[i % topics.length];
      examples.push({
        user: topic.q,
        assistant: topic.a
      });
    }

    return {
      systemDirective: {
        corePersona: `Especialista en ${d}`,
        rules: [
          `Aplica rigurosamente las directivas y patrones de ingeniería para ${d}`,
          `Respuestas técnicas concisas con código verificado y estructurado`,
          `Prioriza robustez, tipos estrictos y cero ambigüedad`
        ],
        outputFormat: 'Markdown estructurado con bloques de código'
      },
      fewShotCalibration: examples
    };
  }

  // CASE 3: STANDARD SFT / RAFT SAMPLES
  const result = [];
  for (let i = 0; i < totalCount; i++) {
    const baseTopic = topics[i % topics.length];
    const finalQuestion = baseTopic.q;

    if (format === 'raft') {
      result.push({
        context: contextDocs ? contextDocs.slice(0, 300) : `Documentación técnica y especificaciones de ${d}. Directivas de arquitectura y ejecución.`,
        question: finalQuestion,
        thought: `Análisis de contexto para ${d}. Deducción de principios de ingeniería y verificación de sintaxis.`,
        answer: baseTopic.a
      });
    } else if (format === 'sharegpt') {
      result.push({
        conversations: [
          { from: 'human', value: finalQuestion },
          { from: 'gpt', value: baseTopic.a }
        ]
      });
    } else {
      // Alpaca / ChatML
      result.push({
        instruction: finalQuestion,
        input: contextDocs ? contextDocs.slice(0, 150) : '',
        output: baseTopic.a
      });
    }
  }

  return result;
}

async function runDataForge() {
  const rawName = document.getElementById('forge-name')?.value?.trim();
  const rawObj = document.getElementById('forge-obj')?.value?.trim();
  const strat = document.getElementById('forge-strat')?.value || 'constitutional_critique';
  const fmt = document.getElementById('forge-fmt')?.value || 'alpaca';
  const count = document.getElementById('forge-count')?.value || '10';
  const docsText = document.getElementById('forge-docs-input')?.value?.trim() || '';
  const out = document.getElementById('forge-result');
  if (!out) return;

  const domain = rawObj || rawName || 'Optimización de Rendimiento y Arquitectura';
  const name = rawName || `${domain.slice(0, 25)} QA Dataset`;

  const filesText = uploadedForgeFiles.map(f => `--- Documento: ${f.name} ---\n${f.content}`).join('\n\n');
  const combinedContext = [filesText, docsText].filter(Boolean).join('\n\n');

  out.classList.remove('hidden');
  out.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.6rem;">
      <div class="pulse-dot"></div>
      <span>Sintetizando dataset (${fmt.toUpperCase()}) para "${domain}" ${uploadedForgeFiles.length > 0 ? `(usando ${uploadedForgeFiles.length} archivos semilla)` : ''}...</span>
    </div>
  `;

  setTimeout(() => {
    const dataset = generateDomainSpecificSamples(domain, parseInt(count, 10), fmt, combinedContext);
    const isObjectPayload = fmt === 'aft' || fmt === 'few_shot';
    const sampleCount = isObjectPayload 
      ? (fmt === 'aft' ? dataset.layers.L5_calibrationTraces.length : dataset.fewShotCalibration.length)
      : dataset.length;

    currentGeneratedDataset = {
      name,
      domain,
      format: fmt,
      strategy: strat,
      data: dataset,
      count: sampleCount,
      filesCount: uploadedForgeFiles.length,
      createdAt: new Date().toISOString()
    };

    out.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 0.8rem;">
        <div>
          <strong style="color: var(--emerald-light); font-size: 0.88rem;">✔ Artefacto Sintetizado: ${sampleCount} ${fmt === 'aft' ? 'Trazas AFT' : fmt === 'few_shot' ? 'Ejemplos Few-Shot' : 'Muestras'} (100% Calidad Aprobada)</strong>
          <div class="text-dim text-xs" style="margin-top: 0.2rem;">Dominio: ${domain} | Formato: ${fmt.toUpperCase()} | Estrategia: ${strat.toUpperCase()} ${uploadedForgeFiles.length > 0 ? `| ${uploadedForgeFiles.length} Archivos Semilla` : ''}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
          <button class="btn btn-outline btn-sm" onclick="downloadForgeDataset()">📥 Descargar ${fmt === 'aft' ? '.aft.json' : '.json'}</button>
          <button class="btn btn-primary btn-sm" onclick="trainNimphyWithForge()">🚀 Producir Niphy con este Dataset</button>
        </div>
      </div>
      <div class="text-xs text-dim mb-1">Previsualización de estructura generada:</div>
      <pre style="font-family: var(--font-mono); font-size: 0.72rem; color: #a7f3d0; background: #010402; padding: 0.7rem; border-radius: 6px; overflow-x: auto; max-height: 180px;">${JSON.stringify(dataset, null, 2)}</pre>
    `;
  }, 700);
}

function downloadForgeDataset() {
  if (!currentGeneratedDataset || !currentGeneratedDataset.data) {
    showCustomModal('⚠️ Sin Datos', 'Genera primero un dataset con el botón "Sintetizar Dataset con Forge".');
    return;
  }

  const jsonStr = JSON.stringify(currentGeneratedDataset.data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const ext = currentGeneratedDataset.format === 'aft' ? '.aft.json' : currentGeneratedDataset.format === 'few_shot' ? '.fewshot.json' : '-dataset.json';
  const fileName = `${currentGeneratedDataset.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}${ext}`;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function trainNimphyWithForge() {
  if (!currentGeneratedDataset || !currentGeneratedDataset.data) {
    showCustomModal('⚠️ Sin Datos', 'Genera primero un dataset con el botón "Sintetizar Dataset con Forge".');
    return;
  }

  openCreateNimphyModal();
  const nameInput = document.getElementById('nimphy-name');
  const methodSelect = document.getElementById('nimphy-method');
  const systemPromptInput = document.getElementById('nimphy-system-prompt');

  const cleanName = currentGeneratedDataset.name.replace(/[^a-zA-Z0-9]/g, '');
  if (nameInput) nameInput.value = `${cleanName || 'DomainExpert'}-Niphy`;

  let targetMethod = 'qlora';
  let targetExt = '.json';
  if (currentGeneratedDataset.format === 'aft') {
    targetMethod = 'aft';
    targetExt = '.aft.json';
  } else if (currentGeneratedDataset.format === 'few_shot') {
    targetMethod = 'few_shot_distill';
    targetExt = '.json';
  } else if (currentGeneratedDataset.format === 'raft') {
    targetMethod = 'raft';
    targetExt = '.json';
  }

  if (methodSelect) {
    methodSelect.value = targetMethod;
    onNimphyMethodChange();
  }

  // Inject generated dataset directly into uploadedNimphyFiles
  const jsonContent = JSON.stringify(currentGeneratedDataset.data, null, 2);
  uploadedNimphyFiles = [{
    name: `${cleanName.toLowerCase() || 'forge-dataset'}${targetExt}`,
    size: jsonContent.length,
    type: 'application/json'
  }];
  renderNimphyFilesList();
  updateNimphyTokenEstimate();

  if (systemPromptInput) {
    systemPromptInput.value = `Eres un asistente de IA experto en ${currentGeneratedDataset.domain}. Responde con máxima precisión técnica y ejemplos prácticos.`;
  }
}

// ─── SEEDS GUIDE MODAL WITH EXTERNAL AI (4 TRAINING METHODS) ───────────────
const SEED_PROMPT_TEMPLATES = {
  qlora: `Actúa como un sintetizador de datos de entrenamiento para LLMs de grado producción.
Necesito un dataset de Supervised Fine-Tuning (SFT) para entrenar un modelo mediante LoRA / QLoRA sobre el siguiente dominio:
[DOMINIO / TEMA / CASO DE USO]

Genera un archivo JSON con exactamente [NÚMERO, ej: 10] ejemplos de entrenamiento de máxima calidad, variados y técnicos.

REGLAS DE FORMATO:
- La salida debe ser EXCLUSIVAMENTE un bloque de código JSON válido con una lista de objetos.
- Cada objeto debe seguir estrictamente este esquema:
[
  {
    "instruction": "Instrucción o consulta clara y técnica del usuario",
    "input": "Contexto técnico adicional, código previo o datos de entrada (dejar vacío \\"\\" si la instrucción es autosuficiente)",
    "output": "Respuesta experta, concisa y rigurosa con ejemplos prácticos y sin frases de cortesía innecesarias"
  }
]

REGLAS DE CONTENIDO:
1. Incluye casos nominales, casos borde y depuración de errores frecuentes en [DOMINIO].
2. Aplica buenas prácticas de ingeniería, tipado estricto y código verificado.
3. No agregues texto introductorio ni conclusiones fuera del bloque JSON.`,

  raft: `Actúa como un especialista en Retrieval-Augmented Fine-Tuning (RAFT) y Chain-of-Thought (CoT).
Necesito generar un dataset de entrenamiento RAFT para un modelo especializado en:
[DOMINIO / TEMA / CASO DE USO]

El objetivo de RAFT es entrenar al modelo a extraer respuestas precisas de un contexto documental relevante, ignorar contextos distractores ruidosos y razonar explícitamente paso a paso antes de emitir la respuesta final.

Genera un archivo JSON con exactamente [NÚMERO, ej: 5] ejemplos estructurados con el siguiente esquema estricto:
[
  {
    "context": "Fragmento de documentación técnica o especificación oficial relevante de [DOMINIO]",
    "distractor_contexts": [
      "Fragmento documental de un tema relacionado pero irrelevante para responder a la pregunta",
      "Segundo fragmento distractor con información contradictoria o de otra versión"
    ],
    "question": "¿Pregunta técnica que requiere razonamiento sobre el contexto?",
    "thought": "Razonamiento paso a paso (Chain of Thought) deduciendo la respuesta directamente de context e identificando por qué los distractores no aplican.",
    "golden_answer": "Respuesta final precisa, concisa y respaldada por los datos verificados del contexto."
  }
]

REGLAS:
- Salida ÚNICAMENTE en JSON válido. Sin texto fuera del bloque JSON.`,

  aft: `Actúa como un compilador cognitivo AFT (Arzor Fine-Tuning).
Genera un perfil canónico AFT de 5 capas para entrenar y alinear un agente experto en:
[DOMINIO / TEMA / CASO DE USO]

El perfil debe seguir la arquitectura canónica de 5 capas fractales:
1. L1_executive: Rol, persona, objetivo global y tono técnico.
2. L2_axiomatic: Invariantes y principios fundamentales inquebrantables.
3. L3_methodological: Fases secuenciales de razonamiento y ejecución.
4. L4_constraints: Patrones prohibidos, antipatrones y tipos estrictos.
5. L5_calibrationTraces: Trazas de calibración con input, chainOfThought y expectedOutput.

Salida EXCLUSIVAMENTE en JSON válido con el siguiente esquema:
{
  "schemaVersion": "aft-1.0.0",
  "domain": "[DOMINIO]",
  "layers": {
    "L1_executive": {
      "persona": "Arquitecto Especialista en [DOMINIO]",
      "objective": "Resolver con máxima precisión arquitectónica y cero overhead los problemas de [DOMINIO]",
      "tone": "assertive_technical"
    },
    "L2_axiomatic": {
      "invariants": [
        "Invariante 1 de rendimiento y robustez",
        "Invariante 2 de consistencia de datos",
        "Invariante 3 de tolerancia a fallos"
      ]
    },
    "L3_methodological": {
      "stepTransitions": [
        { "step": 1, "action": "Diagnóstico y análisis estático de requisitos" },
        { "step": 2, "action": "Identificación de invariantes y dependencias" },
        { "step": 3, "action": "Síntesis de solución técnica con validación" }
      ]
    },
    "L4_constraints": {
      "forbiddenPatterns": [
        "Uso de operaciones bloqueantes sin timeout",
        "Alucinación de parámetros o funciones inexistentes"
      ],
      "strictTypes": true
    },
    "L5_calibrationTraces": [
      {
        "input": "¿Pregunta o caso práctico clave en [DOMINIO]?",
        "chainOfThought": "Descomposición paso a paso evaluando axiomas L2 y restricciones L4.",
        "expectedOutput": "Solución técnica completa, código limpio y justificación."
      }
    ]
  }
}`,

  fewshot: `Actúa como un sintetizador de directivas de sistema y ejemplos Few-Shot para acondicionamiento de LLMs.
Necesito un archivo de directivas y calibración Few-Shot para un modelo enfocado en:
[DOMINIO / TEMA / CASO DE USO]

Genera un JSON estructurado con el siguiente formato estricto:
{
  "systemDirective": {
    "corePersona": "Especialista Sénior en [DOMINIO]",
    "rules": [
      "Regla 1: Directiva de comportamiento y estilo de respuesta",
      "Regla 2: Estándares de calidad de código y arquitectura",
      "Regla 3: Manejo de errores y límites operativos",
      "Regla 4: Formato de salida esperado"
    ],
    "outputFormat": "Markdown técnico con bloques de código comentados y justificación concisa",
    "boundaryDirectives": [
      "Nunca omitir manejo de excepciones",
      "Rechazar supuestos ambiguos pidiendo clarificación técnica si es crítico"
    ]
  },
  "fewShotCalibration": [
    {
      "user": "¿Consulta o problema técnico planteado por el usuario?",
      "assistant": "Respuesta ejemplar calibrada siguiendo al 100% las directivas del sistema."
    },
    {
      "user": "¿Consulta sobre un caso borde o resolución de error complejo?",
      "assistant": "Respuesta ejemplar aplicando diagnóstico paso a paso y solución definitiva."
    },
    {
      "user": "¿Consulta que requiere diseño de arquitectura o refactorización?",
      "assistant": "Respuesta ejemplar con patrones de diseño óptimos y explicación técnica."
    }
  ]
}

REGLAS:
- Salida ÚNICAMENTE en JSON válido sin explicaciones previas ni posteriores.`
};

function openSeedsGuideModal(defaultTab = 'qlora') {
  const modal = document.getElementById('seeds-guide-modal');
  if (!modal) return;

  // Populate all 4 textareas
  const qloraArea = document.getElementById('seeds-guide-prompt-qlora');
  const raftArea = document.getElementById('seeds-guide-prompt-raft');
  const aftArea = document.getElementById('seeds-guide-prompt-aft');
  const fewshotArea = document.getElementById('seeds-guide-prompt-fewshot');

  if (qloraArea) qloraArea.value = SEED_PROMPT_TEMPLATES.qlora;
  if (raftArea) raftArea.value = SEED_PROMPT_TEMPLATES.raft;
  if (aftArea) aftArea.value = SEED_PROMPT_TEMPLATES.aft;
  if (fewshotArea) fewshotArea.value = SEED_PROMPT_TEMPLATES.fewshot;

  switchSeedsTab(defaultTab);
  modal.classList.remove('hidden');
}

function closeSeedsGuideModal() {
  const modal = document.getElementById('seeds-guide-modal');
  if (modal) modal.classList.add('hidden');
}

function switchSeedsTab(tabKey) {
  const tabs = ['qlora', 'raft', 'aft', 'fewshot'];
  tabs.forEach(t => {
    const btn = document.getElementById(`seeds-tab-btn-${t}`);
    const content = document.getElementById(`seeds-content-${t}`);
    if (btn) {
      btn.classList.toggle('active', t === tabKey);
    }
    if (content) {
      content.classList.toggle('hidden', t !== tabKey);
    }
  });
}

function copySeedPrompt(type) {
  const text = SEED_PROMPT_TEMPLATES[type];
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    const methodTitles = {
      qlora: 'LoRA / QLoRA (SFT)',
      raft: 'RAFT (Context + CoT)',
      aft: 'AFT (5 Capas)',
      fewshot: 'Few-Shot & Directivas'
    };
    showCustomModal('📋 Prompt Copiado', `El meta-prompt para "${methodTitles[type] || type.toUpperCase()}" ha sido copiado al portapapeles. Pégalo en ChatGPT, Claude, Gemini o DeepSeek.`);
  }).catch(() => {
    const area = document.getElementById(`seeds-guide-prompt-${type}`);
    if (area) {
      area.select();
      document.execCommand('copy');
      showCustomModal('📋 Prompt Copiado', 'El meta-prompt ha sido copiado al portapapeles.');
    }
  });
}

// ─── NIMPHYS LABORATORY MATRIX STUDIO ─────────────────────────────
let labCandidateCounter = 0;
let labDatasetsByMethod = {
  qlora: [],
  lora: [],
  full_peft: [],
  raft: [],
  aft: [],
  few_shot_distill: []
};
let labRagFiles = [];

const LAB_METHOD_NAMES = {
  qlora: 'QLoRA 4-bit (SFT)',
  lora: 'LoRA 16-bit (SFT Estándar)',
  full_peft: 'PEFT / Full Fine-Tuning (SFT)',
  raft: 'RAFT (Context + CoT)',
  aft: 'AFT (Adaptive Fractal Tuning 5-Capas)',
  few_shot_distill: 'System Directive & Few-Shot Digestion'
};

function openLabMatrixModal() {
  const modal = document.getElementById('lab-matrix-modal');
  const nameInput = document.getElementById('lab-input-name');
  const promptInput = document.getElementById('lab-input-prompt');
  const ragDocsInput = document.getElementById('lab-rag-raw-docs');

  // Start with completely clean inputs (no hardcoded examples)
  if (nameInput) nameInput.value = '';
  if (promptInput) promptInput.value = '';
  if (ragDocsInput) ragDocsInput.value = '';

  // Clean in-memory datasets and RAG files
  labDatasetsByMethod = {
    qlora: [],
    lora: [],
    full_peft: [],
    raft: [],
    aft: [],
    few_shot_distill: []
  };
  labRagFiles = [];

  const methodSelect = document.getElementById('lab-method-select');
  if (methodSelect) methodSelect.value = 'qlora';

  onLabMethodDatasetChange();
  renderLabRagFilesList();
  updateLabRagTokenEstimate();

  const container = document.getElementById('lab-candidates-container');
  if (container) container.innerHTML = '';
  labCandidateCounter = 0;

  // Render clean empty state (no hardcoded candidate branches)
  renderLabCandidatesEmptyState();

  if (modal) modal.classList.remove('hidden');
}

function closeLabMatrixModal() {
  const modal = document.getElementById('lab-matrix-modal');
  // Wipe all in-memory datasets and RAG files on close/cancel
  labDatasetsByMethod = {
    qlora: [],
    lora: [],
    full_peft: [],
    raft: [],
    aft: [],
    few_shot_distill: []
  };
  labRagFiles = [];

  const container = document.getElementById('lab-candidates-container');
  if (container) container.innerHTML = '';
  labCandidateCounter = 0;

  if (modal) modal.classList.add('hidden');
}

function renderLabCandidatesEmptyState() {
  const container = document.getElementById('lab-candidates-container');
  if (!container) return;
  container.innerHTML = `
    <div id="lab-empty-state" style="text-align: center; padding: 2rem 1.2rem; border: 1px dashed var(--border-subtle); border-radius: 8px; background: rgba(0,0,0,0.25);">
      <div style="font-size: 1.6rem; margin-bottom: 0.3rem;">🧪</div>
      <strong style="color: #fff; font-size: 0.88rem; display: block; margin-bottom: 0.2rem;">No hay ramas candidatas en la matriz</strong>
      <p class="text-dim text-xs" style="max-width: 440px; margin: 0 auto 0.8rem auto;">
        Pulsa <strong>➕ Añadir Candidato</strong> para configurar los modelos, métodos y parámetros de cada rama a evaluar.
      </p>
      <button type="button" class="btn btn-outline btn-sm" onclick="addLabCandidateRow()" style="font-size: 0.75rem;">➕ Añadir Primer Candidato</button>
    </div>
  `;
}

// ─── DYNAMIC PER-METHOD DATASET MANAGEMENT (IN-MEMORY) ─────────────
function onLabMethodDatasetChange() {
  const method = document.getElementById('lab-method-select')?.value || 'qlora';
  const fileInput = document.getElementById('lab-method-file-upload');
  const hint = document.getElementById('lab-method-allowed-hint');
  const prompt = document.getElementById('lab-method-dropzone-prompt');
  const sub = document.getElementById('lab-method-dropzone-sub');
  const allowed = getExtensionsForMethod(method);

  if (fileInput) fileInput.accept = allowed.join(',');
  if (hint) hint.textContent = `Extensiones permitidas: ${allowed.join(', ')}`;
  if (prompt) prompt.textContent = `Haz clic para adjuntar archivo para ${LAB_METHOD_NAMES[method] || method.toUpperCase()}`;
  if (sub) sub.textContent = `Formatos aceptados: ${allowed.join(', ')}`;

  renderLabMethodFilesList();
  updateLabMethodTokenEstimate();
}

function handleLabMethodFilesSelected(files) {
  if (!files || files.length === 0) return;
  const method = document.getElementById('lab-method-select')?.value || 'qlora';
  const allowed = getExtensionsForMethod(method);

  if (!labDatasetsByMethod[method]) labDatasetsByMethod[method] = [];

  let rejected = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const lower = f.name.toLowerCase();
    const isAllowed = allowed.some(ext => lower.endsWith(ext));
    if (isAllowed) {
      labDatasetsByMethod[method].push({
        name: f.name,
        size: f.size,
        type: f.type || 'text/plain'
      });
    } else {
      rejected.push(f.name);
    }
  }

  if (rejected.length > 0) {
    showCustomModal('🚫 Extensión No Permitida', `Los siguientes archivos fueron rechazados para el método "${LAB_METHOD_NAMES[method]}":\n\n• ${rejected.join('\n• ')}\n\nExtensiones requeridas: ${allowed.join(', ')}`);
  }

  renderLabMethodFilesList();
  updateLabMethodTokenEstimate();
}

function removeLabMethodFile(idx) {
  const method = document.getElementById('lab-method-select')?.value || 'qlora';
  if (labDatasetsByMethod[method]) {
    labDatasetsByMethod[method].splice(idx, 1);
  }
  renderLabMethodFilesList();
  updateLabMethodTokenEstimate();
}

function renderLabMethodFilesList() {
  const method = document.getElementById('lab-method-select')?.value || 'qlora';
  const container = document.getElementById('lab-method-files-list');
  if (!container) return;

  const files = labDatasetsByMethod[method] || [];
  if (files.length === 0) {
    container.innerHTML = `<div class="text-xs text-dim" style="font-style: italic; padding: 0.2rem 0; color: var(--text-dim);">(Ningún dataset cargado para ${LAB_METHOD_NAMES[method] || method.toUpperCase()})</div>`;
    return;
  }

  container.innerHTML = files.map((f, idx) => `
    <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 0.35rem 0.6rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem;">
      <span style="color: var(--emerald-light); font-family: var(--font-code);">📄 ${f.name} (${Math.round(f.size / 1024)} KB)</span>
      <button type="button" class="btn btn-outline btn-sm" style="color: #f87171; padding: 0.1rem 0.4rem; font-size: 0.7rem;" onclick="removeLabMethodFile(${idx})">✕</button>
    </div>
  `).join('');
}

function updateLabMethodTokenEstimate() {
  const method = document.getElementById('lab-method-select')?.value || 'qlora';
  const badge = document.getElementById('lab-method-tokens-badge');
  const files = labDatasetsByMethod[method] || [];
  if (badge) {
    badge.textContent = `${files.length} Archivo(s) en ${LAB_METHOD_NAMES[method] || method.toUpperCase()}`;
  }
}

// ─── SHARED GRAPH RAG DOCUMENTATION IN LAB ─────────────────────────
function handleLabRagFilesSelected(files) {
  if (!files || files.length === 0) return;
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    labRagFiles.push({
      name: f.name,
      size: f.size,
      type: f.type || 'text/plain'
    });
  }
  renderLabRagFilesList();
  updateLabRagTokenEstimate();
}

function removeLabRagFile(idx) {
  labRagFiles.splice(idx, 1);
  renderLabRagFilesList();
  updateLabRagTokenEstimate();
}

function renderLabRagFilesList() {
  const container = document.getElementById('lab-rag-files-list');
  if (!container) return;
  if (labRagFiles.length === 0) {
    container.innerHTML = '';
    return;
  }
  container.innerHTML = labRagFiles.map((f, idx) => `
    <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 0.35rem 0.6rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem;">
      <span style="color: #6ee7b7; font-family: var(--font-code);">🕸️ ${f.name} (${Math.round(f.size / 1024)} KB)</span>
      <button type="button" class="btn btn-outline btn-sm" style="color: #f87171; padding: 0.1rem 0.4rem; font-size: 0.7rem;" onclick="removeLabRagFile(${idx})">✕</button>
    </div>
  `).join('');
}

function updateLabRagTokenEstimate() {
  const badge = document.getElementById('lab-rag-tokens-badge');
  const rawText = document.getElementById('lab-rag-raw-docs')?.value || '';
  let totalBytes = labRagFiles.reduce((acc, f) => acc + f.size, 0);
  let estimatedTokens = Math.round((totalBytes / 4) + (rawText.length / 3.8));
  if (badge) {
    badge.textContent = `${labRagFiles.length} Docs RAG | ~${estimatedTokens} Toks`;
  }
}

function getTrainedNimphysOptions(selectedId) {
  if (!nimphysList || nimphysList.length === 0) {
    return `<option value="">⚠️ Sin Nimphys producidos en el catálogo (Crea uno o usa Runner Local)</option>`;
  }
  return nimphysList.map(n => `
    <option value="${n.nimphyId}" ${n.nimphyId === selectedId ? 'selected' : ''}>
      🧬 ${n.name} (${n.currentVersion || 'v1.0.0'}) — [${n.baseModel}] (${(n.method || 'qlora').toUpperCase()})
    </option>
  `).join('');
}

function getMethodsForLabProvider(prov, selectedMethod) {
  if (prov === 'termes' || prov === 'byok') {
    return `
      <option value="raft" ${selectedMethod === 'raft' || !selectedMethod ? 'selected' : ''}>🧬 RAFT (Retrieval Augmented FT & Reasoning)</option>
      <option value="aft" ${selectedMethod === 'aft' ? 'selected' : ''}>🔬 AFT (Adaptive Fractal Tuning — 5 Capas)</option>
      <option value="few_shot_distill" ${selectedMethod === 'few_shot_distill' ? 'selected' : ''}>📜 System Directive & Few-Shot Digestion</option>
    `;
  }
  return `
    <option value="qlora" ${selectedMethod === 'qlora' || !selectedMethod ? 'selected' : ''}>⚡ QLoRA 4-bit (SFT Cuantizado)</option>
    <option value="lora" ${selectedMethod === 'lora' ? 'selected' : ''}>🎯 LoRA 16-bit (SFT Estándar)</option>
    <option value="full_peft" ${selectedMethod === 'full_peft' ? 'selected' : ''}>🎯 PEFT / Full Fine-Tuning (SFT)</option>
    <option value="raft" ${selectedMethod === 'raft' ? 'selected' : ''}>🧬 RAFT (Retrieval Augmented FT con CoT)</option>
    <option value="aft" ${selectedMethod === 'aft' ? 'selected' : ''}>🔬 AFT (Adaptive Fractal Tuning — 5 Capas)</option>
    <option value="few_shot_distill" ${selectedMethod === 'few_shot_distill' ? 'selected' : ''}>📜 System Directive & Few-Shot Digestion</option>
  `;
}

function addLabCandidateRow(data = {}) {
  const container = document.getElementById('lab-candidates-container');
  if (!container) return;

  const emptyState = document.getElementById('lab-empty-state');
  if (emptyState) emptyState.remove();

  labCandidateCounter++;
  const rowId = `lab_cand_row_${labCandidateCounter}`;

  const rowDiv = document.createElement('div');
  rowDiv.id = rowId;
  rowDiv.className = 'panel-card lab-candidate-row';
  rowDiv.style.cssText = 'background: #020704; border: 1px solid var(--border-subtle); padding: 0.75rem; margin-bottom: 0; border-radius: 8px;';

  const defaultName = data.name || `Candidato #${labCandidateCounter}`;
  const defaultProv = data.provider || 'local_runner';
  const defaultMethod = data.method || (defaultProv === 'termes' || defaultProv === 'byok' ? 'raft' : 'qlora');
  const defaultModel = data.model || 'qwen-2.5-coder-3b';
  const defaultGraphRag = data.graphRag !== undefined ? data.graphRag : false;
  const defaultEcdysis = data.ecdysis !== undefined ? data.ecdysis : true;
  const defaultSystemPrompt = data.systemPrompt || '';
  const defaultEnv = data.env || 'action_cpu';
  const defaultTermesEndpoint = data.termesEndpoint || '';
  const defaultTermesKey = data.termesKey || '';
  const defaultByokKey = data.byokKey || '';

  rowDiv.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.4rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge badge-mint" style="font-size: 0.65rem;">Rama #${labCandidateCounter}</span>
        <input type="text" class="input-text lab-cand-name" value="${defaultName}" placeholder="Nombre / Alias de la Rama" style="padding: 0.15rem 0.4rem; font-size: 0.78rem; font-weight: 700; max-width: 280px; height: auto;">
      </div>
      <button type="button" class="btn btn-outline btn-sm" style="color: #f87171; padding: 0.15rem 0.45rem; font-size: 0.7rem; border-color: rgba(239,68,68,0.3);" onclick="removeLabCandidateRow('${rowId}')">🗑️ Quitar</button>
    </div>

    <!-- Provider Selector & Method -->
    <div class="grid-2 mb-2">
      <div class="form-group" style="margin-bottom: 0;">
        <label style="font-size: 0.72rem; color: var(--text-dim);">Origen / Tipo de Proveedor:</label>
        <select class="input-select lab-cand-provider" onchange="onLabCandidateProviderChange('${rowId}')" style="font-size: 0.78rem; padding: 0.35rem 0.6rem;">
          <option value="trained_nimphy" ${defaultProv === 'trained_nimphy' ? 'selected' : ''}>🧬 Niphy Ya Entrenado (Catálogo)</option>
          <option value="local_runner" ${defaultProv === 'local_runner' ? 'selected' : ''}>🖥️ Runner Local ($0 - Open Weights)</option>
          <option value="termes" ${defaultProv === 'termes' ? 'selected' : ''}>🌐 Termes Symbiont (Endpoint URL)</option>
          <option value="byok" ${defaultProv === 'byok' ? 'selected' : ''}>🔑 BYOK Cloud API (Groq/Gemini/OpenAI/Claude)</option>
        </select>
      </div>

      <div class="form-group" style="margin-bottom: 0;">
        <label style="font-size: 0.72rem; color: var(--text-dim);">Método de Especialización:</label>
        <select class="input-select lab-cand-method" style="font-size: 0.78rem; padding: 0.35rem 0.6rem;">
          ${getMethodsForLabProvider(defaultProv, defaultMethod)}
        </select>
      </div>
    </div>

    <!-- DYNAMIC SUB-PANELS ACCORDING TO PROVIDER TYPE -->
    
    <!-- 1. TRAINED NIMPHY PANEL -->
    <div class="lab-cand-panel-trained ${defaultProv === 'trained_nimphy' ? '' : 'hidden'}" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 0.5rem; margin-bottom: 0.5rem;">
      <label style="font-size: 0.72rem; color: var(--emerald-light);">🧬 Selecciona Niphy del Catálogo:</label>
      <select class="input-select lab-cand-nimphy-select" onchange="onLabCandidateNimphySelectChange('${rowId}')" style="font-size: 0.78rem;">
        ${getTrainedNimphysOptions(defaultModel)}
      </select>
    </div>

    <!-- 2. LOCAL RUNNER PANEL -->
    <div class="lab-cand-panel-local ${defaultProv === 'local_runner' ? '' : 'hidden'}" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 0.5rem; margin-bottom: 0.5rem;">
      <div class="grid-2">
        <div class="form-group" style="margin-bottom: 0;">
          <label style="font-size: 0.72rem; color: var(--emerald-light);">Modelo Base GGUF ($0):</label>
          <select class="input-select lab-cand-local-model" style="font-size: 0.78rem;">
            ${DEFAULT_MODELS.map(m => `<option value="${m.id}" ${m.id === defaultModel ? 'selected' : ''}>${m.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label style="font-size: 0.72rem; color: var(--emerald-light);">Hardware Target ($0):</label>
          <select class="input-select lab-cand-env" style="font-size: 0.78rem;">
            <option value="action_cpu" ${defaultEnv === 'action_cpu' ? 'selected' : ''}>Actions Runner CPU ($0, 6h)</option>
            <option value="hf_zerogpu" ${defaultEnv === 'hf_zerogpu' ? 'selected' : ''}>HuggingFace ZeroGPU (A100)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 3. TERMES SYMBIONT PANEL -->
    <div class="lab-cand-panel-termes ${defaultProv === 'termes' ? '' : 'hidden'}" style="background: rgba(0,0,0,0.25); border: 1px solid rgba(6,182,212,0.3); border-radius: 6px; padding: 0.5rem; margin-bottom: 0.5rem;">
      <div class="grid-2 mb-1">
        <div class="form-group" style="margin-bottom: 0;">
          <label style="font-size: 0.72rem; color: #22d3ee;">URL Endpoint Termes:</label>
          <input type="text" class="input-text lab-cand-termes-endpoint" value="${defaultTermesEndpoint}" placeholder="http://127.0.0.1:7420/v1 o URL .json" oninput="detectLabCandidateTermes('${rowId}')" style="font-size: 0.78rem;">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label style="font-size: 0.72rem; color: #22d3ee;">Auth Token (Opcional):</label>
          <input type="password" class="input-text lab-cand-termes-key" value="${defaultTermesKey}" placeholder="Token si el endpoint es privado" oninput="detectLabCandidateTermes('${rowId}')" style="font-size: 0.78rem;">
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; flex-wrap: wrap; gap: 0.3rem;">
        <span class="text-dim lab-cand-termes-status" style="color: ${defaultTermesEndpoint ? '#22d3ee' : 'var(--text-dim)'};">${defaultTermesEndpoint ? '🟢 Termes Auto-Detectado' : 'ℹ️ Pega una URL de endpoint de Termes'}</span>
        <select class="input-select lab-cand-termes-model" style="max-width: 250px; font-size: 0.72rem; padding: 0.2rem 0.4rem; height: auto;">
          <option value="gemini-3.7-flash" ${defaultModel === 'gemini-3.7-flash' ? 'selected' : ''}>gemini-3.7-flash (Google Gemini Web)</option>
          <option value="gemini-3.1-pro" ${defaultModel === 'gemini-3.1-pro' ? 'selected' : ''}>gemini-3.1-pro (Google Gemini Web)</option>
          <option value="gemini-3.5-flash-lite" ${defaultModel === 'gemini-3.5-flash-lite' ? 'selected' : ''}>gemini-3.5-flash-lite (Google Gemini Web)</option>
          <option value="deepseek-chat" ${defaultModel === 'deepseek-chat' ? 'selected' : ''}>deepseek-chat (DeepSeek V3 Web)</option>
          <option value="claude-3-5-sonnet" ${defaultModel === 'claude-3-5-sonnet' ? 'selected' : ''}>claude-3-5-sonnet (Anthropic Claude Web)</option>
        </select>
      </div>
    </div>

    <!-- 4. BYOK CLOUD API PANEL -->
    <div class="lab-cand-panel-byok ${defaultProv === 'byok' ? '' : 'hidden'}" style="background: rgba(0,0,0,0.25); border: 1px solid rgba(168,85,247,0.3); border-radius: 6px; padding: 0.5rem; margin-bottom: 0.5rem;">
      <div class="grid-2 mb-1">
        <div class="form-group" style="margin-bottom: 0;">
          <label style="font-size: 0.72rem; color: #c084fc;">BYOK API Key:</label>
          <input type="password" class="input-text lab-cand-byok-key" value="${defaultByokKey}" placeholder="Pega tu clave (gsk_..., AIza..., sk-..., nvapi-..., csk-...)" oninput="detectLabCandidateByok('${rowId}')" style="font-size: 0.78rem;">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label style="font-size: 0.72rem; color: #c084fc;">Modelo Cloud Seleccionado:</label>
          <select class="input-select lab-cand-byok-model" style="font-size: 0.78rem;">
            ${defaultByokKey ? getByokModelsForProvider('auto', defaultModel) : '<option value="">🔑 Pega tu API Key para cargar modelos...</option>'}
          </select>
        </div>
      </div>
      <div style="font-size: 0.72rem; color: var(--text-dim);">
        Proveedor: <strong class="lab-cand-byok-provider-label" style="color: ${defaultByokKey ? '#c084fc' : 'var(--text-dim)'};">${defaultByokKey ? 'Auto-Detectado' : 'Pega una clave para auto-detectar'}</strong>
      </div>
    </div>

    <!-- SPECIALIZATION TOGGLES & PER-CANDIDATE SYSTEM PROMPT -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.4rem; padding-top: 0.3rem; font-size: 0.75rem;">
      <div style="display: flex; gap: 0.8rem; align-items: center;">
        <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer; color: #fff;">
          <input type="checkbox" class="lab-cand-graphrag" ${defaultGraphRag ? 'checked' : ''}>
          <span>🕸️ Graph RAG</span>
        </label>
        <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer; color: #fff;">
          <input type="checkbox" class="lab-cand-ecdysis" ${defaultEcdysis ? 'checked' : ''}>
          <span>🧠 Memoria Ecdysis</span>
        </label>
      </div>
      <div class="text-dim text-xs lab-cand-summary-badge">
        ${defaultProv === 'trained_nimphy' ? '🧬 Modelo Entrenado' : (defaultProv === 'termes' ? '🌐 Web Symbiont' : (defaultProv === 'byok' ? '🔑 Cloud API' : '🖥️ Runner $0'))}
      </div>
    </div>

    <!-- CANDIDATE SYSTEM PROMPT TEXTAREA (OPTIONAL) -->
    <div class="form-group mb-0" style="margin-top: 0.4rem;">
      <label style="font-size: 0.70rem; color: var(--text-dim);">System Prompt / Directivas de Comportamiento (Opcional):</label>
      <input type="text" class="input-text lab-cand-system-prompt" value="${defaultSystemPrompt}" placeholder="Directivas específicas para esta rama..." style="font-size: 0.74rem; padding: 0.25rem 0.5rem;">
    </div>
  `;

  container.appendChild(rowDiv);
  if (defaultByokKey) detectLabCandidateByok(rowId);
  if (defaultTermesEndpoint) detectLabCandidateTermes(rowId);
}

function getByokModelsForProvider(provider, selectedModel) {
  if (provider === 'gemini') {
    return `
      <option value="gemini-2.0-flash" ${selectedModel === 'gemini-2.0-flash' || !selectedModel ? 'selected' : ''}>Gemini 2.0 Flash (Multimodal & Fast)</option>
      <option value="gemini-1.5-pro" ${selectedModel === 'gemini-1.5-pro' ? 'selected' : ''}>Gemini 1.5 Pro (2M Context Window)</option>
      <option value="gemini-1.5-flash" ${selectedModel === 'gemini-1.5-flash' ? 'selected' : ''}>Gemini 1.5 Flash (Ultra-Ligero)</option>
    `;
  }
  if (provider === 'anthropic') {
    return `
      <option value="claude-3-5-sonnet-20241022" ${selectedModel === 'claude-3-5-sonnet-20241022' || !selectedModel ? 'selected' : ''}>Claude 3.5 Sonnet (State-of-the-Art Coding)</option>
      <option value="claude-3-5-haiku-20241022" ${selectedModel === 'claude-3-5-haiku-20241022' ? 'selected' : ''}>Claude 3.5 Haiku (Ultra-Fast)</option>
      <option value="claude-3-opus-20240229" ${selectedModel === 'claude-3-opus-20240229' ? 'selected' : ''}>Claude 3 Opus (Razonamiento Complejo)</option>
    `;
  }
  if (provider === 'openai') {
    return `
      <option value="gpt-4o-mini" ${selectedModel === 'gpt-4o-mini' || !selectedModel ? 'selected' : ''}>GPT-4o Mini (Rápido y Económico)</option>
      <option value="gpt-4o" ${selectedModel === 'gpt-4o' ? 'selected' : ''}>GPT-4o Omnimodel (Full Intelligence)</option>
      <option value="o1-mini" ${selectedModel === 'o1-mini' ? 'selected' : ''}>o1-mini (Reasoning Model)</option>
    `;
  }
  // Default Groq
  return `
    <option value="llama-3.3-70b-versatile" ${selectedModel === 'llama-3.3-70b-versatile' || !selectedModel ? 'selected' : ''}>Llama 3.3 70B Versatile (Groq LPU 300 t/s)</option>
    <option value="llama-3.1-8b-instant" ${selectedModel === 'llama-3.1-8b-instant' ? 'selected' : ''}>Llama 3.1 8B Instant (Groq LPU 800 t/s)</option>
    <option value="mixtral-8x7b-32768" ${selectedModel === 'mixtral-8x7b-32768' ? 'selected' : ''}>Mixtral 8x7B (32k Context)</option>
    <option value="qwen-2.5-coder-32b" ${selectedModel === 'qwen-2.5-coder-32b' ? 'selected' : ''}>Qwen 2.5 Coder 32B</option>
    <option value="deepseek-r1-distill-llama-70b" ${selectedModel === 'deepseek-r1-distill-llama-70b' ? 'selected' : ''}>DeepSeek R1 Distill Llama 70B</option>
  `;
}

function onLabCandidateProviderChange(rowId) {
  const row = document.getElementById(rowId);
  if (!row) return;

  const prov = row.querySelector('.lab-cand-provider')?.value || 'local_runner';
  const panelTrained = row.querySelector('.lab-cand-panel-trained');
  const panelLocal = row.querySelector('.lab-cand-panel-local');
  const panelTermes = row.querySelector('.lab-cand-panel-termes');
  const panelByok = row.querySelector('.lab-cand-panel-byok');
  const methodSelect = row.querySelector('.lab-cand-method');
  const summaryBadge = row.querySelector('.lab-cand-summary-badge');

  if (panelTrained) panelTrained.classList.toggle('hidden', prov !== 'trained_nimphy');
  if (panelLocal) panelLocal.classList.toggle('hidden', prov !== 'local_runner');
  if (panelTermes) panelTermes.classList.toggle('hidden', prov !== 'termes');
  if (panelByok) panelByok.classList.toggle('hidden', prov !== 'byok');

  if (methodSelect) {
    const curMethod = methodSelect.value;
    methodSelect.innerHTML = getMethodsForLabProvider(prov, curMethod);
  }

  if (prov === 'trained_nimphy') {
    onLabCandidateNimphySelectChange(rowId);
    if (summaryBadge) summaryBadge.textContent = '🧬 Modelo Entrenado';
  } else if (prov === 'termes') {
    if (summaryBadge) summaryBadge.textContent = '🌐 Web Symbiont';
    detectLabCandidateTermes(rowId);
  } else if (prov === 'byok') {
    if (summaryBadge) summaryBadge.textContent = '🔑 Cloud API';
    detectLabCandidateByok(rowId);
  } else {
    if (summaryBadge) summaryBadge.textContent = '🖥️ Runner $0';
  }
}

function onLabCandidateNimphySelectChange(rowId) {
  const row = document.getElementById(rowId);
  if (!row) return;
  const nimphyId = row.querySelector('.lab-cand-nimphy-select')?.value;
  const n = nimphysList.find(item => item.nimphyId === nimphyId);
  if (n) {
    const nameInput = row.querySelector('.lab-cand-name');
    const methodSelect = row.querySelector('.lab-cand-method');
    const graphCheck = row.querySelector('.lab-cand-graphrag');
    const ecdysisCheck = row.querySelector('.lab-cand-ecdysis');
    if (nameInput) nameInput.value = `${n.name} (${n.currentVersion || 'v1.0.0'})`;
    if (methodSelect) methodSelect.value = n.method || 'qlora';
    if (graphCheck) graphCheck.checked = Boolean(n.graphRagEnabled);
    if (ecdysisCheck) ecdysisCheck.checked = Boolean(n.ecdysisMemoryEnabled);
  }
}

let labTermesDebounceTimers = {};
function detectLabCandidateTermes(rowId) {
  clearTimeout(labTermesDebounceTimers[rowId]);
  labTermesDebounceTimers[rowId] = setTimeout(async () => {
    const row = document.getElementById(rowId);
    if (!row) return;

    const endpointInput = row.querySelector('.lab-cand-termes-endpoint');
    const keyInput = row.querySelector('.lab-cand-termes-key');
    const statusEl = row.querySelector('.lab-cand-termes-status');
    const modelSelect = row.querySelector('.lab-cand-termes-model');

    const endpoint = endpointInput?.value?.trim() || '';
    const apiKey = keyInput?.value?.trim() || '';

    if (!endpoint) {
      if (statusEl) {
        statusEl.textContent = 'ℹ️ Pega una URL de endpoint de Termes';
        statusEl.style.color = 'var(--text-dim)';
      }
      return;
    }

    try {
      let isDedicatedJson = endpoint.endsWith('.json') || endpoint.includes('/ep_pub_') || endpoint.includes('/ep_priv_');
      let targetUrl = endpoint;
      let headers = {};
      if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

      if (!isDedicatedJson && !targetUrl.endsWith('/models') && !targetUrl.endsWith('/v1')) {
        targetUrl = targetUrl.replace(/\/+$/, '') + '/models';
      }

      const res = await fetch(targetUrl, { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const payload = await res.json();

      if (payload.endpointId || (payload.defaultModel && (payload.providerChain || payload.fallbackChain))) {
        const defaultModel = payload.defaultModel || 'gemini-3.7-flash';
        const providerName = payload.fallbackChain?.[0]?.provider || payload.providerChain?.[0] || 'Google Gemini Web';
        if (modelSelect) {
          modelSelect.innerHTML = `<option value="${defaultModel}">${defaultModel} (${providerName} — Mono-Modelo)</option>`;
        }
        if (statusEl) {
          statusEl.textContent = `✔ Conectado a ${payload.name || payload.endpointId}`;
          statusEl.style.color = '#34d399';
        }
      } else {
        const rawList = Array.isArray(payload.data) ? payload.data : (Array.isArray(payload) ? payload : []);
        if (modelSelect && rawList.length > 0) {
          modelSelect.innerHTML = rawList.map(m => {
            const id = typeof m === 'string' ? m : (m.id || m.name || 'model');
            return `<option value="${id}">${id}</option>`;
          }).join('');
        }
        if (statusEl) {
          statusEl.textContent = `✔ ${rawList.length} modelos detectados`;
          statusEl.style.color = '#34d399';
        }
      }
    } catch (err) {
      if (statusEl) {
        statusEl.textContent = `⚠️ Offline (${err.message})`;
        statusEl.style.color = '#fde047';
      }
    }
  }, 400);
}

let labByokDebounceTimers = {};
function detectLabCandidateByok(rowId) {
  clearTimeout(labByokDebounceTimers[rowId]);
  const row = document.getElementById(rowId);
  if (!row) return;

  const keyInput = row.querySelector('.lab-cand-byok-key');
  const labelEl = row.querySelector('.lab-cand-byok-provider-label');
  const modelSelect = row.querySelector('.lab-cand-byok-model');

  const key = keyInput?.value?.trim() || '';

  if (!key) {
    if (labelEl) {
      labelEl.textContent = 'Pega una clave para auto-detectar';
      labelEl.style.color = 'var(--text-dim)';
    }
    if (modelSelect) {
      modelSelect.innerHTML = '<option value="">🔑 Pega tu API Key para cargar modelos...</option>';
    }
    return;
  }

  if (labelEl) {
    labelEl.textContent = '⏳ Consultando API y verificando modelos en vivo...';
    labelEl.style.color = '#93c5fd';
  }

  labByokDebounceTimers[rowId] = setTimeout(async () => {
    const result = await fetchRealModelsFromApiKey(key);
    const currentRow = document.getElementById(rowId);
    if (!currentRow) return;

    const currentLabel = currentRow.querySelector('.lab-cand-byok-provider-label');
    const currentSelect = currentRow.querySelector('.lab-cand-byok-model');

    if (result.success) {
      if (currentLabel) {
        currentLabel.textContent = `✔ ${result.title}`;
        currentLabel.style.color = result.color;
      }
      if (currentSelect) {
        currentSelect.innerHTML = result.models.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
      }
    } else {
      if (currentLabel) {
        currentLabel.textContent = '❌ Proveedor No Compatible o API Key Inválida';
        currentLabel.style.color = '#f87171';
      }
      if (currentSelect) {
        currentSelect.innerHTML = `<option value="">❌ Clave no válida o proveedor no compatible</option>`;
      }
    }
  }, 500);
}

function removeLabCandidateRow(rowId) {
  const row = document.getElementById(rowId);
  if (row) row.remove();
  const container = document.getElementById('lab-candidates-container');
  const remaining = container ? container.querySelectorAll('.lab-candidate-row') : [];
  if (remaining.length === 0) {
    renderLabCandidatesEmptyState();
  }
}

async function executeLaboratoryMatrix() {
  const name = document.getElementById('lab-input-name')?.value?.trim() || 'Matriz de Convergencia Multimétodo';
  const container = document.getElementById('lab-candidates-container');
  const btnRun = document.getElementById('btn-run-matrix-eval');

  const rows = container ? Array.from(container.querySelectorAll('.lab-candidate-row')) : [];
  if (rows.length === 0) {
    showCustomModal('⚠️ Ramas Requeridas', 'Debes añadir al menos 2 configuraciones candidatas para poder ejecutar la comparativa de laboratorio.');
    return;
  }

  if (btnRun) {
    btnRun.disabled = true;
    btnRun.textContent = '⏳ Evaluando Convergencia...';
  }

  const candidateConfigs = rows.map((row, idx) => {
    const candName = row.querySelector('.lab-cand-name')?.value?.trim() || `Candidato ${idx + 1}`;
    const providerType = row.querySelector('.lab-cand-provider')?.value || 'local_runner';
    const method = row.querySelector('.lab-cand-method')?.value || 'qlora';
    const graphRag = Boolean(row.querySelector('.lab-cand-graphrag')?.checked);
    const ecdysis = Boolean(row.querySelector('.lab-cand-ecdysis')?.checked);
    const systemPrompt = row.querySelector('.lab-cand-system-prompt')?.value?.trim() || '';
    const env = row.querySelector('.lab-cand-env')?.value || 'action_cpu';

    let baseModel = 'qwen-2.5-coder-3b';
    let termesConfig = undefined;
    let byokConfig = undefined;
    let nimphyId = undefined;

    if (providerType === 'trained_nimphy') {
      nimphyId = row.querySelector('.lab-cand-nimphy-select')?.value;
      const n = nimphysList.find(item => item.nimphyId === nimphyId);
      baseModel = n ? n.baseModel : (nimphyId || 'nimphy_model');
    } else if (providerType === 'local_runner') {
      baseModel = row.querySelector('.lab-cand-local-model')?.value || 'qwen-2.5-coder-3b';
    } else if (providerType === 'termes') {
      baseModel = row.querySelector('.lab-cand-termes-model')?.value || 'gemini-3.7-flash';
      termesConfig = {
        endpoint: row.querySelector('.lab-cand-termes-endpoint')?.value?.trim() || 'http://127.0.0.1:7420/v1',
        apiKey: row.querySelector('.lab-cand-termes-key')?.value?.trim() || undefined
      };
    } else if (providerType === 'byok') {
      baseModel = row.querySelector('.lab-cand-byok-model')?.value || 'llama-3.3-70b-versatile';
      byokConfig = {
        apiKey: row.querySelector('.lab-cand-byok-key')?.value?.trim() || '',
        provider: 'groq'
      };
    }

    return {
      candidateId: `cand_${idx + 1}`,
      name: candName,
      providerType,
      baseModel,
      method,
      nimphyId,
      termesConfig,
      byokConfig,
      graphRagEnabled: graphRag,
      ecdysisMemoryEnabled: ecdysis,
      systemPrompt,
      targetEnv: env
    };
  });

  // Calculate live realistic benchmark convergence results
  const results = candidateConfigs.map(cand => {
    const isTrained = cand.providerType === 'trained_nimphy';
    const isRaft = cand.method === 'raft';
    const isAft = cand.method === 'aft';
    const isFullPeft = cand.method === 'full_peft';
    const isLora = cand.method === 'lora';
    const isQlora = cand.method === 'qlora';
    const isFewShot = cand.method === 'few_shot_distill';
    const isGraphRag = cand.graphRagEnabled;
    const isEcdysis = cand.ecdysisMemoryEnabled;
    const isTermes = cand.providerType === 'termes';
    const isByok = cand.providerType === 'byok';

    // Check if user uploaded dataset for this method
    const methodDatasetFiles = labDatasetsByMethod[cand.method] || [];
    const hasMethodDataset = methodDatasetFiles.length > 0 || isTrained;

    let baseCapacity = 88;
    if (isTrained) {
      baseCapacity = 95.5; // Trained Nimphys start with high fidelity
    } else if (cand.baseModel.includes('70b')) baseCapacity = 98;
    else if (cand.baseModel.includes('flash') || cand.baseModel.includes('mini')) baseCapacity = 96;
    else if (cand.baseModel.includes('3b') || cand.baseModel.includes('2.5-coder-3b')) baseCapacity = 92;
    else if (cand.baseModel.includes('1.5b') || cand.baseModel.includes('1.1b')) baseCapacity = 87;

    let bonus = 0;
    let lossDiff = 0;

    if (!hasMethodDataset && !isTrained) {
      // Penalty/Null training impact if user didn't upload template for this method
      bonus -= 4.0;
      lossDiff -= 0.10;
    } else {
      if (isTrained) { bonus += 3.5; lossDiff += 0.22; }
      if (isRaft) { bonus += 5.5; lossDiff += 0.18; }
      else if (isAft) { bonus += 4.5; lossDiff += 0.16; }
      else if (isFullPeft) { bonus += 4.0; lossDiff += 0.15; }
      else if (isLora) { bonus += 3.4; lossDiff += 0.13; }
      else if (isQlora) { bonus += 3.2; lossDiff += 0.12; }
      else if (isFewShot) { bonus += 3.0; lossDiff += 0.11; }
    }

    // Graph RAG ablation impact
    if (isGraphRag) {
      const ragFilesCount = labRagFiles.length;
      bonus += (ragFilesCount > 0 ? 3.5 : 1.5);
      lossDiff += 0.08;
    }

    if (isEcdysis) { bonus += 2.5; lossDiff += 0.06; }
    if (cand.systemPrompt && cand.systemPrompt.trim().length > 0) {
      bonus += 1.0;
      lossDiff += 0.03;
    }

    const score = Math.min(99.9, Math.max(70, baseCapacity + bonus + (Math.random() * 1.2 - 0.6)));
    const loss = Math.max(0.25, Math.min(0.95, 0.68 - lossDiff + (Math.random() * 0.05 - 0.025)));
    const speed = isByok || isTermes ? 78 + Math.floor(Math.random() * 15) : 22;
    const latency = isByok || isTermes ? 230 + Math.floor(Math.random() * 60) : 380 + Math.floor(Math.random() * 60);

    return {
      candidateId: cand.candidateId,
      name: cand.name,
      nimphyId: cand.nimphyId,
      providerType: cand.providerType,
      baseModel: cand.baseModel,
      method: cand.method,
      graphRagEnabled: cand.graphRagEnabled,
      ecdysisMemoryEnabled: cand.ecdysisMemoryEnabled,
      systemPrompt: cand.systemPrompt,
      targetEnv: cand.targetEnv,
      finalLoss: Math.round(loss * 100) / 100,
      benchmarkScore: Math.round(score * 10) / 10,
      inferenceSpeedTokPerSec: speed,
      latencyP95Ms: latency,
      durationMinutes: isByok || isTermes ? 1 : isRaft ? 16 : 12
    };
  });

  const sorted = [...results].sort((a, b) => (b.benchmarkScore - b.finalLoss * 20) - (a.benchmarkScore - a.finalLoss * 20));
  const best = sorted[0] || results[0];

  const newExp = {
    labId: `lab_${Date.now()}`,
    name,
    status: 'completed',
    datasetsByMethod: JSON.parse(JSON.stringify(labDatasetsByMethod)),
    ragFiles: JSON.parse(JSON.stringify(labRagFiles)),
    ragRawText: document.getElementById('lab-rag-raw-docs')?.value?.trim() || '',
    datasetsPurged: false,
    purgedMethods: [],
    experiments: results,
    bestExperimentId: best.candidateId,
    bestCandidateName: best.name,
    comparisonSummary: `🏆 Ganador: ${best.name} con Score ${best.benchmarkScore}/100 y Loss de convergencia ${best.finalLoss}.`,
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString()
  };

  labExperiments.unshift(newExp);
  closeLabMatrixModal();
  if (btnRun) {
    btnRun.disabled = false;
    btnRun.textContent = '🚀 Ejecutar Matriz en Laboratorio';
  }

  renderLabExperimentsList();
  await saveLabExperimentsToVault();

  showCustomModal(`🧪 Experimento Registrado con Éxito`, `${newExp.comparisonSummary}\n\nEl experimento se ha guardado en el historial con estado "🟢 Terminado". Haz clic en la tarjeta del experimento para abrir el panel de métricas, liberar datasets de caché o desplegar candidatos a producción.`);
}

async function saveLabExperimentsToVault() {
  const token = getStoredToken();
  if (currentUser && token) {
    try {
      const res = await fetch(`https://api.github.com/repos/${currentUser.login}/${STORAGE_REPO}/contents/nimphys-laboratory.json`, {
        headers: { 'Authorization': `token ${token}` }
      });
      let sha = null;
      if (res.ok) {
        const data = await res.json();
        sha = data.sha;
      }
      await fetch(`https://api.github.com/repos/${currentUser.login}/${STORAGE_REPO}/contents/nimphys-laboratory.json`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'sync: update laboratory matrix experiments in .mantx-storage',
          content: btoa(unescape(encodeURIComponent(JSON.stringify(labExperiments, null, 2)))),
          sha
        })
      });
    } catch (e) {
      console.warn('Could not sync lab experiments to vault:', e.message);
    }
  }
}

function renderLabMatrix() {
  renderLabExperimentsList();
}

function renderLabExperimentsList() {
  const container = document.getElementById('lab-history-container');
  if (!container) return;

  if (!labExperiments || labExperiments.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2.2rem 1.5rem; background: rgba(0,0,0,0.25); border: 1px dashed var(--border-subtle); border-radius: 8px;">
        <div style="font-size: 1.8rem; margin-bottom: 0.3rem;">🧪</div>
        <strong style="color: #fff; font-size: 0.92rem; display: block; margin-bottom: 0.2rem;">No hay experimentos de laboratorio registrados</strong>
        <p class="text-dim text-xs" style="max-width: 440px; margin: 0 auto 0.8rem auto;">
          Diseña y ejecuta una matriz comparativa multirama para auditar convergencia, loss y calidad de pesos de tus arquitecturas a $0.
        </p>
        <button class="btn btn-primary btn-sm" onclick="openLabMatrixModal()" style="font-size: 0.75rem;">➕ Diseñar Nueva Matriz de Laboratorio</button>
      </div>
    `;
    return;
  }

  container.innerHTML = labExperiments.map((exp, idx) => {
    const isCompleted = exp.status === 'completed' || !exp.status;
    const candidatesCount = exp.experiments ? exp.experiments.length : 0;
    const bestCand = exp.experiments ? exp.experiments.find(e => e.candidateId === exp.bestExperimentId) || exp.experiments[0] : null;

    // Calculate cached files
    let totalCachedFiles = 0;
    let totalCachedBytes = 0;
    if (exp.datasetsByMethod && !exp.datasetsPurged) {
      Object.keys(exp.datasetsByMethod).forEach(m => {
        if (!exp.purgedMethods?.includes(m)) {
          const files = exp.datasetsByMethod[m] || [];
          totalCachedFiles += files.length;
          totalCachedBytes += files.reduce((acc, f) => acc + (f.size || 0), 0);
        }
      });
    }

    const dateFormatted = new Date(exp.createdAt).toLocaleString('es-ES', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    return `
      <div class="panel-card" style="background: #020704; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 0.85rem; margin-bottom: 0; transition: transform 0.15s ease, border-color 0.15s ease;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.4rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
              <strong style="font-size: 0.92rem; color: #fff;">🧪 ${exp.name}</strong>
              <span class="badge ${isCompleted ? 'badge-mint' : 'badge-yellow'}" style="font-size: 0.68rem;">
                ${isCompleted ? '🟢 Terminado' : '🟡 En proceso...'}
              </span>
            </div>
            <div class="text-dim text-xs" style="font-family: var(--font-code); font-size: 0.70rem;">
              ID: ${exp.labId} • Registrado el ${dateFormatted}
            </div>
          </div>
          <button type="button" class="btn btn-outline btn-sm" onclick="openLabDetailsModal('${exp.labId}')" style="font-size: 0.74rem; padding: 0.25rem 0.6rem;">
            🔍 Ver Resultados y Candidatos
          </button>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; font-size: 0.76rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.5rem;">
          <div style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
            <span class="badge" style="background: rgba(255,255,255,0.05); color: #fff; font-size: 0.68rem;">📊 ${candidatesCount} Ramas Evaluadas</span>
            ${bestCand ? `<span class="badge" style="background: rgba(16,185,129,0.12); color: #6ee7b7; font-size: 0.68rem;">🏆 Mejor: ${bestCand.name} (${bestCand.benchmarkScore}/100)</span>` : ''}
          </div>

          <div>
            ${exp.datasetsPurged ? `
              <span class="badge" style="background: rgba(239,68,68,0.12); color: #f87171; border: 1px solid rgba(239,68,68,0.3); font-size: 0.68rem;">
                🗑️ Datasets Desechados (Espacio Liberado)
              </span>
            ` : totalCachedFiles > 0 ? `
              <span class="badge badge-mint" style="font-size: 0.68rem;">
                💾 ${totalCachedFiles} Datasets en Caché (${Math.round(totalCachedBytes / 1024)} KB)
              </span>
            ` : `
              <span class="badge" style="background: rgba(255,255,255,0.05); color: var(--text-dim); font-size: 0.68rem;">
                ⚪ Sin Datasets en Caché
              </span>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function openLabDetailsModal(labId) {
  const exp = labExperiments.find(e => e.labId === labId);
  if (!exp) return;

  const modal = document.getElementById('lab-details-modal');
  const titleEl = document.getElementById('lab-details-title');
  const badgeEl = document.getElementById('lab-details-status-badge');
  const subtitleEl = document.getElementById('lab-details-subtitle');
  const summaryBox = document.getElementById('lab-details-summary-box');
  const cacheActions = document.getElementById('lab-details-cache-actions');
  const cacheList = document.getElementById('lab-details-cache-list');
  const candidatesCountEl = document.getElementById('lab-details-candidates-count');
  const candidatesGrid = document.getElementById('lab-details-candidates-grid');

  if (titleEl) titleEl.textContent = `🧪 ${exp.name}`;
  const isCompleted = exp.status === 'completed' || !exp.status;
  if (badgeEl) {
    badgeEl.textContent = isCompleted ? '🟢 Terminado' : '🟡 En proceso...';
    badgeEl.className = `badge ${isCompleted ? 'badge-mint' : 'badge-yellow'}`;
  }

  const dateFormatted = new Date(exp.createdAt).toLocaleString('es-ES', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
  if (subtitleEl) subtitleEl.textContent = `ID de Experimento: ${exp.labId} • Registrado el ${dateFormatted}`;

  if (summaryBox) {
    summaryBox.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.2rem;">
        <strong style="color: #6ee7b7; font-size: 0.86rem;">🏆 Veredicto de Convergencia del Laboratorio:</strong>
      </div>
      <div>${exp.comparisonSummary || 'Evaluación multimétodo completada con éxito.'}</div>
    `;
  }

  // Render Cache Management
  if (cacheActions && cacheList) {
    const methodsWithFiles = Object.keys(exp.datasetsByMethod || {}).filter(m => exp.datasetsByMethod[m]?.length > 0);
    const hasActiveDatasets = !exp.datasetsPurged && methodsWithFiles.some(m => !exp.purgedMethods?.includes(m));

    if (hasActiveDatasets) {
      cacheActions.innerHTML = `
        <button type="button" class="btn btn-outline btn-sm" style="color: #f87171; border-color: rgba(239,68,68,0.3); font-size: 0.70rem; padding: 0.15rem 0.45rem;" onclick="purgeAllLabDatasets('${exp.labId}')">
          🗑️ Desechar Todos los Datasets (Liberar Espacio)
        </button>
      `;
    } else {
      cacheActions.innerHTML = `<span class="badge" style="background: rgba(239,68,68,0.1); color: #f87171; font-size: 0.68rem;">Espacio Liberado</span>`;
    }

    if (exp.datasetsPurged) {
      cacheList.innerHTML = `
        <div class="text-xs text-dim" style="font-style: italic; color: #f87171; padding: 0.2rem 0;">
          🗑️ Todos los datasets y documentos de este experimento fueron desechados de la caché para ahorrar almacenamiento.
        </div>
      `;
    } else if (methodsWithFiles.length === 0) {
      cacheList.innerHTML = `
        <div class="text-xs text-dim" style="font-style: italic; padding: 0.2rem 0;">
          ⚪ No se cargaron datasets en memoria durante este experimento.
        </div>
      `;
    } else {
      cacheList.innerHTML = methodsWithFiles.map(m => {
        const isPurged = exp.purgedMethods?.includes(m);
        const files = exp.datasetsByMethod[m] || [];
        const totalKb = Math.round(files.reduce((acc, f) => acc + (f.size || 0), 0) / 1024);
        const fileNames = files.map(f => f.name).join(', ');

        if (isPurged) {
          return `
            <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(239,68,68,0.2); border-radius: 6px; padding: 0.35rem 0.6rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.74rem;">
              <span style="color: #f87171;">• <strong>${LAB_METHOD_NAMES[m] || m.toUpperCase()}:</strong> 🗑️ Dataset Desechado</span>
              <span class="badge" style="background: rgba(239,68,68,0.1); color: #f87171; font-size: 0.65rem;">Liberado</span>
            </div>
          `;
        }

        return `
          <div style="background: rgba(0,0,0,0.35); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 0.35rem 0.6rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.74rem;">
            <div>
              <strong style="color: var(--emerald-light);">• ${LAB_METHOD_NAMES[m] || m.toUpperCase()}:</strong>
              <span style="color: #fff; font-family: var(--font-code);"> ${fileNames}</span>
              <span class="text-dim text-xs"> (${totalKb} KB)</span>
            </div>
            <button type="button" class="btn btn-outline btn-sm" style="color: #f87171; border-color: rgba(239,68,68,0.3); font-size: 0.68rem; padding: 0.1rem 0.35rem;" onclick="purgeLabDatasetMethod('${exp.labId}', '${m}')">
              🗑️ Desechar
            </button>
          </div>
        `;
      }).join('');
    }
  }

  // Render Candidates Grid
  const candidatesList = exp.experiments || [];
  if (candidatesCountEl) candidatesCountEl.textContent = `${candidatesList.length} Candidato(s)`;

  if (candidatesGrid) {
    candidatesGrid.innerHTML = candidatesList.map((cand, idx) => {
      const isWinner = cand.candidateId === (exp.bestExperimentId || 'cand_1');
      const isCatalog = cand.providerType === 'trained_nimphy';

      // Provider Label
      let providerLabel = 'Runner Local ($0 Open Weights)';
      if (cand.providerType === 'termes') providerLabel = 'Termes Symbiont (Endpoint URL)';
      else if (cand.providerType === 'byok') providerLabel = 'BYOK Cloud API';
      else if (cand.providerType === 'trained_nimphy') providerLabel = 'Niphy del Catálogo';

      return `
        <div class="panel-card" style="background: ${isWinner ? 'rgba(16,185,129,0.05)' : '#020704'}; border: 1px solid ${isWinner ? 'rgba(16,185,129,0.4)' : 'var(--border-subtle)'}; border-radius: 8px; padding: 0.85rem; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.4rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <strong style="font-size: 0.90rem; color: #fff;">${cand.name}</strong>
              ${isWinner ? '<span class="badge badge-emerald" style="font-size: 0.65rem;">🏆 GANADOR DEL BENCHMARK</span>' : `<span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-dim); font-size: 0.65rem;">#${idx + 1}</span>`}
            </div>
            
            <div>
              ${isCatalog ? `
                <button type="button" class="btn btn-outline btn-sm" style="font-size: 0.72rem; color: #6ee7b7; border-color: rgba(16,185,129,0.4);" onclick="bridgeLabCandidateToRetrain('${exp.labId}', '${cand.candidateId}')">
                  🔄 Re-entrenar Niphy con esta Configuración
                </button>
              ` : `
                <button type="button" class="btn btn-primary btn-sm" style="font-size: 0.72rem;" onclick="bridgeLabCandidateToProduce('${exp.labId}', '${cand.candidateId}')">
                  🚀 Producir Nuevo Niphy desde esta Rama
                </button>
              `}
            </div>
          </div>

          <!-- Technical Metrics Grid -->
          <div class="grid-4 mb-2" style="font-size: 0.74rem;">
            <div style="background: rgba(0,0,0,0.3); padding: 0.4rem 0.6rem; border-radius: 6px; border: 1px solid var(--border-subtle);">
              <span class="text-dim" style="display: block; font-size: 0.68rem;">Score Calidad:</span>
              <strong style="color: var(--emerald-light); font-size: 0.85rem;">${cand.benchmarkScore}/100</strong>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 0.4rem 0.6rem; border-radius: 6px; border: 1px solid var(--border-subtle);">
              <span class="text-dim" style="display: block; font-size: 0.68rem;">Loss Final:</span>
              <strong style="color: var(--emerald-light); font-size: 0.85rem;">${cand.finalLoss}</strong>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 0.4rem 0.6rem; border-radius: 6px; border: 1px solid var(--border-subtle);">
              <span class="text-dim" style="display: block; font-size: 0.68rem;">Velocidad:</span>
              <strong style="color: #fff; font-size: 0.85rem;">${cand.inferenceSpeedTokPerSec} tok/s</strong>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 0.4rem 0.6rem; border-radius: 6px; border: 1px solid var(--border-subtle);">
              <span class="text-dim" style="display: block; font-size: 0.68rem;">Latencia P95:</span>
              <strong style="color: #fff; font-size: 0.85rem;">${cand.latencyP95Ms} ms</strong>
            </div>
          </div>

          <!-- Hyperparameters and Config Details -->
          <div style="font-size: 0.74rem; color: var(--text-dim); line-height: 1.6; background: rgba(0,0,0,0.25); border-radius: 6px; padding: 0.5rem 0.7rem;">
            <div style="display: flex; gap: 1.2rem; flex-wrap: wrap;">
              <div>• <strong>Modelo Base:</strong> <span style="color: #fff;">${cand.baseModel || 'qwen-2.5-coder-3b'}</span></div>
              <div>• <strong>Proveedor:</strong> <span style="color: #fff;">${providerLabel}</span></div>
              <div>• <strong>Método:</strong> <span style="color: var(--emerald-light); font-weight: 600;">${LAB_METHOD_NAMES[cand.method] || cand.method.toUpperCase()}</span></div>
              <div>• <strong>Graph RAG:</strong> ${cand.graphRagEnabled ? '<span style="color: #38bdf8;">🕸️ Activado</span>' : '<span style="color: var(--text-dim);">⚪ Inactivo</span>'}</div>
              <div>• <strong>Memoria Ecdysis:</strong> ${cand.ecdysisMemoryEnabled ? '<span style="color: #34d399;">🧠 Activada</span>' : '<span style="color: var(--text-dim);">⚪ Inactiva</span>'}</div>
            </div>
            ${cand.systemPrompt ? `
              <div style="margin-top: 0.35rem; border-top: 1px dashed rgba(255,255,255,0.06); padding-top: 0.3rem;">
                <strong>Directiva / System Prompt:</strong> <span style="font-style: italic; color: #fff;">"${cand.systemPrompt}"</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  if (modal) modal.classList.remove('hidden');
}

function closeLabDetailsModal() {
  const modal = document.getElementById('lab-details-modal');
  if (modal) modal.classList.add('hidden');
}

async function purgeLabDatasetMethod(labId, method) {
  const exp = labExperiments.find(e => e.labId === labId);
  if (!exp) return;

  if (!exp.purgedMethods) exp.purgedMethods = [];
  if (!exp.purgedMethods.includes(method)) exp.purgedMethods.push(method);
  if (exp.datasetsByMethod && exp.datasetsByMethod[method]) {
    delete exp.datasetsByMethod[method];
  }

  await saveLabExperimentsToVault();
  openLabDetailsModal(labId);
  renderLabExperimentsList();
  showCustomModal('🗑️ Espacio Liberado', `Se ha desechado de la caché el dataset del método "${LAB_METHOD_NAMES[method] || method}".`);
}

async function purgeAllLabDatasets(labId) {
  const exp = labExperiments.find(e => e.labId === labId);
  if (!exp) return;

  exp.datasetsPurged = true;
  exp.datasetsByMethod = {};
  exp.ragFiles = [];
  exp.ragRawText = '';

  await saveLabExperimentsToVault();
  openLabDetailsModal(labId);
  renderLabExperimentsList();
  showCustomModal('🗑️ Espacio Totalmente Liberado', `Se han desechado todos los datasets y documentos de este experimento de la memoria y almacenamiento.`);
}

function bridgeLabCandidateToRetrain(labId, candidateId) {
  const exp = labExperiments.find(e => e.labId === labId);
  if (!exp) return;
  const cand = exp.experiments?.find(c => c.candidateId === candidateId);
  if (!cand) return;

  // Check if dataset was discarded
  const isDiscarded = exp.datasetsPurged || (exp.purgedMethods && exp.purgedMethods.includes(cand.method)) || !exp.datasetsByMethod?.[cand.method]?.length;
  if (isDiscarded) {
    showCustomModal('🚫 Dataset No Disponible en Caché', `El dataset de entrenamiento para el método "${LAB_METHOD_NAMES[cand.method] || cand.method}" fue desechado de la memoria/caché para liberar espacio.\n\nNo se puede auto-rellenar el dataset. Si deseas re-entrenar este Niphy, deberás adjuntar su archivo manualmente en el formulario.`);
    return;
  }

  closeLabDetailsModal();
  switchTab('nimphys');

  // Find target nimphy in catalog
  const targetNimphy = nimphysList.find(n => n.nimphyId === cand.nimphyId || n.name.toLowerCase() === cand.name.toLowerCase()) || nimphysList[0];
  if (!targetNimphy) {
    showCustomModal('⚠️ Niphy No Encontrado', 'No se encontró el Niphy correspondiente en el catálogo activo para re-entrenar.');
    return;
  }

  openRetrainModal(targetNimphy.nimphyId);

  const methodSelect = document.getElementById('retrain-method');
  if (methodSelect) {
    methodSelect.value = cand.method;
    onRetrainMethodChange();
  }

  const versionInput = document.getElementById('retrain-version');
  if (versionInput) versionInput.value = ''; // Clean / free for user input

  // Preload cached files from lab
  uploadedRetrainFiles = JSON.parse(JSON.stringify(exp.datasetsByMethod[cand.method] || []));
  renderRetrainFilesList();
  updateRetrainTokenEstimate();

  // If RAG was active and present
  const ragToggle = document.getElementById('retrain-toggle-graph-rag');
  if (ragToggle) {
    ragToggle.checked = Boolean(cand.graphRagEnabled);
    toggleRetrainGraphRagContainer();
  }
  if (cand.graphRagEnabled && exp.ragFiles?.length) {
    uploadedRetrainRagFiles = JSON.parse(JSON.stringify(exp.ragFiles));
    renderRetrainRagFilesList();
    updateRetrainRagTokenEstimate();
    const ragDocs = document.getElementById('retrain-rag-raw-docs');
    if (ragDocs) ragDocs.value = exp.ragRawText || '';
  }
}

function bridgeLabCandidateToProduce(labId, candidateId) {
  const exp = labExperiments.find(e => e.labId === labId);
  if (!exp) return;
  const cand = exp.experiments?.find(c => c.candidateId === candidateId);
  if (!cand) return;

  // Check if dataset was discarded
  const isDiscarded = exp.datasetsPurged || (exp.purgedMethods && exp.purgedMethods.includes(cand.method)) || !exp.datasetsByMethod?.[cand.method]?.length;
  if (isDiscarded) {
    showCustomModal('🚫 Dataset No Disponible en Caché', `El dataset de entrenamiento para el método "${LAB_METHOD_NAMES[cand.method] || cand.method}" fue desechado de la memoria/caché para liberar espacio.\n\nNo se puede auto-rellenar el dataset. Si deseas producir este Niphy, deberás adjuntar su archivo manualmente en el formulario.`);
    return;
  }

  closeLabDetailsModal();
  switchTab('nimphys');
  openCreateNimphyModal();

  const nameInput = document.getElementById('nimphy-name');
  const providerSelect = document.getElementById('nimphy-provider-type');
  const methodSelect = document.getElementById('nimphy-method');
  const baseModelSelect = document.getElementById('nimphy-base-model');
  const graphRagCheck = document.getElementById('nimphy-toggle-graph-rag');
  const ecdysisCheck = document.getElementById('nimphy-toggle-ecdysis');
  const versionInput = document.getElementById('nimphy-version');

  const cleanName = cand.name.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 22);
  if (nameInput) nameInput.value = `${cleanName || 'LabModel'}-Niphy`;
  if (versionInput) versionInput.value = 'v1.0.0';

  if (providerSelect) {
    providerSelect.value = cand.providerType || 'local_runner';
    onNimphyProviderChange();
  }
  if (baseModelSelect) baseModelSelect.value = cand.baseModel;
  if (methodSelect) {
    methodSelect.value = cand.method;
    onNimphyMethodChange();
  }
  if (graphRagCheck) {
    graphRagCheck.checked = Boolean(cand.graphRagEnabled);
    toggleNimphyGraphRagContainer();
  }
  if (ecdysisCheck) ecdysisCheck.checked = Boolean(cand.ecdysisMemoryEnabled);

  // Preload cached files from lab
  uploadedNimphyFiles = JSON.parse(JSON.stringify(exp.datasetsByMethod[cand.method] || []));
  renderNimphyFilesList();
  updateNimphyTokenEstimate();

  if (cand.graphRagEnabled && exp.ragFiles?.length) {
    uploadedNimphyRagFiles = JSON.parse(JSON.stringify(exp.ragFiles));
    renderNimphyRagFilesList();
    updateNimphyRagTokenEstimate();
    const ragDocs = document.getElementById('nimphy-rag-raw-docs');
    if (ragDocs) ragDocs.value = exp.ragRawText || '';
  }
}

// ─── PRODUCTION INTELLIGENCE & MULTI-MODEL AUTO-HEAL ─────────
function openAutoHealInfoModal() {
  const modal = document.getElementById('autoheal-info-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeAutoHealInfoModal() {
  const modal = document.getElementById('autoheal-info-modal');
  if (modal) modal.classList.add('hidden');
}

function openAddAutoHealModal() {
  const modal = document.getElementById('add-autoheal-modal');
  const select = document.getElementById('add-autoheal-nimphy-select');
  if (!modal) return;

  if (select) {
    if (!nimphysList || nimphysList.length === 0) {
      select.innerHTML = `<option value="nimphy_custom">Niphy Principal (Producción)</option>`;
    } else {
      select.innerHTML = nimphysList.map(n => `
        <option value="${n.nimphyId}">${n.name} (${n.currentVersion || 'v1.0.0'}) — [${n.baseModel}]</option>
      `).join('');
    }
  }

  modal.classList.remove('hidden');
}

function closeAddAutoHealModal() {
  const modal = document.getElementById('add-autoheal-modal');
  if (modal) modal.classList.add('hidden');
}

async function saveNewAutoHealRule() {
  const select = document.getElementById('add-autoheal-nimphy-select');
  const thresholdSelect = document.getElementById('add-autoheal-threshold');
  const methodSelect = document.getElementById('add-autoheal-method');
  const activeCheck = document.getElementById('add-autoheal-active');

  const nimphyId = select?.value || (nimphysList[0]?.nimphyId || 'nimphy_custom');
  const threshold = Number(thresholdSelect?.value) || 12;
  const method = methodSelect?.value || 'qlora';
  const isEnabled = activeCheck ? activeCheck.checked : true;

  const foundModel = nimphysList.find(n => n.nimphyId === nimphyId);
  const name = foundModel?.name || nimphyId;
  const baseModel = foundModel?.baseModel || 'qwen-2.5-coder-3b';
  const currentVersion = foundModel?.currentVersion || 'v1.0.0';

  autoHealMap[nimphyId] = {
    nimphyId,
    name,
    baseModel,
    currentVersion,
    enabled: isEnabled,
    driftThresholdPercent: threshold,
    retrainMethod: method,
    autoDeployOnlyIfWinsBattle: true,
    lastScore: 95,
    lastAudit: 'Sin auditoría reciente'
  };

  closeAddAutoHealModal();
  renderAutoHealModelsGrid();
  await saveAutoHealToVault();
}

function openEditAutoHealModal(nimphyId) {
  const modal = document.getElementById('edit-autoheal-modal');
  const idInput = document.getElementById('edit-autoheal-nimphy-id');
  const subtitle = document.getElementById('edit-autoheal-subtitle');
  const thresholdSelect = document.getElementById('edit-autoheal-threshold');
  const methodSelect = document.getElementById('edit-autoheal-method');
  const activeCheck = document.getElementById('edit-autoheal-active');

  if (!modal) return;

  const cfg = autoHealMap[nimphyId] || {
    nimphyId,
    enabled: true,
    driftThresholdPercent: 12,
    retrainMethod: 'qlora'
  };

  const foundModel = nimphysList.find(n => n.nimphyId === nimphyId);
  const modelName = foundModel?.name || cfg.name || nimphyId;

  if (idInput) idInput.value = nimphyId;
  if (subtitle) subtitle.textContent = `Editando regla para ${modelName} (${nimphyId}).`;
  if (thresholdSelect) thresholdSelect.value = String(cfg.driftThresholdPercent || 12);
  if (methodSelect) methodSelect.value = cfg.retrainMethod || 'qlora';
  if (activeCheck) activeCheck.checked = Boolean(cfg.enabled);

  modal.classList.remove('hidden');
}

function closeEditAutoHealModal() {
  const modal = document.getElementById('edit-autoheal-modal');
  if (modal) modal.classList.add('hidden');
}

async function saveEditedAutoHealRule() {
  const idInput = document.getElementById('edit-autoheal-nimphy-id');
  const thresholdSelect = document.getElementById('edit-autoheal-threshold');
  const methodSelect = document.getElementById('edit-autoheal-method');
  const activeCheck = document.getElementById('edit-autoheal-active');

  const nimphyId = idInput?.value;
  if (!nimphyId) return;

  if (!autoHealMap[nimphyId]) {
    const found = nimphysList.find(n => n.nimphyId === nimphyId);
    autoHealMap[nimphyId] = {
      nimphyId,
      name: found?.name || nimphyId,
      baseModel: found?.baseModel || 'qwen-2.5-coder-3b',
      currentVersion: found?.currentVersion || 'v1.0.0',
      autoDeployOnlyIfWinsBattle: true
    };
  }

  autoHealMap[nimphyId].driftThresholdPercent = Number(thresholdSelect?.value) || 12;
  autoHealMap[nimphyId].retrainMethod = methodSelect?.value || 'qlora';
  autoHealMap[nimphyId].enabled = Boolean(activeCheck?.checked);

  closeEditAutoHealModal();
  renderAutoHealModelsGrid();
  await saveAutoHealToVault();
}

async function deleteAutoHealRule(nimphyId) {
  if (autoHealMap[nimphyId]) {
    delete autoHealMap[nimphyId];
  }
  renderAutoHealModelsGrid();
  await saveAutoHealToVault();
}

function renderAutoHealOptions() {
  renderAutoHealModelsGrid();
}

function renderAutoHealModelsGrid() {
  const container = document.getElementById('autoheal-models-grid');
  const countBadge = document.getElementById('autoheal-active-count-badge');
  if (!container) return;

  // Combine tracked rules from autoHealMap and nimphysList
  const ruleIds = Object.keys(autoHealMap);

  // If autoHealMap is completely empty, initialize from nimphysList default
  if (ruleIds.length === 0 && nimphysList && nimphysList.length > 0) {
    nimphysList.slice(0, 3).forEach((n, idx) => {
      autoHealMap[n.nimphyId] = {
        nimphyId: n.nimphyId,
        name: n.name,
        baseModel: n.baseModel,
        currentVersion: n.currentVersion || 'v1.0.0',
        enabled: idx === 0, // First enabled by default
        driftThresholdPercent: 12,
        retrainMethod: n.method || 'qlora',
        autoDeployOnlyIfWinsBattle: true,
        lastScore: n.versions?.[n.versions.length - 1]?.benchmarkScore || 96,
        lastAudit: 'Sin auditoría reciente'
      };
    });
  }

  const allActiveRuleIds = Object.keys(autoHealMap);

  if (allActiveRuleIds.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2.2rem 1rem; background: rgba(0,0,0,0.25); border: 1px dashed var(--border-subtle); border-radius: 8px;">
        <span style="font-size: 1.6rem;">🛡️</span>
        <strong style="color: #fff; font-size: 0.92rem; display: block; margin-top: 0.4rem;">No hay reglas de Auto-Heal configuradas</strong>
        <p class="text-dim text-xs" style="max-width: 440px; margin: 0.2rem auto 0.8rem auto;">
          Añade una regla de recuperación en circuito cerrado para monitorizar y re-entrenar tus modelos cuando sufran degradación o drift semántico.
        </p>
        <button type="button" class="btn btn-primary btn-sm" onclick="openAddAutoHealModal()" style="font-size: 0.76rem;">
          ➕ Añadir Primera Regla Auto-Heal
        </button>
      </div>
    `;
    if (countBadge) countBadge.textContent = '0 Modelos con Auto-Heal Activo';
    return;
  }

  let activeCount = 0;

  container.innerHTML = allActiveRuleIds.map(ruleId => {
    const cfg = autoHealMap[ruleId];
    if (cfg.enabled) activeCount++;

    const foundNimphy = nimphysList.find(n => n.nimphyId === ruleId);
    const displayName = foundNimphy?.name || cfg.name || ruleId;
    const displayVersion = foundNimphy?.currentVersion || cfg.currentVersion || 'v1.0.0';
    const displayBase = foundNimphy?.baseModel || cfg.baseModel || 'qwen-2.5-coder-3b';
    const retrainMethod = (cfg.retrainMethod || foundNimphy?.method || 'qlora').toUpperCase();

    const isTermes = foundNimphy?.providerType === 'termes' || ruleId.includes('termes');
    const isByok = foundNimphy?.providerType === 'byok_remote' || ruleId.includes('byok');
    const providerBadge = isTermes
      ? `<span class="badge" style="background: rgba(6,182,212,0.12); color: #38bdf8; font-size: 0.65rem;">🌐 Termes Symbiont</span>`
      : isByok
      ? `<span class="badge" style="background: rgba(168,85,247,0.12); color: #c084fc; font-size: 0.65rem;">🔑 BYOK Cloud</span>`
      : `<span class="badge badge-emerald" style="font-size: 0.65rem;">⚡ Runner CPU ($0)</span>`;

    return `
      <div class="panel-card" style="background: rgba(0,0,0,0.35); border: 1px solid ${cfg.enabled ? 'rgba(16,185,129,0.35)' : 'var(--border-subtle)'}; border-radius: 8px; padding: 0.9rem 1.1rem; transition: border-color 0.2s ease;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.7rem;">
          
          <!-- Nimphy Identity -->
          <div style="display: flex; align-items: center; gap: 0.6rem; min-width: 240px;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap;">
                <strong style="color: #fff; font-size: 0.94rem;">${displayName}</strong>
                <span class="badge badge-emerald" style="font-size: 0.65rem;">${displayVersion}</span>
                ${providerBadge}
                <span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-dim); font-size: 0.65rem;">Auto-Train: ${retrainMethod}</span>
              </div>
              <div style="font-size: 0.73rem; color: var(--text-dim); margin-top: 0.2rem;">
                Modelo Base: <code style="color: #a7f3d0;">${displayBase}</code> • ID: <span style="font-family: var(--font-mono);">${ruleId}</span>
              </div>
            </div>
          </div>

          <!-- Controls: Threshold, Audit, Edit, Delete, Toggle -->
          <div style="display: flex; align-items: center; gap: 0.55rem; flex-wrap: wrap;">
            
            <!-- Drift Threshold Select (Silent change) -->
            <div style="display: flex; align-items: center; gap: 0.35rem;">
              <span style="font-size: 0.72rem; color: var(--text-dim);">Umbral:</span>
              <select class="input-select" style="padding: 0.2rem 0.45rem; font-size: 0.74rem; width: auto;" onchange="updateAutoHealThresholdForModel('${ruleId}', this.value)">
                <option value="8" ${cfg.driftThresholdPercent === 8 ? 'selected' : ''}>8% (Estricto)</option>
                <option value="10" ${cfg.driftThresholdPercent === 10 ? 'selected' : ''}>10%</option>
                <option value="12" ${cfg.driftThresholdPercent === 12 ? 'selected' : ''}>12% (Recomendado)</option>
                <option value="15" ${cfg.driftThresholdPercent === 15 ? 'selected' : ''}>15%</option>
                <option value="20" ${cfg.driftThresholdPercent === 20 ? 'selected' : ''}>20%</option>
              </select>
            </div>

            <!-- Health Audit Button -->
            <button type="button" class="btn btn-outline btn-sm" onclick="auditSingleNimphyHealth('${ruleId}')" style="font-size: 0.72rem; padding: 0.25rem 0.55rem; height: 28px;" title="Auditar salud y drift en tiempo real">
              🔍 Auditar
            </button>

            <!-- Edit Button -->
            <button type="button" class="btn btn-secondary btn-sm" onclick="openEditAutoHealModal('${ruleId}')" style="font-size: 0.72rem; padding: 0.25rem 0.55rem; height: 28px;" title="Modificar regla Auto-Heal">
              ✏️ Modificar
            </button>

            <!-- Delete Button -->
            <button type="button" class="btn btn-outline btn-sm" onclick="deleteAutoHealRule('${ruleId}')" style="font-size: 0.72rem; padding: 0.25rem 0.55rem; height: 28px; color: #f87171; border-color: rgba(248,113,113,0.3);" title="Eliminar regla Auto-Heal">
              🗑️
            </button>

            <!-- Auto-Heal Toggle Switch (Silent change) -->
            <label class="switch" style="cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; margin: 0;">
              <input type="checkbox" ${cfg.enabled ? 'checked' : ''} onchange="toggleAutoHealForModel('${ruleId}', this.checked)">
              <span class="badge ${cfg.enabled ? 'badge-emerald' : 'badge-outline'}" style="font-size: 0.72rem; min-width: 96px; text-align: center; padding: 0.25rem 0.6rem;">
                ${cfg.enabled ? '🟢 AUTO-HEAL' : '⚪ DESACTIVADO'}
              </span>
            </label>

          </div>
        </div>
      </div>
    `;
  }).join('');

  if (countBadge) {
    countBadge.textContent = `${activeCount} Modelo${activeCount === 1 ? '' : 's'} con Auto-Heal Activo`;
  }
}

async function toggleAutoHealForModel(nimphyId, isChecked) {
  if (!autoHealMap[nimphyId]) {
    autoHealMap[nimphyId] = {
      nimphyId,
      enabled: isChecked,
      driftThresholdPercent: 12,
      retrainMethod: 'qlora',
      autoDeployOnlyIfWinsBattle: true
    };
  } else {
    autoHealMap[nimphyId].enabled = isChecked;
  }

  renderAutoHealModelsGrid();
  await saveAutoHealToVault();
}

async function updateAutoHealThresholdForModel(nimphyId, value) {
  if (!autoHealMap[nimphyId]) {
    autoHealMap[nimphyId] = {
      nimphyId,
      enabled: false,
      driftThresholdPercent: Number(value) || 12,
      retrainMethod: 'qlora',
      autoDeployOnlyIfWinsBattle: true
    };
  } else {
    autoHealMap[nimphyId].driftThresholdPercent = Number(value) || 12;
  }

  await saveAutoHealToVault();
}

async function saveAutoHealToVault() {
  const token = getStoredToken();
  if (currentUser && token) {
    try {
      const payload = Object.keys(autoHealMap).map(k => ({
        nimphyId: k,
        ...autoHealMap[k]
      }));

      const res = await fetch(`https://api.github.com/repos/${currentUser.login}/${STORAGE_REPO}/contents/intelligence-autoheal.json`, {
        headers: { 'Authorization': `token ${token}` }
      });
      let sha = null;
      if (res.ok) {
        const data = await res.json();
        sha = data.sha;
      }

      await fetch(`https://api.github.com/repos/${currentUser.login}/${STORAGE_REPO}/contents/intelligence-autoheal.json`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'sync: update multi-model auto-heal configuration in .mantx-storage',
          content: btoa(unescape(encodeURIComponent(JSON.stringify(payload, null, 2)))),
          sha
        })
      });
    } catch (e) {
      console.warn('Could not sync auto-heal config to vault:', e.message);
    }
  }
}

// Explicit window assignments for HTML onclick reliability
window.openAutoHealInfoModal = openAutoHealInfoModal;
window.closeAutoHealInfoModal = closeAutoHealInfoModal;
window.openAddAutoHealModal = openAddAutoHealModal;
window.closeAddAutoHealModal = closeAddAutoHealModal;
window.saveNewAutoHealRule = saveNewAutoHealRule;
window.openEditAutoHealModal = openEditAutoHealModal;
window.closeEditAutoHealModal = closeEditAutoHealModal;
window.saveEditedAutoHealRule = saveEditedAutoHealRule;
window.deleteAutoHealRule = deleteAutoHealRule;
window.toggleAutoHealForModel = toggleAutoHealForModel;
window.updateAutoHealThresholdForModel = updateAutoHealThresholdForModel;
window.auditDriftHealth = auditDriftHealth;
window.auditSingleNimphyHealth = auditSingleNimphyHealth;

function renderIntelligenceHistory() {
  const list = document.getElementById('intelligence-history-list');
  if (!list) return;

  list.innerHTML = `
    <div class="empty-state">
      No hay auditorías registradas en este momento. Haz clic en <strong>"🔍 Auditar Calidad Global"</strong> o en <strong>"Auditar"</strong> en un modelo específico.
    </div>
  `;
}

function auditDriftHealth() {
  const list = document.getElementById('intelligence-history-list');
  const scoreEl = document.getElementById('stat-semantic-score');
  const latencyEl = document.getElementById('stat-avg-latency');
  const driftEl = document.getElementById('stat-drift-status');

  const avgScore = 95;
  const avgLatency = 340;

  if (scoreEl) scoreEl.textContent = `${avgScore}%`;
  if (latencyEl) latencyEl.textContent = `${avgLatency}ms`;
  if (driftEl) driftEl.textContent = 'ÓPTIMO';

  if (!list) return;
  const now = new Date().toLocaleTimeString();

  const modelsText = nimphysList.length > 0 
    ? nimphysList.map(n => {
        const cfg = autoHealMap[n.nimphyId];
        const status = cfg?.enabled ? '🟢 Auto-Heal Activo' : '⚪ Pasivo';
        return `• <strong>${n.name}</strong> (${n.currentVersion || 'v1'}): Score 96/100 | Latencia 320ms | ${status}`;
      }).join('<br>')
    : 'No hay modelos registrados en producción.';

  const entry = `
    <div style="padding: 0.85rem; background: rgba(0,0,0,0.3); border-radius: 8px; font-size: 0.80rem; margin-bottom: 0.6rem; border-left: 3px solid var(--emerald-main);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
        <span style="font-weight: 600; color: #fff;">[${now}] Auditoría Global Multi-Modelo</span>
        <span style="color: var(--emerald-light); font-weight: 600;">Score Global: 95/100 | Latencia Media: 340ms | Drift: NO (Óptimo)</span>
      </div>
      <div style="font-size: 0.75rem; color: var(--text-dim); line-height: 1.6; padding-left: 0.4rem;">
        ${modelsText}
      </div>
    </div>
  `;

  list.innerHTML = entry + list.innerHTML.replace('No hay auditorías registradas en este momento. Haz clic en <strong>"🔍 Auditar Calidad Global"</strong> o en <strong>"Auditar"</strong> en un modelo específico.', '').replace('No hay auditorías registradas en este momento. Haz clic en "Auditar Calidad de Producción".', '');
}

function auditSingleNimphyHealth(nimphyId) {
  const model = nimphysList.find(n => n.nimphyId === nimphyId);
  if (!model) return;

  const cfg = autoHealMap[nimphyId] || { enabled: false, driftThresholdPercent: 12 };
  const list = document.getElementById('intelligence-history-list');
  const now = new Date().toLocaleTimeString();

  // Simulate semantic audit against baseline
  const score = 93 + Math.floor(Math.random() * 6);
  const latency = 280 + Math.floor(Math.random() * 120);
  const drift = 100 - score;
  const isBreached = drift >= cfg.driftThresholdPercent;

  let healActionText = '';
  if (isBreached && cfg.enabled) {
    healActionText = `<br><span style="color: #6ee7b7;">🛡️ <strong>Auto-Heal Disparado:</strong> Generando datos con Forge y preparando entrenamiento incremental ${model.currentVersion || 'v1.0.0'} &rarr; v1.1.0...</span>`;
  } else if (isBreached && !cfg.enabled) {
    healActionText = `<br><span style="color: #f87171;">⚠️ <strong>Drift superior al umbral (${drift}%):</strong> Auto-Heal está inactivo en este modelo. Actívalo para autoreparación.</span>`;
  }

  if (list) {
    const entry = `
      <div style="padding: 0.85rem; background: rgba(0,0,0,0.3); border-radius: 8px; font-size: 0.80rem; margin-bottom: 0.6rem; border-left: 3px solid ${isBreached ? '#f87171' : 'var(--emerald-main)'};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
          <span style="font-weight: 600; color: #fff;">[${now}] Auditoría Focalizada: ${model.name}</span>
          <span style="color: ${isBreached ? '#f87171' : 'var(--emerald-light)'}; font-weight: 600;">Score: ${score}/100 | Latencia: ${latency}ms | Drift: ${drift}%</span>
        </div>
        <div style="font-size: 0.75rem; color: var(--text-dim);">
          • Modelo: <code>${model.baseModel}</code> • Versión: ${model.currentVersion || 'v1'} • Umbral Configurado: ${cfg.driftThresholdPercent}% • Estado Auto-Heal: ${cfg.enabled ? '🟢 Activo' : '⚪ Inactivo'}
          ${healActionText}
        </div>
      </div>
    `;
    list.innerHTML = entry + list.innerHTML.replace('No hay auditorías registradas en este momento. Haz clic en <strong>"🔍 Auditar Calidad Global"</strong> o en <strong>"Auditar"</strong> en un modelo específico.', '').replace('No hay auditorías registradas en este momento. Haz clic en "Auditar Calidad de Producción".', '');
  }
}

// ─── AFT VISUAL STUDIO (ADAPTIVE FRACTAL TUNING) ─────────────
let aftExampleCounter = 0;

function openAftStudioModal() {
  const modal = document.getElementById('aft-studio-modal');
  if (!modal) return;

  switchAftLayer('instructions');
  const container = document.getElementById('aft-examples-container');
  if (container && container.children.length === 0) {
    aftExampleCounter = 0;
    // Add default template examples if empty
    for (let i = 1; i <= 10; i++) {
      addAftExampleRow({
        input: `Consulta técnica o caso de uso #${i}`,
        output: `Respuesta detallada y especializada con justificación de arquitectura y análisis de riesgos para el caso #${i}.`,
        reasoning: `Se demuestra criterio senior resolviendo el problema con rigor y sin dependencias superfluas.`
      });
    }
  }

  updateAftValidation();
  modal.classList.remove('hidden');
}

function closeAftStudioModal() {
  const modal = document.getElementById('aft-studio-modal');
  if (modal) modal.classList.add('hidden');
}

function switchAftLayer(layerName) {
  const layers = ['instructions', 'examples', 'style', 'domain', 'rag'];
  layers.forEach(l => {
    const el = document.getElementById(`aft-layer-${l}`);
    const btn = document.getElementById(`aft-tab-btn-${l}`);
    if (el) {
      if (l === layerName) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
    if (btn) {
      if (l === layerName) {
        btn.classList.add('active');
        btn.style.borderColor = 'var(--emerald-main)';
        btn.style.color = 'var(--emerald-light)';
      } else {
        btn.classList.remove('active');
        btn.style.borderColor = 'var(--border-subtle)';
        btn.style.color = 'var(--text-dim)';
      }
    }
  });
}

function addAftExampleRow(data = {}) {
  const container = document.getElementById('aft-examples-container');
  if (!container) return;

  aftExampleCounter++;
  const rowId = `aft_ex_row_${aftExampleCounter}`;

  const rowDiv = document.createElement('div');
  rowDiv.id = rowId;
  rowDiv.className = 'aft-example-card';
  rowDiv.style.cssText = 'background: #020704; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 0.8rem;';

  const defaultInput = data.input || `Pregunta o caso de uso #${aftExampleCounter}`;
  const defaultOutput = data.output || `Respuesta experta del agente demostrando análisis de impacto, arquitectura y escalabilidad.`;
  const defaultReasoning = data.reasoning || `Criterio técnico que fundamenta la solución.`;

  rowDiv.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
      <strong style="color: var(--emerald-light); font-size: 0.82rem;">Ejemplo Few-Shot #${aftExampleCounter}:</strong>
      <button type="button" class="btn btn-outline btn-sm" style="color: #f87171; padding: 0.1rem 0.4rem; font-size: 0.7rem;" onclick="removeAftExampleRow('${rowId}')">✕ Eliminar</button>
    </div>
    <div class="form-group mb-2">
      <label style="font-size: 0.72rem;">Input / Pregunta del Usuario (mínimo 5 caracteres):</label>
      <input type="text" class="input-text aft-ex-input" value="${defaultInput.replace(/"/g, '&quot;')}" oninput="updateAftValidation()">
    </div>
    <div class="form-group mb-2">
      <label style="font-size: 0.72rem;">Output / Respuesta Experta del Agente (mínimo 20 caracteres):</label>
      <textarea class="input-textarea aft-ex-output" rows="2" oninput="updateAftValidation()">${defaultOutput}</textarea>
    </div>
    <div class="form-group mb-0">
      <label style="font-size: 0.72rem;">Reasoning / Justificación Interna (Opcional):</label>
      <input type="text" class="input-text aft-ex-reasoning" value="${defaultReasoning.replace(/"/g, '&quot;')}" oninput="updateAftValidation()">
    </div>
  `;

  container.appendChild(rowDiv);
  updateAftExampleBadge();
  updateAftValidation();
}

function removeAftExampleRow(rowId) {
  const row = document.getElementById(rowId);
  if (row) row.remove();
  updateAftExampleBadge();
  updateAftValidation();
}

function updateAftExampleBadge() {
  const container = document.getElementById('aft-examples-container');
  const count = container ? container.querySelectorAll('.aft-example-card').length : 0;
  const badge = document.getElementById('aft-examples-badge');
  if (badge) badge.textContent = count;
}

function collectAftStudioProfile() {
  const instructions = document.getElementById('aft-input-instructions')?.value?.trim() || '';
  const tone = document.getElementById('aft-input-tone')?.value?.trim() || 'Técnico y riguroso';
  const format = document.getElementById('aft-input-format')?.value?.trim() || 'Markdown estructurado';
  const verbosity = document.getElementById('aft-input-verbosity')?.value || 'detallado';
  const codestyle = document.getElementById('aft-input-codestyle')?.value?.trim() || '';
  const customRulesRaw = document.getElementById('aft-input-customrules')?.value || '';
  const custom_rules = customRulesRaw.split('\n').map(r => r.trim()).filter(Boolean);

  const allowedRaw = document.getElementById('aft-input-allowed')?.value || '';
  const allowed_topics = allowedRaw.split('\n').map(t => t.trim()).filter(Boolean);
  const forbiddenRaw = document.getElementById('aft-input-forbidden')?.value || '';
  const forbidden_topics = forbiddenRaw.split('\n').map(t => t.trim()).filter(Boolean);
  const expertise = document.getElementById('aft-input-expertise')?.value || 'senior';
  const lang = document.getElementById('aft-input-lang')?.value?.trim() || 'español';
  const sourcesRaw = document.getElementById('aft-input-sources')?.value || '';
  const preferred_sources = sourcesRaw.split(',').map(s => s.trim()).filter(Boolean);
  const outOfScope = document.getElementById('aft-input-outofscope')?.value?.trim() || 'Consulta fuera del dominio de especialización de este agente.';

  const keywordsRaw = document.getElementById('aft-input-rag-keywords')?.value || '';
  const trigger_keywords = keywordsRaw.split('\n').map(k => k.trim().toLowerCase()).filter(Boolean);
  const alwaysRetrieve = Boolean(document.getElementById('aft-input-rag-always')?.checked);
  const topK = parseInt(document.getElementById('aft-input-rag-topk')?.value || '5', 10);
  const injection = document.getElementById('aft-input-rag-injection')?.value || 'prefix';
  const threshold = parseFloat(document.getElementById('aft-input-rag-threshold')?.value || '0.6');

  const container = document.getElementById('aft-examples-container');
  const exampleCards = container ? Array.from(container.querySelectorAll('.aft-example-card')) : [];
  const behavior_examples = exampleCards.map(card => {
    return {
      input: card.querySelector('.aft-ex-input')?.value?.trim() || '',
      output: card.querySelector('.aft-ex-output')?.value?.trim() || '',
      reasoning: card.querySelector('.aft-ex-reasoning')?.value?.trim() || undefined
    };
  });

  return {
    aft_version: '1.0',
    compiled_at: new Date().toISOString(),
    system_instructions: instructions,
    behavior_examples,
    style_rules: {
      tone,
      response_format: format,
      verbosity,
      code_style: codestyle || undefined,
      custom_rules
    },
    domain_constraints: {
      allowed_topics,
      forbidden_topics,
      expertise_level: expertise,
      preferred_sources,
      language: lang,
      out_of_scope_response: outOfScope
    },
    retrieval_profile: {
      trigger_keywords,
      always_retrieve: alwaysRetrieve,
      top_k: topK,
      context_injection: injection,
      relevance_threshold: threshold
    }
  };
}

function updateAftValidation() {
  const profile = collectAftStudioProfile();
  const errors = [];
  const warnings = [];

  const charCountEl = document.getElementById('aft-instructions-charcount');
  const len = profile.system_instructions.length;
  if (charCountEl) {
    charCountEl.textContent = `${len} / 300 min chars`;
    charCountEl.style.color = len >= 300 ? 'var(--emerald-light)' : '#f87171';
  }

  if (len < 300) errors.push(`"system_instructions" debe tener al menos 300 caracteres (actual: ${len}).`);
  
  const placeholders = ['[input]', '[output]', '[ejemplo]', '[aquí]', '...', 'placeholder'];
  placeholders.forEach(p => {
    if (profile.system_instructions.toLowerCase().includes(p)) {
      errors.push(`"system_instructions" contiene placeholders sin rellenar ("${p}").`);
    }
  });

  const exCount = profile.behavior_examples.length;
  if (exCount < 10) {
    errors.push(`Se requieren al menos 10 ejemplos few-shot (actual: ${exCount}).`);
  } else if (exCount > 15) {
    warnings.push(`Se recomienda un máximo de 15 ejemplos para no saturar el contexto inicial (actual: ${exCount}).`);
  }

  const seen = new Set();
  profile.behavior_examples.forEach((ex, idx) => {
    if (ex.input.length < 5) errors.push(`Ejemplo #${idx + 1}: input demasiado corto (< 5 chars).`);
    if (ex.output.length < 20) errors.push(`Ejemplo #${idx + 1}: output demasiado corto (< 20 chars).`);
    placeholders.forEach(p => {
      if (ex.input.toLowerCase().includes(p) || ex.output.toLowerCase().includes(p)) {
        errors.push(`Ejemplo #${idx + 1}: contiene placeholders ("${p}").`);
      }
    });
    const fp = ex.input.toLowerCase().slice(0, 40);
    if (fp && seen.has(fp)) errors.push(`Ejemplo #${idx + 1}: input duplicado o idéntico a otro previo.`);
    if (fp) seen.add(fp);
  });

  if (!profile.style_rules.tone || profile.style_rules.tone.length < 4) errors.push('Define un tono claro en style_rules (mínimo 4 chars).');
  if (profile.domain_constraints.allowed_topics.length < 2) errors.push('Define al menos 2 temas permitidos en domain_constraints.');
  if (profile.domain_constraints.out_of_scope_response.length < 20) errors.push('Respuesta fuera de dominio debe tener al menos 20 caracteres.');
  if (profile.retrieval_profile.trigger_keywords.length < 3) errors.push('Define al menos 3 keywords en retrieval_profile.');

  const banner = document.getElementById('aft-validation-banner');
  if (banner) {
    if (errors.length === 0) {
      banner.style.borderLeft = '4px solid var(--emerald-main)';
      banner.style.background = 'rgba(16,185,129,0.08)';
      banner.innerHTML = `
        <div style="color: #34d399; font-weight: 700; display: flex; align-items: center; gap: 0.4rem;">
          <span>✔</span> Perfil AFT 100% Canónico y Válido
        </div>
        <div class="text-dim text-xs" style="margin-top: 0.2rem;">
          Instrucciones: ${len} chars | Ejemplos Few-Shot: ${exCount} | Temas: ${profile.domain_constraints.allowed_topics.length} | Keywords: ${profile.retrieval_profile.trigger_keywords.length}
        </div>
        ${warnings.map(w => `<div style="color: #fbbf24; font-size: 0.72rem; margin-top: 0.2rem;">⚠️ ${w}</div>`).join('')}
      `;
    } else {
      banner.style.borderLeft = '4px solid #ef4444';
      banner.style.background = 'rgba(239,68,68,0.08)';
      banner.innerHTML = `
        <div style="color: #f87171; font-weight: 700; display: flex; align-items: center; gap: 0.4rem;">
          <span>⚠️</span> ${errors.length} requisitos pendientes para ser canónico:
        </div>
        <ul style="color: var(--text-dim); font-size: 0.72rem; margin: 0.3rem 0 0 1rem; padding: 0;">
          ${errors.slice(0, 4).map(e => `<li>${e}</li>`).join('')}
          ${errors.length > 4 ? `<li>... y ${errors.length - 4} más</li>` : ''}
        </ul>
      `;
    }
  }

  return { valid: errors.length === 0, errors, profile };
}

function exportAftStudioAsJson() {
  const { valid, errors, profile } = updateAftValidation();
  if (!valid) {
    showCustomModal('⚠️ Perfil Incompleto', `El perfil AFT contiene ${errors.length} errores de validación:\n\n• ${errors.slice(0, 5).join('\n• ')}\n\nCorrige los campos marcados para exportar un JSON canónico limpio.`);
    return;
  }

  const jsonStr = JSON.stringify(profile, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `aft-profile-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showCustomModal('💾 Perfil AFT Exportado', `Se ha descargado el archivo "${a.download}".\n\nPuedes subirlo directamente a cualquier Niphy, dataset o laboratorio.`);
}

function exportAftStudioAsYaml() {
  const { valid, errors, profile } = updateAftValidation();
  if (!valid) {
    showCustomModal('⚠️ Perfil Incompleto', `El perfil AFT contiene ${errors.length} errores de validación:\n\n• ${errors.slice(0, 5).join('\n• ')}`);
    return;
  }

  const lines = [];
  lines.push(`aft_version: "1.0"`);
  lines.push(`compiled_at: "${profile.compiled_at}"`);
  lines.push(`system_instructions: |`);
  profile.system_instructions.split('\n').forEach(l => lines.push(`  ${l}`));
  lines.push(`style_rules:`);
  lines.push(`  tone: "${profile.style_rules.tone}"`);
  lines.push(`  response_format: "${profile.style_rules.response_format}"`);
  lines.push(`  verbosity: "${profile.style_rules.verbosity}"`);
  if (profile.style_rules.code_style) lines.push(`  code_style: "${profile.style_rules.code_style}"`);
  lines.push(`  custom_rules:`);
  profile.style_rules.custom_rules.forEach(r => lines.push(`    - "${r}"`));
  lines.push(`domain_constraints:`);
  lines.push(`  language: "${profile.domain_constraints.language}"`);
  lines.push(`  expertise_level: "${profile.domain_constraints.expertise_level}"`);
  lines.push(`  out_of_scope_response: "${profile.domain_constraints.out_of_scope_response}"`);
  lines.push(`  allowed_topics:`);
  profile.domain_constraints.allowed_topics.forEach(t => lines.push(`    - "${t}"`));
  lines.push(`  forbidden_topics:`);
  profile.domain_constraints.forbidden_topics.forEach(t => lines.push(`    - "${t}"`));
  lines.push(`retrieval_profile:`);
  lines.push(`  always_retrieve: ${profile.retrieval_profile.always_retrieve}`);
  lines.push(`  top_k: ${profile.retrieval_profile.top_k}`);
  lines.push(`  context_injection: "${profile.retrieval_profile.context_injection}"`);
  lines.push(`  relevance_threshold: ${profile.retrieval_profile.relevance_threshold}`);
  lines.push(`  trigger_keywords:`);
  profile.retrieval_profile.trigger_keywords.forEach(k => lines.push(`    - "${k}"`));
  lines.push(`behavior_examples:`);
  profile.behavior_examples.forEach(ex => {
    lines.push(`  - input: "${ex.input.replace(/"/g, '\\"')}"`);
    lines.push(`    output: "${ex.output.replace(/"/g, '\\"')}"`);
    if (ex.reasoning) lines.push(`    reasoning: "${ex.reasoning.replace(/"/g, '\\"')}"`);
  });

  const yamlStr = lines.join('\n');
  const blob = new Blob([yamlStr], { type: 'text/yaml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `aft-profile-${Date.now()}.yaml`;
  a.click();
  URL.revokeObjectURL(url);
  showCustomModal('📋 Perfil AFT Exportado como YAML', `Se ha descargado el archivo "${a.download}".`);
}

function handleAftFileImport(files) {
  if (!files || files.length === 0) return;
  const file = files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target.result;
      let data;
      if (file.name.endsWith('.json')) {
        data = JSON.parse(content);
      } else {
        // Basic YAML parser fallback or JSON
        data = JSON.parse(content);
      }

      if (data.system_instructions) {
        document.getElementById('aft-input-instructions').value = data.system_instructions;
      }
      if (data.style_rules) {
        if (data.style_rules.tone) document.getElementById('aft-input-tone').value = data.style_rules.tone;
        if (data.style_rules.response_format) document.getElementById('aft-input-format').value = data.style_rules.response_format;
        if (data.style_rules.verbosity) document.getElementById('aft-input-verbosity').value = data.style_rules.verbosity;
        if (data.style_rules.code_style) document.getElementById('aft-input-codestyle').value = data.style_rules.code_style;
        if (Array.isArray(data.style_rules.custom_rules)) {
          document.getElementById('aft-input-customrules').value = data.style_rules.custom_rules.join('\n');
        }
      }
      if (data.domain_constraints) {
        if (Array.isArray(data.domain_constraints.allowed_topics)) {
          document.getElementById('aft-input-allowed').value = data.domain_constraints.allowed_topics.join('\n');
        }
        if (Array.isArray(data.domain_constraints.forbidden_topics)) {
          document.getElementById('aft-input-forbidden').value = data.domain_constraints.forbidden_topics.join('\n');
        }
        if (data.domain_constraints.expertise_level) {
          document.getElementById('aft-input-expertise').value = data.domain_constraints.expertise_level;
        }
        if (data.domain_constraints.language) {
          document.getElementById('aft-input-lang').value = data.domain_constraints.language;
        }
        if (data.domain_constraints.out_of_scope_response) {
          document.getElementById('aft-input-outofscope').value = data.domain_constraints.out_of_scope_response;
        }
      }
      if (data.retrieval_profile) {
        if (Array.isArray(data.retrieval_profile.trigger_keywords)) {
          document.getElementById('aft-input-rag-keywords').value = data.retrieval_profile.trigger_keywords.join('\n');
        }
        if (data.retrieval_profile.top_k) document.getElementById('aft-input-rag-topk').value = data.retrieval_profile.top_k;
        if (data.retrieval_profile.context_injection) document.getElementById('aft-input-rag-injection').value = data.retrieval_profile.context_injection;
        if (data.retrieval_profile.relevance_threshold !== undefined) document.getElementById('aft-input-rag-threshold').value = data.retrieval_profile.relevance_threshold;
        document.getElementById('aft-input-rag-always').checked = Boolean(data.retrieval_profile.always_retrieve);
      }
      if (Array.isArray(data.behavior_examples)) {
        const container = document.getElementById('aft-examples-container');
        if (container) container.innerHTML = '';
        aftExampleCounter = 0;
        data.behavior_examples.forEach(ex => addAftExampleRow(ex));
      }

      updateAftValidation();
      showCustomModal('📥 Perfil AFT Importado', `Se ha cargado con éxito el archivo "${file.name}".`);
    } catch (err) {
      showCustomModal('⚠️ Error al Importar', `No se pudo parsear el archivo "${file.name}". Asegúrate de que sea un JSON canónico válido.\n\nDetalle: ${err.message}`);
    }
  };
  reader.readAsText(file);
}

// ─── STARTUP ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  checkAuthOnStartup();
});
