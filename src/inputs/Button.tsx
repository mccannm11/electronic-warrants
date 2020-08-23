import styled, { css } from "styled-components"
import React, { FC, HTMLAttributes, HTMLProps } from "react"
import { Color, Colors } from "../styles/Colors"
import { animate } from "../styles/Mixins"

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

const StyledButton = styled.button<ButtonProps>`
  ${animate()}
  ${({ size }) => ButtonPaddings[size]};
  color: white;
  background-color: ${({ color }) => Colors[color]};
  font-weight: 500;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: ${({ color }) => Colors[color]}80;
  }
`

type ButtonProps = {
  size?: ButtonSize
  color?: Color
} & HTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({
  color = "coolGrey",
  size = "medium",
  ...props
}) => <StyledButton size={size} color={color} {...props} />

export { Button }
