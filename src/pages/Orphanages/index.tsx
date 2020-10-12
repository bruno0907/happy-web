import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { Map, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import { 
  Container,
  SideBar,  
  SideBarContent,
  Location,  
  AddButton
} from './styles'

import MapMarker from '../../assets/images/map-marker.svg'

const Orphanages = () => {
  const [theme, setTheme] = useState('light-v10')

  return (
    <Container>
      <SideBar>
        <SideBarContent>
          <img src={MapMarker} alt="Happy Logo"/>
          <h1>Escolha <br/>um orfanato no mapa</h1>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </SideBarContent>
        <Location>
          <strong>Balneário Camboriú</strong>
          <span>Santa Catarina</span>
        </Location>
      </SideBar>
      <Map 
        center={[-26.9905831,-48.6288651]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%'
        }}        
      >        
      <TileLayer 
        url={`https://api.mapbox.com/styles/v1/mapbox/${theme}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
      />
      </Map>
      <Link to="/">
        <AddButton>
          <FiPlus />
        </AddButton>
      </Link>
    </Container>
  );
}

export default Orphanages;
