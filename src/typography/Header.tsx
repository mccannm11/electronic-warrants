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

export type HeaderProps = {
  variant: HeaderVariant
  opacity?: Opacity
  color?: Color
  weight?: FontWeight
  children: ReactNode
  transform?: TextTransform
}

type TextTransform =
  | "none"
  | "capitalize"
  | "uppercase"
  | "lowercase"
  | "initial"
  | "unset"

const StyledHeader = styled.div<HeaderProps>`
  font-size: ${({ variant }) => HeaderSizeMap[variant]}rem;
  font-weight: ${(props) => props.weight};
  opacity: ${(props) => props.opacity / 100};
  color: ${(props) => Colors[props.color]};
  line-height: 1.25;
  margin: 0;
  text-transform: ${(props) => props.transform};
`

const Header: FC<HeaderProps> = ({
  variant = "4",
  transform = "none",
  opacity = 90,
  weight = 400,
  ...props
}) => (
  <StyledHeader
    variant={variant}
    // @ts-ignore
    as={`h${variant}`}
    opacity={opacity}
    weight={weight}
    transform={transform}
    {...props}
  />
)

export { Header }
