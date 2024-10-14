import { View, Text, Alert, ToastAndroid } from "react-native";
import React from "react";
import { Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../../constants/Colors";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

const Intro = ({ business }) => {
  const router = useRouter();
  const { user } = useUser();
  const deleteBusiness = async () => {
    console.log("Business Deleted");
    await deleteDoc(doc(db, "BusinessList", business?.id));
    router.back();
    ToastAndroid.show("Business Deleted!", ToastAndroid.LONG);
  };

  const onDelete = () => {
    Alert.alert(
      "Do you want to delete?",
      "Are you sure and want to delete this business",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBusiness(),
        },
      ]
    );
  };

  return (
    <View>
      {/* <View
        style={{
          position: "absolute",
          backgroundColor: Colors.PRIMARY,
          height: 35,
          zIndex: 99,
          width: "100%",
        }}
      >
        <Text></Text>
      </View> */}
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 20,
          paddingTop: 40,
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
          marginTop: -20,
          padding: 20,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <View>
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

        {user?.primaryEmailAddress?.emailAddress == business?.userEmail ? (
          <TouchableOpacity onPress={() => onDelete()}>
            <AntDesign
              name="delete"
              size={24}
              color="red"
              style={{
                marginTop: 15,
              }}
            />
          </TouchableOpacity>
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

export default Intro;
