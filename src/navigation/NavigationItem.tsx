import React from "react"
import styled from "styled-components"
import { PlaceholderImage } from "../utilities/PlaceholderImage"
import { Spacer } from "../utilities/Spacer"

const StyledNavigationItem = styled.div`
  width: 100%;
  padding: 12px 12px 12px 20px;
  display: flex;
  align-items: center;
`

const NavigationItem = ({ children }) => (
  <StyledNavigationItem>
    <PlaceholderImage width={16} height={16} />
    <Spacer width={0.25} />
    {children}
  </StyledNavigationItem>
)
export { NavigationItem }
