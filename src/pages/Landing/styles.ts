import styled from 'styled-components';

import Hero from '../../assets/images/hero.svg'

export const Container = styled.div`  
  width: 100vw;
  height: 100vh;
  background: var(--color-bg-gradient);    
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentWrapper = styled.div`  
  width: 100%;
  max-width: 1100px;
  height: 100%;
  max-height: 680px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: url(${Hero});
  background-size: 45%;    
  background-position: 70%;
  background-repeat: no-repeat;
`

export const LeftSide = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 45px 0;  
`

export const RightSide = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding: 45px 0;  
`

export const Logo = styled.img``

export const ContentMain = styled.div`
    max-width: 350px;

  h1{
    font-size: 76px;
    font-weight: 900;
    line-height: 70px;
  }
  
  p{    
    margin-top: 46px;
    font-weight: 600;
    font-size: 24px;
    line-height: 34px;
  }
`

export const EnterRestrictAreaButton = styled.a`  
  right: 0;
  top: 0;
  width: 222;
  height: 56;
  background: #12D4E0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  border: none;
  border-radius: 20px;
  color: var(--color-text-white);
  text-decoration: none;
  padding: 13px 40px;
  transition: filter .2s;
  
    &:hover{      
      filter: brightness(105%);
    }

`

export const EnterAppButton = styled.a`  
  right: 0;
  bottom: 0;
  width: 80px;
  height: 80px;
  border-radius: 30px;
  background-color: #FFD666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .2s;

  svg{
    width: 32px;
    height: 32px;
    stroke: #8D734B;
    stroke-width: 3px;
  }

  :hover{
    background-color: #96FEFF;
  }
`