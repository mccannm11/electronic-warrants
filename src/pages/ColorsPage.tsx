import { Page } from "../layouts/Page"
import { ColorGrid } from "../ColorGrid"
import React from "react"
import { PageHeader } from "../layouts/PageHeader"
import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"

const ColorsPage = () => {
  return (
    <Page>
      <PageWithNavigationLayout>
        <PageHeader>Colors</PageHeader>
        <ColorGrid />
      </PageWithNavigationLayout>
    </Page>
  )
}

export { ColorsPage }
