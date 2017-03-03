'use strict';

/**
 * @file  : svga
 * @author: lijialiang
 * @team  : UED中心
 * @export: umd
 */

import SVGAParser from './modules/svga-parser'
import SVGAPlayer from './modules/svga-player'
import SVGADB from './modules/svga-db'

module.exports = {
    Parser: SVGAParser,
    Player: SVGAPlayer,
    DB: SVGADB,
}