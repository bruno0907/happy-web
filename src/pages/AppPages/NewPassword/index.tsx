import React, { useState } from 'react';

import { Container } from './styles';

import Hero from '../../../components/Hero'
import Form from '../../../components/Form'
import Input from '../../../components/Input'

const NewPassword: React.FC = () => {  
  const [password, setPassword] = useState('')  
  const [newPassword, setNewPassword] = useState('')  

  return (
    <Container>
      <Hero />
      <Form 
        title="Fazer Login" 
        description="Escolha uma nova senha para você acessar o dashboard do Happy"
        onSubmit={() => {}}        
        buttonLabel="Enviar"        
      > 
        <Input 
          label="Nova senha"
          name="Password"
          type="password" 
          value={password}   
          onChange={event => setPassword(event.target.value)}
        />
        <Input 
          label="Repita a nova senha"
          name="Password"
          type="password" 
          value={newPassword}   
          onChange={event => setNewPassword(event.target.value)}
        />
      </Form>   
    </Container>
  );
}

export default NewPassword;