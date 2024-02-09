import React from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

interface KakaoMapProps {
  longitude: number
  latitude: number
  setCustomValue?: (id: string, value: number) => void
  // 분기처리를 위한 props
  detailPage?: boolean
}

const KakaoMap = ({
  setCustomValue,
  longitude,
  latitude,
  detailPage = false
}: KakaoMapProps ) => {

  const handleClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
    // console.log(mouseEvent)
    if(detailPage) null;
    if(!setCustomValue) return;
    setCustomValue('latitudu', mouseEvent.latLng.getLat())
    setCustomValue('longitude', mouseEvent.latLng.getLng())
  }

  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: "100%", height: "360px" }}
      onClick={(_, mouseEvent) => handleClick(mouseEvent)}
    >
      <MapMarker 
        position={{ lat: latitude, lng: longitude }}
      >
      </MapMarker>
    </Map>
  )
}

export default KakaoMap