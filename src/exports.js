var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
System.register("bezierPath", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var validMethods, BezierPath;
    return {
        setters: [],
        execute: function () {
            validMethods = 'MLHVCSQRZ';
            BezierPath = /** @class */ (function () {
                function BezierPath(d, transform, styles) {
                    this._d = d;
                    this._transform = transform;
                    this._styles = styles;
                }
                BezierPath.prototype.getShape = function (render) {
                    if (this._shape === undefined && this._d !== undefined) {
                        this._shape = render.Shape();
                        if (this._styles) {
                            this.resetStyle(this._styles);
                        }
                        this.createShape(render, this._d, this._transform, this._shape);
                    }
                    return this._shape;
                };
                BezierPath.prototype.createShape = function (render, d, transform, outShape) {
                    var shape = outShape || render.Shape();
                    var g = shape.graphics;
                    shape.x = 0;
                    shape.y = 0;
                    var args = [];
                    var tempArg = [];
                    var items = d.replace(/,/g, ' ').split(' ');
                    var point = {
                        x: 0,
                        y: 0
                    };
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.length < 1) {
                            continue;
                        }
                        var firstLetter = item.substr(0, 1);
                        if (validMethods.indexOf(firstLetter) >= 0) {
                            if (tempArg.length > 0) {
                                args.push(tempArg);
                                tempArg = [];
                            }
                            tempArg.push(firstLetter);
                            if (item.substr(1).trim().length > 0) {
                                tempArg.push(item.substr(1));
                            }
                        }
                        else {
                            tempArg.push(item);
                        }
                    }
                    if (tempArg.length > 0) {
                        args.push(tempArg);
                        tempArg = [];
                    }
                    g.st && g.st();
                    for (var i = 0; i < args.length; i++) {
                        var arg = args[i];
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
                                }
                                else {
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
                                }
                                else {
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
                        shape.setState({
                            transform: render.Matrix2D(transform.a, transform.b, transform.c, transform.d, transform.tx, transform.ty)
                        });
                    }
                    g.fs && g.fs();
                };
                BezierPath.prototype.resetStyle = function (styles) {
                    if (styles && styles.stroke) {
                        this._shape.graphics.beginStroke("rgba(" + parseInt(styles.stroke[0] * 255) + ", " + parseInt(styles.stroke[1] * 255) + ", " + parseInt(styles.stroke[2] * 255) + ", " + styles.stroke[3] + ")");
                    }
                    if (styles) {
                        var width = styles.strokeWidth || 0.0;
                        var caps = styles.lineCap || '';
                        var joints = styles.lineJoin || '';
                        var miterLimit = styles.miterLimit || '';
                        this._shape.graphics.setStrokeStyle(width, caps, joints, miterLimit, true);
                    }
                    if (styles && styles.fill) {
                        this._shape.graphics.beginFill("rgba(" + parseInt(styles.fill[0] * 255) + ", " + parseInt(styles.fill[1] * 255) + ", " + parseInt(styles.fill[2] * 255) + ", " + styles.fill[3] + ")");
                    }
                    if (styles && styles.lineDash) {
                        this._shape.graphics.setStrokeDash([styles.lineDash[0], styles.lineDash[1]], styles.lineDash[2]);
                    }
                };
                return BezierPath;
            }());
            exports_1("BezierPath", BezierPath);
        }
    };
});
System.register("frameEntity", ["bezierPath"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var bezierPath_1, FrameEntity;
    return {
        setters: [
            function (bezierPath_1_1) {
                bezierPath_1 = bezierPath_1_1;
            }
        ],
        execute: function () {
            FrameEntity = /** @class */ (function () {
                function FrameEntity(spec) {
                    this.alpha = 0.0;
                    this.transform = {
                        a: 1.0,
                        b: 0.0,
                        c: 0.0,
                        d: 1.0,
                        tx: 0.0,
                        ty: 0.0
                    };
                    this.layout = {
                        x: 0.0,
                        y: 0.0,
                        width: 0.0,
                        height: 0.0
                    };
                    this.nx = 0.0;
                    this.ny = 0.0;
                    /**
                     * BezierPath
                     */
                    this.maskPath = null;
                    /**
                     * Object[]
                     */
                    this.shapes = [];
                    this.alpha = parseFloat(spec.alpha) || 0.0;
                    if (spec.layout) {
                        this.layout.x = parseFloat(spec.layout.x) || 0.0;
                        this.layout.y = parseFloat(spec.layout.y) || 0.0;
                        this.layout.width = parseFloat(spec.layout.width) || 0.0;
                        this.layout.height = parseFloat(spec.layout.height) || 0.0;
                    }
                    if (spec.transform) {
                        this.transform.a = parseFloat(spec.transform.a) || 1.0;
                        this.transform.b = parseFloat(spec.transform.b) || 0.0;
                        this.transform.c = parseFloat(spec.transform.c) || 0.0;
                        this.transform.d = parseFloat(spec.transform.d) || 1.0;
                        this.transform.tx = parseFloat(spec.transform.tx) || 0.0;
                        this.transform.ty = parseFloat(spec.transform.ty) || 0.0;
                    }
                    if (spec.clipPath && spec.clipPath.length > 0) {
                        this.maskPath = new bezierPath_1.BezierPath(spec.clipPath, undefined, { fill: "#000000" });
                    }
                    if (spec.shapes) {
                        if (spec.shapes[0] && spec.shapes[0].type === "keep") {
                            this.shapes = FrameEntity.lastShapes;
                        }
                        else {
                            this.shapes = spec.shapes;
                            FrameEntity.lastShapes = spec.shapes;
                        }
                    }
                    var llx = this.transform.a * this.layout.x + this.transform.c * this.layout.y + this.transform.tx;
                    var lrx = this.transform.a * (this.layout.x + this.layout.width) + this.transform.c * this.layout.y + this.transform.tx;
                    var lbx = this.transform.a * this.layout.x + this.transform.c * (this.layout.y + this.layout.height) + this.transform.tx;
                    var rbx = this.transform.a * (this.layout.x + this.layout.width) + this.transform.c * (this.layout.y + this.layout.height) + this.transform.tx;
                    var lly = this.transform.b * this.layout.x + this.transform.d * this.layout.y + this.transform.ty;
                    var lry = this.transform.b * (this.layout.x + this.layout.width) + this.transform.d * this.layout.y + this.transform.ty;
                    var lby = this.transform.b * this.layout.x + this.transform.d * (this.layout.y + this.layout.height) + this.transform.ty;
                    var rby = this.transform.b * (this.layout.x + this.layout.width) + this.transform.d * (this.layout.y + this.layout.height) + this.transform.ty;
                    this.nx = Math.min(Math.min(lbx, rbx), Math.min(llx, lrx));
                    this.ny = Math.min(Math.min(lby, rby), Math.min(lly, lry));
                }
                return FrameEntity;
            }());
            exports_2("FrameEntity", FrameEntity);
        }
    };
});
System.register("rectPath", ["bezierPath"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var bezierPath_2, RectPath;
    return {
        setters: [
            function (bezierPath_2_1) {
                bezierPath_2 = bezierPath_2_1;
            }
        ],
        execute: function () {
            RectPath = /** @class */ (function (_super) {
                __extends(RectPath, _super);
                function RectPath(x, y, width, height, cornerRadius, transform, styles) {
                    var _this = _super.call(this) || this;
                    _this._x = x;
                    _this._y = y;
                    _this._width = width;
                    _this._height = height;
                    _this._cornerRadius = cornerRadius;
                    _this._transform = transform;
                    _this._styles = styles;
                    return _this;
                }
                RectPath.prototype.getShape = function (render) {
                    if (this._shape === undefined) {
                        this._shape = render.Shape();
                        if (this._styles) {
                            this.resetStyle(this._styles);
                        }
                        this.createShape(render, this._x, this._y, this._width, this._height, this._cornerRadius, this._transform, this._shape);
                    }
                    return this._shape;
                };
                RectPath.prototype.createShape = function (render, x, y, width, height, cornerRadius, transform, outShape) {
                    var shape = outShape || render.Shape();
                    var g = shape.graphics;
                    g.drawRoundRect(x, y, width, height, cornerRadius);
                    if (transform) {
                        shape.setState({
                            transform: render.Matrix2D(transform.a, transform.b, transform.c, transform.d, transform.tx, transform.ty)
                        });
                    }
                    return shape;
                };
                return RectPath;
            }(bezierPath_2.BezierPath));
            exports_3("RectPath", RectPath);
        }
    };
});
System.register("ellipsePath", ["bezierPath"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var bezierPath_3, EllipsePath;
    return {
        setters: [
            function (bezierPath_3_1) {
                bezierPath_3 = bezierPath_3_1;
            }
        ],
        execute: function () {
            EllipsePath = /** @class */ (function (_super) {
                __extends(EllipsePath, _super);
                function EllipsePath(x, y, radiusX, radiusY, transform, styles) {
                    var _this = _super.call(this) || this;
                    _this._x = x;
                    _this._y = y;
                    _this._radiusX = radiusX;
                    _this._radiusY = radiusY;
                    _this._transform = transform;
                    _this._styles = styles;
                    return _this;
                }
                EllipsePath.prototype.getShape = function (render) {
                    if (this._shape === undefined) {
                        this._shape = render.Shape();
                        if (this._styles) {
                            this.resetStyle(this._styles);
                        }
                        this.createShape(render, this._x, this._y, this._radiusX, this._radiusY, this._transform, this._shape);
                    }
                    return this._shape;
                };
                EllipsePath.prototype.createShape = function (render, x, y, radiusX, radiusY, transform, outShape) {
                    var shape = outShape || render.Shape();
                    var g = shape.graphics;
                    g.drawEllipse(x - radiusX, y - radiusY, radiusX * 2, radiusY * 2);
                    if (transform) {
                        shape.setState({
                            transform: render.Matrix2D(transform.a, transform.b, transform.c, transform.d, transform.tx, transform.ty)
                        });
                    }
                    return shape;
                };
                return EllipsePath;
            }(bezierPath_3.BezierPath));
            exports_4("EllipsePath", EllipsePath);
        }
    };
});
System.register("spriteEntity", ["frameEntity", "bezierPath", "rectPath", "ellipsePath"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var frameEntity_1, bezierPath_4, rectPath_1, ellipsePath_1, VectorLayerAssigner, SpriteEntity;
    return {
        setters: [
            function (frameEntity_1_1) {
                frameEntity_1 = frameEntity_1_1;
            },
            function (bezierPath_4_1) {
                bezierPath_4 = bezierPath_4_1;
            },
            function (rectPath_1_1) {
                rectPath_1 = rectPath_1_1;
            },
            function (ellipsePath_1_1) {
                ellipsePath_1 = ellipsePath_1_1;
            }
        ],
        execute: function () {
            VectorLayerAssigner = function (obj, render) {
                Object.assign(obj, {
                    drawedFrame: 0,
                    frames: [],
                    keepFrameCache: {},
                    init: function (frames) {
                        obj.frames = frames;
                        obj.resetKeepFrameCache();
                    },
                    stepToFrame: function (frame) {
                        if (frame < obj.frames.length) {
                            obj.drawFrame(frame);
                        }
                    },
                    resetKeepFrameCache: function () {
                        obj.keepFrameCache = {};
                        var lastKeep = 0;
                        obj.frames.forEach(function (frameItem, idx) {
                            if (!obj.isKeepFrame(frameItem)) {
                                lastKeep = idx;
                            }
                            else {
                                obj.keepFrameCache[idx] = lastKeep;
                            }
                        });
                    },
                    requestKeepFrame: function (frame) {
                        return obj.keepFrameCache[frame];
                    },
                    isKeepFrame: function (frameItem) {
                        return frameItem.shapes && frameItem.shapes.length > 0 && frameItem.shapes[0].type === "keep";
                    },
                    drawFrame: function (frame) {
                        if (frame < obj.frames.length) {
                            var frameItem = obj.frames[frame];
                            if (obj.isKeepFrame(frameItem)) {
                                if (obj.drawedFrame === obj.requestKeepFrame(frame)) {
                                    return;
                                }
                            }
                            obj.removeAllChildren();
                            frameItem.shapes.forEach(function (shape) {
                                if (shape.type === "shape" && shape.args && shape.args.d) {
                                    var bezierPath = new bezierPath_4.BezierPath(shape.args.d, shape.transform, shape.styles);
                                    obj.addChild(bezierPath.getShape(render));
                                }
                                else if (shape.type === "ellipse" && shape.args) {
                                    var bezierPath = new ellipsePath_1.EllipsePath(parseFloat(shape.args.x) || 0.0, parseFloat(shape.args.y) || 0.0, parseFloat(shape.args.radiusX) || 0.0, parseFloat(shape.args.radiusY) || 0.0, shape.transform, shape.styles);
                                    obj.addChild(bezierPath.getShape(render));
                                }
                                else if (shape.type === "rect" && shape.args) {
                                    var bezierPath = new rectPath_1.RectPath(parseFloat(shape.args.x) || 0.0, parseFloat(shape.args.y) || 0.0, parseFloat(shape.args.width) || 0.0, parseFloat(shape.args.height) || 0.0, parseFloat(shape.args.cornerRadius) || 0.0, shape.transform, shape.styles);
                                    obj.addChild(bezierPath.getShape(render));
                                }
                            });
                            obj.drawedFrame = frame;
                        }
                    }
                });
            };
            SpriteEntity = /** @class */ (function () {
                function SpriteEntity(spec) {
                    /**
                     * string
                     */
                    this.imageKey = null;
                    /**
                     * FrameEntity[]
                     */
                    this.frames = [];
                    this.imageKey = spec.imageKey;
                    if (spec.frames) {
                        this.frames = spec.frames.map(function (obj) {
                            return new frameEntity_1.FrameEntity(obj);
                        });
                    }
                }
                SpriteEntity.prototype.requestLayer = function (bitmap, bitmapTransform, render) {
                    var _this = this;
                    var layer = render.Container();
                    if (bitmap != null) {
                        this._attachBitmapLayer(layer, bitmap, bitmapTransform, render);
                    }
                    this._attachVectorLayer(layer, render);
                    layer.stepToFrame = function (frame) {
                        if (frame < _this.frames.length) {
                            var frameItem = _this.frames[frame];
                            if (frameItem.alpha > 0.0) {
                                layer.setState({
                                    mask: undefined
                                });
                                layer.setState({
                                    visible: true,
                                    alpha: frameItem.alpha,
                                    transform: render.Matrix2D(frameItem.transform.a, frameItem.transform.b, frameItem.transform.c, frameItem.transform.d, frameItem.transform.tx, frameItem.transform.ty),
                                    mask: frameItem.maskPath && frameItem.maskPath.getShape(render)
                                });
                                render.setBounds(layer, { x: frameItem.layout.x, y: frameItem.layout.y, width: frameItem.layout.width, height: frameItem.layout.height });
                                if (layer.mask) {
                                    layer.mask.setState({
                                        transform: layer.transform
                                    });
                                }
                                if (layer.bitmapLayer && typeof layer.bitmapLayer.stepToFrame === "function") {
                                    layer.bitmapLayer.stepToFrame(frame);
                                }
                                if (layer.vectorLayer && typeof layer.vectorLayer.stepToFrame === "function") {
                                    layer.vectorLayer.stepToFrame(frame);
                                }
                                if (layer.textLayer) {
                                    var offsetX = (layer.textLayer.offset !== undefined && layer.textLayer.offset.x !== undefined) ? layer.textLayer.offset.x : 0;
                                    var offsetY = (layer.textLayer.offset !== undefined && layer.textLayer.offset.y !== undefined) ? layer.textLayer.offset.y : 0;
                                    layer.textLayer.setState({
                                        textBaseline: "middle",
                                        x: (frameItem.layout.width - layer.textLayer.getBounds().width) / 2.0 + offsetX,
                                        y: frameItem.layout.height / 2.0 + offsetY
                                    });
                                }
                            }
                            else {
                                layer.setState({
                                    visible: false
                                });
                            }
                        }
                    };
                    return layer;
                };
                SpriteEntity.prototype._attachBitmapLayer = function (layer, bitmap, bitmapTransform, render) {
                    layer.bitmapLayer = render.Bitmap(bitmap, bitmapTransform);
                    layer.bitmapLayer.frames = this.frames;
                    layer.bitmapLayer.stepToFrame = function (frame) { };
                    layer.addChild(layer.bitmapLayer);
                };
                SpriteEntity.prototype._attachVectorLayer = function (layer, render) {
                    layer.vectorLayer = render.Container();
                    VectorLayerAssigner(layer.vectorLayer, render);
                    layer.vectorLayer.init(this.frames);
                    layer.addChild(layer.vectorLayer);
                };
                return SpriteEntity;
            }());
            exports_5("SpriteEntity", SpriteEntity);
        }
    };
});
System.register("proto", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var protobuf, svgaDescriptor, proto, ProtoMovieEntity;
    return {
        setters: [],
        execute: function () {
            protobuf = require("protobufjs/light");
            svgaDescriptor = JSON.parse('{"nested":{"com":{"nested":{"opensource":{"nested":{"svga":{"options":{"objc_class_prefix":"SVGAProto","java_package":"com.opensource.svgaplayer"},"nested":{"MovieParams":{"fields":{"viewBoxWidth":{"type":"float","id":1},"viewBoxHeight":{"type":"float","id":2},"fps":{"type":"int32","id":3},"frames":{"type":"int32","id":4}}},"SpriteEntity":{"fields":{"imageKey":{"type":"string","id":1},"frames":{"rule":"repeated","type":"FrameEntity","id":2}}},"Layout":{"fields":{"x":{"type":"float","id":1},"y":{"type":"float","id":2},"width":{"type":"float","id":3},"height":{"type":"float","id":4}}},"Transform":{"fields":{"a":{"type":"float","id":1},"b":{"type":"float","id":2},"c":{"type":"float","id":3},"d":{"type":"float","id":4},"tx":{"type":"float","id":5},"ty":{"type":"float","id":6}}},"ShapeEntity":{"oneofs":{"args":{"oneof":["shape","rect","ellipse"]}},"fields":{"type":{"type":"ShapeType","id":1},"shape":{"type":"ShapeArgs","id":2},"rect":{"type":"RectArgs","id":3},"ellipse":{"type":"EllipseArgs","id":4},"styles":{"type":"ShapeStyle","id":10},"transform":{"type":"Transform","id":11}},"nested":{"ShapeType":{"values":{"SHAPE":0,"RECT":1,"ELLIPSE":2,"KEEP":3}},"ShapeArgs":{"fields":{"d":{"type":"string","id":1}}},"RectArgs":{"fields":{"x":{"type":"float","id":1},"y":{"type":"float","id":2},"width":{"type":"float","id":3},"height":{"type":"float","id":4},"cornerRadius":{"type":"float","id":5}}},"EllipseArgs":{"fields":{"x":{"type":"float","id":1},"y":{"type":"float","id":2},"radiusX":{"type":"float","id":3},"radiusY":{"type":"float","id":4}}},"ShapeStyle":{"fields":{"fill":{"type":"RGBAColor","id":1},"stroke":{"type":"RGBAColor","id":2},"strokeWidth":{"type":"float","id":3},"lineCap":{"type":"LineCap","id":4},"lineJoin":{"type":"LineJoin","id":5},"miterLimit":{"type":"float","id":6},"lineDashI":{"type":"float","id":7},"lineDashII":{"type":"float","id":8},"lineDashIII":{"type":"float","id":9}},"nested":{"RGBAColor":{"fields":{"r":{"type":"float","id":1},"g":{"type":"float","id":2},"b":{"type":"float","id":3},"a":{"type":"float","id":4}}},"LineCap":{"values":{"LineCap_BUTT":0,"LineCap_ROUND":1,"LineCap_SQUARE":2}},"LineJoin":{"values":{"LineJoin_MITER":0,"LineJoin_ROUND":1,"LineJoin_BEVEL":2}}}}}},"FrameEntity":{"fields":{"alpha":{"type":"float","id":1},"layout":{"type":"Layout","id":2},"transform":{"type":"Transform","id":3},"clipPath":{"type":"string","id":4},"shapes":{"rule":"repeated","type":"ShapeEntity","id":5}}},"MovieEntity":{"fields":{"version":{"type":"string","id":1},"params":{"type":"MovieParams","id":2},"images":{"keyType":"string","type":"bytes","id":3},"sprites":{"rule":"repeated","type":"SpriteEntity","id":4}}}}}}}}}}}');
            exports_6("proto", proto = protobuf.Root.fromJSON(svgaDescriptor));
            exports_6("ProtoMovieEntity", ProtoMovieEntity = proto.lookupType("com.opensource.svga.MovieEntity"));
        }
    };
});
System.register("videoEntity", ["spriteEntity"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var spriteEntity_1, ProtoMovieEntity, VideoEntity;
    return {
        setters: [
            function (spriteEntity_1_1) {
                spriteEntity_1 = spriteEntity_1_1;
            }
        ],
        execute: function () {
            ProtoMovieEntity = require("./proto").ProtoMovieEntity;
            VideoEntity = /** @class */ (function () {
                function VideoEntity(spec, images) {
                    /**
                     * 影片尺寸
                     */
                    this.videoSize = {
                        width: 0.0,
                        height: 0.0
                    };
                    /**
                     * 帧率
                     */
                    this.FPS = 20;
                    /**
                     * 帧数
                     */
                    this.frames = 0;
                    /**
                     * Bitmaps
                     */
                    this.images = {};
                    /**
                     * SpriteEntity[]
                     */
                    this.sprites = [];
                    if (typeof spec === "object" && spec.$type == ProtoMovieEntity) {
                        if (typeof spec.params === "object") {
                            this.videoSize.width = spec.params.viewBoxWidth || 0.0;
                            this.videoSize.height = spec.params.viewBoxHeight || 0.0;
                            this.FPS = spec.params.fps || 20;
                            this.frames = spec.params.frames || 0;
                        }
                        this.resetSprites(spec);
                    }
                    else if (spec) {
                        if (spec.movie) {
                            if (spec.movie.viewBox) {
                                this.videoSize.width = parseFloat(spec.movie.viewBox.width) || 0.0;
                                this.videoSize.height = parseFloat(spec.movie.viewBox.height) || 0.0;
                            }
                            this.FPS = parseInt(spec.movie.fps) || 20;
                            this.frames = parseInt(spec.movie.frames) || 0;
                        }
                        this.resetSprites(spec);
                    }
                    if (images) {
                        this.images = images;
                    }
                }
                VideoEntity.prototype.resetSprites = function (spec) {
                    if (spec.sprites instanceof Array) {
                        this.sprites = spec.sprites.map(function (obj) {
                            return new spriteEntity_1.SpriteEntity(obj);
                        });
                    }
                };
                return VideoEntity;
            }());
            exports_7("VideoEntity", VideoEntity);
        }
    };
});
var ProtoMovieEntity = require("./proto").ProtoMovieEntity;
var assignUtils = require('pako/lib/utils/common').assign;
var inflate = require("pako/lib/inflate");
var pako = {};
assignUtils(pako, inflate);
var Uint8ToString = function (u8a) {
    var CHUNK_SZ = 0x8000;
    var c = [];
    for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
    }
    return c.join("");
};
var actions = {
    loadAssets: function (url, cb, failure) {
        if (typeof JSZipUtils === "object" && typeof JSZip === "function") {
            JSZipUtils.getBinaryContent(url, function (err, data) {
                if (err) {
                    failure && failure(err);
                    console.error(err);
                    throw err;
                }
                else {
                    if (typeof window === "object") {
                        window.SVGAPerformance.networkEnd = performance.now();
                        window.SVGAPerformance.unzipStart = performance.now();
                    }
                    JSZip.loadAsync(data).then(function (zip) {
                        actions._decodeAssets(zip, cb);
                    })["catch"](function () {
                        actions.load_viaProto(data, cb, failure);
                    });
                }
            });
        }
        else {
            var req_1 = new XMLHttpRequest();
            req_1.open("GET", url, true);
            req_1.responseType = "arraybuffer";
            req_1.onloadend = function () {
                if (typeof window === "object") {
                    window.SVGAPerformance.networkEnd = performance.now();
                    window.SVGAPerformance.unzipStart = performance.now();
                }
                actions.load_viaProto(req_1.response, cb, failure);
            };
            req_1.send();
        }
    },
    load_viaProto: function (arraybuffer, cb, failure) {
        try {
            var inflatedData = pako.inflate(arraybuffer);
            var movieData_1 = ProtoMovieEntity.decode(inflatedData);
            var images_1 = {};
            actions._loadImages(images_1, undefined, movieData_1, function () {
                if (typeof window === "object") {
                    window.SVGAPerformance.unzipEnd = performance.now();
                }
                cb({
                    movie: movieData_1,
                    images: images_1
                });
            });
        }
        catch (err) {
            failure && failure(err);
            console.error(err);
            throw err;
        }
    },
    _decodeAssets: function (zip, cb) {
        zip.file("movie.binary").async("arraybuffer").then(function (spec) {
            var movieData = Proto.MovieEntity.deserializeBinary(spec);
            var images = {};
            actions._loadImages(images, zip, movieData, function () {
                if (typeof window === "object") {
                    window.SVGAPerformance.unzipEnd = performance.now();
                }
                cb({
                    movie: movieData,
                    images: images
                });
            });
        }, function (error) {
            zip.file("movie.spec").async("string").then(function (spec) {
                var movieData = JSON.parse(spec);
                var images = {};
                actions._loadImages(images, zip, movieData, function () {
                    if (typeof window === "object") {
                        window.SVGAPerformance.unzipEnd = performance.now();
                    }
                    cb({
                        movie: movieData,
                        images: images
                    });
                });
            });
        });
    },
    _loadImages: function (images, zip, movieData, imagesLoadedBlock) {
        if (typeof movieData === "object" && movieData.$type == ProtoMovieEntity) {
            var finished = true;
            if (!zip) {
                for (var key_1 in movieData.images) {
                    if (movieData.images.hasOwnProperty(key_1)) {
                        var element_1 = movieData.images[key_1];
                        var value = Uint8ToString(element_1);
                        images[key_1] = btoa(value);
                    }
                }
            }
            else {
                var _loop_1 = function (key_2) {
                    if (movieData.images.hasOwnProperty(key_2)) {
                        var element_2 = movieData.images[key_2];
                        var value = Uint8ToString(element_2);
                        if (images.hasOwnProperty(key_2)) {
                            return "continue";
                        }
                        finished = false;
                        zip.file(value + ".png").async("base64").then(function (data) {
                            images[key_2] = data;
                            actions._loadImages(images, zip, movieData, imagesLoadedBlock);
                        }.bind(this_1));
                        return "break";
                    }
                };
                var this_1 = this;
                for (var key_2 in movieData.images) {
                    var state_1 = _loop_1(key_2);
                    if (state_1 === "break")
                        break;
                }
            }
            finished && imagesLoadedBlock.call(this);
        }
        else {
            var finished = true;
            for (var key in movieData.images) {
                if (movieData.images.hasOwnProperty(key)) {
                    var element = movieData.images[key];
                    if (images.hasOwnProperty(key)) {
                        continue;
                    }
                    finished = false;
                    zip.file(element + ".png").async("base64").then(function (data) {
                        images[key] = data;
                        actions._loadImages(images, zip, movieData, imagesLoadedBlock);
                    }.bind(this));
                    break;
                }
            }
            finished && imagesLoadedBlock.call(this);
        }
    }
};
module.exports = function (data, cb, failure) {
    actions['loadAssets'](data, cb, failure);
};
System.register("parser", ["videoEntity", "mockWorker"], function (exports_8, context_8) {
    'use strict';
    var __moduleName = context_8 && context_8.id;
    var videoEntity_1, mockWorker_1, Parser;
    return {
        setters: [
            function (videoEntity_1_1) {
                videoEntity_1 = videoEntity_1_1;
            },
            function (mockWorker_1_1) {
                mockWorker_1 = mockWorker_1_1;
            }
        ],
        execute: function () {
            if (typeof window === "object") {
                window.SVGAPerformance = {};
            }
            Parser = /** @class */ (function () {
                function Parser() {
                }
                /**
                 * url: 资源路径
                 * success(VideoEntity videoItem)
                 */
                Parser.prototype.load = function (url, success, failure) {
                    this.loadViaWorker(url, success, failure);
                };
                Parser.prototype.loadViaWorker = function (url, success, failure) {
                    if (typeof window === "object") {
                        window.SVGAPerformance.networkStart = performance.now();
                    }
                    mockWorker_1["default"](url, function (data) {
                        var movie = data.movie;
                        var images = data.images;
                        if (typeof window === "object") {
                            window.SVGAPerformance.parseStart = performance.now();
                        }
                        var videoItem = new videoEntity_1.VideoEntity(movie, images);
                        if (typeof window === "object") {
                            window.SVGAPerformance.parseEnd = performance.now();
                            console.log(window.SVGAPerformance);
                        }
                        success(videoItem);
                    }, failure);
                };
                return Parser;
            }());
            exports_8("Parser", Parser);
        }
    };
});
System.register("canvasRender", ["bezierPath", "ellipsePath", "rectPath"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var bezierPath_5, ellipsePath_2, rectPath_2, CanvasRender;
    return {
        setters: [
            function (bezierPath_5_1) {
                bezierPath_5 = bezierPath_5_1;
            },
            function (ellipsePath_2_1) {
                ellipsePath_2 = ellipsePath_2_1;
            },
            function (rectPath_2_1) {
                rectPath_2 = rectPath_2_1;
            }
        ],
        execute: function () {
            CanvasRender = /** @class */ (function () {
                function CanvasRender() {
                }
                CanvasRender.Stage = function (arg1, arg2, arg3) {
                    return {
                        setState: function () { },
                        removeAllChildren: function () { },
                        addChild: function () { },
                        update: function (player) {
                            CanvasRender.Draw(player);
                        }
                    };
                };
                CanvasRender.Draw = function (player, onCanvas, inRect) {
                    if (player.isPaused === true) {
                        // Dont return.
                    }
                    else if (!player._canvasAnimating && player.clearsAfterStop) {
                        var canvas = onCanvas || player._canvas;
                        if (canvas !== undefined) {
                            var ctx = canvas.getContext("2d");
                            if (onCanvas === undefined) {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                            }
                        }
                        return;
                    }
                    if (player._videoItem.bitmapCache === undefined) {
                        player._videoItem.bitmapCache = {};
                        var _loop_2 = function () {
                            src = player._videoItem.images[imageKey];
                            if (src.indexOf("iVBO") === 0 || src.indexOf("/9j/2w") === 0) {
                                var imgTag = document.createElement('img');
                                var inRect_1 = inRect_1 === undefined ? undefined : __assign({}, inRect_1);
                                imgTag.onload = function () {
                                    clearTimeout(CanvasRender.RedrawTimeout);
                                    CanvasRender.RedrawTimeout = setTimeout(function () { CanvasRender.Draw(player, onCanvas, inRect_1); });
                                };
                                imgTag.src = 'data:image/png;base64,' + src;
                                player._videoItem.bitmapCache[imageKey] = imgTag;
                            }
                        };
                        var src;
                        for (var imageKey in player._videoItem.images) {
                            _loop_2();
                        }
                    }
                    var canvas = onCanvas || player._canvas;
                    if (canvas !== undefined) {
                        var ctx = canvas.getContext("2d");
                        if (inRect === undefined) {
                            inRect = { x: 0, y: 0, width: canvas.width, height: canvas.height };
                        }
                        if (onCanvas === undefined) {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                        }
                        ctx.save();
                        ctx.setTransform(inRect.width / player._videoItem.videoSize.width, 0.0, 0.0, inRect.width / player._videoItem.videoSize.width, inRect.x, (inRect.height - inRect.width / player._videoItem.videoSize.width * player._videoItem.videoSize.height) / 2.0 + inRect.y);
                        player._videoItem.sprites.forEach(function (sprite) {
                            var frameItem = sprite.frames[player._currentFrame];
                            if (frameItem.alpha < 0.05) {
                                return;
                            }
                            ctx.save();
                            ctx.globalAlpha = frameItem.alpha;
                            ctx.transform(frameItem.transform.a, frameItem.transform.b, frameItem.transform.c, frameItem.transform.d, frameItem.transform.tx, frameItem.transform.ty);
                            var src = player._dynamicImage[sprite.imageKey] || player._videoItem.bitmapCache[sprite.imageKey] || player._videoItem.images[sprite.imageKey];
                            if (typeof src === "string") {
                                var imgTag = document.createElement('img');
                                if (src.indexOf("iVBO") === 0 || src.indexOf("/9j/2w") === 0) {
                                    imgTag.src = 'data:image/png;base64,' + src;
                                }
                                else {
                                    imgTag.src = src;
                                }
                                player._videoItem.bitmapCache[sprite.imageKey] = imgTag;
                                if (frameItem.maskPath !== undefined && frameItem.maskPath !== null) {
                                    frameItem.maskPath.getShape(CanvasRender).draw(ctx, true);
                                    ctx.clip();
                                }
                                if (player._dynamicImageTransform[sprite.imageKey] !== undefined) {
                                    ctx.save();
                                    var concatTransform = player._dynamicImageTransform[sprite.imageKey];
                                    ctx.transform(concatTransform[0], concatTransform[1], concatTransform[2], concatTransform[3], concatTransform[4], concatTransform[5]);
                                }
                                ctx.drawImage(imgTag, 0, 0);
                                if (player._dynamicImageTransform[sprite.imageKey] !== undefined) {
                                    ctx.restore();
                                }
                            }
                            else if (typeof src === "object") {
                                if (frameItem.maskPath !== undefined && frameItem.maskPath !== null) {
                                    frameItem.maskPath.getShape(CanvasRender).draw(ctx, true);
                                    ctx.clip();
                                }
                                if (player._dynamicImageTransform[sprite.imageKey] !== undefined) {
                                    ctx.save();
                                    var concatTransform = player._dynamicImageTransform[sprite.imageKey];
                                    ctx.transform(concatTransform[0], concatTransform[1], concatTransform[2], concatTransform[3], concatTransform[4], concatTransform[5]);
                                }
                                ctx.drawImage(src, 0, 0);
                                if (player._dynamicImageTransform[sprite.imageKey] !== undefined) {
                                    ctx.restore();
                                }
                            }
                            frameItem.shapes && frameItem.shapes.forEach(function (shape) {
                                if (shape.type === "shape" && shape.args && shape.args.d) {
                                    new bezierPath_5.BezierPath(shape.args.d, shape.transform, shape.styles).getShape(CanvasRender).draw(ctx);
                                }
                                if (shape.type === "ellipse" && shape.args) {
                                    var ellipse = new ellipsePath_2.EllipsePath(parseFloat(shape.args.x) || 0.0, parseFloat(shape.args.y) || 0.0, parseFloat(shape.args.radiusX) || 0.0, parseFloat(shape.args.radiusY) || 0.0, shape.transform, shape.styles);
                                    ellipse.getShape(CanvasRender).draw(ctx);
                                }
                                if (shape.type === "rect" && shape.args) {
                                    var rect = new rectPath_2.RectPath(parseFloat(shape.args.x) || 0.0, parseFloat(shape.args.y) || 0.0, parseFloat(shape.args.width) || 0.0, parseFloat(shape.args.height) || 0.0, parseFloat(shape.args.cornerRadius) || 0.0, shape.transform, shape.styles);
                                    rect.getShape(CanvasRender).draw(ctx);
                                }
                            });
                            var dynamicText = player._dynamicText[sprite.imageKey];
                            if (dynamicText !== undefined) {
                                ctx.textBaseline = "middle";
                                ctx.font = dynamicText.style;
                                var textWidth = ctx.measureText(dynamicText.text).width;
                                ctx.fillStyle = dynamicText.color;
                                var offsetX = (dynamicText.offset !== undefined && dynamicText.offset.x !== undefined) ? isNaN(parseFloat(dynamicText.offset.x)) ? 0 : parseFloat(dynamicText.offset.x) : 0;
                                var offsetY = (dynamicText.offset !== undefined && dynamicText.offset.y !== undefined) ? isNaN(parseFloat(dynamicText.offset.y)) ? 0 : parseFloat(dynamicText.offset.y) : 0;
                                ctx.fillText(dynamicText.text, (frameItem.layout.width - textWidth) / 2 + offsetX, frameItem.layout.height / 2 + offsetY);
                            }
                            ctx.restore();
                        });
                        ctx.restore();
                    }
                };
                CanvasRender.Container = function () {
                    return {
                        setState: function () { },
                        removeAllChildren: function () { },
                        addChild: function () { },
                        children: function () { return []; }
                    };
                };
                CanvasRender.AddTimer = function (callee, callback) {
                    var requestAnimationFrame;
                    if (window.requestAnimationFrame !== undefined) {
                        requestAnimationFrame = window.requestAnimationFrame;
                    }
                    else {
                        requestAnimationFrame = function (callback) { window.setTimeout(callback, 16); };
                    }
                    callee._canvasAnimating = true;
                    callee.drawOnCanvas = function (canvas, x, y, width, height) { CanvasRender.Draw(callee, canvas, { x: x, y: y, width: width, height: height }); };
                    var cancelled = false;
                    var doFrame = function () {
                        requestAnimationFrame(function () {
                            if (cancelled === false) {
                                callback && callback.call(callee);
                                doFrame();
                            }
                        });
                    };
                    doFrame();
                    return function () { callee._canvasAnimating = false; cancelled = true; };
                };
                CanvasRender.RemoveTimer = function (callee, handler) {
                    return handler && handler();
                };
                CanvasRender.Matrix2D = function (a, b, c, d, tx, ty) {
                    return { a: a, b: b, c: c, d: d, tx: tx, ty: ty };
                };
                CanvasRender.Shape = function () {
                    var layer = {
                        draw: function (ctx, noFill) {
                            ctx.save();
                            if (layer.transform !== undefined && layer.transform !== null) {
                                ctx.transform(layer.transform.a, layer.transform.b, layer.transform.c, layer.transform.d, layer.transform.tx, layer.transform.ty);
                            }
                            ctx.fillStyle = layer.graphics.fillStyle;
                            ctx.strokeStyle = layer.graphics.strokeStyle;
                            ctx.lineCap = layer.graphics.lineCap;
                            ctx.lineJoin = layer.graphics.lineJoin;
                            ctx.lineWidth = layer.graphics.lineWidth;
                            ctx.miterLimit = layer.graphics.miterLimit;
                            if (layer.graphics.strokeDash !== undefined) {
                                var _a = layer.graphics.strokeDash, arr = _a.arr, arg = _a.arg;
                                var newArr_1 = [];
                                arr.forEach(function (item) { return newArr_1.push(item); });
                                newArr_1.push(arg);
                                ctx.setLineDash(newArr_1);
                            }
                            if (layer.graphics.currentPath instanceof Array) {
                                ctx.beginPath();
                                layer.graphics.currentPath.forEach(function (item) {
                                    if (item[0] === "moveTo") {
                                        ctx.moveTo(item[1], item[2]);
                                    }
                                    else if (item[0] === "lineTo") {
                                        ctx.lineTo(item[1], item[2]);
                                    }
                                    else if (item[0] === "bezierCurveTo") {
                                        ctx.bezierCurveTo(item[1], item[2], item[3], item[4], item[5], item[6]);
                                    }
                                    else if (item[0] === "quadraticCurveTo") {
                                        ctx.quadraticCurveTo(item[1], item[2], item[3], item[4]);
                                    }
                                    else if (item[0] === "closePath") {
                                        ctx.closePath();
                                    }
                                    else if (item[0] === "ellipse") {
                                        var x = item[1];
                                        var y = item[2];
                                        var w = item[3];
                                        var h = item[4];
                                        var kappa = .5522848, ox = (w / 2) * kappa, oy = (h / 2) * kappa, xe = x + w, ye = y + h, xm = x + w / 2, ym = y + h / 2;
                                        ctx.beginPath();
                                        ctx.moveTo(x, ym);
                                        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
                                        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
                                        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
                                        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
                                    }
                                    else if (item[0] === "rect") {
                                        var x = item[1];
                                        var y = item[2];
                                        var width = item[3];
                                        var height = item[4];
                                        var radius = item[5];
                                        ctx.beginPath();
                                        ctx.moveTo(x + radius, y);
                                        ctx.lineTo(x + width - radius, y);
                                        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                                        ctx.lineTo(x + width, y + height - radius);
                                        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
                                        ctx.lineTo(x + radius, y + height);
                                        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                                        ctx.lineTo(x, y + radius);
                                        ctx.quadraticCurveTo(x, y, x + radius, y);
                                        ctx.closePath();
                                    }
                                });
                            }
                            layer.graphics.fillStyle && noFill !== true && ctx.fill();
                            layer.graphics.strokeStyle && ctx.stroke();
                            ctx.restore();
                        }
                    };
                    layer.setState = function (state) { layer.transform = state.transform; };
                    layer.graphics = {};
                    layer.graphics.currentPath = [];
                    layer.graphics.beginFill = function (fillStyle) {
                        layer.graphics.fillStyle = fillStyle;
                    };
                    layer.graphics.beginStroke = function (stroke) {
                        layer.graphics.strokeStyle = stroke;
                    };
                    layer.graphics.setStrokeStyle = function (width, caps, joints, miterLimit) {
                        layer.graphics.lineCap = caps;
                        layer.graphics.lineJoin = joints;
                        layer.graphics.lineWidth = width;
                        layer.graphics.miterLimit = miterLimit;
                    };
                    layer.graphics.setStrokeDash = function (arr, arg) {
                        layer.graphics.strokeDash = { arr: arr, arg: arg };
                    };
                    layer.graphics.st = function (x, y) {
                        layer.graphics.currentPath = [];
                    };
                    layer.graphics.mt = function (x, y) {
                        layer.graphics.currentPath.push(["moveTo", x, y]);
                    };
                    layer.graphics.lt = function (x, y) {
                        layer.graphics.currentPath.push(["lineTo", x, y]);
                    };
                    layer.graphics.bt = function (x1, y1, x2, y2, x, y) {
                        layer.graphics.currentPath.push(["bezierCurveTo", x1, y1, x2, y2, x, y]);
                    };
                    layer.graphics.qt = function (x1, y1, x, y) {
                        layer.graphics.currentPath.push(["quadraticCurveTo", x1, y1, x, y]);
                    };
                    layer.graphics.cp = function () {
                        layer.graphics.currentPath.push(["closePath"]);
                    };
                    layer.graphics.drawEllipse = function (left, top, dX, dY) {
                        layer.graphics.currentPath.push(["ellipse", left, top, dX, dY]);
                    };
                    layer.graphics.drawRoundRect = function (x, y, width, height, cornerRadius) {
                        layer.graphics.currentPath.push(["rect", x, y, width, height, cornerRadius]);
                    };
                    return layer;
                };
                CanvasRender.Bitmap = function (src) {
                    return {};
                };
                CanvasRender.Text = function (text, style, color) {
                    var layer = { text: text, style: style, color: color };
                    layer.setState = function (state) {
                        for (var key in state) {
                            layer[key] = state[key];
                        }
                    };
                    return layer;
                };
                CanvasRender.setBounds = function (layer, bounds) {
                    return undefined;
                };
                return CanvasRender;
            }());
            exports_9("CanvasRender", CanvasRender);
        }
    };
});
System.register("player", ["canvasRender"], function (exports_10, context_10) {
    'use strict';
    var __moduleName = context_10 && context_10.id;
    var canvasRender_1, Player;
    return {
        setters: [
            function (canvasRender_1_1) {
                canvasRender_1 = canvasRender_1_1;
            }
        ],
        execute: function () {
            Player = /** @class */ (function () {
                function Player(canvas) {
                    this.render = undefined;
                    this.loops = 0;
                    this.clearsAfterStop = true;
                    this.isPaused = false;
                    /**
                     * Private methods & properties
                     */
                    this._canvas = '';
                    this._stage = null;
                    this._videoItem = null;
                    this._rootLayer = null;
                    this._drawLayer = null;
                    this._loopCount = 0;
                    this._currentFrame = 0;
                    this._tickListener = null;
                    this._dynamicImage = {};
                    this._dynamicImageTransform = {};
                    this._dynamicText = {};
                    this._onFinished = null;
                    this._onFrame = null;
                    this._onPercentage = null;
                    this._nextTickTime = 0;
                    this._canvas = typeof canvas === "string" ? document.querySelector(canvas) : canvas;
                    this.setRender(undefined);
                }
                Player.prototype.container = function (stage) {
                    this._stage = stage;
                    return this._rootLayer;
                };
                Player.prototype.setRender = function (render) {
                    if (render === undefined) {
                        if (window.createjs !== undefined && window.SvgaCreatejs !== undefined) {
                            render = window.SvgaCreatejs.Render;
                        }
                        else if (window.Laya !== undefined && window.SvgaLayabox !== undefined) {
                            render = window.SvgaLayabox.Render;
                        }
                        else {
                            render = canvasRender_1.CanvasRender;
                        }
                    }
                    if (render === undefined) {
                        throw "RENDER REQUIRED.";
                    }
                    this.render = render;
                    this.resetRootStage();
                };
                Player.prototype.resetRootStage = function () {
                    if (this._canvas !== undefined) {
                        this._rootLayer = this.render.Stage(this._canvas);
                        this._stage = this._rootLayer;
                    }
                    else {
                        this._rootLayer = this.render.Container();
                    }
                };
                Player.prototype.setVideoItem = function (videoItem) {
                    this._videoItem = videoItem;
                    this.clear();
                    this._draw();
                };
                Player.prototype.startAnimation = function () {
                    this.isPaused = false;
                    this.stopAnimation(false);
                    this._loopCount = 0;
                    this._tickListener = this.render.AddTimer(this, this._onTick);
                };
                Player.prototype.pauseAnimation = function () {
                    this.isPaused = true;
                    this.stopAnimation(false);
                };
                Player.prototype.stopAnimation = function (clear) {
                    if (clear === undefined) {
                        clear = this.clearsAfterStop;
                    }
                    this.render.RemoveTimer(this, this._tickListener);
                    if (clear) {
                        this.clear();
                    }
                };
                Player.prototype.clear = function () {
                    this.isPaused = false;
                    this._rootLayer.removeAllChildren();
                    this._stage && this._stage.update(this);
                };
                Player.prototype.stepToFrame = function (frame, andPlay) {
                    if (frame >= this._videoItem.frames || frame < 0) {
                        return;
                    }
                    this.pauseAnimation();
                    this._currentFrame = frame;
                    this._update();
                    if (andPlay) {
                        this.isPaused = false;
                        this._tickListener = this.render.AddTimer(this, this._onTick);
                    }
                };
                Player.prototype.stepToPercentage = function (percentage, andPlay) {
                    var frame = parseInt(percentage * this._videoItem.frames);
                    if (frame >= this._videoItem.frames && frame > 0) {
                        frame = this._videoItem.frames - 1;
                    }
                    this.stepToFrame(frame, andPlay);
                };
                Player.prototype.setImage = function (urlORbase64, forKey, transform) {
                    this._dynamicImage[forKey] = urlORbase64;
                    if (transform !== undefined && transform instanceof Array && transform.length == 6) {
                        this._dynamicImageTransform[forKey] = transform;
                    }
                };
                Player.prototype.setText = function (textORMap, forKey) {
                    var text = typeof textORMap === "string" ? textORMap : textORMap.text;
                    var size = (typeof textORMap === "object" ? textORMap.size : "14px") || "14px";
                    var family = (typeof textORMap === "object" ? textORMap.family : "") || "";
                    var color = (typeof textORMap === "object" ? textORMap.color : "#000000") || "#000000";
                    var offset = (typeof textORMap === "object" ? textORMap.offset : { x: 0.0, y: 0.0 }) || { x: 0.0, y: 0.0 };
                    var textLayer = this.render.Text(text, size + " family", color);
                    textLayer.setState({ offset: offset });
                    this._dynamicText[forKey] = textLayer;
                };
                Player.prototype.clearDynamicObjects = function () {
                    this._dynamicImage = {};
                    this._dynamicImageTransform = {};
                    this._dynamicText = {};
                };
                Player.prototype.onFinished = function (callback) {
                    this._onFinished = callback;
                };
                Player.prototype.onFrame = function (callback) {
                    this._onFrame = callback;
                };
                Player.prototype.onPercentage = function (callback) {
                    this._onPercentage = callback;
                };
                Player.prototype._onTick = function () {
                    if (typeof this._videoItem === "object") {
                        if ((new Date()).getTime() >= this._nextTickTime) {
                            this._nextTickTime = parseInt(1000 / this._videoItem.FPS) + (new Date()).getTime() - (60 / this._videoItem.FPS) * 2;
                            this._next();
                        }
                    }
                };
                Player.prototype._next = function () {
                    this._currentFrame++;
                    if (this._currentFrame >= this._videoItem.frames) {
                        this._currentFrame = 0;
                        this._loopCount++;
                        if (this.loops > 0 && this._loopCount >= this.loops) {
                            this.stopAnimation();
                            if (typeof this._onFinished === "function") {
                                this._onFinished();
                            }
                        }
                    }
                    this._update();
                    if (typeof this._onFrame === "function") {
                        this._onFrame(this._currentFrame);
                    }
                    if (typeof this._onPercentage === "function") {
                        this._onPercentage(parseFloat(this._currentFrame + 1) / parseFloat(this._videoItem.frames));
                    }
                };
                Player.prototype._draw = function () {
                    var self = this;
                    this._drawLayer = this.render.Container();
                    this.render.setBounds(this._drawLayer, { x: 0.0, y: 0.0, width: this._videoItem.videoSize.width, height: this._videoItem.videoSize.height });
                    this._videoItem.sprites.forEach(function (sprite) {
                        var bitmap;
                        if (sprite.imageKey) {
                            bitmap = self._dynamicImage[sprite.imageKey] || self._videoItem.images[sprite.imageKey];
                        }
                        var contentLayer = sprite.requestLayer(bitmap, self._dynamicImageTransform[sprite.imageKey], self.render);
                        if (sprite.imageKey) {
                            if (self._dynamicText[sprite.imageKey]) {
                                contentLayer.textLayer = self._dynamicText[sprite.imageKey];
                                contentLayer.addChild(self._dynamicText[sprite.imageKey]);
                            }
                        }
                        self._drawLayer.addChild(contentLayer);
                    });
                    this._rootLayer.addChild(this._drawLayer);
                    this._currentFrame = 0;
                    this._update();
                };
                Player.prototype._resize = function () {
                    if (this._canvas !== undefined) {
                        this._canvas.width = this._canvas.offsetWidth;
                        this._canvas.height = this._canvas.offsetHeight;
                        var ratio = this._canvas.offsetWidth / this._videoItem.videoSize.width;
                        this._drawLayer.setState({
                            transform: this.render.Matrix2D(ratio, 0.0, 0.0, ratio, 0.0, 0.0)
                        });
                    }
                    else {
                        var ratio = this._rootLayer.width / this._videoItem.videoSize.width;
                        this._drawLayer.setState({
                            transform: this.render.Matrix2D(ratio, 0.0, 0.0, ratio, 0.0, 0.0)
                        });
                    }
                };
                Player.prototype._update = function () {
                    var children = this._drawLayer.children instanceof Array ? this._drawLayer.children : this._drawLayer.children();
                    for (var index = 0; index < children.length; index++) {
                        var child = children[index];
                        if (typeof child.stepToFrame === "function") {
                            child.stepToFrame(this._currentFrame);
                        }
                    }
                    this._resize();
                    this._stage && this._stage.update(this);
                };
                return Player;
            }());
            exports_10("Player", Player);
        }
    };
});
System.register("autoLoader", ["parser", "player"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var parser_1, player_1, AutoLoader;
    return {
        setters: [
            function (parser_1_1) {
                parser_1 = parser_1_1;
            },
            function (player_1_1) {
                player_1 = player_1_1;
            }
        ],
        execute: function () {
            AutoLoader = /** @class */ (function () {
                function AutoLoader() {
                }
                AutoLoader.sharedParser = new parser_1.Parser();
                AutoLoader.autoload = function (element, customParser) {
                    if (typeof window === "undefined" || typeof document === "undefined") {
                        return;
                    }
                    var parser = customParser || AutoLoader.sharedParser;
                    if (element) {
                        if (element.tagName === "CANVAS" && element.attributes.src && element.attributes.src.value.indexOf(".svga") === element.attributes.src.value.length - 5) {
                            var src = element.attributes.src.value;
                            var player_2 = new player_1.Player(element);
                            parser.load(src, function (videoItem) {
                                if (element.attributes.loops) {
                                    var loops = parseFloat(element.attributes.loops.value) || 0;
                                    player_2.loops = loops;
                                }
                                if (element.attributes.clearsAfterStop) {
                                    var clearsAfterStop = !(element.attributes.clearsAfterStop.value === "false");
                                    player_2.clearsAfterStop = clearsAfterStop;
                                }
                                player_2.setVideoItem(videoItem);
                                player_2.startAnimation();
                            });
                            element.player = player_2;
                        }
                    }
                    else {
                        var elements = document.getElementsByTagName("canvas");
                        for (var index = 0; index < elements.length; index++) {
                            var element = elements[index];
                            AutoLoader.autoload(element);
                        }
                    }
                };
                return AutoLoader;
            }());
            exports_11("AutoLoader", AutoLoader);
        }
    };
});
System.register("index", ["parser", "player", "autoLoader"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var parser_2, player_3, autoLoader_1;
    return {
        setters: [
            function (parser_2_1) {
                parser_2 = parser_2_1;
            },
            function (player_3_1) {
                player_3 = player_3_1;
            },
            function (autoLoader_1_1) {
                autoLoader_1 = autoLoader_1_1;
            }
        ],
        execute: function () {
            (function (global) {
                global.Svga = global.SVGA = {
                    Parser: parser_2.Parser,
                    Player: player_3.Player,
                    autoload: autoLoader_1.AutoLoader.autoload
                };
                autoLoader_1.AutoLoader.autoload();
            })((typeof this === "object" && this) ||
                (typeof window === "object" && window) ||
                {});
            module.exports = {
                Parser: parser_2.Parser,
                Player: player_3.Player
            };
        }
    };
});
//# sourceMappingURL=exports.js.map