import React, { useState } from 'react';

import { Container } from './styles';

import Hero from '../../../components/Hero'
import Form from '../../../components/Form'
import Input from '../../../components/Input'

const PasswordForgot: React.FC = () => {
  const [email, setEmail] = useState('')  

  return (
    <Container>
      <Hero />
      <Form 
        title="Fazer Login" 
        description="Sua redefinição de senha será enviada para o e-mail cadastrado."
        onSubmit={() => {}}        
        buttonLabel="Enviar"        
      > 
        <Input     
          label="E-mail"      
          name="email"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

      </Form>   
    </Container>
  );
}

export default PasswordForgot;