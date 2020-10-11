import { Margin } from "./ChartDimensions"

export default function () {
  let height,
    width = 0

  let margin: Margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  function dimensions() {}

  dimensions.height = (h: number) => {
    height = h
    return this
  }

  dimensions.width = (w: number) => {
    width = w
    return this
  }

  dimensions.size = (s: number) => {
    height = s
    width = s
    return this
  }

  dimensions.margin = (m: Margin) => {
    margin = m
    return this
  }

  dimensions.getSvgWidth = () => {
    return width + margin.left + margin.right
  }

  dimensions.getSvgHeight = () => {
    return height + margin.top + margin.bottom
  }
  dimensions.getSvgProps = () => ({
    height: this.getSvgHeight(),
    width: this.getSvgWidth()
  })

  dimensions.getXRange = () => {
    return [margin.left, width + margin.left]
  }

  dimensions.getYRange = () => {
    return [height + margin.top, margin.top]
  }

  return dimensions
}
