import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  // Import icons from FontAwesome
import axios from 'axios';

const HomeScreen: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);

  // Chicago's coordinates (latitude, longitude)
  const chicagoCoordinates = {
    latitude: 41.8781,
    longitude: -87.6298,
  };

  // Fetch weather for Chicago
  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=015ede50e352d45d218acf05d48a6f05
&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      Alert.alert('Error', 'Unable to fetch weather data');
    }
  };

  useEffect(() => {
    fetchWeather(chicagoCoordinates.latitude, chicagoCoordinates.longitude); // Fetch Chicago weather data
  }, []);

  const convertTimestampToTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    return date.toLocaleTimeString(); // Return formatted time
  };

  return (
    <View style={styles.container}>
      {/* Home Page */}
      <View style={styles.homePage}>
        <Text style={styles.headerText}>Chicago Weather</Text>

        {/* Weather Card */}
        <View style={styles.weatherCard}>
          {/* Weather Icon */}
          <Icon name="cloud-sun" size={50} color="#fff" />

          <Text style={styles.weatherText}>
            {weather ? `${weather.main.temp}°C` : 'Loading...'}
          </Text>

          <Text style={styles.cityText}>
            {weather ? weather.name : 'Chicago'}
          </Text>

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
                {weather
                  ? convertTimestampToTime(weather.sys.sunrise)
                  : 'Loading...'}
              </Text>
            </View>
          </View>
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
    backgroundColor: '#ADD8E6', // Light blue background for the card
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
    justifyContent: 'space-between',
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
});

export default HomeScreen;
