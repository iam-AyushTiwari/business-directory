import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const PopularBusinessCard = ({ business }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
      }}
      onPress={() => router.push("/businessdetail/" + business.id)}
    >
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          height: 130,
          width: 200,
          borderRadius: 15,
        }}
      />
      <View style={{ marginTop: 7, gap: 4 }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 17,
          }}
        >
          {business?.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 12,
            color: Colors.GREY,
          }}
        >
          {business.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            justifyContent: "space-between",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <Image
              source={require("./../../assets/images/star.png")}
              style={{
                width: 15,
                height: 15,
              }}
            />
            <Text style={{ fontFamily: "outfit" }}>4.5</Text>
          </View>
          <Text
            style={{
              fontFamily: "outfit",
              backgroundColor: Colors.PRIMARY,
              color: "#fff",
              padding: 3,
              fontSize: 12,
              borderRadius: 8,
            }}
          >
            {business.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularBusinessCard;
