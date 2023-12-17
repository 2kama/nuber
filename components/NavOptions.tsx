import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { useAppSelector } from '../hooks'

type DataType = {
    id: string
    title: string
    image: string
    screen: string
}

const data: DataType[] = [
    {
        id: "123",
        title: "Get a ride",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen"
    },
    {
        id: "456",
        title: "Order Food",
        image: "https://links.papareact.com/28w",
        screen: "EatsScreen",
    }
]

const NavOptions = () => {

  const navigation = useNavigation();
  const origin = useAppSelector(state => state.nav.origin);

  return (
    <FlatList 
      data={data}
      keyExtractor={(item: DataType) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 mt-12`}
          disabled={!origin}
        >
            <View style={!origin && tw`opacity-20`}>
                <Image 
                  style={{
                    width: 120,
                    height: 120,
                    resizeMode: "contain"
                  }}
                  source={{
                    uri: item.image
                  }}
                />
                <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                <Icon
                  style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                  type='antdesign'
                  name='arrowright'
                  color='white'
                />
            </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavOptions