import React, { FC } from "react"
import styled from "styled-components"
import { Color, Colors } from "../styles/Colors"

const StyledSidebar = styled.div<SidebarProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ backgroundColor }) => Colors[backgroundColor]};
`

type SidebarProps = {
  backgroundColor: Color
}

const Sidebar: FC<SidebarProps> = (props) => {
  return <StyledSidebar {...props} />
}

export { Sidebar }
