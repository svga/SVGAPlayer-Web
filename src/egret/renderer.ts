/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { BezierPath } from '../components/entity/bezierPath';
import { FrameEntity } from '../components/entity/frameEntity';
import { SVGAVectorLayer } from './svgaVectorLayer';

export class Renderer {
    static validMethods = 'MLHVCSQRZmlhvcsqrz'


    private owner: any = undefined;
    private prepared: boolean = false;
    private undrawFrame: any = undefined;
    private bitmapCache: {} = undefined;

    constructor(owner: any) {
        this.owner = owner
    }

    public prepare() {
        this.prepared = false
        this.bitmapCache = undefined;
        let bitmapKey: Array<string> = Object.keys(this.owner.videoItem.images)
        if (this.owner.videoItem.images === undefined || bitmapKey.length == 0) {
            this.bitmapCache = {};
            this.prepared = true;
            this.owner._setupChildren(this.bitmapCache)
            return;
        }
        if (this.bitmapCache === undefined) {
            this.bitmapCache = {}
            let totalCount = 0
            let loadedCount = 0
            for (let imageKey in this.owner.videoItem.images) {
                let src = this.owner.videoItem.images[imageKey]
                if (src.indexOf("iVBO") === 0 || src.indexOf("/9j/2w") === 0) {
                    totalCount++;

                    let bitmapData: egret.BitmapData = egret.BitmapData.create("base64", src, (base64_bitmapdata) => {
                        loadedCount++

                        this.bitmapCache[imageKey] = base64_bitmapdata
                        if (loadedCount == totalCount) {
                            this.prepared = true
                            if (typeof this.undrawFrame === "number") {

                                this.owner._setupChildren(this.bitmapCache)
                                this.drawFrame(this.undrawFrame);
                                this.undrawFrame = undefined;
                            }
                        }
                    })
                }
            }
        }
    }

    public clear() {
        this.owner.removeChildren()
    }

    public drawFrame(frame: any) {

        if (this.prepared) {
            this.owner.videoItem.sprites.forEach((sprite, index) => {
                let frameItem: FrameEntity = sprite.frames[this.owner.currentFrame]
                let displayObj: egret.DisplayObject = this.owner.getChildAt(index)
                if (displayObj instanceof SVGAVectorLayer) {
                    let shapeItem: any = frameItem.shapes[0]
                    if (frameItem.alpha > 0 && shapeItem && shapeItem.type == "shape") {
                        if(shapeItem.shape.d){
                            displayObj.setBezier(new BezierPath(shapeItem.shape.d, frameItem.transform, shapeItem.styles))
                        }
                    }
                }
                displayObj.matrix = new egret.Matrix(frameItem.transform.a, frameItem.transform.b, frameItem.transform.c, frameItem.transform.d, frameItem.transform.tx, frameItem.transform.ty)
                displayObj.alpha = frameItem.alpha

                if (frameItem.maskPath !== undefined && frameItem.maskPath !== null) {
                    let maskShape: egret.Shape = <egret.Shape>displayObj.mask
                    if (maskShape == null) {
                        maskShape = new egret.Shape()
                        this.owner.addChild(maskShape)
                    }
                    this.drawBezier(maskShape, frameItem.maskPath)
                    maskShape.matrix = displayObj.matrix
                    displayObj.mask = maskShape
                } else {
                    if (displayObj.mask != null) {
                        this.owner.removeChild(displayObj.mask)
                        displayObj.mask = null
                    }
                }
            })
        }
        else {
            this.undrawFrame = frame;
        }
    }

    private drawBezier(mask: any, obj: BezierPath) {

        let shape: egret.Shape = mask
        shape.graphics.clear()

        let currentPoint = { x: 0, y: 0, x1: 0, y1: 0, x2: 0, y2: 0 }
        shape.graphics.beginFill(0x000000, 1)
        let d = obj._d.replace(/([a-zA-Z])/g, '|||$1 ').replace(/,/g, ' ');
        d.split('|||').forEach(segment => {
            if (segment.length == 0) { return; }
            const firstLetter = segment.substr(0, 1);
            if (Renderer.validMethods.indexOf(firstLetter) >= 0) {
                const args = segment.substr(1).trim().split(" ");
                this.drawBezierElement(shape, currentPoint, firstLetter, args);
            }
        })
        if (obj._styles && obj._styles.fill) {
            // console.log("fill()")
        }
        if (obj._styles && obj._styles.stroke) {
            // console.log("stroke()")
        }

        shape.graphics.endFill()
    }

    private drawBezierElement(shape, currentPoint, method, args) {
        switch (method) {
            case 'M':
                currentPoint.x = Number(args[0]);
                currentPoint.y = Number(args[1]);
                shape.graphics.moveTo(currentPoint.x, currentPoint.y);
                break;
            case 'm':
                currentPoint.x += Number(args[0]);
                currentPoint.y += Number(args[1]);
                shape.graphics.moveTo(currentPoint.x, currentPoint.y);
                break;
            case 'L':
                currentPoint.x = Number(args[0]);
                currentPoint.y = Number(args[1]);
                shape.graphics.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'l':
                currentPoint.x += Number(args[0]);
                currentPoint.y += Number(args[1]);
                shape.graphics.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'H':
                currentPoint.x = Number(args[0]);
                shape.graphics.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'h':
                currentPoint.x += Number(args[0]);
                shape.graphics.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'V':
                currentPoint.y = Number(args[0]);
                shape.graphics.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'v':
                currentPoint.y += Number(args[0]);
                shape.graphics.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'C':
                currentPoint.x1 = Number(args[0]);
                currentPoint.y1 = Number(args[1]);
                currentPoint.x2 = Number(args[2]);
                currentPoint.y2 = Number(args[3]);
                currentPoint.x = Number(args[4]);
                currentPoint.y = Number(args[5]);
                shape.graphics.bezierCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y);
                break;
            case 'c':
                currentPoint.x1 = currentPoint.x + Number(args[0]);
                currentPoint.y1 = currentPoint.y + Number(args[1]);
                currentPoint.x2 = currentPoint.x + Number(args[2]);
                currentPoint.y2 = currentPoint.y + Number(args[3]);
                currentPoint.x += Number(args[4]);
                currentPoint.y += Number(args[5]);
                shape.graphics.bezierCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y);
                break;
            case 'S':
                if (currentPoint.x1 && currentPoint.y1 && currentPoint.x2 && currentPoint.y2) {
                    currentPoint.x1 = currentPoint.x - currentPoint.x2 + currentPoint.x;
                    currentPoint.y1 = currentPoint.y - currentPoint.y2 + currentPoint.y;
                    currentPoint.x2 = Number(args[0]);
                    currentPoint.y2 = Number(args[1]);
                    currentPoint.x = Number(args[2]);
                    currentPoint.y = Number(args[3]);
                    shape.graphics.bezierCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y);
                } else {
                    currentPoint.x1 = Number(args[0]);
                    currentPoint.y1 = Number(args[1]);
                    currentPoint.x = Number(args[2]);
                    currentPoint.y = Number(args[3]);
                    shape.graphics.quadraticCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y);
                }
                break;
            case 's':
                if (currentPoint.x1 && currentPoint.y1 && currentPoint.x2 && currentPoint.y2) {
                    currentPoint.x1 = currentPoint.x - currentPoint.x2 + currentPoint.x;
                    currentPoint.y1 = currentPoint.y - currentPoint.y2 + currentPoint.y;
                    currentPoint.x2 = currentPoint.x + Number(args[0]);
                    currentPoint.y2 = currentPoint.y + Number(args[1]);
                    currentPoint.x += Number(args[2]);
                    currentPoint.y += Number(args[3]);
                    shape.graphics.bezierCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y);
                } else {
                    currentPoint.x1 = currentPoint.x + Number(args[0]);
                    currentPoint.y1 = currentPoint.y + Number(args[1]);
                    currentPoint.x += Number(args[2]);
                    currentPoint.y += Number(args[3]);
                    shape.graphics.quadraticCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y);
                }
                break;
            case 'Q':
                currentPoint.x1 = Number(args[0]);
                currentPoint.y1 = Number(args[1]);
                currentPoint.x = Number(args[2]);
                currentPoint.y = Number(args[3]);
                shape.graphics.quadraticCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y);
                break;
            case 'q':
                currentPoint.x1 = currentPoint.x + Number(args[0]);
                currentPoint.y1 = currentPoint.y + Number(args[1]);
                currentPoint.x += Number(args[2]);
                currentPoint.y += Number(args[3]);
                shape.graphics.quadraticCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y);
                break;
            case 'A':
                break;
            case 'a':
                break;
            case 'Z':
            case 'z':
                // shape.graphics.closePath();
                break;
            default:
                break;
        }
    }
}