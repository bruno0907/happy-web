import React from 'react';
import { Link } from 'react-router-dom'

import {FiArrowRight} from 'react-icons/fi'

import { 
  Container,
  ContentWrapper,
  LeftSide,
  RightSide,
  Logo,
  ContentMain,
  Location,
  EnterAppButton
} from './styles'

import HappyLogo from '../../assets/images/logo.png'

const Landing = () => {
  return (    
    <Container>
      <ContentWrapper>        
        <LeftSide>
          <Logo src={HappyLogo}/>
          <ContentMain>
            <h1>Leve felicidade para o mundo</h1>
            <p>Visite orfanatos e mude o dia de muitas crianças.</p>
          </ContentMain>
        </LeftSide>
        <RightSide>
          <Location>
            <strong>Balneário Camboriú</strong>
            <span>Santa Catarina</span>
          </Location>
          <Link to="/orphanages">
            <EnterAppButton>
              <FiArrowRight />
            </EnterAppButton>
          </Link>
        </RightSide>
      </ContentWrapper>
    </Container>
  );
}

export default Landing;