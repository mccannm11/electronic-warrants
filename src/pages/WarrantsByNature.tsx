import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"
import { ChartDimensions } from "./ChartDimensions"
import { AxisBottom } from "./AxisBottom"
import { AxisLeft } from "./AxisLeft"

const WarrantsByNatureChart = () => {
  const barWidth = 30
  const barLeftPadding = 10

  const dimensions = new ChartDimensions()
  dimensions.height = 500
  dimensions.width = 750
  dimensions.margin = {
    top: 0,
    right: 50,
    bottom: 200,
    left: 50
  }

  const { processedData } = useWarrantData()
  if (!processedData) return null

  const {
    warrantsByNature,
    maxWarrantsOfNature,
    allNaturesByWarrantCountDescending
  } = processedData

  const y = d3
    .scaleLinear()
    .domain([0, maxWarrantsOfNature])
    .range(dimensions.getYRange())

  const x = d3
    .scaleBand()
    .domain(allNaturesByWarrantCountDescending)
    .range(dimensions.getXRange())

  const colorScale = d3
    .scaleSequential(d3.interpolateBlues)
    .domain([allNaturesByWarrantCountDescending.length - 1, 0])

  const barColors = d3
    .scaleOrdinal()
    .domain(allNaturesByWarrantCountDescending)
    .range(
      [...new Array(allNaturesByWarrantCountDescending.length)].map((i, j) =>
        colorScale(j * 0.5)
      )
    )

  const yTicks = y.ticks()

  return (
    <svg {...dimensions.getSvgDimensions()}>
      <AxisLeft xScale={x} yScale={y} />
      {yTicks.map((tick) => (
        <text x={x.range()[0] - 40} y={y(tick)}>
          {tick}
        </text>
      ))}

      <AxisBottom xScale={x} yScale={y} />
      {allNaturesByWarrantCountDescending.map((nature) => (
        <text
          transform={`translate(${x(nature) + barLeftPadding}, ${
            y(0) + 14
          }) rotate(45)`}
        >
          {nature}
        </text>
      ))}

      {allNaturesByWarrantCountDescending.map((nature) => (
        <rect
          fill={barColors(nature)}
          width={barWidth}
          height={y.range()[0] - y(warrantsByNature[nature].count) - 1}
          x={x(nature) + barLeftPadding}
          y={y(warrantsByNature[nature].count)}
        />
      ))}
    </svg>
  )
}

const WarrantsByNature = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by nature</PageHeader>
    <WarrantsByNatureChart />
  </PageWithNavigationLayout>
)

export { WarrantsByNature }
