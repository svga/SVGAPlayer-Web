
import SVGABezierPath from './svga-bezierPath'

module.exports = class SVGAEllipsePath extends SVGABezierPath {

    _x;
    _y;
    _radiusX;
    _radiusY;
    _transform;
    _styles;

    constructor(x, y, radiusX, radiusY, transform, styles) {
        super();
        this._x = x;
        this._y = y;
        this._radiusX = radiusX;
        this._radiusY = radiusY;
        this._transform = transform;
        this._styles = styles;
    }

    getShape(render) {
        if (this._shape === undefined) {
            this._shape = render.Shape();
            if (this._styles) {
                this.resetStyle(this._styles)
            }
            this.createShape(render, this._x, this._y, this._radiusX, this._radiusY, this._transform, this._shape)
        }
        return this._shape
    }

    createShape(render, x, y, radiusX, radiusY, transform, outShape) {
        let shape = outShape || render.Shape();
        let g = shape.graphics;
        g.drawEllipse(x - radiusX, y - radiusY, radiusX * 2, radiusY * 2);
        if (transform) {
            shape.setState({
                transform: render.Matrix2D(transform.a, transform.b, transform.c, transform.d, transform.tx, transform.ty)
            });
        }
        return shape;
    }

}