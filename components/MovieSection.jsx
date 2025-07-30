import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function MovieSection({ title, data }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.push("Movie", item)}
      className="flex-row items-center mb-4"
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w185${item.poster_path}` }}
        className="w-24 h-36 rounded-lg mr-4"
      />
      <Text className="text-lg font-semibold text-white flex-1">
        {item.title?.length > 25 ? item.title.slice(0, 25) + '...' : item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="mb-6 px-4">
      <Text className="text-xl font-bold text-white mb-4">{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />
    </View>
  );
}
