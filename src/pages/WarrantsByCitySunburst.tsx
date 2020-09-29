import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"

const WarrantsByCitySunburstChart = () => {
  const width = 500
  const radius = width / 2

  const margin = {
    top: 100,
    right: 100,
    left: 100,
    bottom: 100
  }

  const { processedData, records } = useWarrantData()
  if (!processedData || !records) return null

  const { allCities } = processedData

  const colorScale = d3
    .scaleSequential(d3.interpolateRainbow)
    .domain([0, allCities.length - 1])

  const barColors = d3
    .scaleOrdinal()
    .domain(allCities)
    .range([...new Array(allCities.length)].map((i, j) => colorScale(j)))

  const hierarchy = d3.hierarchy(records)
  console.log(hierarchy)

  return (
    <>
      <svg height={width} width={width}>
        <g transform={`translate(${radius}, ${radius})`}></g>
      </svg>
    </>
  )
}

const WarrantsByCitySunburst = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by city donut</PageHeader>
    <WarrantsByCitySunburstChart />
  </PageWithNavigationLayout>
)

export { WarrantsByCitySunburst }
