import { Parser as MParser } from '../parser'
import { Player as MPlayer } from './player'

export class Parser extends MParser { }
export class Player extends MPlayer { }

((global) => {
    global.Svga = global.SVGA = {
        Parser,
        Player,
    }
})(
    (typeof this === "object" && this) ||
    (typeof window === "object" && window) ||
    {});
