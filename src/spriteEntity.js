import { FrameEntity } from './frameEntity'
import { BezierPath } from './bezierPath'
import { RectPath } from './rectPath'
import { EllipsePath } from './ellipsePath'

export class SpriteEntity {

    /**
     * string
     */
    imageKey = null

    /**
     * FrameEntity[]
     */
    frames = []

    constructor(spec) {
        this.imageKey = spec.imageKey;
        if (spec.frames) {
            this.frames = spec.frames.map((obj) => {
                return new FrameEntity(obj)
            })
        }
    }

}