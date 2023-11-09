import { PossibleCollisionsData } from '../types/common'

export class Utils {
    static clamp(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max)
    }

    static createUniformGridOfSize(size: number): PossibleCollisionsData {
        const grid = []
        for (let i = 0; i < size; i++) {
            grid[i] = []
            for (let y = 0; y < size; y++) {
                grid[i][y] = []
            }
        }

        return grid
    }
}
