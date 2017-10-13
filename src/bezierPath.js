export class BezierPath {

    _d;
    _transform;
    _styles;
    _shape;

    constructor(d, transform, styles) {
        this._d = d;
        this._transform = transform;
        this._styles = styles;
    }

}