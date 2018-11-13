export const loadExternalJS = function (arr) {
    if (!(arr && arr.length > 0)) return;
    arr.forEach(src => {
        let script = document.createElement("script");
        let html = document.getElementsByTagName('html')[0];
        script.setAttribute("src", src);
        script.setAttribute("charset", "UTF-8");
        html.appendChild(script);
    });
}
export const loadExternalCSS = function (arr) {
    if (!(arr && arr.length > 0)) return;
    arr.forEach(href => {
        let script = document.createElement("link");
        let html = document.getElementsByTagName('html')[0];
        script.setAttribute("href", href);
        script.setAttribute("rel", "stylesheet");
        html.appendChild(script);
    });
}
export const keyEvent = function (player) {
    document.onkeydown = function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 32) { // 空格键
            // 暂停
        }
        if (e && e.keyCode == 37) { // 左 
            // 后退

        }
        if (e && e.keyCode == 38) { // 上
            // 音量加
        }
        if (e && e.keyCode == 39) { // 右
            // 快进
        }
        if (e && e.keyCode == 40) { // 下
            // 音量减
        }
    }
}