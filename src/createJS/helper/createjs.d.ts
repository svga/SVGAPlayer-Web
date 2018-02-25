
// rename the native MouseEvent, to avoid conflict with createjs's MouseEvent
interface NativeMouseEvent extends MouseEvent {
  
}

declare namespace createjs {
  export class Event {
    constructor(type: string, bubbles: boolean, cancelable: boolean);
    
    // properties
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: any; // It is 'Object' type officially, but 'any' is easier to use.
    defaultPrevented: boolean;
    eventPhase: number;
    immediatePropagationStopped: boolean;
    propagationStopped: boolean;
    removed: boolean;
    target: any; // It is 'Object' type officially, but 'any' is easier to use.
    timeStamp: number;
    type: string;
    
    // other event payloads
    data: any;
    delta: number;
    error: string;
    id: string;
    item: any;
    loaded: number;
    name: string;
    next: string;
    params: any;
    paused: boolean;
    progress: number;
    rawResult: any;
    result: any;
    runTime: number;
    src: string;
    time: number;
    total: number;
    
    // methods
    clone(): Event;
    preventDefault(): void;
    remove(): void;
    set(props: Object): Event;
    stopImmediatePropagation(): void;
    stopPropagation(): void;
    toString(): string;
  }
  
  export class EventDispatcher {
    constructor();
    
    // methods
    addEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): Function;
    addEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): Function;
    addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): Object;
    addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): Object;
    dispatchEvent(eventObj: Object, target?: Object): boolean;
    dispatchEvent(eventObj: string, target?: Object): boolean;
    dispatchEvent(eventObj: Event, target?: Object): boolean;
    hasEventListener(type: string): boolean;
    static initialize(target: Object): void;
    off(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
    off(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
    off(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
    off(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
    off(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
    on(type: string, listener: (eventObj: Object) => boolean, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
    on(type: string, listener: (eventObj: Object) => void, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
    on(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
    on(type: string, listener: { handleEvent: (eventObj: Object) => void; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
    removeAllEventListeners(type?: string): void;
    removeEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
    removeEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
    removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
    removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
    removeEventListener(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
    toString(): string;
    willTrigger(type: string): boolean;
  }
  
  export function extend(subclass: () => any, superclass: () => any): () => any;     // returns the subclass prototype
  export function indexOf(array: any[], searchElement: Object): number;
  export function promote(subclass: () => any, prefix: string): () => any;
  
  export function proxy(method: (eventObj: Object) => boolean, scope: Object, ...arg: any[]): (eventObj: Object) => any;
  export function proxy(method: (eventObj: Object) => void, scope: Object, ...arg: any[]): (eventObj: Object) => any;
  export function proxy(method: { handleEvent: (eventObj: Object) => boolean; }, scope: Object, ...arg: any[]): (eventObj: Object) => any;
  export function proxy(method: { handleEvent: (eventObj: Object) => void; }, scope: Object, ...arg: any[]): (eventObj: Object) => any;
  
  export class AlphaMapFilter extends Filter {
    constructor(alphaMap: HTMLImageElement | HTMLCanvasElement);
    
    // properties
    alphaMap: HTMLImageElement | HTMLCanvasElement;
    
    // methods
    clone(): AlphaMapFilter;
  }
  
  export class AlphaMaskFilter extends Filter {
    constructor(mask: HTMLImageElement | HTMLCanvasElement);
    
    // properties
    mask: HTMLImageElement | HTMLCanvasElement;
    
    // methods
    clone(): AlphaMaskFilter;
  }
  
  
  export class Bitmap extends DisplayObject {
    constructor(imageOrUrl: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | Object | string);
    
    // properties
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    sourceRect: Rectangle;
    frames: any;
    
    // methods
    clone(): Bitmap;
  }
  
  export class BitmapCache {
    constructor();
    
    // properties
    cacheID: number;
    
    // methods
    static getFilterBounds(target: DisplayObject, output?: Rectangle): Rectangle;
    toString(): string;
    define(target: DisplayObject, x: number, y: number, width: number, height: number, scale?: number): void;
    update(compositeOperation?: string): void;
    release(): void;
    getCacheDataURL(): string;
    draw(ctx: CanvasRenderingContext2D): boolean;
  }
  
  export class ScaleBitmap extends DisplayObject {
    constructor(imageOrUrl: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | Object | string, scale9Grid: Rectangle);
    
    // properties
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    sourceRect: Rectangle;
    drawWidth: number;
    drawHeight: number;
    scale9Grid: Rectangle;
    snapToPixel: boolean;
    
    // methods
    setDrawSize (newWidth: number, newHeight: number): void;
    clone(): ScaleBitmap;
  }
  
  export class BitmapText extends DisplayObject {
    constructor(text?:string, spriteSheet?:SpriteSheet);
    
    static maxPoolSize: number;
    
    // properties
    letterSpacing: number;
    lineHeight: number;
    spaceWidth: number;
    spriteSheet: SpriteSheet;
    text: string;
  }
  
  export class BlurFilter extends Filter {
    constructor(blurX?: number, blurY?: number, quality?: number);
    
    // properties
    blurX: number;
    blurY: number;
    quality: number;
    
    // methods
    clone(): BlurFilter;
  }
  
  export class ButtonHelper {
    constructor(target: Sprite, outLabel?: string, overLabel?: string, downLabel?: string, play?: boolean, hitArea?: DisplayObject, hitLabel?: string);
    constructor(target: MovieClip, outLabel?: string, overLabel?: string, downLabel?: string, play?: boolean, hitArea?: DisplayObject, hitLabel?: string);
    
    // properties
    downLabel: string | number;
    outLabel: string | number;
    overLabel: string | number;
    play: boolean;
    target: MovieClip | Sprite;
    enabled: boolean;
    
    // methods
    /**
    * @deprecated - use the 'enabled' property instead
    */
    setEnabled(value: boolean): void;
    /**
    * @deprecated - use the 'enabled' property instead
    */
    getEnabled(): boolean;
    toString(): string;
  }
  
  export class ColorFilter extends Filter {
    constructor(redMultiplier?: number, greenMultiplier?: number, blueMultiplier?: number, alphaMultiplier?: number, redOffset?: number, greenOffset?: number, blueOffset?: number, alphaOffset?: number);
    
    // properties
    alphaMultiplier: number;
    alphaOffset: number;
    blueMultiplier: number;
    blueOffset: number;
    greenMultiplier: number;
    greenOffset: number;
    redMultiplier: number;
    redOffset: number;
    
    // methods
    clone(): ColorFilter;
  }
  
  export class ColorMatrix {
    constructor(brightness?: number, contrast?: number, saturation?: number, hue?: number);
    
    // methods
    adjustBrightness(value: number): ColorMatrix;
    adjustColor(brightness: number, contrast: number, saturation: number, hue: number): ColorMatrix;
    adjustContrast(value: number): ColorMatrix;
    adjustHue(value: number): ColorMatrix;
    adjustSaturation(value: number): ColorMatrix;
    clone(): ColorMatrix;
    concat(...matrix: number[]): ColorMatrix;
    concat(matrix: ColorMatrix): ColorMatrix;
    copy(...matrix: number[]): ColorMatrix;
    copy(matrix: ColorMatrix): ColorMatrix;
    reset(): ColorMatrix;
    setColor( brightness: number, contrast: number, saturation: number, hue: number ): ColorMatrix;
    toArray(): number[];
    toString(): string;
  }
  
  export class ColorMatrixFilter extends Filter {
    constructor(matrix: number[] | ColorMatrix);
    
    // properties
    matrix: number[] | ColorMatrix;
    
    // methods
    clone(): ColorMatrixFilter;
  }
  
  
  export class Container extends DisplayObject {
    constructor();
    
    // properties
    children: DisplayObject[];
    mouseChildren: boolean;
    numChildren: number;
    tickChildren: boolean;

    textLayer: any;

    stepToFrame(frame: any, andPlay?: any);
    
    // methods
    addChild<T extends DisplayObject>(child: T): T;
    addChild<T extends DisplayObject>(child0: DisplayObject, lastChild: T): T;
    addChild<T extends DisplayObject>(child0: DisplayObject, child1: DisplayObject, lastChild: T): T;
    addChild<T extends DisplayObject>(child0: DisplayObject, child1: DisplayObject, child2: DisplayObject, lastChild: T): T;
    addChild(...children: DisplayObject[]): DisplayObject;
    addChildAt<T extends DisplayObject>(child: T, index: number): T;
    addChildAt<T extends DisplayObject>(child0: DisplayObject, lastChild: T, index: number): T;
    addChildAt<T extends DisplayObject>(child0: DisplayObject, child1: DisplayObject, lastChild: T, index: number): T;
    addChildAt(...childOrIndex: (DisplayObject|number)[]): DisplayObject; // actually (...child: DisplayObject[], index: number)
    
    clone(recursive?: boolean): Container;
    contains(child: DisplayObject): boolean;
    getChildAt(index: number): DisplayObject;
    getChildByName(name: string): DisplayObject;
    getChildIndex(child: DisplayObject): number;
    /**
    * @deprecated - use numChildren property instead.
    */
    getNumChildren(): number;
    getObjectsUnderPoint(x: number, y: number, mode: number): DisplayObject[];
    getObjectUnderPoint(x: number, y: number, mode: number): DisplayObject;
    removeAllChildren(): void;
    removeChild(...child: DisplayObject[]): boolean;
    removeChildAt(...index: number[]): boolean;
    setChildIndex(child: DisplayObject, index: number): void;
    sortChildren(sortFunction: (a: DisplayObject, b: DisplayObject) => number): void;
    swapChildren(child1: DisplayObject, child2: DisplayObject): void;
    swapChildrenAt(index1: number, index2: number): void;
  }
  
  export class DisplayObject extends EventDispatcher {
    constructor();
    
    // properties
    alpha: number;
    bitmapCache: BitmapCache;
    cacheCanvas: HTMLCanvasElement | Object;
    cacheID: number;
    compositeOperation: string;
    cursor: string;
    filters: Filter[];
    hitArea: DisplayObject;
    id: number;
    mask: Shape;
    mouseEnabled: boolean;
    name: string;
    parent: Container;
    regX: number;
    regY: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
    shadow: Shadow;
    skewX: number;
    skewY: number;
    snapToPixel: boolean;
    stage: Stage;
    static suppressCrossDomainErrors: boolean;
    tickEnabled: boolean;
    transformMatrix: Matrix2D;
    visible: boolean;
    x: number;
    y: number;
    
    stepToFrame(frame: any, andPlay?: any);

    // methods
    cache(x: number, y: number, width: number, height: number, scale?: number): void;
    clone(): DisplayObject;
    draw(ctx: CanvasRenderingContext2D, ignoreCache?: boolean): boolean;
    getBounds(): Rectangle;
    getCacheDataURL(): string;
    getConcatenatedDisplayProps(props?: DisplayProps): DisplayProps;
    getConcatenatedMatrix(mtx?: Matrix2D): Matrix2D;
    getMatrix(matrix?: Matrix2D): Matrix2D;
    /**
    * @deprecated
    */
    getStage(): Stage;
    getTransformedBounds(): Rectangle;
    globalToLocal(x: number, y: number, pt?: Point | Object): Point;
    hitTest(x: number, y: number): boolean;
    isVisible(): boolean;
    localToGlobal(x: number, y: number, pt?: Point | Object): Point;
    localToLocal(x: number, y: number, target: DisplayObject, pt?: Point | Object): Point;
    set(props: Object): DisplayObject;
    setBounds(x: number, y: number, width: number, height: number): void;
    setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): DisplayObject;
    uncache(): void;
    updateCache(compositeOperation?: string): void;
    updateContext(ctx: CanvasRenderingContext2D): void;
  }
  
  export class DisplayProps {
    constructor(visible?: number, alpha?: number, shadow?: number, compositeOperation?: number, matrix?: number);
    
    // properties
    alpha: number;
    compositeOperation: string;
    matrix: Matrix2D;
    shadow: Shadow;
    visible: boolean;
    
    // methods
    append(visible: boolean, alpha: number, shadow: Shadow, compositeOperation: string, matrix?: Matrix2D): DisplayProps;
    clone(): DisplayProps;
    identity(): DisplayProps;
    prepend(visible: boolean, alpha: number, shadow: Shadow, compositeOperation: string, matrix?: Matrix2D): DisplayProps;
    setValues(visible?: boolean, alpha?: number, shadow?: number, compositeOperation?: number, matrix?: number): DisplayProps;
  }
  
  
  export class DOMElement extends DisplayObject {
    constructor(htmlElement: HTMLElement);
    
    // properties
    htmlElement: HTMLElement;
    
    // methods
    clone(): DisplayObject; // throw error
    set(props: Object): DOMElement;
    setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): DOMElement;
  }
  
  
  export class EaselJS {
    // properties
    static buildDate: string;
    static version: string;
  }
  
  export class Filter {
    constructor();
    
    // methods
    applyFilter(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, targetCtx?: CanvasRenderingContext2D, targetX?: number, targetY?: number): boolean;
    clone(): Filter;
    getBounds(): Rectangle;
    toString(): string;
  }
  
  export class Graphics {
    constructor();
    
    // properties
    static BASE_64: Object;
    static beginCmd: Graphics.BeginPath;
    command: Object;
    instructions: Object[]; // array of graphics command objects (Graphics.Fill, etc)
    static STROKE_CAPS_MAP: string[];
    static STROKE_JOINTS_MAP: string[];
    
    // methods
    append(command: Object, clean?: boolean): Graphics;
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): Graphics;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
    beginBitmapFill(image: Object, repetition?: string, matrix?: Matrix2D): Graphics;
    beginBitmapStroke(image: Object, repetition?: string): Graphics;
    beginFill(color: string): Graphics;
    beginLinearGradientFill(colors: string[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Graphics;
    beginLinearGradientStroke(colors: string[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Graphics;
    beginRadialGradientFill(colors: string[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Graphics;
    beginRadialGradientStroke(colors: string[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Graphics;
    beginStroke(color: string): Graphics;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): Graphics;
    clear(): Graphics;
    clone(): Graphics;
    closePath(): Graphics;
    curveTo(cpx: number, cpy: number, x: number, y: number): Graphics;
    decodePath(str: string): Graphics;
    draw(ctx: CanvasRenderingContext2D): void;
    drawAsPath(ctx: CanvasRenderingContext2D): void;
    drawCircle(x: number, y: number, radius: number): Graphics;
    drawEllipse(x: number, y: number, w: number, h: number): Graphics;
    drawPolyStar(x: number, y: number, radius: number, sides: number, pointSize: number, angle: number): Graphics;
    drawRect(x: number, y: number, w: number, h: number): Graphics;
    drawRoundRect(x: number, y: number, w: number, h: number, radius: number): Graphics;
    drawRoundRectComplex(x: number, y: number, w: number, h: number, radiusTL: number, radiusTR: number, radiusBR: number, radisBL: number): Graphics;
    endFill(): Graphics;
    endStroke(): Graphics;
    static getHSL(hue: number, saturation: number, lightness: number, alpha?: number): string;
    /**
    * @deprecated - use the instructions property instead
    */
    getInstructions(): Object[];
    static getRGB(r: number, g: number, b: number, alpha?: number): string;
    inject(callback: (data: any) => any,  data: any): Graphics; // deprecated
    isEmpty(): boolean;
    lineTo(x: number, y: number): Graphics;
    moveTo(x: number, y: number): Graphics;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): Graphics;
    rect(x: number, y: number, w: number, h: number): Graphics;
    setStrokeStyle(thickness: number, caps?: string | number, joints?: string | number, miterLimit?: number, ignoreScale?: boolean): Graphics;
    setStrokeDash(segments?: number[], offset?: number): Graphics;
    store(): Graphics;
    toString(): string;
    unstore(): Graphics;
    
    
    // tiny API - short forms of methods above
    a(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): Graphics;
    at(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
    bf(image: Object, repetition?: string, matrix?: Matrix2D): Graphics;
    bs(image: Object, repetition?: string): Graphics;
    f(color: string): Graphics;
    lf(colors: string[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Graphics;
    ls(colors: string[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Graphics;
    rf(colors: string[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Graphics;
    rs(colors: string[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Graphics;
    s(color: string): Graphics;
    bt(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): Graphics;
    c(): Graphics;
    cp(): Graphics;
    p(str: string): Graphics;
    dc(x: number, y: number, radius: number): Graphics;
    de(x: number, y: number, w: number, h: number): Graphics;
    dp(x: number, y: number, radius: number, sides: number, pointSize: number, angle: number): Graphics;
    dr(x: number, y: number, w: number, h: number): Graphics;
    rr(x: number, y: number, w: number, h: number, radius: number): Graphics;
    rc(x: number, y: number, w: number, h: number, radiusTL: number, radiusTR: number, radiusBR: number, radisBL: number): Graphics;
    ef(): Graphics;
    es(): Graphics;
    lt(x: number, y: number): Graphics;
    mt(x: number, y: number): Graphics;
    qt(cpx: number, cpy: number, x: number, y: number): Graphics;
    r(x: number, y: number, w: number, h: number): Graphics;
    ss(thickness: number, caps?: string | number, joints?: string | number, miterLimit?: number, ignoreScale?: boolean): Graphics;
    sd(segments?: number[], offset?: number): Graphics;
  }
  
  namespace Graphics
  {
    export class Arc
    {
      constructor(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: number);
      
      // properties
      anticlockwise: number;
      endAngle: number;
      radius: number;
      startAngle: number;
      x: number;
      y: number;
    }
    
    export class ArcTo
    {
      constructor(x1: number, y1: number, x2: number, y2: number, radius: number);
      
      // properties
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      radius: number;
    }
    
    export class BeginPath
    {
      
    }
    
    export class BezierCurveTo
    {
      constructor(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number);
      
      // properties
      cp1x: number;
      cp1y: number;
      cp2x: number;
      cp2y: number;
      x: number;
      y: number;
    }
    
    export class Circle
    {
      constructor(x: number, y: number, radius: number);
      
      // properties
      x: number;
      y: number;
      radius: number;
    }
    
    export class ClosePath
    {
      
    }
    
    export class Fill
    {
      constructor(style: Object, matrix?: Matrix2D);
      
      // properties
      style: Object;
      matrix: Matrix2D;
      
      // methods
      bitmap(image: HTMLImageElement, repetition?: string): Fill;
      linearGradient(colors: number[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Fill;
      radialGradient(colors: number[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Fill;
    }
    
    export class LineTo
    {
      constructor(x: number, y: number);
      
      // properties
      x: number;
      y: number;
    }
    
    export class MoveTo
    {
      constructor(x: number, y: number);
      
      x: number;
      y: number;
    }
    
    export class PolyStar
    {
      constructor(x: number, y: number, radius: number, sides: number, pointSize: number, angle: number);
      
      // properties
      angle: number;
      pointSize: number;
      radius: number;
      sides: number;
      x: number;
      y: number;
    }
    
    export class QuadraticCurveTo
    {
      constructor(cpx: number, cpy: number, x: number, y: number);
      
      // properties
      cpx: number;
      cpy: number;
      x: number;
      y: number;
    }
    
    export class Rect
    {
      constructor(x: number, y: number, w: number, h: number);
      
      // properties
      x: number;
      y: number;
      w: number;
      h: number;
    }
    
    export class RoundRect
    {
      constructor(x: number, y: number, w: number, h: number, radiusTL: number, radiusTR: number, radiusBR: number, radiusBL: number);
      
      // properties
      x: number;
      y: number;
      w: number;
      h: number;
      radiusTL: number;
      radiusTR: number;
      radiusBR: number;
      radiusBL: number;
    }
    
    export class Stroke
    {
      constructor(style: Object, ignoreScale: boolean);
      
      // properties
      style: Object;
      ignoreScale: boolean;
      
      // methods
      bitmap(image: HTMLImageElement, repetition?: string): Stroke;
      linearGradient(colors: number[], ratios: number[], x0: number, y0: number, x1: number, y1: number): Stroke;
      radialGradient(colors: number[], ratios: number[], x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): Stroke;
    }
    
    export class StrokeStyle
    {
      constructor(width: number, caps: string, joints: number, miterLimit: number);
      
      // properties
      caps: string;
      joints: string;
      miterLimit: number;
      width: number;
    }
  }
  
  
  
  export class Matrix2D {
    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
    
    // properties
    a: number;
    b: number;
    c: number;
    d: number;
    static DEG_TO_RAD: number;
    static identity: Matrix2D;
    tx: number;
    ty: number;
    
    // methods
    append(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix2D;
    appendMatrix(matrix: Matrix2D): Matrix2D;
    appendTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX?: number, regY?: number): Matrix2D;
    clone(): Matrix2D;
    copy(matrix: Matrix2D): Matrix2D;
    decompose(): {x: number; y: number; scaleX: number; scaleY: number; rotation: number; skewX: number; skewY: number};
    decompose(target: Object): Matrix2D;
    equals(matrix: Matrix2D): boolean;
    identity(): Matrix2D;
    invert(): Matrix2D;
    isIdentity(): boolean;
    prepend(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix2D;
    prependMatrix(matrix: Matrix2D): Matrix2D;
    prependTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX?: number, regY?: number): Matrix2D;
    rotate(angle: number): Matrix2D;
    scale(x: number, y: number): Matrix2D;
    setValues(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number): Matrix2D;
    skew(skewX: number, skewY: number): Matrix2D;
    toString(): string;
    transformPoint(x: number, y: number, pt?: Point | Object): Point;
    translate(x: number, y: number): Matrix2D;
  }
  
  
  export class MouseEvent extends Event {
    constructor(type: string, bubbles: boolean, cancelable: boolean, stageX: number, stageY: number, nativeEvent: NativeMouseEvent, pointerID: number, primary: boolean, rawX: number, rawY: number);
    
    // properties
    isTouch: boolean;
    localX: number;
    localY: number;
    nativeEvent: NativeMouseEvent;
    pointerID: number;
    primary: boolean;
    rawX: number;
    rawY: number;
    relatedTarget: DisplayObject;
    stageX: number;
    stageY: number;
    mouseMoveOutside: boolean;
    
    // methods
    clone(): MouseEvent;
    
    // EventDispatcher mixins
    addEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): Function;
    addEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): Function;
    addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): Object;
    addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): Object;
    dispatchEvent(eventObj: Object | string | Event, target?: Object): boolean;
    hasEventListener(type: string): boolean;
    off(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
    off(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
    off(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
    off(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
    off(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
    on(type: string, listener: (eventObj: Object) => boolean, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
    on(type: string, listener: (eventObj: Object) => void, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
    on(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
    on(type: string, listener: { handleEvent: (eventObj: Object) => void; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
    removeAllEventListeners(type?: string): void;
    removeEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
    removeEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
    removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
    removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
    removeEventListener(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
    toString(): string;
    willTrigger(type: string): boolean;
  }
  
  
  export class MovieClip extends Container {
    constructor(mode?: string, startPosition?: number, loop?: boolean, labels?: Object);
    
    // properties
    actionsEnabled: boolean;
    autoReset: boolean;
    static buildDate: string;
    currentFrame: number;
    totalFrames: number;
    currentLabel: string;
    frameBounds: Rectangle[];
    framerate: number;
    static INDEPENDENT: string;
    labels: Object[];
    loop: boolean;
    mode: string;
    paused: boolean;
    static SINGLE_FRAME: string;
    startPosition: number;
    static SYNCHED: string;
    timeline: Timeline;
    duration: number;
    static version: string;
    
    // methods
    advance(time?: number): void;
    clone(): MovieClip; // not supported
    /**
    * @deprecated - use 'currentLabel' property instead
    */
    getCurrentLabel(): string;  // deprecated
    /**
    * @deprecated - use 'labels' property instead
    */
    getLabels(): Object[];
    gotoAndPlay(positionOrLabel: string | number): void;
    gotoAndStop(positionOrLabel: string | number): void;
    play(): void;
    stop(): void;
  }
  
  export class MovieClipPlugin {
    // methods
    tween(tween: Tween, prop: string, value: string | number | boolean, startValues: any[], endValues: any[], ratio: number, wait: Object, end: Object): void;
  }
  
  export class Point {
    constructor(x?: number, y?: number);
    
    // properties
    x: number;
    y: number;
    
    // methods
    clone(): Point;
    copy(point: Point): Point;
    setValues(x?: number, y?: number): Point;
    toString(): string;
  }
  
  export class Rectangle {
    constructor(x?: number, y?: number, width?: number, height?: number);
    
    // properties
    height: number;
    width: number;
    x: number;
    y: number;
    
    // methods
    clone(): Rectangle;
    contains(x: number, y: number, width?: number, height?: number): boolean;
    copy(rectangle: Rectangle): Rectangle;
    extend(x: number, y: number, width?: number, height?: number): Rectangle;
    intersection(rect: Rectangle): Rectangle;
    intersects(rect: Rectangle): boolean;
    isEmpty(): boolean;
    pad(top: number, left: number, bottom: number, right: number): Rectangle;
    setValues(x?: number, y?: number, width?: number, height?: number): Rectangle;
    toString(): string;
    union(rect: Rectangle): Rectangle;
  }
  
  
  export class Shadow {
    constructor(color: string, offsetX: number, offsetY: number, blur: number);
    
    // properties
    blur: number;
    color: string;
    static identity: Shadow;
    offsetX: number;
    offsetY: number;
    
    // methods
    clone(): Shadow;
    toString(): string;
  }
  
  
  export class Shape extends DisplayObject {
    constructor(graphics?: Graphics);
    
    // properties
    graphics: Graphics;
    __width: number;
    __height: number;
    height: number;

    // methods
    clone(recursive?: boolean): Shape;
    set(props: Object): Shape;
    setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): Shape;
  }
  
  
  export class Sprite extends DisplayObject {
    constructor(spriteSheet: SpriteSheet, frameOrAnimation?: string | number);
    
    // properties
    currentAnimation: string;
    currentAnimationFrame: number;
    currentFrame: number;
    framerate: number;
    /**
    * @deprecated
    */
    offset: number;
    paused: boolean;
    spriteSheet: SpriteSheet;
    
    // methods
    advance(time?: number): void;
    clone(): Sprite;
    getBounds(): Rectangle;
    gotoAndPlay(frameOrAnimation: string | number): void;
    gotoAndStop(frameOrAnimation: string | number): void;
    play(): void;
    set(props: Object): Sprite;
    setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): Sprite;
    stop(): void;
    
  }
  
  export class SpriteContainer extends Container
  {
    constructor(spriteSheet?: SpriteSheet);
    
    spriteSheet: SpriteSheet;
  }
  
  // what is returned from SpriteSheet.getAnimation(string)
  interface SpriteSheetAnimation {
    frames: number[];
    speed: number;
    name: string;
    next: string;
  }
  
  // what is returned from SpriteSheet.getFrame(number)
  interface SpriteSheetFrame {
    image: HTMLImageElement;
    rect: Rectangle;
  }
  
  export class SpriteSheet extends EventDispatcher {
    constructor(data: Object);
    
    // properties
    animations: string[];
    complete: boolean;
    framerate: number;
    
    // methods
    clone(): SpriteSheet;
    getAnimation(name: string): SpriteSheetAnimation;
    /**
    * @deprecated - use the 'animations' property instead
    */
    getAnimations(): string[];
    getFrame(frameIndex: number): SpriteSheetFrame;
    getFrameBounds(frameIndex: number, rectangle?: Rectangle): Rectangle;
    getNumFrames(animation: string): number;
  }
  
  
  export class SpriteSheetBuilder extends EventDispatcher {
    constructor();
    
    // properties
    maxHeight: number;
    maxWidth: number;
    padding: number;
    progress: number;
    scale: number;
    spriteSheet: SpriteSheet;
    timeSlice: number;
    
    // methods
    addAnimation(name: string, frames: number[], next?: string|boolean, frequency?: number): void;
    addFrame(source: DisplayObject, sourceRect?: Rectangle, scale?: number, setupFunction?: () => any, setupData?: Object): number;
    addMovieClip(source: MovieClip, sourceRect?: Rectangle, scale?: number, setupFunction?: () => any, setupData?: Object, labelFunction?: () => any): void;
    build(): SpriteSheet;
    buildAsync(timeSlice?: number): void;
    clone(): void; // throw error
    stopAsync(): void;
  }
  
  export class SpriteSheetUtils {
    /**
    * @deprecated
    */
    static addFlippedFrames(spriteSheet: SpriteSheet, horizontal?: boolean, vertical?: boolean, both?: boolean): void; // deprecated
    static extractFrame(spriteSheet: SpriteSheet, frameOrAnimation: number | string): HTMLImageElement;
    /**
    * @deprecated
    */
    static mergeAlpha(rgbImage: HTMLImageElement, alphaImage: HTMLImageElement, canvas?: HTMLCanvasElement): HTMLCanvasElement; // deprecated
  }
  
  export class SpriteStage extends Stage
  {
    constructor(canvas: HTMLCanvasElement | string, preserveDrawingBuffer?: boolean, antialias?: boolean);
    
    // properties
    static INDICES_PER_BOX: number;
    isWebGL: boolean;
    static MAX_BOXES_POINTS_INCREMENT: number;
    static MAX_INDEX_SIZE: number;
    static NUM_VERTEX_PROPERTIES: number;
    static NUM_VERTEX_PROPERTIES_PER_BOX: number;
    static POINTS_PER_BOX: number;
    
    // methods
    clearImageTexture(image: Object): void;
    updateViewport(width: number, height: number): void;
  }
  
  export class Stage extends Container {
    constructor(canvas: HTMLCanvasElement | string | Object);
    
    // properties
    autoClear: boolean;
    canvas: HTMLCanvasElement | Object;
    drawRect: Rectangle;
    handleEvent: Function;
    mouseInBounds: boolean;
    mouseMoveOutside: boolean;
    mouseX: number;
    mouseY: number;
    nextStage: Stage;
    /**
    * @deprecated
    */
    preventSelection: boolean;
    snapToPixelEnabled: boolean;  // deprecated
    tickOnUpdate: boolean;
    
    // methods
    clear(): void;
    clone(): Stage;
    enableDOMEvents(enable?: boolean): void;
    enableMouseOver(frequency?: number): void;
    tick(props?: Object): void;
    toDataURL(backgroundColor: string, mimeType: string): string;
    update(...arg: any[]): void;
    
  }
  
  interface IStageGLOptions {
    preserveBuffer?: boolean;
    antialias?: boolean;
    transparent?: boolean;
    premultiply?: boolean;
    autoPurge?: number;
  }
  
  export class StageGL extends Stage {
    constructor(canvas: HTMLCanvasElement | string | Object, options?: IStageGLOptions);
    
    // properties
    static VERTEX_PROPERTY_COUNT: number;
    static INDICIES_PER_CARD: number;
    static DEFAULT_MAX_BATCH_SIZE: number;
    static WEBGL_MAX_INDEX_NUM: number;
    static UV_RECT: number;
    static COVER_VERT: Float32Array;
    static COVER_UV: Float32Array;
    static COVER_UV_FLIP: Float32Array;
    static REGULAR_VARYING_HEADER: string;
    static REGULAR_VERTEX_HEADER: string;
    static REGULAR_FRAGMENT_HEADER: string;
    static REGULAR_VERTEX_BODY: string;
    static REGULAR_FRAGMENT_BODY: string;
    static REGULAR_FRAG_COLOR_NORMAL: string;
    static REGULAR_FRAG_COLOR_PREMULTIPLY: string;
    static PARTICLE_VERTEX_BODY: string;
    static PARTICLE_FRAGMENT_BODY: string;
    static COVER_VARYING_HEADER: string;
    static COVER_VERTEX_HEADER: string;
    static COVER_FRAGMENT_HEADER: string;
    static COVER_VERTEX_BODY: string;
    static COVER_FRAGMENT_BODY: string;
    isWebGL: boolean;
    autoPurge: number;
    vocalDebug: boolean;
    
    // methods
    static buildUVRects(spritesheet: SpriteSheet, target?: number, onlyTarget?: boolean): Object;
    static isWebGLActive(ctx: CanvasRenderingContext2D): boolean;
    cacheDraw(target: DisplayObject, filters: Filter[], manager: BitmapCache): boolean;
    getBaseTexture(w?: number, h?: number): WebGLTexture | null;
    getFilterShader(filter: Filter | Object): WebGLProgram;
    getRenderBufferTexture (w: number, h: number): WebGLTexture;
    getTargetRenderTexture (target: DisplayObject, w: number, h: number): Object;
    protectTextureSlot(id: number, lock?: boolean): void;
    purgeTextures(count?: number): void;
    releaseTexture(item: DisplayObject | WebGLTexture | HTMLImageElement | HTMLCanvasElement): void;
    setTextureParams(gl: WebGLRenderingContext, isPOT?: boolean): void;
    updateSimultaneousTextureCount(count?: number): void;
    updateViewport(width: number, height: number): void;
  }
  
  
  export class Text extends DisplayObject {
    constructor(text?: string, font?: string, color?: string);
    
    // properties
    color: string;
    font: string;
    lineHeight: number;
    lineWidth: number;
    maxWidth: number;
    outline: number;
    text: string;
    textAlign: string;
    textBaseline: string;
    offset: any;
    
    // methods
    clone(): Text;
    getMeasuredHeight(): number;
    getMeasuredLineHeight(): number;
    getMeasuredWidth(): number;
    getMetrics(): Object;
    set(props: Object): Text;
    setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): Text;
  }
  
  export class Ticker {
    // properties
    static framerate: number;
    static interval: number;
    static maxDelta: number;
    static paused: boolean;
    static RAF: string;
    static RAF_SYNCHED: string;
    static TIMEOUT: string;
    static timingMode: string;
    /**
    * @deprecated
    */
    static useRAF: boolean;
    
    // methods
    static getEventTime(runTime?: boolean): number;
    /**
    * @deprecated - use the 'framerate' property instead
    */
    static getFPS(): number;
    /**
    * @deprecated - use the 'interval' property instead
    */
    static getInterval(): number;
    static getMeasuredFPS(ticks?: number): number;
    static getMeasuredTickTime(ticks?: number): number;
    /**
    * @deprecated - use the 'paused' property instead
    */
    static getPaused(): boolean;
    static getTicks(pauseable?: boolean): number;
    static getTime(runTime?: boolean): number;
    static init(): void;
    static reset(): void;
    /**
    * @deprecated - use the 'framerate' property instead
    */
    static setFPS(value: number): void;
    /**
    * @deprecated - use the 'interval' property instead
    */
    static setInterval(interval: number): void;
    /**
    * @deprecated - use the 'paused' property instead
    */
    static setPaused(value: boolean): void;
    
    // EventDispatcher mixins
    static addEventListener(type: string, listener: Stage, useCapture?: boolean): Stage;
    static addEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): Function;
    static addEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): Function;
    static addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): Object;
    static addEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): Object;
    static dispatchEvent(eventObj: Object | string | Event, target?: Object): boolean;
    static hasEventListener(type: string): boolean;
    static off(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
    static off(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
    static off(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
    static off(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
    static off(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
    static on(type: string, listener: (eventObj: Object) => boolean, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
    static on(type: string, listener: (eventObj: Object) => void, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Function;
    static on(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
    static on(type: string, listener: { handleEvent: (eventObj: Object) => void; }, scope?: Object, once?: boolean, data?: any, useCapture?: boolean): Object;
    static removeAllEventListeners(type?: string): void;
    static removeEventListener(type: string, listener: (eventObj: Object) => boolean, useCapture?: boolean): void;
    static removeEventListener(type: string, listener: (eventObj: Object) => void, useCapture?: boolean): void;
    static removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => boolean; }, useCapture?: boolean): void;
    static removeEventListener(type: string, listener: { handleEvent: (eventObj: Object) => void; }, useCapture?: boolean): void;
    static removeEventListener(type: string, listener: Function, useCapture?: boolean): void; // It is necessary for "arguments.callee"
    static toString(): string;
    static willTrigger(type: string): boolean;
  }
  
  export class TickerEvent {
    // properties
    target: Object;
    type: string;
    paused: boolean;
    delta: number;
    time: number;
    runTime: number;
  }
  
  export class Touch {
    // methods
    static disable(stage: Stage): void;
    static enable(stage: Stage, singleTouch?: boolean, allowDefault?: boolean): boolean;
    static isSupported(): boolean;
  }
  
  export class UID {
    // methods
    static get(): number;
  }
  
  export class CSSPlugin {
    constructor();
    
    // properties
    static cssSuffixMap: Object;
    
    // methods
    static install(): void;
  }
  
  export class Ease {
    // methods
    static backIn: (amount: number) => number;
    static backInOut: (amount: number) => number;
    static backOut: (amount: number) => number;
    static bounceIn: (amount: number) => number;
    static bounceInOut: (amount: number) => number;
    static bounceOut: (amount: number) => number;
    static circIn: (amount: number) => number;
    static circInOut: (amount: number) => number;
    static circOut: (amount: number) => number;
    static cubicIn: (amount: number) => number;
    static cubicInOut: (amount: number) => number;
    static cubicOut: (amount: number) => number;
    static elasticIn: (amount: number) => number;
    static elasticInOut: (amount: number) => number;
    static elasticOut: (amount: number) => number;
    static get(amount: number): (amount: number) => number;
    static getBackIn(amount: number): (amount: number) => number;
    static getBackInOut(amount: number): (amount: number) => number;
    static getBackOut(amount: number): (amount: number) => number;
    static getElasticIn(amplitude: number, period: number): (amount: number) => number;
    static getElasticInOut(amplitude: number, period: number): (amount: number) => number;
    static getElasticOut(amplitude: number, period: number): (amount: number) => number;
    static getPowIn(pow: number): (amount: number) => number;
    static getPowInOut(pow: number): (amount: number) => number;
    static getPowOut(pow: number): (amount: number) => number;
    static linear: (amount: number) => number;
    static none: (amount: number) => number;    // same as linear
    static quadIn: (amount: number) => number;
    static quadInOut: (amount: number) => number;
    static quadOut: (amount: number) => number;
    static quartIn: (amount: number) => number;
    static quartInOut: (amount: number) => number;
    static quartOut: (amount: number) => number;
    static quintIn: (amount: number) => number;
    static quintInOut: (amount: number) => number;
    static quintOut: (amount: number) => number;
    static sineIn: (amount: number) => number;
    static sineInOut: (amount: number) => number;
    static sineOut: (amount: number) => number;
  }
  
  export class MotionGuidePlugin {
    constructor();
    
    //methods
    static install(): Object;
  }
  
  /*
  NOTE: It is commented out because it conflicts with SamplePlugin Class of PreloadJS.
  this class is mainly for documentation purposes.
  http://www.createjs.com/Docs/TweenJS/classes/SamplePlugin.html
  */
  /*
  export class SamplePlugin {
    constructor();
    
    // properties
    static priority: any;
    
    //methods
    static init(tween: Tween, prop: string, value: any): any;
    static step(tween: Tween, prop: string, startValue: any, injectProps: Object, endValue: any): void;
    static install(): void;
    static tween(tween: Tween, prop: string, value: any, startValues: Object, endValues: Object, ratio: number, wait: boolean, end: boolean): any;
  }
  */
  
  export class Timeline extends EventDispatcher {
    constructor (tweens: Tween[], labels: Object, props: Object);
    
    // properties
    duration: number;
    ignoreGlobalPause: boolean;
    loop: boolean;
    position: Object;
    
    // methods
    addLabel(label: string, position: number): void;
    addTween(...tween: Tween[]): void;
    getCurrentLabel(): string;
    getLabels(): Object[];
    gotoAndPlay(positionOrLabel: string | number): void;
    gotoAndStop(positionOrLabel: string | number): void;
    removeTween(...tween: Tween[]): void;
    resolve(positionOrLabel: string | number): number;
    setLabels(o: Object): void;
    setPaused(value: boolean): void;
    setPosition(value: number, actionsMode?: number): boolean;
    tick(delta: number): void;
    updateDuration(): void;
  }
  
  
  export class Tween extends EventDispatcher {
    constructor(target: Object, props?: Object, pluginData?: Object);
    
    // properties
    duration: number;
    static IGNORE: Object;
    ignoreGlobalPause: boolean;
    static LOOP: number;
    loop: boolean;
    static NONE: number;
    onChange: Function; // deprecated
    passive: boolean;
    pluginData: Object;
    position: number;
    static REVERSE: number;
    target: Object;
    
    // methods
    call(callback: (tweenObject: Tween) => any, params?: any[], scope?: Object): Tween;    // when 'params' isn't given, the callback receives a tweenObject
    call(callback: (...params: any[]) => any, params?: any[], scope?: Object): Tween; // otherwise, it receives the params only
    static get(target: Object, props?: Object, pluginData?: Object, override?: boolean): Tween;
    static hasActiveTweens(target?: Object): boolean;
    static installPlugin(plugin: Object, properties: any[]): void;
    pause(tween: Tween): Tween;
    play(tween: Tween): Tween;
    static removeAllTweens(): void;
    static removeTweens(target: Object): void;
    set(props: Object, target?: Object): Tween;
    setPaused(value: boolean): Tween;
    setPosition(value: number, actionsMode: number): boolean;
    static tick(delta: number, paused: boolean): void;
    tick(delta: number): void;
    to(props: Object, duration?: number, ease?: (t: number) => number): Tween;
    wait(duration: number, passive?: boolean): Tween;
    
  }
  
  export class TweenJS {
    // properties
    static buildDate: string;
    static version: string;
  }
}