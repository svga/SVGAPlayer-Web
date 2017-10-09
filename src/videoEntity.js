import { SpriteEntity } from './spriteEntity'
const { ProtoMovieEntity } = require("./proto")

export class VideoEntity {

    /**
     * 影片尺寸
     */
    videoSize = {
        width: 0.0,
        height: 0.0,
    };

    /**
     * 帧率
     */
    FPS = 20;

    /**
     * 帧数
     */
    frames = 0;

    /**
     * Bitmaps
     */
    images = {};

    /**
     * SpriteEntity[]
     */
    sprites = []

    constructor(spec, images) {
        if (typeof spec === "object" && spec.$type == ProtoMovieEntity) {
            if (typeof spec.params === "object") {
                this.videoSize.width = spec.params.viewBoxWidth || 0.0;
                this.videoSize.height = spec.params.viewBoxHeight || 0.0;
                this.FPS = spec.params.fps || 20;
                this.frames = spec.params.frames || 0;
            }
            this.resetSprites(spec)
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
            this.resetSprites(spec)
        }
        if (images) {
            this.images = images
        }
    }

    resetSprites(spec) {
        if (spec.sprites instanceof Array) {
            this.sprites = spec.sprites.map((obj) => {
                return new SpriteEntity(obj)
            })
        }
    }

}