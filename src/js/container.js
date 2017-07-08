import SVGA from './export/svga.js';

var stage;

function init() {
    stage = new createjs.Stage("canvas");
    var circle = new createjs.Shape();
    circle.graphics.beginFill("gray").drawCircle(0, 0, 100);
    circle.x = 250;
    circle.y = 250;
    stage.addChild(circle);
    stage.update();
    addAnimation();
}

function addAnimation() {
    let player = new SVGA.Player();
    let parser = new SVGA.Parser(undefined, SVGA.DB)
    parser.load(`assets/angel.svga`, (videoItem) => {
        player.setVideoItem(videoItem);
        var container = player.container(stage);
        container.x = 150;
        container.y = 150;
        container.width = 200;
        container.height = 200;
        stage.addChild(container);
        stage.update();
        player.startAnimation();
    });
}

window.init = init;