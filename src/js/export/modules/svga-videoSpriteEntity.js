
require('./easeljs.min')

import SVGAVideoSpriteFrameEntity from './svga-videoSpriteFrameEntity'

module.exports = class SVGAVideoSpriteEntity {
    
    /**
     * string
     */
    imageKey = null

    /**
     * SVGAVideoSpriteFrameEntity[]
     */
    frames = []

    constructor(spec) {
        if (spec) {
            this.imageKey = spec.imageKey;
            if (spec.frames) {
                this.frames = spec.frames.map((obj) => {
                    return new SVGAVideoSpriteFrameEntity(obj)
                })
            }
        }
    }

    requestLayer(bitmap) {
        let layer = new createjs.Container();
        if (bitmap != null) {
            this._attachBitmapLayer(layer, bitmap);
        }
        this._attachVectorLayer(layer);
        layer.stepToFrame = (frame) => {
            if (frame < this.frames.length) {
                let frameItem = this.frames[frame];
                if (frameItem.alpha > 0.0) {
                    layer.visible = true;
                    layer.alpha = frameItem.alpha;
                    layer.setBounds(frameItem.layout.x, frameItem.layout.y, frameItem.layout.width, frameItem.layout.height);
                    layer.transformMatrix = new createjs.Matrix2D(frameItem.transform.a, frameItem.transform.b, frameItem.transform.c, frameItem.transform.d, frameItem.transform.tx, frameItem.transform.ty);
                    layer.mask = frameItem.maskShape;
                    if (layer.bitmapLayer && typeof layer.bitmapLayer.stepToFrame === "function") {
                        layer.bitmapLayer.stepToFrame(frame);
                    }
                    if (layer.vectorLayer && typeof layer.vectorLayer.stepToFrame === "function") {
                        layer.vectorLayer.stepToFrame(frame);
                    }
                }
                else {
                    layer.visible = false;
                }
            }
        }
        return layer;
    }

    _attachBitmapLayer(layer, bitmap) {
        let imgTag = document.createElement('img');
        imgTag.src = 'data:image/png;base64,' + bitmap;
        layer.bitmapLayer = new createjs.Bitmap(imgTag);
        layer.bitmapLayer.frames = this.frames;
        layer.bitmapLayer.stepToFrame = (frame) => {

        }
        layer.addChild(layer.bitmapLayer);
    }

    _attachVectorLayer(layer) {
        layer.vectorLayer = new createjs.Container();
        layer.vectorLayer.frames = this.frames;
        layer.vectorLayer.stepToFrame = (frame) => {

        }
        layer.addChild(layer.vectorLayer);
    }

}