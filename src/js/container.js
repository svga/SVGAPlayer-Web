import SVGA from './export/svga.js';

var events = [];
let runloop = () => {
    requestAnimationFrame(() => {
        events.forEach(event => event());
        runloop();
    });
}

function init() {
    runloop();
    addClear();
    addRect();
    addAnimation();
}

function addClear() {
    events.push(() => {
        let ctx = document.querySelector('#canvas').getContext('2d');
        ctx.clearRect(0, 0, 500, 500);
    })
}

function addRect() {
    events.push(() => {
        let ctx = document.querySelector('#canvas').getContext('2d');
        ctx.fillStyle = "gray";
        ctx.fillRect(150, 150, 200, 200);
    });
}

function addAnimation() {
    let player = new SVGA.Player();
    let parser = new SVGA.Parser(undefined, SVGA.DB)
    parser.load(`assets/angel.svga`, (videoItem) => {
        player.setVideoItem(videoItem);
        player.startAnimation();
        events.push(() => {
            player.drawOnCanvas(document.querySelector('#canvas'), 125, 125, 250, 250);
        })
    });
}

window.init = init;