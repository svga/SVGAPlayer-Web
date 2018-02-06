/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { VideoEntity } from '../entity/VideoEntity';
import { Downloader } from '../interface/helper/downloader';
import { Decompresser } from '../interface/helper/decompresser';
import { ISURL } from '../interface/string';

export class BaseParser {
  protected downloader: Downloader;
  protected decompresser: Decompresser;

  /**
   * load svga file
   * @param url 
   * @param success 
   * @param failure 
   */
  public load(
    url: string,
    success: (videoItem: VideoEntity) => void,
    failure: (err: Error) => void
  ) {

    if (ISURL(url)) {
      this.downloader.downloadFileWithURL(url, (fileData) => {
        this.decompresser.decompressFileData(fileData, (data) => {
          let movie = null;
          let images = data.images;
          let videoItem = new VideoEntity(movie, images);

          success(videoItem);
        });
      });
    } else {
      // this.decompresser.decompressFileData(url, (videoItem) => {
      //   success(videoItem);
      // });
    }
  }
}
