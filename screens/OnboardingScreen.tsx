import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get full screen dimensions
const { width, height } = Dimensions.get('window');

// Use `require()` to load images correctly in React Native
const onboardingImages = [
  require('../assets/intro1.jpeg'),
  require('../assets/intro2.jpeg'),
  require('../assets/intro3.jpeg'),
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentIndex < onboardingImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleDone(); // If it's the last image, go to AuthScreen
    }
  };

  const handleDone = async () => {
    await AsyncStorage.setItem('firstLaunch', 'false');
    navigation.replace('Auth'); // Navigate to Auth Screen
  };

  return (
    <View style={styles.container}>
      {/* Full-Screen Image */}
      <Image source={onboardingImages[currentIndex]} style={styles.image} resizeMode="cover" />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {currentIndex < onboardingImages.length - 1 ? (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.authButtonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.authButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.guestButton} onPress={() => navigation.replace('Home')}>
              <Text style={styles.guestText}>Continue as Guest</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,  // Full width
    height: height, // Full height
    position: 'absolute',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  authButton: {
    backgroundColor: '#28A745', // Green button for Sign In / Sign Up
    paddingVertical: 12,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  guestButton: {
    marginTop: 15,
  },
  guestText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
