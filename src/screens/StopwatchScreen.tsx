import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import LayoutWrapper from '../components/LayoutWrapper';
import { globalStyles } from '../styles/globalStyles';

const formatTime = (time: number) => {
  const h = Math.floor(time / 3600000).toString().padStart(2, '0');
  const m = Math.floor((time % 3600000) / 60000).toString().padStart(2, '0');
  const s = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
  const ms = (time % 1000).toString().padStart(3, '0');
  return `${h}:${m}:${s}.${ms}`;
};

const StopwatchScreen = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    if (!isRunning) {
      const startTime = Date.now() - elapsed;
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 50);
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setElapsed(0);
    setLaps([]);
    setIsRunning(false);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([elapsed, ...laps]);
    }
  };

  return (
    <LayoutWrapper type="clock">
      <View style={globalStyles.content}>
        <Text style={styles.time}>{formatTime(elapsed)}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={isRunning ? handleLap : handleReset}
            style={[styles.button, styles.grayButton]}
          >
            <Text style={styles.buttonText}>{isRunning ? 'Lap' : 'Reset'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={isRunning ? handleStop : handleStart}
            style={[styles.button, isRunning ? styles.stopButton : styles.startButton]}
          >
            <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={laps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Text style={styles.lapText}>
              Lap {laps.length - index}: {formatTime(item)}
            </Text>
          )}
          style={{ marginTop: 20 }}
        />
      </View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  grayButton: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  lapText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 6,
    color: '#333',
  },
});

export default StopwatchScreen;
