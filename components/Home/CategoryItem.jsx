import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";

const CategoryItem = ({ category, onCategoryPress }) => {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
      <View
        style={{
          padding: 10,
          backgroundColor: Colors.ICONBG,
          borderRadius: 99,
          marginRight: 15,
          padding: 15,
        }}
      >
        <Image
          source={{ uri: category.icon }}
          style={{
            height: 40,
            width: 40,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          textAlign: "center",
          fontFamily: "outfit-medium",
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
