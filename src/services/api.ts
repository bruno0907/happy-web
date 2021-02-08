import axios from 'axios'

const URI = window.location.hostname === 'localhost' ? 'http://localhost:3333/' : 'https://bruno0907-happy-backend.herokuapp.com/'

export const api = axios.create({
  baseURL: URI
})