import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WorldClock = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌍 World Clock</Text>
      <Text style={styles.subtitle}>Feature coming soon...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16 },
});

export default WorldClock;
