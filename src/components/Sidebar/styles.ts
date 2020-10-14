import styled from "styled-components";

export const Container = styled.aside`
  position: fixed;
  height: 100%;
  max-height: 820px;
  padding: 32px 24px;  
  background: var(--color-bg-gradient);  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  img{
    width: 48px;
  }

  button{
    width: 48px;
    height: 48px;
    
    border: 0;
    
    background: var(--color-button-in-gradient);
    border-radius: 16px;
    
    cursor: pointer;
    
    transition: filter 0.2s;
    
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover{
      filter: brightness(120%)      
    }
  }
`
