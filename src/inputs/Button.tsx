import styled, { css } from "styled-components"
import React, { FC, HTMLAttributes, useEffect } from "react"
import { Color, Colors } from "../styles/Colors"
import { animate } from "../styles/Mixins"
import { useForm, useFormContext } from "react-hook-form"

type ButtonSize = "small" | "medium" | "large"

const ButtonPaddings: Record<ButtonSize, any> = {
  small: css`
    padding: 4px 10px;
    font-size: 13px;
  `,
  medium: css`
    padding: 6px 16px;
    font-size: 14px;
  `,
  large: css`
    padding: 8px 22px;
    font-size: 15px;
  `
}

const ButtonStateStyles = {
  ready: css`
    cursor: pointer;
    pointer-events: all;
  `,
  disabled: css`
    pointer-events: none;
    cursor: not-allowed;
  `,
  loading: css`
    cursor: wait;
    pointer-events: none;
  `
}

function calculateBackgroundColor(props: ButtonProps) {
  switch (props.state) {
    case "ready":
      return Colors[props.color]
    case "loading":
      return Colors[props.color]
    case "disabled":
      return `${Colors[props.color]}80;`
  }
}

const StyledButton = styled.button<ButtonProps>`
  ${animate()}
  ${({ size }) => ButtonPaddings[size]};
  color: white;
  background-color: ${(props) => calculateBackgroundColor(props)};
  font-weight: 500;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  ${(props) => ButtonStateStyles[props.state]};
  outline: none;
  &:hover {
    background-color: ${({ color }) => Colors[color]}80;
  }
`

type ButtonState = "ready" | "loading" | "disabled"

type ButtonProps = {
  size?: ButtonSize
  color?: Color
  disabled?: boolean
  state?: ButtonState
} & HTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({
  state = "ready",
  disabled = false,
  color = "coolGrey",
  size = "medium",
  ...props
}) => (
  <StyledButton
    size={size}
    color={color}
    disabled={disabled}
    state={state}
    {...props}
  />
)

const ConnectedButton: FC<ButtonProps> = (props) => {
  const { formState } = useFormContext()

  const calculateButtonState = (): ButtonState => {
    if (formState.isSubmitting) {
      return "loading"
    } else if (formState.isDirty && formState.isValid) {
      return "ready"
    } else {
      return "disabled"
    }
  }

  useEffect(() => {
    console.log("isDirty", formState.isDirty)
    console.log("isValid", formState.isValid)
  })

  return <Button state={calculateButtonState()} {...props} />
}

export { Button, ConnectedButton }
