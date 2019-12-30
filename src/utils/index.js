/**
 * 注入 JS 脚本或 CSS 样式文件
 * @param {*} path
 */
export function injectFile(path) {
  if (!path) {
    throw new Error("not path");
  }

  if (/\.js$/.test(path)) {
    // 在网页上加载插件内js文件
    let script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    script.src = window.chrome.extension.getURL(path);
    script.onload = function() {
      // 放在页面不好看，执行完后移除掉
      this.parentNode.removeChild(this);
    };
    document.head.appendChild(script);
  } else if (/\.css$/.test(path)) {
    // 在网页上加载插件内css文件
    let link = document.createElement("link");
    link.href = window.chrome.extension.getURL(path);
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
}

/**
 * 解析网络地址
 * @param {*} url 
 */
export function parseNetworkUrl(url) {
  if(url.startsWith('//')) {
    return location.protocol + url;
  }
  return url;
}