import React from "react"
import { GlobalStyles } from "./styles/GlobalStyles"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Routes } from "./utilities/Routes"
import { NotFoundPage } from "./pages/NotFoundPage"
import { ThemeProvider } from "styled-components"
import { DefaultTheme } from "./themes/defaultTheme"

const AppRouter = () => (
  <Switch>
    {Object.keys(Routes).map((routeKey) => {
      const route = Routes[routeKey]

      return (
        <Route
          key={route.path}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      )
    })}
    <Route component={NotFoundPage} />
  </Switch>
)

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={DefaultTheme}>
      <GlobalStyles />
      <AppRouter />
    </ThemeProvider>
  </BrowserRouter>
)

export { App }
