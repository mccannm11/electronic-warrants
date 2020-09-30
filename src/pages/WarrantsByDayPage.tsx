import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"
import { ChartDimensions } from "./ChartDimensions"
import { AxisLeft } from "./AxisLeft"
import { AxisBottom } from "./AxisBottom"

const WarrantsByDayChart = () => {
  const { processedData } = useWarrantData()
  if (!processedData) return null

  const dimensions = new ChartDimensions()
  dimensions.margin = {
    top: 25,
    right: 0,
    bottom: 75,
    left: 50
  }
  dimensions.width = 1500
  dimensions.height = 750
  const barWidth = 6

  const {
    maxWarrantsPerDay,
    oldestDate,
    mostRecentDate,
    warrantCountByDay
  } = processedData

  const y = d3
    .scaleLinear()
    .domain([0, maxWarrantsPerDay.count])
    .range(dimensions.getYRange())

  const x = d3
    .scaleTime()
    .domain([d3.timeMonth.floor(oldestDate), mostRecentDate])
    .range(dimensions.getXRange())

  const colorScale = d3
    .scaleSequential(d3.interpolateBrBG)
    .domain(dimensions.getXRange())

  const yTicks = y.ticks()
  const xTicks = x.ticks(d3.timeMonth.every(1))

  return (
    <>
      <svg {...dimensions.getSvgDimensions()}>
        <AxisLeft yScale={y} xScale={x} />
        {yTicks.map((tick) => (
          <text x={x.range()[0] - 24} y={y(tick)}>
            {tick}
          </text>
        ))}
        <AxisBottom yScale={y} xScale={x} />
        {xTicks.map((tick) => (
          <text transform={`translate(${x(tick)}, ${y(0) + 14}) rotate(45)`}>
            {d3.timeFormat("%B")(tick)}
          </text>
        ))}
        {warrantCountByDay.map((warrantCount) => (
          <g className="bar">
            <rect
              fill={colorScale(x(warrantCount.date))}
              width={barWidth}
              height={y.range()[0] - y(warrantCount.count) - 1}
              x={x(warrantCount.date)}
              y={y(warrantCount.count)}
            />
          </g>
        ))}
      </svg>
    </>
  )
}

const WarrantsByDay = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by day</PageHeader>
    <WarrantsByDayChart />
  </PageWithNavigationLayout>
)

export { WarrantsByDay }
