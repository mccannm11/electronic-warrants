import styled from "styled-components"
import React from "react"
import { Colors } from "../styles/Colors"

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  height: 100vh;
`

const StyledSidebarContent = styled.div`
  min-width: 300px;
  background-color: ${Colors.blackCoral};
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
