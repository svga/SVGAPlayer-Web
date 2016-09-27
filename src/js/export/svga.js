/**
 * @file     : svga-web-canvas
 * @author   : lijialiang
 * @team     : UED中心
 * @export   : umd
 * @document : http://uedfe.yypm.com/md/
 * @update   : 2016-08-30 15:15:18
 */

import Animation from './modules/Animation';

module.exports = class Svga extends Animation {

    // 固定 worker 地址
    // FIXME 跨域问题
    static worker = new Worker('http://172.25.151.225:3000/js/export/modules/svga-worker.js');

    static options = {
        canvas: '',
        assets: '',
        autoPlay: true,
    };

    constructor (args, readyFunction) {

        super(args);

        for(let item in Svga.options){
		    if(typeof args[item] !== 'undefined'){
				Svga.options[item] = args[item];
			}
		}

        if(readyFunction){
            this.ready = readyFunction;
        }

        this._init();
    }

    // TODO: 启动 work 加载解析资源
    _init () {
        const { canvas, assets } = Svga.options;

        Svga.options.canvas = document.querySelector(canvas);

        Svga.worker.postMessage({
            action: 'loadAssets',
            args  : {
                url: assets,
            }
        });

        Svga.worker.onmessage = ({ data }) => {
            this._loadAssetsComplete(data);
        };
    }

    _loadAssetsComplete ({ files, movie, images }) {
        super._init({
            canvas : Svga.canvas,
            movie  : movie.movie,
            sprites: movie.sprites,
            images,
            canvas: Svga.options.canvas,
        })

        this.ready(this);

        // 自动播放
        if(Svga.options.autoPlay){
            this.play();
        }
    }

    ready () {}

    play () {
        if(Svga.options.canvas.width === ''){
            Svga.options.canvas.style.width = Animation.movie.viewBox.width;
            Svga.options.canvas.style.height = Animation.movie.viewBox.height;
            Svga.options.canvas.width = Animation.movie.viewBox.width;
            Svga.options.canvas.height = Animation.movie.viewBox.height;
        }else{
            let stageWidth  = Svga.options.canvas.width / Animation.movie.viewBox.width;
            let stageHeight = Svga.options.canvas.height / Animation.movie.viewBox.height;
            if(stageWidth <= stageHeight){
                super._stageResize(stageWidth, stageWidth);
            }else{
                super._stageResize(stageHeight, stageHeight);
            }
        }

        super._play();
    }

    destroy () {
        super._destroy();
        Svga = null;
    }

    complete (cb) {
        this.complete = cb;
    }

}
