/*-----------------------------------------------------------------------------------------------------
 *  YYUED Open Source. 
 *  Licensed under the Apache2.0 License. See License.txt in the project root for license information.
 *----------------------------------------------------------------------------------------------------*/

'use strict';

import { BezierPath } from '../components/entity/bezierPath';
import { Renderer } from './renderer';

export class SVGAVectorLayer extends egret.Sprite {
    constructor() {
        super()
    }

    public setBezier(obj: BezierPath) {

        if (obj == null) { return }
        this.graphics.clear()
        this.requestBezierShape(obj)
    }

    private requestBezierShape(obj: BezierPath) {
        this.resetStyle(obj)
        let currentPoint = { x: 0, y: 0, x1: 0, y1: 0, x2: 0, y2: 0 }
        const d = obj._d.replace(/([a-zA-Z])/g, '|||$1 ').replace(/,/g, ' ');
        d.split('|||').forEach(segment => {
            if (segment.length == 0) { return; }
            const firstLetter = segment.substr(0, 1);
            if (Renderer.validMethods.indexOf(firstLetter) >= 0) {
                const args = segment.substr(1).trim().split(" ");
                this.drawBezierElement(currentPoint, firstLetter, args);
            }
        })
        this.graphics.endFill()
    }

    private resetStyle(obj: BezierPath) {
        let styles = obj._styles
        let rgbaDic: any = null
        if (styles && styles.stroke) {
            console.log("styles.stroke")
            rgbaDic = this.requestHexFromRGBA(styles.stroke)

            let strokeWidth = styles.strokeWidth || 0.0
            let lineCap = styles.lineCap || ''
            let lineJoin = styles.lineJoin || ''
            let miterLimit = styles.miterLimit || ''
            this.graphics.lineStyle(strokeWidth, rgbaDic.color, rgbaDic.alpha, true, "showAll", lineCap, lineJoin, miterLimit)
        }
        if (styles && styles.fill) {
            console.log("styles.fill")
            rgbaDic = this.requestHexFromRGBA(styles.fill)
            this.graphics.beginFill(rgbaDic.color, rgbaDic.alpha)
        }
        if (rgbaDic == null) {
            rgbaDic = { "color": 0xffffff, "alpha": 1 }
        }

        if (styles && styles.lineDash) {
            console.log("styles.lineDash")
            // shape.setStrokeDash([styles.lineDash[0], styles.lineDash[1]], styles.lineDash[2]);
        }
    }

    private requestHexFromRGBA(color: any): any {

        let hexColor = (((color[0] * 255) << 16) | ((color[1] * 255) << 8) | color[2] * 255)
        return { "color": hexColor, "alpha": color[3] }
    }

    private drawBezierElement(currentPoint, method, args) {
        switch (method) {
            case 'M':
                currentPoint.x = Number(args[0]);
                currentPoint.y = Number(args[1]);
                this.graphics.moveTo(currentPoint.x, currentPoint.y);
                break;
            case 'm':
                currentPoint.x += Number(args[0]);
                currentPoint.y += Number(args[1]);
                this.graphics.moveTo(currentPoint.x, currentPoint.y);
                break;
            case 'L':
                currentPoint.x = Number(args[0]);
                currentPoint.y = Number(args[1]);
                this.graphics.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'l':
                currentPoint.x += Number(args[0]);
                currentPoint.y += Number(args[1]);
                this.graphics.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'H':
                currentPoint.x = Number(args[0]);
                this.graphics.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'h':
                currentPoint.x += Number(args[0]);
                this.graphics.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'V':
                currentPoint.y = Number(args[0]);
                this.graphics.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'v':
                currentPoint.y += Number(args[0]);
                this.graphics.lineTo(currentPoint.x, currentPoint.y);
                break;
            case 'C':
                currentPoint.x1 = Number(args[0]);
                currentPoint.y1 = Number(args[1]);
                currentPoint.x2 = Number(args[2]);
                currentPoint.y2 = Number(args[3]);
                currentPoint.x = Number(args[4]);
                currentPoint.y = Number(args[5]);
                this.graphics.cubicCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y)
                break;
            case 'c':
                currentPoint.x1 = currentPoint.x + Number(args[0]);
                currentPoint.y1 = currentPoint.y + Number(args[1]);
                currentPoint.x2 = currentPoint.x + Number(args[2]);
                currentPoint.y2 = currentPoint.y + Number(args[3]);
                currentPoint.x += Number(args[4]);
                currentPoint.y += Number(args[5]);
                this.graphics.cubicCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y)
                break;
            case 'S':
                if (currentPoint.x1 && currentPoint.y1 && currentPoint.x2 && currentPoint.y2) {
                    currentPoint.x1 = currentPoint.x - currentPoint.x2 + currentPoint.x;
                    currentPoint.y1 = currentPoint.y - currentPoint.y2 + currentPoint.y;
                    currentPoint.x2 = Number(args[0]);
                    currentPoint.y2 = Number(args[1]);
                    currentPoint.x = Number(args[2]);
                    currentPoint.y = Number(args[3]);
                    this.graphics.cubicCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y)
                } else {
                    currentPoint.x1 = Number(args[0]);
                    currentPoint.y1 = Number(args[1]);
                    currentPoint.x = Number(args[2]);
                    currentPoint.y = Number(args[3]);
                    this.graphics.curveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y)
                }
                break;
            case 's':
                if (currentPoint.x1 && currentPoint.y1 && currentPoint.x2 && currentPoint.y2) {
                    currentPoint.x1 = currentPoint.x - currentPoint.x2 + currentPoint.x;
                    currentPoint.y1 = currentPoint.y - currentPoint.y2 + currentPoint.y;
                    currentPoint.x2 = currentPoint.x + Number(args[0]);
                    currentPoint.y2 = currentPoint.y + Number(args[1]);
                    currentPoint.x += Number(args[2]);
                    currentPoint.y += Number(args[3]);
                    this.graphics.cubicCurveTo(currentPoint.x1, currentPoint.y1, currentPoint.x2, currentPoint.y2, currentPoint.x, currentPoint.y);
                } else {
                    currentPoint.x1 = currentPoint.x + Number(args[0]);
                    currentPoint.y1 = currentPoint.y + Number(args[1]);
                    currentPoint.x += Number(args[2]);
                    currentPoint.y += Number(args[3]);
                    this.graphics.curveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y)
                }
                break;
            case 'Q':
                currentPoint.x1 = Number(args[0]);
                currentPoint.y1 = Number(args[1]);
                currentPoint.x = Number(args[2]);
                currentPoint.y = Number(args[3]);
                this.graphics.curveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y)
                break;
            case 'q':
                currentPoint.x1 = currentPoint.x + Number(args[0]);
                currentPoint.y1 = currentPoint.y + Number(args[1]);
                currentPoint.x += Number(args[2]);
                currentPoint.y += Number(args[3]);
                this.graphics.curveTo(currentPoint.x1, currentPoint.y1, currentPoint.x, currentPoint.y)
                break;
            case 'A':
                break;
            case 'a':
                break;
            case 'Z':
            case 'z':
                break;
            default:
                break;
        }
    }
}