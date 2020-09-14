import React, { FC } from "react"
import { GlobalStyles } from "./styles/GlobalStyles"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { Redirects, Routes } from "./Routes"
import { NotFoundPage } from "./pages/NotFoundPage"
import styled, { ThemeProvider } from "styled-components"
import { DefaultTheme } from "./themes/defaultTheme"
import { usePageLoad } from "./hooks/simulatePageLoad"
import { LoadingIndicator } from "./feedback/LoadingIndicator"
import { PageState } from "./layouts/Page"

const AppRouter = () => (
  <Switch>
    {Redirects.map(({ from, to, exact }) => (
      <Redirect
        key={`redirect-${from}-${to}-${exact}`}
        from={from}
        to={to}
        exact={exact}
      />
    ))}

    {Routes.map(({ path, exact, component }) => {
      const routeKey = `route-${path}-${exact}`

      return (
        <Route key={routeKey} exact={exact} path={path} component={component} />
      )
    })}
    <Route component={NotFoundPage} />
  </Switch>
)

const AppError = () => <div>App Error</div>

const StyledAppLoading = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AppLoading = () => (
  <StyledAppLoading>
    <LoadingIndicator />
  </StyledAppLoading>
)

const AppStateViews: Record<PageState, FC> = {
  ready: AppRouter,
  loading: AppLoading,
  error: AppError
}

const App = () => {
  const [pageState] = usePageLoad(300)

  return (
    <BrowserRouter>
      <ThemeProvider theme={DefaultTheme}>
        <GlobalStyles />
        {React.createElement(AppStateViews[pageState])}
      </ThemeProvider>
    </BrowserRouter>
  )
}

export { App }
