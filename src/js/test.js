require('./export/modules/easeljs.min');

var stage = new createjs.Stage("canvas");
var myShape = new createjs.Shape();

myShape.graphics.append(new createjs.Graphics.Circle(50, 50, 30));

myShape.graphics.append({exec:function(ctx, shape) {
    ctx.fillStyle = shape.color;
    ctx.fill();
}});

stage.addChild(myShape);
stage.update();