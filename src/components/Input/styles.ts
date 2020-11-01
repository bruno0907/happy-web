import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-bottom: 32px;
  position: relative;

  img {
      position: absolute;
      top: 55px;
      right: 25px;
    }

  label{
    display: flex;
    color: #8FA7B3;
    margin-bottom: 8px;
    line-height: 24px;
  }
  
  input{
    width: 100%;
    border-radius: 20px;
    padding: 21px 24px;    
    border: solid 1px var(--color-line-in-white);
    background: var(--color-input-fill);
    color: var(--color-text-base);
    transition: border-color 0.1s;    

      &:focus{
        border-color: var(--color-input-border-validated);
      }

      &::placeholder{
        opacity: 0;
      }

      &:not(:placeholder-shown){
        border-color: var(--color-input-border-validated);
      }

      
      &::-ms-reveal,
      &::-ms-clear {
        display: none;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        -moz-appearance: textfield;
        margin: 0;
      }
    
    
  }
`;
