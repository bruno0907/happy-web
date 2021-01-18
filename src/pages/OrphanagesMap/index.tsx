import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import './map-popup--styles.css'

import { 
  Container,
  SideBar,  
  SideBarContent,
  Location,  
  AddButton,
} from './styles'

import mapMarker from '../../assets/images/map-marker.svg'

import { happyMapIcon } from '../../utils/mapIcon'

import { api } from '../../services/api'
import Loading from '../../components/Loading';

interface OrphanageProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  approved: boolean;
}

const OrphanagesMap = () => {   
  const history = useHistory()

  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([])
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0
  })

  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const getOrphanages = async() => {
      const orphanages = await api.get('orphanages')
      
      if(!orphanages) return history.push('/404-page-not-found')

      const { data } = orphanages

      const orphanagesToShow = data.filter((orphanage: OrphanageProps) => orphanage.approved === true)
      setOrphanages(orphanagesToShow)
      setLoading(false)
      return
    }
    getOrphanages()
  
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        return setLocation({latitude, longitude})
      })
    }
    getUserLocation()
    
  }, [history]);

  return (
    <Container>
      { loading === true ?
          <Loading text="Carregando..." />
        :
        <>
          <SideBar>
            <SideBarContent>
              <Link to="/">
                <img src={mapMarker} alt="Happy Logo"/>
              </Link>
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
              url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
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
        </>
      }
    </Container>
  );
}

export default OrphanagesMap
