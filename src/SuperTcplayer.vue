<template>
    <div class="tc-video-player" :style="{width:width,height:height}">
         <video id="player-container-id"
             preload="auto"
             playsinline webkit-playsinline>
        </video>
    </div>
</template>

<script>

import { loadExternalJS, loadExternalCSS, keyEvent } from '@/utils/tools.js'

export default {
  name: 'tc-video-player',
  data () {
    return {
      player: {}
    }
  },
  props: {
    /*
       @description 播放器宽高
    */
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    },
    muted: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    progressMarker: {
      type: Boolean,
      default: false
    },
    continuePlay: {
      type: Boolean,
      default: false
    },
    playbackRates: {
      type: Array,
      default: () => { return [1, 1.2, 1.5, 1.8, 2.0] }
    },
    options: {
      type: Object,
      required: true
    }
  },
  watch: {
    options (newValue, oldValue) {
      console.log(newValue);
      this.createPlayer()
    }
  },
   created(){
    loadExternalCSS(['//imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.css'])
    loadExternalJS(['//imgcache.qq.com/open/qcloud/video/tcplayer/lib/hls.min.0.8.8.js',
                    '//imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.min.js'])
  },
  methods: {
    createPlayer () {
      let self = this
      // 注意:: tcplayer实例创建的时候必须带参数创建  默认视频地址不能为空  复杂播放器实例创建失败
      if (Object.keys(self.options).length < 1) return
      if (Object.keys(self.player).length > 1)  {
        this.loadVideoById(self.options)
        return
      }
      this.player = TCPlayer('player-container-id', {
        appID: self.options.appID,
        fileID: self.options.fileID,
        sign: self.options.sign,
        t: self.options.t,
        us: self.options.us
        autoplay: self.autoplay,
        muted: self.muted, // 是否静音播放
        playbackRates: self.playbackRates,
        plugins: {
          ContinuePlay: { // 开启续播功能
            auto: self.continuePlay, // [可选] 是否在视频播放后自动续播
            text: '上次播放至 ', // [可选] 提示文案
            btnText: '恢复播放' // [可选] 按钮文案
          },
          ProgressMarker: self.progressMarker
        }
      })
      // 设置键盘控制
      keyEvent(this.player)
      // 设置音量
      if (self.muted) this.player.volume(0)
      else this.player.volume(0.5)
      self.$emit('playerTarget', self.player)
    },
    loadVideoById (options) {
      let self = this;
      options.appID = this.options.appID;
      this.player.loadVideoByID({
        appID: self.options.appID,
        fileID: self.options.fileID,
        sign: self.options.sign,
        t: self.options.t,
        us: self.options.us,
      })
    },
    play () {
      // 视频播放
      this.player.play()
    },
    pause () {
      this.player.pause()
    },
    // 返回视频总时长
    getDuration () {
      return (this.player.duration() / 60).toFixed(2)
    },
    // 返回当前视频播放时长
    getCurrentTime () {
      return (this.player.currentTime() / 60).toFixed(2)
    },
    setCurrentTime (time) {
      let startTime = 0
      // 跳转到指定时间播放
      if (time) startTime = time
      else startTime = 0
      this.player.currentTime(time)
      this.player.play()
    },
    setPosterImg (src) {
      // 设置视频封面图片
      if (!(src && src != '')) return
      this.player.poster(src)
    },
    getPosterImg () {
      // 获取视频封面图片
      return this.player.poster()
    },
    openFullScreen () {
      // 设置打开全屏
      this.player.requestFullscreen()
    },
    exitFullScreen () {
      // 退出全屏
      this.player.exitFullscreen()
    },
    isFullScreen () {
      // 是否全屏
      return this.player.isFullscreen()
    },
    getResolutionSize () {
      // 获取视频分辨率尺寸
      return {
        width: this.player.videoWidth(),
        height: this.player.videoHeight()
      }
    },
    // 销毁播放器实例
    destroy () {
      this.player.dispose()
    }
  }
}
</script>
<style lang="less">
    #player-container-id{
        width: 100%;
        height: 100%;
    }
    .vjs-button-icon {
        display: none;
    }
</style>
