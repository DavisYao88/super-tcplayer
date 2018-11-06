
# super-tcplayer

> 基于腾讯web超级播放器封装的vue播放器组件

## Build Setup

##组件下载及安装
  `npm install  super-tcplayer -S`
##组件使用
   `Vue.use(super-tcplayer)`
###组件属性
   
|  属性名       | 类型      | 是否必须  |   默认值    |  说明           |
| ------------ | -------   | -------- |------------ | ------------   |
| width        |  String   |  是      | 视频分辨率宽 |  播放器父容易宽度 |
| height       |   String  |  是      | 视频分辨率高 |  播放器父容易宽度 |
| autoplay     |  Boolean  |  否      | true        |  是否自动播放     |
|progressMarker|  Boolean  |  否      | false       |  进度条是否打点   |        
|continuePlay  |  Boolean  |  否      | false       |  是否连续播放     |  
|options       |  Object   |  是      | 视频id       |  只支持视频id(腾讯云)|
|muted		   |  Boolean  |  是		 | true  	   |   是否静音播放		|
|playbackRates |  Array	   |  否      | [0.5,1,1.5,1.8]|播放器速率		|


## 组件实例方法
|   方法名		   |参数   		|返回值   		|说明   		  |
| ------------ 	 | ------------ |------------ | ------------ |
| play  		 | 无  		   |  	无	     |播放视频 		 |
| pause 		 | 无 		   |  	无	     |暂停播放 		 |
| getDuration    | 无   	       |   	视频时长(分钟)|返回视频总时长|
| getCurrentTime |  无 		   |   视频播放时长(分钟)|返回视频已经播放的时长|
| setCurrentTime  |  视频秒数	 |   无				|设置视频指定进度播放|
| getPosterImg  |  无		   |   封面图地址		|获取视频封面图地址
| setPosterImg  |  图片地址(String) | 无  			  |设置封面图|
| openFullScreen |无   | 无  |打开全屏|
| exitFullScreen  | 无  |无   |退出全屏|
| isFullScreen  |  无 | 无  |返回是否全屏 (Boolean)|
|getResolutionSize|无|无|获取视频分辨率尺寸,返回值Object|
|destroy		|无|无|销毁播放器实例|
##播放器实例
	playerTarget   回调参数为播放器实例
###播放器实例回调方法
|  事件类型 |  说明 |
| ------------ | ------------ |
|play				|已经开始播放，调用 play() 方法或者设置了 autuplay 为 true 且生效时触发，这时 paused 属性为 false|
|playing			|因缓冲而暂停或停止后恢复播放时触发，paused 属性为 false 。通常用这个事件来标记视频真正播放，play 事件只是开始播放，画面并没有开始渲染|
|loadstart			|开始加载数据时触发|
|durationchange		|视频的时长数据发生变化时触发|
|loadedmetadata		|已加载视频的 metadata|
|loadeddata			|当前帧的数据已加载，但没有足够的数据来播放视频的下一帧时，触发该事件|
|progress			|在获取到媒体数据时触发|
|canplay			|当播放器能够开始播放视频时触发|
|canplaythrough		|当播放器预计能够在不停下来进行缓冲的情况下持续播放指定的视频时触发|
|error				|视频播放出现错误时触发|
|pause				|暂停时触发|
|ratechange			|播放速率变更时触发|
|seeked				|搜寻指定播放位置结束时触发|
|seeking			|搜寻指定播放位置开始时触发|
|timeupdate			|当前播放位置有变更，可以理解为 currentTime 有变更|
|volumechange		|设置音量或者 muted 属性值变更时触发|
|waiting			|播放停止，下一帧内容不可用时触发|
|ended				|视频播放已结束时触发。此时 currentTime 值等于媒体资源最大值|
|resolutionswitching|清晰度切换进行中|
|resolutionswitched	|清晰度切换完毕|
|fullscreenchange	|全屏状态切换时触发|

##原始文档
[超级播放器文档](https://cloud.tencent.com/document/product/266/14774 "超级播放器文档")

##播放器使用示例代码
```javascript
<tc-player :width="width" 
          :height="height" 
          :options="options" 
          :autoplay="autoplay" 
          :volume="volume"
          @playerTarget="watchPlayer" 
          ref="player">
    </tc-player>
	//部分代码示例
	export default{
		methods:{
			play(){
			  this.$refs.player.play()
			},
			setCurrentTime(){
			   this.$refs.player.setCurrentTime(60*12)
			 },
			 isFullScreen(){
			   console.log(this.$refs.player.isFullScreen());
			 },
			 watchPlayer(player){
				player.on("loadstart",(msg)=>{
					  console.log("开始加载视频了");
				}) 
				player.on("resolutionswitched",(msg)=>{
					console.log("清晰度切换了");
				})
				player.on("pause",(msg)=>{
				  console.log("视频已暂停");
				})
				player.on("error",(msg)=>{
				  console.log(msg);
				})
				player.on("timeupdate",(msg)=>{
				  console.log(msg);
				})
				player.on("ended",(msg)=>{
				  console.log("视频结束了");
				})
			 }
		}
	}
```
