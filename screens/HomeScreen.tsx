import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// @ts-ignore
import { GOOGLE_MAPS_APIKEY } from 'react-native-dotenv'
import { useAppDispatch } from '../hooks';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFovourites from '../components/NavFovourites';

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Text style={tw`text-5xl android:mt-12 ios:mt-4`}>nuber</Text>
        <View>
        <GooglePlacesAutocomplete
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            placeholder='Where From?'
            fetchDetails={true}
            onPress={(data, details = null) => {
              dispatch(setOrigin({
                location: details?.geometry.location,
                description: data.description
              }))

              dispatch(setDestination(null));
            }}
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
              }
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            minLength={2}
            enablePoweredByContainer={false} 
        />
        </View>

        <NavOptions />
        <NavFovourites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})