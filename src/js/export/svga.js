'use strict';

/**
 * @file  : svga
 * @author: lijialiang
 * @team  : UED中心
 * @export: umd
 * @export file: svga
 * @export name: Svga
 */

import SVGAParser from './modules/svga-parser'
import SVGAPlayer from './modules/svga-player'
import SVGADB from './modules/svga-db'

let sharedParser = new SVGAParser();

let autoLoader = (element, customParser) => {
    let parser = customParser || sharedParser;
    if (element) {
        if ((element.tagName === "CANVAS" || element.tagName === "DIV") && element.attributes.src && element.attributes.src.value.indexOf(".svga") === element.attributes.src.value.length - 5) {
            let src = element.attributes.src.value;
            let player = new SVGAPlayer(element);
            parser.load(src, (videoItem) => {
                if (element.attributes.loops) {
                    let loops = parseFloat(element.attributes.loops.value) || 0;
                    player.loops = loops;
                }
                if (element.attributes.clearsAfterStop) {
                    let clearsAfterStop = !(element.attributes.clearsAfterStop.value === "false")
                    player.clearsAfterStop = clearsAfterStop;
                }
                player.setVideoItem(videoItem);
                player.startAnimation();
            });
            element.player = player;
        }
    }
    else {
        var elements = document.querySelectorAll('[src$=".svga"]');
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