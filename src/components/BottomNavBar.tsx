import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BottomNavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const goTo = (screen: string) => navigation.navigate(screen as never);

  const isClockScreen = route.name === 'Clock';

  return (
    <View style={styles.container}>
      {isClockScreen ? (
        <>
          <TouchableOpacity onPress={() => goTo('Alarm')}>
            <MaterialCommunityIcons name="alarm" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goTo('Timer')}>
            <Ionicons name="timer-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goTo('Stopwatch')}>
            <MaterialCommunityIcons name="timer-sand" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goTo('WorldClock')}>
            <MaterialCommunityIcons name="earth" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goTo('Menu')}>
            <Ionicons name="menu" size={24} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => goTo('Home')}>
            <Ionicons name="home-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goTo('Clock')}>
            <Ionicons name="time-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goTo('Sleep')}>
            <MaterialCommunityIcons name="sleep" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goTo('Calendar')}>
            <FontAwesome name="calendar" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goTo('Menu')}>
            <Ionicons name="menu" size={24} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
});

export default BottomNavBar;
