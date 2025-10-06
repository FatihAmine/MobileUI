import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import StudentDashboard from '../StudentScreen';
import DocumentsScreen from '../DocumentsScreen';
import RequestsScreen from '../RequestsScreen';
import NotificationsScreen from '../NotificationsScreen';
import ProfileScreen from '../ProfileScreen';

const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'Accueil', icon: 'home-outline', activeIcon: 'home' },
  { name: 'Demandes', icon: 'file-tray-full-outline', activeIcon: 'file-tray-full' },
  { name: 'Documents', icon: 'document-text-outline', activeIcon: 'document-text' },
  { name: 'Notifications', icon: 'notifications-outline', activeIcon: 'notifications' },
  { name: 'Profil', icon: 'person-outline', activeIcon: 'person' },
];

function StudentTabBar({ state, navigation }: BottomTabBarProps) {
  const { width } = Dimensions.get('window');
  const tabWidth = (width - 48) / TABS.length; // width of one tab
  const iconSize = 26;
  const pillSize = iconSize + 28;

  const translateX = useRef(
    new Animated.Value(state.index * tabWidth + tabWidth / 2 - pillSize / 2)
  ).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * tabWidth + tabWidth / 2 - pillSize / 2,
      useNativeDriver: true,
      speed: 12,
      bounciness: 8,
    }).start();
  }, [state.index]);

  return (
    <View
      className="flex-row justify-between px-3 py-3 bg-gray-200 rounded-full mx-3 items-center relative"
      style={{
        height: 70,
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {/* Floating pill */}
      <Animated.View
        style={{
          position: 'absolute',
          width: pillSize,
          height: pillSize,
          top: (70 - pillSize) / 2,
          left: 12,
          borderRadius: pillSize / 2,
          backgroundColor: '#008080',
          transform: [{ translateX }],
          shadowColor: '#008080',
          shadowOpacity: 0.3,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
        }}
      />

      {state.routes.map((route, index) => {
        const tab = TABS.find(t => t.name === route.name);
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => !isFocused && navigation.navigate(route.name)}
            activeOpacity={0.8}
            className="flex-1 justify-center items-center h-14"
          >
            <Ionicons
              name={isFocused ? (tab?.activeIcon as any) : (tab?.icon as any)}
              size={iconSize}
              color={isFocused ? 'white' : '#374151'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function StudentTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: 'transparent' },
      }}
      tabBar={props => <StudentTabBar {...props} />}
    >
      <Tab.Screen name="Accueil" component={StudentDashboard} />
      <Tab.Screen name="Demandes" component={RequestsScreen} />
      <Tab.Screen name="Documents" component={DocumentsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
