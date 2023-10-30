import { Options } from './utils/Options'
import { EntityManager } from './utils/EntityManager'
import { App } from './utils/App'

const COLORS = [ 'red', 'green', 'blue', 'orange', 'pink' ]

const options = new Options({ debug: false })

const entityManager = new EntityManager()

for (let i = 0; i < 99; i++) {
    const row = Math.floor(i / 33) + 1
    const x = Math.abs(13 * (i - 33 * row))
    const y = 25 + (15 * row)

    entityManager.addParticle(x, y, 0, 0, COLORS[Math.floor(Math.random() * 5)] )
}

entityManager.addObstacle( 0, 800, 510, 20)
entityManager.addObstacle(0, 0, 20, 800)
entityManager.addObstacle(490, 0, 20, 800)
entityManager.addObstacle(0, 0, 500, 20)

const app = new App(options, entityManager)
app.init()
