import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const DocumentCard = ({
  title,
  status,
  statusIcon,
  statusColor,
  date,
  className = '',
  index = 0, // optional: for staggered animation
}) => {
  const slideAnim = useRef(new Animated.Value(20)).current; // start 20px below
  const fadeAnim = useRef(new Animated.Value(0)).current; // start invisible

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      friction: 6,
      tension: 80,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 150, // stagger cards if multiple
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
        opacity: fadeAnim,
      }}
    >
      <View
        className={`bg-teal-700 rounded-lg p-4 flex-row justify-between items-center shadow-md overflow-hidden ${className}`}
      >
        {/* Decorative SVG Swoosh */}
        <View
          style={{
            position: 'absolute',
            top: 20,
            left: 0,
            right: 0,
            height: 40,
            zIndex: 0,
          }}
        >
          <Svg height="40" width="100%">
            <Path
              d="M2,80 Q70,0 700,40"
              stroke="white"
              strokeWidth={5}
              fill="none"
              opacity={0.7}
            />
          </Svg>
        </View>

        <View style={{ zIndex: 1, flex: 1 }}>
          <Text className="text-white font-bold text-lg">{title}</Text>
          <View className="flex-row items-center mt-1">
            <Text className={`${statusColor} font-semibold mr-2`}>
              {statusIcon} {status}
            </Text>
          </View>
          <Text className="text-white mt-1">Date: {date}</Text>
        </View>

        <TouchableOpacity
          className="bg-white px-3 py-1 rounded-lg"
          style={{ zIndex: 1 }}
        >
          <Text className="text-black font-semibold">Documents</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default DocumentCard;
