import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import { ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";
import Reviews from "../../components/BusinessDetail/Reviews";

const BusinessDetail = () => {
  const { businessid } = useLocalSearchParams();
  // console.log("first");
  const [businessDetail, setBusinessDetail] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBusinessDetailById();
  }, []);

  const getBusinessDetailById = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBusinessDetail({ id: docSnap.id, ...docSnap.data() });
    } else {
      console.log("Not found the Business Details");
    }
    setLoading(false);
  };
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          style={{
            marginTop: "70%",
          }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <View>
          {/* intro */}
          <Intro business={businessDetail} />
          {/* action state */}
          <ActionButton business={businessDetail} />

          {/* about section */}
          <About business={businessDetail} />

          {/* reviews  */}
          <Reviews business={businessDetail} />
        </View>
      )}
    </ScrollView>
  );
};

export default BusinessDetail;
