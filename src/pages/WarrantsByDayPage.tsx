import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"

const WarrantsByDayChart = () => {
  const chartHeight = 750
  const chartWidth = 1250
  const chartMargin = 200
  const barWidth = 4

  const { processedData } = useWarrantData()
  if (!processedData) return null

  const {
    maxWarrantsPerDay,
    oldestDate,
    mostRecentDate,
    warrantCountByDay
  } = processedData

  const y = d3
    .scaleLinear()
    .domain([0, maxWarrantsPerDay.count])
    .range([chartHeight, chartMargin + 200])

  const x = d3
    .scaleTime()
    .domain([d3.timeMonth.floor(oldestDate), mostRecentDate])
    .range([0, chartWidth - chartMargin])

  const colorScale = d3
    .scaleSequential(d3.interpolateBrBG)
    .domain([0, chartWidth - chartMargin])

  const yTicks = y.ticks()
  const xTicks = x.ticks(d3.timeMonth.every(1))

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
            <text x={-20} y={y(tick)}>
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
            x2={x(mostRecentDate)}
            y2={y(0)}
            stroke="black"
            width={1}
          />

          {xTicks.map((tick) => (
            <text transform={`translate(${x(tick)}, ${y(0) + 14}) rotate(45)`}>
              {d3.timeFormat("%B")(tick)}
            </text>
          ))}
        </g>

        {warrantCountByDay.map((warrantCount) => (
          <g className="bar">
            <rect
              fill={colorScale(x(warrantCount.date))}
              width={barWidth}
              height={y(0) - y(warrantCount.count) - 1}
              x={x(warrantCount.date) + chartMargin}
              y={y(warrantCount.count) - chartMargin}
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