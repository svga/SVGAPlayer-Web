import { Parser } from '../parser'
import { Player } from './player'

export class AutoLoader {

    static sharedParser = new Parser();

    static autoload = (element, customParser) => {
        if (typeof window === "undefined" || typeof document === "undefined") {
            return;
        }
        let parser = customParser || AutoLoader.sharedParser;
        if (element) {
            if ((element.tagName === "CANVAS" || element.tagName === "DIV") && element.attributes.src && element.attributes.src.value.indexOf(".svga") === element.attributes.src.value.length - 5) {
                let src = element.attributes.src.value;
                let player = new Player(element);
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
                AutoLoader.autoload(element);
            }
        }
    }

}