import { Options } from './utils/Options'
import { EntityManager } from './utils/EntityManager'
import { App } from './utils/App'

const options = new Options()

const entityManager = new EntityManager()
entityManager.addParticle(50, 30, 90, 0)
entityManager.addParticle(300, 30, -80, 0)
entityManager.addObstacle( 0, 800, 500, 40)

const app = new App(options, entityManager)
app.init()
