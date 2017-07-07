
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

    static Stage(arg1) {
        return new window.createjs.Stage(arg1);
    }

    static Container() {
        let layer = new window.createjs.Container();
        layer.setTransformMatrix = (value) => {
            layer.transformMatrix = value;
        }
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
        layer.setTransformMatrix = (value) => {
            layer.transformMatrix = value;
        }
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
        layer.setTransformMatrix = (value) => {
            layer.transformMatrix = value;
        }
        return layer;
    }

    static Text(text, style, color) {
        let layer = new createjs.Text(text, style, color);
        layer.setTransformMatrix = (value) => {
            layer.transformMatrix = value;
        }
        return layer;
    }

    static setBounds(layer, bounds) {
        layer.setBounds(bounds);
    }

}

class LayaBox {

    static Stage(arg1, arg2, arg3) {
        return undefined;
    }

    static Container() {
        let layer = new Laya.Sprite();
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
        layer.setTransformMatrix = (value) => {
            layer.transform = value;
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
        layer.setTransformMatrix = (value) => {
            layer.transform = value;
        }
        return layer;
    }

    static Bitmap(src) {
        var layer = new Laya.Sprite()
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
        layer.setTransformMatrix = (value) => {
            layer.transform = value;
        }
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
