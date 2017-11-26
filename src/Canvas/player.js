'use strict';

import {Renderer} from './renderer'
import {Ticker} from './ticker'

let performance = window.performance;
let transforms = ['transform', 'webkitTransform', 'mozTransform', 'msTransform'];

if (typeof performance === "undefined") {
    performance = {
        now: () => {
            return (new Date()).getTime()
        }
    }
}
else if (typeof performance.now === "undefined") {
    performance.now = () => {
        return (new Date()).getTime()
    }
}

export class Player {

    loops = 0;
    clearsAfterStop = true;
    fillMode = "Forward";

    constructor(container) {
        this._container = typeof container === "string" ? document.querySelector(container) : container;
        this._asChild = container === undefined
        this._init();
    }

    _init() {
        if (this._container instanceof HTMLDivElement || this._asChild) {
            if (this._container) {
                const existedCanvasElements = this._container.querySelectorAll('canvas');
                for (let index = 0; index < existedCanvasElements.length; index++) {
                    let element = existedCanvasElements[index];
                    if (element !== undefined && element.__isPlayer) {
                        this._container.removeChild(element);
                    }
                }
            }
            this._drawingCanvas = document.createElement('canvas');
            this._drawingCanvas.__isPlayer = true
            this._drawingCanvas.style.backgroundColor = "transparent"
            if (this._container) {
                this._container.appendChild(this._drawingCanvas);
                this._container.style.textAlign = "left";
            }
        }
        this._renderer = new Renderer(this);
        this._ticker = new Ticker(this);
    }

    setVideoItem(videoItem) {
        this._currentFrame = 0;
        this._videoItem = videoItem;
        this._renderer.prepare();
        this.clear();
        this._update();
    }

    setContentMode(contentMode) {
        this._contentMode = contentMode;
        this._update();
    }

    setClipsToBounds(clipsToBounds) {
        if (this._container instanceof HTMLDivElement) {
            this._container.style.overflowX = this._container.style.overflowY = clipsToBounds ? "hidden" : undefined;
        }
    }

    startAnimation() {
        this.stopAnimation(false);
        this._currentFrame = 0;
        this._loopCount = 0;
        this._ticker.start();
    }

    pauseAnimation() {
        this.stopAnimation(false);
    }

    stopAnimation(clear) {
        if (clear === undefined) {
            clear = this.clearsAfterStop;
        }
        this._ticker.stop();
        if (clear) {
            this.clear();
        }
    }

    clear() {
        this._renderer.clear();
    }

    stepToFrame(frame, andPlay) {
        if (frame >= this._videoItem.frames || frame < 0) {
            return;
        }
        this.pauseAnimation();
        this._currentFrame = frame;
        this._update();
        if (andPlay) {
            this._ticker.start();
        }
    }

    stepToPercentage(percentage, andPlay) {
        let frame = parseInt(percentage * this._videoItem.frames);
        if (frame >= this._videoItem.frames && frame > 0) {
            frame = this._videoItem.frames - 1;
        }
        this.stepToFrame(frame, andPlay);
    }

    setImage(urlORbase64, forKey, transform) {
        this._dynamicImage[forKey] = urlORbase64;
        if (transform !== undefined && transform instanceof Array && transform.length == 6) {
            this._dynamicImageTransform[forKey] = transform;
        }
    }

    setText(textORMap, forKey) {
        let text = typeof textORMap === "string" ? textORMap : textORMap.text;
        let size = (typeof textORMap === "object" ? textORMap.size : "14px") || "14px";
        let family = (typeof textORMap === "object" ? textORMap.family : "") || "";
        let color = (typeof textORMap === "object" ? textORMap.color : "#000000") || "#000000";
        let offset = (typeof textORMap === "object" ? textORMap.offset : {x: 0.0, y: 0.0}) || {x: 0.0, y: 0.0};
        this._dynamicText[forKey] = {
            text,
            style: `${size} family`,
            color,
            offset,
        };
    }

    clearDynamicObjects() {
        this._dynamicImage = {};
        this._dynamicImageTransform = {};
        this._dynamicText = {};
    }

    onFinished(callback) {
        this._onFinished = callback;
    }

    onFrame(callback) {
        this._onFrame = callback;
    }

    onPercentage(callback) {
        this._onPercentage = callback;
    }

    drawOnContext(ctx, x, y, width, height) {
        if (this._drawingCanvas && this._videoItem) {
            ctx.drawImage(this._drawingCanvas, x, y, width || this._videoItem.videoSize.width, height || this._videoItem.videoSize.height);
        }
    }

    /**
     * Private methods & properties
     */

    _asChild = false;
    _container = undefined;
    _renderer = undefined;
    _ticker = undefined;
    _drawingCanvas = undefined;
    _contentMode = "AspectFit"
    _videoItem = undefined;
    _loopCount = 0;
    _currentFrame = 0;
    _dynamicImage = {};
    _dynamicImageTransform = {};
    _dynamicText = {};
    _onFinished = undefined;
    _onFrame = undefined;
    _onPercentage = undefined;
    _nextTickTime = 0;

    _onTick() {
        if (typeof this._videoItem === "object") {
            if (performance.now() >= this._nextTickTime) {
                this._nextTickTime = parseInt(1000 / this._videoItem.FPS) + performance.now() - (60 / this._videoItem.FPS) * 2
                this._next();
            }
        }
    }

    _next() {
        this._currentFrame++;
        if (this._currentFrame >= this._videoItem.frames) {
            this._currentFrame = 0;
            this._loopCount++;
            if (this.loops > 0 && this._loopCount >= this.loops) {
                this.stopAnimation();
                if (!this.clearsAfterStop && this.fillMode === "Backward") {
                    this.stepToFrame(0)
                }
                if (typeof this._onFinished === "function") {
                    this._onFinished();
                }
                return;
            }
        }
        this._update();
        if (typeof this._onFrame === "function") {
            this._onFrame(this._currentFrame);
        }
        if (typeof this._onPercentage === "function") {
            this._onPercentage(parseFloat(this._currentFrame + 1) / parseFloat(this._videoItem.frames));
        }
    }

    _resize() {
        let asParent = false;
        if (this._drawingCanvas) {
            let scaleX = 1.0;
            let scaleY = 1.0;
            let translateX = 0.0;
            let translateY = 0.0;
            let targetSize;
            if (this._drawingCanvas.parentNode) {
                targetSize = {
                    width: this._drawingCanvas.parentNode.clientWidth,
                    height: this._drawingCanvas.parentNode.clientHeight
                };
            }
            else {
                targetSize = this._videoItem.videoSize;
            }
            let imageSize = this._videoItem.videoSize;
            if (targetSize.width >= imageSize.width && targetSize.height >= imageSize.height) {
                this._drawingCanvas.width = targetSize.width;
                this._drawingCanvas.height = targetSize.height;
                this._drawingCanvas.style.webkitTransform = this._drawingCanvas.style.transform = "";
                asParent = true;
            }
            else {
                this._drawingCanvas.width = imageSize.width;
                this._drawingCanvas.height = imageSize.height;
                if (this._contentMode === "Fill") {
                    const scaleX = targetSize.width / imageSize.width;
                    const scaleY = targetSize.height / imageSize.height;
                    const translateX = (imageSize.width * scaleX - imageSize.width) / 2.0
                    const translateY = (imageSize.height * scaleY - imageSize.height) / 2.0
                    transforms.forEach((item) => {
                        this._drawingCanvas.style[item] = "matrix(" + scaleX + ", 0.0, 0.0, " + scaleY + ", " + translateX + ", " + translateY + ")"
                    });
                }
                else if (this._contentMode === "AspectFit" || this._contentMode === "AspectFill") {
                    const imageRatio = imageSize.width / imageSize.height;
                    const viewRatio = targetSize.width / targetSize.height;
                    if ((imageRatio >= viewRatio && this._contentMode === "AspectFit") || (imageRatio < viewRatio && this._contentMode === "AspectFill")) {
                        const scale = targetSize.width / imageSize.width;
                        const translateX = (imageSize.width * scale - imageSize.width) / 2.0
                        const translateY = (imageSize.height * scale - imageSize.height) / 2.0 + (targetSize.height - imageSize.height * scale) / 2.0
                        transforms.forEach((item) => {
                            this._drawingCanvas.style[item] = "matrix(" + scale + ", 0.0, 0.0, " + scale + ", " + translateX + ", " + translateY + ")"
                        });
                    }
                    else if ((imageRatio < viewRatio && this._contentMode === "AspectFit") || (imageRatio > viewRatio && this._contentMode === "AspectFill")) {
                        const scale = targetSize.height / imageSize.height;
                        const translateX = (imageSize.width * scale - imageSize.width) / 2.0 + (targetSize.width - imageSize.width * scale) / 2.0
                        const translateY = (imageSize.height * scale - imageSize.height) / 2.0
                        transforms.forEach((item) => {
                            this._drawingCanvas.style[item] = "matrix(" + scale + ", 0.0, 0.0, " + scale + ", " + translateX + ", " + translateY + ")"
                        });
                    }
                }
                this._globalTransform = undefined;
            }
        }
        if (this._drawingCanvas === undefined || asParent === true) {
            let scaleX = 1.0;
            let scaleY = 1.0;
            let translateX = 0.0;
            let translateY = 0.0;
            let targetSize = {
                width: this._container !== undefined ? this._container.clientWidth : 0.0,
                height: this._container !== undefined ? this._container.clientHeight : 0.0
            };
            let imageSize = this._videoItem.videoSize;
            if (this._contentMode === "Fill") {
                scaleX = targetSize.width / imageSize.width;
                scaleY = targetSize.height / imageSize.height;
            }
            else if (this._contentMode === "AspectFit" || this._contentMode === "AspectFill") {
                const imageRatio = imageSize.width / imageSize.height;
                const viewRatio = targetSize.width / targetSize.height;
                if ((imageRatio >= viewRatio && this._contentMode === "AspectFit") || (imageRatio <= viewRatio && this._contentMode === "AspectFill")) {
                    scaleX = scaleY = targetSize.width / imageSize.width;
                    translateY = (targetSize.height - imageSize.height * scaleY) / 2.0
                }
                else if ((imageRatio < viewRatio && this._contentMode === "AspectFit") || (imageRatio > viewRatio && this._contentMode === "AspectFill")) {
                    scaleX = scaleY = targetSize.height / imageSize.height;
                    translateX = (targetSize.width - imageSize.width * scaleX) / 2.0
                }
            }
            this._globalTransform = {a: scaleX, b: 0.0, c: 0.0, d: scaleY, tx: translateX, ty: translateY};
        }
    }

    _update() {
        if (this._videoItem === undefined) {
            return;
        }
        this._resize();
        this._renderer.drawFrame(this._currentFrame);
    }

}
