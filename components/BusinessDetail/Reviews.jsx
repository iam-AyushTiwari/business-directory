import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";

const Reviews = () => {
  const [rating, setRating] = useState();
  const [userInput, setUserInput] = useState();
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        Reviews
      </Text>
      <View>
        <Rating
          showRating={false}
          imageSize={25}
          onFinishRating={(rating) => setRating(rating)}
          style={{
            paddingVertical: 10,
          }}
        />
        <TextInput
          placeholder="Write your commnet..."
          numberOfLines={4}
          onChangeText={(value) => setUserInput(value)}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GREY,
            alignItems: "flex-start",
            textAlignVertical: "top",
          }}
        />
        <TouchableOpacity
          disabled={!userInput}
          onPress={() => console.log(userInput, rating)}
          style={{
            borderRadius: 6,
            backgroundColor: Colors.PRIMARY,
            padding: 10,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              color: "#fff",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Reviews;
