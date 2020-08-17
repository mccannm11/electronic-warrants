import styled from "styled-components"
import React from "react"
import { Pixel } from "../Types"

const SidebarWidth: Pixel = 220

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  height: 100%;
  position: relative;
  margin-left: ${SidebarWidth}px;
`

const StyledSidebarContent = styled.div`
  min-width: ${SidebarWidth}px;
  max-width: ${SidebarWidth}px;
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
`

const StyledMainContent = styled.div`
  width: 100%;
`

const DashboardLayout = ({ sidebarContent, mainContent, ...props }) => (
  <StyledDashboardLayout {...props}>
    <StyledSidebarContent>{sidebarContent}</StyledSidebarContent>
    <StyledMainContent>{mainContent}</StyledMainContent>
  </StyledDashboardLayout>
)

export { DashboardLayout }
