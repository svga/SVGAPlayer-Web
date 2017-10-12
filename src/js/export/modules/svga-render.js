import SVGABezierPath from './svga-bezierPath'
import SVGAEllipsePath from './svga-ellipsePath'
import SVGARectPath from './svga-rectPath'

export default class CanvasRender {

    static Stage(arg1, arg2, arg3) {
        return {
            setState: () => { },
            removeAllChildren: () => { },
            addChild: () => { },
            update: (player) => {
                CanvasRender.Draw(player);
            },
        };
    }

    static RedrawTimeout;

    static Draw(player, onCanvas, inRect) {
        if (player.isPaused === true) {
            // Dont return.
        }
        else if (!player._canvasAnimating && player.clearsAfterStop) {
            var canvas = onCanvas || player._drawingCanvas || player._canvas;
            if (canvas !== undefined) {
                var ctx = canvas.getContext("2d");
                if (onCanvas === undefined) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                }
            }
            return;
        }
        if (player._videoItem.bitmapCache === undefined) {
            player._videoItem.bitmapCache = {};
            for (var imageKey in player._videoItem.images) {
                var src = player._videoItem.images[imageKey];
                if (src.indexOf("iVBO") === 0 || src.indexOf("/9j/2w") === 0) {
                    let imgTag = document.createElement('img');
                    const inRect = inRect === undefined ? undefined : Object.assign({}, inRect)
                    imgTag.onload = function () {
                        clearTimeout(CanvasRender.RedrawTimeout);
                        CanvasRender.RedrawTimeout = setTimeout(() => { CanvasRender.Draw(player, onCanvas, inRect); });
                    }
                    imgTag.src = 'data:image/png;base64,' + src;
                    player._videoItem.bitmapCache[imageKey] = imgTag;
                }
            }
        }
        var canvas = onCanvas || player._drawingCanvas || player._canvas;
        if (canvas !== undefined) {
            var ctx = canvas.getContext("2d");
            if (inRect === undefined) {
                inRect = { x: 0, y: 0, width: canvas.width, height: canvas.height }
            }
            if (onCanvas === undefined) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            ctx.save();
            ctx.setTransform(
                inRect.width / player._videoItem.videoSize.width,
                0.0,
                0.0,
                inRect.width / player._videoItem.videoSize.width,
                inRect.x,
                (inRect.height - inRect.width / player._videoItem.videoSize.width * player._videoItem.videoSize.height) / 2.0 + inRect.y,
            );
            player._videoItem.sprites.forEach(sprite => {
                let frameItem = sprite.frames[player._currentFrame];
                if (frameItem.alpha < 0.05) {
                    return;
                }
                ctx.save();
                ctx.globalAlpha = frameItem.alpha;
                ctx.transform(frameItem.transform.a, frameItem.transform.b, frameItem.transform.c, frameItem.transform.d, frameItem.transform.tx, frameItem.transform.ty)
                let src = player._dynamicImage[sprite.imageKey] || player._videoItem.bitmapCache[sprite.imageKey] || player._videoItem.images[sprite.imageKey];
                if (typeof src === "string") {
                    let imgTag = document.createElement('img');
                    if (src.indexOf("iVBO") === 0 || src.indexOf("/9j/2w") === 0) {
                        imgTag.src = 'data:image/png;base64,' + src;
                    }
                    else {
                        imgTag.src = src;
                    }
                    player._videoItem.bitmapCache[sprite.imageKey] = imgTag;
                    if (frameItem.maskPath !== undefined && frameItem.maskPath !== null) {
                        frameItem.maskPath.getShape(CanvasRender).draw(ctx, true);
                        ctx.clip();
                    }
                    if (player._dynamicImageTransform[sprite.imageKey] !== undefined) {
                        ctx.save();
                        const concatTransform = player._dynamicImageTransform[sprite.imageKey];
                        ctx.transform(concatTransform[0], concatTransform[1], concatTransform[2], concatTransform[3], concatTransform[4], concatTransform[5]);
                    }
                    ctx.drawImage(imgTag, 0, 0);
                    if (player._dynamicImageTransform[sprite.imageKey] !== undefined) {
                        ctx.restore();
                    }
                }
                else if (typeof src === "object") {
                    if (frameItem.maskPath !== undefined && frameItem.maskPath !== null) {
                        frameItem.maskPath.getShape(CanvasRender).draw(ctx, true);
                        ctx.clip();
                    }
                    if (player._dynamicImageTransform[sprite.imageKey] !== undefined) {
                        ctx.save();
                        const concatTransform = player._dynamicImageTransform[sprite.imageKey];
                        ctx.transform(concatTransform[0], concatTransform[1], concatTransform[2], concatTransform[3], concatTransform[4], concatTransform[5]);
                    }
                    ctx.drawImage(src, 0, 0);
                    if (player._dynamicImageTransform[sprite.imageKey] !== undefined) {
                        ctx.restore();
                    }
                }
                frameItem.shapes && frameItem.shapes.forEach(shape => {
                    if (shape.type === "shape" && shape.args && shape.args.d) {
                        new SVGABezierPath(shape.args.d, shape.transform, shape.styles).getShape(CanvasRender).draw(ctx);
                    }
                    if (shape.type === "ellipse" && shape.args) {
                        let ellipse = new SVGAEllipsePath(parseFloat(shape.args.x) || 0.0, parseFloat(shape.args.y) || 0.0, parseFloat(shape.args.radiusX) || 0.0, parseFloat(shape.args.radiusY) || 0.0, shape.transform, shape.styles);
                        ellipse.getShape(CanvasRender).draw(ctx);
                    }
                    if (shape.type === "rect" && shape.args) {
                        let rect = new SVGARectPath(parseFloat(shape.args.x) || 0.0, parseFloat(shape.args.y) || 0.0, parseFloat(shape.args.width) || 0.0, parseFloat(shape.args.height) || 0.0, parseFloat(shape.args.cornerRadius) || 0.0, shape.transform, shape.styles);
                        rect.getShape(CanvasRender).draw(ctx);
                    }
                })
                let dynamicText = player._dynamicText[sprite.imageKey];
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
            ctx.restore();
        }
    }

    static Container() {
        return {
            setState: () => { },
            removeAllChildren: () => { },
            addChild: () => { },
            children: () => [],
        };
    }

    static AddTimer(callee, callback) {
        let requestAnimationFrame;
        if (window.requestAnimationFrame !== undefined) {
            requestAnimationFrame = window.requestAnimationFrame;
        }
        else {
            requestAnimationFrame = (callback) => { window.setTimeout(callback, 16) }
        }
        callee._canvasAnimating = true;
        callee.drawOnCanvas = (canvas, x, y, width, height) => { CanvasRender.Draw(callee, canvas, { x, y, width, height }); }
        let cancelled = false;
        let doFrame = () => {
            requestAnimationFrame(() => {
                if (cancelled === false) {
                    callback && callback.call(callee);
                    doFrame();
                }
            });
        }
        doFrame();
        return () => { callee._canvasAnimating = false; cancelled = true; };
    }

    static RemoveTimer(callee, handler) {
        return handler && handler();
    }

    static Matrix2D(a, b, c, d, tx, ty) {
        return { a, b, c, d, tx, ty };
    }

    static Shape() {
        let layer = {
            draw: (ctx, noFill) => {
                ctx.save();
                if (layer.transform !== undefined && layer.transform !== null) {
                    ctx.transform(layer.transform.a, layer.transform.b, layer.transform.c, layer.transform.d, layer.transform.tx, layer.transform.ty);
                }
                ctx.fillStyle = layer.graphics.fillStyle;
                ctx.strokeStyle = layer.graphics.strokeStyle;
                ctx.lineCap = layer.graphics.lineCap;
                ctx.lineJoin = layer.graphics.lineJoin;
                ctx.lineWidth = layer.graphics.lineWidth;
                ctx.miterLimit = layer.graphics.miterLimit;
                if (layer.graphics.strokeDash !== undefined) {
                    const { arr, arg } = layer.graphics.strokeDash;
                    const newArr = [];
                    arr.forEach(item => newArr.push(item));
                    newArr.push(arg);
                    ctx.setLineDash(newArr);
                }
                if (layer.graphics.currentPath instanceof Array) {
                    ctx.beginPath();
                    layer.graphics.currentPath.forEach((item) => {
                        if (item[0] === "moveTo") {
                            ctx.moveTo(item[1], item[2]);
                        }
                        else if (item[0] === "lineTo") {
                            ctx.lineTo(item[1], item[2]);
                        }
                        else if (item[0] === "bezierCurveTo") {
                            ctx.bezierCurveTo(item[1], item[2], item[3], item[4], item[5], item[6]);
                        }
                        else if (item[0] === "quadraticCurveTo") {
                            ctx.quadraticCurveTo(item[1], item[2], item[3], item[4]);
                        }
                        else if (item[0] === "closePath") {
                            ctx.closePath();
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

                            ctx.beginPath();
                            ctx.moveTo(x, ym);
                            ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
                            ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
                            ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
                            ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
                        }
                        else if (item[0] === "rect") {
                            let x = item[1];
                            let y = item[2];
                            let width = item[3];
                            let height = item[4];
                            let radius = item[5];
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
                        }
                    })
                }
                layer.graphics.fillStyle && noFill !== true && ctx.fill();
                layer.graphics.strokeStyle && ctx.stroke();
                ctx.restore();
            },
        };
        layer.setState = (state) => { layer.transform = state.transform; };
        layer.graphics = {};
        layer.graphics.currentPath = [];
        layer.graphics.beginFill = (fillStyle) => {
            layer.graphics.fillStyle = fillStyle;
        }
        layer.graphics.beginStroke = (stroke) => {
            layer.graphics.strokeStyle = stroke;
        }
        layer.graphics.setStrokeStyle = (width, caps, joints, miterLimit) => {
            layer.graphics.lineCap = caps;
            layer.graphics.lineJoin = joints;
            layer.graphics.lineWidth = width;
            layer.graphics.miterLimit = miterLimit;
        }
        layer.graphics.setStrokeDash = (arr, arg) => {
            layer.graphics.strokeDash = { arr, arg }
        }
        layer.graphics.st = (x, y) => {
            layer.graphics.currentPath = [];
        }
        layer.graphics.mt = (x, y) => {
            layer.graphics.currentPath.push(["moveTo", x, y]);
        }
        layer.graphics.lt = (x, y) => {
            layer.graphics.currentPath.push(["lineTo", x, y]);
        }
        layer.graphics.bt = (x1, y1, x2, y2, x, y) => {
            layer.graphics.currentPath.push(["bezierCurveTo", x1, y1, x2, y2, x, y]);
        }
        layer.graphics.qt = (x1, y1, x, y) => {
            layer.graphics.currentPath.push(["quadraticCurveTo", x1, y1, x, y]);
        }
        layer.graphics.cp = () => {
            layer.graphics.currentPath.push(["closePath"]);
        }
        layer.graphics.drawEllipse = (left, top, dX, dY) => {
            layer.graphics.currentPath.push(["ellipse", left, top, dX, dY]);
        }
        layer.graphics.drawRoundRect = (x, y, width, height, cornerRadius) => {
            layer.graphics.currentPath.push(["rect", x, y, width, height, cornerRadius]);
        }
        return layer;
    }

    static Bitmap(src) {
        return {};
    }

    static Text(text, style, color) {
        let layer = { text, style, color }
        layer.setState = (state) => {
            for (var key in state) {
                layer[key] = state[key];
            }
        };
        return layer;
    }

    static setBounds(layer, bounds) {
        return undefined;
    }

}
