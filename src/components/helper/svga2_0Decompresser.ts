/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { Decompresser } from '../interface/helper/decompresser';
import { VideoEntity } from '../entity/VideoEntity';

export class SVGA2_0Decompresser extends Decompresser {

    /**
     * @override
     */
    public static shareDecompresser(): Decompresser {
        if (!this.decompresser) {
            this.decompresser = new SVGA2_0Decompresser();
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
    
    }
}