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
    let flag = true //    默认为自动播放
    player.on('playing', (msg) => {
        // 正在播放
        flag = true
    })
    player.on('pause', (msg) => {
        // 暂停播放
        flag = false
    })

    document.onkeydown = function () {
        let e = event || window.event || arguments.callee.caller.arguments[0]
        let durtion = Number((player.duration() / 60).toFixed(2))
        let currentTime = Number((player.currentTime() / 60).toFixed(2))
        let currentVolume = Number(player.volume().toFixed(2))

        if (e && e.keyCode === 32) { // 空格键
            // 暂停
            if (flag) { player.pause() } else player.play()
        }
        if (e && e.keyCode === 37) { // 左
            // 后退
            e.preventDefault()
            if (flag) {
                if (currentTime < durtion) {
                    currentTime -= 0.25
                    player.currentTime(currentTime * 60)
                } else {
                    player.pause()
                }
            }
        }
        if (e && e.keyCode === 39) { // 右
            // 快进
            e.preventDefault()
            if (flag) {
                if (currentTime < durtion) {
                    currentTime += 0.25
                    player.currentTime(currentTime * 60)
                } else {
                    player.pause()
                }
            }
        }
        if (e && e.keyCode === 38) { // 上
            // 音量加
            player.muted(!1)
            if (currentVolume < 1 && currentVolume >= 0) {
                currentVolume += 0.02
                player.volume(currentVolume)
            }
        }
        if (e && e.keyCode === 40) { // 下
            // 音量减
            if (currentVolume <= 1 && currentVolume > 0) {
                currentVolume -= 0.02
                player.volume(currentVolume)
            }
        }
    }
}
