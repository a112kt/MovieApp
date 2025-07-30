import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Info() {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#171717", paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
      >
        {/* Back button */}
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(255, 204, 0, 0.9)",
            borderRadius: 50,
            padding: 10,
            alignSelf: "flex-start",
            marginBottom: 20,
          }}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        {/* App Branding */}
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Image
            source={require("../assets/images/cinema-4153289_1280.webp")}
            style={{
              width: width * 0.35,
              height: width * 0.35,
              borderRadius: 20,
              marginBottom: 16,
            }}
            resizeMode="cover"
          />
          <Text style={{ color: "white", fontSize: 28, fontWeight: "bold", textAlign: "center" }}>
            🎬 MyMovies App
          </Text>
          <Text
            style={{
              color: "#A3A3A3",
              marginTop: 10,
              textAlign: "center",
              fontSize: 16,
              lineHeight: 24,
              paddingHorizontal: 10,
            }}
          >
            Welcome to MyMovies — your ultimate guide to trending films,
            upcoming releases, and top-rated movies from around the world.
          </Text>
        </View>

        {/* Features */}
        <View style={{ marginBottom: 30 }}>
          <Text
            style={{
              color: "#FACC15",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Features
          </Text>
          {[
            "✅ Browse trending movies",
            "✅ Explore upcoming releases",
            "✅ Check top-rated films",
            "✅ View cast & detailed info",
            "✅ Add movies to favorites",
          ].map((feature, index) => (
            <Text
              key={index}
              style={{ color: "#D4D4D4", fontSize: 16, marginBottom: 6 }}
            >
              {feature}
            </Text>
          ))}
        </View>

        {/* Contact / Support */}
        <View style={{ marginBottom: 40 }}>
          <Text
            style={{
              color: "#FACC15",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Need Help?
          </Text>
          <Text style={{ color: "#D4D4D4", fontSize: 16, marginBottom: 10 }}>
            For questions, feedback, or support, feel free to reach out:
          </Text>

          <TouchableOpacity
            onPress={() => Linking.openURL("mailto:support@mymoviesapp.com")}
          >
            <Text style={{ color: "#60A5FA", textDecorationLine: "underline" }}>
              📧 support@mymoviesapp.com
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL("https://mymoviesapp.com")}
          >
            <Text
              style={{
                color: "#60A5FA",
                textDecorationLine: "underline",
                marginTop: 6,
              }}
            >
              🌐 www.mymoviesapp.com
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ color: "#737373" }}>Version 1.0.0</Text>
          <Text style={{ color: "#737373", marginTop: 4 }}>
            © 2025 MyMovies Inc. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
