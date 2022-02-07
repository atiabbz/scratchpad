const {
  BrowserWindow,
  app,
  globalShortcut,
  screen,
  shell,
} = require("electron");

const fs = require("fs");
const path = require("path");

const SETTINGS_PATH = path.resolve("./settings.json");
const PRELOAD_PATH = path.resolve("./preload.js");

const settings = JSON.parse(fs.readFileSync(SETTINGS_PATH));

const createWindow = () => {
  const scaleFactor = screen.getPrimaryDisplay().scaleFactor;

  const win = new BrowserWindow({
    width: 840 / scaleFactor,
    height: 85 / scaleFactor,
    frame: false,
    resizable: false,
    skipTaskbar: true,
    webPreferences: { preload: PRELOAD_PATH },
  });

  win.focus();

  win.webContents.openDevTools();

  globalShortcut.register(settings.appToggleShortcut, () => {
    if (win.isFocused()) {
      win.hide();
      if (!settings.rememberHistory) {
        win.webContents.send("history", "clear");
      }
    } else {
      win.show();
    }
  });

  globalShortcut.register("Ctrl+,", () => {
    if (win.isFocused()) {
      shell.openPath(SETTINGS_PATH);
    }
  });

  globalShortcut.register("Esc", () => {
    if (win.isFocused()) {
      win.hide();
    }
  });

  win.removeMenu();
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
