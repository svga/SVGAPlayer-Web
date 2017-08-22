# SVGA-Web-Canvas

## 最近更新

* 1.2.0
    * SVGAPlayer 可以作为 CreateJS 上下文的一部分使用，也就是，SVGAPlayer 可以嵌入到 CreateJS 画布中；
    * SVGAPlayer 核心运行时不再依赖 CreateJS 库，运行时大小减少70%；
    * 新增 CreateJS LayaBox 运行时，可在相应的环境中播放 SVGA 动画。

* 1.1.0
	* 完全重构，模块划分为 SVGAParser / SVGAPlayer 以及 SVGAWorker / SVGADB
	* 新增 stepToFrame / stepToPercentage 方法，新增 onFrame / onPercentage 回调
	* 新增矢量对象渲染支持，匹配 SVGA-Format_v1.1，向下兼容 SVGA-Format_v1.0
    * 新增 IE9+ 支持

* 1.0.1
	* 增加 添加播放回调函数，获取当前动画播放进度
* 1.0.0
	* 增加 无使用 worker 版本 build/svga-not-worker.min.js ( gzip 50K )
	* 增加插件 SVGA-DB，使用可持久化常用 SVGA 源文件
	* 优化 worker 转码
	* 更新 动态对象功能
	* 增加 getState 获取播放状态

## Can I Use

SVGAPlayer 支持以下浏览器环境

* IE9+
* Safari / Chrome
* iOS 6.0+ / Android 4.0+

SVGAPlayer 支持以下动画、游戏引擎

* CreateJS
* LayaBox

## 注意

因浏览器安全策略问题，以下文件需要同域，并不能跨域（开启 cross-origin-domain 可以绕过限制）

* svga-worker.min.js
* svga.min.js
* svga 源文件

## 使用

* 下载 build/svga.min.js & build/svga-worker.min.js
* HTML 直接外链使用 或 JS 模块 require 使用

### 手动加载动画

可以通过创建 Player 和 Parser，手动加载 SVGA 动画。

```html
...
<body>
    <div id="test">
        <canvas id="canvas" width="750" height="750" style="background-color: #000000"></canvas>
    </div>
    <!--[if !IE]><!--><script src="http://assets.dwstatic.com/common/lib/yyzip/0.0.1/yyzip.min.js" charset="utf-8"></script><!--<![endif]-->
    <!--[if IE]><script src="http://assets.dwstatic.com/common/lib/??jszip/3.1.3/jszip.min.js,jszip/3.1.3/jszip-utils.min.js,jszip/3.1.3/jszip-utils-ie.min.js" charset="utf-8"></script><![endif]-->
	<script src="../build/svga.min.js" charset="utf-8"></script>
	<script>
        let player = new Svga.Player('#canvas');
        let parser = new Svga.Parser(`svga-worker.min.js`, Svga.DB); // 可以不传任何参数，达到不使用 Worker，不使用 DB 的目的。
        parser.load('EmptyState.svga', (videoItem) => {
            player.setVideoItem(videoItem);
            player.startAnimation();
        });
	</script>
</body>
</html>
```

### 自动加载动画

可以为 canvas 标签设置 src 值，将 svga 源文件地址设为其值，然后执行 ```Svga.autoload()```。

```html
...
<body>

    <div id="test">
        <canvas id="TestCanvas" src="../example/EmptyState.svga" loops="0" clearsAfterStop="true" style="background-color: #000000; width: 500px; height: 500px;"></canvas>
    </div>
    <!--[if !IE]><!--><script src="http://assets.dwstatic.com/common/lib/yyzip/0.0.1/yyzip.min.js" charset="utf-8"></script><!--<![endif]-->
    <!--[if IE]><script src="http://assets.dwstatic.com/common/lib/??jszip/3.1.3/jszip.min.js,jszip/3.1.3/jszip-utils.min.js,jszip/3.1.3/jszip-utils-ie.min.js" charset="utf-8"></script><![endif]-->
	<script src="../build/svga.min.js" charset="utf-8"></script>
	<script>
        Svga.autoload(); // 第一个参数可以是DOM对象，或者 undefined。
        // Svga.autoload(undefined, new Svga.Parser(`../build/svga-worker.min.js`, Svga.DB)); // 可以自定义一个 Parser， 以启用 Worker 和 DB。
        var player = document.getElementById('TestCanvas').player; // 可以通过这种方式取得 SVGAPlayer 对象，直接操纵动画。
	</script>
</body>
</html>
```

### 嵌入到 Canvas 上下文 

如果希望将 SVGAPlayer 嵌入到 Canvas 上下文中，可以在创建 Player 时，不传递参数，然后使用 drawOnCanvas 方法将帧渲染至画布中。

```js
var player = new SVGA.Player();
var parser = new SVGA.Parser();
parser.load(`angel.svga`, (videoItem) => {
    player.setVideoItem(videoItem);
    player.startAnimation();
    events.push(() => {
        player.drawOnCanvas(document.querySelector('#canvas'), 125, 125, 250, 250); // (DOM, x, y, width, height);
    })
});
```

### 在各运行时中播放动画

SVGAPlayer 默认使用 Canvas API 播放动画，然而，你可能需要在不同的环境中播放动画，比如动画引擎、游戏引擎。

SVGAPlayer 会自动选择最合适的 Render 进行渲染，当以下运行时存在时，会按顺序选择 Render。

* CreateJS(SvgaCreatejs.Render)
* Laya(SvgaLayabox.Render)
* Canvas API

当多个环境同时存在时，你可以通过 ```Player.setRender(Render)``` 强制 SVGAPlayer 使用某渲染器。

### 使用 CreateJS 库播放

同时添加 CreateJS 依赖即可使用 CreateJS 库进行播放。

```html
<script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>
<script src="svga-createjs.min.js" charset="utf-8"></script>
```

#### 嵌入到 CreateJS 上下文

如果希望将 SVGAPlayer 嵌入到 Canvas 上下文中，可以在创建 Player 时，不传递参数，然后使用 ```Player.container(stage)``` 获取容器。

```js
var stage = new createjs.Stage('#canvas');
var player = new SVGA.Player();
var parser = new SVGA.Parser();
parser.load(`angel.svga`, (videoItem) => {
    player.setVideoItem(videoItem);
    player.startAnimation();
    var container = player.container(stage);
    container.x = 100;      // 设定容器 x 位置
    container.y = 100;      // 设定容器 y 位置
    container.width = 100;  // 设定容器宽度
    container.height = 100; // 设定容器高度
    stage.addChild(container); // 自行添加至对应场景
});
```

### 在 LayaBox 游戏引擎中播放

要在 LayaBox 中播放 SVGA 动画，你需要同时引用 ```svga.min.js``` ```svga-layabox.min.js```，然后，使用以下方法加载动画。

```js
var player = new SVGA.Player();
var parser = new SVGA.Parser();
parser.load(`angel.svga`, (videoItem) => {
    player.setVideoItem(videoItem);
    player.startAnimation();
    var container = player.container();
    container.x = 100;      // 设定容器 x 位置
    container.y = 100;      // 设定容器 y 位置
    container.width = 100;  // 设定容器宽度
    container.height = 100; // 设定容器高度
    Laya.stage.addChild(container); // 自行添加至对应场景
});
```

* 使用 WebGL 引擎时，由于 Laya.WEBGL 引擎存在 BUG 以及功能缺失，SVGA 已为其修复，在 patch/layabox/ 下，将 ```laya.webgl.js``` 替换工程 libs 目录下的文件即可。

## 模块说明

### SVGAPlayer

SVGAPlayer 是整个播放器的核心，其控制整个播放的进程、进度。

#### Properties

* int loops; - 循环次数，0 = 无限循环
* BOOL clearsAfterStop; - 是否在结束播放时清空画布。

#### Methods

* constructor (canvas); - 初始化方法，canvas 可以是 string(#selector) 也可以是 DOM 对象。
* startAnimation(); - 从 0 帧开始播放动画
* pauseAnimation(); - 在当前帧暂停动画
* stopAnimation(); - 停止播放动画，如果 clearsAfterStop == YES，则同时清空画布
* clear(); - 清空当前画布
* stepToFrame(frame: int, andPlay: Boolean); - 跳到第 N 帧 (frame 0 = 第 1 帧)，然后 andPlay == YES 时播放动画
* stepToPercentage(percentage: float, andPlay: Boolean); - 跳到动画对应百分比的帧，然后 andPlay == YES 时播放动画
* setImage(image: string, forKey: string, transform: [a, b, c, d, tx, ty]); - 设置动态图像，其中 transform 是选填项，用于动态调整图像（目前只有 Canvas API 和 CreateJS 支持）
* setText(text: string | object, forKey: string); - 设置动态文本, text: object = {text: string, font: string, size: string, color: string, offset: {x: float, y: float}}
* clearDynamicObjects(); - 清空动态图像和文本

#### Callback Method
* onFinished(callback: function); - 动画播放结束时回调
* onFrame(callback: function); - 动画播放到某一帧时回调，callback(frame: int)
* onPercentage(callback: function); - 动画播放到某一进度时回调，callback(percentage: float)

### SVGAParser

SVGAParser 用于加载动画源文件， SVGAParser 可以配合 SVGAWorker 和 SVGADB 使用。使用 SVGAWorker 时，动画解码过程在 Worker 线程中执行。 使用 SVGADB 时，动画会缓存在 Local Database 中。

#### Methods

* constructor(worker, dbClass); - 初始化方法，第一个参数传入 SVGAWorker 路径，第二个参数传入 SVGADB 的类名。
* load(url, success, failure); - 加载一个动画，加载完成后执行 success(videoItem: SVGAVideoItem) 回调，加载失败时执行 failure(error: String | Error) 回调。

## 调试构建工具

使用 [LegoFlow](https://legoflow.com) 进行调试、构建
