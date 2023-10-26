export interface Particle {
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
    normal: Vector2,
}

export type Width = number
export type Height = number
export type XCoordinate = number
export type YCoordinate = number
