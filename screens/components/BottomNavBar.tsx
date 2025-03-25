import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const BottomNavBar = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={26} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Clock')}>
        <Ionicons name="time-outline" size={26} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity>
        <MaterialCommunityIcons name="sleep" size={26} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity>
        <FontAwesome name="calendar" size={26} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="menu" size={26} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});

export default BottomNavBar;
