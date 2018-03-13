import { Parser } from '../parser'
import { Player } from './player'
import { AutoLoader } from './autoLoader'

module.exports = {
    Parser,
    Player,
    autoload: AutoLoader.autoload,
}

AutoLoader.autoload();