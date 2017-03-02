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
        this._canvas = typeof canvas === "string" ? document.querySelector(canvas) : canvas;
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
        this._tickListener = createjs.Ticker.addEventListener("tick", this._onTick.bind(this));
    }

    pauseAnimation() {
        this.stopAnimation(false);
    }

    stopAnimation(clear) {
        if (clear === undefined) {
            clear = this.clearsAfterStop
        }
        createjs.Ticker.removeEventListener("tick", this._tickListener);
        if (clear) {
            this.clear();
        }
    }

    clear() {
        this._stageLayer.removeAllChildren();
        this._stageLayer.update();
    }

    stepToFrame(frame, andPlay) {
        if (frame >= this._videoItem.frames || frame < 0) {
            return;
        }
        this.pauseAnimation();
        this._currentFrame = frame;
        this._update();
        if (andPlay) {
            createjs.Ticker.framerate = 60;
            this._tickListener = createjs.Ticker.addEventListener("tick", this._onTick.bind(this));
        }
    }

    stepToPercentage(percentage, andPlay) {
        let frame = parseInt(percentage * this._videoItem.frames);
        if (frame >= this._videoItem.frames && frame > 0) {
            frame = this._videoItem.frames - 1;
        }
        this.stepToFrame(frame, andPlay);
    }

    setImage(urlORbase64, forKey) {
        this._dynamicImage[forKey] = urlORbase64;
    }

    setText(text, size, family, color, offset, forKey) {
        let textLayer = new createjs.Text(text, `${ size } family`, color);
        textLayer.offset = offset || {x: 0.0, y: 0.0};
        this._dynamicText[forKey] = textLayer;
    }

    clearDynamicObjects() {
        this._dynamicImage = {};
        this._dynamicText = {};
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
    _tickListener = null;
    _dynamicImage = {};
    _dynamicText = {};
     
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
                bitmap = self._dynamicImage[sprite.imageKey] || self._videoItem.images[sprite.imageKey];
            }
            let contentLayer = sprite.requestLayer(bitmap);
            if (sprite.imageKey) {
                if (self._dynamicText[sprite.imageKey]) {
                    contentLayer.textLayer = self._dynamicText[sprite.imageKey];
                    contentLayer.addChild(self._dynamicText[sprite.imageKey])
                }
            }
            self._drawLayer.addChild(contentLayer);
        })
        this._stageLayer.addChild(this._drawLayer);
        this._currentFrame = 0;
        this._update();
        this._resize();
    }

    _resize() {
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
