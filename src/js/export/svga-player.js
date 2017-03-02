/**
 * @file   : svga-web-canvas
 * @author : lijialiang
 * @team   : UED中心
 * @export : umd
 */

require('./modules/easeljs.min')

import SVGAVideoEntity from './modules/svga-videoEntity'

module.exports = class SVGAPlayer {

    loops = 0;
    clearsAfterStop = true;

    constructor (canvas) {
        this._canvas = canvas;
        this._stageLayer = new createjs.Stage(this._canvas);
    }

    setVideoItem(videoItem) {
        this._videoItem = videoItem;
        this.clear();
        this._draw();
    }

    startAnimation() {
        this.stopAnimation(false);
        this._loopCount = 0;
        createjs.Ticker.framerate = 60;
        createjs.Ticker.addEventListener("tick", this._onTick.bind(this));
    }

    pauseAnimation() {
        this.stopAnimation(false);
    }

    stopAnimation(clear) {
        if (clear === undefined) {
            clear = this.clearsAfterStop
        }
        createjs.Ticker.removeEventListener("tick", this._onTick);
        if (clear) {
            this.clear();
        }
    }

    clear() {

    }

    stepToFrame(frame, andPlay) {

    }

    stepToPercentage(percentage, andPlay) {

    }

    setImage(image, forKey) {

    }

    setText(image, forKey) {

    }

    clearDynamicObjects(image, forKey) {

    }

    /**
     * Private methods & properties
     */

    _canvas = ''
    _videoItem = null;
    _stageLayer = null;
    _drawLayer = null;
    _loopCount = 0;
    _currentFrame = 0;
     
    _nextTickTime = 0;
    _onTick() {
        if (typeof this._videoItem === "object") {
            if ((new Date()).getTime() - this._nextTickTime >= -1) {
                this._next();
                this._nextTickTime = parseInt(1000 / this._videoItem.FPS) + (new Date()).getTime()
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
            }
        }
        this._update();
    }

    _draw() {
        let self = this;
        this._drawLayer = new createjs.Container();
        this._drawLayer.setBounds(0.0, 0.0, this._videoItem.videoSize.width, this._videoItem.videoSize.height)
        this._videoItem.sprites.forEach(function(sprite) {
            let bitmap;
            if (sprite.imageKey) {
                bitmap = self._videoItem.images[sprite.imageKey];
            }
            let contentLayer = sprite.requestLayer(bitmap);
            self._drawLayer.addChild(contentLayer);
        })
        this._stageLayer.addChild(this._drawLayer);
        this._currentFrame = 0;
        this._update();
        this._resize();
    }

    _resize() {
        let canvas = typeof this._canvas === "string" ? document.querySelector(this._canvas) : this._canvas;
        let ratio = this._canvas.width / this._videoItem.videoSize.width;
        this._drawLayer.transformMatrix = new createjs.Matrix2D(ratio, 0.0, 0.0, ratio, 0.0, 0.0);
    }

    _update() {
        this._drawLayer.children.forEach((child) => {
            if (typeof child.stepToFrame === "function") {
                child.stepToFrame(this._currentFrame);
            }
        });
        this._stageLayer.update();
    }

}
