import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopNavBar from '../components/TopNavBar'; // ⬅️ Shows back + home
import ClockNavBar from '../components/ClockNavBar'; // ⬅️ Bottom nav for clock features

const TimerScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <TopNavBar showBack={true} showHome={true} />

      <View style={styles.container}>
        <Text style={styles.text}>This is the Timer Screen</Text>
      </View>

      <ClockNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default TimerScreen;
