export class Options {
    particleRadius: number
    gravity: number
    precalc: {
        radiusFactor: number,
        circleAngle: number
    }
    timeSpeedCoefficient: number
    friction: number
    debug: boolean
    physicsIterations: number
    private static _instance?: Options

    //FIXME: добавить возможность настраивать вещи налету
    constructor({ debug } : { debug?: boolean }) {
        if (Options._instance) {
            return Options._instance
        }
        Options._instance = this
        this.particleRadius = 5
        this.gravity = 9.8
        this.precalc = {
            radiusFactor: this.particleRadius / (this.particleRadius + this.particleRadius),
            circleAngle: 2 * Math.PI
        }
        //FIXME: this is basically a magic number and i have no idea why it works
        this.timeSpeedCoefficient = 1100
        this.physicsIterations = 10
        this.friction = 0.90
        this.debug = !!debug
    }
}
