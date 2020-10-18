import React, { FormHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import {FiArrowLeft} from 'react-icons/fi'

import { 
  Container,
  GoBack,
  Submit,
  RememberMe
} from './styles';

interface FormProps extends FormHTMLAttributes<HTMLFormElement>{
  title: string;
  description?: string;
  rememberMe?: boolean;
  buttonLabel: string;  
}

const Form = ({title, description, rememberMe, children, buttonLabel, ...rest}: FormProps, ) => {  
  return (
    <Container>
      <GoBack onClick={() => {}}>
        <FiArrowLeft size={24} color="15C3D6" />
      </GoBack>
      <form>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        <fieldset>
          {children}
          { rememberMe && 

            <RememberMe>
              <label htmlFor="rememberMe">
                <input type="checkbox" id="rememberMe" />
                <div></div>
                <span>Lembrar-me</span>
              </label>
              <Link to="/">Esqueci minha senha</Link>
            </RememberMe> 
          }
          <Submit type="submit">{buttonLabel}</Submit>
        </fieldset>
      </form>      
    </Container>
  );
}

export default Form;