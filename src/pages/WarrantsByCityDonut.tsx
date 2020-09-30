import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"
import { ChartDimensions } from "./ChartDimensions"

const WarrantsByCityDonutChart = () => {
  const dimensions = new ChartDimensions()
  dimensions.height = 500
  dimensions.width = 500
  dimensions.margin = {
    top: 100,
    right: 100,
    left: 100,
    bottom: 100
  }
  const radius = dimensions.width / 2

  const { processedData, records } = useWarrantData()
  if (!processedData || !records) return null

  const {
    allCities,
    warrantsByCity,
    allCitiesByWarrantCountDescending
  } = processedData

  const colorScale = d3
    .scaleSequential(d3.interpolateRainbow)
    .domain([0, allCities.length - 1])

  const barColors = d3
    .scaleOrdinal()
    .domain(allCities)
    .range([...new Array(allCities.length)].map((i, j) => colorScale(j)))

  const slices = d3
    .pie()
    .padAngle(0.005)
    .sort(null)
    .value((city) => warrantsByCity[city].count)(
    allCitiesByWarrantCountDescending
  )

  const arc = d3.arc().innerRadius(90).outerRadius(radius)

  return (
    <>
      <svg height={dimensions.getSvgHeight()} width={dimensions.getSvgWidth()}>
        <g transform={`translate(${radius}, ${radius})`}>
          <g>
            {slices.map((slice, index) => (
              <path key={arc.data} fill={barColors(index)} d={arc(slice)} />
            ))}
          </g>
        </g>
      </svg>
    </>
  )
}

const WarrantsByCityDonut = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by city donut</PageHeader>
    <WarrantsByCityDonutChart />
  </PageWithNavigationLayout>
)

export { WarrantsByCityDonut }
