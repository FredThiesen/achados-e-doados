import { createGlobalStyle } from "styled-components"
import Colors from "./Constants/colors"

export default createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    font: 15px 'Comfortaa', cursive;
    background: ${Colors.dark};
    color: ${Colors.white};
    -webkit-font-smoothing: antialiased !important;
  }
  div{
    display:flex;
    flex-direction:column;
    align-items:center;
  }
  ul {
    list-style: none;
  }
`
