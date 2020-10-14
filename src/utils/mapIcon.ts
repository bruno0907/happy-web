import L from 'leaflet';
import mapMarkerImg from '../assets/images/map-marker.svg';

export const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,
  iconSize: [50, 60],
  iconAnchor: [25, 30],
  popupAnchor: [165, 36]
})