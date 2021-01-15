import React, { useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Map, TileLayer, Marker } from 'react-leaflet'
import Divider from '../../components/Divider';
import { happyMapIcon } from '../../utils/mapIcon'
import happyIconNoRegister from '../../assets/images/happyIcon-noregister.svg'

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
  OrphanageCard,
  NoRegisterFound 
} from './styles';

import { 
  FiMapPin, 
  FiAlertCircle, 
  FiPower, 
  FiEdit3, 
  FiTrash,
  FiArrowRight
} from 'react-icons/fi'

import mapMarker from '../../assets/images/map-marker.svg'
import { api } from '../../services/api';
import Loading from '../../components/Loading';

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
  const history = useHistory() 
  
  const [allOrphanages, setAllOrphanages] = useState<OrphanageProps[]>([])
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([])
  const [approvedActive, setApprovedActive] = useState(false)
  const [pendingActive, setPendingActive] = useState(false)
  const [pageTitle, setPageTitle] = useState('Orfanatos Cadastrados')
  const [loading, setLoading] = useState(true)
  
  const token = localStorage.getItem('@HappyAdmin:Token')
  
  useEffect(() => {       
    if(!token) return history.push('/sign-in')

    if(token){
      api.get('me', {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then(response => {
        response.status === 200 && getOrphanages()
      })
        .catch(error => {
          console.error(error)
          return history.push('/sign-in')
        })
    }

    const getOrphanages = async() => {      
      const response = await api.get('orphanages')
      const { data } = response
      setAllOrphanages(data)
      return setLoading(false)
    }    

  }, [history, token])     
    
  useMemo(() => {
    setOrphanages(allOrphanages)

    if(approvedActive === true){
      const approvedOrphanages = allOrphanages.filter(orphanage => orphanage.approved === true)              
      return setOrphanages(approvedOrphanages)
    }   

    if(pendingActive === true){
      const approvalPendingOrphanages = allOrphanages.filter(orphanage => orphanage.approved === false)         
      return setOrphanages(approvalPendingOrphanages)  
    }

  }, [allOrphanages, approvedActive, pendingActive])
  
  const orphanagesCount = allOrphanages.length

  const pendingApprovalOrphanages = allOrphanages.filter(orphanage => orphanage.approved === false)
  const hasPendingApproval = Boolean(pendingApprovalOrphanages.length > 0)


  const handleApprovedFilter = () => {
    if(approvedActive === false){
      setApprovedActive(true)
      setPageTitle('Cadastros Aprovados')      
    } else {
      setApprovedActive(false) 
      setPageTitle('Orfanatos Cadastros')
    }

    if(pendingActive === true){
      setPendingActive(false)   
    }     
    return
  }
  
  const handlePendingFilter = () => {
    if(pendingActive === false){
      setPendingActive(true)
      setPageTitle('Cadastros Pendentes')      
    } else {
      setPendingActive(false)
      setPageTitle('Orfanatos Cadastros')
    }

    if(approvedActive === true){
      setApprovedActive(false)    
    }
    return
  } 

  const handleSignout = () => {        
    localStorage.removeItem('@HappyAdmin:Token')
    return history.push('sign-in')
  }

  return(
    <Container>
      { loading === true ? 
        <Loading text="Carregando..."/>
      : 
      <>
        <SideBar>
          <img src={mapMarker} alt="Happy"/>
          <SidebarButtons>
            <ApprovedButton 
              active={approvedActive} 
              onClick={handleApprovedFilter}
            >
              <FiMapPin size={24} />
            </ApprovedButton>
            <PendingButton 
              hasPending={hasPendingApproval} 
              active={pendingActive}
              onClick={handlePendingFilter}
            >
              <FiAlertCircle size={24} />
            </PendingButton>
          </SidebarButtons>
          <Logout onClick={handleSignout}>
            <FiPower size={24} />
          </Logout>
        </SideBar>
        <Main>
          <Wrapper>
            <Header>
              <h1>{pageTitle}</h1>
              <span>{orphanagesCount} orfanatos</span>
            </Header>
            
            <Divider />

            <Body>
              { orphanages.length < 1 ? (
                <NoRegisterFound>
                  <img src={happyIconNoRegister} alt="Nenhum registro encontrado"/>
                  <p>Nenhum registro encontrado</p>
                </NoRegisterFound>
              ) :            
              orphanages.map((orphanage: OrphanageProps) => 
                <OrphanageCard key={orphanage.id} approved={orphanage.approved}>
                  <header>
                    <Map 
                      center={[orphanage.latitude, orphanage.longitude]}
                      zoom={15}
                      style={{width: '100%', height: '100%'}}
                      dragging={false}
                      zoomControl={false}
                      scrollWheelZoom={false}
                    >                    
                      <TileLayer 
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                      />                
                      <Marker
                        position={[orphanage.latitude, orphanage.longitude]}
                        icon={happyMapIcon}
                        interactive={false}
                      />
                    </Map>
                  </header>
                  <footer>
                    <h3>{orphanage.name}</h3>
                    {orphanage.approved === true ? (
                      <>
                        <Link to={`dashboard/orphanage/edit/${orphanage.id}`}>
                          <FiEdit3 size={24} color="#15C3D6" />
                        </Link>
                        <Link to={`dashboard/orphanage/remove/${orphanage.name}/${orphanage.id}`}>
                          <FiTrash size={24} color="#15C3D6" />
                        </Link>
                      </>
                    ) : (
                      <Link to={`dashboard/orphanage/revision/${orphanage.id}`}>
                      <FiArrowRight size={24} color="#15C3D6" />
                    </Link>
                    )
                    }
                  </footer>
                </OrphanageCard>    
              )}
            </Body>
          </Wrapper>

        </Main>
      </>
    }      
    </Container>
  );
}

export default Dashboard;