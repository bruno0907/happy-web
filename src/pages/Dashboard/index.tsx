import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Map, TileLayer, Marker } from 'react-leaflet'
import './map-popup--styles.css'

import { happyMapIcon } from '../../utils/mapIcon'

import { 
  Container, 
  SideBar, 
  SidebarButtons, 
  ApprovedButton,
  PendingButton, 
  Logout,
  Main,
  Wrapper,
  Header,
  Body,
  OrphanageCard 
} from './styles';

import { 
  FiMapPin, 
  FiAlertCircle, 
  FiPower, 
  FiEdit3, 
  FiTrash 
} from 'react-icons/fi'

import mapMarker from '../../assets/images/map-marker.svg'

interface OrphanageProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  approved: boolean;
}

interface SidebarButtons extends HTMLInputElement{
  active?:boolean;
  hasPending?:boolean;
}

const Dashboard = () => {  
  const [hasPending, setHasPending] = useState(false)
  const [approvedButtonActive, setApprovedButtonActive] = useState(false)
  const [pendingButtonActive, setPendingButtonActive] = useState(false)

  const [theme, setTheme] = useState('light-v10')  
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([])
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0
  })
  
  useEffect(() => {
    const pendingApproval = Boolean([1, 2, 3].length > 0)
    setHasPending(pendingApproval)

    setLocation({
      latitude: -26.9905831,
      longitude: -48.6288651
    })
    
  }, [])

  const handleApprovedFilter = () => {
    setApprovedButtonActive(!approvedButtonActive)    
  }
  const handlePendingFilter = () => {
    setPendingButtonActive(!pendingButtonActive)    
  }

  return(
    <Container>
      <SideBar>
        <img src={mapMarker} alt="Happy"/>
        <SidebarButtons>
          <ApprovedButton 
            active={approvedButtonActive} 
            onClick={handleApprovedFilter}
          >
            <FiMapPin size={24} />
          </ApprovedButton>
          <PendingButton 
            hasPending={hasPending} 
            active={pendingButtonActive}
            onClick={handlePendingFilter}
          >
            <FiAlertCircle size={24} />
          </PendingButton>
        </SidebarButtons>
        <Logout>
          <FiPower size={24} />
        </Logout>
      </SideBar>
      <Main>
        <Wrapper>
          <Header>
            <h1>Orfanatos Cadastrados</h1>
            <span>2 orfanatos</span>
          </Header>
          
          <hr/>

          <Body>

          <OrphanageCard>
              <header>              

                <Map 
                  center={[location.latitude,location.longitude]}
                  zoom={15}
                  style={{width: '100%', height: '100%'}}
                  dragging={false}
                  zoomControl={false}
                >  
                  <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/${theme}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                  />                
                  <Marker
                    key="1" 
                    position={[-26.9905831,-48.6288651]}
                    icon={happyMapIcon}
                  />
                </Map>

              </header>

              <footer>

                <h3>Orf. Esperança</h3>

                <Link to="">
                  <FiEdit3 size={24} color="#15C3D6" />
                </Link>

                <Link to="">
                  <FiTrash size={24} color="#15C3D6" />
                </Link>

              </footer>

            </OrphanageCard>                  
            
          </Body>
        </Wrapper>

      </Main>
    </Container>
  );
}

export default Dashboard;