/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { FrameEntity } from "./frameEntity";

export class SpriteEntity {
  public imageKey: string = null;
  public frames: FrameEntity[] = [];

  constructor(spec: any) {
    this.imageKey = spec.imageKey;
    if (spec.frames) {
      this.frames = spec.frames.map(obj => {
        return new FrameEntity(obj);
      });
    }
  }
}
