import { FrameEntity } from './frameEntity'
import { BezierPath } from './bezierPath'
import { RectPath } from './rectPath'
import { EllipsePath } from './ellipsePath'

let VectorLayerAssigner = (obj, render) => {
    Object.assign(obj, {
        drawedFrame: 0,
        frames: [],
        keepFrameCache: {},
        init(frames) {
            obj.frames = frames;
            obj.resetKeepFrameCache();
        },
        stepToFrame: (frame) => {
            if (frame < obj.frames.length) {
                obj.drawFrame(frame);
            }
        },
        resetKeepFrameCache() {
            obj.keepFrameCache = {}
            let lastKeep = 0;
            obj.frames.forEach((frameItem, idx) => {
                if (!obj.isKeepFrame(frameItem)) {
                    lastKeep = idx;
                }
                else {
                    obj.keepFrameCache[idx] = lastKeep;
                }
            });
        },
        requestKeepFrame: (frame) => {
            return obj.keepFrameCache[frame]
        },
        isKeepFrame: (frameItem) => {
            if (frameItem.shapes && frameItem.shapes.length > 0) {
                if (frameItem.shapes[0].getType && frameItem.shapes[0].getType() === Proto.ShapeEntity.ShapeType.KEEP) {
                    return true
                }
                else if (frameItem.shapes[0].type === "keep") {
                    return true
                }
            }
            return false;
        },
        drawFrame: (frame) => {
            if (frame < obj.frames.length) {
                let frameItem = obj.frames[frame];
                if (obj.isKeepFrame(frameItem)) {
                    if (obj.drawedFrame === obj.requestKeepFrame(frame)) {
                        return;
                    }
                }
                obj.removeAllChildren();
                frameItem.shapes.forEach((shape) => {
                    if (shape.getType && shape.getType() === Proto.ShapeEntity.ShapeType.SHAPE) {
                        let bezierPath = new BezierPath(shape.getShape().getD(), shape.getTransform(), shape.getStyles());
                        obj.addChild(bezierPath.getShape(render));
                    }
                    else if (shape.type === "shape" && shape.args && shape.args.d) {
                        let bezierPath = new BezierPath(shape.args.d, shape.transform, shape.styles);
                        obj.addChild(bezierPath.getShape(render));
                    }
                    if (shape.getType && shape.getType() === Proto.ShapeEntity.ShapeType.ELLIPSE) {
                        let bezierPath = new EllipsePath(shape.getEllipse().getX(), shape.getEllipse().getY(), shape.getEllipse().getRadiusx(), shape.getEllipse().getRadiusy(), shape.getTransform(), shape.getStyles());
                        obj.addChild(bezierPath.getShape(render));
                    }
                    else if (shape.type === "ellipse" && shape.args) {
                        let bezierPath = new EllipsePath(parseFloat(shape.args.x) || 0.0, parseFloat(shape.args.y) || 0.0, parseFloat(shape.args.radiusX) || 0.0, parseFloat(shape.args.radiusY) || 0.0, shape.transform, shape.styles);
                        obj.addChild(bezierPath.getShape(render));
                    }
                    if (shape.getType && shape.getType() === Proto.ShapeEntity.ShapeType.RECT) {
                        let bezierPath = new RectPath(shape.getRect().getX(), shape.getRect().getY(), shape.getRect().getWidth(), shape.getRect().getHeight(), shape.getRect().getCornerradius(), shape.getTransform(), shape.getStyles());
                        obj.addChild(bezierPath.getShape(render));
                    }
                    else if (shape.type === "rect" && shape.args) {
                        let bezierPath = new RectPath(parseFloat(shape.args.x) || 0.0, parseFloat(shape.args.y) || 0.0, parseFloat(shape.args.width) || 0.0, parseFloat(shape.args.height) || 0.0, parseFloat(shape.args.cornerRadius) || 0.0, shape.transform, shape.styles);
                        obj.addChild(bezierPath.getShape(render));
                    }
                })
                obj.drawedFrame = frame;
            }
        },
    });
}

export class SpriteEntity {

    /**
     * string
     */
    imageKey = null

    /**
     * FrameEntity[]
     */
    frames = []

    constructor(spec) {
        this.imageKey = spec.imageKey;
        if (spec.frames) {
            this.frames = spec.frames.map((obj) => {
                return new FrameEntity(obj)
            })
        }
    }

    requestLayer(bitmap, bitmapTransform, render) {
        let layer = render.Container();
        if (bitmap != null) {
            this._attachBitmapLayer(layer, bitmap, bitmapTransform, render);
        }
        this._attachVectorLayer(layer, render);
        layer.stepToFrame = (frame) => {
            if (frame < this.frames.length) {
                let frameItem = this.frames[frame];
                if (frameItem.alpha > 0.0) {
                    layer.setState({
                        mask: undefined,
                    })
                    layer.setState({
                        visible: true,
                        alpha: frameItem.alpha,
                        transform: render.Matrix2D(frameItem.transform.a, frameItem.transform.b, frameItem.transform.c, frameItem.transform.d, frameItem.transform.tx, frameItem.transform.ty),
                        mask: frameItem.maskPath && frameItem.maskPath.getShape(render),
                    })
                    render.setBounds(layer, { x: frameItem.layout.x, y: frameItem.layout.y, width: frameItem.layout.width, height: frameItem.layout.height });
                    if (layer.mask) {
                        layer.mask.setState({
                            transform: layer.transform,
                        })
                    }
                    if (layer.bitmapLayer && typeof layer.bitmapLayer.stepToFrame === "function") {
                        layer.bitmapLayer.stepToFrame(frame);
                    }
                    if (layer.vectorLayer && typeof layer.vectorLayer.stepToFrame === "function") {
                        layer.vectorLayer.stepToFrame(frame);
                    }
                    if (layer.textLayer) {
                        let offsetX = (layer.textLayer.offset !== undefined && layer.textLayer.offset.x !== undefined) ? layer.textLayer.offset.x : 0;
                        let offsetY = (layer.textLayer.offset !== undefined && layer.textLayer.offset.y !== undefined) ? layer.textLayer.offset.y : 0;
                        layer.textLayer.setState({
                            textBaseline: "middle",
                            x: (frameItem.layout.width - layer.textLayer.getBounds().width) / 2.0 + offsetX,
                            y: frameItem.layout.height / 2.0 + offsetY,
                        });
                    }
                }
                else {
                    layer.setState({
                        visible: false,
                    });
                }
            }
        }
        return layer;
    }

    _attachBitmapLayer(layer, bitmap, bitmapTransform, render) {
        layer.bitmapLayer = render.Bitmap(bitmap, bitmapTransform);
        layer.bitmapLayer.frames = this.frames;
        layer.bitmapLayer.stepToFrame = (frame) => { }
        layer.addChild(layer.bitmapLayer);
    }

    _attachVectorLayer(layer, render) {
        layer.vectorLayer = render.Container();
        VectorLayerAssigner(layer.vectorLayer, render);
        layer.vectorLayer.init(this.frames)
        layer.addChild(layer.vectorLayer);
    }

}