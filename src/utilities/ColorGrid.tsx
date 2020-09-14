import { Opacity } from "../Types"
import styled from "styled-components"
import { Colors } from "../styles/Colors"
import React, { FC } from "react"

const StyledColorGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
type StyledColorBoxProps = {
  opacity: Opacity
}
const StyledColorBox = styled.div<StyledColorBoxProps>`
  background-color: ${({ color }) => Colors[color]};
  opacity: ${({ opacity }) => opacity / 100};
  text-align: center;
  padding: 8px;
  color: #ccc;
`
const StyledColorRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`
const ColorGrid: FC = () => (
  <StyledColorGrid>
    {[...new Array(10)].map((x, i) => (
      <StyledColorRow key={i}>
        {Object.keys(Colors).map((color) => {
          const opacity = i * 10
          const colorKey = `${color}-${opacity}`

          return (
            <StyledColorBox key={colorKey} color={color} opacity={opacity}>
              {colorKey}
            </StyledColorBox>
          )
        })}
      </StyledColorRow>
    ))}
  </StyledColorGrid>
)

export { ColorGrid }
