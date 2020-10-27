import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

import { Container } from './styles'

import mapMarkerImg from '../../assets/images/map-marker.svg';

const Sidebar = () => {
  const { goBack } = useHistory();
  
  return (
    <Container>
        <Link to="/">
          <img src={mapMarkerImg} alt="Happy" />        
        </Link>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>        
    </Container>
  );
}

export default Sidebar;
