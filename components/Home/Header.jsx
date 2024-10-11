import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Header = () => {
  const { user } = useUser();
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View>
          <Image
            source={{ uri: user?.imageUrl }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 99,
            }}
          />
        </View>
        <View>
          <Text style={{ color: "white" }}>Welcome, </Text>
          <Text
            style={{
              fontSize: 19,
              fontFamily: "outfit-medium",
              color: "white",
            }}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>
      {/* serach bar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 8,
        }}
      >
        <FontAwesome name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{ fontFamily: "outfit", fontSize: 16, width: "100%" }}
        />
      </View>
    </View>
  );
};

export default Header;
