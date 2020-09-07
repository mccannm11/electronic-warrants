import React, { useState } from "react"
import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import { ConnectedTextField } from "../inputs/TextField"
import styled from "styled-components"
import { Spacer } from "../utilities/Spacer"
import { Colors } from "../styles/Colors"
import { ConnectedButton } from "../inputs/Button"
import { FormProvider, useForm } from "react-hook-form"
import { Text } from "../typography/Text"
import { $ } from "../utilities/helpers"
import { ConnectedSelectField } from "../inputs/SelectField"
import { Panel, PanelHeader } from "../surfaces/Panel"
import { Grid } from "../utilities/Grid"
import JSONPretty from "react-json-pretty"
import { Code } from "../typography/Code"

const StyledFormLayout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 32px 0;
`

const StyledFormFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 32px 0;
  border-bottom: 1px solid ${Colors.black20};
`

const FormsPage = () => {
  const formMethods = useForm({
    mode: "onChange",
    defaultValues: {
      timeout: 1500
    }
  })
  const [submitData, setSubmitData] = useState([])
  const watchAll = formMethods.watch()

  const handleSubmit = formMethods.handleSubmit(async (formData) => {
    await $.sleep(formData.timeout)
    setSubmitData([...submitData, formData])
  })

  return (
    <PageWithNavigationLayout>
      <PageHeader>Forms</PageHeader>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <StyledFormLayout>
            <ConnectedTextField
              validationRules={{
                required: "First name is required",
                min: {
                  message: "First name must be 8 characters long",
                  value: 8
                }
              }}
              label="First name"
              name="firstName"
            />
            <ConnectedTextField
              validationRules={{
                required: "Last name is required"
              }}
              label="Last name"
              name="lastName"
            />
            <ConnectedTextField
              label="Password"
              name="password"
              type="password"
            />
            <ConnectedTextField label="Email" name="email" />
            <ConnectedTextField
              disabled
              label="Username"
              name="username"
              defaultValue="Ronald Bringer"
            />
            <ConnectedTextField label="Timout" name="timeout" />
            <ConnectedSelectField
              label="State"
              name="state"
              options={[
                { id: "", label: "" },
                { id: "MA", label: "Mass of two shits" },
                { id: "VT", label: "Vermont" },
                { id: "CT", label: "No one knows how to spell this" }
              ]}
            />
            <StyledFormFooter>
              {formMethods.formState.isSubmitting && (
                <>
                  <Text variant="small">Submitting </Text>
                  <Spacer width={0.5} />
                </>
              )}
              <ConnectedButton color="englishViolet" onClick={handleSubmit}>
                Submit
              </ConnectedButton>
            </StyledFormFooter>
          </StyledFormLayout>

          <Spacer height={4} />

          <Grid columns={1} padding={1}>
            <Panel>
              <PanelHeader>Form state</PanelHeader>
              <Code>
                <JSONPretty data={formMethods.formState} />
              </Code>
            </Panel>

            <Panel>
              <PanelHeader>All watched data</PanelHeader>
              <Code>
                <JSONPretty data={watchAll} />
              </Code>
            </Panel>

            <Panel>
              <PanelHeader>Submitted data</PanelHeader>
              {submitData.map((data) => (
                <>
                  <Spacer height={1} />
                  <Code>
                    <JSONPretty data={data} />
                  </Code>
                </>
              ))}
            </Panel>
          </Grid>

          <Spacer height={4} />
        </form>
      </FormProvider>
    </PageWithNavigationLayout>
  )
}

export { FormsPage }
