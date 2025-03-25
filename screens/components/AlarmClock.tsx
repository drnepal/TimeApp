import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const AlarmClock = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏰ Alarm Clock</Text>
      <Text style={styles.subtitle}>You have no alarms set.</Text>
      <Button title="Add Alarm" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20 },
});

export default AlarmClock;
