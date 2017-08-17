import SVGA from './export/svga.js';

let player = new SVGA.Player('#canvas');
player.setImage(`${ window.location.origin }/assets/avatar.png`, "99");
player.setText({ text: '崔小姐不吃鱼 送了帝王套', size: "24px", color: "#ffe0a4" }, "banner");
let worker = `assets/svga-worker.min.js`;
let parser = new SVGA.Parser(worker)
parser.load(worker === undefined ? `assets/angel.svga` : `angel.svga`, (videoItem) => {
    player.setVideoItem(videoItem);
    player.startAnimation();
}, (err) => {
    console.error(err);
});

// SVGA.autoload();