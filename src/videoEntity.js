import { SpriteEntity } from './spriteEntity'
const Proto = require("./svga.pb")

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
        if (spec instanceof Proto.MovieEntity) {
            if (spec.hasParams()) {
                this.videoSize.width = spec.getParams().getViewboxwidth() || 0.0;
                this.videoSize.height = spec.getParams().getViewboxheight() || 0.0;
                this.FPS = spec.getParams().getFps() || 20;
                this.frames = spec.getParams().getFrames() || 0;
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
        if (spec instanceof Proto.MovieEntity) {
            this.sprites = spec.getSpritesList().map((obj) => {
                return new SpriteEntity(obj)
            })
        }
        else if (spec) {
            if (spec.sprites) {
                this.sprites = spec.sprites.map((obj) => {
                    return new SpriteEntity(obj)
                })
            }
        }
    }

}