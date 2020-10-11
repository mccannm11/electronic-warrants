import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"

const WarrantsByNatureStackedAreaChart = () => {
  const chartHeight = 750
  const chartWidth = 1500
  const margin = {
    top: 10,
    right: 200,
    bottom: 200,
    left: 50
  }

  const { processedData } = useWarrantData()
  if (!processedData) return null

  const {
    allNaturesIncludingOther,
    warrantsByDateGroupedByNature,
    oldestDate,
    mostRecentDate,
    maxWarrantsPerDay
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

  const warrantsByDateGroupedByNatureArray = Object.keys(
    warrantsByDateGroupedByNature
  ).map((date) => {
    return {
      date,
      ...warrantsByDateGroupedByNature[date]
    }
  })

  const series = d3.stack().keys(allNaturesIncludingOther)(
    warrantsByDateGroupedByNatureArray
  )

  const colorScale = d3
    .scaleSequential(d3.interpolateRainbow)
    .domain([allNaturesIncludingOther.length - 1, 0])

  const barColors = d3
    .scaleOrdinal()
    .domain(allNaturesIncludingOther)
    .range(
      [...new Array(allNaturesIncludingOther.length)].map((i, j) =>
        colorScale(j)
      )
    )

  const xTicks = x.ticks(d3.timeMonth.every(1))

  return (
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
          <text x={x.range()[0] - 30} y={y(tick)}>
            {tick}
          </text>
        ))}
      </g>
      <g className="x-axis">
        <line
          y1={y.range()[0]}
          y2={y.range()[0]}
          x1={x.range()[0]}
          x2={x.range()[1]}
          stroke="black"
          width={1}
        />
        {xTicks.map((tick) => (
          <text transform={`translate(${x(tick)}, ${y(0) + 16}) rotate(45)`}>
            {d3.timeFormat("%B")(tick)}
          </text>
        ))}
      </g>

      {series.map((s) => {
        let color = barColors(s.key) as string
        if (s.key === "Other") {
          color = "yellow"
        }

        const line = d3
          .area()
          .x((d) => x(new Date(d.data.date)))
          .y0((d) => y(d[0]))
          .y1((d) => y(d[1]))
          .curve(d3.curveMonotoneX)

        return <path fill={color} d={line(s as any)} />
      })}

      {allNaturesIncludingOther.map((nature, i) => {
        return (
          <rect
            fill={barColors(nature)}
            x={300 + i * 20}
            y={margin.top}
            height={10}
            width={10}
          />
        )
      })}
    </svg>
  )
}

const WarrantsByNatureStackedArea = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by nature stacked area</PageHeader>
    <WarrantsByNatureStackedAreaChart />
  </PageWithNavigationLayout>
)

export { WarrantsByNatureStackedArea }
