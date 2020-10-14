import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

import { Container } from './styles'

import mapMarkerImg from '../../assets/images/map-marker.svg';

const Sidebar = () => {
  const { goBack } = useHistory();
  
  return (
    <Container>
        <img src={mapMarkerImg} alt="Happy" />        
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>        
    </Container>
  );
}

export default Sidebar;
