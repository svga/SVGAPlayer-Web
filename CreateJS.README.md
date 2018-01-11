# SVGAPlayer-Web

## Install

### Add CreateJS library

```html
<script src="https://code.createjs.com/easeljs-0.8.2.min.js"></script>
```

### Prebuild JS
1. Goto [https://github.com/yyued/SVGAPlayer-Web/tree/master/build](https://github.com/yyued/SVGAPlayer-Web/tree/master/build) Download svga.createjs.min.js
2. Add ```<script src="svga.createjs.min.js"></script>``` to xxx.html

### NPM
1. ```npm install svgaplayerweb --save```
2. Add ``` require('svgaplayerweb/build/svga.createjs.min') ``` to ```xxx.js```

### SVGA-Format 1.x support

Both Prebuild & NPM, if you need to support SVGA-Format 1.x, add JSZip script to html.

```html
<script src="http://assets.dwstatic.com/common/lib/??jszip/3.1.3/jszip.min.js,jszip/3.1.3/jszip-utils.min.js" charset="utf-8"></script>
```

## Usage

```js
var displayObject = new SVGA.CreatejsPlayer('./samples/rose_2.0.0.svga');
displayObject.onError(function(err) {
    console.error(err)
})
displayObject.setFrame(0, 0, 500, 500)
var stage = new createjs.Stage('CanvasID');
stage.addChild(displayObject);
```

### Replace Animation Images Dynamically

You can replace specific image by yourself, ask your designer tell you the ImageKey.

* The Replacing Image MUST have same WIDTH and HEIGHT as Original.
* setImage operation MUST set BEFORE startAnimation.

```
displayObject.setImage('http://yourserver.com/xxx.png', 'ImageKey');
```

### Add Text on Animation Image Dynamically

You can add text on specific image, ask your designer tell you the ImageKey.

* setText operation MUST set BEFORE startAnimation.

```
displayObject.setText('Hello, World!', 'ImageKey');
```

```
displayObject.setText({ 
    text: 'Hello, World!, 
    size: "24px", 
    color: "#ffe0a4",
    offset: {x: 0.0, y: 0.0}
}, 'ImageKey'); // customize text styles.
```

## Classes

### CreatejsPlayer

You use SVGA.CreatejsPlayer controls animation play and stop.

#### Properties

* int loops; - Animation loop count, defaults to 0 means infinity loop.
* BOOL clearsAfterStop; - defaults to true, means player will clear all contents after stop.
* string fillMode; - defaults to Forward，optional Forward / Backward，fillMode = Forward，Animation will pause on last frame while finished，fillMode = Backward , Animation will pause on first frame.

#### Methods

* constructor (url: string, autoPlay: boolean);
* startAnimation(, reverse: boolean = false); - start animation from zero frame.
* startAnimationWithRange(range: {location: number, length: number}, reverse: boolean = false); - start animation in [location, location+length] frame range.
* pauseAnimation(); - pause animation on current frame.
* stopAnimation(); - stop animation, clear contents while clearsAfterStop === true
* setContentMode(mode: "ScaleToFill" | "AspectFill" | "AspectFit"); - Specific Scale Mode
* setClipsToBounds(clipsToBounds: boolean); - Clips if image render out of box.
* clear(); - force clear contents.
* stepToFrame(frame: int, andPlay: Boolean); - stop to specific frame, play animation while andPlay === true
* stepToPercentage(percentage: float, andPlay: Boolean); - stop to specific percentage, play animation while andPlay === true
* setImage(image: string, forKey: string, transform: [a, b, c, d, tx, ty]); - Replace Animation Images Dynamically, transform is optional, transform could adjust replacing image.
* setText(text: string | {text: string, font: string, size: string, color: string, offset: {x: float, y: float}}, forKey: string); - Add Text on Animation Image Dynamically
* clearDynamicObjects(); - clear all dynamic objects.

#### Callback Method
* onError(callback: (error: Error) => void): void; - call after load failure.
* onFinished(callback: () => void): void; - call after animation stop.
* onFrame(callback: (frame: number): void): void; - call after animation specific frame rendered.
* onPercentage(callback: (percentage: number): void): void; - call after animation specific percentage rendered.

## Issues

### Android 4.x Breaks

As known, some Android OS lack Blob support, add Blob Polyfill by yourself.

```
<script src="//cdn.bootcss.com/blob-polyfill/1.0.20150320/Blob.min.js"></script>
```
