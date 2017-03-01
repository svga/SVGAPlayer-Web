require('./export/modules/easeljs.min');

var stage = new createjs.Stage("canvas");
var circle = new createjs.Shape();
circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
circle.x = 100;
circle.y = 100;
circle.transformMatrix = new createjs.Matrix2D(2.0, 0.0, 0.0, 2.0, 0.0, 0.0);
stage.addChild(circle);
stage.update();