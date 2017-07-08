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
            layer.removeChildren(0, layer.numChildren - 1);
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
        layer.customRenderEnable = true;
        layer.setState = (state) => { LayaBoxRender.setState(layer, state); }
        layer.removeAllChildren = () => {
            layer.removeChildren(0, layer.numChildren - 1);
        }
        layer.children = () => {
            let children = [];
            for (let index = 0; index < layer.numChildren; index++) {
                children.push(layer.getChildAt(index));
            }
            return children;
        }
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
        layer.customRender = (render, x, y) => {
            render.ctx.fillStyle = layer.graphics.fillStyle;
            render.ctx.strokeStyle = layer.graphics.strokeStyle;
            render.ctx.lineCap = layer.graphics.lineCap;
            render.ctx.lineJoin = layer.graphics.lineJoin;
            render.ctx.lineWidth = layer.graphics.lineWidth;
            render.ctx.miterLimit = layer.graphics.miterLimit;
            if (layer.graphics.strokeDash !== undefined) {
                const { arr, arg } = strokeDash;
                const newArr = [];
                arr.forEach(item => newArr.push(item));
                newArr.push(arg);
                render.ctx.setLineDash(newArr);
            }
            if (layer.graphics.currentPath instanceof Array) {
                render.ctx.beginPath();
                layer.graphics.currentPath.forEach((item) => {
                    if (item[0] === "moveTo") {
                        render.ctx.moveTo(item[1], item[2]);
                    }
                    else if (item[0] === "lineTo") {
                        render.ctx.lineTo(item[1], item[2]);
                    }
                    else if (item[0] === "bezierCurveTo") {
                        render.ctx.bezierCurveTo(item[1], item[2], item[3], item[4], item[5], item[6]);
                    }
                    else if (item[0] === "quadraticCurveTo") {
                        render.ctx.quadraticCurveTo(item[1], item[2], item[3], item[4]);
                    }
                    else if (item[0] === "closePath") {
                        render.ctx.closePath();
                    }
                })
            }
            layer.graphics.fillStyle && render.ctx.fill();
            layer.graphics.strokeStyle && render.ctx.stroke();
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
        return undefined;
    }

    static setBounds(layer, bounds) {
        layer.setBounds(new Laya.Rectangle(bounds.x, bounds.y, bounds.width, bounds.height));
    }

}

module.exports = {
    Render: LayaBoxRender,
}