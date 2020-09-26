import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"

const WarrantsByNatureStackedAreaChartNormalized = () => {
  const chartHeight = 750
  const chartWidth = 1500
  const chartMargin = 50
  const barWidth = 20
  const barLeftPadding = 10

  const { processedData } = useWarrantData()
  if (!processedData) return null

  const {
    allNaturesIncludingOther,
    warrantsByDateGroupedByNature,
    allDatesDescending,
    oldestDate,
    mostRecentDate,
    maxWarrantsPerDay
  } = processedData

  const y = d3
    .scaleLinear()
    .domain([0, 1])
    .range([chartHeight, chartMargin * 2])

  const x = d3
    .scaleTime()
    .domain([d3.timeMonth.floor(oldestDate), mostRecentDate])
    .range([0, chartWidth - chartMargin])

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
    <>
      <svg height={chartHeight} width={chartWidth}>
        <g
          className="y-axis"
          transform={`translate(${chartMargin}, -${chartMargin})`}
        >
          <line x1={0} y1={y(1)} x2={0} y2={y(0)} stroke="black" width={1} />
          {yTicks.map((tick) => (
            <text x={-45} y={y(tick) + 7}>
              {tick * 100}%
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
        </g>

        {series.map((s) => {
          let color = barColors(s.key) as string
          if (s.key === "Other") {
            color = "yellow"
          }

          const line = d3
            .area()
            .x((d) => x(new Date(d.data.date)) + chartMargin)
            .y0((d) => y(d[0]) - chartMargin)
            .y1((d) => y(d[1]) - chartMargin)
            .curve(d3.curveMonotoneX)

          return <path fill={color} d={line(s as any)} />
        })}
      </svg>
    </>
  )
}

const WarrantsByNatureStackedAreaNormalized = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by nature stacked area</PageHeader>
    <WarrantsByNatureStackedAreaChartNormalized />
  </PageWithNavigationLayout>
)

export { WarrantsByNatureStackedAreaNormalized }