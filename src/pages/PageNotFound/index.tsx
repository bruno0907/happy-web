import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, Hero } from './styles';

import hero404 from '../../assets/images/hero404.svg'


const PageNotFound = () => {
  return(
    <Container>
       <Content>
         <h1>404!</h1>
         <p>A página que você procura não foi encontrada.</p>
         <Link to="/">
           <button>Voltar para o início</button>
         </Link>
       </Content>
       <Hero src={hero404} />
    </Container>
  );
}

export default PageNotFound;