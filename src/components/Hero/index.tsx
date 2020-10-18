import React, { useEffect, useState } from 'react';

import { Container } from './styles';

import Logo from '../../assets/images/hero-logo.svg'

const Hero: React.FC = () => {
  return (
    <Container>
      <img src={Logo} alt=""/>
    </Container>
  );
}

export default Hero;