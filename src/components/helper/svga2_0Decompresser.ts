/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { Decompresser } from '../interface/helper/decompresser';
import { VideoEntity } from '../entity/VideoEntity';
import { ProtoMovieEntity } from '../entity/protobuf';
import { inflate } from 'pako';

export class SVGA2_0Decompresser extends Decompresser {
    private static svga2_0Decompresser: SVGA2_0Decompresser = null;

    /**
     * @override
     */
    public static shareDecompresser(): Decompresser {
        if (!this.svga2_0Decompresser) {
            this.svga2_0Decompresser = new SVGA2_0Decompresser();
        }
        return this.svga2_0Decompresser;
    }

    /**
     * @override
     */
    public decompressFileData(
        fileData: ArrayBuffer,
        success: (data: { movie: any, images: any }) => void,
        failure?: (err: Error) => void
    ) {
        let inflateData = inflate(new Uint8Array(fileData));
        let movieData = ProtoMovieEntity.decode(inflateData);
        let images = {};

        this.loadImages(images, movieData, success);
    }

    private loadImages(images: any, movieData: any, success: (data: { movie: any, images: any }) => void) {
        for (let key in movieData.images) {
            let element = movieData.images[key];
            let value = this.Uint8ToString(element)
            images[key] = btoa(value)
        }
        success({ movie: movieData, images: images });
    }

    private Uint8ToString(u8a: any) {
        var CHUNK_SZ = 0x8000;
        var c = [];
        for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
            c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
        }
        return c.join("");
    }
}