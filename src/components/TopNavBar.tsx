import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  showBack?: boolean;
  showHome?: boolean;
  customBackAction?: () => void;
}

const TopNavBar: React.FC<Props> = ({ showBack, showHome, customBackAction }) => {
  const navigation = useNavigation();
  const route = useRoute();

  // Screens where top nav is completely hidden (like Home)
  const hideTopNavOn = ['Home', 'Clock', 'Timer', 'Stopwatch', 'WorldClock', 'Sleep'];

  if (hideTopNavOn.includes(route.name)) return null;

  return (
    <View style={styles.navBar}>
      {showBack && (
        <TouchableOpacity onPress={customBackAction ?? (() => navigation.goBack())}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
      )}
      <View style={{ flex: 1 }} />
      {showHome && (
        <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
          <Ionicons name="home-outline" size={28} color="#333" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 45,
    backgroundColor: '#fff',
  },
});

export default TopNavBar;
