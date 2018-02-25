/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { Size, SizeMake } from '../../components/interface/size';
import { SpriteEntity } from './spriteEntity'

export enum SVGAVersion {
  Version1_0 = "1.0",
  Version1_5 = "1.5",
  Version2_0 = "2.0"
}

export class VideoEntity {
  public version: SVGAVersion = SVGAVersion.Version2_0;
  public videoSize: Size = SizeMake(0, 0);
  public FPS: number = 20;
  public frames: number = 0;
  public images: Object = {};
  public sprites: Array<any> = [];

  public constructor(spec: any, images: any) {
    if (spec.params) {
      this.version = spec.ver;
      this.videoSize.width = spec.params.viewBoxWidth || 0.0;
      this.videoSize.height = spec.params.viewBoxHeight || 0.0;
      this.FPS = spec.params.fps || 20;
      this.frames = spec.params.frames || 0;
    }
    this.resetSprites(spec)

    if (images) {
      this.images = images;
    }
  }

  private resetSprites(spec: any) {
    if (spec.sprites instanceof Array) {
      this.sprites = spec.sprites.map(obj => {
        return new SpriteEntity(obj);
      });
    }
  }
}
