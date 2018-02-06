/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { BaseParser } from '../components/parser/baseParser';
import { HTTPDownloader } from '../components/helper/httpDownloader'
import { SVGA1_0Decompresser } from '../components/helper/svga1_0Decompresser';

export class Parser extends BaseParser {

    public constructor(){
        super();

        this.downloader = new HTTPDownloader();
        this.decompresser = new SVGA1_0Decompresser(); 
    }
}