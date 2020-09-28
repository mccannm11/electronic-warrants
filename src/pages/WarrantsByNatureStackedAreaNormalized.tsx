import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"

const WarrantsByNatureStackedAreaChartNormalized = () => {
  const chartHeight = 750,
    chartWidth = 1500,
    margin = {
      top: 5,
      right: 50,
      bottom: 50,
      left: 50
    }

  const { processedData } = useWarrantData()
  if (!processedData) return null

  const {
    allNaturesIncludingOther,
    warrantsByDateGroupedByNature,
    oldestDate,
    mostRecentDate
  } = processedData

  const y = d3
    .scaleLinear()
    .domain([0, 1])
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

  const series = d3
    .stack()
    .offset(d3.stackOffsetExpand)
    .keys(allNaturesIncludingOther)(warrantsByDateGroupedByNatureArray)

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

  return (
    <svg
      height={chartHeight + margin.top + margin.bottom}
      width={chartWidth + margin.right + margin.left}
    >
      <g className="y-axis">
        <line
          x1={x.range()[0]}
          y1={y.range()[1]}
          x2={x.range()[0]}
          y2={y.range()[0]}
          stroke="black"
          width={1}
        />
        {yTicks.map((tick) => (
          <text x={0} y={y(tick) + 7}>
            {tick * 100}%
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
      </g>

      {series.map((s) => {
        let color = barColors(s.key) as string
        const line = d3
          .area()
          .x((d) => x(new Date(d.data.date)))
          .y0((d) => y(d[0]))
          .y1((d) => y(d[1]))
          .curve(d3.curveMonotoneX)

        return <path fill={color} d={line(s as any)} />
      })}
    </svg>
  )
}

const WarrantsByNatureStackedAreaNormalized = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by nature stacked area</PageHeader>
    <WarrantsByNatureStackedAreaChartNormalized />
  </PageWithNavigationLayout>
)

export { WarrantsByNatureStackedAreaNormalized }
