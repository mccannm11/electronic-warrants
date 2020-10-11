import { ComponentType } from "react"
import { CsvDataPage } from "./pages/CsvDataPage"
import { WarrantsByDay } from "./pages/WarrantsByDayPage"
import { WarrantsByCity } from "./pages/WarrantsByCityPage"
import { WarrantsByNature } from "./pages/WarrantsByNature"
import { WarrantsByDayByNature } from "./pages/WarrantsByDayByNature"
import { WarrantsByDayByNatureLines } from "./pages/WarrantsByDayByNatureLines"
import { WarrantsByNatureStackedAreaNormalized } from "./pages/WarrantsByNatureStackedAreaNormalized"
import { WarrantsByNatureStackedArea } from "./pages/WarrantsByNatureStackedArea"
import { WarrantsByCityVertical } from "./pages/WarrantsByCityVertical"
import { WarrantsByCityVerticalNormalized } from "./pages/WarrantsByCityVerticalNormalized"
import { WarrantsByCityDonut } from "./pages/WarrantsByCityDonut"
import { WarrantsByCitySunburst } from "./pages/WarrantsByCitySunburst"
import { TransformationsPage } from "./pages/DataTransformationPage"
import { WarrantsByMonthAndCityStackedBar } from "./pages/WarrantsByMonthAndCityStackedBar"
import { WarrantsByMonthAndCityStackedArea } from "./pages/WarrantsByMonthAndCityStackedArea"
import { WarrantsByWeekAndCityStackedAreaNormalized } from "./pages/WarrantsByWeekAndCityStackedAreaNormalized"

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
  },
  {
    path: "/by-city",
    component: WarrantsByCity,
    title: "Warrants by city",
    exact: true
  },
  {
    path: "/by-city-vertical",
    component: WarrantsByCityVertical,
    title: "Warrants by city vert.",
    exact: true
  },
  {
    path: "/by-nature",
    component: WarrantsByNature,
    title: "Warrants by nature",
    exact: true
  },
  {
    path: "/by-day-by-nature",
    component: WarrantsByDayByNature,
    title: "Warrants by day and nature",
    exact: true
  },
  {
    path: "/by-day-by-nature-lines",
    component: WarrantsByDayByNatureLines,
    title: "Day and nature lines",
    exact: true
  },
  {
    path: "/by-nature-by-day-area",
    component: WarrantsByNatureStackedArea,
    title: "By nature area stacked",
    exact: true
  },
  {
    path: "/by-nature-by-day-area-normalized",
    component: WarrantsByNatureStackedAreaNormalized,
    title: "By nature area stacked norm.",
    exact: true
  },
  {
    path: "/by-city-by-nature-normalized",
    component: WarrantsByCityVerticalNormalized,
    title: "By city by nature norm",
    exact: true
  },
  {
    path: "/by-city-donut",
    component: WarrantsByCityDonut,
    title: "By city donut",
    exact: true
  },
  {
    path: "/by-city-sunburst",
    component: WarrantsByCitySunburst,
    title: "By city sunburst",
    exact: true
  },
  {
    path: "/transformations",
    component: TransformationsPage,
    title: "Data transformations",
    exact: true
  },
  {
    path: "/by-month-stacked-bar",
    component: WarrantsByMonthAndCityStackedBar,
    title: "By month stacked bar",
    exact: true
  },
  {
    path: "/by-month-stacked-area",
    component: WarrantsByMonthAndCityStackedArea,
    title: "By month stacked area",
    exact: true
  },
  {
    path: "/by-month-stacked-area-normalized",
    component: WarrantsByWeekAndCityStackedAreaNormalized,
    title: "By month stacked area normalized",
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
