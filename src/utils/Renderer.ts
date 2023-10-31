import { App } from './App'
import { Options } from './Options'
import { EntityManager } from './EntityManager'
import { Obstacle } from '../types/common'

export class Renderer {
    static drawFrame(app: App, options: Options, entityManager: EntityManager) {
        app.context.clearRect(0, 0, app.canvas.width, app.canvas.height)
        entityManager.particles.forEach(({ position, color, id }) => {
            app.context.beginPath()
            app.context.fillStyle = color
            app.context.arc(position.x, position.y, options.particleRadius, 0, options.precalc.circleAngle)
            app.context.fill()
            app.context.fillStyle = 'black'
            app.context.fillText(String(id), position.x - 2, position.y - 2)
        })
        this._drawObstacles(app, entityManager.obstacles)
    }

    private static _drawObstacles(app: App, obstacles: Obstacle[]) {
        app.context.fillStyle = 'grey'
        obstacles.forEach(({ data }) => {
            app.context.fillRect(...data)
        })
    }
}
