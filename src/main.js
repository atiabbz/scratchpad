const { BrowserWindow, app, screen } = require("electron");
const fs = require("fs");
const isDev = require("electron-is-dev");

const paths = require("./config/paths");
const settings = JSON.parse(fs.readFileSync(paths.SETTINGS_PATH));

const shortcuts = require("./util/shortcuts");
const { minimizeAndHide } = require("./util/utils");

const createWindow = () => {
  const scaleFactor = screen.getPrimaryDisplay().scaleFactor;

  const win = new BrowserWindow({
    width: settings.widthInPx / scaleFactor,
    height: settings.heightInPx / scaleFactor,
    frame: settings.showFrame,
    resizable: settings.resizable,
    skipTaskbar: settings.skipTaskbar,
    webPreferences: { preload: paths.PRELOAD_PATH },
  });

  win.removeMenu();

  win.webContents.send("font", {
    fontFamily: settings.fontFamily,
    fontSizeInPx: settings.fontSizeInPx,
  });

  win.on("show", () => {
    if (!settings.rememberHistory) {
      win.webContents.send("history", "clear");
    }
  });

  win.on("blur", () => {
    minimizeAndHide(win);
  });

  shortcuts.registerAppToggle(win, settings.appToggleShortcut);
  shortcuts.registerOpenSettings(win, paths.SETTINGS_PATH);
  shortcuts.registerHideApp(win);

  win.focus();

  if (isDev) {
    win.webContents.openDevTools();
  }

  win.loadFile(paths.INDEX_PATH);
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
