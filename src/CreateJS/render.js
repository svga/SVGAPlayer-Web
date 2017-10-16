import { BezierPath } from '../bezierPath'
import { EllipsePath } from '../ellipsePath'
import { RectPath } from '../rectPath'

const validMethods = 'MLHVCSQRZ'

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
                if (shape.type === "shape" && shape.args && shape.args.d) {
                    this.addChild(Renderer.requestBezierShape(new BezierPath(shape.args.d, shape.transform, shape.styles)));
                }
                else if (shape.type === "ellipse" && shape.args) {
                    this.addChild(Renderer.requestEllipseShape(new EllipsePath(parseFloat(shape.args.x) || 0.0, parseFloat(shape.args.y) || 0.0, parseFloat(shape.args.radiusX) || 0.0, parseFloat(shape.args.radiusY) || 0.0, shape.transform, shape.styles)));
                }
                else if (shape.type === "rect" && shape.args) {
                    this.addChild(Renderer.requestRectShape(new RectPath(parseFloat(shape.args.x) || 0.0, parseFloat(shape.args.y) || 0.0, parseFloat(shape.args.width) || 0.0, parseFloat(shape.args.height) || 0.0, parseFloat(shape.args.cornerRadius) || 0.0, shape.transform, shape.styles)));
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
                this.textLayer = this._owner._dynamicText[sprite.imageKey];
                this.addChild(this._owner._dynamicText[sprite.imageKey])
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
                    if (this.textLayer) {
                        let offsetX = (layer.textLayer.offset !== undefined && layer.textLayer.offset.x !== undefined) ? layer.textLayer.offset.x : 0;
                        let offsetY = (layer.textLayer.offset !== undefined && layer.textLayer.offset.y !== undefined) ? layer.textLayer.offset.y : 0;
                        this.textLayer.textBaseline = "middle";
                        this.textLayer.x = (frameItem.layout.width - layer.textLayer.getBounds().width) / 2.0 + offsetX;
                        this.textLayer.y = frameItem.layout.height / 2.0 + offsetY;
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
        if (bitmap.indexOf("iVBO") === 0 || bitmap.indexOf("/9j/2w") === 0) {
            imgTag.src = 'data:image/png;base64,' + bitmap;
        }
        else {
            imgTag.src = bitmap;
        }
        let layer = new createjs.Bitmap(imgTag);
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
        let args = [];
        let tempArg = [];
        let items = obj._d.replace(/,/g, ' ').split(' ');
        let point = {
            x: 0,
            y: 0,
        };
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.length < 1) {
                continue;
            }
            let firstLetter = item.substr(0, 1);
            if (validMethods.indexOf(firstLetter) >= 0) {
                if (tempArg.length > 0) {
                    args.push(tempArg);
                    tempArg = [];
                }
                tempArg.push(firstLetter);
                if (item.substr(1).trim().length > 0) {
                    tempArg.push(item.substr(1));
                }
            } else {
                tempArg.push(item);
            }
        }
        if (tempArg.length > 0) {
            args.push(tempArg);
            tempArg = [];
        }
        for (let i = 0; i < args.length; i++) {
            let arg = args[i];
            if (!(arg[0] == 'C' || arg[0] == 'c')) {
                delete (point.x1);
                delete (point.y1);
                delete (point.x2);
                delete (point.y2);
            }
            switch (arg[0]) {
                case 'M':
                    point.x = Number(arg[1]);
                    point.y = Number(arg[2]);
                    g.moveTo(point.x, point.y);
                    break;
                case 'm':
                    point.x += Number(arg[1]);
                    point.y += Number(arg[2]);
                    g.moveTo(point.x, point.y);
                    break;
                case 'L':
                    point.x = Number(arg[1]);
                    point.y = Number(arg[2]);
                    g.lineTo(point.x, point.y);
                    break;
                case 'l':
                    point.x += Number(arg[1]);
                    point.y += Number(arg[2]);
                    g.lineTo(point.x, point.y);
                    break;
                case 'H':
                    point.x = Number(arg[1]);
                    g.lineTo(point.x, point.y);
                    break;
                case 'h':
                    point.x += Number(arg[1]);
                    g.lineTo(point.x, point.y);
                    break;
                case 'V':
                    point.y = Number(arg[1]);
                    g.lineTo(point.x, point.y);
                    break;
                case 'v':
                    point.y += Number(arg[1]);
                    g.lineTo(point.x, point.y);
                    break;
                case 'C':
                    point.x1 = Number(arg[1]);
                    point.y1 = Number(arg[2]);
                    point.x2 = Number(arg[3]);
                    point.y2 = Number(arg[4]);
                    point.x = Number(arg[5]);
                    point.y = Number(arg[6]);
                    g.bezierCurveTo(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    break;
                case 'c':
                    point.x1 = point.x + Number(arg[1]);
                    point.y1 = point.y + Number(arg[2]);
                    point.x2 = point.x + Number(arg[3]);
                    point.y2 = point.y + Number(arg[4]);
                    point.x += Number(arg[5]);
                    point.y += Number(arg[6]);
                    g.bezierCurveTo(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    break;
                case 'S':
                    if (point.x1 && point.y1 && point.x2 && point.y2) {
                        point.x1 = point.x - point.x2 + point.x;
                        point.y1 = point.y - point.y2 + point.y;
                        point.x2 = Number(arg[1]);
                        point.y2 = Number(arg[2]);
                        point.x = Number(arg[3]);
                        point.y = Number(arg[4]);
                        g.bezierCurveTo(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    } else {
                        point.x1 = Number(arg[1]);
                        point.y1 = Number(arg[2]);
                        point.x = Number(arg[3]);
                        point.y = Number(arg[4]);
                        g.quadraticCurveTo(point.x1, point.y1, point.x, point.y);
                    }
                    break;
                case 's':
                    if (point.x1 && point.y1 && point.x2 && point.y2) {
                        point.x1 = point.x - point.x2 + point.x;
                        point.y1 = point.y - point.y2 + point.y;
                        point.x2 = point.x + Number(arg[1]);
                        point.y2 = point.y + Number(arg[2]);
                        point.x += Number(arg[3]);
                        point.y += Number(arg[4]);
                        g.bezierCurveTo(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    } else {
                        point.x1 = point.x + Number(arg[1]);
                        point.y1 = point.y + Number(arg[2]);
                        point.x += Number(arg[3]);
                        point.y += Number(arg[4]);
                        g.quadraticCurveTo(point.x1, point.y1, point.x, point.y);
                    }
                    break;
                case 'Q':
                    point.x1 = Number(arg[1]);
                    point.y1 = Number(arg[2]);
                    point.x = Number(arg[3]);
                    point.y = Number(arg[4]);
                    g.quadraticCurveTo(point.x1, point.y1, point.x, point.y);
                    break;
                case 'q':
                    point.x1 = point.x + Number(arg[1]);
                    point.y1 = point.y + Number(arg[2]);
                    point.x += Number(arg[3]);
                    point.y += Number(arg[4]);
                    g.quadraticCurveTo(point.x1, point.y1, point.x, point.y);
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
        if (obj._transform !== undefined && obj._transform !== null) {
            shape.transformMatrix = new createjs.Matrix2D(obj._transform.a, obj._transform.b, obj._transform.c, obj._transform.d, obj._transform.tx, obj._transform.ty);
        }
        return shape;
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

    static Text(text, style, color) {
        let layer = new window.createjs.Text(text, style, color);
        layer.setState = (state) => { CreateJSRender.setState(layer, state); }
        return layer;
    }

}