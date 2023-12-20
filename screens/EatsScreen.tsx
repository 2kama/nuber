import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const EatsScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`h-full`}>
      <View style={tw`flex-1`}>
        <Text style={tw`text-center text-3xl mt-50 flex-grow`}>
          Coming Soon to nuber
        </Text>

        <TouchableOpacity
          style={tw`bg-black py-3 m-3`}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={tw`text-center text-white text-xl`}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EatsScreen;
