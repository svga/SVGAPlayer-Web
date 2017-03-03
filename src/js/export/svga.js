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

let sharedParser = new SVGAParser();

let autoLoader = (element, customParser) => {
    let parser = customParser || sharedParser;
    if (element) {
        if (element.tagName === "CANVAS" && element.attributes.src && element.attributes.src.value.endsWith(".svga")) {
            let src = element.attributes.src.value;
            parser.load(src, (videoItem) => {
                let player = new SVGAPlayer(element);
                player.setVideoItem(videoItem);
                player.startAnimation();
            });
        }
    }
    else {
        var elements = document.getElementsByTagName("canvas");
        for (var index = 0; index < elements.length; index++) {
            var element = elements[index];
            autoLoader(element);
        }
    }
}

module.exports = {
    Parser: SVGAParser,
    Player: SVGAPlayer,
    DB: SVGADB,
    autoload: autoLoader,
}