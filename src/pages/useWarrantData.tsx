import { useState } from "react"
import { getProcessedData, ProcessedData } from "./getProcessedData"
import { useDidMount } from "../hooks/useDidMount"
import * as d3 from "d3"

export const useWarrantData = () => {
  const [processedData, setProcessedData] = useState<ProcessedData>(null)
  const [records, setRecords] = useState<any[]>([])

  useDidMount(() => {
    const fetchWarrantData = async () => {
      const rawData = await d3.csv("/data/warrants.csv")
      const normalizedRecords = rawData.map((record) => ({
        ...record,
        Submitted: new Date(record.Submitted.substr(0, 10))
      }))

      const processedData = getProcessedData(normalizedRecords)
      setProcessedData(processedData)
      setRecords(normalizedRecords)
    }
    fetchWarrantData()
  })

  return { processedData, records }
}
