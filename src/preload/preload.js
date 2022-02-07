const { ipcRenderer } = require("electron");

ipcRenderer.on("history", (_event, message) => {
  if (message === "clear") {
    document.querySelector("textarea").value = "";
  }
});

ipcRenderer.on("font", (_event, styles) => {
  const textarea = document.querySelector("textarea");
  textarea.style.fontFamily = styles.fontFamily;
  textarea.style.fontSize = styles.fontSizeInPx;
});
