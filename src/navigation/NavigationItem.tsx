import React, { FC, ReactNode } from "react"
import styled from "styled-components"
import { PlaceholderImage } from "../utilities/PlaceholderImage"
import { Spacer } from "../utilities/Spacer"
import { Header } from "../typography/Header"
import { Link } from "react-router-dom"

const StyledNavigationItem = styled.div<StyledNavigationLinkProps>`
  transition: all 0.15s cubic-bezier(0.8, 0, 0.1, 1);
  padding: 12px 12px 12px 20px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`

type StyledNavigationLinkProps = {
  state?: NavigationItemState
}

const StyledNavigationLink = styled(Link)<StyledNavigationLinkProps>`
  color: black;
  text-decoration: none;
`

type NavigationItemState = "idle" | "active"

type NavigationItemProps = {
  children: ReactNode
  to: string
} & StyledNavigationLinkProps

const NavigationItem: FC<NavigationItemProps> = ({
  children,
  to,
  state = "idle"
}) => (
  <StyledNavigationLink to={to} state={state}>
    <StyledNavigationItem state={state}>
      <PlaceholderImage width={16} height={16} />
      <Spacer width={1} />
      <Header variant="6" weight={100}>
        {children}
      </Header>
    </StyledNavigationItem>
  </StyledNavigationLink>
)
export { NavigationItem }
