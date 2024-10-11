import { View, Text, Image } from "react-native";
import React, { useCallback } from "react";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // use signin  or signup for next step such as WFA
      }
    } catch (err) {
      console.error("OAuth Error: ", err);
    }
  }, []);

  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Image
          source={require("../assets/images/login.png")}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "#000",
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 20,
          marginTop: -20,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Your Ultimate{" "}
          <Text style={{ color: Colors.PRIMARY }}>
            Community Business Directory
          </Text>{" "}
          App
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfit",
            color: Colors.GREY,
            textAlign: "center",
            padding: 20,
          }}
        >
          Find your favoriout business near your and post your own business in
          community
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 16,
            borderRadius: 99,
          }}
          onPress={onPress}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontFamily: "outfit",
            }}
          >
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
