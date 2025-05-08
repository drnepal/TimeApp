import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Animated
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment-timezone';
import { Swipeable } from 'react-native-gesture-handler';
import Flag from 'react-native-flags';
import LayoutWrapper from '../components/LayoutWrapper';
import UnitToggleButton from '../components/UnitToggleButton';
import { useUnit } from '../context/UnitContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WEATHER_API_KEY, TIMEZONEDB_API_KEY, GEODB_API_KEY } from '@env';

type City = {
  id: string;
  name: string;
  fullName: string;
  countryCode: string;
  timezone: string;
  lat: number;
  lng: number;
  tempC: number;
  enabled: boolean;
};

const WorldClockScreen = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [currentTime, setCurrentTime] = useState(moment().utc());
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { unit } = useUnit();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(moment().utc()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadCities = async () => {
      const stored = await AsyncStorage.getItem('worldClockCities');
      if (stored) setCities(JSON.parse(stored));
    };
    loadCities();
  }, []);

  const saveCities = async (updated: City[]) => {
    await AsyncStorage.setItem('worldClockCities', JSON.stringify(updated));
    setCities(updated);
  };

  const fetchSuggestions = async (query: string) => {
    if (!query) return;
    try {
      const res = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities`, {
        params: { namePrefix: query, limit: 5 },
        headers: {
          'X-RapidAPI-Key': GEODB_API_KEY,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      });
      setSuggestions(res.data.data);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } catch (err) {
      console.log('City search error (hidden from user)');
    }
  };

  const addCity = async (city: any) => {
    const exists = cities.find((c) => c.id === city.id.toString());
    if (exists) {
      setSearchText('');
      setSuggestions([]);
      return;
    }

    try {
      const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          lat: city.latitude,
          lon: city.longitude,
          appid: WEATHER_API_KEY,
          units: 'metric',
        },
      });

      const tzRes = await axios.get(`https://api.timezonedb.com/v2.1/get-time-zone`, {
        params: {
          key: TIMEZONEDB_API_KEY,
          format: 'json',
          by: 'position',
          lat: city.latitude,
          lng: city.longitude,
        },
      });

      const newCity: City = {
        id: city.id.toString(),
        name: city.city,
        fullName: `${city.city}, ${city.country}`,
        countryCode: city.countryCode,
        timezone: tzRes.data.zoneName,
        lat: city.latitude,
        lng: city.longitude,
        tempC: weatherRes.data.main.temp,
        enabled: true,
      };

      const updated = [...cities, newCity];
      saveCities(updated);
      setSearchText('');
      setSuggestions([]);
    } catch (err) {
      console.log('City add error (hidden from user)');
    }
  };

  const deleteCity = (id: string) => {
    const updated = cities.filter(c => c.id !== id);
    saveCities(updated);
  };

  const toggleCity = (id: string) => {
    const updated = cities.map(c =>
      c.id === id ? { ...c, enabled: !c.enabled } : c
    );
    saveCities(updated);
  };

  const convertTemp = (celsius?: number) => {
    if (typeof celsius !== 'number') return '--';
    return unit === 'celsius'
      ? `${celsius.toFixed(1)}°C`
      : `${((celsius * 9) / 5 + 32).toFixed(1)}°F`;
  };

  const renderCityItem = (city: City) => (
    <Swipeable
      key={city.id}
      renderRightActions={() => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteCity(city.id)}>
          <Text style={{ color: '#fff' }}>Delete</Text>
        </TouchableOpacity>
      )}
    >
      <TouchableOpacity
        style={styles.cityItem}
        onLongPress={() => toggleCity(city.id)}
      >
        <Flag code={city.countryCode} size={32} />
        <View style={styles.cityInfo}>
          <Text style={styles.cityName}>{city.fullName}</Text>
          <Text style={styles.tempText}>{convertTemp(city.tempC)}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{currentTime.tz(city.timezone).format('HH:mm:ss')}</Text>
          <Text style={styles.gmtText}>
            {`GMT${currentTime.tz(city.timezone).utcOffset() / 60}`}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <LayoutWrapper type="clock">
      <View style={styles.headerRow}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a city..."
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              fetchSuggestions(text);
            }}
          />
        </View>
        <UnitToggleButton />
      </View>

      {suggestions.length > 0 && (
        <TouchableOpacity activeOpacity={1} onPress={() => setSuggestions([])}>
          <Animated.View style={[styles.dropdown, { opacity: fadeAnim }]}>
            {suggestions.map((sug) => (
              <TouchableOpacity
                key={sug.id}
                onPress={() => addCity(sug)}
                style={styles.dropdownItem}
              >
                <Text>{`${sug.city}, ${sug.region}, ${sug.country}`}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </TouchableOpacity>
      )}

      <ScrollView>{cities.map(renderCityItem)}</ScrollView>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    gap: 8,
  },
  searchWrapper: {
    flex: 1,
    position: 'relative',
  },
  searchInput: {
    fontSize: 16,
    paddingLeft: 30,
    paddingRight: 10,
    paddingVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    left: 8,
    zIndex: 10,
  },
  dropdown: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 8,
  },
  cityInfo: {
    flex: 1,
    marginLeft: 16,
  },
  cityName: {
    fontSize: 18,
    fontWeight: '600',
  },
  tempText: {
    fontSize: 16,
    color: '#2196F3',
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 18,
    fontWeight: '500',
  },
  gmtText: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    padding: 20,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default WorldClockScreen;
