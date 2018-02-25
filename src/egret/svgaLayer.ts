/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

'use strict';

 export class SVGALayer extends egret.DisplayObjectContainer{

     constructor(){
         super()

     }

     public setFrame(x: number, y: number, width: number, height: number){
         this.x = x
         this.y = y
         this.width = width
         this.height = height
     }
 }