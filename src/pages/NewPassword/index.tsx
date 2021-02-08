import React, { FormEvent, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Input from '../../components/Input'
import Button from '../../components/Button'

import {FiArrowLeft} from 'react-icons/fi'

import { 
  Container, 
  Hero,
  FormAside, 
  GoBack,  
} from './styles';

import Happy from '../../assets/images/logo.svg'

import { api } from '../../services/api';

const NewPassword = () => {
  const history = useHistory()    
  const location = useLocation()
  const { search } = location    
  
  const [password, setPassword] = useState('')  
  const [password_verify, setPasswordVerify] = useState('')   
  
  const token = search.slice((search.indexOf('=')) + 1)  

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const data = {      
      password,
      password_verify      
    }    
    api.patch('new-password', data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        alert('Sua senha foi alterada com sucesso. Faça seu login.')
        history.push('sign-in')
      })
      .catch(error => {        
        alert('Deu ruim, verifique o erro')
      })
  }

  return (    
    <Container>
      <Hero>
        <img src={Happy} alt="Happy" />
      </Hero>

      <FormAside>
        <GoBack onClick={() => history.goBack()}>
          <FiArrowLeft size={24} color="15C3D6" />
        </GoBack>
        <form  onSubmit={handleSubmit}>
          <fieldset>
            <legend>Redefinição de senha</legend>
            <p>Escolha uma nova senha para você acessar o dashboard do Happy</p>
          
            <Input 
              label="Nova Senha"
              name="password"
              type="password" 
              value={password}   
              onChange={event => setPassword(event.target.value)}              
            />            

            <Input 
              label="Repetir senha"
              name="password_verify"
              type="password" 
              value={password_verify}   
              onChange={event => setPasswordVerify(event.target.value)}              
            />

            <Button label="Enviar" />

          </fieldset>


        </form>
      </FormAside>
      
    </Container>
  );
}

export default NewPassword;