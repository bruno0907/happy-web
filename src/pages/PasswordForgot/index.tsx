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

  const evalEmail = !Boolean(email.length > 0)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()  

    api.post('password-recovery', {
      email
    })
      .then(() => {     
        
        alert(`Um email foi enviado para ${email}. Verifique sua caixa de entrada para redefinir sua senha.`)
        localStorage.removeItem('@HappyAdmin:Token')
        localStorage.removeItem('@HappyAdmin:Email')
        localStorage.removeItem('@HappyAdmin:Password')
        localStorage.removeItem('@HappyAdmin:RememberMe')
        history.push('sign-in')
      })
      .catch(() => {
        alert('E-mail não encontrado')
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
            <Button label="Enviar" disabled={evalEmail}/>
          </fieldset>

        </form>
      </FormAside>
      
    </Container>
  );
}

export default PasswordForgot;