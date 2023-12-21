import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useAppDispatch, useAppSelector } from "../hooks";
import MapViewDirections from "react-native-maps-directions";
import { setTravelTimeInformation } from "../slices/navSlice";

const Map = () => {
  const origin = useAppSelector((state) => state.nav.origin);
  const destination = useAppSelector((state) => state.nav.destination);
  const mapRef = useRef<MapView | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      mapRef.current!.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=GOOGLE MAPS API KEY`
      )
        .then((res) => res.json())
        .then((data) =>
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
        );
    };

    getTravelTime();
  }, [origin, destination]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="standard"
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
          apikey="GOOGLE MAPS API KEY"
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
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
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;
