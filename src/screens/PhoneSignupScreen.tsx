import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PhoneNumberSignupScreen: React.FC = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [country, setCountry] = useState<Country | undefined>();

  const onSelect = (selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} />
      </TouchableOpacity>

      <Text style={styles.title}>Enter your phone number</Text>
      <Text style={styles.subtitle}>
        We might save and send a verification code to this phone number.
      </Text>

      {/* Input row */}
      <View style={styles.inputRow}>
        <CountryPicker
          countryCode={countryCode}
          withFlag
          withCallingCode
          withFilter
          withCallingCodeButton
          onSelect={onSelect}
          containerButtonStyle={styles.countryPicker}
        />
        <TextInput
          placeholder="Phone number"
          keyboardType="phone-pad"
          style={styles.phoneInput}
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {/* Log in */}
      <View style={styles.loginText}>
        <Text>Already had an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Log in</Text>
        </TouchableOpacity>
      </View>

      {/* Sign up button */}
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Sign up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backArrow: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#777',
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  countryPicker: {
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
  },
  loginText: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  link: {
    color: '#7f85ff',
    fontWeight: '500',
  },
  signupButton: {
    backgroundColor: '#7f85ff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PhoneNumberSignupScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PhoneSignupScreen: React.FC = () => {
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Invalid phone number', 'Enter a valid number (10–15 digits)');
      return;
    }

    // Simulate verification success
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your phone number</Text>
      <TextInput
        placeholder="Phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  label: { fontSize: 18, marginBottom: 10, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#7f85ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#7f85ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default PhoneSignupScreen;
