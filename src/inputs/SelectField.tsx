import React, {
  FC,
  HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react"
import { StyledTextField, StyledTextFieldProps } from "./TextField"
import { useFormContext } from "react-hook-form"
import {
  FieldError,
  FormElementState,
  formFieldWrapper,
  StyledErrorMessage,
  StyledTextFieldLabel,
  ValidationState
} from "./formFieldWrapper"
import { ValidationRules } from "react-hook-form/dist/types/form"
import styled from "styled-components"
import { Colors } from "../styles/Colors"
import { commonFormCss } from "./commonFormCss"
import { Spacer } from "../utilities/Spacer"
import { useDidMount } from "../hooks/useDidMount"

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
  formElementState?: FormElementState
} & HTMLAttributes<HTMLInputElement>

const StyledSelectOptions = styled.div`
  position: absolute;
  top: 16px;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #ccc;
`

const StyledSelectOption = styled.div`
  padding: 12px 12px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`

type SelectOptionsState = "open" | "closed"

const StyledBaseSelectFieldWrapper = styled.div`
  cursor: pointer;
  position: relative;
`

const DownCarat = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  right: 0;
  border: solid #ccc;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
`

const BaseSelectField = React.forwardRef<HTMLInputElement, SelectFieldProps>(
  ({ options, name, disabled, ...props }, ref) => {
    const [optionsState, setOptionsState] = useState<SelectOptionsState>(
      "closed"
    )
    const [formElementState, setFormElementState] = useState<FormElementState>(
      "closed"
    )

    const validationState: ValidationState = props.error ? "invalid" : "valid"

    const calculateFormElementState = () =>
      setFormElementState(
        inputElementRef.current.value.length === 0 && !disabled
          ? "closed"
          : "open"
      )

    useDidMount(calculateFormElementState)

    const wrapperRef = useRef<HTMLDivElement>()

    const handleOnKeydown = (event) => event.preventDefault()

    const inputElementRef = useRef<HTMLInputElement>()
    useImperativeHandle(ref, () => inputElementRef.current)

    const handleWrapperClick = (event) => {
      inputElementRef.current.focus()

      if (event.target === wrapperRef.current) {
        if (optionsState == "open") {
          setOptionsState("closed")
        } else {
          setOptionsState("open")
          const nextDocumentClick = (event) => {
            if (!wrapperRef.current.contains(event.target)) {
              setOptionsState("closed")
            }
            document.removeEventListener("click", nextDocumentClick)
          }

          document.addEventListener("click", nextDocumentClick)
          return
        }
      } else if (event.target.className.includes("select-option")) {
        const value = event.target.getAttribute("data-id")
        inputElementRef.current.value = value
        inputElementRef.current.blur()
        calculateFormElementState()
      }

      setOptionsState("closed")
    }

    return (
      <>
        <StyledBaseSelectFieldWrapper
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

          {/* @ts-ignore */}
          <StyledTextField
            {...props}
            name={name}
            ref={inputElementRef}
            onKeyDown={handleOnKeydown}
            onChange={calculateFormElementState}
          />
          <DownCarat />

          {optionsState === "open" && (
            <StyledSelectOptions>
              {options.map((o) => (
                <StyledSelectOption
                  data-id={o.id}
                  className="select-option"
                  key={o.id}
                >
                  {o.id} - {o.label}
                </StyledSelectOption>
              ))}
            </StyledSelectOptions>
          )}
        </StyledBaseSelectFieldWrapper>
        <StyledErrorMessage validationState={validationState}>
          {props.error?.message}
        </StyledErrorMessage>
      </>
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

const SelectField = BaseSelectField

export { BaseSelectField, SelectField, ConnectedSelectField }
