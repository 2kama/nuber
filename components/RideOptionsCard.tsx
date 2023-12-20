import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setDestination, setTravelTimeInformation } from "../slices/navSlice";

type DataType = {
  id: string;
  title: string;
  multiplier: number;
  image: string;
};

const data: DataType[] = [
  {
    id: "nuber-x-123",
    title: "nuberX",
    multiplier: 1,
    image: "https://rb.gy/3vdm1n",
  },
  {
    id: "nuber-xl-456",
    title: "nuber XL",
    multiplier: 1.2,
    image: "https://rb.gy/nzvfkn",
  },
  {
    id: "nuber-lux-789",
    title: "nuber LUX",
    multiplier: 1.75,
    image: "https://rb.gy/rz6b6q",
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [selectedCar, setSelectedCar] = useState<DataType | null>(null);
  const travelTimeInformation = useAppSelector(
    (state) => state.nav.travelTimeInformation
  );

  const SURGE_CHARGE_RATE = 1.5;

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 p-3 rounded-full z-1`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          {travelTimeInformation &&
          travelTimeInformation.status === "ZERO_RESULTS"
            ? "Impossible Road Route"
            : `Select a Ride - ${
                travelTimeInformation && travelTimeInformation?.distance?.text
              }`}
        </Text>
      </View>

      {travelTimeInformation &&
        travelTimeInformation.status !== "ZERO_RESULTS" && (
          <>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({
                item: { id, image, title, multiplier },
                item,
              }) => (
                <TouchableOpacity
                  onPress={() => setSelectedCar(item)}
                  style={[
                    tw`flex-row items-center justify-between px-6`,
                    id === selectedCar?.id && tw`bg-gray-200`,
                  ]}
                >
                  <Image
                    style={{
                      width: 80,
                      height: 80,
                      resizeMode: "contain",
                    }}
                    source={{
                      uri: image,
                    }}
                  />
                  <View style={tw`-ml-2`}>
                    <Text style={tw`text-xl font-semibold`}>{title}</Text>
                    <Text style={tw`text-xs`}>
                      {travelTimeInformation &&
                        travelTimeInformation.duration?.text}{" "}
                      Travel Time
                    </Text>
                  </View>
                  <Text style={tw`text-xl`}>
                    {travelTimeInformation &&
                      new Intl.NumberFormat("en-us", {
                        style: "currency",
                        currency: "USD",
                      }).format(
                        (travelTimeInformation.duration?.value *
                          SURGE_CHARGE_RATE *
                          multiplier) /
                          100
                      )}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <View>
              <TouchableOpacity
                disabled={!selectedCar}
                style={[tw`bg-black py-3 m-3`, !selectedCar && tw`bg-gray-300`]}
                onPress={() => {
                    dispatch(setDestination(null));
                    dispatch(setTravelTimeInformation(null));
                    navigation.navigate("HomeScreen");
                }}
              >
                <Text style={tw`text-center text-white text-xl`}>
                  Choose {selectedCar?.title}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
    </SafeAreaView>
  );
};

export default RideOptionsCard;
