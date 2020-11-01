import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #37C77F;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-text-white);
  padding: 30px 61px;

    h1{
      font-size: 80px;
      font-weight: 800;      
    }

    p{
      width: 392px;
      font-size: 24px;
      line-height: 34px;
      text-align: center;
      padding: 32px 0 60px;
    }

    button{
      width: 243px;
      height: 64px;
      border: none;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;   
      background: var(--color-button-confirm);
      font-family: Nunito;
      font-size: 18px;
      font-weight: 800;
      color: var(--color-text-white);
      cursor: pointer;
      transition: background 0.2s;
      
      &:hover{
        background: var(--color-button-confirm-hover);
      }
    }

    a{
      text-decoration: none;
    }
`

export const Hero = styled.img`
  padding: 30px 61px;
`

