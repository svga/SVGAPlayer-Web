'use strict';

import { Render } from './render'
import { Ticker } from './ticker'

export class Player {

    loops = 0;
    clearsAfterStop = true;
    isPaused = false;

    constructor(container, asChild) {
        this._container = typeof container === "string" ? document.querySelector(container) : container;
        this._asChild = asChild === true
        this.init();
    }

    init() {
        if (this._container instanceof HTMLDivElement) {
            this._drawingCanvas = document.createElement('canvas');
            this._drawingCanvas.style.backgroundColor = "transparent"
            this._container.appendChild(this._drawingCanvas);
        }
        this._render = new Render(this);
        this._ticker = new Ticker(this);
    }

    setVideoItem(videoItem) {
        this._videoItem = videoItem;
        this._render.prepare();
        if (this._drawingCanvas) {
            this._drawingCanvas.width = this._videoItem.videoSize.width;
            this._drawingCanvas.height = this._videoItem.videoSize.height;
        }
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
        this.isPaused = false;
        this.stopAnimation(false);
        this._loopCount = 0;
        this._ticker.start();
    }

    pauseAnimation() {
        this.isPaused = true;
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
        this.isPaused = false;
    }

    stepToFrame(frame, andPlay) {
        if (frame >= this._videoItem.frames || frame < 0) {
            return;
        }
        this.pauseAnimation();
        this._currentFrame = frame;
        this._update();
        if (andPlay) {
            this.isPaused = false;
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
        let offset = (typeof textORMap === "object" ? textORMap.offset : { x: 0.0, y: 0.0 }) || { x: 0.0, y: 0.0 };
        let textLayer = this._render.Text(text, `${size} family`, color);
        textLayer.setState({ offset });
        this._dynamicText[forKey] = textLayer;
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

    /**
     * Private methods & properties
     */

    _asChild = false;
    _container = undefined;
    _render = undefined;
    _ticker = undefined;
    _drawingCanvas = undefined;
    _contentMode = "AspectFit"
    _videoItem = null;
    _rootLayer = null;
    _loopCount = 0;
    _currentFrame = 0;
    _dynamicImage = {};
    _dynamicImageTransform = {};
    _dynamicText = {};
    _onFinished = null;
    _onFrame = null;
    _onPercentage = null;
    _nextTickTime = 0;

    _onTick() {
        if (typeof this._videoItem === "object") {
            if ((new Date()).getTime() >= this._nextTickTime) {
                this._nextTickTime = parseInt(1000 / this._videoItem.FPS) + (new Date()).getTime() - (60 / this._videoItem.FPS) * 2
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
                if (typeof this._onFinished === "function") {
                    this._onFinished();
                }
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
        if (this._drawingCanvas && this._drawingCanvas.parentNode) {
            let scaleX = 1.0; let scaleY = 1.0; let translateX = 0.0; let translateY = 0.0;
            let targetSize = { width: this._drawingCanvas.parentNode.clientWidth, height: this._drawingCanvas.parentNode.clientHeight };
            let imageSize = this._videoItem.videoSize;
            if (this._contentMode === "Fill") {
                const scaleX = targetSize.width / imageSize.width;
                const scaleY = targetSize.height / imageSize.height;
                const translateX = (imageSize.width * scaleX - imageSize.width) / 2.0
                const translateY = (imageSize.height * scaleY - imageSize.height) / 2.0
                this._drawingCanvas.style.transform = "matrix(" + scaleX + ", 0.0, 0.0, " + scaleY + ", " + translateX + ", " + translateY + ")"
            }
            else if (this._contentMode === "AspectFit" || this._contentMode === "AspectFill") {
                const imageRatio = imageSize.width / imageSize.height;
                const viewRatio = targetSize.width / targetSize.height;
                if ((imageRatio >= viewRatio && this._contentMode === "AspectFit") || (imageRatio < viewRatio && this._contentMode === "AspectFill")) {
                    const scale = targetSize.width / imageSize.width;
                    const translateX = (imageSize.width * scale - imageSize.width) / 2.0
                    const translateY = (imageSize.height * scale - imageSize.height) / 2.0 + (targetSize.height - imageSize.height * scale) / 2.0
                    this._drawingCanvas.style.transform = "matrix(" + scale + ", 0.0, 0.0, " + scale + ", " + translateX + ", " + translateY + ")"
                }
                else if ((imageRatio < viewRatio && this._contentMode === "AspectFit") || (imageRatio > viewRatio && this._contentMode === "AspectFill")) {
                    const scale = targetSize.height / imageSize.height;
                    const translateX = (imageSize.width * scale - imageSize.width) / 2.0 + (targetSize.width - imageSize.width * scale) / 2.0
                    const translateY = (imageSize.height * scale - imageSize.height) / 2.0
                    this._drawingCanvas.style.transform = "matrix(" + scale + ", 0.0, 0.0, " + scale + ", " + translateX + ", " + translateY + ")"
                }
            }
        }
        else {
            let scaleX = 1.0; let scaleY = 1.0; let translateX = 0.0; let translateY = 0.0;
            let targetSize = { width: this._container !== undefined ? this._container.clientWidth : this._rootLayer.width, height: this._container !== undefined ? this._container.clientHeight : this._rootLayer.height };
            let imageSize = this._videoItem.videoSize;
            if (this._contentMode === "Fill") {
                scaleX = targetSize.width / imageSize.width;
                scaleY = targetSize.height / imageSize.height;
            }
            else if (this._contentMode === "AspectFit" || this._contentMode === "AspectFill") {
                const imageRatio = imageSize.width / imageSize.height;
                const viewRatio = targetSize.width / targetSize.height;
                if ((imageRatio >= viewRatio && this._contentMode === "AspectFit") || (imageRatio < viewRatio && this._contentMode === "AspectFill")) {
                    scaleX = scaleY = targetSize.width / imageSize.width;
                    translateY = (targetSize.height - imageSize.height * scaleY) / 2.0
                }
                else if ((imageRatio < viewRatio && this._contentMode === "AspectFit") || (imageRatio > viewRatio && this._contentMode === "AspectFill")) {
                    scaleX = scaleY = targetSize.height / imageSize.height;
                    translateX = (targetSize.width - imageSize.width * scaleX) / 2.0
                }
            }
            // this._drawLayer.setState({
            //     transform: this._render.Matrix2D(scaleX, 0.0, 0.0, scaleY, translateX, translateY)
            // })
        }
    }

    _update() {
        this._resize();
        this._render.drawFrame(this._currentFrame);
    }

}
