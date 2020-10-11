export type Margin = {
  top: number
  right: number
  bottom: number
  left: number
}

export class ChartDimensions {
  margin: Margin
  height: number
  width: number

  getSvgWidth() {
    return this.width + this.margin.left + this.margin.right
  }

  getSvgHeight() {
    return this.height + this.margin.top + this.margin.bottom
  }

  getXRange() {
    return [this.margin.left, this.width + this.margin.left]
  }

  getYRange() {
    return [this.height + this.margin.top, this.margin.top]
  }

  getSvgDimensions() {
    return { height: this.getSvgHeight(), width: this.getSvgWidth() }
  }
}
