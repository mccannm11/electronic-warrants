import { ComponentType } from "react"
import { HomePage } from "../pages/HomePage"
import { TypographyPage } from "../pages/TypographyPage"
import { FormsPage } from "../pages/FormsPage"
import React from "react"
import { ColorsPage } from "../pages/ColorsPage"

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

const Redirects: Redirect[] = [
  {
    from: "/",
    to: "/home",
    exact: true
  }
]

const Routes: Route[] = [
  {
    path: "/home",
    component: HomePage,
    title: "Home",
    exact: true
  },
  {
    path: "/typography",
    component: TypographyPage,
    title: "Typography",
    exact: false
  },
  {
    path: "/forms",
    component: FormsPage,
    title: "Forms",
    exact: false
  },
  {
    path: "/colors",
    component: ColorsPage,
    title: "Colors",
    exact: false
  }
]

export { Routes, Redirects }
