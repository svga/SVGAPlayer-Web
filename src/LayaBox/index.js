import {Parser as MParser} from '../parser'
import {Player as MPlayer} from './player'
import {IE9Parser} from "../pollify/IE9Parser";

export class Parser extends MParser {
}

export class Player extends MPlayer {
}

((global) => {
    var define = {};
    if (global.Svga !== undefined || global.SVGA !== undefined) {
        define = global.SVGA;
        global.Svga = define;
    }
    else {
        global.Svga = global.SVGA = define;
    }
    define.layabox = {
        Parser,
        Player,
        IE9Parser
    }
    define.LayaboxPlayer = Player;
})(
    (typeof this === "object" && this) ||
    (typeof window === "object" && window) ||
    {});
