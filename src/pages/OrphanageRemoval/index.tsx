import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Content, Hero } from './styles';

import heroRemove from '../../assets/images/hero-remove.svg'
import { api } from '../../services/api';

const OrphanageRemoval = (route: {
  match: {
    params: {
      id: number;
      name: string;
    }
  }
}) => {
  const history = useHistory()  
  
  const { id } = route.match.params
  const { name } = route.match.params

  const storagedToken = localStorage.getItem('@HappyAdmin:Token')  

  const token = storagedToken?.split('').filter(c => c !== '"').join('')

  console.log('Token: ', token)

  async function handleOrphanageRemove(){
    await api.delete(`/app/orphanages/delete/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(() => history.push('/app/dashboard'))
      .catch(error => console.log(error.message))
  }

  return(
    <Container>
       <Content>
         <h1>Excluir!</h1>
          <p>Você tem certeza que quer excuir o {name}?</p>   
          <div>
            <button onClick={handleOrphanageRemove}>Excluir!</button>           
            <button onClick={() => history.goBack()}>Cancelar</button>          
          </div>      
         
       </Content>
       <Hero src={heroRemove} />
    </Container>
  );
}

export default OrphanageRemoval;