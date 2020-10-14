import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;  
  display: flex;
  position: relative;
`

export const SideBar = styled.aside`
  width: 440px;
  height: 100vh;
  background: var(--color-bg-gradient);   
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 120px 0;  
`

export const SideBarContent = styled.article`
  width: 235px;
  
  img{
    margin-bottom: 60px;
  }

  h1{
    font-size: 40px;
    font-weight: 800;
    line-height: 42px;
    margin-bottom: 30px;
  }
  p{
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
  }
`

export const Location = styled.footer`
  width: 235px;

  strong{
    display: block;
    font-weight: 800;
    line-height: 28px;
  }
  span{
    font-weight: 600;
    line-height: 28px;
  }
`

export const Map = styled.main`
  width: 100%;
  height: 100%;  
`

export const AddButton = styled.div`
  position: absolute;  
  right: 50px;
  bottom: 50px;
  width: 80px;
  height: 80px;
  border-radius: 30px;
  background-color: var(--color-button-in-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .2s;
  z-index: 999;

  svg{
    width: 32px;
    height: 32px;
    stroke: var(--color-text-white);
    stroke-width: 3px;
  }

  :hover{
    filter: brightness(110%);
  }
`