import React, { FC } from "react"
import styled from "styled-components"

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Sidebar: FC = ({ children }) => {
  return <StyledSidebar>{children}</StyledSidebar>
}

export { Sidebar }
