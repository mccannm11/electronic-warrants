import styled from "styled-components"
import React, { FC } from "react"
import { LoadingIndicator } from "../feedback/LoadingIndicator"

const StyledPage = styled.div`
  padding: 64px 48px 0 48px;
  animation: fade-in 0.15s cubic-bezier(0.8, 0, 0.1, 1);

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export type PageState = "ready" | "loading" | "error"

export type PageProps = {
  state?: PageState
}

const StyledLoadingPage = styled(StyledPage)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadingPage = () => (
  <StyledLoadingPage>
    <LoadingIndicator />
  </StyledLoadingPage>
)

const ErrorPage = () => <StyledPage>Error</StyledPage>

const Page: FC<PageProps> = ({ state = "ready", ...props }) => {
  switch (state) {
    case "ready":
      return <StyledPage {...props} />
    case "loading":
      return <LoadingPage />
    case "error":
      return <ErrorPage />
  }
}

export { Page }
