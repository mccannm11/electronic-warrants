import React from "react"
import { Header } from "../typography/Header"
import { Spacer } from "../utilities/Spacer"
import { HR } from "../utilities/HR"

const PageHeader = ({ children }) => (
  <>
    <Header variant="3">{children}</Header>
    <Spacer height={0.75} />
    <HR color="lightGrey" />
    <Spacer height={2} />
  </>
)

export { PageHeader }
