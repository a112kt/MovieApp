import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";

import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  FetchMovieDetails,
  FetchMovieCredits,
  FetchSimilarMovies,
} from "../Api/Moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (item?.id) {
      loadMovieDetails(item.id);
    }
  }, [item]);

  const loadMovieDetails = async (id) => {
    setIsLoading(true);
    const [details, credits, similar] = await Promise.all([
      FetchMovieDetails(id),
      FetchMovieCredits(id),
      FetchSimilarMovies(id),
    ]);

    setMovie(details);
    setCast(credits?.cast?.slice(0, 10) || []);
    setSimilarMovies(similar?.results?.slice(0, 10) || []);
    setIsLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="bg-neutral-900 flex-1"
    >
      {/* Back & Favorite Buttons */}
      <SafeAreaView
        style={{
          position: "absolute",
          top: ios ? 50 : 40,
          left: 20,
          right: 20,
          zIndex: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(255, 204, 0, 0.9)",
            borderRadius: 50,
            padding: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 50,
            padding: 10,
          }}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <HeartIcon
            size={28}
            strokeWidth={2.5}
            color={isFavorite ? "red" : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* Movie Image */}
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
              }}
              style={{
                width: width,
                height: height * 0.55,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
              }}
              resizeMode="cover"
            />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23, 23, 23, 0.8)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={{
                width: width,
                height: height * 0.4,
                position: "absolute",
                bottom: 0,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>

          {/* Movie Info */}
          <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
            <Text className="text-white text-center text-3xl font-bold mx-4">
              {movie?.title}
            </Text>

            <Text className="text-neutral-400 text-center font-semibold mt-3 mx-4">
              {movie?.release_date?.split("-")[0]}
            </Text>

            {/* Genres */}
            <View className="flex-row justify-center items-center space-x-2 mt-10">
              {movie?.genres?.map((genre, index) => (
                <Text
                  key={index}
                  className="text-yellow-400 text-lg px-3"
                >
                  {genre.name}
                </Text>
              ))}
            </View>

            {/* Description */}
            <Text className="text-neutral-300 mt-2 text-xl p-2">
              {movie?.overview || "No overview available."}
            </Text>

            {/* Cast Component */}
            <Cast cast={cast} />

            {/* Similar Movies */}
            <MovieList
              title="Similar Movies"
              hiddenSeeAll={true}
              data={similarMovies}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}
