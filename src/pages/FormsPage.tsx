import React from "react"
import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import { Page } from "../layouts/Page"

const FormsPage = () => (
  <Page>
    <PageWithNavigationLayout>
      <PageHeader>Forms</PageHeader>
    </PageWithNavigationLayout>
  </Page>
)

export { FormsPage }
