import { BezierPath } from '../bezierPath'
import { EllipsePath } from '../ellipsePath'
import { RectPath } from '../rectPath'

const validMethods = 'MLHVCSQRZ'

class ShapeSprite extends Laya.Sprite {

    customGraphics = {
        currentPath: [],
    };

    constructor() {
        super();
        this.customRenderEnable = true;
    }

    getBounds() {
        return { x: 0, y: 0, width: 3000, height: 3000 }
    }

    beginFill(fillStyle) {
        this.customGraphics.fillStyle = fillStyle;
    }

    beginStroke(stroke) {
        this.customGraphics.strokeStyle = stroke;
    }

    setStrokeStyle(width, caps, joints, miterLimit) {
        this.customGraphics.lineCap = caps;
        this.customGraphics.lineJoin = joints;
        this.customGraphics.lineWidth = width;
        this.customGraphics.miterLimit = miterLimit;
    }

    setStrokeDash(arr, arg) {
        this.customGraphics.strokeDash = { arr, arg }
    }

    moveTo(x, y) {
        this.customGraphics.currentPath.push(["moveTo", x, y]);
    }

    lineTo(x, y) {
        this.customGraphics.currentPath.push(["lineTo", x, y]);
    }

    bezierCurveTo(x1, y1, x2, y2, x, y) {
        this.customGraphics.currentPath.push(["bezierCurveTo", x1, y1, x2, y2, x, y]);
    }

    quadraticCurveTo(x1, y1, x, y) {
        this.customGraphics.currentPath.push(["quadraticCurveTo", x1, y1, x, y]);
    }

    closePath() {
        this.customGraphics.currentPath.push(["closePath"]);
    }

    drawEllipse(left, top, dX, dY) {
        if (this.customGraphics.currentPath === undefined) {
            this.customGraphics.currentPath = [];
        }
        this.customGraphics.currentPath.push(["ellipse", left, top, dX, dY]);
    }

    drawRoundRect(x, y, width, height, cornerRadius) {
        if (this.customGraphics.currentPath === undefined) {
            this.customGraphics.currentPath = [];
        }
        this.customGraphics.currentPath.push(["rect", x, y, width, height, cornerRadius]);
    }

    customRender(render, x, y) {
        let tx = 0.0;
        let ty = 0.0;
        if (render.ctx instanceof Laya.WebGLContext2D) {
            const mat = render.ctx._curMat;
            tx = render.ctx._curMat.tx / render.ctx._curMat.a
            ty = render.ctx._curMat.ty / render.ctx._curMat.d
        }
        if (typeof this.customGraphics.fillStyle === 'string') {
            if (render.ctx instanceof Laya.WebGLContext2D) {
                if (this.customGraphics.fillStyle.startsWith('rgba')) {
                    const components = this.customGraphics.fillStyle.replace('rgba(', '').replace(')').split(',');
                    render.ctx.fillStyle = Laya.Color.create('#' + parseInt(components[0]).toString(16) + parseInt(components[1]).toString(16) + parseInt(components[2]).toString(16))
                }
                else {
                    render.ctx.fillStyle = this.customGraphics.fillStyle;
                }
            }
            else {
                render.ctx.fillStyle = this.customGraphics.fillStyle;
            }
        }
        if (typeof this.customGraphics.strokeStyle === 'string') {
            if (render.ctx instanceof Laya.WebGLContext2D) {
                if (this.customGraphics.strokeStyle.startsWith('rgba')) {
                    const components = this.customGraphics.strokeStyle.replace('rgba(', '').replace(')').split(',');
                    render.ctx.strokeStyle = Laya.Color.create('#' + parseInt(components[0]).toString(16) + parseInt(components[1]).toString(16) + parseInt(components[2]).toString(16))
                }
                else {
                    render.ctx.strokeStyle = this.customGraphics.strokeStyle;
                }
            }
            else {
                render.ctx.strokeStyle = this.customGraphics.strokeStyle;
            }
        }
        render.ctx.lineCap = this.customGraphics.lineCap;
        render.ctx.lineJoin = this.customGraphics.lineJoin;
        render.ctx.lineWidth = this.customGraphics.lineWidth;
        render.ctx.miterLimit = this.customGraphics.miterLimit;
        if (this.customGraphics.strokeDash !== undefined) {
            const { arr, arg } = this.customGraphics.strokeDash;
            const newArr = [];
            arr.forEach(item => newArr.push(item));
            newArr.push(arg);
            render.ctx.setLineDash && render.ctx.setLineDash(newArr);
        }
        if (this.customGraphics.currentPath instanceof Array) {
            render.ctx.beginPath();
            this.customGraphics.currentPath.forEach((item) => {
                if (item[0] === "moveTo") {
                    const tPoint = { x: item[1], y: item[2] };
                    render.ctx.moveTo(tPoint.x, tPoint.y);
                }
                else if (item[0] === "lineTo") {
                    const tPoint = { x: item[1], y: item[2] };
                    render.ctx.lineTo(tPoint.x, tPoint.y);
                }
                else if (item[0] === "bezierCurveTo") {
                    const tPoint1 = { x: item[1], y: item[2] };
                    const tPoint2 = { x: item[3], y: item[4] };
                    const tPoint3 = { x: item[5], y: item[6] };
                    render.ctx.bezierCurveTo(tPoint1.x, tPoint1.y, tPoint2.x, tPoint2.y, tPoint3.x, tPoint3.y);
                }
                else if (item[0] === "quadraticCurveTo") {
                    const tPoint1 = { x: item[1], y: item[2] };
                    const tPoint2 = { x: item[3], y: item[4] };
                    render.ctx.quadraticCurveTo(tPoint1.x, tPoint1.y, tPoint2.x, tPoint2.y);
                }
                else if (item[0] === "closePath") {
                    render.ctx.closePath();
                }
                else if (item[0] === "ellipse") {
                    let x = item[1];
                    let y = item[2];
                    let w = item[3];
                    let h = item[4];
                    var kappa = .5522848,
                        ox = (w / 2) * kappa,
                        oy = (h / 2) * kappa,
                        xe = x + w,
                        ye = y + h,
                        xm = x + w / 2,
                        ym = y + h / 2;

                    render.ctx.beginPath();
                    render.ctx.moveTo(x, ym);
                    render.ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
                    render.ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
                    render.ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
                    render.ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
                }
                else if (item[0] === "rect") {
                    const tPoint = { x: item[1], y: item[2] };
                    let x = tPoint.x;
                    let y = tPoint.y;
                    let width = item[3];
                    let height = item[4];
                    let radius = item[5];
                    render.ctx.moveTo(x + radius, y);
                    render.ctx.lineTo(x + width - radius, y);
                    render.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                    render.ctx.lineTo(x + width, y + height - radius);
                    render.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                    render.ctx.lineTo(x + radius, y + height);
                    render.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                    render.ctx.lineTo(x, y + radius);
                    render.ctx.quadraticCurveTo(x, y, x + radius, y);
                    render.ctx.lineTo(x, y);
                    render.ctx.closePath();
                }
            })
        }
        this.customGraphics.fillStyle && render.ctx.fill();
        this.customGraphics.strokeStyle && render.ctx.stroke();
    }

}

class VectorLayer extends Laya.Sprite {

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
            this.removeChildren(0, this.numChildren);
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
        let contentLayer = new Laya.Sprite();
        if (sprite.imageKey) {
            bitmap = this._owner._dynamicImage[sprite.imageKey] || this._owner._videoItem.images[sprite.imageKey];
            if (bitmap) {
                contentLayer.addChild(this.requestBitmapLayer(bitmap, this._owner._dynamicImageTransform[sprite.imageKey], sprite.frames));
            }
            if (this._owner._dynamicText[sprite.imageKey]) {
                this.textLayer = this._owner._dynamicText[sprite.imageKey];
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
                    contentLayer.transform = new Laya.Matrix(frameItem.transform.a, frameItem.transform.b, frameItem.transform.c, frameItem.transform.d, frameItem.transform.tx, frameItem.transform.ty);
                    contentLayer.setBounds(new Laya.Rectangle(frameItem.layout.x, frameItem.layout.y, frameItem.layout.width, frameItem.layout.height));
                    contentLayer.mask = undefined;
                    if (frameItem.maskPath) {
                        contentLayer.mask = Renderer.requestBezierShape(frameItem.maskPath);
                        contentLayer.mask.transform = contentLayer.transform;
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
            for (let index = 0; index < contentLayer.numChildren; index++) {
                const child = contentLayer.getChildAt(index);
                child.stepToFrame && child.stepToFrame(frame);
            }
        }
        return contentLayer;
    }

    requestBitmapLayer(bitmap, bitmapTransform, frames) {
        let layer = new Laya.Sprite();
        if (bitmap.indexOf("iVBO") === 0 || bitmap.indexOf("/9j/2w") === 0) {
            layer.loadImage('data:image/png;base64,' + bitmap);
        }
        else {
            layer.loadImage(bitmap);
        }
        if (bitmapTransform !== undefined) {
            layer.transform = new Laya.Matrix(bitmapTransform[0], bitmapTransform[1], bitmapTransform[2], bitmapTransform[3], bitmapTransform[4], bitmapTransform[5]);
        }
        layer.frames = frames;
        layer.stepToFrame = (frame) => { }
        return layer;
    }

    requestVectorLayer(sprite) {
        return new VectorLayer(sprite);
    }

    drawFrame(frame) {
        for (let index = 0; index < this._owner.numChildren; index++) {
            const child = this._owner.getChildAt(index);
            child.stepToFrame(frame);
        }
    }

    static resetStyle(obj, shape) {
        const styles = obj._styles;
        if (!styles) { return; }
        if (styles && styles.stroke) {
            shape.beginStroke(`rgba(${parseInt(styles.stroke[0] * 255)}, ${parseInt(styles.stroke[1] * 255)}, ${parseInt(styles.stroke[2] * 255)}, ${styles.stroke[3]})`);
        }
        if (styles) {
            const width = styles.strokeWidth || 0.0;
            const caps = styles.lineCap || '';
            const joints = styles.lineJoin || '';
            const miterLimit = styles.miterLimit || '';
            shape.setStrokeStyle(width, caps, joints, miterLimit, true);
        }
        if (styles && styles.fill) {
            shape.beginFill(`rgba(${parseInt(styles.fill[0] * 255)}, ${parseInt(styles.fill[1] * 255)}, ${parseInt(styles.fill[2] * 255)}, ${styles.fill[3]})`);
        }
        if (styles && styles.lineDash) {
            shape.setStrokeDash([styles.lineDash[0], styles.lineDash[1]], styles.lineDash[2]);
        }
    }

    static requestBezierShape(obj) {
        const shape = new ShapeSprite()
        const g = shape;
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
            shape.transform = new Laya.Matrix(obj._transform.a, obj._transform.b, obj._transform.c, obj._transform.d, obj._transform.tx, obj._transform.ty);
        }
        return shape;
    }

    static requestEllipseShape(obj) {
        const shape = new ShapeSprite()
        const g = shape;
        this.resetStyle(obj, shape);
        g.drawEllipse(obj._x - obj._radiusX, obj._y - obj._radiusY, obj._radiusX * 2, obj._radiusY * 2);
        if (obj._transform !== undefined && obj._transform !== null) {
            shape.transform = new Laya.Matrix(obj._transform.a, obj._transform.b, obj._transform.c, obj._transform.d, obj._transform.tx, obj._transform.ty);
        }
        return shape;
    }

    static requestRectShape(obj) {
        const shape = new ShapeSprite()
        const g = shape;
        this.resetStyle(obj, shape);
        g.drawRoundRect(obj._x, obj._y, obj._width, obj._height, obj._cornerRadius);
        if (obj._transform !== undefined && obj._transform !== null) {
            shape.transform = new Laya.Matrix(obj._transform.a, obj._transform.b, obj._transform.c, obj._transform.d, obj._transform.tx, obj._transform.ty);
        }
        return shape;
    }

    static Text(text, style, color) {
        let layer = new Laya.Text();
        // layer.setState = (state) => { CreateJSRender.setState(layer, state); }
        return layer;
    }

}