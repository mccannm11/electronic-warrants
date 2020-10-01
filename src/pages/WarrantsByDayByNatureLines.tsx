import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import path from "path"
import { useWarrantData } from "./useWarrantData"
import { ChartDimensions } from "./ChartDimensions"
import { AxisBottom } from "./AxisBottom"
import { AxisLeft } from "./AxisLeft"

const WarrantsByDayByNatureLinesChart = () => {
  const { processedData } = useWarrantData()
  if (!processedData) return null

  const dimensions = new ChartDimensions()
  dimensions.height = 750
  dimensions.width = 1000
  dimensions.margin = {
    top: 0,
    right: 0,
    bottom: 100,
    left: 50
  }

  const {
    warrantsByDateGroupedByNature,
    maxWarrantsPerDay,
    allDatesDescending,
    oldestDate,
    mostRecentDate,
    allNaturesIncludingOther
  } = processedData

  const y = d3
    .scaleLinear()
    .domain([0, maxWarrantsPerDay.count])
    .range(dimensions.getYRange())

  const x = d3
    .scaleTime()
    .domain([d3.timeMonth.floor(oldestDate), mostRecentDate])
    .range(dimensions.getXRange())

  const yTicks = y.ticks()
  const xTicks = x.ticks(d3.timeMonth.every(1))

  const colorScale = d3
    .scaleSequential(d3.interpolateBlues)
    .domain([allNaturesIncludingOther.length - 1, 0])

  const lineColors = d3
    .scaleOrdinal()
    .domain(allNaturesIncludingOther)
    .range(
      [...new Array(allNaturesIncludingOther.length)].map((i, j) =>
        colorScale(j)
      )
    )

  const lines = allNaturesIncludingOther.map((nature) => {
    return {
      d: d3.line()([
        [x.range()[0], y.range()[0]],
        ...allDatesDescending.map((date) => [
          x(date),
          y(warrantsByDateGroupedByNature[date.toDateString()][nature]) - 1
        ])
      ]),
      nature
    }
  })

  return (
    <svg {...dimensions.getSvgDimensions()}>
      <AxisLeft xScale={x} yScale={y} />
      {yTicks.map((tick) => (
        <text x={x.range()[0] - 40} y={y(tick)}>
          {tick}
        </text>
      ))}
      <AxisBottom xScale={x} yScale={y} />
      {xTicks.map((tick) => (
        <text transform={`translate(${x(tick)}, ${y(0) + 14}) rotate(45)`}>
          {d3.timeFormat("%B")(tick)}
        </text>
      ))}
      {lines.map((line) => (
        <path
          d={line.d}
          stroke={lineColors(line.nature) as string}
          strokeWidth={2}
          fill="none"
        />
      ))}
    </svg>
  )
}

const WarrantsByDayByNatureLines = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by day and nature</PageHeader>
    <WarrantsByDayByNatureLinesChart />
  </PageWithNavigationLayout>
)

export { WarrantsByDayByNatureLines }
