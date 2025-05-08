import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LayoutWrapper from '../components/LayoutWrapper';
import WeatherCard from '../components/WeatherCard';
import UpcomingAlarmsCard from '../components/UpcomingAlarmsCard';
import { WEATHER_API_KEY } from '@env';

const CHICAGO_COORDS = { latitude: 41.8781, longitude: -87.6298 };

const HomeScreen = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDaytime, setIsDaytime] = useState(true);
  const [bedtime, setBedtime] = useState<Date | null>(null);

  useEffect(() => {
    fetchWeather();
    loadBedtime();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${CHICAGO_COORDS.latitude}&lon=${CHICAGO_COORDS.longitude}&units=metric&appid=${WEATHER_API_KEY}`
      );
      setWeather(response.data);
      checkDayNight(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Weather Error:', err);
      setError('Failed to fetch weather data.');
      Alert.alert('Error', 'Could not load weather data.');
      setLoading(false);
    }
  };

  const checkDayNight = (data) => {
    const now = Date.now() / 1000;
    setIsDaytime(now > data.sys.sunrise && now < data.sys.sunset);
  };

  const loadBedtime = async () => {
    const stored = await AsyncStorage.getItem('bedtime');
    if (stored) {
      setBedtime(new Date(stored));
    }
  };

  if (loading) {
    return (
      <LayoutWrapper navBarType="default">
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper navBarType="default">
      <View style={styles.page}>
        <View style={styles.topRow}>
          <View style={styles.leftCard}>
            {weather && (
              <WeatherCard
                weather={weather}
                isDaytime={isDaytime}
                location="Chicago"
                showToggle={true}
              />
            )}
          </View>
          {bedtime && (
            <View style={styles.rightCard}>
              <View style={styles.bedtimeCard}>
                <Text style={styles.bedtimeLabel}>Bedtime</Text>
                <Text style={styles.bedtimeText}>
                  {new Date(bedtime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.alarmsContainer}>
          <UpcomingAlarmsCard />
        </View>
      </View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 30, // adds top spacing
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 20,
    
  },
  leftCard: {
    flex: 1,
    marginRight: 8,
  },
  rightCard: {
    width: 140,
  },
  bedtimeCard: {
    backgroundColor: '#FFF9C4',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bedtimeLabel: {
    fontSize: 16,
    color: '#FF9800',
    fontWeight: '600',
  },
  bedtimeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  alarmsContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
