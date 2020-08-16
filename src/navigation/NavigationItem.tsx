import React from "react"
import styled from "styled-components"
import { PlaceholderImage } from "../utilities/PlaceholderImage"
import { Spacer } from "../utilities/Spacer"
import { Header } from "../typography/Header"

const StyledNavigationItem = styled.div`
  transition: all 0.15s cubic-bezier(0.8, 0, 0.1, 1);
  width: 100%;
  padding: 12px 12px 12px 20px;
  display: flex;
  align-items: center;
  color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`

const NavigationItem = ({ children }) => (
  <StyledNavigationItem>
    <PlaceholderImage width={16} height={16} />
    <Spacer width={1} />
    <Header variant="6" weight={100}>
      {children}
    </Header>
  </StyledNavigationItem>
)
export { NavigationItem }
