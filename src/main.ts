import { Options } from './utils/Options'
import { EntityManager } from './utils/EntityManager'
import { App } from './utils/App'

const options = new Options()

const entityManager = new EntityManager()
entityManager.addParticle(50, 40, 90, 0)
entityManager.addParticle(300, 40, -80, 0)
entityManager.addObstacle( 0, 800, 500, 10, 0, 1)
entityManager.addObstacle(0, 0, 10, 800, 1, 0)
entityManager.addObstacle(490, 0, 10, 800, -1, 0)
entityManager.addObstacle(0, 0, 490, 10, 0, -1)

const app = new App(options, entityManager)
app.init()
