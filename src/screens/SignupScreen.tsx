// SignupScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [isEmailSignup, setIsEmailSignup] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleContinueAsGuest = () => {
    navigation.navigate('GuestScreen');
  };

  const validateForm = () => {
    if (isEmailSignup) {
      if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email';
      if (password.length < 8) return 'Password must be 8+ characters';
    } else {
      // Add proper phone validation
      if (phone.length < 10) return 'Invalid phone number';
    }
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) return alert(error);
    
    // Implement API call
    try {
      const route = isEmailSignup ? '/api/email-signup' : '/api/phone-signup';
      const response = await fetch(route, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          [isEmailSignup ? 'email' : 'phone']: isEmailSignup ? email : phone,
          password 
        })
      });
      
      if (response.ok) navigation.navigate('Home');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#7f85ff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Join Deepseek</Text>
        
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, isEmailSignup && styles.activeToggle]}
            onPress={() => setIsEmailSignup(true)}
          >
            <Text style={styles.toggleText}>Email</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.toggleButton, !isEmailSignup && styles.activeToggle]}
            onPress={() => setIsEmailSignup(false)}
          >
            <Text style={styles.toggleText}>Phone</Text>
          </TouchableOpacity>
        </View>

        {isEmailSignup ? (
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
        ) : (
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            keyboardType="phone-pad"
          />
        )}

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleContinueAsGuest}>
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#7f85ff',
    fontWeight: '700',
    marginBottom: 30,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  toggleButton: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: '#f4f5ff',
    borderColor: '#7f85ff',
    borderWidth: 1,
  },
  toggleText: {
    color: '#7f85ff',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#7f85ff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f4f5ff',
  },
  button: {
    width: '100%',
    backgroundColor: '#7f85ff',
    padding: 15,
    borderRadius: 12,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  guestText: {
    color: '#7f85ff',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;