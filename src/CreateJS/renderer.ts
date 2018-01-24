import { BezierPath } from '../bezierPath'
import { EllipsePath } from '../ellipsePath'
import { RectPath } from '../rectPath'

const validMethods = 'MLHVCSQRZmlhvcsqrz'

class VectorLayer extends createjs.Container {

    _sprite;
    _drawedFrame = 0;
    _keepFrameCache = {};

    constructor(sprite) {
        super();
        this._sprite = sprite;
        this._resetKeepFrameCache();
    }

    stepToFrame(frame) {
        if (frame < this._sprite.frames.length) {
            this._drawFrame(frame);
        }
    }

    _resetKeepFrameCache() {
        this._keepFrameCache = {}
        let lastKeep = 0;
        this._sprite.frames.forEach((frameItem, idx) => {
            if (!this._isKeepFrame(frameItem)) {
                lastKeep = idx;
            }
            else {
                this._keepFrameCache[idx] = lastKeep;
            }
        });
    }

    _requestKeepFrame(frame) {
        return this._keepFrameCache[frame]
    }

    _isKeepFrame(frameItem) {
        return frameItem.shapes && frameItem.shapes.length > 0 && frameItem.shapes[0].type === "keep";
    }

    _drawFrame(frame) {
        if (frame < this._sprite.frames.length) {
            let frameItem = this._sprite.frames[frame];
            if (this._isKeepFrame(frameItem)) {
                if (this._drawedFrame === this._requestKeepFrame(frame)) {
                    return;
                }
            }
            this.removeAllChildren();
            frameItem.shapes.forEach((shape) => {
                if (shape.type === "shape" && shape.pathArgs && shape.pathArgs.d) {
                    this.addChild(Renderer.requestBezierShape(new BezierPath(shape.pathArgs.d, shape.transform, shape.styles)));
                }
                else if (shape.type === "ellipse" && shape.pathArgs) {
                    this.addChild(Renderer.requestEllipseShape(new EllipsePath(parseFloat(shape.pathArgs.x) || 0.0, parseFloat(shape.pathArgs.y) || 0.0, parseFloat(shape.pathArgs.radiusX) || 0.0, parseFloat(shape.pathArgs.radiusY) || 0.0, shape.transform, shape.styles)));
                }
                else if (shape.type === "rect" && shape.pathArgs) {
                    this.addChild(Renderer.requestRectShape(new RectPath(parseFloat(shape.pathArgs.x) || 0.0, parseFloat(shape.pathArgs.y) || 0.0, parseFloat(shape.pathArgs.width) || 0.0, parseFloat(shape.pathArgs.height) || 0.0, parseFloat(shape.pathArgs.cornerRadius) || 0.0, shape.transform, shape.styles)));
                }
            })
            this._drawedFrame = frame;
        }
    }

}

export class Renderer {

    _owner;

    constructor(owner) {
        this._owner = owner;
    }

    requestContentLayer(sprite) {
        let bitmap;
        let contentLayer = new createjs.Container();
        if (sprite.imageKey) {
            bitmap = this._owner._dynamicImage[sprite.imageKey] || this._owner._videoItem.images[sprite.imageKey];
            if (bitmap) {
                contentLayer.addChild(this.requestBitmapLayer(bitmap, this._owner._dynamicImageTransform[sprite.imageKey], sprite.frames));
            }
            if (this._owner._dynamicText[sprite.imageKey]) {
                contentLayer.textLayer = this._owner._dynamicText[sprite.imageKey];
                contentLayer.addChild(this._owner._dynamicText[sprite.imageKey])
            }
        }
        contentLayer.addChild(this.requestVectorLayer(sprite));
        contentLayer.stepToFrame = (frame) => {
            if (frame < sprite.frames.length) {
                let frameItem = sprite.frames[frame];
                if (frameItem.alpha > 0.0) {
                    contentLayer.alpha = frameItem.alpha;
                    contentLayer.visible = true;
                    contentLayer.transformMatrix = new window.createjs.Matrix2D(frameItem.transform.a, frameItem.transform.b, frameItem.transform.c, frameItem.transform.d, frameItem.transform.tx, frameItem.transform.ty);
                    contentLayer.setBounds({ x: frameItem.layout.x, y: frameItem.layout.y, width: frameItem.layout.width, height: frameItem.layout.height });
                    if (frameItem.maskPath) {
                        contentLayer.mask = Renderer.requestBezierShape(frameItem.maskPath);
                        contentLayer.mask.transformMatrix = contentLayer.transformMatrix;
                    }
                    else {
                        contentLayer.mask = undefined;
                    }
                    if (contentLayer.textLayer) {
                        let offsetX = (contentLayer.textLayer.offset !== undefined && contentLayer.textLayer.offset.x !== undefined) ? contentLayer.textLayer.offset.x : 0;
                        let offsetY = (contentLayer.textLayer.offset !== undefined && contentLayer.textLayer.offset.y !== undefined) ? contentLayer.textLayer.offset.y : 0;
                        contentLayer.textLayer.textBaseline = "middle";
                        contentLayer.textLayer.x = (frameItem.layout.width - contentLayer.textLayer.getBounds().width) / 2.0 + offsetX;
                        contentLayer.textLayer.y = frameItem.layout.height / 2.0 + offsetY;
                    }
                }
                else {
                    contentLayer.visible = false;
                }
            }
            contentLayer.children.forEach((element) => {
                element.stepToFrame && element.stepToFrame(frame);
            })
        }
        return contentLayer;
    }

    requestBitmapLayer(bitmap, bitmapTransform, frames) {
        let imgTag = document.createElement('img');
        let backCanvas;
        if (bitmap.indexOf("iVBO") === 0 || bitmap.indexOf("/9j/2w") === 0) {
            imgTag.src = 'data:image/png;base64,' + bitmap;
        }
        else {
            imgTag.src = bitmap;
            if (frames[0] && frames[0].layout) {
                backCanvas = document.createElement('canvas');
                backCanvas.width = frames[0].layout.width
                backCanvas.height = frames[0].layout.height
                imgTag.onload = function() {
                    backCanvas.getContext('2d').drawImage(imgTag, 0, 0, frames[0].layout.width, frames[0].layout.height)
                }
            }
        }
        let layer = new createjs.Bitmap(backCanvas || imgTag);
        if (bitmapTransform !== undefined) {
            layer.transformMatrix = new createjs.Matrix2D(bitmapTransform[0], bitmapTransform[1], bitmapTransform[2], bitmapTransform[3], bitmapTransform[4], bitmapTransform[5]);
        }
        layer.frames = frames;
        layer.stepToFrame = (frame) => { }
        return layer;
    }

    requestVectorLayer(sprite) {
        return new VectorLayer(sprite);
    }

    drawFrame(frame) {
        this._owner.children.forEach((element) => {
            element.stepToFrame(frame);
        });
    }

    static resetStyle(obj, shape) {
        const styles = obj._styles;
        if (!styles) { return; }
        if (styles && styles.stroke) {
            shape.graphics.beginStroke(`rgba(${parseInt(styles.stroke[0] * 255)}, ${parseInt(styles.stroke[1] * 255)}, ${parseInt(styles.stroke[2] * 255)}, ${styles.stroke[3]})`);
        }
        if (styles) {
            const width = styles.strokeWidth || 0.0;
            const caps = styles.lineCap || '';
            const joints = styles.lineJoin || '';
            const miterLimit = styles.miterLimit || '';
            shape.graphics.setStrokeStyle(width, caps, joints, miterLimit, true);
        }
        if (styles && styles.fill) {
            shape.graphics.beginFill(`rgba(${parseInt(styles.fill[0] * 255)}, ${parseInt(styles.fill[1] * 255)}, ${parseInt(styles.fill[2] * 255)}, ${styles.fill[3]})`);
        }
        if (styles && styles.lineDash) {
            shape.graphics.setStrokeDash([styles.lineDash[0], styles.lineDash[1]], styles.lineDash[2]);
        }
    }

    static requestBezierShape(obj) {
        const shape = new createjs.Shape()
        const g = shape.graphics;
        this.resetStyle(obj, shape);
        let currentPoint = { x: 0, y: 0, x1: 0, y1: 0, x2: 0, y2: 0 }
        const d = obj._d.replace(/([a-zA-Z])/g, '|||$1 ').replace(/,/g, ' ');
        d.split('|||').forEach(segment => {
            if (segment.length == 0) { return; }
            const firstLetter = segment.substr(0, 1);
            if (validMethods.indexOf(firstLetter) >= 0) {
                const args = segment.substr(1).trim().split(" ");
                this.drawBezierElement(g, currentPoint, firstLetter, args);
            }
        })
        if (obj._transform !== undefined && obj._transform !== null) {
            shape.transformMatrix = new createjs.Matrix2D(obj._transform.a, obj._transform.b, obj._transform.c, obj._transform.d, obj._transform.tx, obj._transform.ty);
        }
        return shape;
    }

    static drawBezierElement(g, currentPoint, method, args) {
        switch (method) {
            case 'M':
                currentPoint.x = Number(args[0]);
                currentPoint.y = Number(args[1]);
                g.moveTo(currentPoint.x, currentPoint.y);
                break;
            case 'm':
                currentPoint.x += Number(args[0]);
                currentPoint.y += Number(args[1]);
                g.moveTo(currentPoint.x, currentPoint.y);
                break;
            case 'L':
                currentPoint.x = Number(args[0]);
                currentPoint.y = Number(args[1]);
                g.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'l':
                currentPoint.x += Number(args[0]);
                currentPoint.y += Number(args[1]);
                g.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'H':
                currentPoint.x = Number(args[0]);
                g.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'h':
                currentPoint.x += Number(args[0]);
                g.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'V':
                currentPoint.y = Number(args[0]);
                g.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'v':
                currentPoint.y += Number(args[0]);
                g.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'C':
                currentPoint.x1 = Number(args[0]);
                currentPoint.y1 = Number(args[1]);
                currentPoint.x2 = Number(args[2]);
                currentPoint.y2 = Number(args[3]);
                currentPoint.x = Number(args[4]);
                currentPoint.y = Number(args[5]);
                g.bezierCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y);
                break;
            case 'c':
                currentPoint.x1 = currentPoint.x + Number(args[0]);
                currentPoint.y1 = currentPoint.y + Number(args[1]);
                currentPoint.x2 = currentPoint.x + Number(args[2]);
                currentPoint.y2 = currentPoint.y + Number(args[3]);
                currentPoint.x += Number(args[4]);
                currentPoint.y += Number(args[5]);
                g.bezierCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y);
                break;
            case 'S':
                if (currentPoint.x1 && currentPoint.y1 && currentPoint.x2 && currentPoint.y2) {
                    currentPoint.x1 = currentPoint.x - currentPoint.x2 + currentPoint.x;
                    currentPoint.y1 = currentPoint.y - currentPoint.y2 + currentPoint.y;
                    currentPoint.x2 = Number(args[0]);
                    currentPoint.y2 = Number(args[1]);
                    currentPoint.x = Number(args[2]);
                    currentPoint.y = Number(args[3]);
                    g.bezierCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y);
                } else {
                    currentPoint.x1 = Number(args[0]);
                    currentPoint.y1 = Number(args[1]);
                    currentPoint.x = Number(args[2]);
                    currentPoint.y = Number(args[3]);
                    g.quadraticCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y);
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
                    g.bezierCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y);
                } else {
                    currentPoint.x1 = currentPoint.x + Number(args[0]);
                    currentPoint.y1 = currentPoint.y + Number(args[1]);
                    currentPoint.x += Number(args[2]);
                    currentPoint.y += Number(args[3]);
                    g.quadraticCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y);
                }
                break;
            case 'Q':
                currentPoint.x1 = Number(args[0]);
                currentPoint.y1 = Number(args[1]);
                currentPoint.x = Number(args[2]);
                currentPoint.y = Number(args[3]);
                g.quadraticCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y);
                break;
            case 'q':
                currentPoint.x1 = currentPoint.x + Number(args[0]);
                currentPoint.y1 = currentPoint.y + Number(args[1]);
                currentPoint.x += Number(args[2]);
                currentPoint.y += Number(args[3]);
                g.quadraticCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y);
                break;
            case 'A':
                break;
            case 'a':
                break;
            case 'Z':
            case 'z':
                g.closePath();
                break;
            default:
                break;
        }
    }

    static requestEllipseShape(obj) {
        const shape = new createjs.Shape()
        const g = shape.graphics;
        this.resetStyle(obj, shape);
        g.drawEllipse(obj._x - obj._radiusX, obj._y - obj._radiusY, obj._radiusX * 2, obj._radiusY * 2);
        if (obj._transform !== undefined && obj._transform !== null) {
            shape.transformMatrix = new createjs.Matrix2D(obj._transform.a, obj._transform.b, obj._transform.c, obj._transform.d, obj._transform.tx, obj._transform.ty);
        }
        return shape;
    }

    static requestRectShape(obj) {
        const shape = new createjs.Shape()
        const g = shape.graphics;
        this.resetStyle(obj, shape);
        g.drawRoundRect(obj._x, obj._y, obj._width, obj._height, obj._cornerRadius);
        if (obj._transform !== undefined && obj._transform !== null) {
            shape.transformMatrix = new createjs.Matrix2D(obj._transform.a, obj._transform.b, obj._transform.c, obj._transform.d, obj._transform.tx, obj._transform.ty);
        }
        return shape;
    }

}