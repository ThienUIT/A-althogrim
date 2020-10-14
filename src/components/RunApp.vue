<template>
  <canvas id="myCanvas" :width="width" :height="height" style="border:1px solid #000000;">

  </canvas>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Spot} from "@/components/Spot";
import {Const} from "@/components/config.const";

@Component({})
export default class HelloWorld extends Vue {

  //const
  width = Const.WIDTH
  height = Const.HEIGHT
  cols = Const.COLS
  rows = Const.ROWS
  //set template
  w: number = 0
  h: number = 0
  grid = new Array()
  openSet = new Array()
  closeSet = new Array()
  startNode ?: Spot
  endNode ?: Spot
  path: Array<Spot> = []
  noSolution = false

  setup() {
    // making array 2D
    for (let i = 0; i < this.cols; i++) {
      this.grid[i] = new Array(this.rows)
    }
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j] = new Spot(i, j)
      }
    }
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].addNeighbors(this.grid)
      }
    }


    this.startNode = this.grid[0][0]
    this.startNode!.wall = false
    this.startNode!.special = true

    this.endNode = this.grid[Const.POSITION(this.cols - 1)][Const.POSITION(this.rows - 1)]
    this.endNode!.wall = false
    this.endNode!.special = true

    this.openSet.push(this.startNode)
  }

  draw() {
    if (this.openSet.length > 0) {
      let winner = 0;
      for (let i = 0; i < this.openSet.length; i++) {
        if (this.openSet[i].f < this.openSet[winner].f) {
          winner = i
        }
      }
      const current = this.openSet[winner]

      if (current === this.endNode && !this.noSolution) {
        //find the path
        let temp = current
        this.path.push(temp)
        while (temp.previous) {
          this.path.push(temp.previous)
          temp = temp.previous
        }
        //found the path
        for (let i = 0; i < this.path.length; i++) {
          this.path[i].show(Const.BLUE_COLOR)
        }
        return;
        console.log("DONE")
      }

      this.removeFromArray(this.openSet, current)
      this.closeSet.push(current)

      const neighbors = current.neighbors

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i]
        if (!this.closeSet.includes(neighbor) && !neighbor.wall) {
          const tempG = current.g + 1
          let newPath = false
          if (this.openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG
              newPath = true
            }
          } else {
            neighbor.g = tempG
            newPath = true
            this.openSet.push(neighbor)
          }
          if (newPath) {
            neighbor.h = this.heuristic(neighbor, this.endNode)
            neighbor.f = neighbor.g + neighbor.h
            neighbor.previous = current
          }
        }
      }
    } else {
      this.noSolution = true
      return;
      console.log("CAN NOT  FIND THE GOAL")
    }

    this.drawColor()
  }

  drawColor() {
    // background
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].show(Const.WHITE_COLOR)
      }
    }
    //  passed node
    for (let i = 0; i < this.closeSet.length; i++) {
      this.closeSet[i].show(Const.RED_COLOR)
    }
    // future node
    for (let i = 0; i < this.openSet.length; i++) {
      this.openSet[i].show(Const.GREEN_COLOR)
    }
  }


  heuristic(a: any, b: any): number {
    const x = (b.i - a.i) * 2
    const y = (b.j - a.j) * 2
    const distant = Math.sqrt(Math.abs(y - x))
    return distant
  }

  removeFromArray(arr: Array<Spot>, elt: Spot) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] == elt)
        arr.splice(i, 1)
    }
  }


  mounted() {
    this.setup()
    setInterval(this.draw, 100)
  }


}
</script>

