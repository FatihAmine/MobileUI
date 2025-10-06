import React from 'react';
import { View, Text } from 'react-native';

const NotificationPreview = ({ icon, text, date }) => (
  <View className="flex-row items-center bg-white rounded-lg p-3 shadow-md mb-2">
    <Text className="text-xl mr-3">{icon}</Text>
    <View>
      <Text className="text-black font-semibold">{text}</Text>
      <Text className="text-xs text-gray-500">{date}</Text>
    </View>
  </View>
);

export default NotificationPreview;
