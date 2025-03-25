import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopNavBar from './components/TopNavBar';
import BottomNavBar from './components/BottomNavBar';

const ClockScreen = () => {
  return (
    <View style={styles.container}>
      <TopNavBar />

      <View style={styles.content}>
        <Text style={styles.heading}>🕒 Clock Features</Text>
        <Text style={styles.subtext}>Alarm, Timer, World Clock & more coming soon.</Text>
      </View>

      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60, // space for bottom navbar
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#555',
  },
});

export default ClockScreen;
