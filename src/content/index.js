import Bridge from "../utils/bridge";

const bridge = new Bridge();
// 监听 inject-script 消息转发到 background
bridge.addEventListener('inject-script-message', (e) => {
  window.chrome.runtime.sendMessage(e.data, (response) => {
    // 回调 background 响应消息
    bridge.postMessage('background-response-message', response);
  });
});