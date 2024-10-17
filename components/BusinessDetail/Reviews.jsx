import { View, Text, TextInput, ToastAndroid, Image } from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { db } from "@/configs/FirebaseConfig";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native-web";

const Reviews = ({ business }) => {
  const [rating, setRating] = useState(3);
  const [userInput, setUserInput] = useState();

  const [reviewData, setReviewData] = useState(
    business?.reviews?.map((item) => ({
      comment: item.comment,
      rating: item.rating,
      userImage: item.userImage,
      userName: item.userName,
    }))
  );

  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const onSubmit = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", business?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
      }),
    });

    setReviewData((prev) => [
      ...prev,
      {
        rating: rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
      },
    ]);

    setLoading(false);

    ToastAndroid.show("Comment added successfully !", ToastAndroid.BOTTOM);
  };

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
          onStartRating={(rating) => setRating(rating)}
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
        {loading ? (
          <TouchableOpacity
            disabled={!userInput}
            onPress={() => onSubmit()}
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
              <ActivityIndicator color={"white"} />
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={!userInput && !rating}
            onPress={() => onSubmit()}
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
        )}
      </View>

      {/* display previous review  */}

      <View>
        {reviewData?.map((item, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 10,
              borderWidth: 1,
              borderColor: Colors.GREY,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Image
              source={{ uri: item.userImage }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 99,
              }}
            />
            <View
              style={{
                display: "flex",
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-medium",
                }}
              >
                {item.userName}
              </Text>
              <Rating
                imageSize={15}
                ratingCount={item.rating}
                style={{ alignItems: "flex-start" }}
              />
              <Text>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Reviews;
