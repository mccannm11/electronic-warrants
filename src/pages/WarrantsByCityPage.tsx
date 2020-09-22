import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"

const WarrantsByCityChart = () => {
  const chartHeight = 750
  const chartWidth = 1500
  const chartMargin = 100

  const { processedData } = useWarrantData()
  if (!processedData) return null

  const {
    warrantsByCity,
    allCities,
    maxWarrantsOfCity,
    allCitiesByWarrantCountDescending
  } = processedData

  const y = d3
    .scaleLinear()
    .domain([0, maxWarrantsOfCity])
    .range([chartHeight, chartMargin])

  const x = d3
    .scaleBand()
    .domain(allCitiesByWarrantCountDescending)
    .range([0, chartWidth - chartMargin * 2])

  const xColorScale = d3.scaleSequential(d3.interpolatePiYG).domain(x.range())
  const yColorScale = d3
    .scaleSequential(d3.interpolateBlues)
    .domain([chartMargin, chartHeight])

  const yTicks = y.ticks()

  const barWidth = 30
  const barLeftPadding = 2

  return (
    <>
      <svg height={chartHeight} width={chartWidth}>
        <g
          className="y-axis"
          transform={`translate(${chartMargin}, -${chartMargin})`}
        >
          <line
            x1={0}
            y1={y(maxWarrantsOfCity)}
            x2={0}
            y2={y(0)}
            stroke="black"
            width={1}
          />
          {yTicks.map((tick) => (
            <text x={-30} y={y(tick)}>
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
            x2={x(allCities[allCities.length - 1]) + barLeftPadding}
            y2={y(0)}
            stroke="black"
            width={1}
          />

          {allCities.map((city) => (
            <text
              transform={`translate(${x(city) + barLeftPadding}, ${
                y(0) + 14
              }) rotate(45)`}
            >
              {city}
            </text>
          ))}
        </g>

        {allCities.map((city) => (
          <g className="bar">
            <rect
              fill={xColorScale(x(city))}
              width={barWidth}
              height={y(0) - y(warrantsByCity[city].count) - 1}
              x={x(city) + chartMargin + barLeftPadding}
              y={y(warrantsByCity[city].count) - chartMargin}
            />
          </g>
        ))}
      </svg>
    </>
  )
}

const WarrantsByCity = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by city</PageHeader>
    <WarrantsByCityChart />
  </PageWithNavigationLayout>
)

export { WarrantsByCity }
