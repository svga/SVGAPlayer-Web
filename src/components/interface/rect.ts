/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export function RectMake(x: number, y: number, width: number, height: number): Rect {
    return { x, y, width, height };
}