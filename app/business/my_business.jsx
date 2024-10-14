import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { useNavigation } from "expo-router";
import { ActivityIndicator } from "react-native";
import { Colors } from "../../constants/Colors";

const my_business = () => {
  const { user } = useUser();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My Business",
      headerShown: true,
    });
  }, []);

  const [userBusiness, setUserBusiness] = useState([]);

  useEffect(() => {
    user && GetUserBusiness();
  }, []);

  const GetUserBusiness = async () => {
    setLoading(true);
    setUserBusiness([]);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user.primaryEmailAddress.emailAddress)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setUserBusiness((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setLoading(false);
  };

  return (
    <ScrollView>
      {/* <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          marginLeft: 20,
        }}
      >
        My Business
      </Text> */}
      {loading ? (
        <ActivityIndicator
          size={50}
          style={{
            marginTop: 90,
          }}
          color={Colors.PRIMARY}
        />
      ) : (
        <FlatList
          data={userBusiness}
          onRefresh={GetUserBusiness}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
        />
      )}
    </ScrollView>
  );
};

export default my_business;
