import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import { FlatList } from "react-native";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { Colors } from "@/constants/Colors";
import { ActivityIndicator } from "react-native";

const BusinessListByCategory = () => {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();

  const [businessList, setBusinessList] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });
    setLoading(false);
  };

  return (
    <View>
      {businessList?.length > 0 && loading == false ? (
        <FlatList
          data={businessList}
          onRefresh={getBusinessList}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
        />
      ) : loading ? (
        <ActivityIndicator
          style={{
            marginTop: "60%",
          }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
            color: Colors.GREY,
            textAlign: "center",
            marginTop: "50%",
          }}
        >
          No business found!!
        </Text>
      )}
    </View>
  );
};

export default BusinessListByCategory;
