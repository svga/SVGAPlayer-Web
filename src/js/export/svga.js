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
    // worker = new Worker('http://172.25.151.225:3000/assets/this-worker.min.js');
    worker = new Worker('http://172.25.151.225:3000/js/export/modules/svga-worker.js');

    optionsInSvga = {
        canvas: '',
        assets: '',
        autoPlay: true,
    };

    constructor (args, readyFunction) {

        super(args);

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

        this.worker.postMessage(assets);

        this.worker.onmessage = ({ data }) => {
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

    ready () {}

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

    destroy () {
        super._destroy();
    }

    complete (cb) {
        this.complete = cb;
    }

}
