import { ComponentType } from "react"
import { HomePage } from "../pages/HomePage"
import { TypographyPage } from "../pages/TypographyPage"
import { FormsPage } from "../pages/FormsPage"
import React from "react"

type Route = {
  path: string
  component: ComponentType<any>
  title: string
  exact: boolean
}

const Routes: Record<string, Route> = {
  Home: {
    path: "/",
    component: HomePage,
    title: "Home",
    exact: true
  },
  Typography: {
    path: "/typography",
    component: TypographyPage,
    title: "Typography",
    exact: false
  },
  Forms: {
    path: "/forms",
    component: FormsPage,
    title: "Forms",
    exact: false
  }
}

export { Routes }
