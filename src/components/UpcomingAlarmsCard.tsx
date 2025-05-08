import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const UpcomingAlarmsCard = () => {
  const [alarms, setAlarms] = useState([]);
  const navigation = useNavigation();

  const loadAlarms = async () => {
    try {
      const stored = await AsyncStorage.getItem('alarms');
      if (stored) {
        const parsedAlarms = JSON.parse(stored);
        const futureAlarms = parsedAlarms
          .filter(a => new Date(a.time) > new Date())
          .sort((a, b) => new Date(a.time) - new Date(b.time))
          .slice(0, 2); // Show only the first 2 upcoming alarms
        setAlarms(futureAlarms);
      }
    } catch (error) {
      console.error('Error loading alarms:', error);
    }
  };

  useEffect(() => {
    loadAlarms();
    const listener = navigation.addListener('focus', loadAlarms);
    return listener;
  }, [navigation]);

  if (alarms.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Alarms</Text>
      {alarms.map((alarm) => (
        <TouchableOpacity
          key={alarm.id}
          style={styles.alarmItem}
          onPress={() => navigation.navigate('AlarmEditor', { alarmId: alarm.id })}
        >
          <Text style={styles.alarmTime}>
            {new Date(alarm.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 15,
  },
  alarmItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginBottom: 10,
  },
  alarmTime: {
    fontSize: 18,
    color: '#fff',
  },
});

export default UpcomingAlarmsCard;
