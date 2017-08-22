'use strict';

/**
 * @file  : svga.createjs
 * @author: cuiminghui
 * @team  : UED中心
 * @export: umd
 */

class CreateJSRender {

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
        layer.setState = (state) => { CreateJSRender.setState(layer, state); }
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
        return new window.createjs.Matrix2D(a, b, c, d, tx, ty);
    }

    static Shape() {
        let layer = new window.createjs.Shape();
        layer.setState = (state) => { CreateJSRender.setState(layer, state); }
        return layer;
    }

    static Bitmap(src, bitmapTransform) {
        let imgTag = document.createElement('img');
        if (src.indexOf("iVBO") === 0 || src.indexOf("/9j/2w") === 0) {
            imgTag.src = 'data:image/png;base64,' + src;
        }
        else {
            imgTag.src = src;
        }
        let layer = new window.createjs.Bitmap(imgTag);
        if (bitmapTransform !== undefined) {
            layer.transformMatrix = new window.createjs.Matrix2D(bitmapTransform[0], bitmapTransform[1], bitmapTransform[2], bitmapTransform[3], bitmapTransform[4], bitmapTransform[5]);
        }
        layer.setState = (state) => { CreateJSRender.setState(layer, state); }
        return layer;
    }

    static Text(text, style, color) {
        let layer = new window.createjs.Text(text, style, color);
        layer.setState = (state) => { CreateJSRender.setState(layer, state); }
        return layer;
    }

    static setBounds(layer, bounds) {
        layer.setBounds(bounds);
    }

}

module.exports = {
    Render: CreateJSRender,
}