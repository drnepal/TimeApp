import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import LayoutWrapper from '../components/LayoutWrapper';
import { WEATHER_API_KEY } from '@env';

const screenWidth = Dimensions.get('window').width;

const getWeatherIcon = (main: string) => {
  switch (main.toLowerCase()) {
    case 'rain': return '🌧️';
    case 'clouds': return '☁️';
    case 'snow': return '❄️';
    case 'clear': return '☀️';
    case 'thunderstorm': return '⛈️';
    case 'drizzle': return '🌦️';
    case 'mist':
    case 'haze':
    case 'fog': return '🌫️';
    default: return '🌈';
  }
};

const WeatherDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { lat, lon, location } = route.params as {
    lat: number;
    lon: number;
    location: string;
  };

  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForecast();
  }, []);

  const fetchForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
      );
      setForecast(response.data);
    } catch (error) {
      console.error('Forecast fetch error:', error);
      Alert.alert('Error', 'Failed to load forecast.', [
        { text: 'OK', onPress: () => navigation.navigate('Home' as never) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const hourlyData = forecast?.list?.slice(0, 12);
  const hourlyTemps = hourlyData?.map((h: any) => h.main.temp) || [];
  const hourlyLabels = hourlyData?.map((h: any) => `${new Date(h.dt * 1000).getHours()}h`) || [];

  const dailyData = forecast?.list
    ?.filter((_item: any, index: number) => index % 8 === 0)
    .slice(0, 7);

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
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{location} - Next 12 Hours</Text>

        {hourlyTemps.length > 0 && (
          <LineChart
            data={{
              labels: hourlyLabels,
              datasets: [{ data: hourlyTemps }],
            }}
            width={screenWidth - 32}
            height={220}
            yAxisSuffix="°C"
            chartConfig={{
              backgroundColor: '#f5f5f5',
              backgroundGradientFrom: '#e0f7fa',
              backgroundGradientTo: '#b2ebf2',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: () => '#333',
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#2196F3',
              },
            }}
            style={styles.chart}
          />
        )}

        <Text style={styles.title}>7-Day Forecast</Text>

        {dailyData?.map((day: any, index: number) => {
          const date = new Date(day.dt * 1000);
          const sunrise = new Date(day.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const sunset = new Date(day.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <View key={index} style={styles.dayCard}>
              <Text style={styles.date}>{date.toDateString()}</Text>
              <Text style={styles.icon}>{getWeatherIcon(day.weather[0].main)} {day.weather[0].description}</Text>
              <Text style={styles.temp}>🌡️ High: {day.main.temp_max.toFixed(1)}°C | Low: {day.main.temp_min.toFixed(1)}°C</Text>
              <Text style={styles.precip}>💧 Precipitation: {(day.pop * 100).toFixed(0)}%</Text>
              <Text style={styles.sun}>🌅 Sunrise: {sunrise} | 🌇 Sunset: {sunset}</Text>
            </View>
          );
        })}
      </ScrollView>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '600', marginVertical: 10, color: '#333' },
  chart: { borderRadius: 12, marginBottom: 16 },
  dayCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  icon: {
    fontSize: 18,
    marginTop: 4,
    color: '#555',
  },
  temp: {
    fontSize: 16,
    marginVertical: 4,
    fontWeight: '500',
  },
  precip: {
    fontSize: 14,
    color: '#2196F3',
    marginBottom: 2,
  },
  sun: {
    fontSize: 13,
    color: '#777',
  },
});

export default WeatherDetailsScreen;
