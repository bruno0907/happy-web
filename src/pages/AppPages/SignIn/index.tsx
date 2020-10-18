import React, { useState } from 'react';

import { Container } from './styles';

import Hero from '../../../components/Hero'
import Form from '../../../components/Form'
import Input from '../../../components/Input'

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  

  return (
    <Container>
      <Hero />
      <Form 
        title="Fazer Login" 
        onSubmit={() => {}}
        rememberMe
        buttonLabel="Enviar"        
      > 
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
      </Form>   
    </Container>
  );
}

export default SignIn;