import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 620px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px;  
  color: var(--color-text-base);
  background: var(--color-text-white);
  
    h1{
      font-size: 32px;
      font-weight: 700;
      line-height: 250%;
    }

    p{
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 30px;
    }

    form{
      width: 100%;
      max-width: 360px;
      display: flex;
      flex-direction: column;

      fieldset{
        display: flex;
        flex-direction: column;
        border: none;
      }
    }
`;

export const GoBack = styled.button`
  position: absolute;
  top: 80px;
  right: 80px;
  width: 48px;
  height: 48px;  
  border-radius: 16px;  
  border: none;
  background: var(--color-bg-light);
  display: flex;
  align-items: center;
  justify-content: center;  
  cursor: pointer;
  transition: filter 0.1s;

    &:hover{      
      filter: brightness(95%);
    }
`
export const Submit = styled.button`
  background: var(--color-green);
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: none;
  color: #FFFFFF;
  font-weight: 700;
  opacity: 0.6;  
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;

    &:hover{
      opacity: 1;
    } 
`

export const RememberMe = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 20px;
  color: var(--color-text-complement);

    label{
      display: flex;
      cursor: pointer;      

      input{
        display: none; 
        
        &:checked + div{
          background: var(--color-green);
          border-color: var(--color-green);
          position: relative;
          
          &:after{
            content: '';
            position: absolute;
            left: 7px;
            top: 3px;
            width: 5px;
            height: 10px;
            border: solid var(--color-text-white);
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
          }
        }
      }

      div{
        width: 24px;
        height: 24px;
        border-radius: 8px;
        border: solid 1px var(--color-line-in-white);
        background: var(--color-input-fill); 
        margin-right: 8px;   
        position: relative; 
        z-index: 1;         
      }

      span{
        pointer-events: none;   
        transition: filter 0.1s;     
      }

      &:hover {
        span{
          filter: brightness(80%);
        }
      }
    }


    a{
      text-decoration: none; 
      color: var(--color-text-complement);  
      transition: filter 0.1s; 
      
      &:hover{
        filter: brightness(80%);
      }
    }
`