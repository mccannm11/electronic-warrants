import React from "react"
import styled from "styled-components"
import { Colors } from "../styles/Colors"

const StyledSidebarHeader = styled.div`
  padding: 12px 12px 12px 20px;
  height: 40px;
  background-color: ${Colors.blackCoral};
  display: flex;
  flex-direction: row;
  align-items: center;
`

const SidebarHeader = (props) => <StyledSidebarHeader {...props} />

export { SidebarHeader }
