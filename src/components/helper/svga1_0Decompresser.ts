/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { Decompresser } from '../interface/helper/decompresser';
import { VideoEntity } from '../entity/VideoEntity';

declare var JSZip;

export class SVGA1_0Decompresser extends Decompresser {
    private static svga1_0Decompresser: SVGA1_0Decompresser = null;
    
    /**
     * @override
     */
    public static shareDecompresser(): Decompresser {
        if (!this.svga1_0Decompresser) {
            this.svga1_0Decompresser = new SVGA1_0Decompresser();
        }
        return this.svga1_0Decompresser;
    }

    /**
     * @override
     */
    public decompressFileData(
        fileData: ArrayBuffer,
        success: (data: { movie: any, images: any }) => void,
        failure?: (err: Error) => void
    ) {
        if (typeof JSZip === "function") {
            JSZip.loadAsync(fileData).then(function (zip) {

                zip.file("movie.spec").async("string").then(function (spec) {
                    let movieData = JSON.parse(spec);

                    let params = {};
                    params["viewBoxWidth"] = movieData.movie.viewBox.width;
                    params["viewBoxHeight"] = movieData.movie.viewBox.height;
                    params["fps"] = movieData.movie.fps;
                    params["frames"] = movieData.movie.frames;
                    movieData["params"] = params;

                    let images = {};
                    let currentIndex = 0;

                    if (movieData.images && Object.getOwnPropertyNames(movieData.images).length > 0) {
                        this.loadImages(currentIndex, images, zip, movieData, success);
                    } else {
                        success({ movie: movieData, images: images });
                    }
                }.bind(this));
            }.bind(this));
        } else {
            if (failure) {
                failure(new Error("Jszip is not included."));
            }
        }
    }

    private loadImages(currentIndex: number, images: any, zip: any, movieData: any, success: (data: { movie: any, images: any }) => void) {
        if (currentIndex == Object.getOwnPropertyNames(movieData.images).length) {
            success({ movie: movieData, images: images });
            return;
        }
        let key = Object.getOwnPropertyNames(movieData.images)[currentIndex];
        if (images.hasOwnProperty(key)) {
            this.loadImages(currentIndex + 1, images, zip, movieData, success);
            return;
        }
        let element = movieData.images[key];
        zip.file(element + ".png").async("base64").then(function (data) {
            images[key] = data;
            this.loadImages(currentIndex + 1, images, zip, movieData, success);
        }.bind(this));
    }
}