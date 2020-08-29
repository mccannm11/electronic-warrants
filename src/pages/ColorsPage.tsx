import { ColorGrid } from "../ColorGrid"
import React from "react"
import { PageHeader } from "../layouts/PageHeader"
import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"

const ColorsPage = () => (
  <PageWithNavigationLayout>
    <PageHeader>Colors</PageHeader>
    <ColorGrid />
  </PageWithNavigationLayout>
)

export { ColorsPage }
