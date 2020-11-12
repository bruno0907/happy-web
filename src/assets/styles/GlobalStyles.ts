import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root{
    --color-bg-gradient: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);
    --color-text-white: #FFFFFF;      
    --color-bg-light: #EBF2F5;
    --color-input-border-validated: #A1E9C5;
    --color-text-complement: #8FA7B2;
    --color-text-base: #5C8599;
    --color-text-title: #4D6F80;
    --color-line-in-white: #D3E2E5;
    --color-input-fill: #F5F8FA;
    --color-button-confirm: #31B272;
    --color-button-confirm-hover: #3BD689 ;
    --color-button-delete: #D6487B;
    --color-button-delete-hover: #D6487B;
    --color-button-in-gradient: #12AFCB;  
    --color-sidebar: #15C3D6;
    --color-button-yellow: #FFD666;  
  }

  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body{
    color: var(--color-text-white);
    background: var(--color-bg-light);
  }

  body,
  input,
  button,
  textarea{
    font-family: Nunito, sans-serif;
    font-weight: 600;
    font-size: 18px;
  } 

`
export default GlobalStyle