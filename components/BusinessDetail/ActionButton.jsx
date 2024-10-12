import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import React from "react";
import { FlatList } from "react-native";

const ActionButton = ({ business }) => {
  const actionButtonMenu = [
    {
      id: 1,
      name: "Call",
      icon: require("../../assets/images/call.png"),
      url: "tel:" + business?.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("../../assets/images/pin.png"),
      url:
        "https://www.google.com/maps/search/?api=1&query=" + business?.address,
    },
    {
      id: 3,
      name: "Web",
      icon: require("../../assets/images/web.png"),
      url: business?.website,
    },
    {
      id: 4,
      name: "Share",
      icon: require("../../assets/images/share.png"),
      url: business?.website,
    },
  ];

  const OnPressHandler = (item) => {
    if (item.name == "Share") {
      Share.share({
        message:
          business?.name +
          "\n\n Address: " +
          business?.address +
          "\n\nFind more details on business directory application by Ayush Tiwari!",
      });
      return;
    }
    Linking.openURL(item.url);
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 10,
      }}
    >
      <FlatList
        numColumns={4}
        data={actionButtonMenu}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: "#fff",
              padding: 20,
              display: "flex",
              alignItems: "center",
            }}
            onPress={() => OnPressHandler(item)}
          >
            <Image
              source={item?.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-medium",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ActionButton;
