import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import {
  FetchTrendingMovies,
  FetchUpComingMovies,
  FetchTopRatedMovies,
} from '../Api/Moviedb';
import { useEffect, useState } from 'react';

export default function HomeScreen({ navigation }) {
  const ios = Platform.OS === 'ios';

  const [trendMovies, setTrendMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = async () => {
    try {
      const trending = await FetchTrendingMovies();
      const upcoming = await FetchUpComingMovies();
      const topRated = await FetchTopRatedMovies();

      if (trending && trending.results) setTrendMovies(trending.results);
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
      <SafeAreaView className={ios ? 'mt-4' : 'mt-12'}>
        <StatusBar barStyle="light-content" />
        <View className="flex-row items-center justify-between mx-4">
          <Bars3CenterLeftIcon
            size={30}
            strokeWidth={2}
            color="white"
            onPress={() => navigation.navigate('Info')}
          />
          <Text className="text-white text-3xl font-bold">
            <Text className="text-yellow-400 text-5xl">M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
          className="mt-4"
        >
          {trendMovies.length > 0 && <TrendingMovies data={trendMovies} />}
          
          <MovieList title="Upcoming" data={upComingMovies} />
          <MovieList title="Top Rated" data={topRatedMovies} />
        </ScrollView>
      )}
    </View>
  );
}
