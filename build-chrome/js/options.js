// <define:PARSER_NAMES>
var define_PARSER_NAMES_default = ["A2OnlineJudgeProblemParser", "A2OnlineJudgeContestParser", "ACMPProblemParser", "AcWingProblemParser", "AizuOnlineJudgeProblemParser", "AizuOnlineJudgeBetaProblemParser", "AlgotesterProblemParser", "AlgoZenithNewProblemParser", "AlgoZenithOldProblemParser", "AnarchyGolfProblemParser", "AtCoderProblemParser", "AtCoderContestParser", "BaekjoonOnlineJudgeProblemParser", "BAPSOJProblemParser", "BAPSOJContestParser", "BeecrowdProblemParser", "BeecrowdContestParser", "BloombergCodeConProblemParser", "BUCTOJProblemParser", "BUCTOJContestParser", "CodeChefNewProblemParser", "CodeChefOldProblemParser", "CodeChefContestParser", "CodeDrillsProblemParser", "CodeforcesProblemParser", "CodeforcesContestParser", "CodeMarshalProblemParser", "CodeMarshalContestParser", "CodeRunProblemParser", "CodeRunContestParser", "CodeUpProblemParser", "COJProblemParser", "COJContestParser", "ContestHunterProblemParser", "ContestHunterContestParser", "CPythonUZProblemParser", "CPythonUZContestParser", "CSAcademyProblemParser", "CSESProblemParser", "CSESContestParser", "CSUACMOnlineJudgeProblemParser", "CSUACMOnlineJudgeContestParser", "DimikOJProblemParser", "DMOJProblemParser", "DMOJContestParser", "DOMjudgeContestParser", "ECNUOnlineJudgeProblemParser", "ECNUOnlineJudgeContestParser", "EolympNormalProblemParser", "EolympBasecampProblemParser", "EolympNormalContestParser", "EolympBasecampContestParser", "FZUOnlineJudgeProblemParser", "FZUOnlineJudgeContestParser", "GoogleCodingCompetitionsProblemParser", "HackerEarthProblemParser", "HackerEarthCodeArenaParser", "HackerEarthContestParser", "HackerRankProblemParser", "HackerRankContestParser", "HDOJNewProblemParser", "HDOJProblemParser", "HDOJNewContestParser", "HDOJContestParser", "HITOnlineJudgeProblemParser", "HihoCoderProblemParser", "HihoCoderContestParser", "HKOIOnlineJudgeProblemParser", "HKOIOnlineJudgeContestParser", "HrbustOnlineJudgeProblemParser", "HydroProblemParser", "HydroContestParser", "InfoArenaProblemParser", "ITCoderHUTECHProblemParser", "JutgeProblemParser", "KattisProblemParser", "KattisContestParser", "KEPUZProblemParser", "KEPUZContestParser", "KilonovaProblemParser", "KilonovaContestParser", "LanqiaoProblemParser", "LanqiaoContestParser", "LibraryCheckerProblemParser", "LibraryCheckerOldProblemParser", "LibreOJProblemParser", "LibreOJContestParser", "LightOJProblemParser", "LightOJContestParser", "LSYOIProblemParser", "LuoguProblemParser", "LuoguContestParser", "MarisaOJProblemParser", "MendoProblemParser", "MetaCodingCompetitionsProblemParser", "MrJudgeProblemParser", "MSKInformaticsProblemParser", "NBUTOnlineJudgeProblemParser", "NBUTOnlineJudgeContestParser", "NepsAcademyProblemParser", "NewtonSchoolProblemParser", "NOJProblemParser", "NOJContestParser", "NowCoderProblemParser", "OmegaUpProblemParser", "OpenJudgeProblemParser", "OpenJudgeContestParser", "OTOGProblemParser", "PandaOnlineJudgeProblemParser", "PBInfoProblemParser", "PEGJudgeProblemParser", "PEGJudgeContestParser", "POJProblemParser", "POJContestParser", "PTAProblemParser", "QBXTOJProblemParser", "QDUOJProblemParser", "QDUOJContestParser", "QQWhaleProblemParser", "RoboContestProblemParser", "RoboContestContestParser", "SDUTOnlineJudgeProblemParser", "SeriousOJProblemParser", "SeriousOJContestParser", "SortMeProblemParser", "SPOJProblemParser", "SSOIERProblemParser", "StarryCodingProblemParser", "TheJobOverflowProblemParser", "TimusOnlineJudgeProblemParser", "TimusOnlineJudgeContestParser", "TLXProblemParser", "TLXContestParser", "TophProblemParser", "UDebugProblemParser", "UniversalCupProblemParser", "UniversalCupContestParser", "UOJProblemParser", "UOJContestParser", "USACOProblemParser", "USACOTrainingProblemParser", "UVaOnlineJudgeProblemParser", "VirtualJudgeProblemParser", "VirtualJudgeContestParser", "XCampProblemParser", "XXMProblemParser", "YandexProblemParser", "YandexContestParser", "YukicoderProblemParser", "YukicoderContestParser", "ZOJProblemParser", "ZUFEOJProblemParser", "ZUFEOJContestParser"];

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

// src/utils/noop.ts
function noop() {
}

// src/options.ts
var customPortsInput = document.querySelector("#custom-ports");
var customRulesContainer = document.querySelector("#custom-rules-container");
var requestTimeoutInput = document.querySelector("#request-timeout");
var debugModeInput = document.querySelector("#debug-mode");
function updateCustomRules() {
  const rows = customRulesContainer.querySelectorAll(".custom-rules-row");
  const rules = [];
  const invalidExpressions = [];
  rows.forEach((row) => {
    const expression = row.querySelector("input").value;
    const parserName = row.querySelector("select").value;
    try {
      new RegExp(expression);
    } catch (err) {
      invalidExpressions.push(expression);
    }
    rules.push([expression, parserName]);
  });
  if (rules[rules.length - 1][0].length > 0) {
    rows[rows.length - 1].querySelector("button").classList.remove("hidden");
    addCustomRulesRow();
  }
  const errorElem = document.querySelector("#custom-rules-error");
  if (invalidExpressions.length > 0) {
    const formattedExpressions = invalidExpressions.map((expression) => `'${expression}'`);
    if (formattedExpressions.length === 1) {
      errorElem.textContent = `The following regular expression is invalid: ${formattedExpressions[0]}`;
    } else {
      const expressionList = formattedExpressions.slice(0, -1).join(", ") + " and " + formattedExpressions.slice(-1);
      errorElem.textContent = `The following regular expressions are invalid: ${expressionList}`;
    }
    errorElem.classList.remove("hidden");
    return;
  }
  errorElem.classList.add("hidden");
  const nonEmptyRules = rules.filter((rule) => rule[0].trim().length > 0);
  config.set("customRules", nonEmptyRules).then(noop).catch(noop);
}
function addCustomRulesRow(regex, parserName) {
  const row = document.createElement("div");
  row.classList.add("custom-rules-row");
  const input = document.createElement("input");
  input.placeholder = "Regular expression";
  input.value = regex !== void 0 ? regex : "";
  const select = document.createElement("select");
  for (const parser of define_PARSER_NAMES_default) {
    const option = document.createElement("option");
    option.value = parser;
    option.textContent = parser;
    option.selected = parser === parserName;
    if (parserName === void 0 && define_PARSER_NAMES_default[0] === parser) {
      option.selected = true;
    }
    select.add(option);
  }
  const button = document.createElement("button");
  button.textContent = "X";
  if (regex === void 0) {
    button.classList.add("hidden");
  }
  button.addEventListener("click", () => {
    if (!button.classList.contains("hidden")) {
      row.remove();
      updateCustomRules();
    }
  });
  input.addEventListener("input", () => updateCustomRules());
  select.addEventListener("change", () => updateCustomRules());
  row.appendChild(input);
  row.appendChild(select);
  row.appendChild(button);
  customRulesContainer.appendChild(row);
}
customPortsInput.addEventListener("input", function() {
  const ports = this.value.split(",").map((x) => x.trim()).filter((x) => x.length > 0).map((x) => Number(x));
  const uniquePorts = [...new Set(ports)];
  const errorElem = document.querySelector("#custom-ports-error");
  if (uniquePorts.some(isNaN) || uniquePorts.some((x) => x < 0)) {
    errorElem.classList.add("hidden");
  } else {
    errorElem.classList.remove("hidden");
    config.set("customPorts", uniquePorts).then(noop).catch(noop);
  }
});
requestTimeoutInput.addEventListener("input", function() {
  const value = this.valueAsNumber;
  config.set("requestTimeout", value < 1 ? 1 : value).then(noop).catch(noop);
});
debugModeInput.addEventListener("input", function() {
  config.set("debugMode", this.checked).then(noop).catch(noop);
});
config.get("customPorts").then((value) => {
  customPortsInput.value = value.join(",");
}).catch(noop);
config.get("customRules").then((rules) => {
  for (const rule of rules) {
    addCustomRulesRow(rule[0], rule[1]);
  }
  addCustomRulesRow();
}).catch(noop);
config.get("requestTimeout").then((value) => {
  requestTimeoutInput.valueAsNumber = value;
}).catch(noop);
config.get("debugMode").then((value) => {
  debugModeInput.checked = value;
}).catch(noop);
