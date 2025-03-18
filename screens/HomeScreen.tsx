import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const API_KEY = '015ede50e352d45d218acf05d48a6f05'; // 🔒 Replace with your OpenWeatherMap API key
const CHICAGO_COORDS = { latitude: 41.8781, longitude: -87.6298 };

const HomeScreen: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (response.data) {
        setWeather(response.data);
        setError(null);
      } else {
        setError('No weather data available.');
      }
    } catch (err) {
      setError('Failed to fetch weather data.');
      Alert.alert('Error', 'Unable to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(CHICAGO_COORDS.latitude, CHICAGO_COORDS.longitude);
  }, []);

  const convertTimestampToTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.homePage}>
        <Text style={styles.headerText}>Chicago Weather</Text>

        <View style={styles.weatherCard}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <>
              {/* Dynamic Weather Icon */}
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`,
                }}
                style={styles.weatherIcon}
              />

              <Text style={styles.weatherText}>
                {weather ? `${weather.main.temp.toFixed(1)}°C` : 'Loading...'}
              </Text>

              <Text style={styles.cityText}>{weather?.name || 'Chicago'}</Text>

              <View style={styles.weatherDetails}>
                {/* Wind Speed */}
                <View style={styles.weatherDetail}>
                  <Icon name="wind" size={30} color="#fff" />
                  <Text style={styles.weatherDetailText}>
                    {weather ? `${weather.wind.speed} m/s` : 'Loading...'}
                  </Text>
                </View>

                {/* Humidity */}
                <View style={styles.weatherDetail}>
                  <Icon name="tint" size={30} color="#fff" />
                  <Text style={styles.weatherDetailText}>
                    {weather ? `${weather.main.humidity}%` : 'Loading...'}
                  </Text>
                </View>

                {/* Sunrise */}
                <View style={styles.weatherDetail}>
                  <Icon name="sun" size={30} color="#fff" />
                  <Text style={styles.weatherDetailText}>
                    {weather ? convertTimestampToTime(weather.sys.sunrise) : 'Loading...'}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff', // Light blue background
  },
  homePage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  weatherCard: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ADD8E6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  weatherText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  cityText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 15,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  weatherDetail: {
    alignItems: 'center',
  },
  weatherDetailText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 14,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default HomeScreen;
