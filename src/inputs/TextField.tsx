import styled, { css } from "styled-components"
import React from "react"

const sharedFormCss = css``

const StyledTextField = styled.input``

type TextFieldProps = {}

const TextField = ({ props }) => <StyledTextField {...props} />
