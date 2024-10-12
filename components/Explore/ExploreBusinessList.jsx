import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import BusinessListCard from "@/components/Explore/BusinessListCard";

const ExploreBusinessList = ({ businessList }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FlatList
        data={businessList}
        renderItem={({ item, index }) => (
          <BusinessListCard key={index} business={item} />
        )}
      />
      <View
        style={{
          height: 250,
        }}
      ></View>
    </ScrollView>
  );
};

export default ExploreBusinessList;
