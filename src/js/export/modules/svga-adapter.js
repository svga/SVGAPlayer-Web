
class SVGAAdapter {

    static findAdapter() {
        if (window.createjs !== undefined) {
            return CreateJS;
        }
        else if (window.Laya !== undefined) {
            return LayaBox;
        }
    }

    static Stage(arg1, arg2, arg3) {
        return undefined;
    }

    static Container() {
        return undefined;
    }

    static AddTimer(callee, callback) {
        return undefined;
    }

    static RemoveTimer(callee, handler) {
        return undefined;
    }

    static Matrix2D(a, b, c, d, tx, ty) {
        return undefined;
    }

    static Shape() {
        return undefined;
    }

    static Bitmap(src) {
        return undefined;
    }

    static Text(text, style, color) {
        return undefined;
    }

    static setBounds(layer, bounds) {
        return undefined;
    }

}

class CreateJS {

    static setState(layer, state) {
        state['transformMatrix'] = state['transform'];
        for (var key in state) {
            layer[key] = state[key];
        }
    }

    static Stage(arg1) {
        return new window.createjs.Stage(arg1);
    }

    static Container() {
        let layer = new window.createjs.Container();
        layer.setState = (state) => { CreateJS.setState(layer, state); }
        return layer;
    }

    static AddTimer(callee, callback) {
        createjs.Ticker.framerate = 60;
        return createjs.Ticker.addEventListener("tick", callback.bind(callee));
    }

    static RemoveTimer(callee, handler) {
        createjs.Ticker.removeEventListener("tick", handler);
    }

    static Matrix2D(a, b, c, d, tx, ty) {
        return new createjs.Matrix2D(a, b, c, d, tx, ty);
    }

    static Shape() {
        let layer = new createjs.Shape();
        layer.setState = (state) => { CreateJS.setState(layer, state); }
        return layer;
    }

    static Bitmap(src) {
        let imgTag = document.createElement('img');
        if (src.indexOf("iVBO") === 0 || src.indexOf("/9j/2w") === 0) {
            imgTag.src = 'data:image/png;base64,' + src;
        }
        else {
            imgTag.src = src;
        }
        let layer = new createjs.Bitmap(imgTag);
        layer.setState = (state) => { CreateJS.setState(layer, state); }
        return layer;
    }

    static Text(text, style, color) {
        let layer = new createjs.Text(text, style, color);
        layer.setState = (state) => { CreateJS.setState(layer, state); }
        return layer;
    }

    static setBounds(layer, bounds) {
        layer.setBounds(bounds);
    }

}

class LayaBox {

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
        layer.setState = (state) => { LayaBox.setState(layer, state); }
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
        layer.setState = (state) => { LayaBox.setState(layer, state); }
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
        layer.setState = (state) => { LayaBox.setState(layer, state); }
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

export default Adapter = SVGAAdapter.findAdapter();
