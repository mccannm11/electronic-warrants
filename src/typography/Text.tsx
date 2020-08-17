import React, { FC } from "react"
import styled from "styled-components"
import { Rem } from "../Types"
import { Color, Colors } from "../styles/Colors"

const StyledText = styled.p<TextProps>`
  color: ${({ color }) => Colors[color]};
  font-size: ${({ variant }) => TextSizeMap[variant]}rem;
  margin: 0;
  line-height: 1.5;
`

const TextSizeMap: Record<TextVariant, Rem> = {
  small: 0.875,
  medium: 1,
  large: 1.25
}

type TextVariant = "small" | "medium" | "large"

type TextProps = {
  variant?: TextVariant
  color?: Color
}

const Text: FC<TextProps> = ({
  color = "black",
  variant = "medium",
  ...props
}) => <StyledText color={color} variant={variant} {...props} />

export { Text }
