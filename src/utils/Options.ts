export class Options {
    gravity: number
    precalc: { circleAngle: number }
    timeSpeedCoefficient: number
    friction: number
    debug: boolean
    physicsIterations: number
    physicsGridResolution: number
    private static _instance?: Options

    //FIXME: добавить возможность настраивать вещи налету
    constructor({ debug } : { debug?: boolean }) {
        if (Options._instance) {
            return Options._instance
        }
        Options._instance = this
        this.gravity = 9.8
        this.precalc = { circleAngle: 2 * Math.PI }
        this.timeSpeedCoefficient = 1
        this.physicsIterations = 8
        this.physicsGridResolution = 40
        this.friction = 0.90
        this.debug = !!debug
    }
}
