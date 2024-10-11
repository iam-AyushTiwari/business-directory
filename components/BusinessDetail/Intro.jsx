import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const Intro = ({ business }) => {
  const router = useRouter();
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          height: 340,
          width: "100%",
        }}
      />
      <View
        style={{
          padding: 20,
          marginTop: -20,
          backgroundColor: "#fff",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 26,
          }}
        >
          {business?.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 18,
          }}
        >
          {business?.address}
        </Text>
      </View>
    </View>
  );
};

export default Intro;
