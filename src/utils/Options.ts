export class Options {
    gravity: number
    precalc: { circleAngle: number }
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
        this.gravity = 9.8
        this.precalc = { circleAngle: 2 * Math.PI }
        //FIXME: this is basically a magic number and i have no idea why it works
        this.timeSpeedCoefficient = 1
        this.physicsIterations = 10
        this.friction = 0.90
        this.debug = !!debug
    }
}
