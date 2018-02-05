/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { VideoEntity } from "../entity/VideoEntity";
import { Downloader } from "../interface/helper/downloader";

export class BaseParser {
  protected downloader: Downloader;

  public load(
    url: string,
    success: (videoItem: VideoEntity) => void,
    failure: (err: Error) => void
  ) {
    if(url.toString() == "[object File]"){

    }else if(url.indexOf("data:svga/1.0;base64,") >= 0) {

    }else if(url.indexOf("data:svga/2.0;base64,") >= 0) {
    
    }else{

        this.downloader.downloadFileWithURL(url, (result) => {
            
        });

    }
  }
}
