import { Obstacle, PossibleCollisionsData, Vector2 } from '../types/common'
import { Vec2 } from './Vector2'
import { Options } from './Options'
import { App } from './App'
import { EntityManager } from './EntityManager'
import { Utils } from './Utils'

export class Physics {
    static prepareFrame(entityManager: EntityManager, options: Options, app: App) {
        const iterationsMax = options.physicsIterations

        /**
         * FIXME: нужно переделать колижен респонсы чтобы они затрагивали только текущий интервал, иначе нельзя будет запараллелить вычисления
         * Сейчас симуляция стабильно работает при радиусе партиклов >5 на моей машине, хотелось бы поменьше.
         * Нужна оптимизация + увеличение итераций физики
         */
        for (let x = 0; x < iterationsMax; x++) {
            //UPD: .fill fills array with references to provided value :(
            const possibleCollisions: PossibleCollisionsData = Utils.createUniformGridOfSize(options.physicsGridResolution)

            //разбиение на клетки работает, насколько я могу судить.
            //вроде как единственная проблема с текущим алгоритмом - это размер партиклов, если он больше клетки, то смэрть
            for (let i = 0; i < entityManager.particles.length; i++) {
                const {
                    position,
                    id,
                    radius
                } = entityManager.particles[i]

                const xStart = Utils.clamp(Math.floor((position.x - radius) / app.gridCellWidth), 0, options.physicsGridResolution - 1)
                const xEnd = Utils.clamp(Math.floor((position.x + radius) / app.gridCellWidth), 0, options.physicsGridResolution - 1)

                const yStart = Utils.clamp(Math.floor((position.y - radius) / app.gridCellHeight), 0, options.physicsGridResolution - 1)
                const yEnd = Utils.clamp(Math.floor((position.y + radius) / app.gridCellHeight), 0, options.physicsGridResolution - 1)

                possibleCollisions[xStart][yStart].push(id)

                if (xStart !== xEnd) {
                    possibleCollisions[xEnd][yStart].push(id)
                }

                if (yEnd !== yStart) {
                    possibleCollisions[xStart][yEnd].push(id)

                    if (xStart !== xEnd) {
                        possibleCollisions[xEnd][yEnd].push(id)
                    }
                }
            }

            for (let i = 0; i < entityManager.particles.length; i++) {
                Physics._resolveObstacleCollisions(i, entityManager, options)
            }

            Physics._resolveParticleCollisions(entityManager, options, possibleCollisions)

            for (let i = 0; i <entityManager.particles.length; i++) {
                const {
                    position,
                    velocity
                } = entityManager.particles[i]

                const newVelocity = Vec2.new(velocity.x, velocity.y + options.gravity)
                const newRelativeVelocity = Physics.getRelativeVelocity(newVelocity, app, iterationsMax)
                const newPosition = Vec2.new(position.x + newRelativeVelocity.x, position.y + newRelativeVelocity.y)

                entityManager.particles[i] = {
                    ...entityManager.particles[i],
                    velocity: newVelocity,
                    relativeVelocity: newRelativeVelocity,
                    position: newPosition,
                }
            }
        }
    }

    private static _particleIntersectsObstacle(obstacle: Obstacle, position: Vector2, radius: number) {
        const { data: [ rectX, rectY, rectWidth, rectHeight ] } = obstacle

        const rectHalfWidth = rectWidth / 2
        const rectHalfHeight = rectHeight / 2

        const rectCenterX = Math.abs(rectX + rectHalfWidth)
        const rectCenterY = Math.abs(rectY + rectHalfHeight)
        const circleDistance = Vec2.new(
            Math.abs(position.x - rectCenterX),
            Math.abs(position.y - rectCenterY)
        )

        if (circleDistance.x > rectHalfWidth + radius) return false
        if (circleDistance.y > rectHalfHeight + radius) return false
        if (circleDistance.x <= rectHalfWidth) return true
        if (circleDistance.y <= rectHalfHeight) return true

        const cornerDistanceSquared = (circleDistance.x - rectHalfWidth) * 2 + (circleDistance.y - rectHalfHeight) * 2

        return cornerDistanceSquared <= radius * 2
    }

    //FIXME: Separate collision detection from collision response to allow for event listeners
    private static _resolveObstacleCollisions(
        particleIndex: number,
        entityManager: EntityManager,
        options: Options,
    ) {
        for (let i = 0; i < entityManager.obstacles.length; i++) {

            // eslint-disable-next-line prefer-const
            let { position: newPosition, velocity: newVelocity, radius } = entityManager.particles[particleIndex]

            if (Physics._particleIntersectsObstacle(entityManager.obstacles[i], newPosition, radius)) {
                const { data: [ rectX, rectY, rectWidth, rectHeight ] } = entityManager.obstacles[i]

                const obstacleLeftX = rectX
                const obstacleRightX = rectX + rectWidth
                const obstacleTopY = rectY
                const obstacleBottomY = rectY + rectHeight

                const collisionPoint = Vec2.new(
                    newPosition.x < obstacleLeftX
                        ? obstacleLeftX : newPosition.x > obstacleRightX
                            ? obstacleRightX : newPosition.x,
                    newPosition.y < obstacleTopY
                        ? obstacleTopY : newPosition.y > obstacleBottomY
                            ? obstacleBottomY : newPosition.y
                )

                const distance = Math.sqrt(
                    Math.pow(collisionPoint.x - newPosition.x, 2)
                    + Math.pow(collisionPoint.y - newPosition.y, 2)
                )

                const intersectionDepth = radius - distance

                if (intersectionDepth > 0) {
                    //if particle intersects obstacle, move particle away

                    const newDx = (newPosition.x - collisionPoint.x) / distance
                    const newDy = (newPosition.y - collisionPoint.y) / distance

                    /**
                     * 0 / 0 could and should happen,
                     * when particle intersects obstacle exactly aligned with collision point,
                     * which gives NaN (for whatever reason),
                     * skip repositioning in this case
                     */
                    if (isNaN(newDx) || isNaN(newDy)) return

                    newPosition = Vec2.new(
                        newPosition.x + newDx * intersectionDepth,
                        newPosition.y + newDy * intersectionDepth,
                    )
                }

                entityManager.particles[particleIndex] = {
                    ...entityManager.particles[particleIndex],
                    position: newPosition,
                    velocity: Physics.applyFriction(
                        Vec2.reflectFromPoint(collisionPoint, newPosition, newVelocity), options
                    )
                }
            }
        }
    }

    private static _resolveParticleCollisions(
        entityManager: EntityManager,
        options: Options,
        possibleCollisions: PossibleCollisionsData
    ) {
        possibleCollisions.forEach((column) => {
            column.forEach((row) => {
                row.forEach((particleIndex) => {
                    // eslint-disable-next-line prefer-const
                    let { position: newPosition, velocity: newVelocity, radius } = entityManager.particles[particleIndex]

                    row.forEach((anotherParticleIndex) => {
                        if (anotherParticleIndex === particleIndex) return

                        // eslint-disable-next-line prefer-const
                        let { position: cPosition, velocity: cVelocity, radius: cRadius} = entityManager.particles[anotherParticleIndex]

                        const distanceX = cPosition.x - newPosition.x
                        const distanceY = cPosition.y - newPosition.y
                        const centerDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

                        if (centerDistance < radius * 2) {
                            //check if particles intersect
                            const intersectionDepth = radius + cRadius - centerDistance

                            //if they intersect, move them apart evenly
                            if (intersectionDepth > 0) {
                                const newDx = distanceX / centerDistance
                                const newDy = distanceY / centerDistance

                                newPosition = Vec2.new(
                                    newPosition.x - newDx * intersectionDepth / 2,
                                    newPosition.y - newDy * intersectionDepth / 2,
                                )

                                cPosition = Vec2.new(
                                    cPosition.x + newDx * intersectionDepth / 2,
                                    cPosition.y + newDy * intersectionDepth / 2,
                                )
                            }

                            const collisionPoint = Vec2.add(
                                Vec2.multiplyScalar(newPosition, radius / (radius + radius)),
                                Vec2.multiplyScalar(cPosition, cRadius / (cRadius + cRadius))
                            )

                            entityManager.particles[particleIndex] = {
                                ...entityManager.particles[particleIndex],
                                position: newPosition,
                                velocity: Physics.applyFriction(
                                    Vec2.reflectFromPoint(collisionPoint, cPosition, newVelocity),
                                    options
                                )
                            }

                            entityManager.particles[anotherParticleIndex] = {
                                ...entityManager.particles[anotherParticleIndex],
                                position: cPosition,
                                velocity: Physics.applyFriction(
                                    Vec2.reflectFromPoint(collisionPoint, newPosition, cVelocity),
                                    options
                                )
                            }
                        }
                    })
                })
            })
        })
    }

    static applyFriction(v: Vector2, options: Options): Vector2 {
        return Vec2.multiplyScalar(v, options.friction)
    }

    static getRelativeVelocity(v: Vector2, app: App, iterationsMax: number): Vector2 {
        return {
            x: v.x * app.deltaTime / iterationsMax,
            y: v.y * app.deltaTime / iterationsMax
        }
    }
}
