
import SVGABezierPath from './svga-bezierPath'

module.exports = class SVGAEllipsePath extends SVGABezierPath {

    constructor(x, y, radiusX, radiusY, transform, styles) {
        super();
        if (styles) {
            this.resetStyle(styles)
        }
        this.createShape(x, y, radiusX, radiusY, transform, this._shape)
    }

    createShape(x, y, radiusX, radiusY, transform, outShape) {
        let shape = outShape || new createjs.Shape();
        let g = shape.graphics;
        g.drawEllipse(x - radiusX, y - radiusY, radiusX * 2, radiusY * 2);
        if (transform) {
            shape.transformMatrix = new createjs.Matrix2D(transform.a, transform.b, transform.c, transform.d, transform.tx, transform.ty);
        }
        return shape;
    }

}