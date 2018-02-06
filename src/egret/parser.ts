/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

import { BaseParser } from '../components/parser/baseParser';
import { EgretDownloader } from '../components/helper/egretDownloader';

export class Parser extends BaseParser {

    public constructor(){
        super();
        
        this.downloader = new EgretDownloader;
    }
}
