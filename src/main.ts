import { Vec2, Vector2 } from './utils/Vector2'

const CANVAS = document.getElementById('canvas') as HTMLCanvasElement
const CONTEXT: CanvasRenderingContext2D = CANVAS.getContext('2d')
const DPR = window.devicePixelRatio || 1
const PARTICLE_RADIUS = 20
const GRAVITY = 9.8
const PRECALC = {
    radiusFactor: PARTICLE_RADIUS / (PARTICLE_RADIUS + PARTICLE_RADIUS),
    circleAngle: 2 * Math.PI
}
const FRAME_RATE = 1000 / 60
const TIME_SLOWING_COEFFICIENT = 3
const DELTA_TIME_SUBSTITUTE = FRAME_RATE * TIME_SLOWING_COEFFICIENT

const setupCanvas = () => {
    //FIXME: что-то не работает тут
    CANVAS.width = document.body.clientWidth * DPR
    CANVAS.height = document.body.clientHeight * DPR
}

interface Particle {
    position: Vector2
    velocity: Vector2
    relativeVelocity: Vector2
}

type Width = number
type Height = number
type XCoordinate = number
type YCoordinate = number
interface Obstacle {
    data: [XCoordinate, YCoordinate, Width, Height]
    normal: Vector2,
}

const createParticle = (x: number, y: number, xv: number, yv: number): Particle => {
    return {
        position: Vec2.new(x, y),
        velocity: Vec2.new(xv, yv),
        relativeVelocity: Vec2.new(0, 0)
    }
}

const particles: Particle[] = [
    createParticle(50, 30, 90, 0),
    createParticle(300, 30, -80, 0)
]

const obstacles: Obstacle[] = [
    {
        data: [ 0, 800, 500, 40 ],
        normal: Vec2.new()
    }
]

// const createParticles = () => {
//     for (let i = 0; i <= 10; i++) {
//         particles.push(createParticle(i * 35, 30, 0, 0))
//     }
// }

const drawObstacles = () => {
    obstacles.forEach(({ data }) => {
        CONTEXT.fillRect(...data)
    })
}

const drawFrame = (particles: Particle[]) => {
    CONTEXT.beginPath()
    CONTEXT.fillStyle = 'blue'
    particles.forEach(({ position }) => {
        CONTEXT.arc(position.x, position.y, PARTICLE_RADIUS, 0, PRECALC.circleAngle)
    })
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height)
    drawObstacles()
    CONTEXT.fill()
}

const resolveParticleCollisions = (particleIndex: number, particles: Particle[]): Particle => {
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
        //FIXME: они разъезжаются, потому что коллижен считается два раза для первой сферы
        const centerDistance = Math.sqrt(d1 * d1 + d2 * d2)

        if (centerDistance < PARTICLE_RADIUS * 2) {
            //if collided, find collision point
            const collisionPoint = Vec2.add(
                Vec2.multiplyScalar(newPosition, PRECALC.radiusFactor),
                Vec2.multiplyScalar(cPosition, PRECALC.radiusFactor)
            )

            //reflected vector for current sphere
            //FIXME: тут velocity надо брать соответствующее (newVelocity для текущей сферы и cVelocity для другой)
            const reflectedVector1 = Vec2.reflectFromPoint(collisionPoint, cPosition, velocity)
            //reflected vector for another sphere
            const reflectedVector2 = (collisionPoint, newPosition, velocity)

            //FIXME: надо устранять коллижены, если они есть. Попробовать интерполяцию
            // newPosition = newPosition
            newVelocity = reflectedVector1
            newRelativeVelocity = {
                x: reflectedVector1.x / DELTA_TIME_SUBSTITUTE,
                y: reflectedVector1.y / DELTA_TIME_SUBSTITUTE
            }

            particles[i] = {
                position: particles[i].position,
                velocity: reflectedVector2,
                relativeVelocity: {
                    x: reflectedVector2.x / DELTA_TIME_SUBSTITUTE,
                    y: reflectedVector2.y / DELTA_TIME_SUBSTITUTE
                }
            }
        }
    }

    return { position: newPosition, velocity: newVelocity, relativeVelocity: newRelativeVelocity }
}

const prepareFrame = () => {
    for (let i = 0; i < particles.length; i++) {

        const { position, velocity, relativeVelocity } = resolveParticleCollisions(i, particles)

        const newPosition = {
            x: position.x + relativeVelocity.x,
            y: position.y + relativeVelocity.y
        }
        const newVelocity = {
            x: velocity.x,
            y: velocity.y + GRAVITY
        }
        //FIXME: вынести в отдельную функцию
        const newRelativeVelocity = {
            x: newVelocity.x / DELTA_TIME_SUBSTITUTE,
            y: newVelocity.y / DELTA_TIME_SUBSTITUTE
        }

        particles[i] = {position: newPosition, velocity: newVelocity, relativeVelocity: newRelativeVelocity}
    }
}

setupCanvas()

//createParticles()

const cycle = () => {
    prepareFrame()
    drawFrame(particles)
}

// window.addEventListener('click', cycle)

setInterval(() => {
    cycle()
}, DELTA_TIME_SUBSTITUTE)
