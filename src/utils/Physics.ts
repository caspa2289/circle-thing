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
            } = this._resolveParticleCollisions(i, entityManager, options, app)

            const newPosition = {
                x: position.x + relativeVelocity.x,
                y: position.y + relativeVelocity.y
            }
            const newVelocity = {
                x: velocity.x,
                y: velocity.y + options.gravity
            }
            const newRelativeVelocity = Physics.getRelativeVelocity(newVelocity, app)

            entityManager.particles[i] = {
                position: newPosition,
                velocity: newVelocity,
                relativeVelocity: newRelativeVelocity
            }
        }
    }

    private static _resolveParticleCollisions(
        particleIndex: number,
        entityManager: EntityManager,
        options: Options,
        app: App
    ): Particle {
        const { position, velocity, relativeVelocity } = entityManager.particles[particleIndex]

        let [ newPosition, newVelocity, newRelativeVelocity ] = [ position, velocity, relativeVelocity ]

        for (let i = 0; i < entityManager.obstacles.length; i++) {
            const { data: [ rectX, rectY, rectWidth, rectHeight ], normal } = entityManager.obstacles[i]

            const intersects = () => {
                const rectHalfWidth = rectWidth / 2
                const rectHalfHeight = rectHeight / 2

                const rectCenterX = Math.abs(rectX + rectHalfWidth)
                const rectCenterY = Math.abs(rectY + rectHalfHeight)
                const circleDistance = Vec2.new(
                    Math.abs(newPosition.x - rectCenterX),
                    Math.abs(newPosition.y - rectCenterY)
                )

                if (circleDistance.x > rectHalfWidth + options.particleRadius) return false
                if (circleDistance.y > rectHalfHeight + options.particleRadius) return false
                if (circleDistance.x <= rectHalfWidth) return true
                if (circleDistance.y <= rectHalfHeight) return true

                const cornerDistanceSquared = (circleDistance.x - rectHalfWidth) * 2 + (circleDistance.y - rectHalfHeight) * 2

                return cornerDistanceSquared <= options.particleRadius * 2
            }

            if (intersects()) {
                const reflectedVector = Physics.applyFriction(
                    Vec2.reflectFromNormal(newVelocity, normal), options
                )

                newVelocity = reflectedVector
                newRelativeVelocity = Physics.getRelativeVelocity(reflectedVector, app)
            }
        }

        for (let i = 0; i < entityManager.particles.length; i++) {
            if (i <= particleIndex) continue

            const {
                position: cPosition,
                velocity: cVelocity,
                // relativeVelocity: cRelativeVelocity
            } = entityManager.particles[i]

            //check collision
            const dx = cPosition.x - newPosition.x
            const dy = cPosition.y - newPosition.y
            //FIXME: они разъезжаются на маке, потому что коллижен считается два раза для первой сферы
            //UPD: добавил разлепление партиклов, мб это фиксит
            //TODO: проверить, сохранилось ли это с введением DELTA_TIME
            const centerDistance = Math.sqrt(dx * dx + dy * dy)

            if (centerDistance < options.particleRadius * 2) {
                //if collided, find collision point
                const collisionPoint = Vec2.add(
                    Vec2.multiplyScalar(newPosition, options.precalc.radiusFactor),
                    Vec2.multiplyScalar(cPosition, options.precalc.radiusFactor)
                )

                //reflected vector for current sphere
                const reflectedVector1 = Physics.applyFriction(
                    Vec2.reflectFromPoint(collisionPoint, cPosition, velocity),
                    options
                )
                //reflected vector for another sphere
                const reflectedVector2 = Physics.applyFriction(
                    Vec2.reflectFromPoint(collisionPoint, newPosition, cVelocity),
                    options
                )

                //check if particles intersect
                const intersectionDepth = options.particleRadius + options.particleRadius - centerDistance

                if (intersectionDepth > 0) {
                    //if they intersect, move them apart evenly

                    const newDx = dx / centerDistance
                    const newDy = dy / centerDistance

                    newPosition = Vec2.new(
                        newPosition.x - newDx * intersectionDepth / 2,
                        newPosition.y - newDy * intersectionDepth / 2,
                    )

                    const newPosition2 = Vec2.new(
                        cPosition.x + newDx * intersectionDepth / 2,
                        cPosition.y + newDy * intersectionDepth / 2,
                    )

                    entityManager.particles[i] = {
                        ...entityManager.particles[i],
                        position: newPosition2,
                    }
                }

                newVelocity = reflectedVector1
                newRelativeVelocity = Physics.getRelativeVelocity(reflectedVector1, app)

                entityManager.particles[i] = {
                    position: entityManager.particles[i].position,
                    velocity: reflectedVector2,
                    relativeVelocity: Physics.getRelativeVelocity(reflectedVector2, app)
                }
            }
        }

        return { position: newPosition, velocity: newVelocity, relativeVelocity: newRelativeVelocity }
    }

    static applyFriction(v: Vector2, options: Options): Vector2 {
        return Vec2.multiplyScalar(v, options.friction)
    }

    //FIXME: надо будет убрать в отдельный класс когда будут другие утилиты для физики
    static getRelativeVelocity(v: Vector2, app: App): Vector2 {
        //FIXME: изменение дельта тайма меняет результат симуляции, надо решать с интерполяцией что-то
        return {
            x: v.x / app.deltaTime,
            y: v.y / app.deltaTime
        }
    }
}
