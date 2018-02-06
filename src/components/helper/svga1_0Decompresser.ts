/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { Decompresser } from '../interface/helper/decompresser';
import { VideoEntity } from '../entity/VideoEntity';

declare var JSZip;

export class SVGA1_0Decompresser extends Decompresser {
    /**
     * @override
     */
    public decompressFileData(
        fileData: ArrayBuffer,
        success: (data: {movie: any, images: any}) => void,
        failure?: (err: Error) => void
    ) {
        if (typeof JSZip === "function") {
            JSZip.loadAsync(fileData).then(function (zip) {

                zip.file("movie.spec").async("string").then(function (spec) {
                    let movieData = JSON.parse(spec);
                    let images = {};

                    this.loadImages(images, zip, movieData, function(){
                        success({movie: movieData, images: images})
                    });
                });
            });
        } else {
            if (failure) {
                failure(new Error("Jszip is not included."));
            }
        }
    }

    private loadImages(images: any, zip: any, movieData: any, callback:any){
        
    }
}