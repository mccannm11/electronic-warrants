import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"
import { ChartDimensions } from "./ChartDimensions"
import { AxisBottom } from "./AxisBottom"
import { AxisLeft } from "./AxisLeft"

const WarrantsByCityChart = () => {
  const { processedData } = useWarrantData()
  if (!processedData) return null

  const dimensions = new ChartDimensions()
  dimensions.width = 1500
  dimensions.height = 750
  dimensions.margin = {
    top: 0,
    right: 25,
    bottom: 100,
    left: 50
  }

  const barWidth = 30
  const barLeftPadding = 2

  const {
    warrantsByCity,
    allCities,
    maxWarrantsOfCity,
    allCitiesByWarrantCountDescending
  } = processedData

  const y = d3
    .scaleLinear()
    .domain([0, maxWarrantsOfCity])
    .range(dimensions.getYRange())

  const x = d3
    .scaleBand()
    .domain(allCitiesByWarrantCountDescending)
    .range(dimensions.getXRange())

  const xColorScale = d3.scaleSequential(d3.interpolatePiYG).domain(x.range())
  const yTicks = y.ticks()

  return (
    <svg height={dimensions.getSvgHeight()} width={dimensions.getSvgWidth()}>
      <AxisLeft xScale={x} yScale={y} />
      {yTicks.map((tick) => (
        <text x={x.range()[0] - 35} y={y(tick)}>
          {tick}
        </text>
      ))}

      <AxisBottom xScale={x} yScale={y} />
      {allCities.map((city) => (
        <text
          transform={`translate(${x(city) + barLeftPadding}, ${
            y(0) + 14
          }) rotate(45)`}
        >
          {city}
        </text>
      ))}

      {allCities.map((city) => (
        <g className="bar">
          <rect
            fill={xColorScale(x(city))}
            width={barWidth}
            height={y.range()[0] - y(warrantsByCity[city].count)}
            x={x(city) + barLeftPadding}
            y={y(warrantsByCity[city].count)}
          />
        </g>
      ))}
    </svg>
  )
}

const WarrantsByCity = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by city</PageHeader>
    <WarrantsByCityChart />
  </PageWithNavigationLayout>
)

export { WarrantsByCity }
