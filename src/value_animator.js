export class ValueAnimator {

    static currentTimeMillsecond = () => {
        if (typeof performance === "undefined") {
            return new Date().getTime()
        }
        return performance.now()
    }

    constructor() {
        this.canvas = undefined;
        this.startValue = 0
        this.endValue = 0
        this.duration = 0
        this.loops = 1
        this.fillRule = 0
        this.mRunning = false
        this.mStartTime = 0
        this.mCurrentFrication = 0.0
        this.mReverse = false
    }

    onStart = () => { }
    onUpdate = () => { }
    onEnd = () => { }

    start(currentValue = undefined) {
        this.doStart(false, currentValue)
    }

    reverse(currentValue = undefined) {
        this.doStart(true, currentValue)
    }

    stop() {
        this.doStop()
    }

    animatedValue() {
        return ((this.endValue - this.startValue) * this.mCurrentFrication) + this.startValue
    }

    doStart(reverse, currentValue = undefined) {
        this.mReverse = reverse
        this.mRunning = true
        this.mStartTime = ValueAnimator.currentTimeMillsecond()
        if (currentValue) {
            if (reverse) {
                this.mStartTime -= (1.0 - currentValue / (this.endValue - this.startValue)) * this.duration
            }
            else {
                this.mStartTime -= currentValue / (this.endValue - this.startValue) * this.duration
            }
        }
        this.mCurrentFrication = 0.0
        this.onStart()
        this.doFrame()
    }

    doStop() {
        this.mRunning = false
    }

    doFrame() {

        const renderLoop = () => {
            if (!this.mRunning) return;
            this.doDeltaTime(ValueAnimator.currentTimeMillsecond() - this.mStartTime)
            this.canvas.requestAnimationFrame(renderLoop)
          }
          this.canvas.requestAnimationFrame(renderLoop)

        // if (this.mRunning) {
        //     this.doDeltaTime(ValueAnimator.currentTimeMillsecond() - this.mStartTime)
        //     if (this.mRunning && this.canvas !== undefined) {
        //         this.canvas.requestAnimationFrame(this.doFrame.bind(this))
        //     }
        // }
    }

    doDeltaTime(deltaTime) {
        if (deltaTime >= this.duration * this.loops) {
            this.mCurrentFrication = this.fillRule === 1 ? 0.0 : 1.0
            this.mRunning = false
        }
        else {
            this.mCurrentFrication = (deltaTime % this.duration) / this.duration
            if (this.mReverse) {
                this.mCurrentFrication = 1.0 - this.mCurrentFrication
            }
        }
        this.onUpdate(this.animatedValue())
        if (this.mRunning === false) {
            this.onEnd()
        }
    }

}