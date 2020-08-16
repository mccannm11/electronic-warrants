import React, { FC } from "react"
import styled from "styled-components"
import { Rem } from "../Types"

const StyledText = styled.p<TextProps>`
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
  variant: TextVariant
}

const Text: FC<TextProps> = (props) => <StyledText {...props} />

export { Text }
