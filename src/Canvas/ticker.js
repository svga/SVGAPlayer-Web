const requestAnimationFrame = (window && (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame)) || ((callback) => { window.setTimeout(callback, 16) });

export class Ticker {

    _owner = undefined;
    _running = false;

    constructor(owner) {
        this._owner = owner;
    }

    start() {
        if (this._running) { return; }
        this._running = true;
        let requestFrame = () => {
            requestAnimationFrame(() => {
                this._owner._onTick();
                if (this._running === true) {
                    requestFrame();
                }
            });
        }
        requestFrame();
    }

    stop() {
        this._running = false;
    }

}
