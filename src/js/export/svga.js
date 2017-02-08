/**
 * @file   : svga-web-canvas
 * @author : lijialiang
 * @team   : UED中心
 * @export : umd
 */

import Animation from './modules/Animation';

module.exports = class Svga extends Animation {

    // 固定 worker 地址
    // FIXME: 跨域问题
    static worker;

    static DB;

    optionsInSvga = {
        canvas: '',
        assets: '',
        autoPlay: true,
    };

    constructor ( args, readyFunction ) {

        super(args);

        // 创建 worker
        if (args.worker) {
            Svga.worker = new Worker(args.worker);
        }
        // 复用 worker
        // else if(Svga.work === undefined){
        //     Svga.worker = new Worker(`${ window.location.origin }/js/export/modules/svga-worker.js`);
        // }

        Svga.worker.onerror = ( err ) => {
            console.log('[SVGA Web Canvas]: worker is error');
        };

        for (let item in this.optionsInSvga) {
		    if (typeof args[item] !== 'undefined') {
				this.optionsInSvga[item] = args[item];
			}
		}

        if (typeof readyFunction == 'function') {
            this.ready = readyFunction;
        }

        if (args.db) {
            this._initDB(args.db);
        }else{
            this._initWorker();
        }

        this._init();
    }

    _initDB (SvgaDB) {
        Svga.DB = new SvgaDB();

        Svga.DB.find(this.optionsInSvga.assets, ( images, movie, err ) => {
            if (!err) {
                this._initAminstion(images, movie);
            } else {
                this._initWorker();
            }

            // Svga.DB.clear(1);
        });
    }

    _init () {

        const { canvas } = this.optionsInSvga;

        this.optionsInSvga.canvas = document.querySelector(canvas);
    }

    _loadAssetsComplete ({ movie, images }) {

        if (Svga.DB) {
            Svga.DB.add({
                url : this.optionsInSvga.assets,
                movie,
                images,
            });
        }

        this._initAminstion(images, movie);
    }

    // TODO: 启动 work 加载解析资源
    _initWorker () {
        const { assets } = this.optionsInSvga;

        Svga.worker.postMessage(assets);

        Svga.worker.onmessage = ({ data }) => {
            this._loadAssetsComplete(data);
        };
    }

    // TODO: 初始化基类
    _initAminstion (images, movie) {
        super._init({
            canvas : this.canvas,
            movie  : movie.movie,
            sprites: movie.sprites,
            images,
            canvas: this.optionsInSvga.canvas,
        });

        this.ready(this);

        // 自动播放
        if (this.optionsInSvga.autoPlay) {
            this.play();
        }
    }

    ready () { }

    play ( callback = () => {} ) {
        let canvas = this.optionsInSvga.canvas;
        let viewBox = this.movie.viewBox;
        if (canvas.width === '') {
            canvas.style.width = viewBox.width;
            canvas.style.height = viewBox.height;
            canvas.width = viewBox.width;
            canvas.height = Animation.movie.viewBox.height;
        } else {
            let stageWidth = canvas.width / viewBox.width;
            let stageHeight = canvas.height / viewBox.height;
            if (stageWidth <= stageHeight) {
                super._stageResize(stageWidth, stageWidth);
            } else {
                super._stageResize(stageHeight, stageHeight);
            }
        }

        super._play(callback);
    }

    complete (cb) {
        this.complete = cb;
    }

}
