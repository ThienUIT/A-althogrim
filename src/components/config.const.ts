export class Const {
    static readonly WIDTH = 1000
    static readonly HEIGHT = 800
    static readonly COLS = 25
    static readonly ROWS = 25
    static readonly WEIGHT_OF_WALL = 0.3

    static POSITION(a: number): number {
        return Math.floor(Math.random() * (a - 0 + 1) + 0);
    }
}
