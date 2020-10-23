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

  // const location = useLocation()

  // console.log(location.key)

  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')  
  const [password_verify, setPasswordVerify] = useState('')    

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const data = {
      email,
      password,
      password_verify
    }

    api.post('', data)
      .then(() => history.push('app/sign-in'))
      .catch(error => console.log(error.message))
  }

  return (
    <Container>
      <Hero>
        <img src={Happy} alt="Happy" />
      </Hero>
      
      <FormAside>
        <GoBack onClick={handleSubmit}>
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