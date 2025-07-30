import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Cast({ cast }) {
  const navigation = useNavigation();
  const imageBaseURL = "https://image.tmdb.org/t/p/w185"; // 

  return (
    <View className="my-6">
      <Text className="text-white text-2xl mx-4 mb-2">Top Cast</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {cast?.map((person, index) => {
          const personName = person?.name || 'Unknown';
          const characterName = person?.character || '';
          const profileImage = person?.profile_path
            ? { uri: `${imageBaseURL}${person.profile_path}` }
            : require('../assets/images/images.jpg'); 

          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('Person', person)}
              className="mr-3 items-center"
            >
              <Image
                source={profileImage}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                }}
              />
              <Text className="text-neutral-200 text-xs text-center mt-1">
                {personName.length > 10 ? personName.slice(0, 10) + '...' : personName}
              </Text>
              {characterName !== '' && (
                <Text className="text-neutral-400 text-xs text-center">
                  {characterName.length > 12 ? characterName.slice(0, 12) + '...' : characterName}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
