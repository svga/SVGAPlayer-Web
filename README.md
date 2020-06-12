# SVGAPlayer-MP

本分支用于适用于在微信小程序中播放 SVGA 动画，至少要求基础库 >= 2.10.0，支持在真机、开发者工具中播放。

## 代码片段示例

https://developers.weixin.qq.com/s/57sWDkmq7Eeu

## 安装

直接下载本仓库下的 `build/svga.min.js` 并放置到小程序工程适当目录下，在需要使用的地方，使用以下方式引入。

```
const SVGA = require("../svga.min.js")
```

## 使用

只支持 svga 2.0 格式动画，如果无法播放动画，请联系设计师要求导出 2.0 格式，或者进入 https://svga.io 预览页自助转换。

### 添加 Canvas 组件

在需要播放动画的页面 wxml 中，添加以下 canvas，其中 type 必须为 2d，width 和 height 必须指定具体值，id 为任意值。

```html
<canvas type="2d" style="width: 300px; height:300px; background-color: black" id="myCanvas"></canvas>
```

### 加载动画并播放

在适当的地址使用以下方式加载并播放动画，注意安全域名问题。

```js
const SVGA = require("../svga.min.js")

const app = getApp()

Page({
  data: {

  },
  onReady: function () {
    let parser = new SVGA.Parser()
    let player = new SVGA.Player("#myCanvas")
    // 在组件中
    // let player = new SVGA.Player(wx.createSelectorQuery().in(this).select("#myCanvas"))
    parser.load("https://github.com/svga/SVGA-Samples/raw/master/angel.svga", function (videoItem) {
      player.setVideoItem(videoItem);
      player.startAnimation();
    })
  },
})

```

### 动态图像

你可以动态替换动画中的指定元素，询问你的动画设计师以获取 ImageKey。

* 用于替换的图片，宽、高必须与原图一致。
* setImage 操作必须在 startAnimation 之前执行。

```
player.setImage('http://yourserver.com/xxx.png', 'ImageKey');
```

### 动态文本

你可以在指定元素上添加文本，询问你的动画设计师以获取 ImageKey。

* setText 操作必须在 startAnimation 之前执行。

```
player.setText('Hello, World!', 'ImageKey');
```

```
player.setText({ 
    text: 'Hello, World!, 
    size: "24px", 
    family: "Arial",
    color: "#ffe0a4",
    offset: {x: 0.0, y: 0.0}
}, 'ImageKey'); // 可自定义文本样式
```

## Classes

### SVGA.Player

SVGA.Player 用于控制动画的播放和停止

#### Properties

* int loops; - 动画循环次数，默认值为 0，表示无限循环。
* BOOL clearsAfterStop; - 默认值为 true，表示当动画结束时，清空画布。
* string fillMode; - 默认值为 Forward，可选值 Forward / Backward，当 clearsAfterStop 为 false 时，Forward 表示动画会在结束后停留在最后一帧，Backward 则会在动画结束后停留在第一帧。

#### Methods

* constructor (canvas); - 传入 #id 或者 CanvasHTMLElement 至第一个参数
* startAnimation(reverse: boolean = false); - 从第 0 帧开始播放动画
* startAnimationWithRange(range: {location: number, length: number}, reverse: boolean = false); - 播放 [location, location+length] 指定区间帧动画
* pauseAnimation(); - 暂停在当前帧
* stopAnimation(); - 停止播放动画，如果 clearsAfterStop === true，将会清空画布
* setContentMode(mode: "ScaleToFill" | "AspectFill" | "AspectFit"); - 设置动画的拉伸模式
* setClipsToBounds(clipsToBounds: boolean); - 如果超出盒子边界，将会进行裁剪
* clear(); - 强制清空画布
* stepToFrame(frame: int, andPlay: Boolean); - 跳到指定帧，如果 andPlay === true，则在指定帧开始播放动画
* stepToPercentage(percentage: float, andPlay: Boolean); - 跳到指定百分比，如果 andPlay === true，则在指定百分比开始播放动画
* setImage(image: string, forKey: string, transform: [a, b, c, d, tx, ty]); - 设定动态图像, transform 是可选的, transform 用于变换替换图片
* setText(text: string | {text: string, font: string, size: string, color: string, offset: {x: float, y: float}}, forKey: string); - 设定动态文本
* clearDynamicObjects(); - 清空所有动态图像和文本

#### Callback Method
* onFinished(callback: () => void): void; - 动画停止播放时回调
* onFrame(callback: (frame: number): void): void; - 动画播放至某帧后回调
* onPercentage(callback: (percentage: number): void): void; - 动画播放至某进度后回调

### SVGA.Parser

SVGA.Parser 用于加载远端动画，并转换成 VideoItem。

#### Methods

* constructor();
* load(url: string, success: (videoItem: VideoEntity) => void, failure: (error: Error) => void): void;
