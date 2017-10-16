export as namespace SVGA;

export class VideoEntity {
    videoSize: { width: number, height: number }
    FPS: number
    frames: number
}

export class Parser {
    load(url: string, success: (videoItem: VideoEntity) => void, failure?: (err: Error) => void): void
}

export class Player {

    loops: number;
    clearsAfterStop: boolean;

    constructor(canvas: string | HTMLCanvasElement | HTMLDivElement)
    setVideoItem(videoItem: VideoEntity): void
    setContentMode(contentMode: "Fill" | "AspectFill" | "AspectFit"): void
    setClipsToBounds(clipsToBounds: boolean): void
    startAnimation(): void
    pauseAnimation(): void
    stopAnimation(clear?: boolean): void
    clear(): void
    stepToFrame(frame: number, andPlay: boolean): void
    stepToPercentage(percentage: number, andPlay: boolean): void
    setImage(urlORbase64: string, forKey: string, transform: number[]): void
    setText(textORMap: string | {
        text: string,
        size?: string,
        family?: string,
        color?: string,
        offset?: { x: number, y: number }
    }, forKey: string): void
    clearDynamicObjects(): void
    onFinished(callback: () => void): void
    onFrame(callback: () => void): void
    onPercentage(callback: () => void): void
    drawOnContext(ctx: CanvasRenderingContext2D, x: number, y: number, width?: number, height?: number): void

}

export class createjs {

    static Player: typeof createjsPlayer

}

export class createjsPlayer extends Player {

    constructor(url: string, autoplay?: boolean)
    onError(callback: (error: Error) => void): void

}