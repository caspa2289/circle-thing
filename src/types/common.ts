export interface Particle {
    position: Vector2
    velocity: Vector2
    relativeVelocity: Vector2
    color: string
    id: number
}

export interface Vector2 {
    x: number,
    y: number
}

export interface Obstacle {
    data: [XCoordinate, YCoordinate, Width, Height]
}

export type Width = number
export type Height = number
export type XCoordinate = number
export type YCoordinate = number
