import { isFunction } from './is';

/**
 * ContentScript 与 BackgroundScript 调用桥
 */
class Bridge {
  constructor() {
    this.callbackIndex = 0;
    this.callbacks = {};
  }

  /**
   * ContentScript 内发送消息
   * @param {*} event
   * @param {*} params
   * @param {*} callback
   */
  postMessage(event, params = {}, callback) {
    let callbackId = ++this.callbackIndex;
    this.callbacks[callbackId] = callback;
    if (event.startsWith('api:')) {
      // 发送消息
      window.postMessage({
        event: 'inject-script-message',
        action: event.split(':')[1],
        params,
        callbackId
      }, '*');
      // 回调消息
      this.addEventListener('background-response-message', (e) => {
        const data = e.data;
        this.invokeCallbackHandler(data.callbackId, data.params)
      });
    } else {
      window.postMessage({
        event,
        params,
        callbackId
      }, '*');
    }
  }

  /**
   * 监听事件 
   * @param {*} event 
   * @param {*} handler 
   */
  addEventListener(event, handler) {
    window.addEventListener("message", (e) => {
      const data = e.data;
      if (data && data.event) {
        if (data.event === event) {
          handler && handler(e);
        }
      }
    }, false);
  }

  /**
   * 执行 InjectScript 回调
   * @param {*} callbackId
   * @param {*} params
   */
  invokeCallbackHandler(callbackId, params) {
    let callback = this.callbacks[callbackId];
    if (isFunction(callback)) {
      callback(params);
      delete this.callbacks[callbackId];
    }
  }
}

export default Bridge;