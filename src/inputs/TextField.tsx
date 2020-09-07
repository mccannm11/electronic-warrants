import React, { FC, HTMLAttributes } from "react"
import { FieldError, useFormContext } from "react-hook-form"
import {
  FormElementState,
  formFieldWrapper,
  SharedFormFieldProps,
  ValidationState
} from "./formFieldWrapper"
import styled from "styled-components"
import { Colors } from "../styles/Colors"
import { commonFormCss } from "./commonFormCss"
import { ConnectedFormElementProps } from "./SelectField"

export type StyledTextFieldProps = {
  validationState: ValidationState
  formElementState: FormElementState
} & SharedFormFieldProps &
  Partial<HTMLInputElement>

export const StyledTextField = styled.input<StyledTextFieldProps>`
  ${commonFormCss};
  color: rgba(0, 0, 0, ${(props) => (props.disabled ? 0.5 : 0.7)});
  width: 100%;
  border: none;
  outline: none;
  padding: 6px 0 10px;
  border-bottom: 1px solid #ccc;
  pointer-events: none;
  font-size: 16px;
  border-bottom-color: ${(props) =>
    props.formElementState === "open" ? Colors.black30 : Colors.black20};
`

const TextField = formFieldWrapper<HTMLInputElement, StyledTextFieldProps>(
  StyledTextField
)

type TextFieldProps = {
  label: string
  name: string
  type?: string
  disabled?: boolean
  error?: FieldError
} & HTMLAttributes<HTMLInputElement>

type ConnectedTextFieldProps = TextFieldProps & ConnectedFormElementProps

const ConnectedTextField: FC<ConnectedTextFieldProps> = ({
  validationRules = {},
  ...props
}) => {
  const { register, errors } = useFormContext()
  const fieldError = errors[props.name]

  return (
    // @ts-ignore
    <TextField ref={register(validationRules)} error={fieldError} {...props} />
  )
}

export { TextField, ConnectedTextField }
