import SVGADB from './export/svga-db.js';
import SVGAPlayer from './export/svga-player';
import SVGAParser from './export/svga-parser';
// import Svga from './export/svga-not-worker';

let player = new SVGAPlayer('#canvas');
// player.setImage(`${ window.location.origin }/assets/avatar.png`, "99");
player.setText('崔小姐不吃鱼 送了帝王套', "18px", "Arial", "#ffe0a4", {x: 0.0, y: -3.0}, "FL_11_png");
let parser = new SVGAParser(`${ window.location.origin }/assets/svga-worker.min.js`, SVGADB)
parser.load(`${ window.location.origin }/assets/halloween.svga`, (videoItem) => {
	player.setVideoItem(videoItem);
	player.startAnimation();
});