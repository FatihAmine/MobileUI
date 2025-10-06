import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete?: () => void;
  useCustomLogo?: boolean;
  logoSource?: any; // Image source for custom logo
}

const SplashScreen = ({ 
  onAnimationComplete, 
  useCustomLogo = false, 
  logoSource 
}: SplashScreenProps) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulse animation for loading dots
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    // Start animations sequence
    const startAnimations = () => {
      pulseAnimation.start();

      // Logo entrance animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        // Subtle logo rotation
        Animated.timing(logoRotateAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Wait a bit then call completion callback
        setTimeout(() => {
          pulseAnimation.stop();
          onAnimationComplete?.();
        }, 1800);
      });
    };

    startAnimations();
  }, [fadeAnim, scaleAnim, slideAnim, logoRotateAnim, pulseAnim, onAnimationComplete]);

  const logoRotation = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-8deg', '0deg'],
  });

  return (
    <View className="flex-1">
      <StatusBar style="light" backgroundColor="#0d9488" />
      
      {/* Background with gradient */}
      <LinearGradient
        colors={['#14b8a6', '#0d9488', '#0f766e']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 justify-center items-center relative"
      >
        
        {/* Background decorative elements */}
        <View className="absolute inset-0">
          {/* Animated circles */}
          <Animated.View
            style={{
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.1],
              }),
            }}
            className="absolute top-16 right-8 w-40 h-40 bg-white rounded-full"
          />
          <Animated.View
            style={{
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.05],
              }),
            }}
            className="absolute bottom-24 left-4 w-32 h-32 bg-white rounded-full"
          />
          <Animated.View
            style={{
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.08],
              }),
            }}
            className="absolute top-1/3 left-8 w-20 h-20 bg-white rounded-full"
          />
          
          {/* Subtle pattern overlay */}
          <View className="absolute inset-0 bg-black/5" />
        </View>

        {/* Main content container */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim },
            ],
          }}
          className="items-center justify-center z-10"
        >
          
          {/* Logo section */}
          <Animated.View
            style={{
              transform: [{ rotate: logoRotation }],
            }}
            className="items-center mb-8"
          >
            {useCustomLogo && logoSource ? (
              // Custom logo image
              <View className="mb-6 p-4 bg-white/10 rounded-3xl backdrop-blur-sm">
                <Image
                  source={require('../../assets/Login_Images/Logo.png')} 
                  className="w-24 h-24"
                  resizeMode="contain"
                  style={{ tintColor: 'white' }}
                />
              </View>
            ) : (
              // Default stylized Y logo
              <View className="relative mb-6">
                <View className="items-center justify-center w-28 h-28 bg-white/15 rounded-3xl backdrop-blur-sm border border-white/20">
                  <Text className="text-white text-6xl font-bold tracking-wide">
                    Y
                  </Text>
                </View>
                {/* Accent elements */}
                <View className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full shadow-lg" />
                <View className="absolute -bottom-1 -left-1 w-3 h-3 bg-white/80 rounded-full" />
              </View>
            )}
          </Animated.View>

          {/* Brand text */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim.interpolate({
                  inputRange: [0, 50],
                  outputRange: [0, 25],
                }) }
              ],
            }}
            className="items-center"
          >
            <Text className="text-white text-4xl font-bold tracking-widest mb-2 drop-shadow-lg">
              YNOV
            </Text>
            <Text className="text-white/95 text-xl font-light tracking-wider mb-1">
              CAMPUS
            </Text>
            
            {/* Underline accent */}
            <View className="w-16 h-0.5 bg-white/60 mt-2 rounded-full" />
          </Animated.View>

          {/* Tagline */}
          <Animated.View
            style={{
              opacity: fadeAnim.interpolate({
                inputRange: [0, 0.8, 1],
                outputRange: [0, 0, 1],
              }),
            }}
            className="mt-8 px-8"
          >
            <Text className="text-white/85 text-base font-light tracking-wide text-center leading-6">
              Gérez facilement vos documents et demandes scolaires
            </Text>
            <Text className="text-white/70 text-sm font-light tracking-wide text-center mt-1">
              Rapide • Sécurisé • Intuitif
            </Text>
          </Animated.View>
        </Animated.View>

        {/* Loading indicator */}
        <Animated.View
          style={{ 
            opacity: fadeAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, 0, 1],
            }),
          }}
          className="absolute bottom-16 flex-row space-x-3"
        >
          {[0, 1, 2].map((index) => (
            <Animated.View
              key={index}
              style={{
                opacity: pulseAnim,
                transform: [{
                  scale: pulseAnim.interpolate({
                    inputRange: [0.5, 1],
                    outputRange: [0.8, 1],
                  })
                }]
              }}
            >
              <View 
                className="w-2.5 h-2.5 bg-white/70 rounded-full"
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              />
            </Animated.View>
          ))}
        </Animated.View>

        {/* Bottom accent bar */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            scaleX: fadeAnim,
          }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"
        />
        
        {/* Corner accents */}
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="absolute top-0 left-0 w-12 h-12"
        >
          <View className="absolute top-4 left-4 w-4 h-0.5 bg-white/30 rounded-full" />
          <View className="absolute top-4 left-4 w-0.5 h-4 bg-white/30 rounded-full" />
        </Animated.View>
        
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="absolute bottom-0 right-0 w-12 h-12"
        >
          <View className="absolute bottom-4 right-4 w-4 h-0.5 bg-white/30 rounded-full" />
          <View className="absolute bottom-4 right-4 w-0.5 h-4 bg-white/30 rounded-full" />
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;

