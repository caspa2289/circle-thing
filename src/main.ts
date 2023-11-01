import { Options } from './utils/Options'
import { EntityManager } from './utils/EntityManager'
import { App } from './utils/App'

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
    entityManager.addParticle(30, 30, 5, 0, 'green')
    entityManager.addParticle(60, 30, 5, 0, 'red')
    entityManager.addParticle(90, 30, 5, 0, 'blue')
    entityManager.addParticle(120, 30, 5, 0, 'pink')
}, 150)
