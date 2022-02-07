const { ipcRenderer } = require("electron");

ipcRenderer.on("history", (_event, message) => {
  if (message === "clear") {
    console.log(document.querySelector("textarea"));
    document.querySelector("textarea").value = "";
  }
});
