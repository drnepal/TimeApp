import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ClockScreen from './src/screens/ClockScreen';

import { AuthProvider, useAuth } from './src/screens/AuthContext';

// Define screen params
export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Clock: undefined;
};

// Create stack
const Stack = createStackNavigator<RootStackParamList>();

// Navigator
const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, // ✅ This hides the default top title bar (no more “Home” or “Clock” on top)
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Clock" component={ClockScreen} />
    </Stack.Navigator>
  );
};

// Root App
const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

// Export wrapped in AuthProvider
export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
