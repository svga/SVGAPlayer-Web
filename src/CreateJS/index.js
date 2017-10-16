import { Parser as MParser } from '../parser'
import { Player as MPlayer } from './player'
import { AutoLoader } from './autoLoader'

export class Parser extends MParser { }
export class Player extends MPlayer { }

((global) => {
    var define = {};
    if (global.Svga !== undefined || global.SVGA !== undefined) {
        define = global.SVGA;
        global.Svga = define;
    }
    else {
        global.Svga = global.SVGA = define;
    }
    define.createjs = {
        Parser,
        Player,
        autoload: AutoLoader.autoload,
    }
    define.createjsPlayer = Player;
    AutoLoader.autoload();
})(
    (typeof this === "object" && this) ||
    (typeof window === "object" && window) ||
    {});
