import styled, { css } from "styled-components"
import React, { FC } from "react"

type Required<T> = T extends object
  ? { [P in keyof T]-?: NonNullable<T[P]> }
  : T

const flexAuto = css`
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
`
const StyledSpacer = styled.div<Required<SpacerProps>>`
  ${({ expand }) => expand && flexAuto};
  flex-shrink: 0;
  height: ${({ unit, height }) => `${height}${unit}`};
  width: ${({ unit, width }) => `${width}${unit}`};
`

type CssUnit = "em" | "ex" | "ch" | "rem" | "vw" | "vh" | "vmin" | "vmax"

type SpacerProps = {
  height?: number
  width?: number
  expand?: boolean
  unit?: CssUnit
}

const Spacer: FC<SpacerProps> = ({
  expand = false,
  unit = "rem",
  height = 0,
  width = 0,
  ...props
}) => (
  <StyledSpacer
    height={height}
    width={width}
    expand={expand}
    unit={unit}
    {...props}
  />
)

export { Spacer }
