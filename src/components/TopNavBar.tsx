// components/TopNavBar.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface TopNavBarProps {
  showBack?: boolean;
  showHome?: boolean;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ showBack = false, showHome = false }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.navBar}>
      {showBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
      )}
      <View style={{ flex: 1 }} />
      {showHome && (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
    backgroundColor: '#f0f8ff',
  },
});

export default TopNavBar;
