import { App } from './App'
import { Options } from './Options'
import { EntityManager } from './EntityManager'
import { Obstacle } from '../types/common'

export class Renderer {
    static drawFrame(app: App, options: Options, entityManager: EntityManager) {
        app.context.clearRect(0, 0, app.canvas.width, app.canvas.height)
        entityManager.particles.forEach(({ position, color, radius }) => {
            app.context.beginPath()
            app.context.fillStyle = color
            app.context.arc(position.x, position.y, radius, 0, options.precalc.circleAngle)
            app.context.fill()
            // app.context.fillStyle = 'black'
            // app.context.fillText(String(id), position.x, position.y)
        })
        this._drawObstacles(app, entityManager.obstacles)
        this._drawDebugInfo(app, entityManager)
    }

    private static _drawDebugInfo(app: App, entityManager: EntityManager) {
        app.context.fillStyle = 'black'
        app.context.fillText(String(entityManager.particles.length), 10, 10)
    }

    private static _drawObstacles(app: App, obstacles: Obstacle[]) {
        app.context.fillStyle = 'grey'
        obstacles.forEach(({ data }) => {
            app.context.fillRect(...data)
        })
    }
}
