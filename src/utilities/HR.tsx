import styled from "styled-components"
import { Pixel } from "../Types"
import { Color, Colors } from "../styles/Colors"
import React, { FC } from "react"

const StyledHR = styled.div<Required<HRProps>>`
  height: ${({ width }) => width}px;
  background-color: ${({ color }) => Colors[color]};
  width: 100%;
`

type HRProps = {
  width?: Pixel
  color?: Color
}

const HR: FC<HRProps> = ({ width = 1, color = "black20", ...props }) => (
  <StyledHR width={width} color={color} {...props} />
)

export { HR }
