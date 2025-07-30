import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { imageBaseUrl } from '../assets/constants';

const { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View style={{ marginBottom: 32 }}>
      <Text className="text-3xl text-white p-2 ms-2 font-bold">Trending</Text>

      <Carousel
        loop
        width={width}
        height={height * 0.4}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => <MovieCard item={item} onPress={handleClick} />}
      />
    </View>
  );
}

const MovieCard = ({ item, onPress }) => {
  const imageUrl = item.poster_path
    ? { uri: `${imageBaseUrl}${item.poster_path}` }
    : null; 

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <Image
        source={imageUrl}
        style={{
          width: width * 0.9,
          height: height * 0.4,
          alignSelf: 'center',
          borderRadius: 20,
        }}
        className="rounded-3xl"
      />
    </TouchableOpacity>
  );
};

