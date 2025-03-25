import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
<<<<<<< HEAD
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  onPress?: (button: string) => void;
}

const BottomNavBar: React.FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress?.('home')}>
        <Ionicons name="home-outline" size={28} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPress?.('time')}>
        <Ionicons name="time-outline" size={28} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPress?.('sleep')}>
        <MaterialCommunityIcons name="sleep" size={28} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPress?.('calendar')}>
        <FontAwesome name="calendar" size={28} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPress?.('menu')}>
=======
import { useNavigation } from '@react-navigation/native';

const BottomNavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={28} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Clock')}>
        <Ionicons name="time-outline" size={28} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="moon-outline" size={28} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="calendar-outline" size={28} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity>
>>>>>>> test_branch
        <Ionicons name="menu-outline" size={28} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default BottomNavBar;
