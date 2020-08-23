import React from "react"
import { Page } from "../layouts/Page"
import { Header } from "../typography/Header"

class PageErrorBoundary extends React.Component<any, any> {
  state = {
    hasError: false
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Page>
          <Header variant="1">Make a 500 page</Header>
        </Page>
      )
    }

    return this.props.children
  }
}

export { PageErrorBoundary }
