import React from "react"
import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import { Page } from "../layouts/Page"

const HomePage = () => (
  <Page>
    <PageWithNavigationLayout>
      <PageHeader>Home</PageHeader>
    </PageWithNavigationLayout>
  </Page>
)

export { HomePage }
