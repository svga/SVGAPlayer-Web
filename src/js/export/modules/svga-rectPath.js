
import SVGABezierPath from './svga-bezierPath'

module.exports = class SVGARectPath extends SVGABezierPath {

    _x;
    _y;
    _width;
    _height;
    _cornerRadius;
    _transform;
    _styles;

    constructor(x, y, width, height, cornerRadius, transform, styles) {
        super();
        this._x = x
        this._y = y
        this._width = width
        this._height = height
        this._cornerRadius = cornerRadius
        this._transform = transform
        this._styles = styles
    }

    getShape(render) {
        if (this._shape === undefined && this._d !== undefined) {
            this._shape = render.Shape();
            if (this._styles) {
                this.resetStyle(this._styles)
            }
            this.createShape(render, this._x, this._y, this._width, this._height, this._cornerRadius, this._transform, this._shape)
        }
        return this._shape
    }

    createShape(render, x, y, width, height, cornerRadius, transform, outShape) {
        let shape = outShape || render.Shape();
        let g = shape.graphics;
        g.drawRoundRect(x, y, width, height, cornerRadius);
        if (transform) {
            shape.setState({
                transform: render.Matrix2D(transform.a, transform.b, transform.c, transform.d, transform.tx, transform.ty)
            })
        }
        return shape;
    }

}