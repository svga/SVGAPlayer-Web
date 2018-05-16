import { Renderer } from './renderer'
import { Parser } from '../parser'
const ValueAnimator = require("value-animator")

export class Player extends createjs.Container {

    loops = 0;
    clearsAfterStop = true;
    fillMode = "Forward";

    constructor(url, autoplay) {
        super();
        (new Parser()).load(url, (videoItem) => {
            this.setVideoItem(videoItem);
            if (autoplay !== false) {
                this.startAnimation();
            }
        }, (error) => {
            this._onError && this._onError(error);
        })
        this._renderer = new Renderer(this);
    }

    setVideoItem(videoItem) {
        this._currentFrame = 0;
        this._videoItem = videoItem;
        this.removeAllChildren();
        this._addLayers();
    }

    setContentMode(contentMode) {
        this._contentMode = contentMode;
        this._update();
    }

    setClipsToBounds(clipsToBounds) {
        this._clipsToBounds = clipsToBounds;
        this._update();
    }

    setFrame(x, y, width, height) {
        this._frame = { x, y, width, height }
        this._update();
    }

    startAnimation(reverse) {
        this.visible = true;
        this.stopAnimation(false);
        this._doStart(undefined, reverse, undefined);
    }

    startAnimationWithRange(range, reverse) {
        this.visible = true;
        this.stopAnimation(false);
        this._doStart(range, reverse, undefined)
    }

    pauseAnimation() {
        this.stopAnimation(false);
    }

    stopAnimation(clear) {
        if (this._animator !== undefined) {
            this._animator.stop()
        }
        if (clear === undefined) {
            clear = this.clearsAfterStop;
        }
        if (clear) {
            this.clear();
        }
    }

    clear() {
        this.visible = false;
        if (this.stage != null) {
            this.stage.update();
        }
    }

    stepToFrame(frame, andPlay) {
        if (frame >= this._videoItem.frames || frame < 0) {
            return;
        }
        this.visible = true;
        this.pauseAnimation();
        this._currentFrame = frame;
        this._update();
        if (andPlay) {
            this._doStart(undefined, false, this._currentFrame)
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
        if (this._videoItem !== undefined) {
            const currentFrame = this._currentFrame;
            this.removeAllChildren();
            this._addLayers();
            this._currentFrame = currentFrame;
            this._update();
        }
    }

    setText(textORMap, forKey) {
        let text = typeof textORMap === "string" ? textORMap : textORMap.text;
        let size = (typeof textORMap === "object" ? textORMap.size : "14px") || "14px";
        let family = (typeof textORMap === "object" ? textORMap.family : "") || "";
        let color = (typeof textORMap === "object" ? textORMap.color : "#000000") || "#000000";
        let offset = (typeof textORMap === "object" ? textORMap.offset : { x: 0.0, y: 0.0 }) || { x: 0.0, y: 0.0 };
        let textLayer = new createjs.Text(text, `${size} family`, color);
        textLayer.offset = offset;
        this._dynamicText[forKey] = textLayer;
        if (this._videoItem !== undefined) {
            const currentFrame = this._currentFrame;
            this.removeAllChildren();
            this._addLayers();
            this._currentFrame = currentFrame;
            this._update();
        }
    }

    clearDynamicObjects() {
        this._dynamicImage = {};
        this._dynamicImageTransform = {};
        this._dynamicText = {};
    }

    onError(callback) {
        this._onError = callback;
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
    _animator = undefined;
    _contentMode = "AspectFit"
    _videoItem = undefined;
    _currentFrame = 0;
    _dynamicImage = {};
    _dynamicImageTransform = {};
    _dynamicText = {};
    _onFinished = undefined;
    _onFrame = undefined;
    _onPercentage = undefined;
    _clipsToBounds = false;
    _frame = { x: 0, y: 0, width: 0, height: 0 };

    _doStart(range, reverse, fromFrame) {
        this._animator = new ValueAnimator()
        if (range !== undefined) {
            this._animator.startValue = Math.max(0, range.location)
            this._animator.endValue = Math.min(this._videoItem.frames - 1, range.location + range.length)
            this._animator.duration = (this._animator.endValue - this._animator.startValue + 1) * (1.0 / this._videoItem.FPS) * 1000
        }
        else {
            this._animator.startValue = 0
            this._animator.endValue = this._videoItem.frames - 1
            this._animator.duration = this._videoItem.frames * (1.0 / this._videoItem.FPS) * 1000
        }
        this._animator.loops = this.loops <= 0 ? Infinity : this.loops
        this._animator.fillRule = this.fillMode === "Backward" ? 1 : 0
        this._animator.onUpdate = (value) => {
            if (this._currentFrame === Math.floor(value)) {
                return;
            }
            this._currentFrame = Math.floor(value)
            this._update()
            if (typeof this._onFrame === "function") {
                this._onFrame(this._currentFrame);
            }
            if (typeof this._onPercentage === "function") {
                this._onPercentage(parseFloat(this._currentFrame + 1) / parseFloat(this._videoItem.frames));
            }
        }
        this._animator.onEnd = () => {
            if (this.clearsAfterStop === true) {
                this.clear()
            }
            if (typeof this._onFinished === "function") {
                this._onFinished();
            }
        }
        if (reverse === true) {
            this._animator.reverse(fromFrame)
        }
        else {
            this._animator.start(fromFrame)
        }
    }

    _addLayers() {
        this._videoItem.sprites.forEach((sprite) => {
            this.addChild(this._renderer.requestContentLayer(sprite));
        })
        this._currentFrame = 0;
        this._update();
    }

    _resize() {
        let scaleX = 1.0; let scaleY = 1.0; let translateX = 0.0; let translateY = 0.0;
        let targetSize = { width: this._frame.width, height: this._frame.height };
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
        this.transformMatrix = { a: scaleX, b: 0.0, c: 0.0, d: scaleY, tx: this._frame.x + translateX, ty: this._frame.y + translateY };
    }

    _updateMask() {
        if (this._clipsToBounds) {
            this.mask = new createjs.Shape();
            if (this.mask.__width !== this._frame.__width || this.mask.height !== this._frame.height) {
                this.mask.graphics.clear();
                this.mask.graphics.drawRect(0.0, 0.0, this._frame.width, this._frame.height);
                this.mask.__width = this._frame.width;
                this.mask.__height = this._frame.height;
            }
        }
        else {
            this.mask = undefined;
        }
    }

    _update() {
        if (this._videoItem === undefined) { return; }
        this._resize();
        this._updateMask();
        this._renderer.drawFrame(this._currentFrame);
        if (this.stage != null) {
            this.stage.update();
        }
    }

}
