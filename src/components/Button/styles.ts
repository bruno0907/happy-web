import styled, { css } from 'styled-components';

interface ButtonProps{
  disabled?: boolean;
}

export const Container = styled.button<ButtonProps>`
  background: var(--color-button-confirm);
  width: 100%;
  height: 64px;  
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: none;
  color: var(--color-text-white);
  font-weight: 700;
  cursor: pointer;  
  transition: background 0.2s;
  
  &:hover{      
    background: var(--color-button-confirm-hover);
  }
  
  ${props => props.disabled && css`
    pointer-events: none;        
    background: grey;
    opacity: 0.4;
  `}
`;
