import React, { useState } from "react"
import {
  FormElementState,
  StyledFormFieldWrapper,
  StyledTextFieldLabel,
  ValidationState
} from "./TextField"
import { Spacer } from "../utilities/Spacer"
import { FieldError } from "react-hook-form"

type SelectFieldProps = {
  disabled?: boolean
  label: string
  error?: FieldError
}

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ disabled = false, ...props }, ref) => {
    const validationState: ValidationState = props.error ? "invalid" : "valid"

    const [formElementState, setFormElementState] = useState<FormElementState>(
      "closed"
    )

    return (
      <StyledFormFieldWrapper disabled={disabled}>
        <StyledTextFieldLabel
          formElementState={formElementState}
          validationState={validationState}
        >
          {props.label}
        </StyledTextFieldLabel>
        <Spacer height={1.5} />
      </StyledFormFieldWrapper>
    )
  }
)

export { SelectField }
