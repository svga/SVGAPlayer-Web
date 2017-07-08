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

    static Draw(player, onCanvas, inRect) {
        if (player._videoItem.bitmapCache === undefined) {
            player._videoItem.bitmapCache = {};
        }
        var canvas = onCanvas || player._canvas;
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
                let src = player._videoItem.bitmapCache[sprite.imageKey] || player._videoItem.images[sprite.imageKey];
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
                    ctx.drawImage(imgTag, 0, 0);
                }
                else if (typeof src === "object") {
                    if (frameItem.maskPath !== undefined && frameItem.maskPath !== null) {
                        frameItem.maskPath.getShape(CanvasRender).draw(ctx, true);
                        ctx.clip();
                    }
                    ctx.drawImage(src, 0, 0);
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
        return cancelled;
    }

    static RemoveTimer(callee, handler) {
        return handler = true;
    }

    static Matrix2D(a, b, c, d, tx, ty) {
        return undefined;
    }

    static DrawShapeWithPath(d, style) {

    }

    static Shape() {
        let layer = {
            draw: (ctx, noFill) => {
                ctx.fillStyle = layer.graphics.fillStyle;
                ctx.strokeStyle = layer.graphics.strokeStyle;
                ctx.lineCap = layer.graphics.lineCap;
                ctx.lineJoin = layer.graphics.lineJoin;
                ctx.lineWidth = layer.graphics.lineWidth;
                ctx.miterLimit = layer.graphics.miterLimit;
                if (layer.graphics.strokeDash !== undefined) {
                    const { arr, arg } = strokeDash;
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
                    })
                }
                layer.graphics.fillStyle && noFill !== true && ctx.fill();
                layer.graphics.strokeStyle && ctx.stroke();
            },
        };
        layer.graphics = {};
        layer.graphics.beginFill = (fillStyle) => {
            layer.graphics.fillStyle = fillStyle;
            layer.graphics.strokeStyle = undefined;
        }
        layer.graphics.beginStroke = (stroke) => {
            layer.graphics.fillStyle = undefined;
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
        return layer;
    }

    static Bitmap(src) {
        return {};
    }

    static Text(text, style, color) {
        return undefined;
    }

    static setBounds(layer, bounds) {
        return undefined;
    }

}
