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