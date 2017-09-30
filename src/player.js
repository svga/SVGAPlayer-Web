'use strict';

import { CanvasRender } from './canvasRender'

export class Player {

    render = undefined;
    loops = 0;
    clearsAfterStop = true;
    isPaused = false;

    constructor(canvas) {
        this._canvas = typeof canvas === "string" ? document.querySelector(canvas) : canvas;
        this.setRender(undefined);
    }

    container(stage) {
        this._stage = stage;
        return this._rootLayer;
    }

    setRender(render) {
        if (render === undefined) {
            if (window.createjs !== undefined && window.SvgaCreatejs !== undefined) {
                render = window.SvgaCreatejs.Render;
            }
            else if (window.Laya !== undefined && window.SvgaLayabox !== undefined) {
                render = window.SvgaLayabox.Render;
            }
            else {
                render = CanvasRender;
            }
        }
        if (render === undefined) {
            throw "RENDER REQUIRED.";
        }
        this.render = render;
        this.resetRootStage();
    }

    resetRootStage() {
        if (this._canvas !== undefined) {
            this._rootLayer = this.render.Stage(this._canvas);
            this._stage = this._rootLayer;
        }
        else {
            this._rootLayer = this.render.Container();
        }
    }

    setVideoItem(videoItem) {
        this._videoItem = videoItem;
        this.clear();
        this._draw();
    }

    startAnimation() {
        this.isPaused = false;
        this.stopAnimation(false);
        this._loopCount = 0;
        this._tickListener = this.render.AddTimer(this, this._onTick);
    }

    pauseAnimation() {
        this.isPaused = true;
        this.stopAnimation(false);
    }

    stopAnimation(clear) {
        if (clear === undefined) {
            clear = this.clearsAfterStop;
        }
        this.render.RemoveTimer(this, this._tickListener);
        if (clear) {
            this.clear();
        }
    }

    clear() {
        this.isPaused = false;
        this._rootLayer.removeAllChildren();
        this._stage && this._stage.update(this);
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

    _canvas = ''
    _stage = null;
    _videoItem = null;
    _rootLayer = null;
    _drawLayer = null;
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

    _draw() {
        let self = this;
        this._drawLayer = this.render.Container();
        this.render.setBounds(this._drawLayer, { x: 0.0, y: 0.0, width: this._videoItem.videoSize.width, height: this._videoItem.videoSize.height })
        this._videoItem.sprites.forEach(function (sprite) {
            let bitmap;
            if (sprite.imageKey) {
                bitmap = self._dynamicImage[sprite.imageKey] || self._videoItem.images[sprite.imageKey];
            }
            let contentLayer = sprite.requestLayer(bitmap, self._dynamicImageTransform[sprite.imageKey], self.render);
            if (sprite.imageKey) {
                if (self._dynamicText[sprite.imageKey]) {
                    contentLayer.textLayer = self._dynamicText[sprite.imageKey];
                    contentLayer.addChild(self._dynamicText[sprite.imageKey])
                }
            }
            self._drawLayer.addChild(contentLayer);
        })
        this._rootLayer.addChild(this._drawLayer);
        this._currentFrame = 0;
        this._update();
    }

    _resize() {
        if (this._canvas !== undefined) {
            this._canvas.width = this._canvas.offsetWidth;
            this._canvas.height = this._canvas.offsetHeight;
            let ratio = this._canvas.offsetWidth / this._videoItem.videoSize.width;
            this._drawLayer.setState({
                transform: this.render.Matrix2D(ratio, 0.0, 0.0, ratio, 0.0, 0.0)
            })
        }
        else {
            let ratio = this._rootLayer.width / this._videoItem.videoSize.width;
            this._drawLayer.setState({
                transform: this.render.Matrix2D(ratio, 0.0, 0.0, ratio, 0.0, 0.0)
            })
        }
    }

    _update() {
        let children = this._drawLayer.children instanceof Array ? this._drawLayer.children : this._drawLayer.children();
        for (let index = 0; index < children.length; index++) {
            let child = children[index];
            if (typeof child.stepToFrame === "function") {
                child.stepToFrame(this._currentFrame);
            }
        }
        this._resize();
        this._stage && this._stage.update(this);
    }

}
