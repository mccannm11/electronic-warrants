import React, { FC, HTMLAttributes } from "react"
import { StyledTextFieldProps } from "./TextField"
import { useFormContext } from "react-hook-form"
import { FieldError, formFieldWrapper } from "./formFieldWrapper"
import { ValidationRules } from "react-hook-form/dist/types/form"
import styled from "styled-components"
import { Colors } from "../styles/Colors"
import { commonFormCss } from "./commonFormCss"

const StyledSelectField = styled.select<StyledTextFieldProps>`
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

type SelectOption = {
  label: string
  id: string
}

type SelectFieldProps = {
  label: string
  name: string
  type?: string
  disabled?: boolean
  error?: FieldError
  options: SelectOption[]
} & HTMLAttributes<HTMLSelectElement>

const BaseSelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ options, ...props }, ref) => {
    return (
      // @ts-ignore
      <StyledSelectField ref={ref} {...props}>
        {options.map(({ id, label }) => (
          <option value={id}>{label}</option>
        ))}
      </StyledSelectField>
    )
  }
)

export type ConnectedFormElementProps = {
  validationRules?: ValidationRules
}

type ConnectedSelectFieldProps = SelectFieldProps & ConnectedFormElementProps

const ConnectedSelectField: FC<ConnectedSelectFieldProps> = ({
  validationRules = {},
  ...props
}) => {
  const { register, errors } = useFormContext()
  const fieldError = errors[props.name]

  return (
    // @ts-ignore
    <SelectField
      ref={register(validationRules)}
      error={fieldError}
      {...props}
    />
  )
}

const SelectField = formFieldWrapper<HTMLInputElement, SelectFieldProps>(
  BaseSelectField
)

export { SelectField, ConnectedSelectField }
