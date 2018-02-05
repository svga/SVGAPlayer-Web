/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

export interface Transform {
    a:  number;
    b:  number;
    c:  number;
    d:  number;
    tx: number;
    ty: number;
}

export function TransformMake(a: number, b: number, c:  number, d:  number, tx: number, ty: number): Transform {
    return { a, b, c, d, tx, ty };
}