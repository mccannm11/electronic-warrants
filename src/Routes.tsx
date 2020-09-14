import { ComponentType } from "react"
import { CsvDataPage } from "./pages/CsvDataPage"
import { WarrantsByDay } from "./pages/WarrantsByDayPage"

export type Route = {
  path: string
  component: ComponentType<any>
  title: string
  exact: boolean
}

export type Redirect = {
  from: string
  to: string
  exact: boolean
}

const Routes: Route[] = [
  {
    path: "/csv-data",
    component: CsvDataPage,
    title: "CSV data",
    exact: true
  },
  {
    path: "/by-day",
    component: WarrantsByDay,
    title: "Warrants by day",
    exact: true
  }
]

const Redirects: Redirect[] = [
  {
    from: "/",
    to: Routes[0].path,
    exact: true
  }
]

export { Routes, Redirects }
