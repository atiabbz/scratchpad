const path = require("path");
const isDev = require("electron-is-dev");

const ROOT_PATH = path.join(__dirname, "../..");

const RESOURCES_PATH = isDev
  ? path.join(ROOT_PATH, "resources")
  : process.resourcesPath;

const INDEX_PATH = path.join(ROOT_PATH, "public/index.html");

const SRC_PATH = path.join(ROOT_PATH, "src");

const PRELOAD_PATH = path.join(SRC_PATH, "preload/preload.js");

const SETTINGS_PATH = path.join(RESOURCES_PATH, "settings.json");

module.exports = {
  ROOT_PATH,
  INDEX_PATH,
  PRELOAD_PATH,
  SRC_PATH,
  RESOURCES_PATH,
  SETTINGS_PATH,
};
