import React, { useState, FormEvent, ChangeEvent, useEffect, MouseEvent } from "react";
import { useHistory } from 'react-router-dom'
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'

import { FiPlus, FiX } from "react-icons/fi";

import Sidebar from "../../components/Sidebar";
import Textarea from "../../components/Textarea";
import Input from "../../components/Input";
import Button from "../../components/Button";

import {
  Container,
  Content,
  Title,
  CreateOrphanageForm,
  FormSection,
  ImageSection,
  ImagesContainer,
  AddImage,
  OpenOnWeekendsSection,
  OpenOnWeekendsOptions,
} from './styles'

import { happyMapIcon } from '../../utils/mapIcon'
import { api } from "../../services/api";

const CreateOrphanage = () => {
  const history = useHistory()
  
  const [location, setLocation] = useState({ latitude: 0, longitude: 0})
  const [position, setPosition] = useState({ latitude: 0, longitude: 0})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [about, setAbout] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  
  const [selectedImages, setSelectedImages] = useState([])    

  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)


  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        return setLocation({latitude, longitude})
      })
    }
    getUserLocation()          

  }, [])

  function handleMapClick(event: LeafletMouseEvent){
    const { lat, lng } = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }


  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {    
    if(!event.target.files) return
    const newImage = event.target.files
    
    // Array to populate the DB
    const selectedImage = Array.from(newImage)        
    
    setSelectedImages([...selectedImages, selectedImage] as [])    
    return 
  }

  const handleRemoveImage = (imageToRemove: File) => {
    const remainingImages = selectedImages.filter((imageOnArray: File) => imageOnArray !== imageToRemove)        
    setSelectedImages(remainingImages)    
    return 
  }

  const onInputClick = (event: MouseEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement
    element.value = ''
  }

  const handleSubmit = async(event: FormEvent) => {
    event.preventDefault()

    const { latitude, longitude } = position
    const data = new FormData()

    data.append('name', name)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('about', about)
    data.append('email', email)
    data.append('whatsapp', whatsapp)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))
    
    const images = selectedImages.map(image => image[0])    
    images.forEach(image => data.append('images', image))  

    const response = await api.post('orphanages', data)

    if(!response) return alert('Houve um erro com seu cadastro')

    return history.push('/orphanages/create/success')
    
  }

  return (
    <Container>
      <Sidebar />  
      <Content>
        <Title>Adicione um novo orfanato</Title>
        <CreateOrphanageForm onSubmit={handleSubmit}>
          <FormSection>
            <legend>Dados</legend>          
            <Map 
              center={[location.latitude,location.longitude]}               
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              { position.latitude !== 0 && 
                <Marker 
                  interactive={false} 
                  icon={happyMapIcon} 
                  position={[position.latitude, position.longitude]} 
                />              
              }
            </Map>
            <Input 
              label="Nome do Orfanato"
              name="name"
              value={name}
              onChange={event => setName(event.target.value)}
            />            
            <Textarea 
              label="Sobre"
              description="Máximo de 300 caracteres"
              name="about"
              value={about}
              onChange={event => setAbout(event.target.value)}
            />
            <Input 
              label="E-mail de contato"
              type="email"
              name="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <Input 
              label="Número do whatsapp"
              type="number"
              name="whatsapp"
              value={whatsapp}
              onChange={event => setWhatsapp(event.target.value)}
            />

            <ImageSection>
              <label htmlFor="images">Fotos</label>
              <ImagesContainer>
                
                {selectedImages.map((image: File | any) => 
                  <picture key={Math.random()}>
                    <img src={URL.createObjectURL(image[0])} alt={image.name} /> 
                    <span onClick={() => handleRemoveImage(image)}>
                      <FiX size={23} color=" #D6487B" />
                    </span>
                  </picture>
                )}

                <AddImage htmlFor="image">
                  <FiPlus size={24} color="#15b6d6" />
                </AddImage>
              <input                  
                type="file" 
                id="image"
                onChange={handleSelectImages}                
                onClick={onInputClick}
              />
              </ImagesContainer>
            </ImageSection>

          </FormSection>
          <FormSection>
            <legend>Visitação</legend>
            <Textarea 
              label="Instruções"
              name="instructions"
              value={instructions}
              onChange={event => setInstructions(event.target.value)}
            />
            <Input 
              label="Horário de vistas"
              name="opening_hours"
              value={opening_hours}
              onChange={event => setOpeningHours(event.target.value)}
            />
            <OpenOnWeekendsSection>
              <label htmlFor="open_on_weekends">Atende fim de semana</label>
              <OpenOnWeekendsOptions>
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(prevState => !prevState)}
                >Sim</button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(prevState => !prevState)}
                >Não</button>
              </OpenOnWeekendsOptions>
            </OpenOnWeekendsSection>
          </FormSection>
          <Button 
            label="Confirmar" 
            disabled={
              (position.latitude < 0 && selectedImages.length > 0)
              ? false
              : true              
            }/>
        </CreateOrphanageForm>
      </Content>
    </Container>
  );
}

export default CreateOrphanage

