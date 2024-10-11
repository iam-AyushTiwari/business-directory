import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import Category from "../../components/Home/Category";
import PopularBusiness from "../../components/Home/PopularBusiness";

const home = () => {
  return (
    <ScrollView>
      {/* header */}
      <Header />

      {/* slider  */}
      <Slider />

      {/* category  */}
      <Category />

      {/* popular busniess */}
      <PopularBusiness />

      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
};

export default home;
