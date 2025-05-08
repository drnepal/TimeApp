import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OtpVerificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState(Array(6).fill(''));
  const inputs = useRef<Array<TextInput | null>>([]);
  const [timer, setTimer] = useState(300); // 5 minutes

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (text: string, index: number) => {
    if (!/^[0-9]*$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(300);
    setCode(Array(6).fill(''));
    inputs.current[0]?.focus();
  };

  const formattedTime = `${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} />
      </TouchableOpacity>

      <Text style={styles.title}>6 digit-code</Text>
      <Text style={styles.subtitle}>Enter the code we sent to (504) 968-4139</Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            style={[styles.codeInput, index === 3 && styles.separator]}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            returnKeyType="next"
          />
        ))}
      </View>

      <Text style={styles.expireText}>Code is expired in {formattedTime}</Text>

      <TouchableOpacity onPress={handleResend}>
        <Text style={styles.resend}>Resend</Text>
      </TouchableOpacity>
    </View>
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
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 10,
    width: 44,
    backgroundColor: '#f9f9f9',
  },
  separator: {
    marginLeft: 12,
  },
  expireText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  resend: {
    fontSize: 16,
    color: '#7f85ff',
    fontWeight: '600',
  },
});

export default OtpVerificationScreen;
