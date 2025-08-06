// <define:PARSER_NAMES>
var define_PARSER_NAMES_default = ["A2OnlineJudgeProblemParser", "A2OnlineJudgeContestParser", "ACMPProblemParser", "AcWingProblemParser", "AizuOnlineJudgeProblemParser", "AizuOnlineJudgeBetaProblemParser", "AlgotesterProblemParser", "AlgoZenithNewProblemParser", "AlgoZenithOldProblemParser", "AnarchyGolfProblemParser", "AtCoderProblemParser", "AtCoderContestParser", "BaekjoonOnlineJudgeProblemParser", "BAPSOJProblemParser", "BAPSOJContestParser", "BeecrowdProblemParser", "BeecrowdContestParser", "BloombergCodeConProblemParser", "BUCTOJProblemParser", "BUCTOJContestParser", "CodeChefNewProblemParser", "CodeChefOldProblemParser", "CodeChefContestParser", "CodeDrillsProblemParser", "CodeforcesProblemParser", "CodeforcesContestParser", "CodeMarshalProblemParser", "CodeMarshalContestParser", "CodeRunProblemParser", "CodeRunContestParser", "CodeUpProblemParser", "COJProblemParser", "COJContestParser", "ContestHunterProblemParser", "ContestHunterContestParser", "CPythonUZProblemParser", "CPythonUZContestParser", "CSAcademyProblemParser", "CSESProblemParser", "CSESContestParser", "CSUACMOnlineJudgeProblemParser", "CSUACMOnlineJudgeContestParser", "DimikOJProblemParser", "DMOJProblemParser", "DMOJContestParser", "DOMjudgeContestParser", "ECNUOnlineJudgeProblemParser", "ECNUOnlineJudgeContestParser", "EolympNormalProblemParser", "EolympBasecampProblemParser", "EolympNormalContestParser", "EolympBasecampContestParser", "FZUOnlineJudgeProblemParser", "FZUOnlineJudgeContestParser", "GoogleCodingCompetitionsProblemParser", "HackerEarthProblemParser", "HackerEarthCodeArenaParser", "HackerEarthContestParser", "HackerRankProblemParser", "HackerRankContestParser", "HDOJNewProblemParser", "HDOJProblemParser", "HDOJNewContestParser", "HDOJContestParser", "HITOnlineJudgeProblemParser", "HihoCoderProblemParser", "HihoCoderContestParser", "HKOIOnlineJudgeProblemParser", "HKOIOnlineJudgeContestParser", "HrbustOnlineJudgeProblemParser", "HydroProblemParser", "HydroContestParser", "InfoArenaProblemParser", "ITCoderHUTECHProblemParser", "JutgeProblemParser", "KattisProblemParser", "KattisContestParser", "KEPUZProblemParser", "KEPUZContestParser", "KilonovaProblemParser", "KilonovaContestParser", "LanqiaoProblemParser", "LanqiaoContestParser", "LibraryCheckerProblemParser", "LibraryCheckerOldProblemParser", "LibreOJProblemParser", "LibreOJContestParser", "LightOJProblemParser", "LightOJContestParser", "LSYOIProblemParser", "LuoguProblemParser", "LuoguContestParser", "MarisaOJProblemParser", "MendoProblemParser", "MetaCodingCompetitionsProblemParser", "MrJudgeProblemParser", "MSKInformaticsProblemParser", "NBUTOnlineJudgeProblemParser", "NBUTOnlineJudgeContestParser", "NepsAcademyProblemParser", "NewtonSchoolProblemParser", "NOJProblemParser", "NOJContestParser", "NowCoderProblemParser", "OmegaUpProblemParser", "OpenJudgeProblemParser", "OpenJudgeContestParser", "OTOGProblemParser", "PandaOnlineJudgeProblemParser", "PBInfoProblemParser", "PEGJudgeProblemParser", "PEGJudgeContestParser", "POJProblemParser", "POJContestParser", "PTAProblemParser", "QBXTOJProblemParser", "QDUOJProblemParser", "QDUOJContestParser", "QQWhaleProblemParser", "RoboContestProblemParser", "RoboContestContestParser", "SDUTOnlineJudgeProblemParser", "SeriousOJProblemParser", "SeriousOJContestParser", "SortMeProblemParser", "SPOJProblemParser", "SSOIERProblemParser", "StarryCodingProblemParser", "TheJobOverflowProblemParser", "TimusOnlineJudgeProblemParser", "TimusOnlineJudgeContestParser", "TLXProblemParser", "TLXContestParser", "TophProblemParser", "UDebugProblemParser", "UniversalCupProblemParser", "UniversalCupContestParser", "UOJProblemParser", "UOJContestParser", "USACOProblemParser", "USACOTrainingProblemParser", "UVaOnlineJudgeProblemParser", "VirtualJudgeProblemParser", "VirtualJudgeContestParser", "XCampProblemParser", "XXMProblemParser", "YandexProblemParser", "YandexContestParser", "YukicoderProblemParser", "YukicoderContestParser", "ZOJProblemParser", "ZUFEOJProblemParser", "ZUFEOJContestParser"];

// node_modules/.pnpm/yocto-queue@1.2.1/node_modules/yocto-queue/index.js
var Node = class {
  value;
  next;
  constructor(value) {
    this.value = value;
  }
};
var Queue = class {
  #head;
  #tail;
  #size;
  constructor() {
    this.clear();
  }
  enqueue(value) {
    const node = new Node(value);
    if (this.#head) {
      this.#tail.next = node;
      this.#tail = node;
    } else {
      this.#head = node;
      this.#tail = node;
    }
    this.#size++;
  }
  dequeue() {
    const current = this.#head;
    if (!current) {
      return;
    }
    this.#head = this.#head.next;
    this.#size--;
    return current.value;
  }
  peek() {
    if (!this.#head) {
      return;
    }
    return this.#head.value;
  }
  clear() {
    this.#head = void 0;
    this.#tail = void 0;
    this.#size = 0;
  }
  get size() {
    return this.#size;
  }
  *[Symbol.iterator]() {
    let current = this.#head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
  *drain() {
    while (this.#head) {
      yield this.dequeue();
    }
  }
};

// node_modules/.pnpm/p-limit@6.2.0/node_modules/p-limit/index.js
function pLimit(concurrency) {
  validateConcurrency(concurrency);
  const queue = new Queue();
  let activeCount = 0;
  const resumeNext = () => {
    if (activeCount < concurrency && queue.size > 0) {
      queue.dequeue()();
      activeCount++;
    }
  };
  const next = () => {
    activeCount--;
    resumeNext();
  };
  const run = async (function_, resolve, arguments_) => {
    const result = (async () => function_(...arguments_))();
    resolve(result);
    try {
      await result;
    } catch {
    }
    next();
  };
  const enqueue = (function_, resolve, arguments_) => {
    new Promise((internalResolve) => {
      queue.enqueue(internalResolve);
    }).then(
      run.bind(void 0, function_, resolve, arguments_)
    );
    (async () => {
      await Promise.resolve();
      if (activeCount < concurrency) {
        resumeNext();
      }
    })();
  };
  const generator = (function_, ...arguments_) => new Promise((resolve) => {
    enqueue(function_, resolve, arguments_);
  });
  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount
    },
    pendingCount: {
      get: () => queue.size
    },
    clearQueue: {
      value() {
        queue.clear();
      }
    },
    concurrency: {
      get: () => concurrency,
      set(newConcurrency) {
        validateConcurrency(newConcurrency);
        concurrency = newConcurrency;
        queueMicrotask(() => {
          while (activeCount < concurrency && queue.size > 0) {
            resumeNext();
          }
        });
      }
    }
  });
  return generator;
}
function validateConcurrency(concurrency) {
  if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
  }
}

// src/utils/browser.ts
var browser = typeof globalThis.browser !== "undefined" ? globalThis.browser : globalThis.chrome;

// src/utils/config.ts
var Config = class {
  defaults = {
    customPorts: [],
    customRules: [],
    requestTimeout: 500,
    debugMode: false
  };
  async get(key) {
    const data = await browser.storage.local.get(key);
    return data[key] || this.defaults[key];
  }
  set(key, value) {
    return browser.storage.local.set({ [key]: value });
  }
};
var config = new Config();

// src/hosts/Host.ts
var Host = class {
  async doSend(url, options) {
    const requestTimeout = await config.get("requestTimeout");
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), requestTimeout);
    try {
      await fetch(url, {
        method: "POST",
        signal: abortController.signal,
        ...options
      });
    } catch (err) {
    }
  }
};

// src/hosts/CHelperHost.ts
var CHelperHost = class extends Host {
  async send(data) {
    await this.doSend("http://localhost:4243/", {
      body: `json
${data}`
    });
  }
};

// src/hosts/CustomHost.ts
var CustomHost = class extends Host {
  constructor(port) {
    super();
    this.port = port;
  }
  async send(data) {
    await this.doSend(`http://localhost:${this.port}/`, {
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

// src/hosts/hosts.ts
var defaultHosts = [new CHelperHost()];
var defaultPorts = [
  1327,
  // cpbooster
  4244,
  // Hightail
  6174,
  // Mind Sport
  10042,
  // acmX
  10043,
  // Caide and AI Virtual Assistant
  10045,
  // CP Editor
  27121
  // Competitive Programming Helper
];
async function getHosts() {
  const customPorts = await config.get("customPorts");
  const uniquePorts = [...new Set(defaultPorts.concat(customPorts))];
  return defaultHosts.concat(uniquePorts.map((port) => new CustomHost(port)));
}

// src/utils/noop.ts
function noop() {
}

// src/utils/messaging.ts
function sendToContent(tabId, action, payload = {}) {
  browser.tabs.sendMessage(tabId, { action, payload }).then(noop).catch(noop);
}

// package.json
var version = "2.60.0";

// src/utils/request.ts
var requiredPermissions = {
  "https://codingcompetitions.withgoogle.com/": "https://codejam.googleapis.com/dashboard/get_file/*",
  "https://tlx.toki.id/": "https://api.tlx.toki.id/v2/*",
  "https://judge.beecrowd.com/": "https://resources.beecrowd.com/*"
};
var defaultHeaders = {
  "X-Competitive-Companion": version
};
async function request(url, options = {}, retries = 3) {
  options.headers = { ...defaultHeaders, ...options.headers };
  const response = await fetch(url, { credentials: "include", ...options });
  if (response.ok && response.status === 200) {
    return response.text();
  }
  if (retries > 0) {
    await new Promise((resolve) => setTimeout(resolve, 2e3 - 500 * retries));
    return request(url, options, retries - 1);
  }
  throw new Error(`The network response was not ok (status code: ${response.status}, url: ${url}).`);
}

// src/background.ts
function createContextMenu() {
  browser.contextMenus.create({
    id: "parse-with",
    title: "Parse with",
    contexts: ["action"]
  });
  browser.contextMenus.create({
    id: "problem-parser",
    parentId: "parse-with",
    title: "Problem parser",
    contexts: ["action"]
  });
  browser.contextMenus.create({
    id: "contest-parser",
    parentId: "parse-with",
    title: "Contest parser",
    contexts: ["action"]
  });
  for (const parser of define_PARSER_NAMES_default) {
    const isContestParser = parser.endsWith("ContestParser");
    browser.contextMenus.create({
      id: `parse-with-${parser}`,
      parentId: `${isContestParser ? "contest" : "problem"}-parser`,
      title: parser,
      contexts: ["action"]
    });
  }
}
async function loadContentScript(tab, parserName) {
  const permissionOrigins = ["http://localhost/"];
  for (const prefix in requiredPermissions) {
    if (tab.url.startsWith(prefix)) {
      permissionOrigins.push(requiredPermissions[prefix]);
    }
  }
  if (permissionOrigins.length > 0) {
    await browser.permissions.request({ origins: permissionOrigins });
  }
  await browser.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    files: ["js/content.js"]
  });
  sendToContent(tab.id, 0 /* Parse */, { parserName });
}
function onAction(tab) {
  loadContentScript(tab, null);
}
function onContextMenu(info, tab) {
  if (info.menuItemId.toString().startsWith("parse-with-")) {
    const parserName = info.menuItemId.toString().split("parse-with-").pop();
    loadContentScript(tab, parserName);
  }
}
async function sendTask(tabId, messageId, data) {
  const permissionGranted = await browser.permissions.contains({ origins: ["http://localhost/"] });
  if (!permissionGranted) {
    sendToContent(tabId, 3 /* SendTaskFailed */, {
      messageId,
      message: "Competitive Companion does not have permission to send problems to localhost"
    });
    return;
  }
  try {
    const hosts = await getHosts();
    const limit = pLimit(6);
    const requests = hosts.map((host) => limit(() => host.send(data)));
    try {
      await Promise.allSettled(requests);
    } catch (err) {
    }
    sendToContent(tabId, 2 /* SendTaskDone */, { messageId });
  } catch (err) {
    const message = err instanceof Error ? err.message : `${err}`;
    sendToContent(tabId, 3 /* SendTaskFailed */, { messageId, message });
  }
}
async function makeRequest(tabId, messageId, url, options, retries) {
  const permissionGranted = await browser.permissions.contains({ origins: [url] });
  if (!permissionGranted) {
    sendToContent(tabId, 6 /* FetchFailed */, {
      messageId,
      message: `Competitive Companion does not have permission to request ${url}`
    });
    return;
  }
  try {
    const content = await request(url, options, retries);
    sendToContent(tabId, 5 /* FetchResult */, { messageId, content });
  } catch (err) {
    const message = err instanceof Error ? err.message : `${err}`;
    sendToContent(tabId, 6 /* FetchFailed */, { messageId, message });
  }
}
async function handleMessage(message, sender) {
  if (!sender.tab) {
    return;
  }
  if (message.action === 1 /* SendTask */) {
    sendTask(sender.tab.id, message.payload.messageId, message.payload.message);
  } else if (message.action === 4 /* Fetch */) {
    makeRequest(
      sender.tab.id,
      message.payload.messageId,
      message.payload.url,
      message.payload.options,
      message.payload.retries
    );
  }
}
browser.action.onClicked.addListener(onAction);
browser.contextMenus.onClicked.addListener(onContextMenu);
browser.runtime.onMessage.addListener(handleMessage);
browser.runtime.onInstalled.addListener(createContextMenu);
