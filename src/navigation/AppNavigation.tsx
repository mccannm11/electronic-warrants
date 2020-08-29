import { Sidebar } from "./Sidebar"
import { Spacer } from "../utilities/Spacer"
import { SidebarHeader } from "./SidebarHeader"
import { PlaceholderImage } from "../utilities/PlaceholderImage"
import { Header } from "../typography/Header"
import { NavigationItem, NavigationItemState } from "./NavigationItem"
import { Routes } from "../utilities/Routes"
import React, { FC } from "react"
import { useLocation } from "react-router-dom"

const AppNavigation: FC = () => {
  const location = useLocation()

  return (
    <Sidebar backgroundColor="white">
      <Spacer height={1.25} />
      <SidebarHeader backgroundColor="white">
        <PlaceholderImage height={24} width={24} circle />
        <Spacer width={0.5} />
        <Header variant="5" weight={500}>
          Brand name
        </Header>
      </SidebarHeader>
      <Spacer height={1} />

      {Object.keys(Routes).map((routeKey) => {
        const route = Routes[routeKey]
        const state: NavigationItemState = location.pathname.startsWith(
          route.path
        )
          ? "active"
          : "idle"

        return (
          <NavigationItem key={route.path} to={route.path} state={state}>
            {route.title}
          </NavigationItem>
        )
      })}
    </Sidebar>
  )
}

export { AppNavigation }
