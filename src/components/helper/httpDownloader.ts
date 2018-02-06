/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { Downloader } from '../interface/helper/downloader';

export class HTTPDownloader extends Downloader {
  
  /**
  * @override
  */
  public downloadFileWithURL(
    url: string,
    success: (fileData: ArrayBuffer) => void,
    failure: (err: Error) => void
  ) {
    const req = new XMLHttpRequest()
    req.open("GET", url, true);
    req.responseType = "arraybuffer"
    req.onloadend = () => {

        success(req.response);
    }
    req.send()
  }
}
