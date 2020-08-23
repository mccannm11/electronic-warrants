import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`  
  @import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap");


  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
  }


  body {
    font-family: "Lato", sans-serif;
    padding: 0;
    margin: 0;
  }
  
  * {
    box-sizing: border-box;
  }
`

export { GlobalStyles }
