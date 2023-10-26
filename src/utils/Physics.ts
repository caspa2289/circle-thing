import { Particle, Vector2 } from '../types/common'
import { Vec2 } from './Vector2'
import { Options } from './Options'
import { App } from './App'
import { EntityManager } from './EntityManager'

export class Physics {
    static prepareFrame(entityManager: EntityManager, options: Options, app: App) {
        for (let i = 0; i < entityManager.particles.length; i++) {

            const {
                position,
                velocity,
                relativeVelocity
            } = this._resolveParticleCollisions(i, entityManager.particles, options, app)

            const newPosition = {
                x: position.x + relativeVelocity.x,
                y: position.y + relativeVelocity.y
            }
            const newVelocity = {
                x: velocity.x,
                y: velocity.y + options.gravity
            }
            const newRelativeVelocity = Physics.getRelativeVelocity(newVelocity, app)

            entityManager.particles[i] = {position: newPosition, velocity: newVelocity, relativeVelocity: newRelativeVelocity}
        }
    }

    private static _resolveParticleCollisions(
        particleIndex: number,
        particles: Particle[],
        options: Options,
        app: App
    ): Particle {
        const { position, velocity, relativeVelocity } = particles[particleIndex]

        //FIXME: потереть
        // eslint-disable-next-line prefer-const
        let [ newPosition, newVelocity, newRelativeVelocity ] = [ position, velocity, relativeVelocity ]

        for (let i = 0; i < particles.length; i++) {
            if (i === particleIndex) continue

            const {
                position: cPosition,
                // velocity: cVelocity,
                // relativeVelocity: cRelativeVelocity
            } = particles[i]

            //check collision
            const d1 = newPosition.x - cPosition.x
            const d2 = newPosition.y - cPosition.y
            //FIXME: они разъезжаются на маке, потому что коллижен считается два раза для первой сферы
            //TODO: проверить, сохранилось ли это с введением DELTA_TIME
            const centerDistance = Math.sqrt(d1 * d1 + d2 * d2)

            if (centerDistance < options.particleRadius * 2) {
                //if collided, find collision point
                const collisionPoint = Vec2.add(
                    Vec2.multiplyScalar(newPosition, options.precalc.radiusFactor),
                    Vec2.multiplyScalar(cPosition, options.precalc.radiusFactor)
                )

                //reflected vector for current sphere
                //FIXME: тут velocity надо брать соответствующее (newVelocity для текущей сферы и cVelocity для другой)
                const reflectedVector1 = Vec2.reflectFromPoint(collisionPoint, cPosition, velocity)
                //reflected vector for another sphere
                const reflectedVector2 = (collisionPoint, newPosition, velocity)

                //FIXME: надо устранять коллижены, если они есть. Попробовать интерполяцию
                // newPosition = newPosition
                newVelocity = reflectedVector1
                newRelativeVelocity = Physics.getRelativeVelocity(reflectedVector1, app)

                particles[i] = {
                    position: particles[i].position,
                    velocity: reflectedVector2,
                    relativeVelocity: Physics.getRelativeVelocity(reflectedVector2, app)
                }
            }
        }

        return { position: newPosition, velocity: newVelocity, relativeVelocity: newRelativeVelocity }
    }

    //FIXME: надо будет убрать в отдельный класс когда будут другие утилиты для физики
    static getRelativeVelocity(v: Vector2, app: App): Vector2 {
        //FIXME: изменение дельта тайма меняет рещультат симуляции, надо решать с интерполяцией что-то
        return {
            x: v.x / app.deltaTime,
            y: v.y / app.deltaTime
        }
    }
}
