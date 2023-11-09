import { Options } from './utils/Options'
import { EntityManager } from './utils/EntityManager'
import { App } from './utils/App'
import { Vec2 } from './utils/Vector2'

const options = new Options({ debug: true })

const entityManager = new EntityManager()

const app = new App(options, entityManager)

entityManager.addObstacle( 0, app.canvas.clientHeight - 20, app.canvas.clientWidth, 20)
entityManager.addObstacle(0, 0, 20, app.canvas.clientHeight)
entityManager.addObstacle(app.canvas.clientWidth - 20, 0, 20, app.canvas.clientHeight)
entityManager.addObstacle(0, 0, app.canvas.clientWidth, 20)

app.init()

setInterval(() => {
    if (entityManager.particles.length >= 2000) return

    entityManager.addParticle({
        position: Vec2.new(30, 30),
        velocity: Vec2.new(5, 0),
        color: 'green',
        mass: 1,
        radius: 2,
    })
    entityManager.addParticle({
        position: Vec2.new(60, 30),
        velocity: Vec2.new(5, 0),
        color: 'red',
        mass: 1,
        radius: 2,
    })
    entityManager.addParticle({
        position: Vec2.new(90, 30),
        velocity: Vec2.new(5, 0),
        color: 'blue',
        mass: 1,
        radius: 2,
    })
    entityManager.addParticle({
        position: Vec2.new(120, 30),
        velocity: Vec2.new(5, 0),
        color: 'pink',
        mass: 1,
        radius: 2,
    })
    entityManager.addParticle({
        position: Vec2.new(150, 30),
        velocity: Vec2.new(5, 0),
        color: 'brown',
        mass: 1,
        radius: 2,
    })
}, 150)
