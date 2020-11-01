import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #FF669D;
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

    div{
      display: flex;

      button{
        width: 223px;
        height: 64px;
        margin: 4px;
        border: none;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;   
        background: var(--color-button-delete);
        font-family: Nunito;
        font-size: 18px;
        font-weight: 800;
        color: var(--color-text-white);
        cursor: pointer;
        transition: background 0.1s;
        
        :hover{
          background: #E75388;
        }

        :nth-child(2){
          background-color: transparent;
          border: solid 3px var(--color-button-delete);

          :hover{
            background: var(--color-button-delete-hover);
        }
        }
      }
    }

`

export const Hero = styled.img`
  padding: 30px 61px;
`

