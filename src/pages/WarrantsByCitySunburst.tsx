import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React from "react"
import * as d3 from "d3"
import { useWarrantData } from "./useWarrantData"

const WarrantsByCitySunburstChart = () => {
  const width = 1000
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

  // const hierarchy = d3.hierarchy(records)

  const stratify = d3
    .stratify()
    .id((r) => r.cityId)
    .parentId((r) => r["County of Court"])

  const cityRecords = allCities.map((c) => ({
    cityId: c,
    ["County of Court"]: "root"
  }))

  const recordsWithCitiesAndRoot = [
    ...records,
    ...cityRecords,
    { cityId: "root", parent: null }
  ]

  const rootNode = stratify(recordsWithCitiesAndRoot)

  const hierarchy = d3
    .hierarchy(rootNode)
    .sum((d) => {
      console.log(d)
      return d.value
    })
    .sort((a, b) => b.value - a.value)

  console.log(hierarchy)

  const partition = d3.partition().size([2 * Math.PI, radius])(hierarchy)

  console.log(partition)
  console.log(partition.descendants())

  const arc = d3
    .arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius((d) => d.y0)
    .outerRadius((d) => d.y1 - 1)

  return (
    <>
      <svg height={width} width={width}>
        <g transform={`translate(${radius}, ${radius})`}>
          {partition
            .descendants()
            .filter((n) => n.depth == 1)
            .map((node) => {
              return <path fill="black" d={arc(node)} />
            })}
        </g>
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
