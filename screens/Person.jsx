import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import MovieList from '../components/MovieList';
import Loading from './../components/Loading';
import { FetchPersonDetails, FetchPersonMovies } from '../Api/Moviedb';

const { width } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const marginTop = ios ? 50 : 40;

export default function Person() {
  const navigation = useNavigation();
  const { params: person } = useRoute();
  const [isFavorite, setIsFavorite] = useState(false);
  const [hisMovies, setHisMovies] = useState([]);
  const [personInfo, setPersonInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (person && person.id) {
      loadPersonData(person.id);
    }
  }, [person]);

  const loadPersonData = async (personId) => {
    setIsLoading(true);
    const [details, credits] = await Promise.all([
      FetchPersonDetails(personId),
      FetchPersonMovies(personId),
    ]);
    setPersonInfo(details);
    setHisMovies(credits?.cast?.slice(0, 10) || []);
    setIsLoading(false);
  };

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Back & Favorite Buttons */}
      <SafeAreaView
        className="z-10 w-full flex-row justify-between items-center px-4"
        style={{ marginTop }}
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
        personInfo && (
          <>
            {/* Person Info */}
            <View className="flex-1 items-center justify-center mt-5"
              style={{
                shadowColor: 'black',
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 6.27,
                elevation: 15,
              }}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${personInfo.profile_path}`,
                }}
                style={{
                  width: width * 0.7,
                  height: width * 0.7,
                  borderRadius: (width * 0.7) / 2,
                }}
                resizeMode="cover"
              />
              <Text className="text-white text-3xl font-bold mt-4">
                {personInfo.name}
              </Text>
              <Text className="text-white text-lg mt-2 text-center">
                {personInfo.place_of_birth || 'Unknown'}
              </Text>

              {/* Info Cards */}
              <View className="mt-8 flex-row flex-wrap justify-between gap-4">
                <View className="border border-gray-600 rounded-xl bg-gray-800/50 flex-1 min-w-[30%]">
                  <Text className="text-gray-400 px-4 pt-3 text-sm font-medium">GENDER</Text>
                  <Text className="text-white px-4 pb-3 text-lg font-semibold">
                    {personInfo.gender === 1 ? 'Female' : 'Male'}
                  </Text>
                </View>

                <View className="border border-gray-600 rounded-xl bg-gray-800/50 flex-1 min-w-[30%]">
                  <Text className="text-gray-400 px-4 pt-3 text-sm font-medium">BIRTHDATE</Text>
                  <Text className="text-white px-4 pb-3 text-lg font-semibold">
                    {personInfo.birthday || 'Unknown'}
                  </Text>
                </View>

                <View className="border border-gray-600 rounded-xl bg-gray-800/50 flex-1 min-w-[30%]">
                  <Text className="text-gray-400 px-4 pt-3 text-sm font-medium">KNOWN FOR</Text>
                  <Text className="text-white px-4 pb-3 text-lg font-semibold">
                    {personInfo.known_for_department || 'Unknown'}
                  </Text>
                </View>
              </View>

              {/* About */}
              <View className="mt-8 px-4">
                <Text className="text-yellow-400 text-3xl font-semibold mb-2">About</Text>
                <Text className="text-white text-lg text-justify">
                  {personInfo.biography || "No biography available."}
                </Text>
              </View>
            </View>

            {/* Movies */}
            <View className="mt-8 px-4">
              <MovieList data={hisMovies} title="Movies Done" />
            </View>
          </>
        )
      )}
    </ScrollView>
  );
}
