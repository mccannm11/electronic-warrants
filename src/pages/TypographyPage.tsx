import React from "react"
import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import { Page } from "../layouts/Page"
import { Text } from "../typography/Text"
import { LoremIpsum } from "../utilities/LoremIpsum"
import { Spacer } from "../utilities/Spacer"
import { HR } from "../utilities/HR"
import { Header } from "../typography/Header"
import { Panel } from "../surfaces/Panel"

const TypographyPage = () => (
  <Page>
    <PageWithNavigationLayout>
      <PageHeader>Typography</PageHeader>

      <Panel>
        <Header variant="4">Text</Header>
        <Spacer height={0.5} />
        <HR color="lightGrey" />
        <Spacer height={1} />

        <Text variant="small">
          <LoremIpsum />
        </Text>
        <Spacer height={1.5} />
        <Text variant="medium">
          <LoremIpsum />
        </Text>
        <Spacer height={1.5} />
        <Text variant="large">
          <LoremIpsum />
        </Text>
      </Panel>

      <Spacer height={2} />

      <Panel>
        <Header variant="4">Headers</Header>
        <Spacer height={0.5} />
        <HR color="lightGrey" />

        <Spacer height={1.5} />
        <Header variant="1"> This is a header 1</Header>
        <Header variant="2">This is a header 2</Header>
        <Header variant="3">This is a header 3</Header>
        <Header variant="4">This is a header 4</Header>
        <Header variant="5">This is a header 5</Header>
        <Header variant="6">This is a header 6</Header>
      </Panel>
    </PageWithNavigationLayout>
  </Page>
)

export { TypographyPage }
