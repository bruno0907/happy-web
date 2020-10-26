import React from 'react';

import { Container } from './styles';

interface ButtonProps{
  label: string;  
  disabled?: boolean;
}

const Button = ({ label, disabled, ...rest }: ButtonProps) => {
  return(
    <Container {...rest} disabled={disabled}>{label}</Container>
  )
}

export default Button;