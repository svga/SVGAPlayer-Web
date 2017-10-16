# SVGAPlayer-Web

## 版本更新

* 2.0.0
    * 新增 SVGA-Format 2.0.0 格式支持
    * 新增 npm 支持, 使用 ```npm install svgaplayerweb --save```

## Can I Use

SVGAPlayer 2.0.0 只支持以下浏览器使用

* Edge
* Safari / Chrome
* iOS 6.0+ / Android 4.0+

SVGAPlayer 2.0.0 同时支持以下游戏引擎使用

* CreateJS [使用指南](CreateJS.README.md)
* LayaBox [使用指南](LayaBox.README.md)

## 安装

### 预编译 JS
1. 进入 [https://github.com/yyued/SVGAPlayer-Web/tree/master/build](https://github.com/yyued/SVGAPlayer-Web/tree/master/build) 下载 svga.min.js
2. 添加 ```<script src="svga.min.js"></script>``` 至 xxx.html

### NPM
1. ```npm install svgaplayerweb --save```
2. 添加 ``` require('svgaplayerweb') ``` 至 ```xxx.js```

### 支持 SVGA-Format 1.x 格式

无论是使用预编译 JS 或是 NPM， 如果你需要播放 1.x 格式的 SVGA 文件，需要添加 JSZip 到你的 HTML 页面中。

```html
<script src="http://assets.dwstatic.com/common/lib/??jszip/3.1.3/jszip.min.js,jszip/3.1.3/jszip-utils.min.js" charset="utf-8"></script>
```

## 使用指南

### 手动加载

你可以自行创建 Player 和 Parser 并加载动画

1. 添加 Div 容器

```html
<div id="demoCanvas" style="styles..."></div>
```

2. 加载动画

```js
var player = new SVGA.Player('#demoCanvas');
var parser = new SVGA.Parser();
parser.load('rose_2.0.0.svga', function(videoItem) {
    player.setVideoItem(videoItem);
    player.startAnimation();
})
```

### 自动加载

为 canvas 元素添加以下属性

```html
<div src="rose_2.0.0.svga" loops="0" clearsAfterStop="true"></div>
```

动画会在页面加载完成后播放

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
* startAnimation(); - 从第 0 帧开始播放动画
* pauseAnimation(); - 暂停在当前帧
* stopAnimation(); - 停止播放动画，如果 clearsAfterStop === true，将会清空画布
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

SVGA.Parser 用于加载远端或 Base64 动画，并转换成 VideoItem。

跨域的 SVGA 资源需要使用 CORS 协议才能加载成功。

如果你需要加载 Base64 资源，或者 File 资源，这样传递就可以了 ```load(File)``` 或 ```load('data:svga/2.0;base64,xxxxxx')```。

#### Methods

* constructor();
* load(url: string, success: (videoItem: VideoEntity) => void, failure: (error: Error) => void): void;

## Issues

### Android 4.x 加载失败

某些 Android 4.x OS 上缺少 Blob 支持，请自行添加 Polyfill。

```
<script src="//cdn.bootcss.com/blob-polyfill/1.0.20150320/Blob.min.js"></script>
```