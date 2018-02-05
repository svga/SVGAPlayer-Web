/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

// import { Downloader } from "../components/interface/helper/downloader";

export class EgretDownloader {
  public downloadFileWithURL(
    url: string,
    success: (result: ArrayBuffer) => void,
    failure: (err: Error) => void
  ) {
    const req = new egret.HttpRequest();
    req.open(url, egret.HttpMethod.GET);
    req.responseType = egret.HttpResponseType.ARRAY_BUFFER;
    req.send();
    req.addEventListener(
      egret.Event.COMPLETE,
      (event: egret.Event) => {
        let request = <egret.HttpRequest>event.currentTarget;
        success(request.response);
      },
      this);
  }
}
