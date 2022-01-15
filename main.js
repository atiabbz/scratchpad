const { app, BrowserWindow, screen } = require("electron");

const createWindow = () => {
  let factor = screen.getPrimaryDisplay().scaleFactor;

  const win = new BrowserWindow({
    width: 840 / factor,
    height: 85 / factor,
    frame: false,
    resizable: false,
    // skipTaskbar: true,
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
