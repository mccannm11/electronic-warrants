import React, { FC } from "react"
import styled from "styled-components"
import { Pixel } from "../Types"

const StyledPlaceholderImage = styled.img<PlaceholderImageProps>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.height}px;
  border-radius: ${({ circle }) => (circle ? 999999 : 0)}px;
  overflow: hidden;
`

type PlaceholderImageProps = {
  height: Pixel
  width: Pixel
  circle?: boolean
}

const PlaceholderImage: FC<PlaceholderImageProps> = ({
  circle = false,
  ...props
}) => (
  <StyledPlaceholderImage
    src={`https://via.placeholder.com/${props.width}x${props.height}.png`}
    alt="placeholder"
    circle={circle}
    {...props}
  />
)

export { PlaceholderImage }
