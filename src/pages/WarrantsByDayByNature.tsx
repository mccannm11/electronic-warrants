import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"

const WarrantsByDayByNatureChart = () => {
  const chartHeight = 750
  const chartWidth = 1500
  const chartMargin = 100
  const barWidth = 7
  const barLeftPadding = 5

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

  const barColors = d3
    .scaleOrdinal()
    .domain(allNaturesIncludingOther)
    .range(
      [...new Array(allNaturesIncludingOther.length)].map((i, j) =>
        colorScale(j)
      )
    )

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
        {allDatesDescending.map((date) => {
          let usedHeight = 0

          return allNaturesIncludingOther.map((nature) => {
            const barHeight =
              y(0) -
              y(warrantsByDateGroupedByNature[date.toDateString()][nature])

            usedHeight += barHeight

            return (
              <rect
                x={x(date) + chartMargin}
                y={chartHeight - usedHeight - chartMargin}
                width={barWidth}
                fill={barColors(nature) as string}
                height={barHeight}
              />
            )
          })
        })}
        )
      </svg>
    </>
  )
}

const WarrantsByDayByNature = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by day and nature</PageHeader>
    <WarrantsByDayByNatureChart />
  </PageWithNavigationLayout>
)

export { WarrantsByDayByNature }
