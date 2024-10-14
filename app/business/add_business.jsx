import { View, Text, TextInput, ScrollView, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db, storage } from "../../configs/FirebaseConfig";
import BusinessDetail from "../businessdetail/[businessid]";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator } from "react-native";

const AddBusiness = () => {
  const navigation = useNavigation();
  const [categoryList, setCategorylList] = useState([]);
  const [image, setImage] = useState(null);
  const { user } = useUser();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [website, setWebsite] = useState();
  const [about, setAbout] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);

  const setAllStatesToEmpty = () => {
    setImage(null);
    setName("");
    setAddress("");
    setContact("");
    setWebsite("");
    setAbout("");
    setCategory("");
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });
  }, []);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategorylList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setCategorylList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0].uri);
  };

  const onAddNewBusiness = async () => {
    try {
      setLoading(true);
      const filename = Date.now().toString();

      // Fetch the image and convert it to a blob
      const resp = await fetch(image);
      const blob = await resp.blob();

      const imageRef = ref(storage, "business-app/" + filename);
      await uploadBytes(imageRef, blob);
      console.log("File Uploaded");

      const downloadUrl = await getDownloadURL(imageRef);
      console.log("Image URL retrieved: ", downloadUrl);

      await saveBusinessDetail(downloadUrl);
    } catch (error) {
      console.error("Error adding new business: ", error);
    } finally {
      setLoading(false);
    }
  };

  const saveBusinessDetail = async (imageUrl) => {
    try {
      console.log("Setting document in Firebase...");
      await setDoc(doc(db, "BusinessList", Date.now().toString()), {
        name: name,
        address: address,
        contact: contact,
        about: about,
        imageUrl: imageUrl,
        website: website,
        category: category,
        username: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
      });
      console.log("Document successfully added!");
      setAllStatesToEmpty();
      ToastAndroid.show("New Business Added", ToastAndroid.BOTTOM);
    } catch (err) {
      console.error("Error setting document: ", err);
    }
  };

  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        Add New Business
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          color: Colors.GREY,
        }}
      >
        Fill the details in order to add new details
      </Text>
      <TouchableOpacity
        style={{
          width: "100%",
          height: 200,
          backgroundColor: "white",
          marginTop: 10,
          borderRadius: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
        onPress={() => onImagePick()}
      >
        {!image ? (
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Entypo name="camera" size={90} color={Colors.PRIMARY} />
            <Text
              style={{
                fontFamily: "outfit",
                color: Colors.GREY,
              }}
            >
              Choose a business image
            </Text>
          </View>
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        )}
      </TouchableOpacity>

      <View>
        <TextInput
          placeholder="Name"
          onChangeText={(v) => setName(v)}
          value={name}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Address"
          onChangeText={(v) => setAddress(v)}
          value={address}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Contact"
          onChangeText={(v) => setContact(v)}
          value={contact}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Website"
          onChangeText={(v) => setWebsite(v)}
          value={website}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="About"
          onChangeText={(v) => setAbout(v)}
          value={about}
          numberOfLines={5}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
            height: 100,
          }}
        />
      </View>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: "#fff",
          marginTop: 10,
          borderColor: Colors.PRIMARY,
        }}
      >
        <RNPickerSelect
          onValueChange={(value) => setCategory(value)}
          items={categoryList}
        />
      </View>
      <TouchableOpacity
        disabled={loading}
        onPress={onAddNewBusiness}
        style={{
          width: "100%",
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "outfit",
            }}
          >
            + Add Business
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddBusiness;
