import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../api/client';

const OPTIONS = [
  'Youtube',
  'Twitter',
  'Instagram',
  'Facebook',
  'Google',
  'Tiktok',
  'Others',
];

const OnboardingUserAwareness: React.FC = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected((prev) => (prev === option ? null : option)); // toggle
  };

  const handleNext = async () => {
    try {
      if (selected) {
        await api.post('/onboarding/heard', { heardFrom: selected });
      }
    } catch (error: any) {
      if (error.response) {
        Alert.alert('Error', error.response.data?.msg || 'Failed to save.');
      } else {
        Alert.alert('Error', 'Network error or server unreachable.');
      }
    } finally {
      navigation.navigate('OnboardingUserInfo' as never);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>How did you hear about us?</Text>
      <Text style={styles.subtitle}>Select one</Text>

      <FlatList
        data={OPTIONS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              selected === item && styles.optionSelected,
            ]}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.optionText}>{item}</Text>
            <View style={styles.radioCircle}>
              {selected === item && <View style={styles.radioChecked} />}
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: '#777', marginBottom: 24 },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  optionSelected: {
    borderColor: '#7f85ff',
    borderWidth: 2,
    borderRadius: 10,
  },
  optionText: { fontSize: 16 },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#7f85ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioChecked: {
    width: 10,
    height: 10,
    backgroundColor: '#7f85ff',
    borderRadius: 5,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#7f85ff',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  nextButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  skipText: {
    color: '#888',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default OnboardingUserAwareness;
