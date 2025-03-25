import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => setTime(prev => prev + 1), 1000);
    }
  };

  const stop = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{time}s</Text>
      <View style={styles.buttons}>
        <Button title="Start" onPress={start} />
        <Button title="Stop" onPress={stop} />
        <Button title="Reset" onPress={reset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  timeText: { fontSize: 48, fontWeight: 'bold', marginBottom: 20 },
  buttons: { flexDirection: 'row', gap: 10 },
});

export default Stopwatch;
