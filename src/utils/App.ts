import { Options } from './Options'
import { EntityManager } from './EntityManager'
import { Physics } from './Physics'
import { Renderer } from './Renderer'

export class App {
    //FIXME: сделать сеттеры/геттеры
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    dpr: number
    rawDeltaTime: number
    lastFrameTime: number
    isPaused: boolean
    private static _instance?: App
    readonly entityManager: EntityManager
    readonly options: Options

    constructor(options: Options, entityManager: EntityManager) {
        if (App._instance) {
            return App._instance
        }
        App._instance = this
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement
        this.context = this.canvas.getContext('2d')
        this.dpr = window.devicePixelRatio || 1
        this.rawDeltaTime = performance.now()
        this.lastFrameTime = this.rawDeltaTime
        this.isPaused = false
        this.options = options
        this.entityManager = entityManager

        this.update = this.update.bind(this)
        this.onPause = this.onPause.bind(this)
    }

    init() {
        this.canvas.width = document.body.clientWidth * this.dpr
        this.canvas.height = document.body.clientHeight * this.dpr

        window.addEventListener('click', this.onPause)
        window.requestAnimationFrame(this.update)
    }

    update(frameTime: number) {
        this.rawDeltaTime = (frameTime - this.lastFrameTime) / this.options.targetFrameTime
        this.lastFrameTime = frameTime

        window.requestAnimationFrame(this.update)
        if (this.isPaused) return

        Physics.prepareFrame(this.entityManager, this.options, this)
        Renderer.drawFrame(this, this.options, this.entityManager)
    }

    onPause(){
        this.isPaused = !this.isPaused
    }

    get deltaTime() {
        return this.rawDeltaTime * this.options.timeSpeedCoefficient
    }

}
