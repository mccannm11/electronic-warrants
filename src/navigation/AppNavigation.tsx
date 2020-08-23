import { Sidebar } from "./Sidebar"
import { Spacer } from "../utilities/Spacer"
import { SidebarHeader } from "./SidebarHeader"
import { PlaceholderImage } from "../utilities/PlaceholderImage"
import { Header } from "../typography/Header"
import { NavigationItem } from "./NavigationItem"
import { Routes } from "../utilities/Routes"
import React, { FC } from "react"

const AppNavigation: FC = () => (
  <Sidebar backgroundColor="white">
    <Spacer height={1.25} />
    <SidebarHeader backgroundColor="white">
      <PlaceholderImage height={24} width={24} circle />
      <Spacer width={0.5} />
      <Header variant="5">Brand name</Header>
    </SidebarHeader>
    <Spacer height={1} />

    {Object.keys(Routes).map((routeKey) => {
      const route = Routes[routeKey]

      return (
        <NavigationItem key={route.path} to={route.path}>
          {route.title}
        </NavigationItem>
      )
    })}
  </Sidebar>
)

export { AppNavigation }
