import styled, { css } from "styled-components"
import React, {
  FC,
  HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react"
import { animate } from "../styles/Mixins"
import { Colors } from "../styles/Colors"
import { useFormContext } from "react-hook-form"
import { ValidationRules } from "react-hook-form/dist/types/form"

const commonFormCss = css`
  caret-color: ${Colors.black40};
  color: rgba(0, 0, 0, 0.7);
`

type StyledTextFieldProps = {
  formElementState: FormElementState
  validationState: ValidationState
}

const StyledTextField = styled.input<StyledTextFieldProps>`
  ${commonFormCss};
  width: 100%;
  border: none;
  outline: none;
  padding: 6px 0 4px;
  border-bottom: 1px solid #ccc;
  border-bottom-color: ${(props) =>
    props.formElementState === "open" ? Colors.black30 : Colors.black20};
`

type TextFieldProps = {
  label: string
  name: string
  type?: string
  disabled?: boolean
  error?: FieldError
} & HTMLAttributes<HTMLInputElement>

type StyledTextFieldLabelProps = {
  formElementState: FormElementState
  validationState: ValidationState
}

const StyledTextFieldLabel = styled.label<StyledTextFieldLabelProps>`
  ${animate(0.175)};
  color: ${(props) =>
    props.validationState === "invalid" ? Colors.errorRed : Colors.black};
  // opacity: ${(props) => (props.formElementState === "open" ? 0.7 : 0.5)};
  opacity: .5;
  position: absolute;
  bottom: ${(props) => (props.formElementState === "open" ? 28 : 6)}px;
  left: 0;
  pointer-events: none;
  font-size: ${(props) => (props.formElementState === "open" ? 12 : 14)}px;
  font-weight: ${(props) => (props.formElementState === "open" ? 400 : 500)};
`

const StyledTextFieldWrapper = styled.div`
  position: relative;
`

type FieldError = {
  message: string
}

type FormElementState = "open" | "closed"
type ValidationState = "valid" | "invalid"

type StyledErrorMessageProps = {
  validationState: ValidationState
}

const StyledErrorMessage = styled.div<StyledErrorMessageProps>`
  ${animate(0.15)};
  color: ${Colors.errorRed};
  height: 12px;
  font-size: 11px;
  margin-top: 4px;
  margin-bottom: 32px;
  position: relative;
  opacity: ${(props) => (props.validationState === "valid" ? 0 : 0.7)};
  top: ${(props) => (props.validationState === "valid" ? -16 : 0)}px;
`

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ disabled = false, error = null, type = "text", ...props }, ref) => {
    const wrapperRef = useRef<HTMLDivElement>()
    const inputRef = useRef<HTMLInputElement>()
    const [formElementState, setFormElementState] = useState<FormElementState>(
      "closed"
    )

    const validationState: ValidationState = error ? "invalid" : "valid"

    const calculateFormElementState = () =>
      setFormElementState(
        inputRef.current.value.length === 0 ? "closed" : "open"
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

    return (
      <>
        <StyledTextFieldWrapper ref={wrapperRef} onClick={handleWrapperClick}>
          <StyledTextFieldLabel
            formElementState={formElementState}
            validationState={validationState}
          >
            {props.label}
          </StyledTextFieldLabel>
          <StyledTextField
            {...props}
            type={type}
            ref={inputRef}
            validationState={validationState}
            formElementState={formElementState}
            onChange={calculateFormElementState}
            onInput={calculateFormElementState}
            onBlur={handleInputBlur}
          />
        </StyledTextFieldWrapper>
        <StyledErrorMessage validationState={validationState}>
          {error?.message}
        </StyledErrorMessage>
      </>
    )
  }
)

type ConnectedFormElementProps = {
  validationRules?: ValidationRules
}

type ConnectedTextFieldProps = TextFieldProps & ConnectedFormElementProps

const ConnectedTextField: FC<ConnectedTextFieldProps> = ({
  validationRules = {},
  ...props
}) => {
  const { register, errors } = useFormContext()
  const fieldError = errors[props.name]

  return (
    <TextField ref={register(validationRules)} error={fieldError} {...props} />
  )
}
export { TextField, ConnectedTextField }
