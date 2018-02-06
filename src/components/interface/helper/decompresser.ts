/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { VideoEntity } from "../../entity/videoEntity";

export class Decompresser {
  /**
   * @abstract
   *
   * @param {ArrayBuffer} fileData
   * @param {(data: {movie: any, images: any}) => void} success
   * @param {(err: Error) => void} failure
   * @memberof Downloader
   */
  public decompressFileData(
    fileData: ArrayBuffer,
    success: (data: {movie: any, images: any}) => void,
    failure?: (err: Error) => void
  ) {}
}