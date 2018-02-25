/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { VideoEntity } from "../../entity/videoEntity";
import { Base64ToArrayBuffer } from "../../interface/string"

declare var JSZipUtils;

export class Decompresser {
    private static decompresser: Decompresser = null;

    public static shareDecompresser(): Decompresser {
        if (!this.decompresser) {
            this.decompresser = new Decompresser();
        }
        return this.decompresser;
    }

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
        success: (data: { movie: any, images: any }) => void,
        failure?: (err: Error) => void
    ) { }

    public loadFileData(
        url: string,
        success: (fileData: ArrayBuffer) => void,
        failure?: (err: Error) => void
    ) {

        if (url.toString() == "[object File]") {

        } else if (url.indexOf("data:svga/1.0;base64,") >= 0 || url.indexOf("data:svga/2.0;base64,") >= 0) {
            var arrayBufferSVGA = Base64ToArrayBuffer(url.substring(21));
            success(arrayBufferSVGA);

        } else {
            if (typeof JSZipUtils === "object") {
                JSZipUtils.getBinaryContent(url, (error, data) => {
                    if (error) {
                        failure && failure(error);
                        console.error(error);
                        throw error;
                    }
                    success(data);
                });
                
            } else {
                if (failure) {
                    failure(new Error("JSZipUtils is not included."));
                }
            }
        }
    }
}