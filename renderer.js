fetch("./settings.json")
  .then((response) => response.json())
  .then((settings) => {
    const textarea = document.querySelector("textarea");
    textarea.style.fontFamily = settings.fontFamily;
    textarea.style.fontSize = settings.fontSize + "px";
  });
