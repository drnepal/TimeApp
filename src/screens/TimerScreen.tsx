import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LayoutWrapper from '../components/LayoutWrapper';

const TimerScreen = () => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [alarmSound, setAlarmSound] = useState('default');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      Alert.alert("Timer Complete", "Time’s up!");
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const startTimer = () => {
    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setTimerActive(true);
    } else {
      Alert.alert("Invalid Timer", "Set a valid time.");
    }
  };

  const stopTimer = () => {
    setTimerActive(false);
    setTimeLeft(0);
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const numberPickerItems = (limit: number) =>
    Array.from({ length: limit }, (_, i) => (
      <Picker.Item key={i} label={i.toString().padStart(2, '0')} value={i.toString().padStart(2, '0')} />
    ));

  return (
    <LayoutWrapper type="clock">
      <Text style={styles.timerDisplay}>
        {timerActive ? formatTime(timeLeft) : `${hours}:${minutes}:${seconds}`}
      </Text>

      <View style={styles.pickersRow}>
        <Picker selectedValue={hours} style={styles.picker} onValueChange={setHours}>
          {numberPickerItems(24)}
        </Picker>
        <Text style={styles.colon}>:</Text>
        <Picker selectedValue={minutes} style={styles.picker} onValueChange={setMinutes}>
          {numberPickerItems(60)}
        </Picker>
        <Text style={styles.colon}>:</Text>
        <Picker selectedValue={seconds} style={styles.picker} onValueChange={setSeconds}>
          {numberPickerItems(60)}
        </Picker>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity onPress={startTimer} style={styles.startBtn}>
          <Text style={styles.btnText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={stopTimer} style={styles.stopBtn}>
          <Text style={styles.btnText}>Stop</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.alarmButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.alarmButtonText}>Select Alarm Sound</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Alarm Sound</Text>
            <Picker selectedValue={alarmSound} onValueChange={setAlarmSound}>
              <Picker.Item label="Default" value="default" />
              <Picker.Item label="Beep" value="beep" />
              <Picker.Item label="Alarm" value="alarm" />
            </Picker>
            <TouchableOpacity style={styles.closeModal} onPress={() => setModalVisible(false)}>
              <Text style={styles.btnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  timerDisplay: {
    fontSize: 48,
    marginVertical: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  pickersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  picker: {
    width: Platform.OS === 'ios' ? 100 : 100,
    height: 150,
  },
  colon: {
    fontSize: 30,
    marginHorizontal: 5,
    color: '#333',
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  startBtn: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  stopBtn: {
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  alarmButton: {
    alignSelf: 'center',
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  alarmButtonText: {
    color: '#000',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  closeModal: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
});

export default TimerScreen;
