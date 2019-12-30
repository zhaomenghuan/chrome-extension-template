import "../utils/hot-reload";

// OnInstall handler
window.chrome.runtime.onInstalled.addListener(details => {
  window.console.log(details);
});
