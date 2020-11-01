import React, { useState, FormEvent, ChangeEvent, useEffect, useMemo } from "react";
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
  OpenOnWeekendsOptions,
} from './styles'

import { happyMapIcon } from '../../utils/mapIcon'
import { api } from "../../services/api";

interface OrphanageParams{
  id: string;
}

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

interface OrphanageImages{
  id: number;
  url: string;
}

const EditOrphanage = () => {
  const history = useHistory()
  const params = useParams<OrphanageParams>()  

  // Form States
  const [position, setPosition] = useState({ latitude: 0, longitude: 0})
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  
  const [images, setImages] = useState<any>([])
  const [imagesPreview, setImagesPreview] = useState<any>([])
  const [orphanageImages, setOrphanageImages] = useState<any>([])

  useEffect(() => {
    async function getOrphanage(){
      const { id } = params
      const response = await api.get(`orphanages/${id}`)
      const { data } = response
      
      if(!data){
        return
      }
      
      setPosition({ latitude: data.latitude, longitude: data.longitude})
      setName(data.name)      
      setAbout(data.about)
      setWhatsapp(data.whatsapp)
      setInstructions(data.instructions)
      setOpeningHours(data.opening_hours)
      setOpenOnWeekends(data.open_on_weekends)      
      setOrphanageImages(data.images) // State que alimenta o layout com as imagens que vem do orfanato.
      
    }
    getOrphanage()

  }, [params])   

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
    setImages([...images, selectedImage]) // state que vai pro banco de dados            
    
    const selectedImagesPreview = selectedImage.map(
      (image: File) => URL.createObjectURL(image)
    )
    setImagesPreview([...imagesPreview, selectedImagesPreview]) // state que cria o preview    
    
  }

  function handlePreviewImageRemoval(previewImage: string){
    const remainingImages = imagesPreview.filter(
        (imageName: string) => imageName !== previewImage      
    )
    setImagesPreview(remainingImages)
    setImages(remainingImages)
    return
  }

  function handleOrphanageImageRemoval(imageId: number){
    const remainingImages = orphanageImages.filter(
        (image: OrphanageImages) => image.id !== imageId      
    )
    setOrphanageImages(remainingImages)    
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
    data.append('whatsapp', whatsapp)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))

    images.forEach((image: any) => data.append('images', image))    

    console.log(images)

    // api.post('orphanages', data)
    //   .then(() => {        
    //     history.push('/orphanages/create/success')
    //   })
    //   .catch(() => {
    //     alert('Houve um erro com seu cadastro')        
    //   })    
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

