import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import { FlatList } from "react-native";
import CategoryItem from "../../components/Home/CategoryItem";
import { useRouter } from "expo-router";

const Category = ({ explore = false, onCategorySelect }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    setLoading(true);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  const onCategoryPressHandler = (item) => {
    if (!explore) {
      return router.navigate("/businesslist/" + item.name);
    } else {
      onCategorySelect(item.name);
    }
  };

  return (
    <View>
      {!explore && (
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
            Category
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
      )}
      {loading ? (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <ActivityIndicator size={"55"} color={Colors.PRIMARY} />
        </View>
      ) : (
        <FlatList
          data={categoryList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 20 }}
          renderItem={({ item, index }) => (
            <CategoryItem
              category={item}
              onCategoryPress={(category) => onCategoryPressHandler(item)}
            />
          )}
        />
      )}
    </View>
  );
};

export default Category;
