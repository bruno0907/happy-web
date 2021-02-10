import React, { InputHTMLAttributes, useState, useEffect, useRef } from 'react';

import { 
  Container 
} from './styles';

import eye from '../../assets/images/eye.svg'
import eyeOff from '../../assets/images/eye-off.svg'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;  
  name: string;
  type?: string;  
  error?: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({ name, type, label, error, errorMessage, autoFocus, ...rest}) => { 
  const [ inputType, setInputType ] = useState( type )
  const [ toggleVisibility, setToggleVisibility ] = useState(type === 'password')    
  
  const inputRef = useRef<HTMLInputElement>(null)

  const inputId = `id_${name}`          
  
  const handleTogglePassword = () => {
      setToggleVisibility(!toggleVisibility)
      setInputType( toggleVisibility ? 'text' : 'password' )
  }  
  
  useEffect(() => { 
    if(error) inputRef.current?.focus()
  }, [error])

  return (
    <Container hasError={error}>
      <label htmlFor={label}>{label}</label>
      <input         
        type={ inputType || 'text' }
        id={inputId}  
        name={name}              
        placeholder={name}     
        ref={inputRef}           
        {...rest}
        autoFocus={autoFocus}                
      />
      { type === 'password' &&  
        <img src={ toggleVisibility ? eye : eyeOff } alt="Show password" onClick={handleTogglePassword}/>
      }
      { error && 
        <span>{errorMessage}</span>
      }
    </Container>
  );
}

export default Input;