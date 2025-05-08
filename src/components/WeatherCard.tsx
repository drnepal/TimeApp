import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUnit } from '../context/UnitContext';

type WeatherProps = {
  weather: any;
  isDaytime: boolean;
  location: string;
};

const WeatherCard = ({ weather, isDaytime, location }: WeatherProps) => {
  const navigation = useNavigation();
  const { unit, toggleUnit } = useUnit();

  const temp = unit === 'celsius'
    ? `${weather.main.temp.toFixed(1)}°C`
    : `${((weather.main.temp * 9) / 5 + 32).toFixed(1)}°F`;

  const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  const handlePress = () => {
    navigation.navigate('WeatherDetails' as never, {
      lat: weather.coord.lat,
      lon: weather.coord.lon,
      location,
    } as never);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.city}>{location}</Text>
          <TouchableOpacity onPress={toggleUnit} style={styles.toggleButton}>
            <Text style={styles.toggleText}>
              {unit === 'celsius' ? 'Switch to °F' : 'Switch to °C'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Image source={{ uri: icon }} style={styles.icon} />
          <Text style={styles.temp}>{temp}</Text>
        </View>

        <View style={styles.detailsRow}>
          <Text>🌬️ {weather.wind.speed} m/s</Text>
          <Text>💧 {weather.main.humidity}%</Text>
          <Text>
            ☀️ Sunset:{' '}
            {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0f7fa',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: -1,
    marginTop: -2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  toggleButton: {
    padding: 4,
    backgroundColor: '#eee',
    borderRadius: 6,
  },
  toggleText: {
    fontSize: 12,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  temp: {
    fontSize: 32,
    fontWeight: '600',
    color: '#333',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    flexWrap: 'wrap',
  },
});

export default WeatherCard;
