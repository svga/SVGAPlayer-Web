'use strict';

import { Renderer } from './render'
import { Parser } from '../parser'

export class Player extends createjs.Container {

    loops = 0;
    clearsAfterStop = true;

    constructor(url, autoplay) {
        super();
        (new Parser()).load(url, (videoItem) => {
            this.setVideoItem(videoItem);
            if (autoplay !== false) {
                this.startAnimation();
            }
        })
        this._renderer = new Renderer(this);
    }

    setVideoItem(videoItem) {
        this._videoItem = videoItem;
        this.removeAllChildren();
        this._addLayers();
    }

    setContentMode(contentMode) {
        this._contentMode = contentMode;
        this._update();
    }

    setClipsToBounds(clipsToBounds) {
        
    }

    startAnimation() {
        this.stopAnimation(false);
        this._loopCount = 0;
        this._tickListener = () => {
            this._onTick();
        }
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", this._tickListener);
    }

    pauseAnimation() {
        this.stopAnimation(false);
    }

    stopAnimation(clear) {
        if (clear === undefined) {
            clear = this.clearsAfterStop;
        }
        createjs.Ticker.removeEventListener("tick", this._tickListener);
        if (clear) {
            this.clear();
        }
    }

    clear() {
        if (this.stage != null) {
            this.stage.update();
        }
    }

    stepToFrame(frame, andPlay) {
        if (frame >= this._videoItem.frames || frame < 0) {
            return;
        }
        this.pauseAnimation();
        this._currentFrame = frame;
        this._update();
        if (andPlay) {
            this._tickListener = this.render.AddTimer(this, this._onTick);
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
        let textLayer = this.render.Text(text, `${size} family`, color);
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

    _renderer = undefined;
    _contentMode = "AspectFit"
    _videoItem = null;
    _loopCount = 0;
    _currentFrame = 0;
    _tickListener = null;
    _dynamicImage = {};
    _dynamicImageTransform = {};
    _dynamicText = {};
    _onFinished = null;
    _onFrame = null;
    _onPercentage = null;
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

    _addLayers() {
        this._videoItem.sprites.forEach((sprite) =>  {
            this.addChild(this._renderer.requestContentLayer(sprite));
        })
        this._currentFrame = 0;
        this._update();
    }

    _resize() {
        let scaleX = 1.0; let scaleY = 1.0; let translateX = 0.0; let translateY = 0.0;
        let targetSize = { width: this.width, height: this.height };
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
        this.transformMatrix = { a: scaleX, b: 0.0, c: 0.0, d: scaleY, tx: this.x + translateX, ty: this.y + translateY };
    }

    _update() {
        this._resize();
        this._renderer.drawFrame(this._currentFrame);
        if (this.stage != null) {
            this.stage.update();
        }
    }

}
