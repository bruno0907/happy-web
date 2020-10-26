import React, { TextareaHTMLAttributes } from 'react';

import { 
  Container 
} from './styles';


interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;  
  name: string;  
  description?: string;
}

const Textarea: React.FC<InputProps> = ({ name, label, description, ...rest}) => {     
  const inputId = `id_${name}`    

  return (
    <Container>
      <label htmlFor={label}>
        {label}
        <span>{description}</span>
      </label>
      <textarea                 
        id={inputId}  
        name={name}              
        placeholder={name}                
        {...rest}           
      />
    </Container>
  );
}

export default Textarea;