import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const QuickActionButton = ({ label, icon, onPress }) => (
  <TouchableOpacity
    className="flex-row items-center bg-blue-600 py-2 px-4 rounded-xl mb-3 shadow-md"
    onPress={onPress}
  >
    <Text className="text-white mr-2 text-xl">{icon}</Text>
    <Text className="text-white font-semibold">{label}</Text>
  </TouchableOpacity>
);

export default QuickActionButton;
