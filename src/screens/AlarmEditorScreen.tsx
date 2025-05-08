import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AlarmEditorScreen = ({ route, navigation }) => {
  const [alarms, setAlarms] = useState([]);
  const [editedTime, setEditedTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const { alarmId } = route.params;

  useEffect(() => {
    loadAlarm();
  }, []);

  const loadAlarm = async () => {
    const storedAlarms = await AsyncStorage.getItem('alarms');
    if (storedAlarms) {
      const parsedAlarms = JSON.parse(storedAlarms);
      setAlarms(parsedAlarms);
      const currentAlarm = parsedAlarms.find(a => a.id === alarmId);
      if (currentAlarm) setEditedTime(new Date(currentAlarm.time));
    }
  };

  const saveAlarm = async () => {
    const updatedAlarms = alarms.map(a =>
      a.id === alarmId ? { ...a, time: editedTime.toISOString() } : a
    );
    await AsyncStorage.setItem('alarms', JSON.stringify(updatedAlarms));
    navigation.goBack();
  };

  const deleteAlarm = async () => {
    const updatedAlarms = alarms.filter(a => a.id !== alarmId);
    await AsyncStorage.setItem('alarms', JSON.stringify(updatedAlarms));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Alarm</Text>
      <TouchableOpacity style={styles.timeBox} onPress={() => setShowPicker(true)}>
        <Text style={styles.timeText}>
          {editedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={editedTime}
          mode="time"
          display="spinner"
          onChange={(e, time) => {
            setShowPicker(false);
            if (time) setEditedTime(time);
          }}
        />
      )}

      <TouchableOpacity style={styles.saveBtn} onPress={saveAlarm}>
        <Text style={styles.btnText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={() => Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete?",
        [{ text: "Cancel", style: "cancel" },
         { text: "Delete", style: "destructive", onPress: deleteAlarm }]
      )}>
        <Text style={styles.btnText}>Delete Alarm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: '600', marginVertical: 20 },
  timeBox: { padding: 20, borderRadius: 12, backgroundColor: '#f0f0f0', alignItems: 'center', marginBottom: 20 },
  timeText: { fontSize: 30 },
  saveBtn: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  deleteBtn: { backgroundColor: '#f44336', padding: 15, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18 },
});

export default AlarmEditorScreen;
