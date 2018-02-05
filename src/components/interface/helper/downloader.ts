/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

export class Downloader {
  /**
   * @abstract
   *
   * @param {string} url
   * @param {(result: ArrayBuffer) => void} success
   * @param {(err: Error) => void} failure
   * @memberof Downloader
   */
  public downloadFileWithURL(
    url: string,
    success: (result: ArrayBuffer) => void,
    failure?: (err: Error) => void
  ) {}
}
