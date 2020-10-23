import React, { FormEvent, useState } from 'react';

import { useHistory } from 'react-router-dom'

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

const PasswordForgot = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()  

    api.post('/app/admin/password-recovery', {
      email
    })
      .then(response => {        
        alert(`Um email foi enviado para ${email}. Verifique sua caixa de entrada para redefinir sua senha.`)
        history.push('sign-in')
      })
      .catch(error => console.log(error.message))
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
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Esqueci a senha</legend>
            <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>
          
            <Input     
              label="E-mail"      
              name="email"
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />

            <Button label="Enviar" />

          </fieldset>

        </form>
      </FormAside>
      
    </Container>
  );
}

export default PasswordForgot;