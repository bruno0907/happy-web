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
  
  input{
    width: 100%;
    border-radius: 20px;
    padding: 21px 24px;
    margin-top: 8px;
    border: solid 1px var(--color-line-in-white);
    background: var(--color-input-fill);
    color: var(--color-text-base);
    transition: border-color 0.1s;    

      &:focus{
        border-color: var(--color-green);
      }

      &::placeholder{
        opacity: 0;
      }

      &:not(:placeholder-shown){
        border-color: var(--color-green);
      }

      
      &::-ms-reveal,
      &::-ms-clear {
        display: none;
      }
    
    
  }
`;
