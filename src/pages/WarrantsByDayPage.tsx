import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import React, { useEffect, useRef, useState } from "react"
import { useDidMount } from "../hooks/useDidMount"
import * as d3 from "d3"
import _ from "lodash"

const getWarrantsByDay = (records: any[]) => {
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

const WarrantsByDayChart = () => {
  const chartWidth = 1000
  const chartHeight = 500
  const chartMargin = 100

  const svgRef = useRef<SVGSVGElement>(null)
  const [records, setRecords] = useState<any[]>(null)

  useDidMount(() => {
    const fetchWarrantData = async () => {
      const rawData = await d3.csv("/data/warrants.csv")
      const normalizedRecords = rawData.map((record) => ({
        ...record,
        Submitted: new Date(record.Submitted.substr(0, 10))
      }))

      setRecords(normalizedRecords)
    }

    fetchWarrantData()
  })

  useEffect(() => {
    if (svgRef.current === null) return
    const svg = d3.select(svgRef.current)

    svg.attr("viewBox", "0 0 500 500")

    console.log("Data changed", records)
    if (records === null) return

    const warrantsByDay = getWarrantsByDay(records)
    console.log("warrantsByDay", warrantsByDay)

    const allDates = Object.keys(warrantsByDay).map((date) => new Date(date))
    const allDatesDescending = allDates
      .slice()
      .sort((a, b) => a.getTime() - b.getTime())

    console.log(allDatesDescending)
    allDatesDescending.forEach((date) => {
      console.log(date)
    })

    const warrantCountByDay: {
      count: number
      date: Date
      dateString: string
    }[] = allDatesDescending.map((date) => ({
      count: warrantsByDay[date.toDateString()].length,
      date: date,
      dateString: date.toDateString()
    }))

    console.log("Warrant counts by day", warrantCountByDay)

    const maxWarrantsPerDay = _.maxBy(warrantCountByDay, (day) => day.count)
    console.log("Max warrants per day:", maxWarrantsPerDay)

    const y = d3
      .scaleLinear()
      .domain([0, maxWarrantsPerDay.count])
      .range([chartHeight, chartMargin + 200])

    const yAxis = svg
      .append("g")
      .attr("transform", `translate(${chartMargin}, -${chartMargin})`)
      .call(
        d3
          .axisLeft(y)
          .tickSizeOuter(0)
          .tickFormat((x) => x.toString())
      )

    const oldestDate = _.head(allDatesDescending)
    const mostRecentDate = _.last(allDatesDescending)

    const x = d3
      .scaleTime()
      .domain([d3.timeMonth.floor(oldestDate), mostRecentDate])
      .range([0, chartWidth - chartMargin])

    const xAxis = svg
      .append("g")
      .attr(
        "transform",
        `translate(${chartMargin}, ${chartHeight - chartMargin})`
      )
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.timeMonth.every(1))
          .tickFormat(d3.timeFormat("%B"))
      )
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)")

    const bars = svg
      .append("g")
      .attr("class", "x-axis")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(warrantCountByDay)
      .join("rect")
      .style("mix-blend-mode", "multiply")
      .attr("x", (d) => x(d.date) + chartMargin)
      .attr("y", (d) => y(d.count) - chartMargin)
      .attr("height", (d) => y(0) - y(d.count))
      .attr("width", "3")
  }, [records])

  return <svg ref={svgRef} height={chartHeight} width={chartWidth} />
}

const WarrantsByDay = () => (
  <PageWithNavigationLayout>
    <PageHeader>Warrants by day</PageHeader>
    <WarrantsByDayChart />
  </PageWithNavigationLayout>
)

export { WarrantsByDay }
