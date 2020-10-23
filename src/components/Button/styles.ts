import styled from 'styled-components';

export const Container = styled.button`
  background: var(--color-green);
  width: 100%;
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
  transition: background 0.2s;

    &:hover{
      opacity: 1;
    }   
`;
