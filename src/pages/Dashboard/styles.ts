import styled, { css } from 'styled-components';

interface SidebarButtonsProps{
  active?: boolean;
  hasPending?: boolean;
}

interface OrphanageCardProps{
  approved?: boolean;
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background: var(--color-bg-light);
`;

export const SideBar = styled.aside`  
  height: 100vh;
  padding: 32px 24px;
  background: var(--color-sidebar);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

    img{
      height: 56px;
    }

    button{      
      width: 48px;
      height: 48px;
      border: none;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;           
      cursor: pointer;
      transition: filter 0.2s;

        :hover{
          filter: brightness(105%);
        }
    } 
`

export const SidebarButtons = styled.div`
  display: flex;
  flex-direction: column;
  
  button + button{
    margin-top: 16px;
  }
`

export const ApprovedButton = styled.button<SidebarButtonsProps>`
  background: var(--color-button-in-gradient); 

    svg{
      stroke: var(--color-text-white);
    }

    ${props => props.active && css`
      background: var(--color-button-yellow);
      svg{
        stroke: var(--color-button-in-gradient);
      }
    `}
`

export const PendingButton = styled.button<SidebarButtonsProps>`
  position: relative;  
  background: var(--color-button-in-gradient);  

    svg{
      stroke: var(--color-text-white);
    }

    ::after{
      content: '';
      display: none;
      position: absolute;
      top: 10px;
      right: 10px;
      width: 8px;
      height: 8px;
      background: var(--color-button-yellow); 
      border: solid 2px var(--color-button-in-gradient);
      border-radius: 50%;
    }

    ${ props => props.active && css`
      background: var(--color-button-yellow);
      
      svg{
        stroke: var(--color-button-in-gradient);        
      }

      ::after{                
        border-color: var(--color-button-yellow);
        background: var(--color-button-in-gradient);
      }
    `}

    ${ props => props.hasPending && css`
      ::after{
        display: block;
      }
    `}
`

export const Logout = styled.button`
  background: var(--color-button-in-gradient);

    svg{
        stroke: var(--color-text-white);
      }
`

export const Main = styled.main`
  flex: 1;
  padding: 64px 32px;  
`

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;  
  max-width: 1120px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
    hr{
      width: 100%;
      border: solid 1px var(--color-line-in-white);
      margin: 24px 0 40px;
    }
`

export const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;  
  justify-content: space-between;
  color: var(--color-text-title);
  
      h1{
        font-size: 32px;
        font-weight: 700;                
      }

      span{
        font-size: 16px;
      }

`

export const Body = styled.div`
  width: 100%;
  display: flex;  
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
`

export const OrphanageCard  = styled.article<OrphanageCardProps>`
  width: 48%;
  min-width: 540px;
  height: 309px;
  background: var(--color-text-white);
  border: solid 1px var(--color-button-in-gradient);

  ${ props => props.approved === false && css`
   border-color: var(--color-button-delete);   
  `}

  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;    
  overflow: hidden;

    header{
      width: 100%;
      height: 100%;
      background: red;      
    }

    footer{
      width: 100%;
      height: 82px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 32px;

      h3{
        flex: 1;
        font-size: 24px;
        font-weight: 700;
        color: var(--color-text-title);
      }

      a{
        width: 48px;
        height: 48px;
        border-radius: 16px;
        background: var(--color-line-in-white);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: filter 0.2s;

          :hover{
            filter: brightness(105%);
          }
      }

      a + a{
        margin-left: 8px;
      }
    }
`

export const NoRegisterFound = styled.div` 
  width: 100%;
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 


    p{
      margin-top: 16px;
      color: var(--color-text-title);
    }
`