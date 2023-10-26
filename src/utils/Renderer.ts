import { App } from './App'
import { Options } from './Options'
import { EntityManager } from './EntityManager'
import { Obstacle } from '../types/common'

export class Renderer {
    static drawFrame(app: App, options: Options, entityManager: EntityManager) {
        app.context.beginPath()
        app.context.fillStyle = 'blue'
        //FIXME: заменить на for loop
        entityManager.particles.forEach(({ position }) => {
            app.context.arc(position.x, position.y, options.particleRadius, 0, options.precalc.circleAngle)
        })
        app.context.clearRect(0, 0, app.canvas.width, app.canvas.height)
        this._drawObstacles(app, entityManager.obstacles)
        app.context.fill()
    }

    private static _drawObstacles(app: App, obstacles: Obstacle[]) {
        obstacles.forEach(({ data }) => {
            app.context.fillRect(...data)
        })
    }
}
