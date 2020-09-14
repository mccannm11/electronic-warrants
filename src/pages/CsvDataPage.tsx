import React, { useState } from "react"
import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import { useDidMount } from "../hooks/useDidMount"
import * as d3 from "d3"
import { LoadingIndicator } from "../feedback/LoadingIndicator"
import styled from "styled-components"

const Tr = styled.tr`
  max-width: 20px;
  margin: 0;
`

const Table = styled.table`
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  padding: 0;
  border-spacing: 0;
`

const TableHeader = styled.thead`
  font-weight: 500;
`

const TableBody = styled.tbody`
  padding: 0;
`

const Th = styled.th`
  text-align: left;
  border-bottom: 1px solid #ccc;
  padding: 8px 16px;
`

const Td = styled.td`
  word-wrap: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  margin: 0;
  display: table-cell;
  padding: 8px 16px;
`

const TableOfCsvData = () => {
  const [rawData, setRawData] = useState<any[]>(null)

  useDidMount(() => {
    const fetchWarrantData = async () => {
      const rawData = await d3.csv("/data/warrants.csv")
      setRawData(rawData)
      console.log("Raw data:", rawData)
    }

    fetchWarrantData()
  })

  return rawData !== null ? (
    <Table>
      <TableHeader>
        <Tr>
          {Object.keys(rawData[0]).map((key) => (
            <Th key={key}>{key}</Th>
          ))}
        </Tr>
      </TableHeader>
      <TableBody>
        {rawData.map((row, index) => (
          <Tr key={index}>
            {Object.keys(row).map((key) => (
              <Td>{row[key].substring(0, 50)}</Td>
            ))}
          </Tr>
        ))}
      </TableBody>
    </Table>
  ) : (
    <LoadingIndicator />
  )
}

const CsvDataPage = () => (
  <PageWithNavigationLayout>
    <PageHeader>CSV data</PageHeader>
    <TableOfCsvData />
  </PageWithNavigationLayout>
)

export { CsvDataPage }
