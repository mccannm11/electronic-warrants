import styled from "styled-components"
import React from "react"

const StyledCode = styled.div`
  font-family: monospace;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 8px 16px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  overflow-x: scroll;
`

const Code = (props) => {
  return <StyledCode {...props} />
}

export { Code }
