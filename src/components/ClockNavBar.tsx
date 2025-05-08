import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SharedNavBar from './SharedNavbar';
const ClockNavBar = () => {
  const navigation = useNavigation();

  const goTo = (screen: string) => {
    navigation.navigate(screen as never);
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => goTo('Clock')} style={styles.button}>
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

export default ClockNavBar;
