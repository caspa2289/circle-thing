export interface Particle {
    id: number
    radius: number
    mass: number
    color: string
    position: Vector2
    velocity: Vector2
    relativeVelocity: Vector2
}

export interface Vector2 {
    x: number,
    y: number
}

export interface Obstacle {
    data: [XCoordinate, YCoordinate, Width, Height]
}

export type PossibleCollisionsData = Array<Array<Array<number>>>

export type Width = number
export type Height = number
export type XCoordinate = number
export type YCoordinate = number
