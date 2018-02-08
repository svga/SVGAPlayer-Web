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
    public static shareDecompresser(): Decompresser {
        if (!this.decompresser) {
            this.decompresser = new SVGA1_0Decompresser();
        }
        return this.decompresser;
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
        }
        let key = Object.getOwnPropertyNames(movieData.images)[currentIndex];
        let element = movieData.images[key];
        if (images.hasOwnProperty(key)) {
            this.loadImages(currentIndex + 1, images, zip, movieData, success);
            return;
        }
        zip.file(element + ".png").async("base64").then(function (data) {
            images[key] = data;
            this.loadImages(currentIndex + 1, images, zip, movieData, success);
        }.bind(this))
    }
}