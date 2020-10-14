import React, { useState, useRef, FormEvent, ChangeEvent } from "react";
import { useHistory } from 'react-router-dom'
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'

import { FiPlus, FiX } from "react-icons/fi";

import Sidebar from "../../components/Sidebar";

import './styles.css';

import { happyMapIcon } from '../../utils/mapIcon'
import { api } from "../../services/api";

const CreateOrphanage = () => {
  const history = useHistory()
  const [position, setPosition] = useState({ latitude: 0, longitude: 0})
  
  const name = useRef<HTMLInputElement>(null)
  const about = useRef<HTMLTextAreaElement>(null)
  const whatsapp = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<File[]>([])
  const instructions = useRef<HTMLTextAreaElement>(null)
  const opening_hours = useRef<HTMLInputElement>(null)
  
  const [open_on_weekends, setOpenOnWeekends] = useState(true)

  const [imagesPreview, setImagesPreview] = useState<string[]>([])

  function handleMapClick(event: LeafletMouseEvent){
    const { lat, lng } = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files){
      return
    }

    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(
      image => URL.createObjectURL(image)
    )
    setImagesPreview(selectedImagesPreview)
  }

  function handleSubmit(event: FormEvent){
    event.preventDefault()

    const { latitude, longitude } = position
    const data = new FormData()

    if(
      !name.current?.value ||       
      !about.current?.value ||
      !whatsapp.current?.value ||
      !instructions.current?.value ||
      !opening_hours.current?.value
      ){
      return
    }

    data.append('name', name.current?.value)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('about', about.current?.value)
    data.append('whatsapp', whatsapp.current?.value)
    data.append('instructions', instructions.current?.value)
    data.append('opening_hours', opening_hours.current?.value)
    data.append('open_on_weekends', String(open_on_weekends))

    images.forEach(image => data.append('images', image))

    api.post('orphanages', data)
      .then(response => {
        console.log(response.data)
        history.push('/orphanages')
      })
      .catch(error => {
        alert('Houve um erro com seu cadastro')
        console.error(error.message)
      })
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />      

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
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

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" ref={name}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} ref={about}/>
            </div>

            <div className="input-block">
              <label htmlFor="name">Número de Whatsapp</label>
              <input id="name" ref={whatsapp}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {imagesPreview.map(image => {
                  return (
                    <div key={image}>                    
                      <img src={image} alt={image} />  
                      <button>
                        <FiX size={24} color="#FF669D" /> 
                      </button>                    
                    </div>
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input 
                multiple 
                type="file" 
                id="image[]"
                onChange={handleSelectImages}
              />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" ref={instructions}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário das visitas</label>
              <input id="opening_hours" ref={opening_hours}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
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
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateOrphanage

