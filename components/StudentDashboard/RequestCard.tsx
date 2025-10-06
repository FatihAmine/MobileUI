import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RequestCard = ({ title, status, statusColor, statusIcon, date }) => (
  <View className="bg-indigo-700 rounded-lg p-4 mb-4 flex-row justify-between items-center shadow-md">
    <View>
      <Text className="text-white font-bold text-lg">{title}</Text>
      <View className="flex-row items-center mt-1">
        <Text className={`${statusColor} font-semibold mr-2`}>
          {statusIcon} {status}
        </Text>
      </View>
      <Text className="text-white mt-1">Date: {date}</Text>
    </View>
    <TouchableOpacity className="bg-white px-3 py-1 rounded-lg">
      <Text className="text-black font-semibold">Voir</Text>
    </TouchableOpacity>
  </View>
);

export default RequestCard;
