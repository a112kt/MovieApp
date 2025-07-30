import {
  View,
  Text,
  TextInput,
  Platform,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Loading from "./../components/Loading";
import { SearchMovie } from "../Api/Moviedb";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const { width } = Dimensions.get("window");

export default function Search() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const ios = Platform.OS === "ios";
  const marginTop = ios ? 50 : 40;

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    const data = await SearchMovie(query);
    setResult(data?.results || []);
    setIsLoading(false);
  };

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View style={{ paddingHorizontal: 20, paddingTop: marginTop }}>
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(255, 204, 0, 0.9)",
            width: 40,
            height: 40,
            borderRadius: 20, 
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
          }}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={24} strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Search Movies
        </Text>

        <TextInput
          placeholder="Search for a movie..."
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          style={{
            backgroundColor: "#1F2937",
            color: "white",
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 10,
            fontSize: 16,
            marginBottom: 15,
          }}
        />

        <TouchableOpacity
          onPress={handleSearch}
          style={{
            backgroundColor: "#FACC15",
            paddingVertical: 12,
            borderRadius: 12,
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {result.length > 0 ? (
              result.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate("Movie", item)}
                  style={{
                    backgroundColor: "#1F2937",
                    borderRadius: 12,
                    padding: 10,
                    marginBottom: 15,
                    width: (width - 60) / 2,
                  }}
                >
                  <Image
                    source={
                      item.poster_path
                        ? {
                            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                          }
                        : null
                    }
                    style={{
                      width: "100%",
                      height: 150,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                    resizeMode="cover"
                  />

                  <Text
                    style={{ color: "white", fontSize: 16 }}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ color: "white", fontSize: 16 }}>
                No results found
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
