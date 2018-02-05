/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

export interface Size {
    width: number;
    height: number;
}

export function SizeMake(width: number, height: number): Size {
    return { width, height };
}