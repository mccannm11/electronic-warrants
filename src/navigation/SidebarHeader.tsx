import React from "react"
import styled from "styled-components"
import { Color, Colors } from "../styles/Colors"

const StyledSidebarHeader = styled.div<SidebarHeaderProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 12px 12px 20px;
  height: 40px;
  background-color: ${({ backgroundColor }) => Colors[backgroundColor]};
`

type SidebarHeaderProps = {
  backgroundColor: Color
}

const SidebarHeader = (props) => <StyledSidebarHeader {...props} />

export { SidebarHeader }
