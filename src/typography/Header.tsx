import styled from "styled-components"
import React, { FC, ReactNode } from "react"
import { Opacity, Rem } from "../Types"
import { Color, Colors } from "../styles/Colors"

type HeaderVariant = "1" | "2" | "3" | "4" | "5" | "6"

const HeaderSizeMap: Record<HeaderVariant, Rem> = {
  "1": 2.25,
  "2": 2,
  "3": 1.75,
  "4": 1.5,
  "5": 1.25,
  "6": 1
}

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800

type HeaderProps = {
  variant: HeaderVariant
  opacity?: Opacity
  color?: Color
  weight?: FontWeight
  children: ReactNode
}

const StyledHeader = styled.div<HeaderProps>`
  font-size: ${({ variant }) => HeaderSizeMap[variant]}rem;
  font-weight: ${(props) => props.weight};
  opacity: ${(props) => props.opacity / 100};
  color: ${(props) => Colors[props.color]};
  line-height: 1.25;
  margin: 0;
`

const Header: FC<HeaderProps> = ({ opacity = 80, weight = 400, ...props }) => (
  <StyledHeader
    // @ts-ignore
    as={`h${props.variant}`}
    opacity={opacity}
    weight={weight}
    {...props}
  />
)

export { Header }
