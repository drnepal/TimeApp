import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopNavBar from '../components/TopNavBar';
import ClockNavBar from '../components/ClockNavBar'; // ⬅️ Use correct relative path

const ClockScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <TopNavBar showBack={true} showHome={true} />
      <View style={styles.container}>
        <Text style={styles.text}>Clock Content Here</Text>
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
  },
  text: {
    fontSize: 16,
  },
});

export default ClockScreen;
