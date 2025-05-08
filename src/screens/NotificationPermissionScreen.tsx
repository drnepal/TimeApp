import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotificationPermissionScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleAllowNotifications = () => {
    // Replace this with your real permissions logic later
    Alert.alert('Notifications Enabled', 'You will receive updates!');
    navigation.navigate('Home'); // or the next onboarding step
  };

  const handleSkip = () => {
    navigation.navigate('Home'); // or skip onboarding
  };

  return (
    <View style={styles.container}>
      {/* Placeholder image — replace with your own asset */}
      <Image
        source={require('../assets/notification-illustration.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Turn on notifications?</Text>
      <Text style={styles.subtitle}>
        Make sure you stay up-to-date with all the important news and reminders
        by enabling notifications. You can always turn it off later.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleAllowNotifications}>
        <Text style={styles.buttonText}>Turn on notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Not now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '90%',
    height: 260,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#7f85ff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    marginTop: 20,
  },
  skipText: {
    color: '#999',
    fontSize: 15,
  },
});

export default NotificationPermissionScreen;
