/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { VideoEntity } from "../../entity/videoEntity";

export class Decompresser {
    protected static decompresser: Decompresser = null;

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

    }
}