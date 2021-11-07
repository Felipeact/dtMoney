import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #f0f2f5;
    --red: #E52E4D;
    --blue: #5429CC;

    --bllue-light: #6933ff;

    --text-title: #363f5f;
    --text-dody: #969cb3;

    --shape: #ffffff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  //font-zise = 16px (Desktop)
  html {
    // igual
    @media(max-width: 1080px ) {
      font-size: 93.75%;//16px * 0,9375 = 15px
    }
    //menor
    @media( max-width: 720px){
      font-size: 87.85%; // 14px
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  strong, h1, h2, h4, h3, h5, h6 {
    font-weight: 600;
  }

  body, input, textarea, button {
    font-family: 'Poppis', sans-serif;
    font-weight: 400;
  }

  button {
    cursor: pointer;
  }

  [ disabled ] {
    opacity: 0.6;
    cursor: not-allowed;
  }

`;