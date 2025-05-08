import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const OnboardingUserInfo: React.FC = () => {
  const navigation = useNavigation();
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleNext = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progress} />
        <View style={styles.progress} />
        <View style={styles.progress} />
        <View style={[styles.progress, styles.progressActive]} />
      </View>

      <Text style={styles.title}>Tell us about yourself 😎</Text>

      <Text style={styles.label}>Your gender</Text>
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value) => setGender(value)}
          placeholder={{ label: 'Select an option', value: '' }}
          items={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
          ]}
          style={{
            inputIOS: styles.pickerText,
            inputAndroid: styles.pickerText,
          }}
        />
      </View>

      <Text style={styles.label}>Your birthday</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateInput}
      >
        <Text style={styles.dateText}>
          {birthday
            ? birthday.toLocaleDateString()
            : 'dd / mm / yyyy'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={birthday || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setBirthday(selectedDate);
            }
          }}
        />
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  progress: {
    width: 60,
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginHorizontal: 4,
  },
  progressActive: {
    backgroundColor: '#7f85ff',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 30,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 24,
    height: 48,
    justifyContent: 'center',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  dateInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 14,
    justifyContent: 'center',
    marginBottom: 40,
  },
  dateText: {
    fontSize: 16,
    color: '#999',
  },
  nextButton: {
    backgroundColor: '#7f85ff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  skipText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});

export default OnboardingUserInfo;
