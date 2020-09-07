import React, { useEffect, useImperativeHandle, useRef, useState } from "react"
import { Spacer } from "../utilities/Spacer"
import styled from "styled-components"
import { Colors } from "../styles/Colors"
import { animate } from "../styles/Mixins"

type StyledTextFieldLabelProps = {
  validationState: ValidationState
  formElementState: FormElementState
}

export const StyledTextFieldLabel = styled.label<StyledTextFieldLabelProps>`
  ${animate(0.175)};
  color: ${(props) =>
    props.validationState === "invalid" ? Colors.errorRed : Colors.black};
  opacity: 0.5;
  position: absolute;
  top: ${(props) => (props.formElementState === "open" ? 4 : 32)}px;
  left: 0;
  pointer-events: none;
  font-size: ${(props) => (props.formElementState === "open" ? 12 : 14)}px;
  font-weight: ${(props) => (props.formElementState === "open" ? 400 : 500)};
`

type StyledFormFieldWrapperProps = {
  disabled?: boolean
}

const StyledFormFieldWrapper = styled.div<StyledFormFieldWrapperProps>`
  position: relative;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
`

export type FieldError = {
  message: string
}

export type FormElementState = "open" | "closed"
export type ValidationState = "valid" | "invalid"

type StyledErrorMessageProps = {
  validationState: ValidationState
}

const StyledErrorMessage = styled.div<StyledErrorMessageProps>`
  ${animate(0.15)};
  color: ${Colors.errorRed};
  height: 12px;
  font-size: 11px;
  margin-top: 4px;
  margin-bottom: 24px;
  position: relative;
  opacity: ${(props) => (props.validationState === "valid" ? 0 : 0.7)};
  top: ${(props) => (props.validationState === "valid" ? -16 : 0)}px;
`

export type SharedFormFieldProps = {
  error?: FieldError
  disabled?: boolean
  label?: string
}

const formFieldWrapper = <
  TElement extends HTMLInputElement | HTMLSelectElement,
  TProps extends SharedFormFieldProps
>(
  FormField: any
) =>
  React.forwardRef<TElement, TProps>(({ disabled = false, ...props }, ref) => {
    const wrapperRef = useRef<HTMLDivElement>()
    const inputRef = useRef<TElement>()
    const [formElementState, setFormElementState] = useState<FormElementState>(
      "closed"
    )

    const validationState: ValidationState = props.error ? "invalid" : "valid"

    const calculateFormElementState = () =>
      setFormElementState(
        inputRef.current.value.length === 0 && !disabled ? "closed" : "open"
      )

    const handleInputBlur = () => calculateFormElementState()

    useImperativeHandle(ref, () => inputRef.current)

    useEffect(() => {
      inputRef.current.click()
      inputRef.current.blur()
      calculateFormElementState()
    }, [])

    const handleWrapperClick = () => {
      inputRef.current.focus()
      setFormElementState("open")
    }

    const handleInputFocus = () => {
      setFormElementState("open")
    }

    return (
      <>
        <StyledFormFieldWrapper
          disabled={disabled}
          ref={wrapperRef}
          onClick={handleWrapperClick}
        >
          <StyledTextFieldLabel
            formElementState={formElementState}
            validationState={validationState}
          >
            {props.label}
          </StyledTextFieldLabel>
          <Spacer height={1.5} />
          <FormField
            {...props}
            ref={inputRef}
            autoComplete="off"
            disabled={disabled}
            validationState={validationState}
            formElementState={formElementState}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </StyledFormFieldWrapper>
        <StyledErrorMessage validationState={validationState}>
          {props.error?.message}
        </StyledErrorMessage>
      </>
    )
  })

export { formFieldWrapper }
