import {Const} from "@/components/config.const";

export class Spot {
    g!: number
    h!: number
    f!: number
    i!: number
    j!: number
    width: number
    height: number
    neighbors: Array<Spot>
    previous: null
    wall: boolean
    special: boolean

    constructor(x: number, y: number) {
        this.g = 0
        this.h = 0
        this.f = 0
        this.i = x
        this.j = y
        this.width = Const.WIDTH / Const.COLS
        this.height = Const.HEIGHT / Const.ROWS
        this.neighbors = []
        this.previous = null
        this.wall = this.randomWall()
        this.special = false
    }

    randomWall(): boolean {
        if (Math.random() < Const.WEIGHT_OF_WALL) {
            return this.wall = true
        }
        return false
    }

    show(color: string): void {
        const canvas = <HTMLCanvasElement>document.getElementById("myCanvas")
        const ctx = canvas!.getContext("2d");

        ctx!.fillStyle = color
        if (this.wall) {
            ctx!.fillStyle = Const.BLACK_COLOR
        }
        if (this.special) {
            ctx!.fillStyle = Const.BLUE_COLOR
        }
        ctx!.fillRect(this.i * this.width, this.j * this.height, this.width - 1, this.height - 1);
    }

    addNeighbors(grid: any): void {
        const i = this.i
        const j = this.j

        if (i < Const.COLS - 1) {

            this.neighbors.push(grid[i + 1][j])
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1][j])

        }
        if (j < Const.ROWS - 1) {
            this.neighbors.push(grid[i][j + 1])

        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1])

        }
        if (i > 0 && j > 0) {
            this.neighbors.push(grid[i - 1][j - 1])

        }
        if (i < Const.COLS - 1 && j > 0) {
            this.neighbors.push(grid[i + 1][j - 1])

        }
        if (i > 0 && j < Const.ROWS - 1) {
            this.neighbors.push(grid[i - 1][j + 1])

        }
        if (i < Const.COLS - 1 && j < Const.ROWS - 1) {
            this.neighbors.push(grid[i + 1][j + 1])

        }

    }
}
