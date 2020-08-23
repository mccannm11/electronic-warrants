import { css } from "styled-components"
import { Duration } from "../Types"

export const animate = (duration: Duration = 0.15) => css`
  transition: all ${duration}s cubic-bezier(0.8, 0, 0.1, 1);
`
