# SVGA-Web-Canvas

## 最近更新

* NEXT
    * SVGAPlayer 可以作为 CreateJS 上下文的一部分使用，也就是，SVGAPlayer 可以嵌入到 CreateJS 画布中。

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

## 说明

[SVGA](http://code.yy.com/ued/SVGA-Format) 格式 Web Canvas 实现方式

## 实现

* 修复 [原有player](http://code.yy.com/ued/SVGAPlayer-WebCanvas) 实际使用反馈的 bug
* 轻量化，重构依赖模块，gzip 30K
* 性能优化，运算开销较大 SVGA 源文件下载转码过程 迁移到 web worker，尽量避免影响主线程，造成页面卡顿
* UMD 规范，全局引用，或使用模块加载

## DEMO

[前往测试地址](http://legox.yy.com/svga/svgaplayer/)

## 注意

因浏览器安全策略问题，以下文件需要同域，并不能跨域

* svga-worker.min.js
* svga.min.js
* svga 源文件

## 使用

* 下载 build/svga.min.js & build/svga-worker.min.js
* HTML 直接外链使用 或 JS 模块 require 使用

### 手动加载动画

可以通过创建 Player 和 Parser，手动加载 SVGA 动画。

```html
<html lang="zh-cmn-Hans">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="format-detection" content="telephone=no,address=no,email=no">
    <meta http-equiv="Cache-Control" content="no-transform">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <title>Example</title>
</head>
<body>

    <div id="test">
        <canvas id="canvas" width="750" height="750" style="background-color: #000000"></canvas>
    </div>

    <!--[if !IE]><!--><script src="http://assets.dwstatic.com/common/lib/yyzip/0.0.1/yyzip.min.js" charset="utf-8"></script><!--<![endif]-->
    <!--[if IE]><script src="http://assets.dwstatic.com/common/lib/??jszip/3.1.3/jszip.min.js,jszip/3.1.3/jszip-utils.min.js,jszip/3.1.3/jszip-utils-ie.min.js" charset="utf-8"></script><![endif]-->
	<script src="../build/svga.min.js" charset="utf-8"></script>

	<script>
        let player = new Svga.Player('#canvas');
        let parser = new Svga.Parser(`../build/svga-worker.min.js`, Svga.DB); // 可以不传任何参数，达到不使用 Worker，不使用 DB 的目的。
        parser.load('../example/EmptyState.svga', (videoItem) => {
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
<html lang="zh-cmn-Hans">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="format-detection" content="telephone=no,address=no,email=no">
    <meta http-equiv="Cache-Control" content="no-transform">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <title>Example</title>
</head>
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

### Android 4.x

SVGAPlayer 是支持 Android 4.x 的，在引用 script 时，参照以下代码即可。区别在于，强制使用 JSZip 库。

```html
<html lang="zh-cmn-Hans">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="format-detection" content="telephone=no,address=no,email=no">
    <meta http-equiv="Cache-Control" content="no-transform">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <title>Example</title>
</head>
<body>

    <div id="test">
        <canvas id="canvas" width="750" height="750" style="background-color: #000000"></canvas>
    </div>

	<!--[if !IE]><!--><script src="http://assets.dwstatic.com/common/lib/??jszip/3.1.3/jszip.min.js,jszip/3.1.3/jszip-utils.min.js" charset="utf-8"></script><!--<![endif]-->
    <!--[if IE]><script src="http://assets.dwstatic.com/common/lib/??jszip/3.1.3/jszip.min.js,jszip/3.1.3/jszip-utils.min.js,jszip/3.1.3/jszip-utils-ie.min.js" charset="utf-8"></script><![endif]-->
	<script src="../build/svga.min.js" charset="utf-8"></script>

	<script>
        let player = new Svga.Player('#canvas');
        let parser = new Svga.Parser(`../build/svga-worker.min.js`, Svga.DB); // 可以不传任何参数，达到不使用 Worker，不使用 DB 的目的。
        parser.load('../example/EmptyState.svga', (videoItem) => {
            player.setVideoItem(videoItem);
            player.startAnimation();
        });
	</script>

</body>
</html>

```

### 嵌入画布

在创建 Player 时，不传入任何参数，然后调用 Player.container(stage) 方法，获取一个 CreateJS 渲染对象。

然后，将该对象使用 addChild 方法添加到舞台，即可。

```html
<html lang="zh-cmn-Hans">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="format-detection" content="telephone=no,address=no,email=no">
    <meta http-equiv="Cache-Control" content="no-transform">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <title>Example</title>
</head>
<body>

    <div id="test" onload="init()">
        <canvas id="canvas" width="750" height="750" style="background-color: #000000"></canvas>
    </div>

	<!--[if !IE]><!--><script src="http://assets.dwstatic.com/common/lib/??jszip/3.1.3/jszip.min.js,jszip/3.1.3/jszip-utils.min.js" charset="utf-8"></script><!--<![endif]-->
    <!--[if IE]><script src="http://assets.dwstatic.com/common/lib/??jszip/3.1.3/jszip.min.js,jszip/3.1.3/jszip-utils.min.js,jszip/3.1.3/jszip-utils-ie.min.js" charset="utf-8"></script><![endif]-->
	<script src="../build/svga.min.js" charset="utf-8"></script>

	<script>

        var stage;

        function init() {
            stage = new createjs.Stage("canvas");
            var circle = new createjs.Shape();
            circle.graphics.beginFill("gray").drawCircle(0, 0, 100);
            circle.x = 250;
            circle.y = 250;
            stage.addChild(circle);
            stage.update();
            addAnimation();
        }

        function addAnimation() {
            var player = new Svga.Player();
            var parser = new Svga.Parser(`/assets/svga-worker.min.js`, SVGA.DB);
            parser.load(`/assets/angel.svga`, function(videoItem) {
                player.setVideoItem(videoItem);
                var container = player.container(stage);
                container.x = 150;
                container.y = 150;
                container.width = 200;
                container.height = 200;
                stage.addChild(container);
                stage.update();
                player.startAnimation();
            });
        }

	</script>

</body>
</html>
```

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
* setImage(image: string, forKey: string); - 设置动态图像
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
* load(url, callback); - 加载一个动画，加载完成后 callback 回调，callback(videoItem: SVGAVideoItem)中。

## 调试构建工具

使用 [LegoFlow](http://legox.yy.com/md/book/LegoFlow/) 进行调试、构建
