import { Options } from './utils/Options'
import { EntityManager } from './utils/EntityManager'
import { App } from './utils/App'

const options = new Options({ debug: false })

const entityManager = new EntityManager()
entityManager.addParticle(60, 60, 90, 0)
entityManager.addParticle(300, 60, -80, 0)
entityManager.addObstacle( 0, 800, 500, 10)
entityManager.addObstacle(0, 0, 10, 800)
entityManager.addObstacle(490, 0, 10, 800)
entityManager.addObstacle(0, 0, 490, 10)

const app = new App(options, entityManager)
app.init()
