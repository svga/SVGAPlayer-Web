
import SVGABezierPath from './svga-bezierPath'

module.exports = class SVGARectPath extends SVGABezierPath {

    constructor(x, y, width, height, cornerRadius, transform, styles) {
        super();
        if (styles) {
            this.resetStyle(styles)
        }
        this.createShape(x, y, width, height, cornerRadius, transform, this._shape)
    }

    createShape(x, y, width, height, cornerRadius, transform, outShape) {
        let shape = outShape || new createjs.Shape();
        let g = shape.graphics;
        g.drawRoundRect(x, y, width, height, cornerRadius);
        if (transform) {
            shape.transformMatrix = new createjs.Matrix2D(transform.a, transform.b, transform.c, transform.d, transform.tx, transform.ty);
        }
        return shape;
    }

}