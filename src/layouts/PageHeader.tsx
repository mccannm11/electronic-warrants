import styled from "styled-components"
import React from "react"
import { Header } from "../typography/Header"

const StyledPageHeader = styled.div`
  border-bottom: 1px solid #ccc;
  padding-bottom: 12px;
  margin-bottom: 32px;
`

const PageHeader = ({ children }) => (
  <StyledPageHeader>
    <Header variant="3">{children}</Header>
  </StyledPageHeader>
)

export { PageHeader }
