import React, { FormEvent, useEffect, useState } from 'react';

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

  useEffect(() => {
    const remember = localStorage.getItem('@HappyAdmin:RememberMe')
    
    if(remember === 'true'){      
      const email = localStorage.getItem('@HappyAdmin:Email')
      setEmail(email!)
      setRememberMe(true)
    }
  }, [rememberMe])

  const handleRememberMe = () => {    
    if(rememberMe === true){
      localStorage.removeItem('@HappyAdmin:RememberMe')
      setRememberMe(false)      
    }     
    setRememberMe(!rememberMe)
    return
  }

  const handleSignIn = (event: FormEvent) => {
    event.preventDefault()

    api.get('sign-in', {
        auth: {
          username: email,
          password
        }      
    }).then(response => {
        const { data } = response  

        localStorage.setItem('@HappyAdmin:Token', data.token)
        localStorage.setItem('@HappyAdmin:RememberMe', JSON.stringify(rememberMe))
        localStorage.setItem('@HappyAdmin:isAdmin', data.admin.isAdmin)
        
        rememberMe === true && localStorage.setItem('@HappyAdmin:Email', email)       

        return history.push('/dashboard')
      }).catch(() => alert('Usuário ou senha inválidos!'))
  }

  return (
    <Container>
      <Hero>
        <img src={Happy} alt="Happy" />
      </Hero>
      <FormAside>
        <GoBack onClick={() => history.push('/')}>
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
                  onChange={handleRememberMe}                  
                />
                <div></div>
                <span>Lembrar-me</span>
              </label>
              <Link to="password-forgot">Esqueci minha senha</Link>
            </RememberMe> 

            <Button label="Entrar" />

          </fieldset>

        </form>
      </FormAside>
    </Container>
  );
}

export default SignIn;