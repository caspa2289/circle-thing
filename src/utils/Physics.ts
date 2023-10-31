import { CollisionList, Obstacle, Particle, Vector2 } from '../types/common'
import { Vec2 } from './Vector2'
import { Options } from './Options'
import { App } from './App'
import { EntityManager } from './EntityManager'

export class Physics {
    static prepareFrame(entityManager: EntityManager, options: Options, app: App) {
        const iterationsMax = options.physicsIterations

        const newParticles = [ ...entityManager.particles ]

        console.log(newParticles)

        for (let x = 0; x < iterationsMax; x++) {

            //FIXME: уменьшить количество лупов (и пупов)

            for (let z = 0; z < newParticles.length; z++) {
                Physics._resolveObstacleCollisions(z, entityManager.obstacles, newParticles, options)
            }

            const possibleParticleCollisions = Physics._getPossibleParticleCollisions(newParticles, options)

            for (let y = 0; y < possibleParticleCollisions.length; y++) {
                Physics._resolveParticleCollisions(possibleParticleCollisions[y], newParticles, options)
            }


            for (let i = 0; i < newParticles.length; i++) {
                const {
                    position,
                    velocity
                } = newParticles[i]

                const newVelocity = Vec2.new(velocity.x, velocity.y + options.gravity / iterationsMax)
                const newRelativeVelocity = Physics.getRelativeVelocity(newVelocity, app, iterationsMax)
                const newPosition = Vec2.new(position.x + newRelativeVelocity.x, position.y + newRelativeVelocity.y)

                newParticles[i] = {
                    ...newParticles[i],
                    velocity: newVelocity,
                    relativeVelocity: newRelativeVelocity,
                    position: newPosition,
                }
            }
        }

        entityManager.particles = newParticles
    }

    private static _particleIntersectsObstacle(obstacle: Obstacle, position: Vector2, options: Options) {
        const { data: [ rectX, rectY, rectWidth, rectHeight ] } = obstacle

        const rectHalfWidth = rectWidth / 2
        const rectHalfHeight = rectHeight / 2

        const rectCenterX = Math.abs(rectX + rectHalfWidth)
        const rectCenterY = Math.abs(rectY + rectHalfHeight)
        const circleDistance = Vec2.new(
            Math.abs(position.x - rectCenterX),
            Math.abs(position.y - rectCenterY)
        )

        if (circleDistance.x > rectHalfWidth + options.particleRadius) return false
        if (circleDistance.y > rectHalfHeight + options.particleRadius) return false
        if (circleDistance.x <= rectHalfWidth) return true
        if (circleDistance.y <= rectHalfHeight) return true

        const cornerDistanceSquared = (circleDistance.x - rectHalfWidth) * 2 + (circleDistance.y - rectHalfHeight) * 2

        return cornerDistanceSquared <= options.particleRadius * 2
    }

    //FIXME: Separate collision detection from collision response to allow for event listeners
    private static _resolveObstacleCollisions(
        particleIndex: number,
        obstacles: Obstacle[],
        particles: Particle[],
        options: Options
    ) {
        for (let i = 0; i < obstacles.length; i++) {
            // eslint-disable-next-line prefer-const
            let { position: newPosition, velocity: newVelocity } = particles[particleIndex]

            if (Physics._particleIntersectsObstacle(obstacles[i], newPosition, options)) {
                const { data: [ rectX, rectY, rectWidth, rectHeight ] } = obstacles[i]

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

                const intersectionDepth = options.particleRadius - distance

                if (intersectionDepth > 0) {
                    //if particle intersects obstacle, move particle away

                    const newDx = (newPosition.x - collisionPoint.x) / distance
                    const newDy = (newPosition.y - collisionPoint.y) / distance
                    newPosition = Vec2.new(
                        newPosition.x + newDx * intersectionDepth,
                        newPosition.y + newDy * intersectionDepth,
                    )
                }

                particles[particleIndex] = {
                    ...particles[particleIndex],
                    position: newPosition,
                    velocity: Physics.applyFriction(
                        Vec2.reflectFromPoint(collisionPoint, newPosition, newVelocity), options
                    )
                }
            }
        }
    }

    private static _getPossibleParticleCollisions = (particles: Particle[], options: Options): CollisionList => {
        //FIXME: заменить на сортировку пузырьком
        const projectionXSorted = [ ...particles ].sort((a, b) => {
            return a.position.x - b.position.x
        })

        const axisPositionToInterval = (axisPos: number) => ([
            axisPos - options.particleRadius,
            axisPos + options.particleRadius
        ])

        const possibleCollisions = []

        for (let i = 0; i < projectionXSorted.length; i++) {
            const element = projectionXSorted[i]

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [ startY, endY ] = axisPositionToInterval(element.position.y)

            for (
                let y = i + 1;
                y < projectionXSorted.length
                    &&  projectionXSorted[i].position.x + options.particleRadius
                        > projectionXSorted[y].position.x - options.particleRadius;
                y++) {

                const item = projectionXSorted[y]

                //FIXME: вернуть проверку по y
                // const [ itemStartY, itemEndY ] = axisPositionToInterval(item.position.y)
                // if (itemStartY <= endY && startY <= itemEndY) {
                possibleCollisions.push([ element.id, item.id ])
                possibleCollisions.push([ item.id, element.id ])
                // }

            }
        }

        return possibleCollisions
    }

    private static _resolveParticleCollisions(
        idPair: [number, number],
        particles: Particle[],
        options: Options
    ) {
        const particleIndex = idPair[0]
        const collidantIndex = idPair[1]

        let {
            position: newPosition,
            // eslint-disable-next-line prefer-const
            velocity: newVelocity
        } = particles[particleIndex]

        
        let { position: cPosition } = particles[collidantIndex]

        //check collision
        const distanceX = cPosition.x - newPosition.x
        const distanceY = cPosition.y - newPosition.y
        const centerDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

        if (centerDistance < options.particleRadius * 2) {
            //check if particles intersect
            const intersectionDepth = options.particleRadius + options.particleRadius - centerDistance

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
                Vec2.multiplyScalar(newPosition, options.precalc.radiusFactor),
                Vec2.multiplyScalar(cPosition, options.precalc.radiusFactor)
            )

            particles[particleIndex] = {
                ...particles[particleIndex],
                position: newPosition,
                velocity: Physics.applyFriction(
                    Vec2.reflectFromPoint(collisionPoint, cPosition, newVelocity),
                    options
                )
            }
        }
    }

    static applyFriction(v: Vector2, options: Options): Vector2 {
        return Vec2.multiplyScalar(v, options.friction)
    }

    static getRelativeVelocity(v: Vector2, app: App, iterationsMax: number): Vector2 {
        let x = v.x * app.deltaTime / iterationsMax
        let y = v.y * app.deltaTime / iterationsMax

        x = x === Infinity ? 0 : x
        y = y === Infinity ? 0 : y

        return { x, y }
    }
}
