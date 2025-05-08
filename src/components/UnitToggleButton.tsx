import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useUnit } from '../context/UnitContext';

const UnitToggleButton = () => {
  const { unit, toggleUnit } = useUnit();

  return (
    <TouchableOpacity onPress={toggleUnit} style={styles.toggleButton}>
      <Text style={styles.toggleText}>
        Switch to °{unit === 'celsius' ? 'F' : 'C'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 10,
  },
  toggleText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});

export default UnitToggleButton;
