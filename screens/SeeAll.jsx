import { View, Text, ScrollView, Platform, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  FetchUpComingMovies,
  FetchTopRatedMovies,
} from '../Api/Moviedb';
import Loading from '../components/Loading';
import MovieSection from '../components/MovieSection';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

export default function SeeAll() {
  const ios = Platform.OS === 'ios';
  const navigation = useNavigation();

  const [upComingMovies, setUpComingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = async () => {
    try {
      const upcoming = await FetchUpComingMovies();
      const topRated = await FetchTopRatedMovies();

      if (upcoming && upcoming.results) setUpComingMovies(upcoming.results);
      if (topRated && topRated.results) setTopRatedMovies(topRated.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-neutral-800">
      <ScrollView
        className={ios ? 'mt-4' : 'mt-12'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(255, 204, 0, 0.9)",
            borderRadius: 50,
            padding: 10,
            alignSelf: 'flex-start',
            marginBottom: 10
          }}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <MovieSection title="Upcoming" data={upComingMovies} />
            <MovieSection title="Top Rated" data={topRatedMovies} />
          </>
        )}
      </ScrollView>
    </View>
  );
}
