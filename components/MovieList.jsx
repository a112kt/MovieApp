import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { imageBaseUrl } from "../assets/constants";

const { width, height } = Dimensions.get('window');

export default function MovieList({ title, data, hiddenSeeAll }) {
  const navigation = useNavigation();

  return (
    <View className="mb-3 space-y-4">
   
      <View className="mx-3 flex-row justify-between items-center">
        <Text className="text-white text-xl font-bold">{title}</Text>
        {!hiddenSeeAll && (
          <TouchableOpacity onPress={()=>navigation.navigate("SeeAll")}>
            <Text className="text-yellow-400 text-lg">See All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        className="mt-2"
      >
        {data.map((item, index) => {
          const imageUrl = item.poster_path
            ? { uri: `${imageBaseUrl}${item.poster_path}` }
            : require("../assets/images/images.jpg"); 

          return (
            <TouchableOpacity
              key={index}
              className="mr-3"
              onPress={() => navigation.push("Movie", item)}
            >
              <View className="bg-gray-700 rounded-lg overflow-hidden">
                <Image
                  source={imageUrl}
                  style={{
                    width: width * 0.3,
                    height: height * 0.2,
                    borderRadius: 12,
                  }}
                  resizeMode="cover"
                />
              </View>

              
              <View style={{ width: width * 0.3 }}>
                <Text
                  className="text-neutral-300 ml-1 mt-1 text-sm"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.title || item.name || "No Title"}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

