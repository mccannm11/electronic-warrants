import styled from "styled-components"
import { Rem } from "../Types"

type GridProps = {
  columns: number
  padding: Rem
  minWidth?: Rem
  grow?: boolean
}

const Grid = styled.div<GridProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: -${({ padding }) => padding}rem;
  > * {
    flex-grow: ${({ grow }) => (grow !== undefined && grow === true ? 1 : 0)};
    min-width: ${({ minWidth = 1 }) => minWidth}rem;
    width: calc(
      ${({ columns }) => 100 / columns}% - ${({ padding }) => padding * 2}rem
    );
    margin: ${({ padding }) => padding}rem;
  }
`

export { Grid }
