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

  const token = localStorage.getItem('@HappyAdmin:Token')  

  useEffect(() => {
    if(!token){
      localStorage.clear()      
      return
    }    

    const remember = localStorage.getItem('@HappyAdmin:RememberMe')
    
    if(remember === 'true'){      
      const email = localStorage.getItem('@HappyAdmin:Email')
      const password = localStorage.getItem('@HappyAdmin:Password')      
      
      if(email && password){
        setEmail(email)
        setPassword(password)                

        api.get('app/authenticate', {
          auth: {
            username: email,
            password
          }      
        }).then(response => {
            const { data } = response                    
            localStorage.setItem('@HappyAdmin:Token', data.token)
            localStorage.setItem('@HappyAdmin:Email', email)
            localStorage.setItem('@HappyAdmin:Password', password)
            
            if(data.admin && data.admin.isAdmin === true){              
              history.push('/app/dashboard')
            }            
            history.push(`dashboard/orphanage/edit/${data.orphanage.id}`)

          }).catch(() => alert('Usuário ou senha inválidos!'))
        }
      }
  }, [token, history, rememberMe])

  const handleSignIn = (event: FormEvent) => {
    event.preventDefault()

    api.get('app/authenticate', {
        auth: {
          username: email,
          password
        }      
    }).then(response => {
        const { data } = response  
        console.log(data)                  
        localStorage.setItem('@HappyAdmin:Token', data.token)
        localStorage.setItem('@HappyAdmin:RememberMe', JSON.stringify(rememberMe))
        
        if(rememberMe === true){
          localStorage.setItem('@HappyAdmin:Email', email)
          localStorage.setItem('@HappyAdmin:Password', password)
        }

        if(data.admin && data.admin.isAdmin === true){
          history.push('/app/dashboard')
          return 
        }   

        history.push(`dashboard/orphanage/edit/${data.orphanage.id}`)  
        return  

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
                  onChange={event => setRememberMe(event.target.checked)}
                />
                <div></div>
                <span>Lembrar-me</span>
              </label>
              <Link to="/app/password-forgot">Esqueci minha senha</Link>
            </RememberMe> 

            <Button label="Entrar" />

          </fieldset>

        </form>
      </FormAside>
    </Container>
  );
}

export default SignIn;