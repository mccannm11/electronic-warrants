import { DashboardLayout } from "./DashboardLayout"
import React from "react"
import { AppNavigation } from "../navigation/AppNavigation"

const PageWithNavigationLayout = ({ children }) => (
  <DashboardLayout sidebarContent={<AppNavigation />} mainContent={children} />
)

export { PageWithNavigationLayout }
