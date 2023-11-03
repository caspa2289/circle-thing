import { Options } from './utils/Options'
import { EntityManager } from './utils/EntityManager'
import { App } from './utils/App'
import { Vec2 } from './utils/Vector2'

const options = new Options({ debug: false })

const entityManager = new EntityManager()

entityManager.addObstacle( 0, 800, 510, 20)
entityManager.addObstacle(0, 0, 20, 800)
entityManager.addObstacle(490, 0, 20, 800)
entityManager.addObstacle(0, 0, 500, 20)

const app = new App(options, entityManager)
app.init()

setInterval(() => {
    if (entityManager.particles.length >= 2000) return

    entityManager.addParticle({
        position: Vec2.new(30, 30),
        velocity: Vec2.new(5, 0),
        color: 'green',
        mass: 1,
        radius: 5,
    })
    entityManager.addParticle({
        position: Vec2.new(60, 30),
        velocity: Vec2.new(5, 0),
        color: 'red',
        mass: 1,
        radius: 5,
    })
    entityManager.addParticle({
        position: Vec2.new(90, 30),
        velocity: Vec2.new(5, 0),
        color: 'blue',
        mass: 1,
        radius: 5,
    })
    entityManager.addParticle({
        position: Vec2.new(120, 30),
        velocity: Vec2.new(5, 0),
        color: 'pink',
        mass: 1,
        radius: 5,
    })
    entityManager.addParticle({
        position: Vec2.new(150, 30),
        velocity: Vec2.new(5, 0),
        color: 'pink',
        mass: 1,
        radius: 5,
    })
}, 1000)
