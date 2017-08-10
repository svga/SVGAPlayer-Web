'use strict';

/**
 * @file  : svga.layabox
 * @author: cuiminghui
 * @team  : UED中心
 * @export: umd
 */

class LayaBoxRender {

    static setState(layer, state) {
        for (var key in state) {
            layer[key] = state[key];
        }
    }

    static Stage(arg1, arg2, arg3) {
        return undefined;
    }

    static Container() {
        let layer = new Laya.Sprite();
        layer.setState = (state) => { LayaBoxRender.setState(layer, state); }
        layer.removeAllChildren = () => {
            layer.removeChildren(0, layer.numChildren);
        }
        layer.children = () => {
            let children = [];
            for (let index = 0; index < layer.numChildren; index++) {
                children.push(layer.getChildAt(index));
            }
            return children;
        }
        return layer;
    }

    static AddTimer(callee, callback) {
        Laya.timer.frameLoop(1, callee, callback);
    }

    static RemoveTimer(callee, handler) {
        Laya.timer.clearAll(callee);
    }

    static Matrix2D(a, b, c, d, tx, ty) {
        return new Laya.Matrix(a, b, c, d, tx, ty);
    }

    static Shape() {
        let layer = new Laya.Sprite();
        layer.getBounds = () => {
            return {x: 0, y: 0, width: 3000, height: 3000}
        }
        layer.customRenderEnable = true;
        layer.customGraphics = {};
        layer.setState = (state) => { LayaBoxRender.setState(layer, state); }
        layer.removeAllChildren = () => {
            layer.removeChildren(0, layer.numChildren);
        }
        layer.children = () => {
            let children = [];
            for (let index = 0; index < layer.numChildren; index++) {
                children.push(layer.getChildAt(index));
            }
            return children;
        }
        layer.graphics.beginFill = (fillStyle) => {
            layer.customGraphics.fillStyle = fillStyle;
        }
        layer.graphics.beginStroke = (stroke) => {
            layer.customGraphics.strokeStyle = stroke;
        }
        layer.graphics.setStrokeStyle = (width, caps, joints, miterLimit) => {
            layer.customGraphics.lineCap = caps;
            layer.customGraphics.lineJoin = joints;
            layer.customGraphics.lineWidth = width;
            layer.customGraphics.miterLimit = miterLimit;
        }
        layer.graphics.setStrokeDash = (arr, arg) => {
            layer.customGraphics.strokeDash = { arr, arg }
        }
        layer.graphics.st = (x, y) => {
            layer.customGraphics.currentPath = [];
        }
        layer.graphics.mt = (x, y) => {
            layer.customGraphics.currentPath.push(["moveTo", x, y]);
        }
        layer.graphics.lt = (x, y) => {
            layer.customGraphics.currentPath.push(["lineTo", x, y]);
        }
        layer.graphics.bt = (x1, y1, x2, y2, x, y) => {
            layer.customGraphics.currentPath.push(["bezierCurveTo", x1, y1, x2, y2, x, y]);
        }
        layer.graphics.qt = (x1, y1, x, y) => {
            layer.customGraphics.currentPath.push(["quadraticCurveTo", x1, y1, x, y]);
        }
        layer.graphics.cp = () => {
            layer.customGraphics.currentPath.push(["closePath"]);
        }
        layer.graphics.drawEllipse = (left, top, dX, dY) => {
            if (layer.customGraphics.currentPath === undefined) {
                layer.customGraphics.currentPath = [];
            }
            layer.customGraphics.currentPath.push(["ellipse", left, top, dX, dY]);
        }
        layer.graphics.drawRoundRect = (x, y, width, height, cornerRadius) => {
            if (layer.customGraphics.currentPath === undefined) {
                layer.customGraphics.currentPath = [];
            }
            layer.customGraphics.currentPath.push(["rect", x, y, width, height, cornerRadius]);
        }
        layer.customRender = (render, x, y) => {
            if (render.ctx instanceof Laya.WebGLContext2D) {
                const mat = render.ctx._curMat;
                tx = render.ctx._curMat.tx / render.ctx._curMat.a
                ty = render.ctx._curMat.ty / render.ctx._curMat.d
            }
            if (typeof layer.customGraphics.fillStyle === 'string') {
                if (render.ctx instanceof Laya.WebGLContext2D) {
                    if (layer.customGraphics.fillStyle.startsWith('rgba')) {
                        const components = layer.customGraphics.fillStyle.replace('rgba(', '').replace(')').split(',');
                        render.ctx.fillStyle = Laya.Color.create('#' + parseInt(components[0]).toString(16) + parseInt(components[1]).toString(16) + parseInt(components[2]).toString(16))
                    }
                    else {
                        render.ctx.fillStyle = layer.customGraphics.fillStyle;
                    }
                }
                else {
                    render.ctx.fillStyle = layer.customGraphics.fillStyle;
                }
            }
            if (typeof layer.customGraphics.strokeStyle === 'string') {
                if (render.ctx instanceof Laya.WebGLContext2D) {
                    if (layer.customGraphics.strokeStyle.startsWith('rgba')) {
                        const components = layer.customGraphics.strokeStyle.replace('rgba(', '').replace(')').split(',');
                        render.ctx.strokeStyle = Laya.Color.create('#' + parseInt(components[0]).toString(16) + parseInt(components[1]).toString(16) + parseInt(components[2]).toString(16))
                    }
                    else {
                        render.ctx.strokeStyle = layer.customGraphics.strokeStyle;
                    }
                }
                else {
                    render.ctx.strokeStyle = layer.customGraphics.strokeStyle;
                }
            }
            render.ctx.lineCap = layer.customGraphics.lineCap;
            render.ctx.lineJoin = layer.customGraphics.lineJoin;
            render.ctx.lineWidth = layer.customGraphics.lineWidth;
            render.ctx.miterLimit = layer.customGraphics.miterLimit;
            if (layer.customGraphics.strokeDash !== undefined) {
                const { arr, arg } = layer.customGraphics.strokeDash;
                const newArr = [];
                arr.forEach(item => newArr.push(item));
                newArr.push(arg);
                render.ctx.setLineDash && render.ctx.setLineDash(newArr);
            }
            if (layer.customGraphics.currentPath instanceof Array) {
                render.ctx.beginPath();
                layer.customGraphics.currentPath.forEach((item) => {
                    if (item[0] === "moveTo") {
                        const tPoint = {x: item[1], y: item[2]};
                        render.ctx.moveTo(tPoint.x, tPoint.y);
                    }
                    else if (item[0] === "lineTo") {
                        const tPoint = {x: item[1], y: item[2]};
                        render.ctx.lineTo(tPoint.x, tPoint.y);
                    }
                    else if (item[0] === "bezierCurveTo") {
                        const tPoint1 = {x: item[1], y: item[2]};
                        const tPoint2 = {x: item[3], y: item[4]};
                        const tPoint3 = {x: item[5], y: item[6]};
                        render.ctx.bezierCurveTo(tPoint1.x, tPoint1.y, tPoint2.x, tPoint2.y, tPoint3.x, tPoint3.y);
                    }
                    else if (item[0] === "quadraticCurveTo") {
                        const tPoint1 = {x: item[1], y: item[2]};
                        const tPoint2 = {x: item[3], y: item[4]};
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
                        const tPoint = {x: item[1], y: item[2]};
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
            layer.customGraphics.fillStyle && render.ctx.fill();
            layer.customGraphics.strokeStyle && render.ctx.stroke();
        }
        return layer;
    }

    static Bitmap(src) {
        var layer = new Laya.Sprite()
        layer.setState = (state) => { LayaBoxRender.setState(layer, state); }
        if (src.indexOf("iVBO") === 0 || src.indexOf("/9j/2w") === 0) {
            layer.loadImage('data:image/png;base64,' + src);
        }
        else {
            layer.loadImage(src);
        }
        return layer;
    }

    static Text(text, style, color) {
        let layer = new Laya.Text();
        layer.text = text;
        layer.font = style.split(' ')[1] || "";
        layer.fontSize = isNaN(parseInt(style.split(' ')[0])) ? 14 : parseInt(style.split(' ')[0]);
        layer.color = color;
        layer.align = "center";
        layer.valign = "middle";
        layer.setState = state => {
            if (state.y !== undefined) {
                state.y = state.y - layer.textHeight / 2.0;
            }
            LayaBoxRender.setState(layer, state)
        };
        return layer;
    }

    static setBounds(layer, bounds) {
        layer.setBounds(new Laya.Rectangle(bounds.x, bounds.y, bounds.width, bounds.height));
    }

}

module.exports = {
    Render: LayaBoxRender,
}