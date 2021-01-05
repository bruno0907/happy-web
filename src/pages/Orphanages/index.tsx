import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom'

import Sidebar from '../../components/Sidebar'
import Divider from '../../components/Divider'

import { 
  Container,
  Main,
  OrphanageDetails,
  ImageGallery,
  ImageGalleryButtons,
  OrphanageDetailsContent,
  MapContainer,
  InstructionTitle,
  InstructionDetails,
  OrphanageOpenDetails,
  OpeningHours,
  OpenOnWeekends,
  DontOpenOnWeekends,
  ContactButton
} from './styles'

import { happyMapIcon } from '../../utils/mapIcon'

import { api } from '../../services/api'

interface OrphanageProps {
  name: string;
  about: string;
  whatsapp: number;
  instructions: string;
  latitude: number;
  longitude: number;  
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>
}

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {  
  const params = useParams<OrphanageParams>()
  const [orphanage, setOrphanage] = useState<OrphanageProps>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  
  const googleMapsLink = 'https://www.google.com/maps/dir/?api=1&destination='

  useEffect(() => {
    api.get(`orphanages/${params.id}`)
      .then(response => setOrphanage(response.data))
      .catch(error => console.error(error.message))
  }, [params.id])

  if(!orphanage){
    return(
      <p>Carregando...</p>
    )
  }  

  return (
    <Container>            
      <Sidebar />
      <Main>
        <OrphanageDetails>
        { orphanage.images.length <= 0 ? null : 
            <>
              <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

              <ImageGallery>
                {orphanage.images.map((image, index) => (
                  <ImageGalleryButtons 
                    key={image.id}                 
                    active={activeImageIndex === index ? true : false}
                    type="button" 
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img src={image.url} alt={orphanage.name} />
                  </ImageGalleryButtons>
                ))}           
              </ImageGallery> 
            </>    
          }          
          <OrphanageDetailsContent>
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>
            <MapContainer>
              <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>
              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`${googleMapsLink}${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </MapContainer>
            <Divider />
            <InstructionTitle>Instruções para visita</InstructionTitle>
            <InstructionDetails>{orphanage.instructions}</InstructionDetails>
            <OrphanageOpenDetails>
              <OpeningHours>
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </OpeningHours>
              { orphanage.open_on_weekends 
                ? (
                    <OpenOnWeekends>
                      <FiInfo size={32} color="#39CC83" />
                      Atendemos <br />
                      fim de semana
                    </OpenOnWeekends>
                )
                : (
                    <DontOpenOnWeekends>
                      <FiInfo size={32} color="#FF669D" />
                      Não atendemos <br />
                      fim de semana
                    </DontOpenOnWeekends>
                  )
              }
            </OrphanageOpenDetails>
            <ContactButton href={`https://api.whatsapp.com/send?phone=55${orphanage.whatsapp}&text=Olá ${orphanage.name}. Quero visitar vocês!`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button"              
            >
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </ContactButton>
          </OrphanageDetailsContent>
        </OrphanageDetails>
      </Main>
    </Container>
  );
}