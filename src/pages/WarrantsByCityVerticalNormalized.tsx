import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"
import _ from "lodash"
import { log } from "util"

const WarrantsByCityVerticalNormalizedChart = () => {
  const chartHeight = 1000
  const chartWidth = 1500
  const chartMargin = 200

  const { processedData, records } = useWarrantData()
  if (!processedData) return null
  if (!records) return null

  const { allCitiesByWarrantCountDescending, allNatures } = processedData

  const x = d3
    .scaleLinear()
    .domain([0, 1])
    .range([chartMargin, chartHeight + chartMargin])

  const y = d3
    .scaleBand()
    .domain(allCitiesByWarrantCountDescending)
    .range([chartMargin, chartHeight + chartMargin])
    .padding(1.25)
    .paddingOuter(0.75)

  // console.log(records)
  const groupedByCity = d3.rollup(
    records,
    (r) => r,
    (r) => r["County of Court"],
    (r) => r["Primary Nature"]
  )

  console.log(groupedByCity)
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

  const stack = d3.stack().offset(d3.stackOffsetExpand).keys(_.uniq(allNatures))
  const series = stack(groupedByCityArray)
  console.log(series)

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

  const barWidth = 18
  const barLeftPadding = 2

  const xTicks = x.ticks()

  return (
    <>
      <svg
        height={chartHeight + chartMargin * 2}
        width={chartWidth + chartMargin * 2}
      >
        <g className="y-axis">
          <line
            x1={x.range()[0]}
            x2={x.range()[0]}
            y1={y.range()[0]}
            y2={y.range()[1]}
            stroke="black"
            width={1}
          />
          {allCitiesByWarrantCountDescending.map((city) => (
            <text fontSize="12px" transform={`translate(100, ${y(city) + 10})`}>
              {city}
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
            <text fontSize="12px" x={x(tick)} y={y.range()[0] - 8}>
              {tick * 100}%
            </text>
          ))}
        </g>

        <g>
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
        </g>
      </svg>
    </>
  )
}

const WarrantsByCityVerticalNormalized = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by city</PageHeader>
    <WarrantsByCityVerticalNormalizedChart />
  </PageWithNavigationLayout>
)

export { WarrantsByCityVerticalNormalized }
