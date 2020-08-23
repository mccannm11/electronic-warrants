import styled from "styled-components"
import { Rem } from "../Types"

type GridProps = {
  columns: number
  padding: Rem
  minWidth: Rem
}

const Grid = styled.div<GridProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: -${({ padding }) => padding}rem;
  > * {
    flex-grow: 1;
    min-width: ${({ minWidth }) => minWidth}rem;
    width: calc(
      ${({ columns }) => 100 / columns}% - ${({ padding }) => padding * 2}rem
    );
    margin: ${({ padding }) => padding}rem;
  }
`

export { Grid }
