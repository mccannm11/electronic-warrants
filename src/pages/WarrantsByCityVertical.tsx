import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"
import _ from "lodash"
import { ChartDimensions } from "./ChartDimensions"
import { AxisLeft } from "./AxisLeft"
import { AxisTop } from "./AxisTop"

const WarrantsByCityVerticalChart = () => {
  const barWidth = 14

  const dimensions = new ChartDimensions()
  dimensions.height = 900
  dimensions.width = 1500
  dimensions.margin = {
    top: 20,
    right: 25,
    bottom: 25,
    left: 100
  }

  const { processedData, records } = useWarrantData()
  if (!processedData) return null
  if (!records) return null

  const {
    maxWarrantsOfCity,
    allCitiesByWarrantCountDescending,
    allNatures
  } = processedData

  const x = d3
    .scaleLinear()
    .domain([0, maxWarrantsOfCity])
    .range(dimensions.getXRange())

  const xTicks = x.ticks()

  const y = d3
    .scaleBand()
    .domain(_.reverse(allCitiesByWarrantCountDescending))
    .range(dimensions.getYRange())
    .padding(1.25)
    .paddingOuter(0.75)

  const groupedByCity = d3.rollup(
    records,
    (r) => r,
    (r) => r["County of Court"],
    (r) => r["Primary Nature"]
  )

  const groupedByCityArray = [...groupedByCity.keys()].map((key) => {
    const counts = {}

    allNatures.forEach(
      (n) => (counts[n] = groupedByCity.get(key)?.get(n)?.length ?? 0)
    )

    return {
      key: key,
      ...counts
    }
  })

  const stack = d3.stack().keys(_.uniq(allNatures))
  const series = stack(groupedByCityArray)
  const uniqueNatures = _.uniq(allNatures)
  const colorScale = d3
    .scaleSequential(d3.interpolateRainbow)
    .domain([uniqueNatures.length - 1, 0])
  const barColors = d3
    .scaleOrdinal()
    .domain(uniqueNatures)
    .range(
      [...new Array(uniqueNatures.length)].map((i, j) => colorScale(j * 5))
    )

  return (
    <svg {...dimensions.getSvgDimensions()}>
      <AxisLeft xScale={x} yScale={y} />
      {allCitiesByWarrantCountDescending.map((city) => (
        <text
          fontSize="12px"
          transform={`translate(${dimensions.margin.left - 100}, ${
            y(city) + 10
          })`}
        >
          {city}
        </text>
      ))}
      <AxisTop yScale={y} xScale={x} />
      {xTicks.map((tick) => (
        <text fontSize="12px" x={x(tick)} y={y.range()[1] - 8}>
          {tick}
        </text>
      ))}

      {series.map((s) => {
        return s.map((r) => {
          return (
            <rect
              x={x(r[0])}
              y={y(r.data.key) - 4}
              width={x(r[1]) - x(r[0])}
              height={barWidth}
              fill={barColors(s.key)}
            />
          )
        })
      })}
    </svg>
  )
}

const WarrantsByCityVertical = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by city vertical</PageHeader>
    <WarrantsByCityVerticalChart />
  </PageWithNavigationLayout>
)

export { WarrantsByCityVertical }
