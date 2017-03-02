
let validMethods = {
    'M': 1,
    'm': 1,
    'L': 1,
    'l': 1,
    'H': 1,
    'h': 1,
    'V': 1,
    'v': 1,
    'C': 1,
    'c': 1,
    'S': 1,
    's': 1,
    'Q': 1,
    'q': 1,
    'R': 1,
    'r': 1,
    'Z': 1,
    'z': 1,
};

module.exports = class SVGABezierPath {

    _shape;

    constructor(d, transform, styles) {
        this._shape = this.createShape(d, transform)
        if (styles) {
            this.resetStyle(styles)
        }
    }

    getShape() {
        return this._shape
    }

    createShape(d, transform) {
        let shape = new createjs.Shape();
        let g = shape.graphics;
        shape.x = 0;
        shape.y = 0;
        let args = [];
        let tempArg = [];
        let items = d.replace(/,/g, ' ').split(' ');
        let point = {
            x: 0,
            y: 0,
        };
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.length < 1) {
                continue;
            }
            let firstLetter = item.substr(0, 1);
            if (validMethods[firstLetter] === 1) {
                if (tempArg.length > 0) {
                    args.push(tempArg);
                    tempArg = [];
                }
                tempArg.push(firstLetter);
                if (item.substr(1).trim().length > 0) {
					tempArg.push(item.substr(1));
				}
            }else{
                tempArg.push(item);
            }
        }
		if (tempArg.length > 0) {
			args.push(tempArg);
			tempArg = [];
		}
        for (let i = 0; i < args.length; i++) {
            let arg = args[i];
            if (!(arg[0] == 'C' || arg[0] == 'c')) {
                delete (point.x1);
                delete (point.y1);
                delete (point.x2);
                delete (point.y2);
            }
            switch (arg[0]) {
                case 'M':
                    point.x = Number(arg[1]);
                    point.y = Number(arg[2]);
                    g.mt(point.x, point.y);
                    break;
                case 'm':
                    point.x += Number(arg[1]);
                    point.y += Number(arg[2]);
                    g.mt(point.x, point.y);
                    break;
                case 'L':
                    point.x = Number(arg[1]);
                    point.y = Number(arg[2]);
                    g.lt(point.x, point.y);
                    break;
                case 'l':
                    point.x += Number(arg[1]);
                    point.y += Number(arg[2]);
                    g.lt(point.x, point.y);
                    break;
                case 'H':
                    point.x = Number(arg[1]);
                    g.lt(point.x, point.y);
                    break;
                case 'h':
                    point.x += Number(arg[1]);
                    g.lt(point.x, point.y);
                    break;
                case 'V':
                    point.y = Number(arg[1]);
                    g.lt(point.x, point.y);
                    break;
                case 'v':
                    point.y += Number(arg[1]);
                    g.lt(point.x, point.y);
                    break;
                case 'C':
                    point.x1 = Number(arg[1]);
                    point.y1 = Number(arg[2]);
                    point.x2 = Number(arg[3]);
                    point.y2 = Number(arg[4]);
                    point.x = Number(arg[5]);
                    point.y = Number(arg[6]);
                    g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    break;
                case 'c':
                    point.x1 = point.x + Number(arg[1]);
                    point.y1 = point.y + Number(arg[2]);
                    point.x2 = point.x + Number(arg[3]);
                    point.y2 = point.y + Number(arg[4]);
                    point.x += Number(arg[5]);
                    point.y += Number(arg[6]);
                    g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    break;
                case 'S':
                    if (point.x1 && point.y1 && point.x2 && point.y2) {
                        point.x1 = point.x - point.x2 + point.x;
                        point.y1 = point.y - point.y2 + point.y;
                        point.x2 = Number(arg[1]);
                        point.y2 = Number(arg[2]);
                        point.x = Number(arg[3]);
                        point.y = Number(arg[4]);
                        g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    } else {
                        point.x1 = Number(arg[1]);
                        point.y1 = Number(arg[2]);
                        point.x = Number(arg[3]);
                        point.y = Number(arg[4]);
                        g.qt(point.x1, point.y1, point.x, point.y);
                    }
                    break;
                case 's':
                    if (point.x1 && point.y1 && point.x2 && point.y2) {
                        point.x1 = point.x - point.x2 + point.x;
                        point.y1 = point.y - point.y2 + point.y;
                        point.x2 = point.x + Number(arg[1]);
                        point.y2 = point.y + Number(arg[2]);
                        point.x += Number(arg[3]);
                        point.y += Number(arg[4]);
                        g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    } else {
                        point.x1 = point.x + Number(arg[1]);
                        point.y1 = point.y + Number(arg[2]);
                        point.x += Number(arg[3]);
                        point.y += Number(arg[4]);
                        g.qt(point.x1, point.y1, point.x, point.y);
                    }
                    break;
                case 'Q':
                    point.x1 = Number(arg[1]);
                    point.y1 = Number(arg[2]);
                    point.x = Number(arg[3]);
                    point.y = Number(arg[4]);
                    g.qt(point.x1, point.y1, point.x, point.y);
                    break;
                case 'q':
                    point.x1 = point.x + Number(arg[1]);
                    point.y1 = point.y + Number(arg[2]);
                    point.x += Number(arg[3]);
                    point.y += Number(arg[4]);
                    g.qt(point.x1, point.y1, point.x, point.y);
                    break;
                case 'A':
                    break;
                case 'a':
                    break;
                case 'Z':
                case 'z':
                    g.cp();
                    break;
                default:
                    break;
            }
        }
        if (transform) {
            shape.transformMatrix = new createjs.Matrix2D(transform.a, transform.b, transform.c, transform.d, transform.tx, transform.ty);
        }
        return shape;
    }

    resetStyle (styles) {
		if(styles && styles.stroke){
			this._shape.graphics.beginStroke(`rgba(${ parseInt(styles.stroke[0] * 255) }, ${ parseInt(styles.stroke[1] * 255) }, ${ parseInt(styles.stroke[2] * 255) }, ${ styles.stroke[3] })`);
		}
		if(styles && styles.stroke){
			this._shape.graphics.beginStroke(`rgba(${ parseInt(styles.stroke[0] * 255) }, ${ parseInt(styles.stroke[1] * 255) }, ${ parseInt(styles.stroke[2] * 255) }, ${ styles.stroke[3] })`)
		}
		if(styles){
			const width = styles.strokeWidth || 0;
			const caps = styles.lineCap || '';
			const joints = styles.lineJoin || '';
			const miterLimit = styles.miterLimit || '';
			this._shape.graphics.setStrokeStyle(width, caps, joints, miterLimit, true);
		}
		if(styles && styles.fill){
			this._shape.graphics.beginFill(`rgba(${ parseInt(styles.fill[0] * 255) }, ${ parseInt(styles.fill[1] * 255) }, ${ parseInt(styles.fill[2] * 255) }, ${ styles.fill[3] })`);
		}
		if(styles && styles.lineDash){
			this._shape.graphics.setStrokeDash([styles.lineDash[0], styles.lineDash[1]], styles.lineDash[2]);
		}
	}

}