import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom'
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
  Form,
  FormSection,
  ImageSection,
  ImagesContainer,
  AddImage,
  OpenOnWeekendsSection,
  OpenOnWeekendsOptions
} from './styles'

import { happyMapIcon } from '../../utils/mapIcon'
import { api } from "../../services/api";

interface OrphanageParams{
  id: string;
  auth: string;
}

interface OrphanageImages{
  id: number;
  url: string;
}

const EditOrphanage = () => {
  const history = useHistory()
  const params = useParams<OrphanageParams>()    

  const [position, setPosition] = useState({ latitude: 0, longitude: 0})
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)  
  
  const [selectedImages, setSelectedImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const [orphanageImages, setOrphanageImages] = useState([])  
  
  const token = localStorage.getItem('@HappyAdmin:Token')  
  const { id, auth } = params

  useEffect(() => {
    if(!token && !auth) return history.push('/app/sign-in')    

    if(!token || auth){      
      const [, token] = auth.split('=')
      
      // Add an API request to validate the token sending the token and the orphanage id
      // and then saving it to the localStorage

      localStorage.setItem('@HappyAdmin:Token', token)
    }

    api.get(`orphanages/${id}`).then(response => {
      const { data } = response

      setPosition({ latitude: data.latitude, longitude: data.longitude})
      setName(data.name)      
      setAbout(data.about)
      setEmail(data.email)
      setWhatsapp(data.whatsapp)
      setInstructions(data.instructions)
      setOpeningHours(data.opening_hours)
      setOpenOnWeekends(data.open_on_weekends)      
      setOrphanageImages(data.images)
      
    }).catch(error => console.log(error.message))

  }, [params, history, token, id, auth])   

  function handleMapClick(event: LeafletMouseEvent){
    const { lat, lng } = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

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

  function handlePreviewImageRemoval(previewImage: string){
    const remainingImages = imagesPreview.filter(
        (imageName: string) => imageName !== previewImage      
    )
    setImagesPreview(remainingImages)    
    return
  }

  function handleOrphanageImageRemoval(imageId: number){
    api.delete(`app/orphanages/image/remove/${imageId}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        const remainingImages = orphanageImages.filter(
            (image: OrphanageImages) => image.id !== imageId      
        )
        return setOrphanageImages(remainingImages)
      })
      .catch(error => console.log(error))       
    return
  }

  function handleSubmit(event: FormEvent){
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

    api.patch(`/app/orphanages/update/${id}`, data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        alert('Cadastro atualizado com sucesso')
        
        if(localStorage.getItem('@HappyAdmin:isAdmin') === 'true'){
          return history.goBack()
        }        
        localStorage.clear()
        return history.push('/')
      })
      .catch(() => alert('Houve um erro com seu cadastro'))    
  }

  return (
    <Container>     
      <Sidebar />  
      <Content>
        <Title>Editar {name}</Title>
        <Form onSubmit={handleSubmit}>
          <FormSection>
            <legend>Dados</legend>          
            <Map 
              center={[position.latitude, position.longitude]}               
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

                {orphanageImages.map((image: OrphanageImages) => 
                  <picture key={image.id}>
                    <img src={image.url} alt={image.url} /> 
                    <span onClick={() => handleOrphanageImageRemoval(image.id)}>
                      <FiX size={23} color=" #D6487B" />
                    </span>
                  </picture>
                )}
                
                {imagesPreview.map((image: any) => 
                  <picture key={image}>
                    <img src={image} alt={image} /> 
                    <span onClick={() => handlePreviewImageRemoval(image)}>
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
          <Button label="Confirmar" />
        </Form>
      </Content>
    </Container>
  );
}

export default EditOrphanage

