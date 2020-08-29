import React, { useState } from "react"
import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import { Page } from "../layouts/Page"
import { ConnectedTextField } from "../inputs/TextField"
import styled from "styled-components"
import { Spacer } from "../utilities/Spacer"
import { Colors } from "../styles/Colors"
import { ConnectedButton } from "../inputs/Button"
import { FormProvider, useForm } from "react-hook-form"
import { Header } from "../typography/Header"
import { HR } from "../utilities/HR"
import { Text } from "../typography/Text"

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
  padding: 32px 0;
  border-bottom: 1px solid ${Colors.black20};
`

const sleep = (timeout: number) =>
  new Promise((res, rej) => {
    setTimeout(res, timeout)
  })

const FormsPage = () => {
  const formMethods = useForm({
    mode: "onChange",
    defaultValues: {
      timeout: 100
    }
  })
  const [submitData, setSubmitData] = useState([])

  const handleSubmit = formMethods.handleSubmit(async (formData) => {
    setSubmitData([...submitData, formData])
    await sleep(formData.timeout)
  })

  return (
    <Page>
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
              <StyledFormFooter>
                <ConnectedButton color="englishViolet" onClick={handleSubmit}>
                  Submit
                </ConnectedButton>
              </StyledFormFooter>
            </StyledFormLayout>

            <Spacer height={4} />
            <Header variant="3">Form state</Header>
            <Spacer height={0.5} />
            <HR />
            <Spacer height={1} />

            <Text>
              Is Submitted:&nbsp;
              {formMethods.formState.isSubmitted.toString()}
            </Text>
            <Text>
              Is submitting:&nbsp;
              {formMethods.formState.isSubmitting.toString()}
            </Text>
            <Text> Submit count:&nbsp;{formMethods.formState.submitCount}</Text>

            <Spacer height={4} />
            <Header variant="3">Submitted Data</Header>
            <Spacer height={0.5} />
            <HR />
            <Spacer height={1} />
            {submitData.map((data) => (
              <>
                <Spacer height={1} />
                {JSON.stringify(data)}
              </>
            ))}
          </form>
        </FormProvider>
      </PageWithNavigationLayout>
    </Page>
  )
}

export { FormsPage }
