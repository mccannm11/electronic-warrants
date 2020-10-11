import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"
import { ChartDimensions } from "./ChartDimensions"
import { AxisBottom } from "./AxisBottom"
import { AxisLeft } from "./AxisLeft"

const WarrantsByMonthAndCityStackedBarChart = () => {
  const dimensions = new ChartDimensions()
  dimensions.height = 500
  dimensions.width = 1000
  dimensions.margin = {
    top: 0,
    right: 0,
    bottom: 100,
    left: 50
  }

  const barWidth = 100

  const { records } = useWarrantData()
  if (!records) return null

  const rollupByMonth = d3.rollup(
    records,
    (r) =>
      d3.rollup(
        r,
        (m) => m.length,
        (m) => m["County of Court"]
      ),
    (r) => d3.timeMonth.floor(r.Submitted).toString()
  )

  const maxWarrantsInAMonth = d3.max(
    d3.map(rollupByMonth, (month) =>
      d3.sum(d3.map(month[1], (city) => city[1]))
    )
  )

  const allDates = d3.map(rollupByMonth, (month) => new Date(month[0]))
  const dateRange = d3.extent(allDates)

  const y = d3
    .scaleLinear()
    .domain([0, maxWarrantsInAMonth])
    .range(dimensions.getYRange())

  const xRange = dimensions.getXRange()
  const adjustedXRange = [xRange[0], xRange[1] + barWidth / 2]
  const x = d3.scaleTime().domain(dateRange).range(adjustedXRange)

  const allCities = d3.union(
    d3.merge(
      d3.map(rollupByMonth, (month) => d3.map(month[1], (city) => city[0]))
    )
  )
  const stack = d3
    .stack()
    .keys(allCities)
    .value((d, key) => d[1].get(key) ?? 0)

  const series = stack(rollupByMonth)

  const colorScale = d3
    .scaleSequential(d3.interpolateRainbow)
    .domain([allCities.size - 1, 0])

  const barColors = d3
    .scaleOrdinal()
    .domain([...allCities])
    .range([...new Array(allCities.size)].map((i, j) => colorScale(j)))

  const xTicks = x.ticks()
  const yTicks = y.ticks()

  return (
    <svg {...dimensions.getSvgDimensions()}>
      <AxisBottom xScale={x} yScale={y} />
      {xTicks.map((tick) => (
        <text transform={`translate(${x(tick)}, ${y(0) + 14}) rotate(45)`}>
          {d3.timeFormat("%B")(tick)}
        </text>
      ))}
      <AxisLeft xScale={x} yScale={y} />
      {yTicks.map((tick) => (
        <>
          <text x={x.range()[0] - 40} y={y(tick)}>
            {tick}
          </text>
          <line
            x1={x.range()[0]}
            x2={x.range()[1]}
            y1={y(tick)}
            y2={y(tick)}
            strokeWidth={1}
            stroke={"rgba(0,0,0,.5)"}
          />
        </>
      ))}

      {series.map((city) => {
        return city.map((month) => {
          const height = y(month[0]) - y(month[1])
          return (
            <rect
              fill={barColors(city.key)}
              width={barWidth}
              y={y(month[1])}
              height={height}
              x={x(new Date(month.data[0]))}
            />
          )
        })
      })}
    </svg>
  )
}

const WarrantsByMonthAndCityStackedBar = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by month stacked area</PageHeader>
    <WarrantsByMonthAndCityStackedBarChart />
  </PageWithNavigationLayout>
)

export { WarrantsByMonthAndCityStackedBar }
