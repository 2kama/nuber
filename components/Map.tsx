import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc'
import { useAppSelector } from '../hooks';
import MapViewDirections from 'react-native-maps-directions';
// @ts-ignore
import { GOOGLE_MAPS_APIKEY } from 'react-native-dotenv'

const Map = () => {
  const origin = useAppSelector(state => state.nav.origin);
  const destination = useAppSelector(state => state.nav.destination);
  const mapRef = useRef<MapView | null>(null);


  useEffect(() => {
    mapRef.current!.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        },
    });
  }, [origin, destination]);
   

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: origin!.location!.lat,
        longitude: origin!.location!.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections 
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor='black'
        />
      )}
      {origin?.location && (
        <Marker 
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

    {destination?.location && (
        <Marker 
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  )
}

export default Map