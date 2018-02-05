/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

"use strict";

class BezierPath {
    /**
     * @private
     */
    _d: number;
    _transform: number;
    _styles: number;
    _shape: number;

    constructor(d: number, transform: number, styles: number) {
        this._d = d;
        this._transform = transform;
        this._styles = styles;
    }
}