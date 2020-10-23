import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import './map-popup--styles.css'

import { 
  Container,
  SideBar,  
  SideBarContent,
  Location,  
  AddButton
} from './styles'

import mapMarker from '../../assets/images/map-marker.svg'

import { happyMapIcon } from '../../utils/mapIcon'

import { api } from '../../services/api'

interface OrphanageProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  approved: boolean;
}

const OrphanagesMap = () => {
  const [theme, setTheme] = useState('light-v10')  
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([])
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0
  })

  
  useEffect(() => {
    
    api.get('/orphanages')
    .then(response => {
      const { data } = response
      const orphanagesToShow = data.filter((orphanage: OrphanageProps) => orphanage.approved === true)
      setOrphanages(orphanagesToShow)
    })
    .catch(error => console.error(error.message))  
  
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setLocation({latitude, longitude})
    })
    
  }, []);

  return (
    <Container>
      <SideBar>
        <SideBarContent>
          <img src={mapMarker} alt="Happy Logo"/>
          <h1>Escolha <br/>um orfanato no mapa</h1>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </SideBarContent>
        <Location>
          <strong>Balneário Camboriú</strong>
          <span>Santa Catarina</span>
        </Location>
      </SideBar>      
      <Map 
        center={[location.latitude,location.longitude]}
        zoom={15}
        style={{width: '100%', height: '100%'}}
      >  
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/${theme}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />

        { orphanages.map(orphanage => (
          <Marker
            key={orphanage.id} 
            position={[orphanage.latitude, orphanage.longitude]}
            icon={happyMapIcon}
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`} >
                <FiArrowRight size={32} color="#FFFFFF"/>
              </Link>
            </Popup>
          </Marker>
        ))}

      </Map>      
      <AddButton as={Link} to="/orphanages/create">
        <FiPlus />
      </AddButton>      
    </Container>
  );
}

export default OrphanagesMap
