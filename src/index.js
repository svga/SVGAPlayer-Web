import { Parser } from './parser'
import { Player } from './player'
import { AutoLoader } from './autoLoader'

((global) => {
    global.Svga = global.SVGA = {
        Parser,
        Player,
        autoload: AutoLoader.autoload,
    }
    AutoLoader.autoload();
})(
    (typeof this === "object" && this) ||
    (typeof window === "object" && window) ||
    {});

module.exports = {
    Parser,
    Player,
}
