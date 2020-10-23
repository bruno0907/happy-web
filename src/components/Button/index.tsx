import React from 'react';

import { Container } from './styles';

interface ButtonProps{
  label: string;  
}

const Button = ({ label, ...rest }: ButtonProps) => {
  return(
    <Container {...rest}>{label}</Container>
  )
}

export default Button;