import React from "react"
import { DashboardLayout } from "./layouts/DashboardLayout"
import { GlobalStyles } from "./styles/GlobalStyles"
import { Header } from "./typography/Header"
import { Text } from "./typography/Text"
import { Spacer } from "./utilities/Spacer"
import { Page } from "./layouts/Page"
import { PageHeader } from "./layouts/PageHeader"
import { Sidebar } from "./navigation/Sidebar"
import { NavigationItem } from "./navigation/NavigationItem"
import { SidebarHeader } from "./navigation/SidebarHeader"
import { PlaceholderImage } from "./utilities/PlaceholderImage"

const AppSidebarContent = () => (
  <Sidebar>
    <SidebarHeader>
      <PlaceholderImage height={24} width={24} circle />
      <Spacer width={0.5} />
      <Header variant="5" color="white">
        Brand name
      </Header>
    </SidebarHeader>
    <NavigationItem>Home</NavigationItem>
    <NavigationItem>Reports</NavigationItem>
    <NavigationItem>Sales</NavigationItem>
    <NavigationItem>Logs</NavigationItem>
  </Sidebar>
)

const loremIpsum = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
`

const AppMainContent = () => (
  <Page>
    <PageHeader>This is a page title</PageHeader>
    <Text variant="small">{loremIpsum}</Text>
    <Spacer height={1.5} />
    <Text variant="medium">{loremIpsum}</Text>
    <Spacer height={1.5} />
    <Text variant="large">{loremIpsum}</Text>
    <Spacer height={1.5} />
    <Header variant="1"> This is a header 1</Header>
    <Header variant="2"> This is a header 2</Header>
    <Header variant="3"> This is a header 3</Header>
    <Header variant="4"> This is a header 4</Header>
    <Header variant="5"> This is a header 5</Header>
    <Header variant="6"> This is a header 6</Header>
  </Page>
)

const App = () => {
  return (
    <>
      <GlobalStyles />
      <DashboardLayout
        sidebarContent={<AppSidebarContent />}
        mainContent={<AppMainContent />}
      />
    </>
  )
}

export { App }
