import { Options } from './utils/Options'
import { EntityManager } from './utils/EntityManager'
import { App } from './utils/App'

const COLORS = [ 'red', 'green', 'blue', 'orange', 'pink' ]

const options = new Options({ debug: false })

const entityManager = new EntityManager()

entityManager.addObstacle( 0, 800, 510, 20)
entityManager.addObstacle(0, 0, 20, 800)
entityManager.addObstacle(490, 0, 20, 800)
entityManager.addObstacle(0, 0, 500, 20)

const app = new App(options, entityManager)
app.init()

// entityManager.addParticle(40, 40, 0, 0, 'red' )


setInterval(() => {
    entityManager.addParticle(40, 40, Math.floor(Math.random() * 50), 10, COLORS[Math.floor(Math.random() * 5)] )
    entityManager.addParticle(90, 90, -Math.floor(Math.random() * 50), 10, COLORS[Math.floor(Math.random() * 5)] )
}, 200)
