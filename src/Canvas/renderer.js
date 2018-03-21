import { BezierPath } from '../bezierPath'
import { EllipsePath } from '../ellipsePath'
import { RectPath } from '../rectPath'

const validMethods = 'MLHVCSQRZmlhvcsqrz'

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
                    let imgTag = this._bitmapCache[sprite.imageKey] || document.createElement('img');
                    let targetWidth = undefined;
                    let targetHeight = undefined;
                    if (src.indexOf("iVBO") === 0 || src.indexOf("/9j/2w") === 0) {
                        imgTag.src = 'data:image/png;base64,' + src;
                    }
                    else {
                        if (imgTag._svgaSrc !== src) {
                            imgTag._svgaSrc = src;
                            imgTag.src = src;
                        }
                        targetWidth = frameItem.layout.width;
                        targetHeight = frameItem.layout.height;
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
                    if (targetWidth && targetHeight) { ctx.drawImage(imgTag, 0, 0, targetWidth, targetHeight); }
                    else { ctx.drawImage(imgTag, 0, 0); }
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
                console.log(sprite.imageKey);
                if (dynamicText !== undefined) {
                    let colorInfo = dynamicText.color;
                    let shadowInfo = dynamicText.textShadow;
                    ctx.textBaseline = "middle";
                    ctx.font = dynamicText.style;
                    let textWidth = ctx.measureText(dynamicText.text).width;
                    //text shadow
                    if(Object.prototype.toString.call(shadowInfo) == "[object Object]"){
                        ctx.shadowColor = shadowInfo.color;
                        ctx.shadowOffsetX = shadowInfo.offsetX;
                        ctx.shadowOffsetY = shadowInfo.offsetY;
                        ctx.shadowBlur = shadowInfo.blur;
                    }
                    //linear-gradient
                    if(Object.prototype.toString.call(colorInfo) == "[object Object]"){
                        let direction;
                        try{
                            switch(colorInfo.direction){
                                case "to left":
                                    direction=[frameItem.layout.width,0,0,0];
                                break;
                                case "to right":
                                    direction=[0,0,0,frameItem.layout.width];
                                break;
                                case "to top":
                                    direction=[0,frameItem.layout.height,0,0];
                                break;
                                case "to bottom":
                                    direction=[0,0,0,frameItem.layout.height];
                                break;
                                default:
                                    direction=[frameItem.layout.width,0,0,0];
                                break;

                            }
                            let gradient = ctx.createLinearGradient(direction[0],direction[1],direction[2],direction[3]);
                            gradient.addColorStop(0,colorInfo.starColor);
                            gradient.addColorStop(1,colorInfo.stopColor);
                            ctx.fillStyle = gradient
                        }catch(e){
                            ctx.fillStyle = dynamicText.color;
                        }
                    }else{
                        ctx.fillStyle = dynamicText.color;
                    }
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
        let currentPoint = { x: 0, y: 0, x1: 0, y1: 0, x2: 0, y2: 0 }
        ctx.beginPath();
        const d = obj._d.replace(/([a-zA-Z])/g, '|||$1 ').replace(/,/g, ' ');
        d.split('|||').forEach(segment => {
            if (segment.length == 0) { return; }
            const firstLetter = segment.substr(0, 1);
            if (validMethods.indexOf(firstLetter) >= 0) {
                const args = segment.substr(1).trim().split(" ");
                this.drawBezierElement(ctx, currentPoint, firstLetter, args);
            }
        })
        if (obj._styles && obj._styles.fill) {
            ctx.fill();
        }
        if (obj._styles && obj._styles.stroke) {
            ctx.stroke();
        }
        ctx.restore();
    }

    drawBezierElement(ctx, currentPoint, method, args) {
        switch (method) {
            case 'M':
                currentPoint.x = Number(args[0]);
                currentPoint.y = Number(args[1]);
                ctx.moveTo(currentPoint.x, currentPoint.y);
                break;
            case 'm':
                currentPoint.x += Number(args[0]);
                currentPoint.y += Number(args[1]);
                ctx.moveTo(currentPoint.x, currentPoint.y);
                break;
            case 'L':
                currentPoint.x = Number(args[0]);
                currentPoint.y = Number(args[1]);
                ctx.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'l':
                currentPoint.x += Number(args[0]);
                currentPoint.y += Number(args[1]);
                ctx.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'H':
                currentPoint.x = Number(args[0]);
                ctx.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'h':
                currentPoint.x += Number(args[0]);
                ctx.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'V':
                currentPoint.y = Number(args[0]);
                ctx.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'v':
                currentPoint.y += Number(args[0]);
                ctx.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'C':
                currentPoint.x1 = Number(args[0]);
                currentPoint.y1 = Number(args[1]);
                currentPoint.x2 = Number(args[2]);
                currentPoint.y2 = Number(args[3]);
                currentPoint.x = Number(args[4]);
                currentPoint.y = Number(args[5]);
                ctx.bezierCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y);
                break;
            case 'c':
                currentPoint.x1 = currentPoint.x + Number(args[0]);
                currentPoint.y1 = currentPoint.y + Number(args[1]);
                currentPoint.x2 = currentPoint.x + Number(args[2]);
                currentPoint.y2 = currentPoint.y + Number(args[3]);
                currentPoint.x += Number(args[4]);
                currentPoint.y += Number(args[5]);
                ctx.bezierCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y);
                break;
            case 'S':
                if (currentPoint.x1 && currentPoint.y1 && currentPoint.x2 && currentPoint.y2) {
                    currentPoint.x1 = currentPoint.x - currentPoint.x2 + currentPoint.x;
                    currentPoint.y1 = currentPoint.y - currentPoint.y2 + currentPoint.y;
                    currentPoint.x2 = Number(args[0]);
                    currentPoint.y2 = Number(args[1]);
                    currentPoint.x = Number(args[2]);
                    currentPoint.y = Number(args[3]);
                    ctx.bezierCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y);
                } else {
                    currentPoint.x1 = Number(args[0]);
                    currentPoint.y1 = Number(args[1]);
                    currentPoint.x = Number(args[2]);
                    currentPoint.y = Number(args[3]);
                    ctx.quadraticCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y);
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
                    ctx.bezierCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y);
                } else {
                    currentPoint.x1 = currentPoint.x + Number(args[0]);
                    currentPoint.y1 = currentPoint.y + Number(args[1]);
                    currentPoint.x += Number(args[2]);
                    currentPoint.y += Number(args[3]);
                    ctx.quadraticCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y);
                }
                break;
            case 'Q':
                currentPoint.x1 = Number(args[0]);
                currentPoint.y1 = Number(args[1]);
                currentPoint.x = Number(args[2]);
                currentPoint.y = Number(args[3]);
                ctx.quadraticCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y);
                break;
            case 'q':
                currentPoint.x1 = currentPoint.x + Number(args[0]);
                currentPoint.y1 = currentPoint.y + Number(args[1]);
                currentPoint.x += Number(args[2]);
                currentPoint.y += Number(args[3]);
                ctx.quadraticCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y);
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

        if (width < 2 * radius) {radius = width / 2;}
        if (height < 2 * radius){ radius = height / 2;}

        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
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
