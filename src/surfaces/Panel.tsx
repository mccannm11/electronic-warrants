import React, { FC } from "react"
import styled from "styled-components"

const StyledPanel = styled.div`
  border-radius: 4px;
  padding: 16px;
  border: 1px solid #ccc;
`

/*
  PanelHeader
  PanelFooter
 */

const Panel: FC = (props) => <StyledPanel {...props} />

export { Panel }
