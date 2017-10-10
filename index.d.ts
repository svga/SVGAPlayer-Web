export as namespace SVGA;

export class VideoEntity {
    videoSize: { width: number, height: number }
    FPS: number
    frames: number
}

export class Parser {
    load(url: string, success: (videoItem: VideoEntity) => void, failure: (err: Error) => void): void
}

export class Player {
    constructor(canvas: string | HTMLCanvasElement)
    setVideoItem(videoItem: VideoEntity): void
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
}