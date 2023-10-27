export class Options {
    particleRadius: number
    gravity: number
    precalc: {
        radiusFactor: number,
        circleAngle: number
    }
    timeSpeedCoefficient: number
    targetFrameTime: number
    friction: number
    debug: boolean
    private static _instance?: Options

    //FIXME: добавить возможность настраивать вещи налету
    constructor({ debug } : { debug?: boolean }) {
        if (Options._instance) {
            return Options._instance
        }
        Options._instance = this
        this.particleRadius = 20
        this.gravity = 9.8
        this.precalc = {
            radiusFactor: this.particleRadius / (this.particleRadius + this.particleRadius),
            circleAngle: 2 * Math.PI
        }
        this.timeSpeedCoefficient = 30
        this.targetFrameTime = 1000 / 60
        this.friction = 0.90
        this.debug = !!debug
    }
}
