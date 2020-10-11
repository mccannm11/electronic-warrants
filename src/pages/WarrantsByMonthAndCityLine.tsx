import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"
import { ChartDimensions } from "./ChartDimensions"
import { AxisBottom } from "./AxisBottom"
import { AxisLeft } from "./AxisLeft"
import path from "path"

const WarrantsByMonthAndCityStackedAreaChart = () => {
  const dimensions = new ChartDimensions()
  dimensions.height = 500
  dimensions.width = 1000
  dimensions.margin = {
    top: 0,
    right: 100,
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

  const allDates = d3.map(rollupByMonth, (month) => new Date(month[0]))
  const dateRange = d3.extent(allDates)

  const y = d3.scaleLinear().domain([0, 55]).range(dimensions.getYRange())

  const xRange = dimensions.getXRange()
  const adjustedXRange = [xRange[0], xRange[1] + barWidth / 2]
  const x = d3.scaleTime().domain(dateRange).range(adjustedXRange)

  const allCities = d3.union(
    d3.merge(
      d3.map(rollupByMonth, (month) => d3.map(month[1], (city) => city[0]))
    )
  )

  const warrantsCountByCity = d3.rollup(
    records,
    (r) => r.length,
    (r) => r["County of Court"]
  )

  const top3Cities = d3
    .sort(warrantsCountByCity, (a, b) => d3.descending(a[1], b[1]))
    .slice(0, 3)
    .map((r) => r[0])

  console.log(top3Cities)

  const colorScale = d3
    .scaleSequential(d3.interpolateRainbow)
    .domain([allCities.size - 1, 0])

  const barColors = d3
    .scaleOrdinal()
    .domain([...top3Cities])
    .range([...new Array(top3Cities.size)].map((i, j) => colorScale(j)))

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

      {d3.map(top3Cities, (city) => {
        const points = xTicks.map((month) => {
          const warrantsInMonth =
            rollupByMonth.get(month.toString()).get(city) ?? 0
          return [x(month), y(warrantsInMonth)]
        })

        const line = d3.line()
        console.log(points)
        const delauny = d3.Delaunay.from(points)
        const voronoi = delauny.voronoi([
          dimensions.margin.left,
          dimensions.margin.top,
          dimensions.width + dimensions.margin.left,
          dimensions.height + dimensions.margin.top
        ])
        console.log(voronoi)

        const voronoiPath = voronoi.render()

        return (
          <>
            {/*<path fill="none" stroke={barColors(city)} width={2} d={line} />*/}
            <path
              fill={barColors(city)}
              stroke={barColors(city)}
              width={1}
              d={voronoiPath}
            />
          </>
        )
      })}
    </svg>
  )
}

const WarrantsByMonthAndCityLine = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by month - top 3 cities line</PageHeader>
    <WarrantsByMonthAndCityStackedAreaChart />
  </PageWithNavigationLayout>
)

export { WarrantsByMonthAndCityLine }
