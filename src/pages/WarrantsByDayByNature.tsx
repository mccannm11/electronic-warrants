import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"
import { ChartDimensions } from "./ChartDimensions"
import { AxisBottom } from "./AxisBottom"
import { AxisLeft } from "./AxisLeft"

const WarrantsByDayByNatureChart = () => {
  const barWidth = 6

  const dimensions = new ChartDimensions()
  dimensions.width = 1500
  dimensions.height = 750
  dimensions.margin = {
    top: 0,
    right: 50,
    bottom: 100,
    left: 40
  }

  const { processedData } = useWarrantData()
  if (!processedData) return null

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
    .domain([d3.timeMonth.floor(oldestDate), d3.timeMonth.ceil(mostRecentDate)])
    .range(dimensions.getXRange())

  const yTicks = y.ticks()
  const xTicks = x.ticks(d3.timeMonth.every(1))

  const colorScale = d3
    .scaleSequential(d3.interpolateBlues)
    .domain([allNaturesIncludingOther.length - 1, 0])

  const barColors = d3
    .scaleOrdinal()
    .domain(allNaturesIncludingOther)
    .range(
      [...new Array(allNaturesIncludingOther.length)].map((i, j) =>
        colorScale(j)
      )
    )

  return (
    <svg {...dimensions.getSvgDimensions()}>
      <AxisBottom xScale={x} yScale={y} />
      {yTicks.map((tick) => (
        <text x={x.range()[0] - 30} y={y(tick)}>
          {tick}
        </text>
      ))}
      <AxisLeft yScale={y} xScale={x} />
      {xTicks.map((tick) => (
        <text transform={`translate(${x(tick)}, ${y(0) + 14}) rotate(45)`}>
          {d3.timeFormat("%B")(tick)}
        </text>
      ))}
      {allDatesDescending.map((date) => {
        let usedHeight = 0

        return allNaturesIncludingOther.map((nature) => {
          const barHeight =
            y.range()[0] -
            y(warrantsByDateGroupedByNature[date.toDateString()][nature])

          usedHeight += barHeight

          return (
            <rect
              x={x(date)}
              y={dimensions.height - usedHeight + dimensions.margin.top}
              width={barWidth}
              fill={barColors(nature) as string}
              height={barHeight}
            />
          )
        })
      })}
      )
    </svg>
  )
}

const WarrantsByDayByNature = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by day and nature</PageHeader>
    <WarrantsByDayByNatureChart />
  </PageWithNavigationLayout>
)

export { WarrantsByDayByNature }
