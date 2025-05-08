import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UnitProvider } from './src/context/UnitContext';

// Screens
import OnboardingScreen from './src/screens/OnboardingScreen';
import OnboardingUserAwareness from './src/screens/OnboardingUserAwerness';
import OnboardingUserInfo from './src/screens/OnboardingUserInfo';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ClockScreen from './src/screens/ClockScreen';
import TimerScreen from './src/screens/TimerScreen';
import StopwatchScreen from './src/screens/StopwatchScreen';
import WorldClockScreen from './src/screens/WorldClockScreen';
import AlarmEditorScreen from './src/screens/AlarmEditorScreen';
import ExpandedWeatherScreen from './src/screens/ExpandedWeatherScreen';
import SleepScreen from './src/screens/SleepScreen';
import WeatherDetailsScreen from './src/screens/WeatherDetailsScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  OnboardingUserAwareness: undefined;
  OnboardingUserInfo: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Clock: undefined;
  Timer: undefined;
  Stopwatch: undefined;
  WorldClock: undefined;
  AlarmEditor: { alarmId: string };
  ExpandedWeather: { city: string };
  Sleep: undefined;
  WeatherDetails: { city: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="OnboardingUserAwareness" component={OnboardingUserAwareness} />
        <Stack.Screen name="OnboardingUserInfo" component={OnboardingUserInfo} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Clock" component={ClockScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} />
        <Stack.Screen name="Stopwatch" component={StopwatchScreen} />
        <Stack.Screen name="WorldClock" component={WorldClockScreen} />
        <Stack.Screen name="ExpandedWeather" component={ExpandedWeatherScreen} />
        <Stack.Screen name="Sleep" component={SleepScreen} />
        <Stack.Screen name="WeatherDetails" component={WeatherDetailsScreen} />
        <Stack.Screen 
          name="AlarmEditor" 
          component={AlarmEditorScreen}
          options={{ 
            headerShown: true,
            headerTitle: 'Edit Alarm',
            headerStyle: { backgroundColor: '#1a1a1a' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '600', fontSize: 20 },
          }}
        />
      </Stack.Navigator>
    </>
  );
};

const App = () => (
  <UnitProvider>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  </UnitProvider>
);

export default App;
