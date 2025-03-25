import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

const Timer = () => {
  const [input, setInput] = useState('60');
  const [time, setTime] = useState(60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    setTime(parseInt(input));
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stop = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const reset = () => {
    stop();
    setTime(parseInt(input));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        keyboardType="numeric"
        editable={!running}
      />
      <Text style={styles.timeText}>{time}s</Text>
      <View style={styles.buttons}>
        <Button title="Start" onPress={start} disabled={running} />
        <Button title="Stop" onPress={stop} disabled={!running} />
        <Button title="Reset" onPress={reset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 80,
    height: 40,
    textAlign: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  timeText: { fontSize: 40, fontWeight: 'bold', marginBottom: 20 },
  buttons: { flexDirection: 'row', gap: 10 },
});

export default Timer;
