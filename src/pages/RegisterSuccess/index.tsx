import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, Hero } from './styles';

import successHero from '../../assets/images/success-hero.svg'

const RegisterSuccess = () => {
  return (
    <Container>
       <Content>
         <h1>Ebaaa!</h1>
         <p>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)</p>
         <Link to="/orphanages">
           <button>Voltar para o mapa</button>
         </Link>
       </Content>
       <Hero src={successHero} />
    </Container>
  );
}

export default RegisterSuccess;