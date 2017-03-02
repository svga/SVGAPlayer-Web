
import SVGAVideoSpriteEntity from './svga-videoSpriteEntity'

module.exports = class SVGAVideoEntity {
    
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
     * SVGAVideoSpriteEntity[]
     */
    sprites = []

    constructor(spec, images) {
        if (spec) {
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
        if (spec) {
            if (spec.sprites) {
                this.sprites = spec.sprites.map((obj) => {
                    return new SVGAVideoSpriteEntity(obj)
                })
            }
        }
    }

}