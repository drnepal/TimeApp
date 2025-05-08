import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import TopNavBar from "../components/TopNavBar";
import axios from "axios";
import { WEATHER_API_KEY, NEWS_API_KEY } from '@env'; // ✅ imported from .env

const ExpandedWeatherScreen = ({ route }) => {
  const { weather, location } = route.params;
  const [forecast, setForecast] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchForecast();
    fetchNews();
  }, []);

  const fetchForecast = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&appid=${WEATHER_API_KEY}`;
      const res = await axios.get(url);
      setForecast(res.data);
    } catch (err) {
      console.error("Error fetching forecast:", err.message);
    }
  };

  const fetchNews = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;
      const res = await axios.get(url);
      setNews(res.data.articles.slice(0, 5));
    } catch (err) {
      console.error("Error fetching news:", err.message);
    }
  };

  if (!forecast || news.length === 0)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={{ flex: 1 }}>
      <TopNavBar showBack={true} showHome={true} />
      <ScrollView style={styles.container}>
        <Text style={styles.location}>{location}</Text>

        <Text style={styles.title}>Hourly Forecast</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {forecast.list.slice(0, 8).map((item, idx) => (
            <View key={idx} style={styles.forecastItem}>
              <Text>{new Date(item.dt * 1000).getHours()}:00</Text>
              <Text>{Math.round(item.main.temp)}°C</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.title}>7-Day Forecast</Text>
        {forecast.list.filter((_, idx) => idx % 8 === 0).map((day, idx) => (
          <View key={idx} style={styles.forecastDay}>
            <Text>{new Date(day.dt * 1000).toDateString()}</Text>
            <Text>{Math.round(day.main.temp)}°C</Text>
          </View>
        ))}

        <Text style={styles.title}>Today's News Headlines</Text>
        {news.map((article, idx) => (
          <Text key={idx} style={styles.headline}>• {article.title}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  forecastItem: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  forecastDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headline: {
    paddingVertical: 5,
  },
});

export default ExpandedWeatherScreen;
