import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const API_KEY = "015ede50e352d45d218acf05d48a6f05"; // Replace with your OpenWeather API key
const CHICAGO_COORDS = { latitude: 41.8781, longitude: -87.6298 };

const HomeScreen: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${CHICAGO_COORDS.latitude}&lon=${CHICAGO_COORDS.longitude}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch weather data.");
        Alert.alert("Error", "Unable to fetch weather data");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  const convertTimestampToTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <Text style={styles.headerText}>Chicago Weather</Text>

          <View style={styles.weatherCard}>
            {/* Temperature */}
            <Text style={styles.tempText}>{weather?.main.temp.toFixed(1)}°C</Text>

            {/* Weather Icon */}
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`,
              }}
              style={styles.weatherIcon}
            />

            {/* Weather Details */}
            <View style={styles.details}>
              {/* Wind Speed */}
              <View style={styles.detailItem}>
                <MaterialCommunityIcons name="weather-windy" size={30} color="#fff" />
                <Text style={styles.detailText}>{weather?.wind.speed} m/s</Text>
              </View>

              {/* Humidity */}
              <View style={styles.detailItem}>
                <FontAwesome name="tint" size={30} color="#fff" />
                <Text style={styles.detailText}>{weather?.main.humidity}%</Text>
              </View>

              {/* Sunrise */}
              <View style={styles.detailItem}>
                <Ionicons name="sunny-outline" size={30} color="#fff" />
                <Text style={styles.detailText}>{convertTimestampToTime(weather?.sys.sunrise)}</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  weatherCard: {
    width: "90%",
    padding: 20,
    backgroundColor: "#3498db",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  tempText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  weatherIcon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  detailItem: {
    alignItems: "center",
  },
  detailText: {
    color: "#fff",
    marginTop: 5,
    fontSize: 14,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default HomeScreen;
