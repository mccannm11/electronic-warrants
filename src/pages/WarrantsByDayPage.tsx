import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React, { useEffect, useRef, useState } from "react"
import { useDidMount } from "../hooks/useDidMount"
import * as d3 from "d3"
import _ from "lodash"
import { Text } from "../typography/Text"

const getWarrantsByDay = (records: WarrantRecord[]) => {
  const result: Record<string, any[]> = {}

  records.forEach((record) => {
    const dateString = record.Submitted.toDateString()

    if (!result[dateString]) {
      result[dateString] = [record]
    } else {
      result[dateString].push(record)
    }
  })

  return result
}

type WarrantRecord = any

type ProcessedData = {
  maxWarrantsPerDay: WarrantCount
  oldestDate: Date
  mostRecentDate: Date
  warrantCountByDay: WarrantCount[]
  allDatesDescending: Date[]
  warrantsByDay: Record<string, WarrantRecord>
}

type WarrantCount = {
  count: number
  date: Date
  dateString: string
}

const getProcessedData = (records): ProcessedData => {
  const warrantsByDay = getWarrantsByDay(records)
  const allDates = Object.keys(warrantsByDay).map((date) => new Date(date))
  const allDatesDescending = allDates
    .slice()
    .sort((a, b) => a.getTime() - b.getTime())

  const warrantCountByDay: WarrantCount[] = allDatesDescending.map((date) => ({
    count: warrantsByDay[date.toDateString()].length,
    date: date,
    dateString: date.toDateString()
  }))

  const maxWarrantsPerDay = _.maxBy(warrantCountByDay, (day) => day.count)
  const oldestDate = _.head(allDatesDescending)
  const mostRecentDate = _.last(allDatesDescending)

  return {
    maxWarrantsPerDay,
    oldestDate,
    mostRecentDate,
    warrantCountByDay,
    allDatesDescending,
    warrantsByDay
  }
}

const WarrantsByDayChart = () => {
  const [chartHeight, setChartHeight] = useState(500)
  const [chartWidth, setChartWidth] = useState(1000)
  const [startDate, setStartDate] = useState(null)

  const chartMargin = 100

  const svgRef = useRef<SVGSVGElement>(null)
  const [records, setRecords] = useState<any[]>(null)
  const [processedData, setProcessedData] = useState<ProcessedData>(null)

  useDidMount(() => {
    const fetchWarrantData = async () => {
      const rawData = await d3.csv("/data/warrants.csv")
      const normalizedRecords = rawData.map((record) => ({
        ...record,
        Submitted: new Date(record.Submitted.substr(0, 10))
      }))

      setRecords(normalizedRecords)
      const processedData = getProcessedData(normalizedRecords)
      setProcessedData(processedData)
    }

    fetchWarrantData()
  })

  if (!processedData) return null

  const {
    maxWarrantsPerDay,
    oldestDate,
    mostRecentDate,
    warrantCountByDay,
    allDatesDescending,
    warrantsByDay
  } = processedData

  const y = d3
    .scaleLinear()
    .domain([0, maxWarrantsPerDay.count])
    .range([chartHeight, chartMargin + 200])

  const x = d3
    .scaleTime()
    .domain([d3.timeMonth.floor(oldestDate), mostRecentDate])
    .range([0, chartWidth - chartMargin])

  const yTicks = y.ticks()

  const xTicks = x.ticks(d3.timeMonth.every(1))

  console.log("yTicks", yTicks)
  console.log("xTicks", xTicks)

  // useEffect(() => {
  //   if (records === null) return
  //   if (svgRef.current === null) return
  //   // return
  //
  //   const svg = d3.select(svgRef.current)
  //   svg.attr("viewBox", `0 0 ${chartWidth} ${chartHeight}`)
  //
  //   const y = d3
  //     .scaleLinear()
  //     .domain([0, maxWarrantsPerDay.count])
  //     .range([chartHeight, chartMargin + 200])
  //
  //   svg
  //     .append("g")
  //     .attr("transform", `translate(${chartMargin}, -${chartMargin})`)
  //     .call(
  //       d3
  //         .axisLeft(y)
  //         .tickSizeOuter(0)
  //         .tickFormat((x) => x.toString())
  //     )
  //
  //   const x = d3
  //     .scaleTime()
  //     .domain([d3.timeMonth.floor(oldestDate), mostRecentDate])
  //     .range([0, chartWidth - chartMargin])
  //
  //   const xAxis = svg
  //     .append("g")
  //     .attr(
  //       "transform",
  //       `translate(${chartMargin}, ${chartHeight - chartMargin})`
  //     )
  //     .call(
  //       d3
  //         .axisBottom(x)
  //         .ticks(d3.timeMonth.every(1))
  //         .tickFormat(d3.timeFormat("%B"))
  //     )
  //     .selectAll("text")
  //     .style("text-anchor", "end")
  //     .attr("dx", "-.8em")
  //     .attr("dy", ".15em")
  //     .attr("transform", "rotate(-65)")
  //
  //   const bars = svg
  //     .append("g")
  //     .attr("class", "x-axis")
  //     .attr("fill", "steelblue")
  //     .selectAll("rect")
  //     .data(warrantCountByDay)
  //     .join("rect")
  //     .style("mix-blend-mode", "multiply")
  //     .attr("x", (d) => x(d.date) + chartMargin)
  //     .attr("y", (d) => y(d.count) - chartMargin)
  //     .attr("height", (d) => y(0) - y(d.count))
  //     .attr("width", "3")
  // }, [records, startDate])

  const handleHeightChange = (event) => {
    setChartHeight(event.target.value)
  }

  const handleWidthChange = (event) => {
    setChartWidth(event.target.value)
  }

  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value))
  }

  const barWidth = 3

  return (
    <>
      <svg ref={svgRef} height={chartHeight} width={chartWidth}>
        <g
          className="y-axis"
          transform={`translate(${chartMargin}, -${chartMargin})`}
        >
          <line
            x1={0}
            y1={y(maxWarrantsPerDay.count)}
            x2={0}
            y2={y(0)}
            stroke="black"
            width={1}
          />
          {yTicks.map((tick) => (
            <text x={-20} y={y(tick)}>
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
            x2={x(mostRecentDate)}
            y2={y(0)}
            stroke="black"
            width={1}
          />

          {xTicks.map((tick) => (
            <text transform={`translate(${x(tick)}, ${y(0) + 14}) rotate(45)`}>
              {d3.timeFormat("%B")(tick)}
            </text>
          ))}
        </g>

        {warrantCountByDay.map((warrantCount) => (
          <g className="bar">
            <rect
              fill="black"
              width={barWidth}
              height={y(0) - y(warrantCount.count)}
              x={x(warrantCount.date) + chartMargin}
              y={y(warrantCount.count) - chartMargin}
            />
          </g>
        ))}
      </svg>
      <div>
        <Text variant="small">Height</Text>
        <input
          type="range"
          min={500}
          max={2500}
          onChange={handleHeightChange}
        />
        <Text variant="small">Width</Text>
        <input type="range" min={500} max={2500} onChange={handleWidthChange} />
        <Text variant="small">Start date</Text>
        <input type="date" onChange={handleStartDateChange} />
      </div>
    </>
  )
}

const WarrantsByDay = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by day</PageHeader>
    <WarrantsByDayChart />
  </PageWithNavigationLayout>
)

export { WarrantsByDay }
