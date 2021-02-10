import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.main`
  flex: 1;
`

export const Title = styled.p`
  margin: 40px auto;
  text-align: center;
  color: var(--color-text-complement);
`

export const CreateOrphanageForm = styled.form`
  width: 700px;
  margin: 64px auto;
  background: var(--color-text-white);
  border: 1px solid #D3E2E5;
  border-radius: 20px;
  padding: 64px 80px;
  overflow: hidden;   

    fieldset + fieldset {
      margin-top: 80px;
    }

    .leaflet-container {
      margin-bottom: 40px;
      border: 1px solid #D3E2E5;
      border-radius: 20px;
    }
`

export const FormSection = styled.fieldset`
  border: 0;

    legend{
      width: 100%;
      font-size: 32px;
      line-height: 34px;
      color: #5C8599;
      font-weight: 700;
      border-bottom: 1px solid #D3E2E5;
      margin-bottom: 40px;
      padding-bottom: 24px;
    }
`

export const ImageSection = styled.div`
  label{
    display: flex;
    color: #8FA7B3;
    margin-bottom: 8px;
    line-height: 24px;
  }
`

// export const ImagesContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   gap: 16px;

//     img{
//       width: 100%;
//       height: 96px;
//       border-radius: 20px;
//       object-fit: cover;  
//     }

//     span{
//       position: absolute;
//       top: 0;
//       right: 0;
//       border: 1px solid #D3E2E5;
//       border-radius: 0px 20px 0px 20px;
//       width: 40px;
//       height: 40px;
//       background: var(--color-text-white);  
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       cursor: pointer;  
//     }    

//     input[type=file] {
//       display: none;
//     }
// `

export const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

    picture{
      position: relative;
      width: 100%;
      height: 96px;
      border-radius: 20px;
      overflow: hidden;
      border: solid 1px var(--color-line-in-white);

      img{
        width: 100%;
        height: 100%;        
      }
  
      span{
        position: absolute;
        top: -1px;
        right: -1px;        
        border: solid 1px var(--color-line-in-white);
        border-radius: 0px 20px 0px 20px;
        width: 40px;
        height: 40px;
        background: var(--color-text-white);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;          
        z-index: 1;
      }    
    }


    input[type=file] {
      display: none;
    }
`

export const AddImage = styled.label`
  width: 96px;
  height: 96px;
  background: #F5F8FA;
  border: 1px dashed #96D2F0;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;    
`

export const OpenOnWeekendsSection = styled.div`
  margin-bottom: 64px;

  label{
    display: flex;
    color: #8FA7B3;
    margin-bottom: 8px;
    line-height: 24px;
  }
`

export const OpenOnWeekendsOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

    button{
      height: 64px;
      background: #F5F8FA;
      border: 1px solid #D3E2E5;
      color: #5C8599;
      cursor: pointer;
      
      :first-child {
        border-radius: 20px 0px 0px 20px;
        border-right: 0;
      }
  
      :last-child {
        border-radius: 0 20px 20px 0;
        border-left: 0;
      }

      &.active {
        background: #EDFFF6;
        border: 1px solid #A1E9C5;
        color: #37C77F;  
      }
    }
  
`

