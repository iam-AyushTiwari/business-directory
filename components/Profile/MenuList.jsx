import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const MenuList = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  const onMenuClick = (item) => {
    if (item.path == "logout") {
      return signOut();
    }
    if (item.path == "share") {
      return Share.share({
        message:
          "Download the Business Directory App by Ayush Tiwari \n\n www.insiden.in",
      });
    }
    router.push(item.path);
  };

  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("../../assets/images/add.png"),
      path: "/business/add_business",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("../../assets/images/business-and-trade.png"),
      path: "/business/my_business",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("../../assets/images/share_1.png"),
      path: "share",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("../../assets/images/logout.png"),
      path: "logout",
    },
  ];

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <FlatList
        numColumns={2}
        data={menuList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              padding: 10,
              borderWidth: 1,
              margin: 10,
              backgroundColor: "#fff",
              borderRadius: 15,
              borderColor: Colors.PRIMARY,
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 18,
                flex: 1,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Text
        style={{
          fontFamily: "outfit",
          textAlign: "center",
          marginTop: 50,
          color: Colors.GREY,
        }}
      >
        Developed with ❤️ by Ayush Tiwari @ 2024
      </Text>
    </View>
  );
};

export default MenuList;
