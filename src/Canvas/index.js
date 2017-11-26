import {Parser as MParser} from '../parser'
import {Player as MPlayer} from './player'
import {IE9Parser} from "../pollify/IE9Parser";
import {AutoLoader} from './autoLoader'

export class Parser extends MParser {
}

export class Player extends MPlayer {
}

((global) => {
    global.Svga = global.SVGA = {
        Parser,
        Player,
        IE9Parser,
        autoload: AutoLoader.autoload,
    };
    AutoLoader.autoload();
})(
    (typeof this === "object" && this) ||
    (typeof window === "object" && window) ||
    {});
