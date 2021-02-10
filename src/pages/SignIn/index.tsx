import React, { FormEvent, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'
import { useHistory, Link } from 'react-router-dom'

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

import { api } from '../../services/api';

interface AuthProps{
  username: string;
  password: string;
}

const token = localStorage.getItem('@HappyAdmin:Token')
const remember = localStorage.getItem('@HappyAdmin:RememberMe')

const SignIn = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const [rememberMe, setRememberMe] = useState(false)    
  const [errorHandling, setErrorHandling] = useState(false)   

  useEffect(() => {    
    if(token){
      remember === 'true' && setRememberMe(true)
  
      const jwt = jwt_decode(token) as AuthProps  
  
      setEmail(jwt.username)
      setPassword(jwt.password)
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
        const jwt = jwt_decode(data) as AuthProps   
           
        setEmail(jwt.username)
        setPassword(jwt.password)

        localStorage.setItem('@HappyAdmin:Token', data)

        rememberMe && localStorage.setItem('@HappyAdmin:RememberMe', JSON.stringify(rememberMe))  

        return history.push('/dashboard')
      }).catch(() => {
        setErrorHandling(true)        
        setPassword('')   
        setRememberMe(false)
        
      })
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
              error={errorHandling}
              errorMessage="Usuário ou senha inválidos"        
              onKeyUp={() => setErrorHandling(false)}    
              autoFocus                         
            />
            <Input 
              label="Password"
              name="Password"
              type="password" 
              value={password}   
              onChange={event => setPassword(event.target.value)}
              onKeyUp={() => setErrorHandling(false)}   
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