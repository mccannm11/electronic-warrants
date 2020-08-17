import React from "react"
import styled from "styled-components"

const StyledPanel = styled.div`
  border-radius: 4px;
  padding: 16px;
  border: 1px solid #ccc;
`

const Panel = (props) => <StyledPanel {...props} />

export { Panel }
