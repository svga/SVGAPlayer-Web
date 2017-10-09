/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.com = (function() {

    /**
     * Namespace com.
     * @exports com
     * @namespace
     */
    var com = {};

    com.opensource = (function() {

        /**
         * Namespace opensource.
         * @memberof com
         * @namespace
         */
        var opensource = {};

        opensource.svga = (function() {

            /**
             * Namespace svga.
             * @memberof com.opensource
             * @namespace
             */
            var svga = {};

            svga.MovieParams = (function() {

                /**
                 * Properties of a MovieParams.
                 * @memberof com.opensource.svga
                 * @interface IMovieParams
                 * @property {number|null} [viewBoxWidth] MovieParams viewBoxWidth
                 * @property {number|null} [viewBoxHeight] MovieParams viewBoxHeight
                 * @property {number|null} [fps] MovieParams fps
                 * @property {number|null} [frames] MovieParams frames
                 */

                /**
                 * Constructs a new MovieParams.
                 * @memberof com.opensource.svga
                 * @classdesc Represents a MovieParams.
                 * @constructor
                 * @param {com.opensource.svga.IMovieParams=} [properties] Properties to set
                 */
                function MovieParams(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * MovieParams viewBoxWidth.
                 * @member {number} viewBoxWidth
                 * @memberof com.opensource.svga.MovieParams
                 * @instance
                 */
                MovieParams.prototype.viewBoxWidth = 0;

                /**
                 * MovieParams viewBoxHeight.
                 * @member {number} viewBoxHeight
                 * @memberof com.opensource.svga.MovieParams
                 * @instance
                 */
                MovieParams.prototype.viewBoxHeight = 0;

                /**
                 * MovieParams fps.
                 * @member {number} fps
                 * @memberof com.opensource.svga.MovieParams
                 * @instance
                 */
                MovieParams.prototype.fps = 0;

                /**
                 * MovieParams frames.
                 * @member {number} frames
                 * @memberof com.opensource.svga.MovieParams
                 * @instance
                 */
                MovieParams.prototype.frames = 0;

                /**
                 * Creates a new MovieParams instance using the specified properties.
                 * @function create
                 * @memberof com.opensource.svga.MovieParams
                 * @static
                 * @param {com.opensource.svga.IMovieParams=} [properties] Properties to set
                 * @returns {com.opensource.svga.MovieParams} MovieParams instance
                 */
                MovieParams.create = function create(properties) {
                    return new MovieParams(properties);
                };

                /**
                 * Encodes the specified MovieParams message. Does not implicitly {@link com.opensource.svga.MovieParams.verify|verify} messages.
                 * @function encode
                 * @memberof com.opensource.svga.MovieParams
                 * @static
                 * @param {com.opensource.svga.IMovieParams} message MovieParams message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MovieParams.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.viewBoxWidth != null && message.hasOwnProperty("viewBoxWidth"))
                        writer.uint32(/* id 1, wireType 5 =*/13).float(message.viewBoxWidth);
                    if (message.viewBoxHeight != null && message.hasOwnProperty("viewBoxHeight"))
                        writer.uint32(/* id 2, wireType 5 =*/21).float(message.viewBoxHeight);
                    if (message.fps != null && message.hasOwnProperty("fps"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.fps);
                    if (message.frames != null && message.hasOwnProperty("frames"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.frames);
                    return writer;
                };

                /**
                 * Encodes the specified MovieParams message, length delimited. Does not implicitly {@link com.opensource.svga.MovieParams.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof com.opensource.svga.MovieParams
                 * @static
                 * @param {com.opensource.svga.IMovieParams} message MovieParams message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MovieParams.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a MovieParams message from the specified reader or buffer.
                 * @function decode
                 * @memberof com.opensource.svga.MovieParams
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {com.opensource.svga.MovieParams} MovieParams
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MovieParams.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.opensource.svga.MovieParams();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.viewBoxWidth = reader.float();
                            break;
                        case 2:
                            message.viewBoxHeight = reader.float();
                            break;
                        case 3:
                            message.fps = reader.int32();
                            break;
                        case 4:
                            message.frames = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a MovieParams message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof com.opensource.svga.MovieParams
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {com.opensource.svga.MovieParams} MovieParams
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MovieParams.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a MovieParams message.
                 * @function verify
                 * @memberof com.opensource.svga.MovieParams
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                MovieParams.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.viewBoxWidth != null && message.hasOwnProperty("viewBoxWidth"))
                        if (typeof message.viewBoxWidth !== "number")
                            return "viewBoxWidth: number expected";
                    if (message.viewBoxHeight != null && message.hasOwnProperty("viewBoxHeight"))
                        if (typeof message.viewBoxHeight !== "number")
                            return "viewBoxHeight: number expected";
                    if (message.fps != null && message.hasOwnProperty("fps"))
                        if (!$util.isInteger(message.fps))
                            return "fps: integer expected";
                    if (message.frames != null && message.hasOwnProperty("frames"))
                        if (!$util.isInteger(message.frames))
                            return "frames: integer expected";
                    return null;
                };

                /**
                 * Creates a MovieParams message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof com.opensource.svga.MovieParams
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {com.opensource.svga.MovieParams} MovieParams
                 */
                MovieParams.fromObject = function fromObject(object) {
                    if (object instanceof $root.com.opensource.svga.MovieParams)
                        return object;
                    var message = new $root.com.opensource.svga.MovieParams();
                    if (object.viewBoxWidth != null)
                        message.viewBoxWidth = Number(object.viewBoxWidth);
                    if (object.viewBoxHeight != null)
                        message.viewBoxHeight = Number(object.viewBoxHeight);
                    if (object.fps != null)
                        message.fps = object.fps | 0;
                    if (object.frames != null)
                        message.frames = object.frames | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a MovieParams message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof com.opensource.svga.MovieParams
                 * @static
                 * @param {com.opensource.svga.MovieParams} message MovieParams
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                MovieParams.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.viewBoxWidth = 0;
                        object.viewBoxHeight = 0;
                        object.fps = 0;
                        object.frames = 0;
                    }
                    if (message.viewBoxWidth != null && message.hasOwnProperty("viewBoxWidth"))
                        object.viewBoxWidth = options.json && !isFinite(message.viewBoxWidth) ? String(message.viewBoxWidth) : message.viewBoxWidth;
                    if (message.viewBoxHeight != null && message.hasOwnProperty("viewBoxHeight"))
                        object.viewBoxHeight = options.json && !isFinite(message.viewBoxHeight) ? String(message.viewBoxHeight) : message.viewBoxHeight;
                    if (message.fps != null && message.hasOwnProperty("fps"))
                        object.fps = message.fps;
                    if (message.frames != null && message.hasOwnProperty("frames"))
                        object.frames = message.frames;
                    return object;
                };

                /**
                 * Converts this MovieParams to JSON.
                 * @function toJSON
                 * @memberof com.opensource.svga.MovieParams
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                MovieParams.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return MovieParams;
            })();

            svga.SpriteEntity = (function() {

                /**
                 * Properties of a SpriteEntity.
                 * @memberof com.opensource.svga
                 * @interface ISpriteEntity
                 * @property {string|null} [imageKey] SpriteEntity imageKey
                 * @property {Array.<com.opensource.svga.IFrameEntity>|null} [frames] SpriteEntity frames
                 */

                /**
                 * Constructs a new SpriteEntity.
                 * @memberof com.opensource.svga
                 * @classdesc Represents a SpriteEntity.
                 * @constructor
                 * @param {com.opensource.svga.ISpriteEntity=} [properties] Properties to set
                 */
                function SpriteEntity(properties) {
                    this.frames = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * SpriteEntity imageKey.
                 * @member {string} imageKey
                 * @memberof com.opensource.svga.SpriteEntity
                 * @instance
                 */
                SpriteEntity.prototype.imageKey = "";

                /**
                 * SpriteEntity frames.
                 * @member {Array.<com.opensource.svga.IFrameEntity>} frames
                 * @memberof com.opensource.svga.SpriteEntity
                 * @instance
                 */
                SpriteEntity.prototype.frames = $util.emptyArray;

                /**
                 * Creates a new SpriteEntity instance using the specified properties.
                 * @function create
                 * @memberof com.opensource.svga.SpriteEntity
                 * @static
                 * @param {com.opensource.svga.ISpriteEntity=} [properties] Properties to set
                 * @returns {com.opensource.svga.SpriteEntity} SpriteEntity instance
                 */
                SpriteEntity.create = function create(properties) {
                    return new SpriteEntity(properties);
                };

                /**
                 * Encodes the specified SpriteEntity message. Does not implicitly {@link com.opensource.svga.SpriteEntity.verify|verify} messages.
                 * @function encode
                 * @memberof com.opensource.svga.SpriteEntity
                 * @static
                 * @param {com.opensource.svga.ISpriteEntity} message SpriteEntity message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SpriteEntity.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.imageKey != null && message.hasOwnProperty("imageKey"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.imageKey);
                    if (message.frames != null && message.frames.length)
                        for (var i = 0; i < message.frames.length; ++i)
                            $root.com.opensource.svga.FrameEntity.encode(message.frames[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified SpriteEntity message, length delimited. Does not implicitly {@link com.opensource.svga.SpriteEntity.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof com.opensource.svga.SpriteEntity
                 * @static
                 * @param {com.opensource.svga.ISpriteEntity} message SpriteEntity message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SpriteEntity.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a SpriteEntity message from the specified reader or buffer.
                 * @function decode
                 * @memberof com.opensource.svga.SpriteEntity
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {com.opensource.svga.SpriteEntity} SpriteEntity
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SpriteEntity.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.opensource.svga.SpriteEntity();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.imageKey = reader.string();
                            break;
                        case 2:
                            if (!(message.frames && message.frames.length))
                                message.frames = [];
                            message.frames.push($root.com.opensource.svga.FrameEntity.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a SpriteEntity message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof com.opensource.svga.SpriteEntity
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {com.opensource.svga.SpriteEntity} SpriteEntity
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SpriteEntity.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SpriteEntity message.
                 * @function verify
                 * @memberof com.opensource.svga.SpriteEntity
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SpriteEntity.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.imageKey != null && message.hasOwnProperty("imageKey"))
                        if (!$util.isString(message.imageKey))
                            return "imageKey: string expected";
                    if (message.frames != null && message.hasOwnProperty("frames")) {
                        if (!Array.isArray(message.frames))
                            return "frames: array expected";
                        for (var i = 0; i < message.frames.length; ++i) {
                            var error = $root.com.opensource.svga.FrameEntity.verify(message.frames[i]);
                            if (error)
                                return "frames." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a SpriteEntity message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof com.opensource.svga.SpriteEntity
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {com.opensource.svga.SpriteEntity} SpriteEntity
                 */
                SpriteEntity.fromObject = function fromObject(object) {
                    if (object instanceof $root.com.opensource.svga.SpriteEntity)
                        return object;
                    var message = new $root.com.opensource.svga.SpriteEntity();
                    if (object.imageKey != null)
                        message.imageKey = String(object.imageKey);
                    if (object.frames) {
                        if (!Array.isArray(object.frames))
                            throw TypeError(".com.opensource.svga.SpriteEntity.frames: array expected");
                        message.frames = [];
                        for (var i = 0; i < object.frames.length; ++i) {
                            if (typeof object.frames[i] !== "object")
                                throw TypeError(".com.opensource.svga.SpriteEntity.frames: object expected");
                            message.frames[i] = $root.com.opensource.svga.FrameEntity.fromObject(object.frames[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a SpriteEntity message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof com.opensource.svga.SpriteEntity
                 * @static
                 * @param {com.opensource.svga.SpriteEntity} message SpriteEntity
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SpriteEntity.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.frames = [];
                    if (options.defaults)
                        object.imageKey = "";
                    if (message.imageKey != null && message.hasOwnProperty("imageKey"))
                        object.imageKey = message.imageKey;
                    if (message.frames && message.frames.length) {
                        object.frames = [];
                        for (var j = 0; j < message.frames.length; ++j)
                            object.frames[j] = $root.com.opensource.svga.FrameEntity.toObject(message.frames[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this SpriteEntity to JSON.
                 * @function toJSON
                 * @memberof com.opensource.svga.SpriteEntity
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SpriteEntity.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return SpriteEntity;
            })();

            svga.Layout = (function() {

                /**
                 * Properties of a Layout.
                 * @memberof com.opensource.svga
                 * @interface ILayout
                 * @property {number|null} [x] Layout x
                 * @property {number|null} [y] Layout y
                 * @property {number|null} [width] Layout width
                 * @property {number|null} [height] Layout height
                 */

                /**
                 * Constructs a new Layout.
                 * @memberof com.opensource.svga
                 * @classdesc Represents a Layout.
                 * @constructor
                 * @param {com.opensource.svga.ILayout=} [properties] Properties to set
                 */
                function Layout(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Layout x.
                 * @member {number} x
                 * @memberof com.opensource.svga.Layout
                 * @instance
                 */
                Layout.prototype.x = 0;

                /**
                 * Layout y.
                 * @member {number} y
                 * @memberof com.opensource.svga.Layout
                 * @instance
                 */
                Layout.prototype.y = 0;

                /**
                 * Layout width.
                 * @member {number} width
                 * @memberof com.opensource.svga.Layout
                 * @instance
                 */
                Layout.prototype.width = 0;

                /**
                 * Layout height.
                 * @member {number} height
                 * @memberof com.opensource.svga.Layout
                 * @instance
                 */
                Layout.prototype.height = 0;

                /**
                 * Creates a new Layout instance using the specified properties.
                 * @function create
                 * @memberof com.opensource.svga.Layout
                 * @static
                 * @param {com.opensource.svga.ILayout=} [properties] Properties to set
                 * @returns {com.opensource.svga.Layout} Layout instance
                 */
                Layout.create = function create(properties) {
                    return new Layout(properties);
                };

                /**
                 * Encodes the specified Layout message. Does not implicitly {@link com.opensource.svga.Layout.verify|verify} messages.
                 * @function encode
                 * @memberof com.opensource.svga.Layout
                 * @static
                 * @param {com.opensource.svga.ILayout} message Layout message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Layout.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.x != null && message.hasOwnProperty("x"))
                        writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
                    if (message.y != null && message.hasOwnProperty("y"))
                        writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
                    if (message.width != null && message.hasOwnProperty("width"))
                        writer.uint32(/* id 3, wireType 5 =*/29).float(message.width);
                    if (message.height != null && message.hasOwnProperty("height"))
                        writer.uint32(/* id 4, wireType 5 =*/37).float(message.height);
                    return writer;
                };

                /**
                 * Encodes the specified Layout message, length delimited. Does not implicitly {@link com.opensource.svga.Layout.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof com.opensource.svga.Layout
                 * @static
                 * @param {com.opensource.svga.ILayout} message Layout message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Layout.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Layout message from the specified reader or buffer.
                 * @function decode
                 * @memberof com.opensource.svga.Layout
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {com.opensource.svga.Layout} Layout
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Layout.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.opensource.svga.Layout();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.x = reader.float();
                            break;
                        case 2:
                            message.y = reader.float();
                            break;
                        case 3:
                            message.width = reader.float();
                            break;
                        case 4:
                            message.height = reader.float();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Layout message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof com.opensource.svga.Layout
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {com.opensource.svga.Layout} Layout
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Layout.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Layout message.
                 * @function verify
                 * @memberof com.opensource.svga.Layout
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Layout.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.x != null && message.hasOwnProperty("x"))
                        if (typeof message.x !== "number")
                            return "x: number expected";
                    if (message.y != null && message.hasOwnProperty("y"))
                        if (typeof message.y !== "number")
                            return "y: number expected";
                    if (message.width != null && message.hasOwnProperty("width"))
                        if (typeof message.width !== "number")
                            return "width: number expected";
                    if (message.height != null && message.hasOwnProperty("height"))
                        if (typeof message.height !== "number")
                            return "height: number expected";
                    return null;
                };

                /**
                 * Creates a Layout message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof com.opensource.svga.Layout
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {com.opensource.svga.Layout} Layout
                 */
                Layout.fromObject = function fromObject(object) {
                    if (object instanceof $root.com.opensource.svga.Layout)
                        return object;
                    var message = new $root.com.opensource.svga.Layout();
                    if (object.x != null)
                        message.x = Number(object.x);
                    if (object.y != null)
                        message.y = Number(object.y);
                    if (object.width != null)
                        message.width = Number(object.width);
                    if (object.height != null)
                        message.height = Number(object.height);
                    return message;
                };

                /**
                 * Creates a plain object from a Layout message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof com.opensource.svga.Layout
                 * @static
                 * @param {com.opensource.svga.Layout} message Layout
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Layout.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.x = 0;
                        object.y = 0;
                        object.width = 0;
                        object.height = 0;
                    }
                    if (message.x != null && message.hasOwnProperty("x"))
                        object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
                    if (message.y != null && message.hasOwnProperty("y"))
                        object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
                    if (message.width != null && message.hasOwnProperty("width"))
                        object.width = options.json && !isFinite(message.width) ? String(message.width) : message.width;
                    if (message.height != null && message.hasOwnProperty("height"))
                        object.height = options.json && !isFinite(message.height) ? String(message.height) : message.height;
                    return object;
                };

                /**
                 * Converts this Layout to JSON.
                 * @function toJSON
                 * @memberof com.opensource.svga.Layout
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Layout.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Layout;
            })();

            svga.Transform = (function() {

                /**
                 * Properties of a Transform.
                 * @memberof com.opensource.svga
                 * @interface ITransform
                 * @property {number|null} [a] Transform a
                 * @property {number|null} [b] Transform b
                 * @property {number|null} [c] Transform c
                 * @property {number|null} [d] Transform d
                 * @property {number|null} [tx] Transform tx
                 * @property {number|null} [ty] Transform ty
                 */

                /**
                 * Constructs a new Transform.
                 * @memberof com.opensource.svga
                 * @classdesc Represents a Transform.
                 * @constructor
                 * @param {com.opensource.svga.ITransform=} [properties] Properties to set
                 */
                function Transform(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Transform a.
                 * @member {number} a
                 * @memberof com.opensource.svga.Transform
                 * @instance
                 */
                Transform.prototype.a = 0;

                /**
                 * Transform b.
                 * @member {number} b
                 * @memberof com.opensource.svga.Transform
                 * @instance
                 */
                Transform.prototype.b = 0;

                /**
                 * Transform c.
                 * @member {number} c
                 * @memberof com.opensource.svga.Transform
                 * @instance
                 */
                Transform.prototype.c = 0;

                /**
                 * Transform d.
                 * @member {number} d
                 * @memberof com.opensource.svga.Transform
                 * @instance
                 */
                Transform.prototype.d = 0;

                /**
                 * Transform tx.
                 * @member {number} tx
                 * @memberof com.opensource.svga.Transform
                 * @instance
                 */
                Transform.prototype.tx = 0;

                /**
                 * Transform ty.
                 * @member {number} ty
                 * @memberof com.opensource.svga.Transform
                 * @instance
                 */
                Transform.prototype.ty = 0;

                /**
                 * Creates a new Transform instance using the specified properties.
                 * @function create
                 * @memberof com.opensource.svga.Transform
                 * @static
                 * @param {com.opensource.svga.ITransform=} [properties] Properties to set
                 * @returns {com.opensource.svga.Transform} Transform instance
                 */
                Transform.create = function create(properties) {
                    return new Transform(properties);
                };

                /**
                 * Encodes the specified Transform message. Does not implicitly {@link com.opensource.svga.Transform.verify|verify} messages.
                 * @function encode
                 * @memberof com.opensource.svga.Transform
                 * @static
                 * @param {com.opensource.svga.ITransform} message Transform message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Transform.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.a != null && message.hasOwnProperty("a"))
                        writer.uint32(/* id 1, wireType 5 =*/13).float(message.a);
                    if (message.b != null && message.hasOwnProperty("b"))
                        writer.uint32(/* id 2, wireType 5 =*/21).float(message.b);
                    if (message.c != null && message.hasOwnProperty("c"))
                        writer.uint32(/* id 3, wireType 5 =*/29).float(message.c);
                    if (message.d != null && message.hasOwnProperty("d"))
                        writer.uint32(/* id 4, wireType 5 =*/37).float(message.d);
                    if (message.tx != null && message.hasOwnProperty("tx"))
                        writer.uint32(/* id 5, wireType 5 =*/45).float(message.tx);
                    if (message.ty != null && message.hasOwnProperty("ty"))
                        writer.uint32(/* id 6, wireType 5 =*/53).float(message.ty);
                    return writer;
                };

                /**
                 * Encodes the specified Transform message, length delimited. Does not implicitly {@link com.opensource.svga.Transform.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof com.opensource.svga.Transform
                 * @static
                 * @param {com.opensource.svga.ITransform} message Transform message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Transform.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Transform message from the specified reader or buffer.
                 * @function decode
                 * @memberof com.opensource.svga.Transform
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {com.opensource.svga.Transform} Transform
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Transform.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.opensource.svga.Transform();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.a = reader.float();
                            break;
                        case 2:
                            message.b = reader.float();
                            break;
                        case 3:
                            message.c = reader.float();
                            break;
                        case 4:
                            message.d = reader.float();
                            break;
                        case 5:
                            message.tx = reader.float();
                            break;
                        case 6:
                            message.ty = reader.float();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Transform message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof com.opensource.svga.Transform
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {com.opensource.svga.Transform} Transform
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Transform.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Transform message.
                 * @function verify
                 * @memberof com.opensource.svga.Transform
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Transform.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.a != null && message.hasOwnProperty("a"))
                        if (typeof message.a !== "number")
                            return "a: number expected";
                    if (message.b != null && message.hasOwnProperty("b"))
                        if (typeof message.b !== "number")
                            return "b: number expected";
                    if (message.c != null && message.hasOwnProperty("c"))
                        if (typeof message.c !== "number")
                            return "c: number expected";
                    if (message.d != null && message.hasOwnProperty("d"))
                        if (typeof message.d !== "number")
                            return "d: number expected";
                    if (message.tx != null && message.hasOwnProperty("tx"))
                        if (typeof message.tx !== "number")
                            return "tx: number expected";
                    if (message.ty != null && message.hasOwnProperty("ty"))
                        if (typeof message.ty !== "number")
                            return "ty: number expected";
                    return null;
                };

                /**
                 * Creates a Transform message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof com.opensource.svga.Transform
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {com.opensource.svga.Transform} Transform
                 */
                Transform.fromObject = function fromObject(object) {
                    if (object instanceof $root.com.opensource.svga.Transform)
                        return object;
                    var message = new $root.com.opensource.svga.Transform();
                    if (object.a != null)
                        message.a = Number(object.a);
                    if (object.b != null)
                        message.b = Number(object.b);
                    if (object.c != null)
                        message.c = Number(object.c);
                    if (object.d != null)
                        message.d = Number(object.d);
                    if (object.tx != null)
                        message.tx = Number(object.tx);
                    if (object.ty != null)
                        message.ty = Number(object.ty);
                    return message;
                };

                /**
                 * Creates a plain object from a Transform message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof com.opensource.svga.Transform
                 * @static
                 * @param {com.opensource.svga.Transform} message Transform
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Transform.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.a = 0;
                        object.b = 0;
                        object.c = 0;
                        object.d = 0;
                        object.tx = 0;
                        object.ty = 0;
                    }
                    if (message.a != null && message.hasOwnProperty("a"))
                        object.a = options.json && !isFinite(message.a) ? String(message.a) : message.a;
                    if (message.b != null && message.hasOwnProperty("b"))
                        object.b = options.json && !isFinite(message.b) ? String(message.b) : message.b;
                    if (message.c != null && message.hasOwnProperty("c"))
                        object.c = options.json && !isFinite(message.c) ? String(message.c) : message.c;
                    if (message.d != null && message.hasOwnProperty("d"))
                        object.d = options.json && !isFinite(message.d) ? String(message.d) : message.d;
                    if (message.tx != null && message.hasOwnProperty("tx"))
                        object.tx = options.json && !isFinite(message.tx) ? String(message.tx) : message.tx;
                    if (message.ty != null && message.hasOwnProperty("ty"))
                        object.ty = options.json && !isFinite(message.ty) ? String(message.ty) : message.ty;
                    return object;
                };

                /**
                 * Converts this Transform to JSON.
                 * @function toJSON
                 * @memberof com.opensource.svga.Transform
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Transform.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Transform;
            })();

            svga.ShapeEntity = (function() {

                /**
                 * Properties of a ShapeEntity.
                 * @memberof com.opensource.svga
                 * @interface IShapeEntity
                 * @property {com.opensource.svga.ShapeEntity.ShapeType|null} [type] ShapeEntity type
                 * @property {com.opensource.svga.ShapeEntity.IShapeArgs|null} [shape] ShapeEntity shape
                 * @property {com.opensource.svga.ShapeEntity.IRectArgs|null} [rect] ShapeEntity rect
                 * @property {com.opensource.svga.ShapeEntity.IEllipseArgs|null} [ellipse] ShapeEntity ellipse
                 * @property {com.opensource.svga.ShapeEntity.IShapeStyle|null} [styles] ShapeEntity styles
                 * @property {com.opensource.svga.ITransform|null} [transform] ShapeEntity transform
                 */

                /**
                 * Constructs a new ShapeEntity.
                 * @memberof com.opensource.svga
                 * @classdesc Represents a ShapeEntity.
                 * @constructor
                 * @param {com.opensource.svga.IShapeEntity=} [properties] Properties to set
                 */
                function ShapeEntity(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ShapeEntity type.
                 * @member {com.opensource.svga.ShapeEntity.ShapeType} type
                 * @memberof com.opensource.svga.ShapeEntity
                 * @instance
                 */
                ShapeEntity.prototype.type = 0;

                /**
                 * ShapeEntity shape.
                 * @member {com.opensource.svga.ShapeEntity.IShapeArgs|null|undefined} shape
                 * @memberof com.opensource.svga.ShapeEntity
                 * @instance
                 */
                ShapeEntity.prototype.shape = null;

                /**
                 * ShapeEntity rect.
                 * @member {com.opensource.svga.ShapeEntity.IRectArgs|null|undefined} rect
                 * @memberof com.opensource.svga.ShapeEntity
                 * @instance
                 */
                ShapeEntity.prototype.rect = null;

                /**
                 * ShapeEntity ellipse.
                 * @member {com.opensource.svga.ShapeEntity.IEllipseArgs|null|undefined} ellipse
                 * @memberof com.opensource.svga.ShapeEntity
                 * @instance
                 */
                ShapeEntity.prototype.ellipse = null;

                /**
                 * ShapeEntity styles.
                 * @member {com.opensource.svga.ShapeEntity.IShapeStyle|null|undefined} styles
                 * @memberof com.opensource.svga.ShapeEntity
                 * @instance
                 */
                ShapeEntity.prototype.styles = null;

                /**
                 * ShapeEntity transform.
                 * @member {com.opensource.svga.ITransform|null|undefined} transform
                 * @memberof com.opensource.svga.ShapeEntity
                 * @instance
                 */
                ShapeEntity.prototype.transform = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * ShapeEntity args.
                 * @member {string|undefined} args
                 * @memberof com.opensource.svga.ShapeEntity
                 * @instance
                 */
                Object.defineProperty(ShapeEntity.prototype, "args", {
                    get: $util.oneOfGetter($oneOfFields = ["shape", "rect", "ellipse"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new ShapeEntity instance using the specified properties.
                 * @function create
                 * @memberof com.opensource.svga.ShapeEntity
                 * @static
                 * @param {com.opensource.svga.IShapeEntity=} [properties] Properties to set
                 * @returns {com.opensource.svga.ShapeEntity} ShapeEntity instance
                 */
                ShapeEntity.create = function create(properties) {
                    return new ShapeEntity(properties);
                };

                /**
                 * Encodes the specified ShapeEntity message. Does not implicitly {@link com.opensource.svga.ShapeEntity.verify|verify} messages.
                 * @function encode
                 * @memberof com.opensource.svga.ShapeEntity
                 * @static
                 * @param {com.opensource.svga.IShapeEntity} message ShapeEntity message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ShapeEntity.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.type != null && message.hasOwnProperty("type"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                    if (message.shape != null && message.hasOwnProperty("shape"))
                        $root.com.opensource.svga.ShapeEntity.ShapeArgs.encode(message.shape, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.rect != null && message.hasOwnProperty("rect"))
                        $root.com.opensource.svga.ShapeEntity.RectArgs.encode(message.rect, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.ellipse != null && message.hasOwnProperty("ellipse"))
                        $root.com.opensource.svga.ShapeEntity.EllipseArgs.encode(message.ellipse, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.styles != null && message.hasOwnProperty("styles"))
                        $root.com.opensource.svga.ShapeEntity.ShapeStyle.encode(message.styles, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                    if (message.transform != null && message.hasOwnProperty("transform"))
                        $root.com.opensource.svga.Transform.encode(message.transform, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ShapeEntity message, length delimited. Does not implicitly {@link com.opensource.svga.ShapeEntity.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof com.opensource.svga.ShapeEntity
                 * @static
                 * @param {com.opensource.svga.IShapeEntity} message ShapeEntity message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ShapeEntity.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ShapeEntity message from the specified reader or buffer.
                 * @function decode
                 * @memberof com.opensource.svga.ShapeEntity
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {com.opensource.svga.ShapeEntity} ShapeEntity
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ShapeEntity.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.opensource.svga.ShapeEntity();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.type = reader.int32();
                            break;
                        case 2:
                            message.shape = $root.com.opensource.svga.ShapeEntity.ShapeArgs.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.rect = $root.com.opensource.svga.ShapeEntity.RectArgs.decode(reader, reader.uint32());
                            break;
                        case 4:
                            message.ellipse = $root.com.opensource.svga.ShapeEntity.EllipseArgs.decode(reader, reader.uint32());
                            break;
                        case 10:
                            message.styles = $root.com.opensource.svga.ShapeEntity.ShapeStyle.decode(reader, reader.uint32());
                            break;
                        case 11:
                            message.transform = $root.com.opensource.svga.Transform.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ShapeEntity message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof com.opensource.svga.ShapeEntity
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {com.opensource.svga.ShapeEntity} ShapeEntity
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ShapeEntity.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ShapeEntity message.
                 * @function verify
                 * @memberof com.opensource.svga.ShapeEntity
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ShapeEntity.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                        }
                    if (message.shape != null && message.hasOwnProperty("shape")) {
                        properties.args = 1;
                        {
                            var error = $root.com.opensource.svga.ShapeEntity.ShapeArgs.verify(message.shape);
                            if (error)
                                return "shape." + error;
                        }
                    }
                    if (message.rect != null && message.hasOwnProperty("rect")) {
                        if (properties.args === 1)
                            return "args: multiple values";
                        properties.args = 1;
                        {
                            var error = $root.com.opensource.svga.ShapeEntity.RectArgs.verify(message.rect);
                            if (error)
                                return "rect." + error;
                        }
                    }
                    if (message.ellipse != null && message.hasOwnProperty("ellipse")) {
                        if (properties.args === 1)
                            return "args: multiple values";
                        properties.args = 1;
                        {
                            var error = $root.com.opensource.svga.ShapeEntity.EllipseArgs.verify(message.ellipse);
                            if (error)
                                return "ellipse." + error;
                        }
                    }
                    if (message.styles != null && message.hasOwnProperty("styles")) {
                        var error = $root.com.opensource.svga.ShapeEntity.ShapeStyle.verify(message.styles);
                        if (error)
                            return "styles." + error;
                    }
                    if (message.transform != null && message.hasOwnProperty("transform")) {
                        var error = $root.com.opensource.svga.Transform.verify(message.transform);
                        if (error)
                            return "transform." + error;
                    }
                    return null;
                };

                /**
                 * Creates a ShapeEntity message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof com.opensource.svga.ShapeEntity
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {com.opensource.svga.ShapeEntity} ShapeEntity
                 */
                ShapeEntity.fromObject = function fromObject(object) {
                    if (object instanceof $root.com.opensource.svga.ShapeEntity)
                        return object;
                    var message = new $root.com.opensource.svga.ShapeEntity();
                    switch (object.type) {
                    case "SHAPE":
                    case 0:
                        message.type = 0;
                        break;
                    case "RECT":
                    case 1:
                        message.type = 1;
                        break;
                    case "ELLIPSE":
                    case 2:
                        message.type = 2;
                        break;
                    case "KEEP":
                    case 3:
                        message.type = 3;
                        break;
                    }
                    if (object.shape != null) {
                        if (typeof object.shape !== "object")
                            throw TypeError(".com.opensource.svga.ShapeEntity.shape: object expected");
                        message.shape = $root.com.opensource.svga.ShapeEntity.ShapeArgs.fromObject(object.shape);
                    }
                    if (object.rect != null) {
                        if (typeof object.rect !== "object")
                            throw TypeError(".com.opensource.svga.ShapeEntity.rect: object expected");
                        message.rect = $root.com.opensource.svga.ShapeEntity.RectArgs.fromObject(object.rect);
                    }
                    if (object.ellipse != null) {
                        if (typeof object.ellipse !== "object")
                            throw TypeError(".com.opensource.svga.ShapeEntity.ellipse: object expected");
                        message.ellipse = $root.com.opensource.svga.ShapeEntity.EllipseArgs.fromObject(object.ellipse);
                    }
                    if (object.styles != null) {
                        if (typeof object.styles !== "object")
                            throw TypeError(".com.opensource.svga.ShapeEntity.styles: object expected");
                        message.styles = $root.com.opensource.svga.ShapeEntity.ShapeStyle.fromObject(object.styles);
                    }
                    if (object.transform != null) {
                        if (typeof object.transform !== "object")
                            throw TypeError(".com.opensource.svga.ShapeEntity.transform: object expected");
                        message.transform = $root.com.opensource.svga.Transform.fromObject(object.transform);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ShapeEntity message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof com.opensource.svga.ShapeEntity
                 * @static
                 * @param {com.opensource.svga.ShapeEntity} message ShapeEntity
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ShapeEntity.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.type = options.enums === String ? "SHAPE" : 0;
                        object.styles = null;
                        object.transform = null;
                    }
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.com.opensource.svga.ShapeEntity.ShapeType[message.type] : message.type;
                    if (message.shape != null && message.hasOwnProperty("shape")) {
                        object.shape = $root.com.opensource.svga.ShapeEntity.ShapeArgs.toObject(message.shape, options);
                        if (options.oneofs)
                            object.args = "shape";
                    }
                    if (message.rect != null && message.hasOwnProperty("rect")) {
                        object.rect = $root.com.opensource.svga.ShapeEntity.RectArgs.toObject(message.rect, options);
                        if (options.oneofs)
                            object.args = "rect";
                    }
                    if (message.ellipse != null && message.hasOwnProperty("ellipse")) {
                        object.ellipse = $root.com.opensource.svga.ShapeEntity.EllipseArgs.toObject(message.ellipse, options);
                        if (options.oneofs)
                            object.args = "ellipse";
                    }
                    if (message.styles != null && message.hasOwnProperty("styles"))
                        object.styles = $root.com.opensource.svga.ShapeEntity.ShapeStyle.toObject(message.styles, options);
                    if (message.transform != null && message.hasOwnProperty("transform"))
                        object.transform = $root.com.opensource.svga.Transform.toObject(message.transform, options);
                    return object;
                };

                /**
                 * Converts this ShapeEntity to JSON.
                 * @function toJSON
                 * @memberof com.opensource.svga.ShapeEntity
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ShapeEntity.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * ShapeType enum.
                 * @enum {string}
                 * @property {number} SHAPE=0 SHAPE value
                 * @property {number} RECT=1 RECT value
                 * @property {number} ELLIPSE=2 ELLIPSE value
                 * @property {number} KEEP=3 KEEP value
                 */
                ShapeEntity.ShapeType = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "SHAPE"] = 0;
                    values[valuesById[1] = "RECT"] = 1;
                    values[valuesById[2] = "ELLIPSE"] = 2;
                    values[valuesById[3] = "KEEP"] = 3;
                    return values;
                })();

                ShapeEntity.ShapeArgs = (function() {

                    /**
                     * Properties of a ShapeArgs.
                     * @memberof com.opensource.svga.ShapeEntity
                     * @interface IShapeArgs
                     * @property {string|null} [d] ShapeArgs d
                     */

                    /**
                     * Constructs a new ShapeArgs.
                     * @memberof com.opensource.svga.ShapeEntity
                     * @classdesc Represents a ShapeArgs.
                     * @constructor
                     * @param {com.opensource.svga.ShapeEntity.IShapeArgs=} [properties] Properties to set
                     */
                    function ShapeArgs(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ShapeArgs d.
                     * @member {string} d
                     * @memberof com.opensource.svga.ShapeEntity.ShapeArgs
                     * @instance
                     */
                    ShapeArgs.prototype.d = "";

                    /**
                     * Creates a new ShapeArgs instance using the specified properties.
                     * @function create
                     * @memberof com.opensource.svga.ShapeEntity.ShapeArgs
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.IShapeArgs=} [properties] Properties to set
                     * @returns {com.opensource.svga.ShapeEntity.ShapeArgs} ShapeArgs instance
                     */
                    ShapeArgs.create = function create(properties) {
                        return new ShapeArgs(properties);
                    };

                    /**
                     * Encodes the specified ShapeArgs message. Does not implicitly {@link com.opensource.svga.ShapeEntity.ShapeArgs.verify|verify} messages.
                     * @function encode
                     * @memberof com.opensource.svga.ShapeEntity.ShapeArgs
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.IShapeArgs} message ShapeArgs message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ShapeArgs.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.d != null && message.hasOwnProperty("d"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.d);
                        return writer;
                    };

                    /**
                     * Encodes the specified ShapeArgs message, length delimited. Does not implicitly {@link com.opensource.svga.ShapeEntity.ShapeArgs.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.opensource.svga.ShapeEntity.ShapeArgs
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.IShapeArgs} message ShapeArgs message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ShapeArgs.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a ShapeArgs message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.opensource.svga.ShapeEntity.ShapeArgs
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.opensource.svga.ShapeEntity.ShapeArgs} ShapeArgs
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ShapeArgs.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.opensource.svga.ShapeEntity.ShapeArgs();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.d = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a ShapeArgs message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.opensource.svga.ShapeEntity.ShapeArgs
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.opensource.svga.ShapeEntity.ShapeArgs} ShapeArgs
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ShapeArgs.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ShapeArgs message.
                     * @function verify
                     * @memberof com.opensource.svga.ShapeEntity.ShapeArgs
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ShapeArgs.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.d != null && message.hasOwnProperty("d"))
                            if (!$util.isString(message.d))
                                return "d: string expected";
                        return null;
                    };

                    /**
                     * Creates a ShapeArgs message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.opensource.svga.ShapeEntity.ShapeArgs
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.opensource.svga.ShapeEntity.ShapeArgs} ShapeArgs
                     */
                    ShapeArgs.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.opensource.svga.ShapeEntity.ShapeArgs)
                            return object;
                        var message = new $root.com.opensource.svga.ShapeEntity.ShapeArgs();
                        if (object.d != null)
                            message.d = String(object.d);
                        return message;
                    };

                    /**
                     * Creates a plain object from a ShapeArgs message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.opensource.svga.ShapeEntity.ShapeArgs
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.ShapeArgs} message ShapeArgs
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ShapeArgs.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.d = "";
                        if (message.d != null && message.hasOwnProperty("d"))
                            object.d = message.d;
                        return object;
                    };

                    /**
                     * Converts this ShapeArgs to JSON.
                     * @function toJSON
                     * @memberof com.opensource.svga.ShapeEntity.ShapeArgs
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ShapeArgs.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return ShapeArgs;
                })();

                ShapeEntity.RectArgs = (function() {

                    /**
                     * Properties of a RectArgs.
                     * @memberof com.opensource.svga.ShapeEntity
                     * @interface IRectArgs
                     * @property {number|null} [x] RectArgs x
                     * @property {number|null} [y] RectArgs y
                     * @property {number|null} [width] RectArgs width
                     * @property {number|null} [height] RectArgs height
                     * @property {number|null} [cornerRadius] RectArgs cornerRadius
                     */

                    /**
                     * Constructs a new RectArgs.
                     * @memberof com.opensource.svga.ShapeEntity
                     * @classdesc Represents a RectArgs.
                     * @constructor
                     * @param {com.opensource.svga.ShapeEntity.IRectArgs=} [properties] Properties to set
                     */
                    function RectArgs(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * RectArgs x.
                     * @member {number} x
                     * @memberof com.opensource.svga.ShapeEntity.RectArgs
                     * @instance
                     */
                    RectArgs.prototype.x = 0;

                    /**
                     * RectArgs y.
                     * @member {number} y
                     * @memberof com.opensource.svga.ShapeEntity.RectArgs
                     * @instance
                     */
                    RectArgs.prototype.y = 0;

                    /**
                     * RectArgs width.
                     * @member {number} width
                     * @memberof com.opensource.svga.ShapeEntity.RectArgs
                     * @instance
                     */
                    RectArgs.prototype.width = 0;

                    /**
                     * RectArgs height.
                     * @member {number} height
                     * @memberof com.opensource.svga.ShapeEntity.RectArgs
                     * @instance
                     */
                    RectArgs.prototype.height = 0;

                    /**
                     * RectArgs cornerRadius.
                     * @member {number} cornerRadius
                     * @memberof com.opensource.svga.ShapeEntity.RectArgs
                     * @instance
                     */
                    RectArgs.prototype.cornerRadius = 0;

                    /**
                     * Creates a new RectArgs instance using the specified properties.
                     * @function create
                     * @memberof com.opensource.svga.ShapeEntity.RectArgs
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.IRectArgs=} [properties] Properties to set
                     * @returns {com.opensource.svga.ShapeEntity.RectArgs} RectArgs instance
                     */
                    RectArgs.create = function create(properties) {
                        return new RectArgs(properties);
                    };

                    /**
                     * Encodes the specified RectArgs message. Does not implicitly {@link com.opensource.svga.ShapeEntity.RectArgs.verify|verify} messages.
                     * @function encode
                     * @memberof com.opensource.svga.ShapeEntity.RectArgs
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.IRectArgs} message RectArgs message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RectArgs.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.x != null && message.hasOwnProperty("x"))
                            writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
                        if (message.y != null && message.hasOwnProperty("y"))
                            writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
                        if (message.width != null && message.hasOwnProperty("width"))
                            writer.uint32(/* id 3, wireType 5 =*/29).float(message.width);
                        if (message.height != null && message.hasOwnProperty("height"))
                            writer.uint32(/* id 4, wireType 5 =*/37).float(message.height);
                        if (message.cornerRadius != null && message.hasOwnProperty("cornerRadius"))
                            writer.uint32(/* id 5, wireType 5 =*/45).float(message.cornerRadius);
                        return writer;
                    };

                    /**
                     * Encodes the specified RectArgs message, length delimited. Does not implicitly {@link com.opensource.svga.ShapeEntity.RectArgs.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.opensource.svga.ShapeEntity.RectArgs
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.IRectArgs} message RectArgs message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RectArgs.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a RectArgs message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.opensource.svga.ShapeEntity.RectArgs
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.opensource.svga.ShapeEntity.RectArgs} RectArgs
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RectArgs.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.opensource.svga.ShapeEntity.RectArgs();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.x = reader.float();
                                break;
                            case 2:
                                message.y = reader.float();
                                break;
                            case 3:
                                message.width = reader.float();
                                break;
                            case 4:
                                message.height = reader.float();
                                break;
                            case 5:
                                message.cornerRadius = reader.float();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a RectArgs message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.opensource.svga.ShapeEntity.RectArgs
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.opensource.svga.ShapeEntity.RectArgs} RectArgs
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RectArgs.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a RectArgs message.
                     * @function verify
                     * @memberof com.opensource.svga.ShapeEntity.RectArgs
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    RectArgs.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.x != null && message.hasOwnProperty("x"))
                            if (typeof message.x !== "number")
                                return "x: number expected";
                        if (message.y != null && message.hasOwnProperty("y"))
                            if (typeof message.y !== "number")
                                return "y: number expected";
                        if (message.width != null && message.hasOwnProperty("width"))
                            if (typeof message.width !== "number")
                                return "width: number expected";
                        if (message.height != null && message.hasOwnProperty("height"))
                            if (typeof message.height !== "number")
                                return "height: number expected";
                        if (message.cornerRadius != null && message.hasOwnProperty("cornerRadius"))
                            if (typeof message.cornerRadius !== "number")
                                return "cornerRadius: number expected";
                        return null;
                    };

                    /**
                     * Creates a RectArgs message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.opensource.svga.ShapeEntity.RectArgs
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.opensource.svga.ShapeEntity.RectArgs} RectArgs
                     */
                    RectArgs.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.opensource.svga.ShapeEntity.RectArgs)
                            return object;
                        var message = new $root.com.opensource.svga.ShapeEntity.RectArgs();
                        if (object.x != null)
                            message.x = Number(object.x);
                        if (object.y != null)
                            message.y = Number(object.y);
                        if (object.width != null)
                            message.width = Number(object.width);
                        if (object.height != null)
                            message.height = Number(object.height);
                        if (object.cornerRadius != null)
                            message.cornerRadius = Number(object.cornerRadius);
                        return message;
                    };

                    /**
                     * Creates a plain object from a RectArgs message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.opensource.svga.ShapeEntity.RectArgs
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.RectArgs} message RectArgs
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    RectArgs.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.x = 0;
                            object.y = 0;
                            object.width = 0;
                            object.height = 0;
                            object.cornerRadius = 0;
                        }
                        if (message.x != null && message.hasOwnProperty("x"))
                            object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
                        if (message.y != null && message.hasOwnProperty("y"))
                            object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
                        if (message.width != null && message.hasOwnProperty("width"))
                            object.width = options.json && !isFinite(message.width) ? String(message.width) : message.width;
                        if (message.height != null && message.hasOwnProperty("height"))
                            object.height = options.json && !isFinite(message.height) ? String(message.height) : message.height;
                        if (message.cornerRadius != null && message.hasOwnProperty("cornerRadius"))
                            object.cornerRadius = options.json && !isFinite(message.cornerRadius) ? String(message.cornerRadius) : message.cornerRadius;
                        return object;
                    };

                    /**
                     * Converts this RectArgs to JSON.
                     * @function toJSON
                     * @memberof com.opensource.svga.ShapeEntity.RectArgs
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    RectArgs.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return RectArgs;
                })();

                ShapeEntity.EllipseArgs = (function() {

                    /**
                     * Properties of an EllipseArgs.
                     * @memberof com.opensource.svga.ShapeEntity
                     * @interface IEllipseArgs
                     * @property {number|null} [x] EllipseArgs x
                     * @property {number|null} [y] EllipseArgs y
                     * @property {number|null} [radiusX] EllipseArgs radiusX
                     * @property {number|null} [radiusY] EllipseArgs radiusY
                     */

                    /**
                     * Constructs a new EllipseArgs.
                     * @memberof com.opensource.svga.ShapeEntity
                     * @classdesc Represents an EllipseArgs.
                     * @constructor
                     * @param {com.opensource.svga.ShapeEntity.IEllipseArgs=} [properties] Properties to set
                     */
                    function EllipseArgs(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * EllipseArgs x.
                     * @member {number} x
                     * @memberof com.opensource.svga.ShapeEntity.EllipseArgs
                     * @instance
                     */
                    EllipseArgs.prototype.x = 0;

                    /**
                     * EllipseArgs y.
                     * @member {number} y
                     * @memberof com.opensource.svga.ShapeEntity.EllipseArgs
                     * @instance
                     */
                    EllipseArgs.prototype.y = 0;

                    /**
                     * EllipseArgs radiusX.
                     * @member {number} radiusX
                     * @memberof com.opensource.svga.ShapeEntity.EllipseArgs
                     * @instance
                     */
                    EllipseArgs.prototype.radiusX = 0;

                    /**
                     * EllipseArgs radiusY.
                     * @member {number} radiusY
                     * @memberof com.opensource.svga.ShapeEntity.EllipseArgs
                     * @instance
                     */
                    EllipseArgs.prototype.radiusY = 0;

                    /**
                     * Creates a new EllipseArgs instance using the specified properties.
                     * @function create
                     * @memberof com.opensource.svga.ShapeEntity.EllipseArgs
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.IEllipseArgs=} [properties] Properties to set
                     * @returns {com.opensource.svga.ShapeEntity.EllipseArgs} EllipseArgs instance
                     */
                    EllipseArgs.create = function create(properties) {
                        return new EllipseArgs(properties);
                    };

                    /**
                     * Encodes the specified EllipseArgs message. Does not implicitly {@link com.opensource.svga.ShapeEntity.EllipseArgs.verify|verify} messages.
                     * @function encode
                     * @memberof com.opensource.svga.ShapeEntity.EllipseArgs
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.IEllipseArgs} message EllipseArgs message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    EllipseArgs.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.x != null && message.hasOwnProperty("x"))
                            writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
                        if (message.y != null && message.hasOwnProperty("y"))
                            writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
                        if (message.radiusX != null && message.hasOwnProperty("radiusX"))
                            writer.uint32(/* id 3, wireType 5 =*/29).float(message.radiusX);
                        if (message.radiusY != null && message.hasOwnProperty("radiusY"))
                            writer.uint32(/* id 4, wireType 5 =*/37).float(message.radiusY);
                        return writer;
                    };

                    /**
                     * Encodes the specified EllipseArgs message, length delimited. Does not implicitly {@link com.opensource.svga.ShapeEntity.EllipseArgs.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.opensource.svga.ShapeEntity.EllipseArgs
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.IEllipseArgs} message EllipseArgs message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    EllipseArgs.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an EllipseArgs message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.opensource.svga.ShapeEntity.EllipseArgs
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.opensource.svga.ShapeEntity.EllipseArgs} EllipseArgs
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    EllipseArgs.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.opensource.svga.ShapeEntity.EllipseArgs();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.x = reader.float();
                                break;
                            case 2:
                                message.y = reader.float();
                                break;
                            case 3:
                                message.radiusX = reader.float();
                                break;
                            case 4:
                                message.radiusY = reader.float();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an EllipseArgs message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.opensource.svga.ShapeEntity.EllipseArgs
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.opensource.svga.ShapeEntity.EllipseArgs} EllipseArgs
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    EllipseArgs.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an EllipseArgs message.
                     * @function verify
                     * @memberof com.opensource.svga.ShapeEntity.EllipseArgs
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    EllipseArgs.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.x != null && message.hasOwnProperty("x"))
                            if (typeof message.x !== "number")
                                return "x: number expected";
                        if (message.y != null && message.hasOwnProperty("y"))
                            if (typeof message.y !== "number")
                                return "y: number expected";
                        if (message.radiusX != null && message.hasOwnProperty("radiusX"))
                            if (typeof message.radiusX !== "number")
                                return "radiusX: number expected";
                        if (message.radiusY != null && message.hasOwnProperty("radiusY"))
                            if (typeof message.radiusY !== "number")
                                return "radiusY: number expected";
                        return null;
                    };

                    /**
                     * Creates an EllipseArgs message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.opensource.svga.ShapeEntity.EllipseArgs
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.opensource.svga.ShapeEntity.EllipseArgs} EllipseArgs
                     */
                    EllipseArgs.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.opensource.svga.ShapeEntity.EllipseArgs)
                            return object;
                        var message = new $root.com.opensource.svga.ShapeEntity.EllipseArgs();
                        if (object.x != null)
                            message.x = Number(object.x);
                        if (object.y != null)
                            message.y = Number(object.y);
                        if (object.radiusX != null)
                            message.radiusX = Number(object.radiusX);
                        if (object.radiusY != null)
                            message.radiusY = Number(object.radiusY);
                        return message;
                    };

                    /**
                     * Creates a plain object from an EllipseArgs message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.opensource.svga.ShapeEntity.EllipseArgs
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.EllipseArgs} message EllipseArgs
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    EllipseArgs.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.x = 0;
                            object.y = 0;
                            object.radiusX = 0;
                            object.radiusY = 0;
                        }
                        if (message.x != null && message.hasOwnProperty("x"))
                            object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
                        if (message.y != null && message.hasOwnProperty("y"))
                            object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
                        if (message.radiusX != null && message.hasOwnProperty("radiusX"))
                            object.radiusX = options.json && !isFinite(message.radiusX) ? String(message.radiusX) : message.radiusX;
                        if (message.radiusY != null && message.hasOwnProperty("radiusY"))
                            object.radiusY = options.json && !isFinite(message.radiusY) ? String(message.radiusY) : message.radiusY;
                        return object;
                    };

                    /**
                     * Converts this EllipseArgs to JSON.
                     * @function toJSON
                     * @memberof com.opensource.svga.ShapeEntity.EllipseArgs
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    EllipseArgs.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return EllipseArgs;
                })();

                ShapeEntity.ShapeStyle = (function() {

                    /**
                     * Properties of a ShapeStyle.
                     * @memberof com.opensource.svga.ShapeEntity
                     * @interface IShapeStyle
                     * @property {com.opensource.svga.ShapeEntity.ShapeStyle.IRGBAColor|null} [fill] ShapeStyle fill
                     * @property {com.opensource.svga.ShapeEntity.ShapeStyle.IRGBAColor|null} [stroke] ShapeStyle stroke
                     * @property {number|null} [strokeWidth] ShapeStyle strokeWidth
                     * @property {com.opensource.svga.ShapeEntity.ShapeStyle.LineCap|null} [lineCap] ShapeStyle lineCap
                     * @property {com.opensource.svga.ShapeEntity.ShapeStyle.LineJoin|null} [lineJoin] ShapeStyle lineJoin
                     * @property {number|null} [miterLimit] ShapeStyle miterLimit
                     * @property {number|null} [lineDashI] ShapeStyle lineDashI
                     * @property {number|null} [lineDashII] ShapeStyle lineDashII
                     * @property {number|null} [lineDashIII] ShapeStyle lineDashIII
                     */

                    /**
                     * Constructs a new ShapeStyle.
                     * @memberof com.opensource.svga.ShapeEntity
                     * @classdesc Represents a ShapeStyle.
                     * @constructor
                     * @param {com.opensource.svga.ShapeEntity.IShapeStyle=} [properties] Properties to set
                     */
                    function ShapeStyle(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ShapeStyle fill.
                     * @member {com.opensource.svga.ShapeEntity.ShapeStyle.IRGBAColor|null|undefined} fill
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @instance
                     */
                    ShapeStyle.prototype.fill = null;

                    /**
                     * ShapeStyle stroke.
                     * @member {com.opensource.svga.ShapeEntity.ShapeStyle.IRGBAColor|null|undefined} stroke
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @instance
                     */
                    ShapeStyle.prototype.stroke = null;

                    /**
                     * ShapeStyle strokeWidth.
                     * @member {number} strokeWidth
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @instance
                     */
                    ShapeStyle.prototype.strokeWidth = 0;

                    /**
                     * ShapeStyle lineCap.
                     * @member {com.opensource.svga.ShapeEntity.ShapeStyle.LineCap} lineCap
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @instance
                     */
                    ShapeStyle.prototype.lineCap = 0;

                    /**
                     * ShapeStyle lineJoin.
                     * @member {com.opensource.svga.ShapeEntity.ShapeStyle.LineJoin} lineJoin
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @instance
                     */
                    ShapeStyle.prototype.lineJoin = 0;

                    /**
                     * ShapeStyle miterLimit.
                     * @member {number} miterLimit
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @instance
                     */
                    ShapeStyle.prototype.miterLimit = 0;

                    /**
                     * ShapeStyle lineDashI.
                     * @member {number} lineDashI
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @instance
                     */
                    ShapeStyle.prototype.lineDashI = 0;

                    /**
                     * ShapeStyle lineDashII.
                     * @member {number} lineDashII
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @instance
                     */
                    ShapeStyle.prototype.lineDashII = 0;

                    /**
                     * ShapeStyle lineDashIII.
                     * @member {number} lineDashIII
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @instance
                     */
                    ShapeStyle.prototype.lineDashIII = 0;

                    /**
                     * Creates a new ShapeStyle instance using the specified properties.
                     * @function create
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.IShapeStyle=} [properties] Properties to set
                     * @returns {com.opensource.svga.ShapeEntity.ShapeStyle} ShapeStyle instance
                     */
                    ShapeStyle.create = function create(properties) {
                        return new ShapeStyle(properties);
                    };

                    /**
                     * Encodes the specified ShapeStyle message. Does not implicitly {@link com.opensource.svga.ShapeEntity.ShapeStyle.verify|verify} messages.
                     * @function encode
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.IShapeStyle} message ShapeStyle message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ShapeStyle.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.fill != null && message.hasOwnProperty("fill"))
                            $root.com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor.encode(message.fill, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.stroke != null && message.hasOwnProperty("stroke"))
                            $root.com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor.encode(message.stroke, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.strokeWidth != null && message.hasOwnProperty("strokeWidth"))
                            writer.uint32(/* id 3, wireType 5 =*/29).float(message.strokeWidth);
                        if (message.lineCap != null && message.hasOwnProperty("lineCap"))
                            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.lineCap);
                        if (message.lineJoin != null && message.hasOwnProperty("lineJoin"))
                            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.lineJoin);
                        if (message.miterLimit != null && message.hasOwnProperty("miterLimit"))
                            writer.uint32(/* id 6, wireType 5 =*/53).float(message.miterLimit);
                        if (message.lineDashI != null && message.hasOwnProperty("lineDashI"))
                            writer.uint32(/* id 7, wireType 5 =*/61).float(message.lineDashI);
                        if (message.lineDashII != null && message.hasOwnProperty("lineDashII"))
                            writer.uint32(/* id 8, wireType 5 =*/69).float(message.lineDashII);
                        if (message.lineDashIII != null && message.hasOwnProperty("lineDashIII"))
                            writer.uint32(/* id 9, wireType 5 =*/77).float(message.lineDashIII);
                        return writer;
                    };

                    /**
                     * Encodes the specified ShapeStyle message, length delimited. Does not implicitly {@link com.opensource.svga.ShapeEntity.ShapeStyle.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.IShapeStyle} message ShapeStyle message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ShapeStyle.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a ShapeStyle message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.opensource.svga.ShapeEntity.ShapeStyle} ShapeStyle
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ShapeStyle.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.opensource.svga.ShapeEntity.ShapeStyle();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.fill = $root.com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor.decode(reader, reader.uint32());
                                break;
                            case 2:
                                message.stroke = $root.com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor.decode(reader, reader.uint32());
                                break;
                            case 3:
                                message.strokeWidth = reader.float();
                                break;
                            case 4:
                                message.lineCap = reader.int32();
                                break;
                            case 5:
                                message.lineJoin = reader.int32();
                                break;
                            case 6:
                                message.miterLimit = reader.float();
                                break;
                            case 7:
                                message.lineDashI = reader.float();
                                break;
                            case 8:
                                message.lineDashII = reader.float();
                                break;
                            case 9:
                                message.lineDashIII = reader.float();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a ShapeStyle message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.opensource.svga.ShapeEntity.ShapeStyle} ShapeStyle
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ShapeStyle.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ShapeStyle message.
                     * @function verify
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ShapeStyle.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.fill != null && message.hasOwnProperty("fill")) {
                            var error = $root.com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor.verify(message.fill);
                            if (error)
                                return "fill." + error;
                        }
                        if (message.stroke != null && message.hasOwnProperty("stroke")) {
                            var error = $root.com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor.verify(message.stroke);
                            if (error)
                                return "stroke." + error;
                        }
                        if (message.strokeWidth != null && message.hasOwnProperty("strokeWidth"))
                            if (typeof message.strokeWidth !== "number")
                                return "strokeWidth: number expected";
                        if (message.lineCap != null && message.hasOwnProperty("lineCap"))
                            switch (message.lineCap) {
                            default:
                                return "lineCap: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                                break;
                            }
                        if (message.lineJoin != null && message.hasOwnProperty("lineJoin"))
                            switch (message.lineJoin) {
                            default:
                                return "lineJoin: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                                break;
                            }
                        if (message.miterLimit != null && message.hasOwnProperty("miterLimit"))
                            if (typeof message.miterLimit !== "number")
                                return "miterLimit: number expected";
                        if (message.lineDashI != null && message.hasOwnProperty("lineDashI"))
                            if (typeof message.lineDashI !== "number")
                                return "lineDashI: number expected";
                        if (message.lineDashII != null && message.hasOwnProperty("lineDashII"))
                            if (typeof message.lineDashII !== "number")
                                return "lineDashII: number expected";
                        if (message.lineDashIII != null && message.hasOwnProperty("lineDashIII"))
                            if (typeof message.lineDashIII !== "number")
                                return "lineDashIII: number expected";
                        return null;
                    };

                    /**
                     * Creates a ShapeStyle message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.opensource.svga.ShapeEntity.ShapeStyle} ShapeStyle
                     */
                    ShapeStyle.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.opensource.svga.ShapeEntity.ShapeStyle)
                            return object;
                        var message = new $root.com.opensource.svga.ShapeEntity.ShapeStyle();
                        if (object.fill != null) {
                            if (typeof object.fill !== "object")
                                throw TypeError(".com.opensource.svga.ShapeEntity.ShapeStyle.fill: object expected");
                            message.fill = $root.com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor.fromObject(object.fill);
                        }
                        if (object.stroke != null) {
                            if (typeof object.stroke !== "object")
                                throw TypeError(".com.opensource.svga.ShapeEntity.ShapeStyle.stroke: object expected");
                            message.stroke = $root.com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor.fromObject(object.stroke);
                        }
                        if (object.strokeWidth != null)
                            message.strokeWidth = Number(object.strokeWidth);
                        switch (object.lineCap) {
                        case "LineCap_BUTT":
                        case 0:
                            message.lineCap = 0;
                            break;
                        case "LineCap_ROUND":
                        case 1:
                            message.lineCap = 1;
                            break;
                        case "LineCap_SQUARE":
                        case 2:
                            message.lineCap = 2;
                            break;
                        }
                        switch (object.lineJoin) {
                        case "LineJoin_MITER":
                        case 0:
                            message.lineJoin = 0;
                            break;
                        case "LineJoin_ROUND":
                        case 1:
                            message.lineJoin = 1;
                            break;
                        case "LineJoin_BEVEL":
                        case 2:
                            message.lineJoin = 2;
                            break;
                        }
                        if (object.miterLimit != null)
                            message.miterLimit = Number(object.miterLimit);
                        if (object.lineDashI != null)
                            message.lineDashI = Number(object.lineDashI);
                        if (object.lineDashII != null)
                            message.lineDashII = Number(object.lineDashII);
                        if (object.lineDashIII != null)
                            message.lineDashIII = Number(object.lineDashIII);
                        return message;
                    };

                    /**
                     * Creates a plain object from a ShapeStyle message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @static
                     * @param {com.opensource.svga.ShapeEntity.ShapeStyle} message ShapeStyle
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ShapeStyle.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.fill = null;
                            object.stroke = null;
                            object.strokeWidth = 0;
                            object.lineCap = options.enums === String ? "LineCap_BUTT" : 0;
                            object.lineJoin = options.enums === String ? "LineJoin_MITER" : 0;
                            object.miterLimit = 0;
                            object.lineDashI = 0;
                            object.lineDashII = 0;
                            object.lineDashIII = 0;
                        }
                        if (message.fill != null && message.hasOwnProperty("fill"))
                            object.fill = $root.com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor.toObject(message.fill, options);
                        if (message.stroke != null && message.hasOwnProperty("stroke"))
                            object.stroke = $root.com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor.toObject(message.stroke, options);
                        if (message.strokeWidth != null && message.hasOwnProperty("strokeWidth"))
                            object.strokeWidth = options.json && !isFinite(message.strokeWidth) ? String(message.strokeWidth) : message.strokeWidth;
                        if (message.lineCap != null && message.hasOwnProperty("lineCap"))
                            object.lineCap = options.enums === String ? $root.com.opensource.svga.ShapeEntity.ShapeStyle.LineCap[message.lineCap] : message.lineCap;
                        if (message.lineJoin != null && message.hasOwnProperty("lineJoin"))
                            object.lineJoin = options.enums === String ? $root.com.opensource.svga.ShapeEntity.ShapeStyle.LineJoin[message.lineJoin] : message.lineJoin;
                        if (message.miterLimit != null && message.hasOwnProperty("miterLimit"))
                            object.miterLimit = options.json && !isFinite(message.miterLimit) ? String(message.miterLimit) : message.miterLimit;
                        if (message.lineDashI != null && message.hasOwnProperty("lineDashI"))
                            object.lineDashI = options.json && !isFinite(message.lineDashI) ? String(message.lineDashI) : message.lineDashI;
                        if (message.lineDashII != null && message.hasOwnProperty("lineDashII"))
                            object.lineDashII = options.json && !isFinite(message.lineDashII) ? String(message.lineDashII) : message.lineDashII;
                        if (message.lineDashIII != null && message.hasOwnProperty("lineDashIII"))
                            object.lineDashIII = options.json && !isFinite(message.lineDashIII) ? String(message.lineDashIII) : message.lineDashIII;
                        return object;
                    };

                    /**
                     * Converts this ShapeStyle to JSON.
                     * @function toJSON
                     * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ShapeStyle.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    ShapeStyle.RGBAColor = (function() {

                        /**
                         * Properties of a RGBAColor.
                         * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                         * @interface IRGBAColor
                         * @property {number|null} [r] RGBAColor r
                         * @property {number|null} [g] RGBAColor g
                         * @property {number|null} [b] RGBAColor b
                         * @property {number|null} [a] RGBAColor a
                         */

                        /**
                         * Constructs a new RGBAColor.
                         * @memberof com.opensource.svga.ShapeEntity.ShapeStyle
                         * @classdesc Represents a RGBAColor.
                         * @constructor
                         * @param {com.opensource.svga.ShapeEntity.ShapeStyle.IRGBAColor=} [properties] Properties to set
                         */
                        function RGBAColor(properties) {
                            if (properties)
                                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * RGBAColor r.
                         * @member {number} r
                         * @memberof com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor
                         * @instance
                         */
                        RGBAColor.prototype.r = 0;

                        /**
                         * RGBAColor g.
                         * @member {number} g
                         * @memberof com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor
                         * @instance
                         */
                        RGBAColor.prototype.g = 0;

                        /**
                         * RGBAColor b.
                         * @member {number} b
                         * @memberof com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor
                         * @instance
                         */
                        RGBAColor.prototype.b = 0;

                        /**
                         * RGBAColor a.
                         * @member {number} a
                         * @memberof com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor
                         * @instance
                         */
                        RGBAColor.prototype.a = 0;

                        /**
                         * Creates a new RGBAColor instance using the specified properties.
                         * @function create
                         * @memberof com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor
                         * @static
                         * @param {com.opensource.svga.ShapeEntity.ShapeStyle.IRGBAColor=} [properties] Properties to set
                         * @returns {com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor} RGBAColor instance
                         */
                        RGBAColor.create = function create(properties) {
                            return new RGBAColor(properties);
                        };

                        /**
                         * Encodes the specified RGBAColor message. Does not implicitly {@link com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor.verify|verify} messages.
                         * @function encode
                         * @memberof com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor
                         * @static
                         * @param {com.opensource.svga.ShapeEntity.ShapeStyle.IRGBAColor} message RGBAColor message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        RGBAColor.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.r != null && message.hasOwnProperty("r"))
                                writer.uint32(/* id 1, wireType 5 =*/13).float(message.r);
                            if (message.g != null && message.hasOwnProperty("g"))
                                writer.uint32(/* id 2, wireType 5 =*/21).float(message.g);
                            if (message.b != null && message.hasOwnProperty("b"))
                                writer.uint32(/* id 3, wireType 5 =*/29).float(message.b);
                            if (message.a != null && message.hasOwnProperty("a"))
                                writer.uint32(/* id 4, wireType 5 =*/37).float(message.a);
                            return writer;
                        };

                        /**
                         * Encodes the specified RGBAColor message, length delimited. Does not implicitly {@link com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor
                         * @static
                         * @param {com.opensource.svga.ShapeEntity.ShapeStyle.IRGBAColor} message RGBAColor message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        RGBAColor.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a RGBAColor message from the specified reader or buffer.
                         * @function decode
                         * @memberof com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor} RGBAColor
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        RGBAColor.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1:
                                    message.r = reader.float();
                                    break;
                                case 2:
                                    message.g = reader.float();
                                    break;
                                case 3:
                                    message.b = reader.float();
                                    break;
                                case 4:
                                    message.a = reader.float();
                                    break;
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a RGBAColor message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor} RGBAColor
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        RGBAColor.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a RGBAColor message.
                         * @function verify
                         * @memberof com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        RGBAColor.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.r != null && message.hasOwnProperty("r"))
                                if (typeof message.r !== "number")
                                    return "r: number expected";
                            if (message.g != null && message.hasOwnProperty("g"))
                                if (typeof message.g !== "number")
                                    return "g: number expected";
                            if (message.b != null && message.hasOwnProperty("b"))
                                if (typeof message.b !== "number")
                                    return "b: number expected";
                            if (message.a != null && message.hasOwnProperty("a"))
                                if (typeof message.a !== "number")
                                    return "a: number expected";
                            return null;
                        };

                        /**
                         * Creates a RGBAColor message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor} RGBAColor
                         */
                        RGBAColor.fromObject = function fromObject(object) {
                            if (object instanceof $root.com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor)
                                return object;
                            var message = new $root.com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor();
                            if (object.r != null)
                                message.r = Number(object.r);
                            if (object.g != null)
                                message.g = Number(object.g);
                            if (object.b != null)
                                message.b = Number(object.b);
                            if (object.a != null)
                                message.a = Number(object.a);
                            return message;
                        };

                        /**
                         * Creates a plain object from a RGBAColor message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor
                         * @static
                         * @param {com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor} message RGBAColor
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        RGBAColor.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            var object = {};
                            if (options.defaults) {
                                object.r = 0;
                                object.g = 0;
                                object.b = 0;
                                object.a = 0;
                            }
                            if (message.r != null && message.hasOwnProperty("r"))
                                object.r = options.json && !isFinite(message.r) ? String(message.r) : message.r;
                            if (message.g != null && message.hasOwnProperty("g"))
                                object.g = options.json && !isFinite(message.g) ? String(message.g) : message.g;
                            if (message.b != null && message.hasOwnProperty("b"))
                                object.b = options.json && !isFinite(message.b) ? String(message.b) : message.b;
                            if (message.a != null && message.hasOwnProperty("a"))
                                object.a = options.json && !isFinite(message.a) ? String(message.a) : message.a;
                            return object;
                        };

                        /**
                         * Converts this RGBAColor to JSON.
                         * @function toJSON
                         * @memberof com.opensource.svga.ShapeEntity.ShapeStyle.RGBAColor
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        RGBAColor.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        return RGBAColor;
                    })();

                    /**
                     * LineCap enum.
                     * @enum {string}
                     * @property {number} LineCap_BUTT=0 LineCap_BUTT value
                     * @property {number} LineCap_ROUND=1 LineCap_ROUND value
                     * @property {number} LineCap_SQUARE=2 LineCap_SQUARE value
                     */
                    ShapeStyle.LineCap = (function() {
                        var valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "LineCap_BUTT"] = 0;
                        values[valuesById[1] = "LineCap_ROUND"] = 1;
                        values[valuesById[2] = "LineCap_SQUARE"] = 2;
                        return values;
                    })();

                    /**
                     * LineJoin enum.
                     * @enum {string}
                     * @property {number} LineJoin_MITER=0 LineJoin_MITER value
                     * @property {number} LineJoin_ROUND=1 LineJoin_ROUND value
                     * @property {number} LineJoin_BEVEL=2 LineJoin_BEVEL value
                     */
                    ShapeStyle.LineJoin = (function() {
                        var valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "LineJoin_MITER"] = 0;
                        values[valuesById[1] = "LineJoin_ROUND"] = 1;
                        values[valuesById[2] = "LineJoin_BEVEL"] = 2;
                        return values;
                    })();

                    return ShapeStyle;
                })();

                return ShapeEntity;
            })();

            svga.FrameEntity = (function() {

                /**
                 * Properties of a FrameEntity.
                 * @memberof com.opensource.svga
                 * @interface IFrameEntity
                 * @property {number|null} [alpha] FrameEntity alpha
                 * @property {com.opensource.svga.ILayout|null} [layout] FrameEntity layout
                 * @property {com.opensource.svga.ITransform|null} [transform] FrameEntity transform
                 * @property {string|null} [clipPath] FrameEntity clipPath
                 * @property {Array.<com.opensource.svga.IShapeEntity>|null} [shapes] FrameEntity shapes
                 */

                /**
                 * Constructs a new FrameEntity.
                 * @memberof com.opensource.svga
                 * @classdesc Represents a FrameEntity.
                 * @constructor
                 * @param {com.opensource.svga.IFrameEntity=} [properties] Properties to set
                 */
                function FrameEntity(properties) {
                    this.shapes = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * FrameEntity alpha.
                 * @member {number} alpha
                 * @memberof com.opensource.svga.FrameEntity
                 * @instance
                 */
                FrameEntity.prototype.alpha = 0;

                /**
                 * FrameEntity layout.
                 * @member {com.opensource.svga.ILayout|null|undefined} layout
                 * @memberof com.opensource.svga.FrameEntity
                 * @instance
                 */
                FrameEntity.prototype.layout = null;

                /**
                 * FrameEntity transform.
                 * @member {com.opensource.svga.ITransform|null|undefined} transform
                 * @memberof com.opensource.svga.FrameEntity
                 * @instance
                 */
                FrameEntity.prototype.transform = null;

                /**
                 * FrameEntity clipPath.
                 * @member {string} clipPath
                 * @memberof com.opensource.svga.FrameEntity
                 * @instance
                 */
                FrameEntity.prototype.clipPath = "";

                /**
                 * FrameEntity shapes.
                 * @member {Array.<com.opensource.svga.IShapeEntity>} shapes
                 * @memberof com.opensource.svga.FrameEntity
                 * @instance
                 */
                FrameEntity.prototype.shapes = $util.emptyArray;

                /**
                 * Creates a new FrameEntity instance using the specified properties.
                 * @function create
                 * @memberof com.opensource.svga.FrameEntity
                 * @static
                 * @param {com.opensource.svga.IFrameEntity=} [properties] Properties to set
                 * @returns {com.opensource.svga.FrameEntity} FrameEntity instance
                 */
                FrameEntity.create = function create(properties) {
                    return new FrameEntity(properties);
                };

                /**
                 * Encodes the specified FrameEntity message. Does not implicitly {@link com.opensource.svga.FrameEntity.verify|verify} messages.
                 * @function encode
                 * @memberof com.opensource.svga.FrameEntity
                 * @static
                 * @param {com.opensource.svga.IFrameEntity} message FrameEntity message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FrameEntity.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.alpha != null && message.hasOwnProperty("alpha"))
                        writer.uint32(/* id 1, wireType 5 =*/13).float(message.alpha);
                    if (message.layout != null && message.hasOwnProperty("layout"))
                        $root.com.opensource.svga.Layout.encode(message.layout, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.transform != null && message.hasOwnProperty("transform"))
                        $root.com.opensource.svga.Transform.encode(message.transform, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.clipPath != null && message.hasOwnProperty("clipPath"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.clipPath);
                    if (message.shapes != null && message.shapes.length)
                        for (var i = 0; i < message.shapes.length; ++i)
                            $root.com.opensource.svga.ShapeEntity.encode(message.shapes[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified FrameEntity message, length delimited. Does not implicitly {@link com.opensource.svga.FrameEntity.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof com.opensource.svga.FrameEntity
                 * @static
                 * @param {com.opensource.svga.IFrameEntity} message FrameEntity message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FrameEntity.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a FrameEntity message from the specified reader or buffer.
                 * @function decode
                 * @memberof com.opensource.svga.FrameEntity
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {com.opensource.svga.FrameEntity} FrameEntity
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FrameEntity.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.opensource.svga.FrameEntity();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.alpha = reader.float();
                            break;
                        case 2:
                            message.layout = $root.com.opensource.svga.Layout.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.transform = $root.com.opensource.svga.Transform.decode(reader, reader.uint32());
                            break;
                        case 4:
                            message.clipPath = reader.string();
                            break;
                        case 5:
                            if (!(message.shapes && message.shapes.length))
                                message.shapes = [];
                            message.shapes.push($root.com.opensource.svga.ShapeEntity.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a FrameEntity message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof com.opensource.svga.FrameEntity
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {com.opensource.svga.FrameEntity} FrameEntity
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FrameEntity.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a FrameEntity message.
                 * @function verify
                 * @memberof com.opensource.svga.FrameEntity
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                FrameEntity.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.alpha != null && message.hasOwnProperty("alpha"))
                        if (typeof message.alpha !== "number")
                            return "alpha: number expected";
                    if (message.layout != null && message.hasOwnProperty("layout")) {
                        var error = $root.com.opensource.svga.Layout.verify(message.layout);
                        if (error)
                            return "layout." + error;
                    }
                    if (message.transform != null && message.hasOwnProperty("transform")) {
                        var error = $root.com.opensource.svga.Transform.verify(message.transform);
                        if (error)
                            return "transform." + error;
                    }
                    if (message.clipPath != null && message.hasOwnProperty("clipPath"))
                        if (!$util.isString(message.clipPath))
                            return "clipPath: string expected";
                    if (message.shapes != null && message.hasOwnProperty("shapes")) {
                        if (!Array.isArray(message.shapes))
                            return "shapes: array expected";
                        for (var i = 0; i < message.shapes.length; ++i) {
                            var error = $root.com.opensource.svga.ShapeEntity.verify(message.shapes[i]);
                            if (error)
                                return "shapes." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a FrameEntity message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof com.opensource.svga.FrameEntity
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {com.opensource.svga.FrameEntity} FrameEntity
                 */
                FrameEntity.fromObject = function fromObject(object) {
                    if (object instanceof $root.com.opensource.svga.FrameEntity)
                        return object;
                    var message = new $root.com.opensource.svga.FrameEntity();
                    if (object.alpha != null)
                        message.alpha = Number(object.alpha);
                    if (object.layout != null) {
                        if (typeof object.layout !== "object")
                            throw TypeError(".com.opensource.svga.FrameEntity.layout: object expected");
                        message.layout = $root.com.opensource.svga.Layout.fromObject(object.layout);
                    }
                    if (object.transform != null) {
                        if (typeof object.transform !== "object")
                            throw TypeError(".com.opensource.svga.FrameEntity.transform: object expected");
                        message.transform = $root.com.opensource.svga.Transform.fromObject(object.transform);
                    }
                    if (object.clipPath != null)
                        message.clipPath = String(object.clipPath);
                    if (object.shapes) {
                        if (!Array.isArray(object.shapes))
                            throw TypeError(".com.opensource.svga.FrameEntity.shapes: array expected");
                        message.shapes = [];
                        for (var i = 0; i < object.shapes.length; ++i) {
                            if (typeof object.shapes[i] !== "object")
                                throw TypeError(".com.opensource.svga.FrameEntity.shapes: object expected");
                            message.shapes[i] = $root.com.opensource.svga.ShapeEntity.fromObject(object.shapes[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a FrameEntity message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof com.opensource.svga.FrameEntity
                 * @static
                 * @param {com.opensource.svga.FrameEntity} message FrameEntity
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                FrameEntity.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.shapes = [];
                    if (options.defaults) {
                        object.alpha = 0;
                        object.layout = null;
                        object.transform = null;
                        object.clipPath = "";
                    }
                    if (message.alpha != null && message.hasOwnProperty("alpha"))
                        object.alpha = options.json && !isFinite(message.alpha) ? String(message.alpha) : message.alpha;
                    if (message.layout != null && message.hasOwnProperty("layout"))
                        object.layout = $root.com.opensource.svga.Layout.toObject(message.layout, options);
                    if (message.transform != null && message.hasOwnProperty("transform"))
                        object.transform = $root.com.opensource.svga.Transform.toObject(message.transform, options);
                    if (message.clipPath != null && message.hasOwnProperty("clipPath"))
                        object.clipPath = message.clipPath;
                    if (message.shapes && message.shapes.length) {
                        object.shapes = [];
                        for (var j = 0; j < message.shapes.length; ++j)
                            object.shapes[j] = $root.com.opensource.svga.ShapeEntity.toObject(message.shapes[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this FrameEntity to JSON.
                 * @function toJSON
                 * @memberof com.opensource.svga.FrameEntity
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                FrameEntity.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return FrameEntity;
            })();

            svga.MovieEntity = (function() {

                /**
                 * Properties of a MovieEntity.
                 * @memberof com.opensource.svga
                 * @interface IMovieEntity
                 * @property {string|null} [version] MovieEntity version
                 * @property {com.opensource.svga.IMovieParams|null} [params] MovieEntity params
                 * @property {Object.<string,Uint8Array>|null} [images] MovieEntity images
                 * @property {Array.<com.opensource.svga.ISpriteEntity>|null} [sprites] MovieEntity sprites
                 */

                /**
                 * Constructs a new MovieEntity.
                 * @memberof com.opensource.svga
                 * @classdesc Represents a MovieEntity.
                 * @constructor
                 * @param {com.opensource.svga.IMovieEntity=} [properties] Properties to set
                 */
                function MovieEntity(properties) {
                    this.images = {};
                    this.sprites = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * MovieEntity version.
                 * @member {string} version
                 * @memberof com.opensource.svga.MovieEntity
                 * @instance
                 */
                MovieEntity.prototype.version = "";

                /**
                 * MovieEntity params.
                 * @member {com.opensource.svga.IMovieParams|null|undefined} params
                 * @memberof com.opensource.svga.MovieEntity
                 * @instance
                 */
                MovieEntity.prototype.params = null;

                /**
                 * MovieEntity images.
                 * @member {Object.<string,Uint8Array>} images
                 * @memberof com.opensource.svga.MovieEntity
                 * @instance
                 */
                MovieEntity.prototype.images = $util.emptyObject;

                /**
                 * MovieEntity sprites.
                 * @member {Array.<com.opensource.svga.ISpriteEntity>} sprites
                 * @memberof com.opensource.svga.MovieEntity
                 * @instance
                 */
                MovieEntity.prototype.sprites = $util.emptyArray;

                /**
                 * Creates a new MovieEntity instance using the specified properties.
                 * @function create
                 * @memberof com.opensource.svga.MovieEntity
                 * @static
                 * @param {com.opensource.svga.IMovieEntity=} [properties] Properties to set
                 * @returns {com.opensource.svga.MovieEntity} MovieEntity instance
                 */
                MovieEntity.create = function create(properties) {
                    return new MovieEntity(properties);
                };

                /**
                 * Encodes the specified MovieEntity message. Does not implicitly {@link com.opensource.svga.MovieEntity.verify|verify} messages.
                 * @function encode
                 * @memberof com.opensource.svga.MovieEntity
                 * @static
                 * @param {com.opensource.svga.IMovieEntity} message MovieEntity message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MovieEntity.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.version != null && message.hasOwnProperty("version"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
                    if (message.params != null && message.hasOwnProperty("params"))
                        $root.com.opensource.svga.MovieParams.encode(message.params, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.images != null && message.hasOwnProperty("images"))
                        for (var keys = Object.keys(message.images), i = 0; i < keys.length; ++i)
                            writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).bytes(message.images[keys[i]]).ldelim();
                    if (message.sprites != null && message.sprites.length)
                        for (var i = 0; i < message.sprites.length; ++i)
                            $root.com.opensource.svga.SpriteEntity.encode(message.sprites[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified MovieEntity message, length delimited. Does not implicitly {@link com.opensource.svga.MovieEntity.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof com.opensource.svga.MovieEntity
                 * @static
                 * @param {com.opensource.svga.IMovieEntity} message MovieEntity message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MovieEntity.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a MovieEntity message from the specified reader or buffer.
                 * @function decode
                 * @memberof com.opensource.svga.MovieEntity
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {com.opensource.svga.MovieEntity} MovieEntity
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MovieEntity.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.opensource.svga.MovieEntity(), key;
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.version = reader.string();
                            break;
                        case 2:
                            message.params = $root.com.opensource.svga.MovieParams.decode(reader, reader.uint32());
                            break;
                        case 3:
                            reader.skip().pos++;
                            if (message.images === $util.emptyObject)
                                message.images = {};
                            key = reader.string();
                            reader.pos++;
                            message.images[key] = reader.bytes();
                            break;
                        case 4:
                            if (!(message.sprites && message.sprites.length))
                                message.sprites = [];
                            message.sprites.push($root.com.opensource.svga.SpriteEntity.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a MovieEntity message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof com.opensource.svga.MovieEntity
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {com.opensource.svga.MovieEntity} MovieEntity
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MovieEntity.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a MovieEntity message.
                 * @function verify
                 * @memberof com.opensource.svga.MovieEntity
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                MovieEntity.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.version != null && message.hasOwnProperty("version"))
                        if (!$util.isString(message.version))
                            return "version: string expected";
                    if (message.params != null && message.hasOwnProperty("params")) {
                        var error = $root.com.opensource.svga.MovieParams.verify(message.params);
                        if (error)
                            return "params." + error;
                    }
                    if (message.images != null && message.hasOwnProperty("images")) {
                        if (!$util.isObject(message.images))
                            return "images: object expected";
                        var key = Object.keys(message.images);
                        for (var i = 0; i < key.length; ++i)
                            if (!(message.images[key[i]] && typeof message.images[key[i]].length === "number" || $util.isString(message.images[key[i]])))
                                return "images: buffer{k:string} expected";
                    }
                    if (message.sprites != null && message.hasOwnProperty("sprites")) {
                        if (!Array.isArray(message.sprites))
                            return "sprites: array expected";
                        for (var i = 0; i < message.sprites.length; ++i) {
                            var error = $root.com.opensource.svga.SpriteEntity.verify(message.sprites[i]);
                            if (error)
                                return "sprites." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a MovieEntity message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof com.opensource.svga.MovieEntity
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {com.opensource.svga.MovieEntity} MovieEntity
                 */
                MovieEntity.fromObject = function fromObject(object) {
                    if (object instanceof $root.com.opensource.svga.MovieEntity)
                        return object;
                    var message = new $root.com.opensource.svga.MovieEntity();
                    if (object.version != null)
                        message.version = String(object.version);
                    if (object.params != null) {
                        if (typeof object.params !== "object")
                            throw TypeError(".com.opensource.svga.MovieEntity.params: object expected");
                        message.params = $root.com.opensource.svga.MovieParams.fromObject(object.params);
                    }
                    if (object.images) {
                        if (typeof object.images !== "object")
                            throw TypeError(".com.opensource.svga.MovieEntity.images: object expected");
                        message.images = {};
                        for (var keys = Object.keys(object.images), i = 0; i < keys.length; ++i)
                            if (typeof object.images[keys[i]] === "string")
                                $util.base64.decode(object.images[keys[i]], message.images[keys[i]] = $util.newBuffer($util.base64.length(object.images[keys[i]])), 0);
                            else if (object.images[keys[i]].length)
                                message.images[keys[i]] = object.images[keys[i]];
                    }
                    if (object.sprites) {
                        if (!Array.isArray(object.sprites))
                            throw TypeError(".com.opensource.svga.MovieEntity.sprites: array expected");
                        message.sprites = [];
                        for (var i = 0; i < object.sprites.length; ++i) {
                            if (typeof object.sprites[i] !== "object")
                                throw TypeError(".com.opensource.svga.MovieEntity.sprites: object expected");
                            message.sprites[i] = $root.com.opensource.svga.SpriteEntity.fromObject(object.sprites[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a MovieEntity message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof com.opensource.svga.MovieEntity
                 * @static
                 * @param {com.opensource.svga.MovieEntity} message MovieEntity
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                MovieEntity.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.sprites = [];
                    if (options.objects || options.defaults)
                        object.images = {};
                    if (options.defaults) {
                        object.version = "";
                        object.params = null;
                    }
                    if (message.version != null && message.hasOwnProperty("version"))
                        object.version = message.version;
                    if (message.params != null && message.hasOwnProperty("params"))
                        object.params = $root.com.opensource.svga.MovieParams.toObject(message.params, options);
                    var keys2;
                    if (message.images && (keys2 = Object.keys(message.images)).length) {
                        object.images = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.images[keys2[j]] = options.bytes === String ? $util.base64.encode(message.images[keys2[j]], 0, message.images[keys2[j]].length) : options.bytes === Array ? Array.prototype.slice.call(message.images[keys2[j]]) : message.images[keys2[j]];
                    }
                    if (message.sprites && message.sprites.length) {
                        object.sprites = [];
                        for (var j = 0; j < message.sprites.length; ++j)
                            object.sprites[j] = $root.com.opensource.svga.SpriteEntity.toObject(message.sprites[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this MovieEntity to JSON.
                 * @function toJSON
                 * @memberof com.opensource.svga.MovieEntity
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                MovieEntity.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return MovieEntity;
            })();

            return svga;
        })();

        return opensource;
    })();

    return com;
})();

module.exports = $root;
