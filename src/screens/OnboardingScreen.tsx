import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CLOCK_SIZE = width * 0.7;
const CENTER = CLOCK_SIZE / 2;

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [time, setTime] = useState(new Date());
  const [skipped, setSkipped] = useState(false);
  const [secondAnim] = useState(new Animated.Value(time.getSeconds() * 6));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now);

      Animated.timing(secondAnim, {
        toValue: (now.getSeconds() % 60) * 6,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }, 1000);

    const timeout = setTimeout(() => {
      if (!skipped) {
        navigation.replace('OnboardingUserAwareness' as never);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [skipped]);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = (hours + minutes / 60 + seconds / 3600) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;

  const handleProceed = () => {
    setSkipped(true);
    navigation.navigate('OnboardingUserAwareness' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Clock Face */}
      <View style={styles.clockFace}>
        {[...Array(12)].map((_, i) => {
          const angle = ((i + 1) * 30 - 90) * (Math.PI / 180);
          const radius = CLOCK_SIZE * 0.42;
          const x = CENTER + radius * Math.cos(angle);
          const y = CENTER + radius * Math.sin(angle);
          return (
            <Text
              key={i}
              style={[
                styles.number,
                {
                  left: x - 8,
                  top: y - 10,
                },
              ]}
            >
              {i + 1}
            </Text>
          );
        })}

        {/* Hour Hand */}
        <View style={[styles.handContainer, { transform: [{ rotate: `${hourAngle}deg` }] }]}>
          <View style={styles.hourHand} />
        </View>

        {/* Minute Hand */}
        <View style={[styles.handContainer, { transform: [{ rotate: `${minuteAngle}deg` }] }]}>
          <View style={styles.minuteHand} />
        </View>

        {/* Animated Second Hand */}
        <Animated.View
          style={[
            styles.handContainer,
            {
              transform: [
                {
                  rotate: secondAnim.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.secondHand} />
        </Animated.View>

        {/* Center Dot */}
        <View style={styles.centerDot} />
      </View>

      {/* Digital Time */}
      <Text style={styles.digitalTime}>
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </Text>

      <Text style={styles.title}>TimeApp</Text>

      <TouchableOpacity onPress={handleProceed} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7f85ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockFace: {
    width: CLOCK_SIZE,
    height: CLOCK_SIZE,
    borderRadius: CLOCK_SIZE / 2,
    borderWidth: 6,
    borderColor: '#fff',
    backgroundColor: '#7f85ff',
    position: 'relative',
    marginBottom: 20,
  },
  number: {
    position: 'absolute',
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  handContainer: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: CENTER,
    left: CENTER,
  },
  hourHand: {
    position: 'absolute',
    width: 6,
    height: CLOCK_SIZE * 0.25,
    backgroundColor: '#fff',
    borderRadius: 3,
    top: -CLOCK_SIZE * 0.25,
  },
  minuteHand: {
    position: 'absolute',
    width: 4,
    height: CLOCK_SIZE * 0.35,
    backgroundColor: '#fff',
    borderRadius: 2,
    top: -CLOCK_SIZE * 0.35,
  },
  secondHand: {
    position: 'absolute',
    width: 2,
    height: CLOCK_SIZE * 0.45,
    backgroundColor: '#ff3b3b', // 🔴 more visible ticking
    borderRadius: 1,
    top: -CLOCK_SIZE * 0.45,
  },
  centerDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    top: CENTER - 5,
    left: CENTER - 5,
    zIndex: 2,
  },
  digitalTime: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#7f85ff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen;
