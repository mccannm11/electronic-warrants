import React from "react"

export const AxisTop = ({ xScale, yScale }) => {
  const xRange = xScale.range()
  const yRange = yScale.range()

  return (
    <line
      x1={xRange[0]}
      x2={xRange[1]}
      y1={yRange[1]}
      y2={yRange[1]}
      stroke="black"
      width={1}
    />
  )
}
