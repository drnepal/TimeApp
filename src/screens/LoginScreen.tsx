import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    Alert.alert('Coming Soon', 'Login functionality is not implemented yet.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.buttonSpacing}>
          <Button title="Login" onPress={handleLogin} />
        </View>

        <View style={styles.buttonSpacing}>
          <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
        </View>

        <TouchableOpacity onPress={() => navigation.replace('Home')}>
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    width: '85%',
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 12,
    paddingLeft: 10,
  },
  buttonSpacing: {
    marginBottom: 10,
  },
  guestText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '600',
  },
});

export default LoginScreen;
