import React from "react"
import { PageWithNavigationLayout } from "../layouts/PageWithNavigationLayout"
import { PageHeader } from "../layouts/PageHeader"
import { Page } from "../layouts/Page"
import { ConnectedTextField, TextField } from "../inputs/TextField"
import styled from "styled-components"
import { Spacer } from "../utilities/Spacer"
import { Colors } from "../styles/Colors"
import { Button } from "../inputs/Button"
import { FormProvider, useForm } from "react-hook-form"

const StyledFormLayout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 32px 0;
`

const StyledFormFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 32px 0;
  border-bottom: 1px solid ${Colors.black20};
`

const FormsPage = () => {
  const formMethods = useForm()

  const handleSubmit = formMethods.handleSubmit(async (formData) => {
    console.log(formData)
  })

  return (
    <Page>
      <PageWithNavigationLayout>
        <PageHeader>Forms</PageHeader>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit}>
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
              <ConnectedTextField disabled label="Email" name="email" />
              <StyledFormFooter>
                <Button onClick={handleSubmit}>Submit</Button>
              </StyledFormFooter>
            </StyledFormLayout>
          </form>
        </FormProvider>
      </PageWithNavigationLayout>
    </Page>
  )
}

export { FormsPage }
