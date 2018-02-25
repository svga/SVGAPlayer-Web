/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

'use strict';

import { Renderer } from './renderer'
const ValueAnimator = require("value-animator")

export class Player {

    public loops = 0;
    public clearsAfterStop = true;
    public fillMode = "Forward";

    public constructor(container) {
        this.container = typeof container === "string" ? document.querySelector(container) : container;
        this.asChild = container === undefined
        this._init();
    }

    public setVideoItem(videoItem) {
        this.currentFrame = 0;
        this.videoItem = videoItem;
        this.renderer.prepare();
        this.clear();
        this._update();
    }

    public setContentMode(contentMode) {
        this.contentMode = contentMode;
        this._update();
    }

    public setClipsToBounds(clipsToBounds) {
        if (this.container instanceof HTMLDivElement) {
            this.container.style.overflowX = this.container.style.overflowY = clipsToBounds ? "hidden" : undefined;
        }
    }

    public startAnimation(reverse) {
        this.stopAnimation(false);
        this._doStart(undefined, reverse, undefined);
    }

    public startAnimationWithRange(range, reverse) {
        this.stopAnimation(false);
        this._doStart(range, reverse, undefined)
    }

    public pauseAnimation() {
        this.stopAnimation(false);
    }

    public stopAnimation(clear) {
        if (this.animator !== undefined) {
            this.animator.stop()
        }
        if (clear === undefined) {
            clear = this.clearsAfterStop;
        }
        if (clear) {
            this.clear();
        }
    }

    public clear() {
        this.renderer.clear();
    }

    public stepToFrame(frame, andPlay) {
        if (frame >= this.videoItem.frames || frame < 0) {
            return;
        }
        this.pauseAnimation();
        this.currentFrame = frame;
        this._update();
        if (andPlay) {
            this._doStart(undefined, false, this.currentFrame)
        }
    }

    public stepToPercentage(percentage, andPlay) {
        let frame = parseInt((percentage * this.videoItem.frames).toString());
        if (frame >= this.videoItem.frames && frame > 0) {
            frame = this.videoItem.frames - 1;
        }
        this.stepToFrame(frame, andPlay);
    }

    public setImage(urlORbase64, forKey, transform) {
        this.dynamicImage[forKey] = urlORbase64;
        if (transform !== undefined && transform instanceof Array && transform.length == 6) {
            this.dynamicImageTransform[forKey] = transform;
        }
    }

    public setText(textORMap, forKey) {
        let text = typeof textORMap === "string" ? textORMap : textORMap.text;
        let size = (typeof textORMap === "object" ? textORMap.size : "14px") || "14px";
        let family = (typeof textORMap === "object" ? textORMap.family : "") || "";
        let color = (typeof textORMap === "object" ? textORMap.color : "#000000") || "#000000";
        let offset = (typeof textORMap === "object" ? textORMap.offset : { x: 0.0, y: 0.0 }) || { x: 0.0, y: 0.0 };
        this.dynamicText[forKey] = {
            text,
            style: `${size} family`,
            color,
            offset,
        };
    }

    public clearDynamicObjects() {
        this.dynamicImage = {};
        this.dynamicImageTransform = {};
        this.dynamicText = {};
    }

    public onFinished(callback) {
        this._onFinished = callback;
    }

    public onFrame(callback) {
        this._onFrame = callback;
    }

    public onPercentage(callback) {
        this._onPercentage = callback;
    }

    public drawOnContext(ctx, x, y, width, height) {
        if (this.drawingCanvas && this.videoItem) {
            ctx.drawImage(this.drawingCanvas, x, y, width || this.videoItem.videoSize.width, height || this.videoItem.videoSize.height);
        }
    }

    /**
     * Private methods & properties
     */
    private asChild = false;
    private container = undefined;
    private renderer = undefined;
    private animator = undefined;
    private drawingCanvas = undefined;
    private contentMode = "AspectFit"
    private videoItem = undefined;
    private currentFrame = 0;
    private dynamicImage = {};
    private dynamicImageTransform = {};
    private dynamicText = {};
    private globalTransform = undefined;
    _onFinished = undefined;
    _onFrame = undefined;
    _onPercentage = undefined;

    _init() {
        if (this.container instanceof HTMLDivElement || this.asChild) {
            if (this.container) {
                const existedCanvasElements = this.container.querySelectorAll('canvas');
                for (let index = 0; index < existedCanvasElements.length; index++) {
                    let element = existedCanvasElements[index];
                    if (element !== undefined && element.__isPlayer) {
                        this.container.removeChild(element);
                    }
                }
            }
            this.drawingCanvas = document.createElement('canvas');
            this.drawingCanvas.__isPlayer = true
            this.drawingCanvas.style.backgroundColor = "transparent"
            if (this.container) {
                this.container.appendChild(this.drawingCanvas);
                this.container.style.textAlign = "left";
            }
        }
        this.renderer = new Renderer(this);
    }

    _doStart(range, reverse, fromFrame) {
        this.animator = new ValueAnimator()
        if (range !== undefined) {
            this.animator.startValue = Math.max(0, range.location)
            this.animator.endValue = Math.min(this.videoItem.frames - 1, range.location + range.length)
            this.animator.duration = (this.animator.endValue - this.animator.startValue + 1) * (1.0 / this.videoItem.FPS) * 1000
        }
        else {
            this.animator.startValue = 0
            this.animator.endValue = this.videoItem.frames - 1
            this.animator.duration = this.videoItem.frames * (1.0 / this.videoItem.FPS) * 1000
        }
        this.animator.loops = this.loops <= 0 ? Infinity : 1
        this.animator.fillRule = this.fillMode === "Backward" ? 1 : 0
        this.animator.onUpdate = (value) => {
            if (this.currentFrame === Math.floor(value)) {
                return;
            }
            this.currentFrame = Math.floor(value)
            this._update()
            if (typeof this._onFrame === "function") {
                this._onFrame(this.currentFrame);
            }
            if (typeof this._onPercentage === "function") {
                this._onPercentage(parseFloat((this.currentFrame + 1).toString()) / parseFloat(this.videoItem.frames));
            }
        }
        this.animator.onEnd = () => {
            if (this.clearsAfterStop === true) {
                this.clear()
            }
            if (typeof this._onFinished === "function") {
                this._onFinished();
            }
        }
        if (reverse === true) {
            this.animator.reverse(fromFrame)
        }
        else {
            this.animator.start(fromFrame)
        }
    }

    _resize() {
        let asParent = false;
        if (this.drawingCanvas) {
            let scaleX = 1.0; let scaleY = 1.0; let translateX = 0.0; let translateY = 0.0;
            let targetSize;
            if (this.drawingCanvas.parentNode) {
                targetSize = { width: this.drawingCanvas.parentNode.clientWidth, height: this.drawingCanvas.parentNode.clientHeight };
            }
            else {
                targetSize = this.videoItem.videoSize;
            }
            let imageSize = this.videoItem.videoSize;
            if (targetSize.width >= imageSize.width && targetSize.height >= imageSize.height) {
                this.drawingCanvas.width = targetSize.width;
                this.drawingCanvas.height = targetSize.height;
                this.drawingCanvas.style.webkitTransform = this.drawingCanvas.style.transform = "";
                asParent = true;
            }
            else {
                this.drawingCanvas.width = imageSize.width;
                this.drawingCanvas.height = imageSize.height;
                if (this.contentMode === "Fill") {
                    const scaleX = targetSize.width / imageSize.width;
                    const scaleY = targetSize.height / imageSize.height;
                    const translateX = (imageSize.width * scaleX - imageSize.width) / 2.0
                    const translateY = (imageSize.height * scaleY - imageSize.height) / 2.0
                    this.drawingCanvas.style.webkitTransform = this.drawingCanvas.style.transform = "matrix(" + scaleX + ", 0.0, 0.0, " + scaleY + ", " + translateX + ", " + translateY + ")"
                }
                else if (this.contentMode === "AspectFit" || this.contentMode === "AspectFill") {
                    const imageRatio = imageSize.width / imageSize.height;
                    const viewRatio = targetSize.width / targetSize.height;
                    if ((imageRatio >= viewRatio && this.contentMode === "AspectFit") || (imageRatio < viewRatio && this.contentMode === "AspectFill")) {
                        const scale = targetSize.width / imageSize.width;
                        const translateX = (imageSize.width * scale - imageSize.width) / 2.0
                        const translateY = (imageSize.height * scale - imageSize.height) / 2.0 + (targetSize.height - imageSize.height * scale) / 2.0
                        this.drawingCanvas.style.webkitTransform = this.drawingCanvas.style.transform = "matrix(" + scale + ", 0.0, 0.0, " + scale + ", " + translateX + ", " + translateY + ")"
                    }
                    else if ((imageRatio < viewRatio && this.contentMode === "AspectFit") || (imageRatio > viewRatio && this.contentMode === "AspectFill")) {
                        const scale = targetSize.height / imageSize.height;
                        const translateX = (imageSize.width * scale - imageSize.width) / 2.0 + (targetSize.width - imageSize.width * scale) / 2.0
                        const translateY = (imageSize.height * scale - imageSize.height) / 2.0
                        this.drawingCanvas.style.webkitTransform = this.drawingCanvas.style.transform = "matrix(" + scale + ", 0.0, 0.0, " + scale + ", " + translateX + ", " + translateY + ")"
                    }
                }
                this.globalTransform = undefined;
            }
        }
        if (this.drawingCanvas === undefined || asParent === true) {
            let scaleX = 1.0; let scaleY = 1.0; let translateX = 0.0; let translateY = 0.0;
            let targetSize = { width: this.container !== undefined ? this.container.clientWidth : 0.0, height: this.container !== undefined ? this.container.clientHeight : 0.0 };
            let imageSize = this.videoItem.videoSize;
            if (this.contentMode === "Fill") {
                scaleX = targetSize.width / imageSize.width;
                scaleY = targetSize.height / imageSize.height;
            }
            else if (this.contentMode === "AspectFit" || this.contentMode === "AspectFill") {
                const imageRatio = imageSize.width / imageSize.height;
                const viewRatio = targetSize.width / targetSize.height;
                if ((imageRatio >= viewRatio && this.contentMode === "AspectFit") || (imageRatio <= viewRatio && this.contentMode === "AspectFill")) {
                    scaleX = scaleY = targetSize.width / imageSize.width;
                    translateY = (targetSize.height - imageSize.height * scaleY) / 2.0
                }
                else if ((imageRatio < viewRatio && this.contentMode === "AspectFit") || (imageRatio > viewRatio && this.contentMode === "AspectFill")) {
                    scaleX = scaleY = targetSize.height / imageSize.height;
                    translateX = (targetSize.width - imageSize.width * scaleX) / 2.0
                }
            }
            this.globalTransform = { a: scaleX, b: 0.0, c: 0.0, d: scaleY, tx: translateX, ty: translateY };
        }
    }

    _update() {
        if (this.videoItem === undefined) { return; }
        this._resize();
        this.renderer.drawFrame(this.currentFrame);
    }

}
