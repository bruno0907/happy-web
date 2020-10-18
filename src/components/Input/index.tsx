import React, { InputHTMLAttributes, useState } from 'react';

import { 
  Container 
} from './styles';

import eye from '../../assets/images/eye.svg'
import eyeOff from '../../assets/images/eye-off.svg'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;  
  name: string;
  type?: string;  
}

const Input: React.FC<InputProps> = ({ name, type, label, ...rest}) => { 
  const [ inputType, setInputType ] = useState( type )
  const [ toggleVisibility, setToggleVisibility ] = useState(type === 'password')
    
  const inputId = `id_${name}`          
  
  const handleTogglePassword = () => {
      setToggleVisibility(!toggleVisibility)
      setInputType( toggleVisibility ? 'text' : 'password' )
  }        

  return (
    <Container>
      <label htmlFor={label}>{label}</label>
      <input         
        type={ inputType || 'text' }
        id={inputId}  
        name={name}              
        placeholder={name}                
        {...rest}           
      />
      { type === 'password' &&  
        <img src={ toggleVisibility ? eye : eyeOff } alt="Show password" onClick={handleTogglePassword}/>
      }
    </Container>
  );
}

export default Input;