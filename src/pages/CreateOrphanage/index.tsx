import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'

import { FiPlus } from "react-icons/fi";

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
  // Geolocation location state
  const [location, setLocation] = useState({ latitude: 0, longitude: 0})
  
  // Form States
  const [position, setPosition] = useState({ latitude: 0, longitude: 0})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_verify, setPasswordVerify] = useState('')
  const [about, setAbout] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  
  // const [images, setImages] = useState<File[]>([])
  // const [imagesPreview, setImagesPreview] = useState<string[]>([])

  const [selectedImages, setSelectedImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setLocation({latitude, longitude})
    })

  }, [])

  function handleMapClick(event: LeafletMouseEvent){
    const { lat, lng } = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  // const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
  //   if(!event.target.files){
  //     return
  //   }

  //   const selectedImages = Array.from(event.target.files)
  //   setImages(selectedImages)

  //   const selectedImagesPreview = selectedImages.map(
  //     image => URL.createObjectURL(image)
  //   )
  //   setImagesPreview([...images, selectedImagesPreview] as [])
  // }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){    
    if(!event.target.files){
      return
    }
    const selectedImage = Array.from(event.target.files)    
    setSelectedImages([...selectedImages, selectedImage] as []) // images state to populate database
    
    const selectedImagesPreview = selectedImage.map(
      (image: File) => URL.createObjectURL(image)
    )
    setImagesPreview([...imagesPreview, selectedImagesPreview] as []) // images state to populate the preview    
    
  }

  function handleSubmit(event: FormEvent){
    event.preventDefault()

    const { latitude, longitude } = position
    const data = new FormData()

    data.append('name', name)
    data.append('email', email)
    data.append('password', password)
    data.append('password_verify', password_verify)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('about', about)
    data.append('whatsapp', whatsapp)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))
    
    const images = selectedImages.map(image => image[0])    
    images.forEach(image => data.append('images', image))  
    
    api.post('orphanages', data)
      .then(() => {        
        history.push('/orphanages/create/success')
      })
      .catch(() => {
        alert('Houve um erro com seu cadastro')        
      })    
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
            <Input 
              label="E-mail"
              name="email"
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <Input 
              label="Senha"
              name="password"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <Input 
              label="Repita sua senha"
              name="password_verify"
              type="password"
              value={password_verify}
              onChange={event => setPasswordVerify(event.target.value)}
            />
            <Textarea 
              label="Sobre"
              description="Máximo de 300 caracteres"
              name="about"
              value={about}
              onChange={event => setAbout(event.target.value)}
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
                {imagesPreview.map(image => 
                  <img key={image} src={image} alt={image} /> 
                )}
                <AddImage htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </AddImage>
              <input                  
                type="file" 
                id="image[]"
                onChange={handleSelectImages}
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
          <Button label="Confirmar" disabled={password_verify.length > 0 ? false : true}/>
        </CreateOrphanageForm>
      </Content>
    </Container>
  );
}

export default CreateOrphanage

