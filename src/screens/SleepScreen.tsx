import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LayoutWrapper from '../components/LayoutWrapper';

const SleepScreen = () => {
  const [bedtime, setBedtime] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    loadBedtime();
  }, []);

  const loadBedtime = async () => {
    const stored = await AsyncStorage.getItem('bedtime');
    if (stored) {
      setBedtime(new Date(stored));
    }
  };

  const saveBedtime = async (selectedTime: Date) => {
    try {
      await AsyncStorage.setItem('bedtime', selectedTime.toISOString());
      setBedtime(selectedTime);
      Alert.alert('Bedtime Set', `Sleep starts at ${selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    } catch (e) {
      console.log('Failed to save bedtime:', e);
    }
  };

  const clearBedtime = async () => {
    await AsyncStorage.removeItem('bedtime');
    setBedtime(null);
  };

  return (
    <LayoutWrapper navBarType="default">
      <View style={styles.container}>
        <Text style={styles.title}>Set Your Bedtime</Text>

        {bedtime ? (
          <View style={styles.bedtimeCard}>
            <Text style={styles.timeText}>
              Current Bedtime: {new Date(bedtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <TouchableOpacity style={styles.clearBtn} onPress={clearBedtime}>
              <Text style={styles.clearText}>Clear Bedtime</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noBedtime}>No bedtime set yet.</Text>
        )}

        <TouchableOpacity style={styles.setButton} onPress={() => setShowPicker(true)}>
          <Text style={styles.setButtonText}>Add Bedtime</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
            value={bedtime || new Date()}
            onChange={(e, selectedTime) => {
              setShowPicker(false);
              if (selectedTime) {
                saveBedtime(selectedTime);
              }
            }}
          />
        )}
      </View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  bedtimeCard: {
    backgroundColor: '#e0f7fa',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  timeText: { fontSize: 18, fontWeight: '600', color: '#00796B' },
  clearBtn: {
    marginTop: 10,
    backgroundColor: '#ffcccb',
    padding: 10,
    borderRadius: 5,
  },
  clearText: { color: '#b71c1c', fontWeight: '600' },
  noBedtime: { color: '#aaa', marginBottom: 20 },
  setButton: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  setButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default SleepScreen;
