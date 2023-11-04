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

    addParticle = (props: Omit<Partial<Particle>, 'id'>) => {
        this.particles.push({
            id: this.particles.length,
            mass: props.mass ?? 1,
            radius: props.radius ?? 5,
            color: props.color ?? 'blue',
            position: props.position ?? Vec2.new(0, 0),
            velocity: props.velocity ?? Vec2.new(0, 0),
            relativeVelocity: Vec2.new(0, 0),
        })
    }

    //TODO: add possibility to create diagonal obstacles
    addObstacle = (x: number, y: number, w: number, h: number) => {
        this.obstacles.push({
            data: [ x, y, w, h ],
        })
    }
}
