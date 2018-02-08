/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { VideoEntity } from '../entity/VideoEntity';
import { Downloader } from '../interface/helper/downloader';
import { ISURL } from '../interface/string';
import { Decompresser } from '../interface/helper/decompresser';
import { SVGA1_0Decompresser } from '../helper/svga1_0Decompresser';
import { SVGA2_0Decompresser } from '../helper/svga2_0Decompresser';

export class BaseParser {
  protected downloader: Downloader;

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
        this.getDecompresser(fileData).decompressFileData(fileData, (data) => {
          
          let videoItem = new VideoEntity(data.movie, data.images);
          success(videoItem);
        });
      });
    } else {

      this.getDecompresser().loadFileData(url, (fileData) => {
        this.getDecompresser(fileData).decompressFileData(fileData, (data) => {

          let videoItem = new VideoEntity(data.movie, data.images);
          success(videoItem);
        });
      });
    }
  }

  /**
   * @private
   * @param fileData 
   */
  private getDecompresser(fileData?: ArrayBuffer): Decompresser {
    if (!fileData) {
      return Decompresser.shareDecompresser();
    }
    const dataHeader = new Uint8Array(fileData, 0, 4)

    if (dataHeader[0] == 80 && dataHeader[1] == 75 && dataHeader[2] == 3 && dataHeader[3] == 4) {

      return SVGA1_0Decompresser.shareDecompresser();
    }else{

      return SVGA2_0Decompresser.shareDecompresser();
    }
  }
}
