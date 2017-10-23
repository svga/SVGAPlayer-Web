import { BezierPath } from '../bezierPath'
import { EllipsePath } from '../ellipsePath'
import { RectPath } from '../rectPath'

const validMethods = 'MLHVCSQRZ'

export class Renderer {

    _owner = undefined;
    _prepared = false;
    _undrawFrame = undefined;
    _bitmapCache = undefined;

    constructor(owner) {
        this._owner = owner;
    }

    prepare() {
        this._prepared = false;
        this._bitmapCache = undefined;
        if (this._owner._videoItem.images === undefined || Object.keys(this._owner._videoItem.images).length == 0) {
            this._bitmapCache = {};
            this._prepared = true;
            return;
        }
        if (this._bitmapCache === undefined) {
            this._bitmapCache = {};
            let totalCount = 0
            let loadedCount = 0
            for (var imageKey in this._owner._videoItem.images) {
                let src = this._owner._videoItem.images[imageKey];
                if (src.indexOf("iVBO") === 0 || src.indexOf("/9j/2w") === 0) {
                    totalCount++;
                    let imgTag = document.createElement('img');
                    imgTag.onload = function () {
                        loadedCount++;
                        if (loadedCount == totalCount) {
                            this._prepared = true;
                            if (typeof this._undrawFrame === "number") {
                                this.drawFrame(this._undrawFrame);
                                this._undrawFrame = undefined;
                            }
                        }
                    }.bind(this);
                    imgTag.src = 'data:image/png;base64,' + src;
                    this._bitmapCache[imageKey] = imgTag;
                }
            }
        }
    }

    clear() {
        const ctx = (this._owner._drawingCanvas || this._owner._container).getContext('2d')
        const areaFrame = {
            x: 0.0,
            y: 0.0,
            width: (this._owner._drawingCanvas || this._owner._container).width,
            height: (this._owner._drawingCanvas || this._owner._container).height,
        }
        ctx.clearRect(areaFrame.x, areaFrame.y, areaFrame.width, areaFrame.height)
    }

    drawFrame(frame) {
        if (this._prepared) {
            const ctx = (this._owner._drawingCanvas || this._owner._container).getContext('2d')
            const areaFrame = {
                x: 0.0,
                y: 0.0,
                width: (this._owner._drawingCanvas || this._owner._container).width,
                height: (this._owner._drawingCanvas || this._owner._container).height,
            }
            ctx.clearRect(areaFrame.x, areaFrame.y, areaFrame.width, areaFrame.height)
            this._owner._videoItem.sprites.forEach(sprite => {
                let frameItem = sprite.frames[this._owner._currentFrame];
                if (frameItem.alpha < 0.05) {
                    return;
                }
                ctx.save();
                if (this._owner._globalTransform) {
                    ctx.transform(this._owner._globalTransform.a, this._owner._globalTransform.b, this._owner._globalTransform.c, this._owner._globalTransform.d, this._owner._globalTransform.tx, this._owner._globalTransform.ty)
                }
                ctx.globalAlpha = frameItem.alpha;
                ctx.transform(frameItem.transform.a, frameItem.transform.b, frameItem.transform.c, frameItem.transform.d, frameItem.transform.tx, frameItem.transform.ty)
                let src = this._owner._dynamicImage[sprite.imageKey] || this._bitmapCache[sprite.imageKey] || this._owner._videoItem.images[sprite.imageKey];
                if (typeof src === "string") {
                    let imgTag = document.createElement('img');
                    if (src.indexOf("iVBO") === 0 || src.indexOf("/9j/2w") === 0) {
                        imgTag.src = 'data:image/png;base64,' + src;
                    }
                    else {
                        imgTag.src = src;
                    }
                    this._bitmapCache[sprite.imageKey] = imgTag;
                    if (frameItem.maskPath !== undefined && frameItem.maskPath !== null) {
                        this.drawBezier(ctx, frameItem.maskPath);
                        ctx.clip();
                    }
                    if (this._owner._dynamicImageTransform[sprite.imageKey] !== undefined) {
                        ctx.save();
                        const concatTransform = this._owner._dynamicImageTransform[sprite.imageKey];
                        ctx.transform(concatTransform[0], concatTransform[1], concatTransform[2], concatTransform[3], concatTransform[4], concatTransform[5]);
                    }
                    ctx.drawImage(imgTag, 0, 0);
                    if (this._owner._dynamicImageTransform[sprite.imageKey] !== undefined) {
                        ctx.restore();
                    }
                }
                else if (typeof src === "object") {
                    if (frameItem.maskPath !== undefined && frameItem.maskPath !== null) {
                        frameItem.maskPath._styles = undefined;
                        this.drawBezier(ctx, frameItem.maskPath);
                        ctx.clip();
                    }
                    if (this._owner._dynamicImageTransform[sprite.imageKey] !== undefined) {
                        ctx.save();
                        const concatTransform = this._owner._dynamicImageTransform[sprite.imageKey];
                        ctx.transform(concatTransform[0], concatTransform[1], concatTransform[2], concatTransform[3], concatTransform[4], concatTransform[5]);
                    }
                    ctx.drawImage(src, 0, 0);
                    if (this._owner._dynamicImageTransform[sprite.imageKey] !== undefined) {
                        ctx.restore();
                    }
                }
                frameItem.shapes && frameItem.shapes.forEach(shape => {
                    if (shape.type === "shape" && shape.pathArgs && shape.pathArgs.d) {
                        this.drawBezier(ctx, new BezierPath(shape.pathArgs.d, shape.transform, shape.styles))
                    }
                    if (shape.type === "ellipse" && shape.pathArgs) {
                        this.drawEllipse(ctx, new EllipsePath(parseFloat(shape.pathArgs.x) || 0.0, parseFloat(shape.pathArgs.y) || 0.0, parseFloat(shape.pathArgs.radiusX) || 0.0, parseFloat(shape.pathArgs.radiusY) || 0.0, shape.transform, shape.styles))
                    }
                    if (shape.type === "rect" && shape.pathArgs) {
                        this.drawRect(ctx, new RectPath(parseFloat(shape.pathArgs.x) || 0.0, parseFloat(shape.pathArgs.y) || 0.0, parseFloat(shape.pathArgs.width) || 0.0, parseFloat(shape.pathArgs.height) || 0.0, parseFloat(shape.pathArgs.cornerRadius) || 0.0, shape.transform, shape.styles))
                    }
                })
                let dynamicText = this._owner._dynamicText[sprite.imageKey];
                if (dynamicText !== undefined) {
                    ctx.textBaseline = "middle";
                    ctx.font = dynamicText.style;
                    let textWidth = ctx.measureText(dynamicText.text).width
                    ctx.fillStyle = dynamicText.color;
                    let offsetX = (dynamicText.offset !== undefined && dynamicText.offset.x !== undefined) ? isNaN(parseFloat(dynamicText.offset.x)) ? 0 : parseFloat(dynamicText.offset.x) : 0;
                    let offsetY = (dynamicText.offset !== undefined && dynamicText.offset.y !== undefined) ? isNaN(parseFloat(dynamicText.offset.y)) ? 0 : parseFloat(dynamicText.offset.y) : 0;
                    ctx.fillText(dynamicText.text, (frameItem.layout.width - textWidth) / 2 + offsetX, frameItem.layout.height / 2 + offsetY);
                }
                ctx.restore();
            });
        }
        else {
            this._undrawFrame = frame;
        }
    }

    resetShapeStyles(ctx, obj) {
        const styles = obj._styles;
        if (styles === undefined) { return; }
        if (styles && styles.stroke) {
            ctx.strokeStyle = `rgba(${parseInt(styles.stroke[0] * 255)}, ${parseInt(styles.stroke[1] * 255)}, ${parseInt(styles.stroke[2] * 255)}, ${styles.stroke[3]})`;
        }
        else {
            ctx.strokeStyle = "transparent"
        }
        if (styles) {
            ctx.lineWidth = styles.strokeWidth || undefined;
            ctx.lineCap = styles.lineCap || undefined;
            ctx.lineJoin = styles.lineJoin || undefined;
            ctx.miterLimit = styles.miterLimit || undefined;
        }
        if (styles && styles.fill) {
            ctx.fillStyle = `rgba(${parseInt(styles.fill[0] * 255)}, ${parseInt(styles.fill[1] * 255)}, ${parseInt(styles.fill[2] * 255)}, ${styles.fill[3]})`
        }
        else {
            ctx.fillStyle = "transparent"
        }
        if (styles && styles.lineDash) {
            ctx.setLineDash(styles.lineDash);
        }
    }

    drawBezier(ctx, obj) {
        ctx.save();
        this.resetShapeStyles(ctx, obj);
        if (obj._transform !== undefined && obj._transform !== null) {
            ctx.transform(obj._transform.a, obj._transform.b, obj._transform.c, obj._transform.d, obj._transform.tx, obj._transform.ty);
        }
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
        ctx.beginPath();
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
                    ctx.moveTo(point.x, point.y);
                    break;
                case 'm':
                    point.x += Number(arg[1]);
                    point.y += Number(arg[2]);
                    ctx.moveTo(point.x, point.y);
                    break;
                case 'L':
                    point.x = Number(arg[1]);
                    point.y = Number(arg[2]);
                    ctx.lineTo(point.x, point.y);
                    break;
                case 'l':
                    point.x += Number(arg[1]);
                    point.y += Number(arg[2]);
                    ctx.lineTo(point.x, point.y);
                    break;
                case 'H':
                    point.x = Number(arg[1]);
                    ctx.lineTo(point.x, point.y);
                    break;
                case 'h':
                    point.x += Number(arg[1]);
                    ctx.lineTo(point.x, point.y);
                    break;
                case 'V':
                    point.y = Number(arg[1]);
                    ctx.lineTo(point.x, point.y);
                    break;
                case 'v':
                    point.y += Number(arg[1]);
                    ctx.lineTo(point.x, point.y);
                    break;
                case 'C':
                    point.x1 = Number(arg[1]);
                    point.y1 = Number(arg[2]);
                    point.x2 = Number(arg[3]);
                    point.y2 = Number(arg[4]);
                    point.x = Number(arg[5]);
                    point.y = Number(arg[6]);
                    ctx.bezierCurveTo(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    break;
                case 'c':
                    point.x1 = point.x + Number(arg[1]);
                    point.y1 = point.y + Number(arg[2]);
                    point.x2 = point.x + Number(arg[3]);
                    point.y2 = point.y + Number(arg[4]);
                    point.x += Number(arg[5]);
                    point.y += Number(arg[6]);
                    ctx.bezierCurveTo(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    break;
                case 'S':
                    if (point.x1 && point.y1 && point.x2 && point.y2) {
                        point.x1 = point.x - point.x2 + point.x;
                        point.y1 = point.y - point.y2 + point.y;
                        point.x2 = Number(arg[1]);
                        point.y2 = Number(arg[2]);
                        point.x = Number(arg[3]);
                        point.y = Number(arg[4]);
                        ctx.bezierCurveTo(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    } else {
                        point.x1 = Number(arg[1]);
                        point.y1 = Number(arg[2]);
                        point.x = Number(arg[3]);
                        point.y = Number(arg[4]);
                        ctx.quadraticCurveTo(point.x1, point.y1, point.x, point.y);
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
                        ctx.bezierCurveTo(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    } else {
                        point.x1 = point.x + Number(arg[1]);
                        point.y1 = point.y + Number(arg[2]);
                        point.x += Number(arg[3]);
                        point.y += Number(arg[4]);
                        ctx.quadraticCurveTo(point.x1, point.y1, point.x, point.y);
                    }
                    break;
                case 'Q':
                    point.x1 = Number(arg[1]);
                    point.y1 = Number(arg[2]);
                    point.x = Number(arg[3]);
                    point.y = Number(arg[4]);
                    ctx.quadraticCurveTo(point.x1, point.y1, point.x, point.y);
                    break;
                case 'q':
                    point.x1 = point.x + Number(arg[1]);
                    point.y1 = point.y + Number(arg[2]);
                    point.x += Number(arg[3]);
                    point.y += Number(arg[4]);
                    ctx.quadraticCurveTo(point.x1, point.y1, point.x, point.y);
                    break;
                case 'A':
                    break;
                case 'a':
                    break;
                case 'Z':
                case 'z':
                    ctx.closePath();
                    break;
                default:
                    break;
            }
        }
        if (obj._styles && obj._styles.fill) {
            ctx.fill();
        }
        if (obj._styles && obj._styles.stroke) {
            ctx.stroke();
        }
        ctx.restore();
    }

    drawEllipse(ctx, obj) {
        ctx.save();
        this.resetShapeStyles(ctx, obj);
        if (obj._transform !== undefined && obj._transform !== null) {
            ctx.transform(obj._transform.a, obj._transform.b, obj._transform.c, obj._transform.d, obj._transform.tx, obj._transform.ty);
        }
        let x = obj._x - obj._radiusX;
        let y = obj._y - obj._radiusY;
        let w = obj._radiusX * 2;
        let h = obj._radiusY * 2;
        var kappa = .5522848,
            ox = (w / 2) * kappa,
            oy = (h / 2) * kappa,
            xe = x + w,
            ye = y + h,
            xm = x + w / 2,
            ym = y + h / 2;

        ctx.beginPath();
        ctx.moveTo(x, ym);
        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        if (obj._styles && obj._styles.fill) {
            ctx.fill();
        }
        if (obj._styles && obj._styles.stroke) {
            ctx.stroke();
        }
        ctx.restore();
    }

    drawRect(ctx, obj) {
        ctx.save();
        this.resetShapeStyles(ctx, obj);
        if (obj._transform !== undefined && obj._transform !== null) {
            ctx.transform(obj._transform.a, obj._transform.b, obj._transform.c, obj._transform.d, obj._transform.tx, obj._transform.ty);
        }
        let x = obj._x;
        let y = obj._y;
        let width = obj._width;
        let height = obj._height;
        let radius = obj._cornerRadius;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (obj._styles && obj._styles.fill) {
            ctx.fill();
        }
        if (obj._styles && obj._styles.stroke) {
            ctx.stroke();
        }
        ctx.restore();
    }

}
