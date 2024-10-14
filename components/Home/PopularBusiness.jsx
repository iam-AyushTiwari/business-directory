import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import { FlatList } from "react-native";
import PopularBusinessCard from "./PopularBusinessCard";

const PopularBusiness = () => {
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    setBusinessList([]);
    const q = query(collection(db, "BusinessList"), limit(3));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            paddingLeft: 20,
            marginTop: 10,
            fontSize: 20,
            marginBottom: 5,
          }}
        >
          Popular Business
        </Text>
        <Text
          style={{
            paddingRight: 20,
            color: Colors.PRIMARY,
            fontFamily: "outfit-medium",
          }}
        >
          View All
        </Text>
      </View>

      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <PopularBusinessCard key={index} business={item} />
        )}
      />
    </View>
  );
};

export default PopularBusiness;
