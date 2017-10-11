# SVGAPlayer-Web

Language: [中文](README.zh.md)

## News

* 2.0.0
    * Add SVGA-Format 2.0.0 support.
    * Add npm support, use ```npm install svgaplayerweb --save```.

## Can I Use

SVGAPlayer 2.0.0 only supports below browsers.

* Edge
* Safari / Chrome
* iOS 6.0+ / Android 4.0+

SVGAPlayer 2.0.0 also supports below Game Engines.

* CreateJS [Usage](CreateJS.README.md)
* LayaBox [Usage](LayaBox.README.md)

## Install

### Prebuild JS
1. Goto [https://github.com/yyued/SVGAPlayer-Web/tree/master/build](https://github.com/yyued/SVGAPlayer-Web/tree/master/build) Download svga.min.js
2. Add ```<script src="svga.min.js"></script>``` to xxx.html

### NPM
1. ```npm install svgaplayerweb --save```
2. Add ``` require('svgaplayerweb') ``` to ```xxx.js```

### SVGA-Format 1.x support

Both Prebuild & NPM, if you need to support SVGA-Format 1.x, add JSZip script to html.

```html
<script src="http://assets.dwstatic.com/common/lib/??jszip/3.1.3/jszip.min.js,jszip/3.1.3/jszip-utils.min.js" charset="utf-8"></script>
```

## Usage

### Load Animation Mannally

You may create Player and Parser by yourself.

```js
var player = new SVGA.Player('#canvas'); // replace #canvas as <canvas id="!!!HERE!!!"></canvas>
var parser = new SVGA.Parser();
parser.load('rose_2.0.0.svga', function(videoItem) {
    player.setVideoItem(videoItem);
    player.startAnimation();
})
```

### Load Animation Automatically

Assign canvas element properties as below.

```html
<canvas src="rose_2.0.0.svga" loops="0" clearsAfterStop="true"></canvas>
```

Animation will play after Web-Page onload.

## Replace Animation Images Dynamically

You can replace specific image by yourself, ask your designer tell you the ImageKey.

* The Replacing Image MUST have same WIDTH and HEIGHT as Original.
* setImage operation MUST set BEFORE startAnimation.

```
player.setImage('http://yourserver.com/xxx.png', 'ImageKey');
```

## Add Text on Animation Image Dynamically

You can add text on specific image, ask your designer tell you the ImageKey.

* setText operation MUST set BEFORE startAnimation.

```
player.setText('Hello, World!', 'ImageKey');
```

```
player.setText({ 
    text: 'Hello, World!, 
    size: "24px", 
    color: "#ffe0a4",
    offset: {x: 0.0, y: 0.0}
}, 'ImageKey'); // customize text styles.
```

## Classes

### SVGA.Player

You use SVGA.Player controls animation play and stop.

#### Properties

* int loops; - Animation loop count, defaults to 0 means infinity loop.
* BOOL clearsAfterStop; - defaults to true, means player will clear all contents after stop.

#### Methods

* constructor (canvas); - first params could be '#id' or CanvasHTMLElement
* startAnimation(); - start animation from zero frame.
* pauseAnimation(); - pause animation on current frame.
* stopAnimation(); - stop animation, clear contents while clearsAfterStop === true
* clear(); - force clear contents.
* stepToFrame(frame: int, andPlay: Boolean); - stop to specific frame, play animation while andPlay === true
* stepToPercentage(percentage: float, andPlay: Boolean); - stop to specific percentage, play animation while andPlay === true
* setImage(image: string, forKey: string, transform: [a, b, c, d, tx, ty]); - Replace Animation Images Dynamically, transform is optional, transform could adjust replacing image.
* setText(text: string | {text: string, font: string, size: string, color: string, offset: {x: float, y: float}}, forKey: string); - Add Text on Animation Image Dynamically
* clearDynamicObjects(); - clear all dynamic objects.

#### Callback Method
* onFinished(callback: () => void): void; - call after animation stop.
* onFrame(callback: (frame: number): void): void; - call after animation specific frame rendered.
* onPercentage(callback: (percentage: number): void): void; - call after animation specific percentage rendered.

### SVGA.Parser

You use SVGA.Parser load VideoItem from remote or Base64 string.

Only Cross-Domain allow files could be loaded.

If you eager to load resources from Base64 or File, deliver as ```load(File)``` or ```load('data:svga/2.0;base64,xxxxxx')```.

#### Methods

* constructor();
* load(url: string, success: (videoItem: VideoEntity) => void, failure: (error: Error) => void): void;

## Issues

### Android 4.x Breaks

As known, some Android OS leaks Blob support, add Blob Polyfill by yourself.

```
<script src="//cdn.bootcss.com/blob-polyfill/1.0.20150320/Blob.min.js"></script>
```