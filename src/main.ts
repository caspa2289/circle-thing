import { Options } from './utils/Options'
import { EntityManager } from './utils/EntityManager'
import { App } from './utils/App'

const COLORS = [ 'red', 'green', 'blue', 'orange', 'pink' ]

const options = new Options({ debug: false })

const entityManager = new EntityManager()

for (let i = 0; i <= 9; i++) {
    const x = 45 * (i + 1 % 8)
    const y = 60 * (i + 1)

    entityManager.addParticle(x, y, i, 0, COLORS[Math.floor(Math.random() * 5)] )
}

entityManager.addObstacle( 0, 800, 510, 20)
entityManager.addObstacle(0, 0, 20, 800)
entityManager.addObstacle(490, 0, 20, 800)
entityManager.addObstacle(0, 0, 500, 20)

const app = new App(options, entityManager)
app.init()
