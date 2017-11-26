import {VideoEntity} from "../videoEntity";

let idx = 0;

export class IE9Parser {
    constructor(swfUrl) {
        this.swfUrl = swfUrl || '';
        this.ref = null;
        this.loadQueue = [];
        this.waitQueue = {};
        this.containerId = 'svga_ie9_' + (+new Date());

        this._embedSwf();
        this._bindEvent();
    }

    load(url, success, faild) {
        if (!this.ref || !this.ref.load) {
            this.loadQueue.push({
                url: url,
                success: success,
                faild: faild
            });
        } else {
            let id = idx++;
            this.ref.load(url, id);
            this.waitQueue[id] = {
                data: {},
                spriteDatas: [],
                success: success,
                faild: faild
            };
        }
    };

    _embedSwf() {
        if (!window.swfobject) {
            throw new Error('ie9 pollify need load flash, so we need swfobject');
        }

        let containerId = this.containerId;
        let $container = document.createElement('div');
        $container.id = containerId;
        $container.style.position = 'absolute';
        $container.style.top = -10000 + 'px';
        $container.style.left = -10000 + 'px';
        $container.style.wdith = '400px';
        $container.style.height = '300px';
        document.body.appendChild($container);

        let flashparams = {
            quality: 'high',
            wmode: 'transparent',
            bgcolor: '0x000',
            allowscriptaccess: 'always'
        };

        swfobject.embedSWF(
            this.swfUrl,
            $container,
            '100%',
            '100%',
            '10.0.0.0',
            '',
            {cbname: containerId},
            flashparams,
            '',
            (res) => {
                if (!res.success) {
                    throw new Error('load flash faild');
                } else {
                    this.ref = res.ref;
                }
            }
        );
    }

    _bindEvent() {
        window[this.containerId] = {
            complete: this._onComplete.bind(this),
            receive: this._onReceive.bind(this),
            error: this._onError.bind(this)
        }
    }

    _onComplete() {
        for (let i = 0, len = this.loadQueue.length; i < len; i++) {
            let item = this.loadQueue[i];
            this.load(item.url, item.success, item.faild);
        }
    }

    _onReceive(info) {
        if (!info || info.id == null) {
            return;
        }

        let id = info.id;
        if (info.state === 'done') {
            this.waitQueue[id].data.spriteDatas = this.waitQueue[id].spriteDatas;
            let data = this.waitQueue[id].data;
            let images = data.imageDatas;
            let success = this.waitQueue[id].success;
            this.waitQueue[id] = null;
            delete this.waitQueue[id];
            if (typeof success === 'function') {
                success(new VideoEntity({
                    movie: {
                        viewBox: data.videoSize,
                        FPS: data.FPS,
                        frames: data.frames
                    },
                    ver: data.version,
                    sprites: data.spriteDatas
                }, images))
            }
        } else if (info.spriteData) {
            this.waitQueue[id].spriteDatas = this.waitQueue[id].spriteDatas.concat(info.spriteData);
        } else {
            delete info.state;
            try {
                info.imageDatas = JSON.parse(info.imageDatas);
            } catch (e) {
                info.imageDatas = {};
            }
            this.waitQueue[id].data = info;
        }
    }

    _onError(id) {
        if (this.waitQueue[id]) {
            let faild = this.waitQueue[id].faild;
            if (typeof faild === "function") {
                faild();
            }

            this.waitQueue[id] = null;
            delete this.waitQueue[id];
        }
    }
}

