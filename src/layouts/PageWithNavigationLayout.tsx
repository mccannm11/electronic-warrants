import { DashboardLayout } from "./DashboardLayout"
import React, { FC } from "react"
import { AppNavigation } from "../navigation/AppNavigation"
import { Page, PageProps } from "./Page"

type PageWithNavigationLayout = {} & PageProps

const PageWithNavigationLayout: FC<PageWithNavigationLayout> = ({
  state,
  children
}) => {
  const mainContent = <Page state={state}>{children}</Page>

  return (
    <DashboardLayout
      sidebarContent={<AppNavigation />}
      mainContent={mainContent}
    />
  )
}

export { PageWithNavigationLayout }
