import React, { useEffect } from "react"
import { DashboardLayout } from "./layouts/DashboardLayout"
import { GlobalStyles } from "./styles/GlobalStyles"
import { Header } from "./typography/Header"
import { Text } from "./typography/Text"
import { Spacer } from "./utilities/Spacer"
import { Page } from "./layouts/Page"
import { PageHeader } from "./layouts/PageHeader"
import { Colors } from "./styles/Colors"
import styled from "styled-components"
import { Opacity } from "./Types"
import { HR } from "./utilities/HR"
import { Panel } from "./surfaces/Panel"
import { Button } from "./inputs/Button"
import { Grid } from "./utilities/Grid"
import { PageErrorBoundary } from "./errorBoundaries/PageErrorBoundary"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Routes } from "./utilities/Routes"
import { LoremIpsum } from "./utilities/LoremIpsum"
import { NotFoundPage } from "./pages/NotFoundPage"

const StyledColorGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

type StyledColorBoxProps = {
  opacity: Opacity
}

const StyledColorBox = styled.div<StyledColorBoxProps>`
  background-color: ${({ color }) => Colors[color]};
  opacity: ${({ opacity }) => opacity / 100};
  width: 25%;
  text-align: center;
  padding: 8px;
  color: #ccc;
`

const StyledColorRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const ColorGrid = () => (
  <StyledColorGrid>
    {[...new Array(10)].map((x, i) => (
      <StyledColorRow key={i}>
        {Object.keys(Colors).map((color) => {
          const opacity = i * 10
          const colorKey = `${color}-${opacity}`

          return (
            <StyledColorBox key={colorKey} color={color} opacity={opacity}>
              {colorKey}
            </StyledColorBox>
          )
        })}
      </StyledColorRow>
    ))}
  </StyledColorGrid>
)

const AppMainContent = () => {
  return (
    <PageErrorBoundary>
      <Page>
        <PageHeader>This is a page title</PageHeader>
        <Spacer height={3} />
        <Grid minWidth={12.5} columns={2} padding={0.5}>
          <Panel>
            <Header variant="5">Panel header</Header>
            <Text variant="small" color="black60">
              subtitle
            </Text>
            <Spacer height={1} />
            <Button size="small">Click me</Button>
          </Panel>

          <Panel>
            <Header variant="5">Panel header</Header>
            <Text variant="small" color="black60">
              subtitle
            </Text>
            <Spacer height={1} />
            <Button size="small">Click me</Button>
          </Panel>
          <Panel>
            <Header variant="5">Panel header</Header>
            <Text variant="small" color="black60">
              subtitle
            </Text>
            <Spacer height={1} />
            <Button size="small">Click me</Button>
          </Panel>

          <Panel>
            <Header variant="5">Panel header</Header>
            <Text variant="small" color="black60">
              subtitle
            </Text>
            <Spacer height={1} />
            <Button size="small">Click me</Button>
          </Panel>
        </Grid>
        <Spacer height={3} />
      </Page>
    </PageErrorBoundary>
  )
}

const AppRouter = () => (
  <Switch>
    {Object.keys(Routes).map((routeKey) => {
      const route = Routes[routeKey]

      return <Route exact path={route.path} component={route.component} />
    })}
    <Route component={NotFoundPage} />
  </Switch>
)

const App = () => (
  <BrowserRouter>
    <GlobalStyles />
    <AppRouter />
  </BrowserRouter>
)

export { App }
