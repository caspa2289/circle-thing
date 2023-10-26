import { Vector2 } from '../types/common'

export class Vec2 {

    static new(x?: number, y?: number): Vector2 {
        return {
            x : x ?? 0,
            y : y ?? 0
        }
    }

    static multiplyScalar({ x, y }: Vector2, num: number): Vector2 {
        return {
            x: x * num,
            y: y * num
        }
    }

    static add(v1: Vector2, v2: Vector2): Vector2 {
        return {
            x: v1.x + v2.x,
            y: v1.y + v2.y
        }
    }

    static subtract(v1: Vector2, v2: Vector2): Vector2 {
        return {
            x: v1.x - v2.x,
            y: v1.y - v2.y
        }
    }

    static dot(v1: Vector2, v2: Vector2): number {
        return v1.x * v2.x + v1.y * v2.y
    }

    static magnitude({ x, y }: Vector2): number {
        return Math.sqrt(x * x + y * y)
    }

    static normalize({ x, y }: Vector2): Vector2 {
        const magnitude = Vec2.magnitude({ x, y })

        return {
            x: x / magnitude,
            y: y / magnitude
        }
    }

    static collisionNormal(collisionPoint: Vector2, position: Vector2): Vector2 {
        return Vec2.normalize(Vec2.subtract(collisionPoint, position))
    }

    static reflectFromPoint(collisionPoint: Vector2, position: Vector2, velocity: Vector2): Vector2 {
        const normal = Vec2.collisionNormal(collisionPoint, position)

        return Vec2.subtract(velocity, Vec2.multiplyScalar(normal, 2 * Vec2.dot(velocity, normal)))
    }

    static reflectFromNormal(vector: Vector2, normal: Vector2) {
        // v' = v - 2 * (v ∙ n/n ∙ n) * n
        return Vec2.subtract(
            vector,
            Vec2.multiplyScalar(
                normal,
                (2 * Vec2.dot(vector, normal) / Vec2.dot(normal, normal))
            )
        )
    }

}
