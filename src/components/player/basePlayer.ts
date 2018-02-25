/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { VideoEntity } from "../entity/VideoEntity";

export class BasePlayer {

    // Private methods & properties
    private currentFrame: number = 0;
    private videoItem: VideoEntity = null;

    public constructor() {
        
    }

    public setVideoItem(videoItem: VideoEntity) {
        this.currentFrame = 0;
        this.videoItem = videoItem;
    }

}