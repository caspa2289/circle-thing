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

        })
        this._drawObstacles(app, entityManager.obstacles)
        if (options.debug) {
            this._drawDebugInfo(app, entityManager)
        }
    }

    private static _drawDebugInfo(app: App, entityManager: EntityManager) {
        app.context.fillStyle = 'black'
        app.context.fillText(String(entityManager.particles.length), 10, 10)

        // TODO: для каждого партикла
        // app.context.fillStyle = 'black'
        // app.context.fillText(String(id), position.x, position.y)

        const { gridWidth, gridHeight } = app

        //FIXME: make grid resolution choosable
        for (let i = 0; i <= 20; i++) {
            app.context.strokeStyle = 'lightgreen'
            app.context.beginPath()
            app.context.moveTo((i + 1) * gridWidth, 0)
            app.context.lineTo((i + 1) * gridWidth, app.canvas.clientHeight)
            app.context.stroke()

            app.context.beginPath()
            app.context.moveTo( 0, (i + 1) * gridHeight)
            app.context.lineTo(app.canvas.clientWidth, (i + 1) * gridHeight )
            app.context.stroke()

            app.context.fillText(`${i}, ${i}`, (i + 0.45) * gridWidth, (i + 0.5) * gridHeight)
        }
    }

    private static _drawObstacles(app: App, obstacles: Obstacle[]) {
        app.context.fillStyle = 'grey'
        obstacles.forEach(({ data }) => {
            app.context.fillRect(...data)
        })
    }
}
