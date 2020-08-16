import React from "react"
import { DashboardLayout } from "./DashboardLayout"

export default {
  title: "Component Library/Layouts/Dashboard Layout"
}

const AppSidebarContent = () => <div>sidebar</div>

const AppMainContent = () => <div>main content</div>

export const DefaultDashboardLayout = () => (
  <DashboardLayout
    sidebarContent={<AppSidebarContent />}
    mainContent={<AppMainContent />}
  />
)
