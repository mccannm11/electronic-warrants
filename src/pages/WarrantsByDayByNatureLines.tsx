import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import path from "path"
import { useWarrantData } from "./useWarrantData"

const WarrantsByDayByNatureLinesChart = () => {
  const chartHeight = 750
  const chartWidth = 2000
  const chartMargin = 100
  const barWidth = 8
  const barLeftPadding = 10

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
    .range([chartHeight, chartMargin])

  const x = d3
    .scaleTime()
    .domain([d3.timeMonth.floor(oldestDate), mostRecentDate])
    .range([0, chartWidth - chartMargin])

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
      d: d3.line()(
        allDatesDescending.map((date) => [
          x(date) + chartMargin,
          y(warrantsByDateGroupedByNature[date.toDateString()][nature]) -
            chartMargin -
            1
        ])
      ),
      nature
    }
  })

  return (
    <>
      <svg height={chartHeight} width={chartWidth}>
        <g
          className="y-axis"
          transform={`translate(${chartMargin}, -${chartMargin})`}
        >
          <line
            x1={0}
            y1={y(maxWarrantsPerDay.count)}
            x2={0}
            y2={y(0)}
            stroke="black"
            width={1}
          />
          {yTicks.map((tick) => (
            <text x={-40} y={y(tick)}>
              {tick}
            </text>
          ))}
        </g>
        <g
          className="x-axis"
          transform={`translate(${chartMargin}, -${chartMargin})`}
        >
          <line
            x1={0}
            y1={y(0)}
            x2={x(allDatesDescending[allDatesDescending.length - 1])}
            y2={y(0)}
            stroke="black"
            width={1}
          />

          {xTicks.map((tick) => (
            <text
              transform={`translate(${x(tick) + barLeftPadding}, ${
                y(0) + 14
              }) rotate(45)`}
            >
              {d3.timeFormat("%B")(tick)}
            </text>
          ))}
        </g>
        {lines.map((line) => (
          <path
            d={line.d}
            stroke={lineColors(line.nature) as string}
            strokeWidth={2}
            fill="none"
          />
        ))}
      </svg>
    </>
  )
}

const WarrantsByDayByNatureLines = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by day and nature</PageHeader>
    <WarrantsByDayByNatureLinesChart />
  </PageWithNavigationLayout>
)

export { WarrantsByDayByNatureLines }
