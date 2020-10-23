import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

export const Hero = styled.aside`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-gradient);
`

export const FormAside = styled.main`
  width: 100%;
  max-width: 650px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;   
  color: var(--color-text-base);
  background: var(--color-text-white);

    form{
      width: 75%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

        fieldset{
          width: 100%;
          border: none;          

          legend{
            font-size: 32px;
            line-height: 34px;            
            font-weight: 700;
            margin-bottom: 24px;
          }

          p{
            font-size: 18px;
            line-height: 28px;
            margin-bottom: 40px;                        
          }
        }
    }
`

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