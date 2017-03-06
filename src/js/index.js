import SVGA from './export/svga.js';

// let player = new SVGA.Player('#canvas');
// // player.setImage(`${ window.location.origin }/assets/avatar.png`, "99");
// player.setText({text: '崔小姐不吃鱼 送了帝王套', size: "18px", color: "#ffe0a4"}, "FL_11_png");
// let parser = new SVGA.Parser(`/dist/assets/svga-worker.min.js`, SVGA.DB)
// parser.load(`/dist/assets/angel.svga`, (videoItem) => {
// 	player.setVideoItem(videoItem);
// 	player.startAnimation();
// });

SVGA.autoload();