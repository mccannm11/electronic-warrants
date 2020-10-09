import React from "react"
import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import * as d3 from "d3"
import { Panel, PanelHeader } from "../surfaces/Panel"
import { Code } from "../typography/Code"
import { Spacer } from "../utilities/Spacer"
import JSONPretty from "react-json-pretty"
import { Header } from "../typography/Header"
import { useWarrantData } from "./useWarrantData"

const mapToObj = (map: Map<any, any>) => {
  const object = {}
  map.forEach((value, key) => {
    object[key] = value
  })

  return object
}

const Example = ({ func, title = "" }) => {
  return (
    <>
      <Spacer height={0.5} />
      <Header variant="6" weight={700}>
        {title && `d3.${title}`}
      </Header>
      <Spacer height={0.5} />
      <Code>
        <b>Function:</b>
        <JSONPretty data={func.toString()} />
        <b>Result:</b>
        <JSONPretty data={func()} />
      </Code>
      <Spacer height={0.5} />
    </>
  )
}

const Statistics = () => {
  return (
    <Panel>
      <PanelHeader>Statistics</PanelHeader>
      <Code>d3.min([1,2,3]) =&gt; {d3.min([1, 2, 3])}</Code>
      <Spacer height={0.5} />
      <Code>d3.minIndex([3,2,1]) =&gt; {d3.minIndex([3, 2, 1])}</Code>
      <Spacer height={0.5} />
      <Code>d3.max([1,2,3]) =&gt; {d3.max([1, 2, 3])}</Code>
      <Spacer height={0.5} />
      <Code>d3.maxIndex([3,2,1]) =&gt; {d3.maxIndex([3, 2, 1])}</Code>
      <Spacer height={0.5} />
      <Code>
        d3.extent([3,2,1]) =&gt; {JSON.stringify(d3.extent([3, 2, 1]))}
      </Code>
      <Spacer height={0.5} />
      <Code>d3.sum([3,2,1]) =&gt; {JSON.stringify(d3.sum([3, 2, 1]))}</Code>
      <Spacer height={0.5} />
      <Code>
        d3.mean([3,2,1,4]) =&gt; {JSON.stringify(d3.mean([3, 2, 1, 4]))}
      </Code>
      <Spacer height={0.5} />
      <Code>
        d3.median([3,2,1,4,1]) =&gt;{" "}
        {JSON.stringify(d3.median([3, 2, 1, 4, 1]))}
      </Code>
      <Spacer height={0.5} />
      <Code>
        d3.cumsum([3,2,1,4,1]) =&gt;{" "}
        {JSON.stringify(d3.cumsum([3, 2, 1, 4, 1]))}
      </Code>
      <Spacer height={0.5} />
      <Code>
        d3.quantile([3,2,1,4,1], 1) =&gt;{" "}
        {JSON.stringify(d3.quantile([3, 2, 1, 4, 1], 0.5))}
      </Code>
      <Spacer height={0.5} />
      <Code>
        d3.variance([0,10,20,30,40]) =&gt;{" "}
        {JSON.stringify(d3.variance([0, 10, 20, 30, 40]))}
      </Code>
      <Spacer height={0.5} />
      <Code>
        d3.deviation([0,10,20,30,40]) =&gt;{" "}
        {JSON.stringify(d3.deviation([0, 10, 20, 30, 40]))}
      </Code>
      <Spacer height={0.5} />
      <Example func={() => d3.fsum([0, 10.001, 20.002, 30, 40])} />
    </Panel>
  )
}

const Search = () => {
  return (
    <Panel>
      <PanelHeader>Search</PanelHeader>
      <Example func={() => d3.least([1, 2, 3, 4, 5])} />
      <Example func={() => d3.leastIndex([1, 2, 3, 4, 5])} />
      <Example func={() => d3.greatest([1, 2, 3, 4, 5])} />
      <Example func={() => d3.greatestIndex([1, 2, 3, 4, 5])} />
      <Example func={() => d3.bisectCenter([1, 2, 3, 4, 5], 3)} />
      <Example func={() => d3.bisectLeft([1, 2, 3, 4, 5], 3)} />
    </Panel>
  )
}

const Transformations = () => {
  const group = d3.group
  const groups = d3.groups

  return (
    <Panel>
      <PanelHeader>Transformations</PanelHeader>
      <Header variant="6" weight={700}>
        Group
      </Header>
      <Example
        func={() => {
          const data = [
            { name: "jim", amount: "34.0", date: "11/12/2015" },
            { name: "carl", amount: "120.11", date: "11/12/2015" },
            { name: "stacy", amount: "12.01", date: "01/04/2016" }
          ]
          return mapToObj(group(data, (d) => d.name))
        }}
      />
      <Spacer height={1} />
      <Header variant="6" weight={700}>
        Groups
      </Header>
      <Example
        func={() => {
          const data = [
            { name: "jim", amount: "34.0", date: "11/12/2015" },
            { name: "carl", amount: "120.11", date: "11/12/2015" },
            { name: "stacy", amount: "12.01", date: "01/04/2016" }
          ]
          return mapToObj(groups(data, (d) => d.name))
        }}
      />
      <Header variant="6" weight={700}>
        Index
      </Header>
      <Example
        func={() => {
          const data = [
            { name: "jim", amount: "34.0", date: "11/12/2015" },
            { name: "carl", amount: "120.11", date: "11/12/2015" },
            { name: "stacy", amount: "12.01", date: "01/04/2016" }
          ]
          return mapToObj(d3.index(data, (d) => d.name))
        }}
      />
      <Header variant="6" weight={700}>
        Rollup
      </Header>
      <Example
        func={() => {
          const data = [
            { name: "jim", amount: "34.0", date: "11/12/2015" },
            { name: "carl", amount: "120.11", date: "11/12/2015" },
            { name: "stacy", amount: "10.01", date: "01/04/2016" },
            { name: "stacy", amount: "12.01", date: "01/04/2016" }
          ]
          const result = mapToObj(
            d3.rollup(
              data,
              (d) => d3.sum(d, (i) => i.amount),
              (d) => d.name
            )
          )
          return result
        }}
      />
      <Header variant="6" weight={700}>
        Count
      </Header>
      <Example
        func={() => {
          const data = [
            { name: "jim", amount: "34.0", date: "11/12/2015" },
            { name: "carl", amount: "120.11", date: "11/12/2015" },
            { name: "stacy" },
            { amount: "12.01", date: "01/04/2016" }
          ]
          const result = d3.count(data, (d) => d.amount)
          return result
        }}
      />

      <Header variant="6" weight={700}>
        Cross
      </Header>
      <Example
        func={() => {
          const a = [1, 2, 3]
          const b = ["x", "y"]

          const result = d3.cross(a, b)
          return result
        }}
      />
      <Header variant="6" weight={700}>
        Merge
      </Header>
      <Example
        func={() => {
          const a = [1, 2, 3]
          const b = ["x", "y"]

          const result = d3.merge([a, b])
          return result
        }}
      />
      <Header variant="6" weight={700}>
        Pairs
      </Header>
      <Example
        func={() => {
          const data = [1, 2, 3, 4]
          const result = d3.pairs(data, (a, b) => a + b)
          return result
        }}
      />
      <Example
        title="permute"
        func={() => {
          const data = [1, 2, 3, 4]
          const result = d3.permute(data, [2, 1, 0])
          return result
        }}
      />
      <Example
        title="shuffle"
        func={() => {
          const data = [1, 2, 3, 4]
          d3.shuffle(data)
          return data
        }}
      />
      <Example
        title="ticks"
        func={() => {
          const ticks = d3.ticks(0, 100, 10)
          return ticks
        }}
      />
      <Example
        title="tickIncrement"
        func={() => {
          const ticks = d3.tickIncrement(-3, 100, 10)
          return ticks
        }}
      />
      <Example
        title="tickStep"
        func={() => {
          const ticks = d3.tickStep(-3, 100, 20)
          return ticks
        }}
      />
      <Example
        title="nice"
        func={() => {
          const wtfWhatHappenedToNice = `
          its in the docs but not in the library?
          `
        }}
      />
      <Example
        title="range"
        func={() => {
          const range = d3.range(0, 5, 0.5)

          return range
        }}
      />
      <Example
        title="transpose"
        func={() => {
          const matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ]

          return d3.transpose(matrix)
        }}
      />
      <Example
        title="zip"
        func={() => {
          const a = [1, 2, 3]
          const b = [4, 5, 6]

          return d3.transpose([a, b])
        }}
      />
    </Panel>
  )
}

const Iterables = () => {
  return (
    <Panel>
      <PanelHeader>Iterables</PanelHeader>
      <Example
        title="every"
        func={() => {
          const data = [1, 2, 3]

          return JSON.stringify(d3.every(data, (b) => b > 2))
        }}
      />
      <Example
        title="some"
        func={() => {
          const data = [1, 2, 3]

          return JSON.stringify(d3.some(data, (b) => b > 2))
        }}
      />
      <Example
        title="filter"
        func={() => {
          const data = [1, 2, 3]

          return d3.filter(data, (b) => b > 1)
        }}
      />
      <Example
        title="map"
        func={() => {
          const data = [1, 2, 3]

          return d3.map(data, (b) => b > 1)
        }}
      />
      <Example
        title="reduce"
        func={() => {
          const data = [1, 2, 3]

          return d3.reduce(data, (a, b) => a + b, 0)
        }}
      />
      <Example
        title="sort"
        func={() => {
          const data = [1, 3, 2]

          return d3.sort(data)
        }}
      />
    </Panel>
  )
}

const Sets = () => {
  return (
    <Panel>
      <PanelHeader>Sets</PanelHeader>
      <Example
        title="difference"
        func={() => {
          const a = [1, 2, 3]
          const b = [2, 3, 4]

          return Array.from(d3.difference(a, b))
        }}
      />
      <Example
        title="union"
        func={() => {
          const a = [1, 2, 3]
          const b = [2, 3, 4]

          return Array.from(d3.union(a, b))
        }}
      />
      <Example
        title="intersection"
        func={() => {
          const a = [1, 2, 3]
          const b = [2, 3, 4]

          return Array.from(d3.intersection(a, b))
        }}
      />
      <Example
        title="superset"
        func={() => {
          const a = [1, 2, 3, 4]
          const b = [2, 4]

          return Array.from(d3.superset(a, b))
        }}
      />
      <Example
        title="disjoint"
        func={() => {
          const a = [1, 2, 3]
          const b = [2, 3, 4]

          return d3.disjoint(a, b).toString()
        }}
      />
    </Panel>
  )
}

const TransformationsPage = () => {
  const { records } = useWarrantData()
  if (!records) return null

  console.log(records)
  const groupedByDay = d3.group(records, (r) => r.Submitted.toDateString())
  console.log(groupedByDay)

  const groupedByMonth = d3.groups(
    records,
    (r) => d3.timeMonth.floor(r.Submitted).toString(),
    (r) => r["County of Court"],
    (r) => r["Primary Nature"]
  )

  const rollupByMonth = d3.rollup(
    records,
    (r) =>
      d3.rollup(
        r,
        (m) => m.length,
        (m) => m["County of Court"]
      ),
    (r) => d3.timeMonth.floor(r.Submitted).toString()
  )
  console.log("rollupByMonth", rollupByMonth)

  return (
    <PageWithNavigationLayout>
      <PageHeader>Transformations</PageHeader>
      <Statistics />
      <Spacer height={1} />
      <Search />
      <Spacer height={1} />
      <Transformations />
      <Spacer height={1} />
      <Iterables />
      <Spacer height={1} />
      <Sets />
    </PageWithNavigationLayout>
  )
}

export { TransformationsPage }
