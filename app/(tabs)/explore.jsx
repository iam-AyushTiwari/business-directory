import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "@/constants/Colors";
import Category from "@/components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import ExploreBusinessList from "@/components/Explore/ExploreBusinessList";

const explore = () => {
  const [businessList, setBusinessList] = useState([]);

  const GetBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}
      >
        Explore More
      </Text>
      {/* search bar */}
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
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
        }}
      >
        <FontAwesome name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{ fontFamily: "outfit", fontSize: 16, width: "100%" }}
        />
      </View>

      {/* category  */}

      <Category
        explore={true}
        onCategorySelect={(category) => GetBusinessByCategory(category)}
      />

      {/* business list  */}
      <ExploreBusinessList businessList={businessList} />
    </View>
  );
};

export default explore;
