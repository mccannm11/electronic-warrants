import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import React from "react"
import { PageHeader } from "../layouts/PageHeader"
import { Page } from "../layouts/Page"

const NotFoundPage = () => (
  <Page>
    <PageWithNavigationLayout>
      <PageHeader>Not found</PageHeader>
    </PageWithNavigationLayout>
  </Page>
)

export { NotFoundPage }
