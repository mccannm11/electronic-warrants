import styled, { css } from "styled-components"
import React, { FC } from "react"

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
  ${({ size }) => ButtonPaddings[size]};
  color: white;
  font-weight: 500;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  outline: none;
`

type ButtonProps = {
  size?: ButtonSize
}

const Button: FC<ButtonProps> = ({ size = "medium", ...props }) => (
  <StyledButton size={size} {...props} />
)

export { Button }
