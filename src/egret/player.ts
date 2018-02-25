/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

'use strict';

import { VideoEntity } from '../components/entity/videoEntity';
import { Renderer } from './renderer';
import { Ticker } from './ticker';
import { SVGAVectorLayer } from './svgaVectorLayer';
import { SVGALayer } from './svgaLayer';

export class Player extends SVGALayer {
    loops: number = 0;
    clearsAfterStop: boolean = true;
    fillMode: string = "Forward";

    /**
     * Private methods & properties
     */
    private container = undefined
    private renderer = undefined
    private ticker: Ticker = undefined
    private drawingCanvas = undefined
    private contentMode: string = "AspectFit"
    private videoItem: VideoEntity = undefined
    private loopCount: number = 0
    private currentFrame: number = 0
    private dynamicImage = {} 
    private dynamicImageTransform = {}
    private dynamicText = {}
    private onFinished = undefined
    private onFrame = undefined
    private onPercentage = undefined
    private nextTickTime: number = 0
    private globalTransform = null

    constructor() {
        super()
        this.init()
    }

    private init() {

        this.renderer = new Renderer(this)
        this.ticker = new Ticker(this)
    }

    public setVideoItem(videoItem: any) {
        this.videoItem = videoItem
        this.currentFrame = 0
        this.clear()
        this.prepare()
        this.update()
    }

    public startAnimation() {
        if(this.renderer.prepared){
            this.stopAnimation(false)
            this.currentFrame = 0
            this.loopCount = 0
            this.ticker.start()
        }else{
            console.log("wait for prepared")
            egret.setTimeout(()=>{
                this.startAnimation()
            }, 100, null)
        }
    }

    private stopAnimation(clear: boolean = this.clearsAfterStop) {
        this.ticker.stop()
        if (clear) {
            this.clear()
        }
    }

    public pauseAnimation() {
        this.stopAnimation(false);
    }

    public _setupChildren(bitmapCache: Array<any>){
        this.videoItem.sprites.forEach((sprite, index) => {

            if(sprite.imageKey.indexOf('.vector') >= 0){
                let vectorLayer: SVGAVectorLayer = new SVGAVectorLayer()
                this.addChildAt(vectorLayer, index)
             
            }else{
                let texture = new egret.Texture()
                texture.bitmapData = bitmapCache[sprite.imageKey]
                let bitmap: egret.Bitmap = new egret.Bitmap(texture)
                this.addChildAt(bitmap, index)
            }
        })
    }

    public _onTick() {
        if (typeof this.videoItem === "object") {
            if (performance.now() >= this.nextTickTime) {
                let time: number = 1000 / this.videoItem.FPS
                this.nextTickTime = parseInt(time.toString()) + performance.now() - (60 / this.videoItem.FPS) * 2
                this.next()
            }
        }
    }

    private next() {
        this.currentFrame++
        if (this.currentFrame >= this.videoItem.frames) {
            this.currentFrame = 0
            this.loopCount++
            if (this.loops > 0 && this.loopCount >= this.loops) {
                this.stopAnimation()
                if (!this.clearsAfterStop && this.fillMode === "Backward") {
                    this.stepToFrame(0)
                }
                if (typeof this.onFinished === "function") {
                    this.onFinished()
                }
                return
            }
        }
        this.update()
        if (typeof this.onFrame === "function") {
            this.onFrame(this.currentFrame)
        }
        if (typeof this.onPercentage === "function") {
            let frameadd = this.currentFrame + 1
            this.onPercentage(parseFloat(frameadd.toString()) / parseFloat(this.videoItem.frames.toString()))
        }
    }

    private prepare() {
        this.resize()
        this.renderer.prepare()
    }

    private clear() {
        this.renderer.clear()
    }

    public stepToFrame(frame: number, andPlay: boolean = false) {
        if (frame >= this.videoItem.frames || frame < 0) {
            return
        }
        this.pauseAnimation()
        this.currentFrame = frame
        this.update()
        if (andPlay) {
            this.ticker.start()
        }
    }

    private resize() {

        // let asParent = false;
        // if (this._drawingCanvas) {
            let scaleX = 1.0
            let scaleY = 1.0
            let translateX = 0.0
            let translateY = 0.0
            let targetSize = this.videoItem.videoSize

        //     if (this._drawingCanvas.parentNode) {
        //         targetSize = { width: this._drawingCanvas.parentNode.clientWidth, height: this._drawingCanvas.parentNode.clientHeight };
        //     }
        //     else {
        //         targetSize = this._videoItem.videoSize;
        //     }
        //     let imageSize = this._videoItem.videoSize;
        //     if (targetSize.width >= imageSize.width && targetSize.height >= imageSize.height) {
        //         this._drawingCanvas.width = targetSize.width;
        //         this._drawingCanvas.height = targetSize.height;
        //         this._drawingCanvas.style.webkitTransform = this._drawingCanvas.style.transform = "";
        //         asParent = true;
        //     }
        //     else {
        //         this._drawingCanvas.width = imageSize.width;
        //         this._drawingCanvas.height = imageSize.height;
        //         if (this._contentMode === "Fill") {
        //             const scaleX = targetSize.width / imageSize.width;
        //             const scaleY = targetSize.height / imageSize.height;
        //             const translateX = (imageSize.width * scaleX - imageSize.width) / 2.0
        //             const translateY = (imageSize.height * scaleY - imageSize.height) / 2.0
        //             this._drawingCanvas.style.webkitTransform = this._drawingCanvas.style.transform = "matrix(" + scaleX + ", 0.0, 0.0, " + scaleY + ", " + translateX + ", " + translateY + ")"
        //         }
        //         else if (this._contentMode === "AspectFit" || this._contentMode === "AspectFill") {
        //             const imageRatio = imageSize.width / imageSize.height;
        //             const viewRatio = targetSize.width / targetSize.height;
        //             if ((imageRatio >= viewRatio && this._contentMode === "AspectFit") || (imageRatio < viewRatio && this._contentMode === "AspectFill")) {
        //                 const scale = targetSize.width / imageSize.width;
        //                 const translateX = (imageSize.width * scale - imageSize.width) / 2.0
        //                 const translateY = (imageSize.height * scale - imageSize.height) / 2.0 + (targetSize.height - imageSize.height * scale) / 2.0
        //                 this._drawingCanvas.style.webkitTransform = this._drawingCanvas.style.transform = "matrix(" + scale + ", 0.0, 0.0, " + scale + ", " + translateX + ", " + translateY + ")"
        //             }
        //             else if ((imageRatio < viewRatio && this._contentMode === "AspectFit") || (imageRatio > viewRatio && this._contentMode === "AspectFill")) {
        //                 const scale = targetSize.height / imageSize.height;
        //                 const translateX = (imageSize.width * scale - imageSize.width) / 2.0 + (targetSize.width - imageSize.width * scale) / 2.0
        //                 const translateY = (imageSize.height * scale - imageSize.height) / 2.0
        //                 this._drawingCanvas.style.webkitTransform = this._drawingCanvas.style.transform = "matrix(" + scale + ", 0.0, 0.0, " + scale + ", " + translateX + ", " + translateY + ")"
        //             }
        //         }
        //         this._globalTransform = undefined;
        //     }
        // }
        // if (this._drawingCanvas === undefined || asParent === true) {
        //     let scaleX = 1.0; let scaleY = 1.0; let translateX = 0.0; let translateY = 0.0;
        //     let targetSize = { width: this._container !== undefined ? this._container.clientWidth : 0.0, height: this._container !== undefined ? this._container.clientHeight : 0.0 };
        //     let imageSize = this._videoItem.videoSize;
        //     if (this._contentMode === "Fill") {
        //         scaleX = targetSize.width / imageSize.width;
        //         scaleY = targetSize.height / imageSize.height;
        //     }
        //     else if (this._contentMode === "AspectFit" || this._contentMode === "AspectFill") {
        //         const imageRatio = imageSize.width / imageSize.height;
        //         const viewRatio = targetSize.width / targetSize.height;
        //         if ((imageRatio >= viewRatio && this._contentMode === "AspectFit") || (imageRatio <= viewRatio && this._contentMode === "AspectFill")) {
        //             scaleX = scaleY = targetSize.width / imageSize.width;
        //             translateY = (targetSize.height - imageSize.height * scaleY) / 2.0
        //         }
        //         else if ((imageRatio < viewRatio && this._contentMode === "AspectFit") || (imageRatio > viewRatio && this._contentMode === "AspectFill")) {
        //             scaleX = scaleY = targetSize.height / imageSize.height;
        //             translateX = (targetSize.width - imageSize.width * scaleX) / 2.0
        //         }
        //     }
        scaleX = this.width / targetSize.width
        scaleY = this.height / targetSize.height
        translateX = this.x
        translateY = this.y
        this.globalTransform = { a: scaleX, b: 0.0, c: 0.0, d: scaleY, tx: translateX, ty: translateY }
        // }
        if (this.globalTransform) {
            this.matrix = new egret.Matrix(this.globalTransform.a, this.globalTransform.b, this.globalTransform.c, this.globalTransform.d, this.globalTransform.tx, this.globalTransform.ty)
        }

        let shape: egret.Shape = new egret.Shape()
        shape.x = this.x
        shape.y = this.y
        shape.width = this.width
        shape.height = this.height

        shape.graphics.beginFill(0x000ff);
		shape.graphics.drawRect(0, 0, shape.width, shape.height);
		shape.graphics.endFill();

        shape.matrix = this.matrix
        this.parent.addChild(shape)
        this.mask = shape
    }

    private update() {
        if (this.videoItem === undefined) { return }
        this.renderer.drawFrame(this.currentFrame)
    }
}