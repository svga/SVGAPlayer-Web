/**
 * @file  : 基类 动画类 依赖 easeljs
 * @author: lijialiang
 */

require('./easeljs.min');

module.exports = class Animation {

	validMethods = {
        'M': 1,
        'm': 1,
        'L': 1,
        'l': 1,
        'H': 1,
        'h': 1,
        'V': 1,
        'v': 1,
        'C': 1,
        'c': 1,
        'S': 1,
        's': 1,
        'Q': 1,
        'q': 1,
        'R': 1,
        'r': 1,
        'Z': 1,
        'z': 1,
    };

	ticker;

	movie;
    sprites;
	images = {};
	stage;
	optionsInAnimation = {
        playCount: 0,
		loop     : false,
    };

	currentFrameNum = 0;
    alreadyPlayCount = 0;

	constructor (args) {
		for(let item in this.optionsInAnimation){
		    if(typeof args[item] !== 'undefined'){
				this.optionsInAnimation[item] = args[item];
			}
		}
    }

	// TODO: 初始化 动画必要元素
	_init ({ canvas, movie, sprites,  images}) {

		this.stage = new createjs.Stage(canvas.getAttribute('id'));

		this.movie   = movie;
		this.sprites = sprites;

		for(let item in images){
            this.images[item] = btoa(String.fromCharCode.apply(null, images[item]));
        }
	}

	// TODO: 播放动画
	_play() {

		// 重新播
		if(this.stage.children.length === 0){
			this._drawSprites();
	        createjs.Ticker.framerate = this.movie.fps;
		}

        // createjs.Ticker.addEventListener('tick', this._next.bind(this));
		this.ticker = createjs.Ticker.on('tick',  this._next.bind(this));
	}

	// TODO: 设置精灵
	_drawSprites () {
        this.sprites.forEach((item) => {
            let image = document.createElement('img');
            image.src = 'data:image/png;base64,' + this.images[item.imageKey];
            let bitmap = new createjs.Bitmap(image);
            this.stage.addChild(bitmap);
        })
    }

	// TODO: 下一帧
    _next () {
        this.currentFrameNum++;
        if (this.currentFrameNum < this.movie.frames) {
            this._update(this.currentFrameNum);
        }else{
            ++this.alreadyPlayCount;

            if(!this.optionsInAnimation.loop || (this.optionsInAnimation.playCount > 0 && this.alreadyPlayCount >= this.optionsInAnimation.playCount)){
				this.alreadyPlayCount = 0;
                this.stop();
				this.complete();
            }else{
                this.currentFrameNum = 0;
                this._update(this.currentFrameNum);
            }
        }
    }

	// TODO: 停止动画
	stop () {
        this._clear();
		this.currentFrameNum = 0;
		this.alreadyPlayCount = 0;
		// createjs.Ticker.removeAllEventListeners();
		createjs.Ticker.off('tick', this.ticker);
    }

	// TODO: 清除 stage
    _clear () {
        this.stage.removeAllChildren();
        this.stage.update();
    }

	// TODO: 暂停动画
	pause () {
		// createjs.Ticker.removeAllEventListeners();
		createjs.Ticker.off('tick', this.ticker);
	}

	// TODO: 重置 stage 大小
	_stageResize (w, h) {
		this.stage.setTransform(0, 0, w, h);
	}

	// TODO: 更新 stage 精灵
    _update (frameNum) {
        for (let index = 0; index < this.stage.children.length; index++) {
            let element = this.stage.children[index];
            let frame   = this.sprites[index].frames[frameNum];
            if(frame !== undefined) {
                if(frame.alpha !== undefined) {
                    element.alpha = frame.alpha;
                }else{
                    element.alpha = 0.0;
                }

                if(frame.layout !== undefined) {
                    element.x = frame.layout.x;
                    element.y = frame.layout.y;
                    element.width = frame.layout.width;
                    element.height = frame.layout.height;
                }else{
                    element.x = undefined;
                    element.y = undefined;
                    element.width = undefined;
                    element.height = undefined;
                }

                if(frame.transform !== undefined) {
                    element.transformMatrix = new createjs.Matrix2D(frame.transform.a, frame.transform.b, frame.transform.c, frame.transform.d, frame.transform.tx, frame.transform.ty);
                }else{
                    element.transformMatrix = new createjs.Matrix2D(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
                }

                if(frame.clipPath !== undefined) {
                    element._mask = this._mask(frame);
                }else{
                    element._mask = null;
                }
            }
        }
        this.stage.update();
    }

    _mask (frame) {
        let path = frame.clipPath;
        let shape = new createjs.Shape();
        let g = shape.graphics;
        shape.x = 0;
        shape.y = 0;
        let args = [];
        let tempArg = [];
        let items = path.replace(/,/g, ' ').split(' ');
        let point = {
            x: 0,
            y: 0,
        };
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.length < 1) {
                continue;
            }
            let firstLetter = item.substr(0, 1);
            if (this.validMethods[firstLetter] === 1) {
                if (tempArg.length > 0) {
                    args.push(tempArg);
                    tempArg = [];
                }
                tempArg.push(firstLetter);
                tempArg.push(item.substr(1));
            }else{
                tempArg.push(item);
            }
        }
        for (let i = 0; i < args.length; i++) {
            let arg = args[i];
            if (!(arg[0] == 'C' || arg[0] == 'c')) {
                delete (point.x1);
                delete (point.y1);
                delete (point.x2);
                delete (point.y2);
            }
            switch (arg[0]) {
                case 'M':
                    point.x = Number(arg[1]);
                    point.y = Number(arg[2]);
                    g.mt(point.x, point.y);
                    break;
                case 'm':
                    point.x += Number(arg[1]);
                    point.y += Number(arg[2]);
                    g.mt(point.x, point.y);
                    break;
                case 'L':
                    point.x = Number(arg[1]);
                    point.y = Number(arg[2]);
                    g.lt(point.x, point.y);
                    break;
                case 'l':
                    point.x += Number(arg[1]);
                    point.y += Number(arg[2]);
                    g.lt(point.x, point.y);
                    break;
                case 'H':
                    point.x = Number(arg[1]);
                    g.lt(point.x, point.y);
                    break;
                case 'h':
                    point.x += Number(arg[1]);
                    g.lt(point.x, point.y);
                    break;
                case 'V':
                    point.y = Number(arg[1]);
                    g.lt(point.x, point.y);
                    break;
                case 'v':
                    point.y += Number(arg[1]);
                    g.lt(point.x, point.y);
                    break;
                case 'C':
                    point.x1 = Number(arg[1]);
                    point.y1 = Number(arg[2]);
                    point.x2 = Number(arg[3]);
                    point.y2 = Number(arg[4]);
                    point.x = Number(arg[5]);
                    point.y = Number(arg[6]);
                    g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    break;
                case 'c':
                    point.x1 = point.x + Number(arg[1]);
                    point.y1 = point.y + Number(arg[2]);
                    point.x2 = point.x + Number(arg[3]);
                    point.y2 = point.y + Number(arg[4]);
                    point.x += Number(arg[5]);
                    point.y += Number(arg[6]);
                    g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    break;
                case 'S':
                    if (point.x1 && point.y1 && point.x2 && point.y2) {
                        point.x1 = point.x - point.x2 + point.x;
                        point.y1 = point.y - point.y2 + point.y;
                        point.x2 = Number(arg[1]);
                        point.y2 = Number(arg[2]);
                        point.x = Number(arg[3]);
                        point.y = Number(arg[4]);
                        g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    } else {
                        point.x1 = Number(arg[1]);
                        point.y1 = Number(arg[2]);
                        point.x = Number(arg[3]);
                        point.y = Number(arg[4]);
                        g.qt(point.x1, point.y1, point.x, point.y);
                    }
                    break;
                case 's':
                    if (point.x1 && point.y1 && point.x2 && point.y2) {
                        point.x1 = point.x - point.x2 + point.x;
                        point.y1 = point.y - point.y2 + point.y;
                        point.x2 = point.x + Number(arg[1]);
                        point.y2 = point.y + Number(arg[2]);
                        point.x += Number(arg[3]);
                        point.y += Number(arg[4]);
                        g.bt(point.x1, point.y1, point.x2, point.y2, point.x, point.y);
                    } else {
                        point.x1 = point.x + Number(arg[1]);
                        point.y1 = point.y + Number(arg[2]);
                        point.x += Number(arg[3]);
                        point.y += Number(arg[4]);
                        g.qt(point.x1, point.y1, point.x, point.y);
                    }
                    break;
                case 'Q':
                    point.x1 = Number(arg[1]);
                    point.y1 = Number(arg[2]);
                    point.x = Number(arg[3]);
                    point.y = Number(arg[4]);
                    g.qt(point.x1, point.y1, point.x, point.y);
                    break;
                case 'q':
                    point.x1 = point.x + Number(arg[1]);
                    point.y1 = point.y + Number(arg[2]);
                    point.x += Number(arg[3]);
                    point.y += Number(arg[4]);
                    g.qt(point.x1, point.y1, point.x, point.y);
                    break;
                case 'A':
                    break;
                case 'a':
                    break;
                case 'Z':
                case 'z':
                    g.cp();
                    break;
                default:
                    break;
            }
        }
        if (frame.transform) {
            shape.transformMatrix = new createjs.Matrix2D(frame.transform.a, frame.transform.b, frame.transform.c, frame.transform.d, frame.transform.tx, frame.transform.ty);
        }
        return shape;
    }
}
