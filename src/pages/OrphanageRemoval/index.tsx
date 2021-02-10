import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Container, Content, Hero } from './styles';

import heroRemove from '../../assets/images/hero-remove.svg'
import { api } from '../../services/api';

interface OrphanageParams {
  id: string;
  name: string;
}

const OrphanageRemoval = () => {
  const history = useHistory()  
  const params = useParams<OrphanageParams>()

  const { id, name } = params

  const token = localStorage.getItem('@HappyAdmin:Token')    

  async function handleOrphanageRemove(){
    await api.delete(`orphanages/delete/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(() => history.push('/dashboard'))
      .catch(error => console.log(error.message))
  }

  return(
    <Container>
       <Content>
         <h1>Excluir!</h1>
          <p>Você tem certeza que quer excluir o {name}?</p>   
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