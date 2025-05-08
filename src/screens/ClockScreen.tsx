// ClockScreen.tsx (updated to match AlarmClock UI design)
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LayoutWrapper from '../components/LayoutWrapper';

const ClockScreen = () => {
  const navigation = useNavigation();
  const [alarms, setAlarms] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [newAlarmTime, setNewAlarmTime] = useState(new Date());

  useEffect(() => {
    loadAlarms();
    const unsubscribe = navigation.addListener('focus', loadAlarms);
    return unsubscribe;
  }, [navigation]);

  const loadAlarms = async () => {
    const stored = await AsyncStorage.getItem('alarms');
    if (stored) {
      const parsed = JSON.parse(stored);
      setAlarms(parsed.sort((a, b) => new Date(a.time) - new Date(b.time)));
    }
  };

  const saveAlarms = async (updated) => {
    await AsyncStorage.setItem('alarms', JSON.stringify(updated));
    setAlarms(updated);
  };

  const addAlarm = async (date: Date) => {
    const newAlarm = {
      id: Date.now().toString(),
      time: date.toISOString(),
      enabled: true,
    };
    const updated = [...alarms, newAlarm].sort((a, b) => new Date(a.time) - new Date(b.time));
    saveAlarms(updated);
  };

  const deleteAlarm = async (id) => {
    const updated = alarms.filter((a) => a.id !== id);
    saveAlarms(updated);
  };

  const toggleAlarm = async (id) => {
    const updated = alarms.map(a =>
      a.id === id ? { ...a, enabled: !a.enabled } : a
    );
    saveAlarms(updated);
  };

  const renderRightActions = (id) => (
    <TouchableOpacity style={styles.deleteAction} onPress={() => deleteAlarm(id)}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <LayoutWrapper type="clock">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Alarm Clock</Text>
        <Text style={styles.subTitle}>Manage your alarms easily below</Text>

        {alarms.map((alarm) => (
          <Swipeable key={alarm.id} renderRightActions={() => renderRightActions(alarm.id)}>
            <View style={styles.alarmItem}>
              <Text style={styles.alarmTime}>
                {new Date(alarm.time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
              <Switch
                value={alarm.enabled}
                onValueChange={() => toggleAlarm(alarm.id)}
                trackColor={{ false: '#ccc', true: '#7f85ff' }}
                thumbColor={'#fff'}
              />
            </View>
          </Swipeable>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={() => setShowPicker(true)}>
          <Ionicons name="add-circle" size={60} color="#7f85ff" />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            mode="time"
            value={newAlarmTime}
            display="spinner"
            onChange={(e, selectedTime) => {
              setShowPicker(false);
              if (e.type === 'set' && selectedTime) {
                addAlarm(selectedTime);
              }
            }}
          />
        )}
      </ScrollView>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 6,
    color: '#333',
  },
  subTitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  alarmItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  alarmTime: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  deleteAction: {
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 10,
    marginBottom: 12,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
});

export default ClockScreen;
