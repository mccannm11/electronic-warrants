import React, { FC, ReactNode, useContext } from "react"
import styled from "styled-components"
import { Pixel } from "../Types"
import { Header, HeaderProps } from "../typography/Header"
import { Spacer } from "../utilities/Spacer"
import { HR } from "../utilities/HR"

const StyledPanel = styled.div<PanelProps>`
  border-radius: 4px;
  padding: ${(props) => props.padding}px;
  border: 1px solid #ccc;
`

const StyledPanelHeader = styled.div<PanelProps>`
  margin: 0 -${(props) => props.padding}px;
  color: black;
`

type PanelHeaderProps = {
  children: ReactNode
} & Partial<HeaderProps>

const PanelHeader: FC<PanelHeaderProps> = (props) => {
  const { padding } = useContext(PanelContext)

  return (
    <StyledPanelHeader padding={padding}>
      <div style={{ marginLeft: padding }}>
        <Header variant="6" weight={600} opacity={80} {...props} />
      </div>
      <Spacer height={0.5} />
      <HR color="lightGrey" />
      <Spacer height={1} />
    </StyledPanelHeader>
  )
}

type PanelContextProps = {
  padding?: Pixel
}

const PanelContext = React.createContext<PanelContextProps>({})

type PanelProps = {
  padding?: Pixel
}

const Panel: FC<PanelProps> = ({ padding = 16, ...props }) => {
  const panelContext = {
    padding: padding
  }

  return (
    <PanelContext.Provider value={panelContext}>
      <StyledPanel padding={padding} {...props} />
    </PanelContext.Provider>
  )
}

export { Panel, PanelHeader }
