import { Obstacle, Particle } from '../types/common'
import { Vec2 } from './Vector2'

export class EntityManager {
    readonly particles: Particle[]
    readonly obstacles: Obstacle[]
    private static _instance?: EntityManager

    constructor() {
        if (EntityManager._instance) {
            return EntityManager._instance
        }
        EntityManager._instance = this
        this.particles = []
        this.obstacles = []
    }

    addParticle = (x: number, y: number, xv: number, yv: number) => {
        this.particles.push({
            position: Vec2.new(x, y),
            velocity: Vec2.new(xv, yv),
            relativeVelocity: Vec2.new(0, 0)
        })
    }

    //TODO: add possibility to create diagonal obstacles
    addObstacle = (x: number, y: number, w: number, h: number, nx = 0, ny = 0) => {
        this.obstacles.push({
            data: [ x, y, w, h ],
            normal: Vec2.new(nx, ny)
        })
    }
}
