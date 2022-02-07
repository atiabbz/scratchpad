const { globalShortcut, shell } = require("electron");
const { minimizeAndHide } = require("./utils");

function registerAppToggle(win, shortcutKey) {
  globalShortcut.register(shortcutKey, () => {
    if (win.isFocused()) {
      minimizeAndHide(win);
    } else {
      win.show();
    }
  });
}

function registerOpenSettings(win, settings_path) {
  globalShortcut.register("Ctrl+,", () => {
    if (win.isFocused()) {
      shell.openPath(settings_path);
    }
  });
}

function registerHideApp(win) {
  globalShortcut.register("Esc", () => {
    if (win.isFocused()) {
      minimizeAndHide(win);
    }
  });
}

module.exports = {
  registerAppToggle,
  registerOpenSettings,
  registerHideApp,
};
