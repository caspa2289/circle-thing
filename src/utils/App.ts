import { Options } from './Options'
import { EntityManager } from './EntityManager'
import { Physics } from './Physics'
import { Renderer } from './Renderer'

export class App {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    dpr: number
    rawDeltaTime: number
    lastFrameTime: number
    isPaused: boolean
    gridCellHeight: number
    gridCellWidth: number
    onUpdate: (frameTime?: number) => void | null
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
        this.gridCellWidth = this.canvas.clientWidth / this.options.physicsGridResolution
        this.gridCellHeight = this.canvas.clientHeight / this.options.physicsGridResolution
        //FIXME: шину событий надо сделать
        this.onUpdate = null

        this.update = this.update.bind(this)
        this.onPause = this.onPause.bind(this)
    }

    init() {
        //TODO: сделать в расчётах поправки на дпр
        this.canvas.width = document.body.clientWidth
        this.canvas.height = document.body.clientHeight
        window.addEventListener('click', this.onPause)
        window.requestAnimationFrame(this.update)

    }

    update(frameTime: number) {
        this.rawDeltaTime = 1 / 60 * this.options.timeSpeedCoefficient
        this.lastFrameTime = frameTime

        window.requestAnimationFrame(this.update)
        if (this.isPaused) return

        this.onUpdate && this.onUpdate(frameTime)

        Physics.prepareFrame(this.entityManager, this.options, this)
        Renderer.drawFrame(this, this.options, this.entityManager)
    }

    onPause(){
        this.isPaused = !this.isPaused
    }

    get deltaTime() {
        return this.rawDeltaTime
    }

}
