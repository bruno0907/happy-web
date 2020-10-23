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
  RememberMe
} from './styles';

import Happy from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom';

import { api } from '../../services/api';

const SignIn = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const [rememberMe, setRememberMe] = useState(false)

  const handleSignIn = (event: FormEvent) => {
    event.preventDefault()

    const data = {
      email,
      password
    }

    api.post('app/admin/authenticate', data)
      .then(response => {
        const { data } = response        
        localStorage.setItem('@HappyAdmin:Token', JSON.stringify(data.token))
        localStorage.setItem('@HappyAdmin:User', JSON.stringify(data.user))
        localStorage.setItem('@Happy:RememberMe', JSON.stringify(rememberMe))
        history.push('/app/dashboard')
        console.log({data, rememberMe})
      }).catch(error => console.log(error.message))
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
        <form  onSubmit={handleSignIn}>
          <fieldset>
            <legend>Fazer login</legend>
          
            <Input     
              label="E-mail"      
              name="email"
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <Input 
              label="Password"
              name="Password"
              type="password" 
              value={password}   
              onChange={event => setPassword(event.target.value)}
            />

            <RememberMe>
              <label htmlFor="rememberMe">
                <input 
                  type="checkbox" 
                  id="rememberMe" 
                  checked={rememberMe}
                  onChange={event => setRememberMe(event.target.checked)}
                />
                <div></div>
                <span>Lembrar-me</span>
              </label>
              <Link to="/app/password-forgot">Esqueci minha senha</Link>
            </RememberMe> 

            <Button label="Enviar" />

          </fieldset>

        </form>
      </FormAside>
    </Container>
  );
}

export default SignIn;