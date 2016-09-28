/**
 * @file     : this-web-canvas
 * @author   : lijialiang
 * @team     : UED中心
 * @export   : umd
 * @document : http://uedfe.yypm.com/md/
 * @update   : 2016-08-30 15:15:18
 */

import Animation from './modules/Animation';

module.exports = class Svga extends Animation {

    // 固定 worker 地址
    // FIXME: 跨域问题
    static worker;

    optionsInSvga = {
        canvas: '',
        assets: '',
        autoPlay: true,
    };

    constructor (args, readyFunction) {

        super(args);

        // 创建 worker
        if(args.worker){
            Svga.worker = new Worker(args.worker);
        }
        // 复用 worker
        else if(Svga.work === undefined){
            Svga.worker = new Worker(`${ window.location.origin }/js/export/modules/svga-worker.js`);
        }

        Svga.worker.onerror = (err) => {
            console.log('[SVGA Web Canvas]: worker is error');
        }

        for(let item in this.optionsInSvga){
		    if(typeof args[item] !== 'undefined'){
				this.optionsInSvga[item] = args[item];
			}
		}

        if(readyFunction){
            this.ready = readyFunction;
        }

        this._init();
    }

    // TODO: 启动 work 加载解析资源
    _init () {

        const { canvas, assets } = this.optionsInSvga;

        this.optionsInSvga.canvas = document.querySelector(canvas);

        Svga.worker.postMessage(assets);

        Svga.worker.onmessage = ({ data }) => {
            this._loadAssetsComplete(data);
        };
    }

    _loadAssetsComplete ({ files, movie, images }) {

        super._init({
            canvas : this.canvas,
            movie  : movie.movie,
            sprites: movie.sprites,
            images,
            canvas: this.optionsInSvga.canvas,
        })

        this.ready(this);

        // 自动播放
        if(this.optionsInSvga.autoPlay){
            this.play();
        }
    }

    ready () { }

    play () {
        if(this.optionsInSvga.canvas.width === ''){
            this.optionsInSvga.canvas.style.width = this.movie.viewBox.width;
            this.optionsInSvga.canvas.style.height = this.movie.viewBox.height;
            this.optionsInSvga.canvas.width = this.movie.viewBox.width;
            this.optionsInSvga.canvas.height = Animation.movie.viewBox.height;
        }else{
            let stageWidth  = this.optionsInSvga.canvas.width / this.movie.viewBox.width;
            let stageHeight = this.optionsInSvga.canvas.height / this.movie.viewBox.height;
            if(stageWidth <= stageHeight){
                super._stageResize(stageWidth, stageWidth);
            }else{
                super._stageResize(stageHeight, stageHeight);
            }
        }

        super._play();
    }

    complete (cb) {
        this.complete = cb;
    }

}
