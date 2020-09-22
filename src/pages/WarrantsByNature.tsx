import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React, { useRef, useState } from "react"
import { useDidMount } from "../hooks/useDidMount"
import * as d3 from "d3"
import { Text } from "../typography/Text"
import { getProcessedData, ProcessedData } from "./getProcessedData"
import { useWarrantData } from "./useWarrantData"

const WarrantsByNatureChart = () => {
  const chartHeight = 750
  const chartWidth = 1000
  const chartMargin = 200
  const barWidth = 20
  const barLeftPadding = 10

  const { processedData } = useWarrantData()
  if (!processedData) return null

  const {
    warrantsByNature,
    maxWarrantsOfNature,
    allNaturesByWarrantCountDescending
  } = processedData

  const y = d3
    .scaleLinear()
    .domain([0, maxWarrantsOfNature])
    .range([chartHeight, chartMargin * 2])

  const x = d3
    .scaleBand()
    .domain(allNaturesByWarrantCountDescending)
    .range([0, chartWidth - chartMargin * 2])

  const yTicks = y.ticks()

  return (
    <>
      <svg height={chartHeight} width={chartWidth}>
        <g
          className="y-axis"
          transform={`translate(${chartMargin}, -${chartMargin})`}
        >
          <line
            x1={0}
            y1={y(maxWarrantsOfNature + 10)}
            x2={0}
            y2={y(0)}
            stroke="black"
            width={1}
          />
          {yTicks.map((tick) => (
            <text x={-40} y={y(tick)}>
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
            x2={x(
              allNaturesByWarrantCountDescending[
                allNaturesByWarrantCountDescending.length - 1
              ]
            )}
            y2={y(0)}
            stroke="black"
            width={1}
          />

          {allNaturesByWarrantCountDescending.map((nature) => (
            <text
              transform={`translate(${x(nature) + barLeftPadding}, ${
                y(0) + 14
              }) rotate(45)`}
            >
              {nature}
            </text>
          ))}
        </g>

        {allNaturesByWarrantCountDescending.map((nature) => {
          return (
            <g className="bar">
              <rect
                fill="black"
                width={barWidth}
                height={y(0) - y(warrantsByNature[nature].count)}
                x={x(nature) + chartMargin + barLeftPadding}
                y={y(warrantsByNature[nature].count) - chartMargin}
              />
            </g>
          )
        })}
      </svg>
    </>
  )
}

const WarrantsByNature = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by nature</PageHeader>
    <WarrantsByNatureChart />
  </PageWithNavigationLayout>
)

export { WarrantsByNature }
