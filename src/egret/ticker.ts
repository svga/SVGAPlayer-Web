/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

'use strict';

export class Ticker {
    private owner: any = undefined;
    private running: boolean = false;

    constructor(owner: any) {
        this.owner = owner
    }

    private onTicker(timeStamp: number) {
        if(this.running === false){
            egret.stopTick(this.onTicker, this)
            return false
        }
        this.owner._onTick()
        return false
    }

    public start() {
        if (this.running) { return; }
        this.running = true
        egret.startTick(this.onTicker, this)
    }

    public stop() {
        this.running = false
    }
}