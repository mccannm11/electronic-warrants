import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"

const WarrantsByDayByNatureChart = () => {
  const chartHeight = 750,
    chartWidth = 1500,
    chartMargin = 100,
    barWidth = 7,
    barLeftPadding = 5,
    margin = {
      top: 20,
      right: 100,
      bottom: 100,
      left: 50
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
    .range([chartHeight + margin.top, margin.top])

  const x = d3
    .scaleTime()
    .domain([d3.timeMonth.floor(oldestDate), mostRecentDate])
    .range([margin.left, chartWidth + margin.left])

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
      <svg
        height={chartHeight + margin.top + margin.bottom}
        width={chartWidth + margin.left + margin.right}
      >
        <g className="y-axis">
          <line
            x1={x.range()[0]}
            x2={x.range()[0]}
            y1={y.range()[1]}
            y2={y.range()[0]}
            stroke="black"
            width={1}
          />
          {yTicks.map((tick) => (
            <text x={x.range()[0] - 40} y={y(tick)}>
              {tick}
            </text>
          ))}
        </g>
        <g className="x-axis">
          <line
            x1={x.range()[0]}
            x2={x.range()[1]}
            y1={y.range()[0]}
            y2={y.range()[0]}
            stroke="black"
            width={1}
          />

          {xTicks.map((tick) => (
            <text transform={`translate(${x(tick)}, ${y(0) + 14}) rotate(45)`}>
              {d3.timeFormat("%B")(tick)}
            </text>
          ))}
        </g>
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
                y={chartHeight - usedHeight + margin.top}
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
