import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';

type Props = {
  type: 'default' | 'clock';
};

const SharedNavBar = ({ type }: Props) => {
  const navigation = useNavigation();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const goTo = (screen: string) => {
    setCalendarVisible(false);
    setMenuVisible(false);
    navigation.navigate(screen as never);
  };

  return (
    <>
      {/* Bottom Navbar */}
      <View style={styles.container}>
        {type === 'clock' ? (
          <>
            <TouchableOpacity onPress={() => goTo('Clock')} style={styles.button}>
              <MaterialCommunityIcons name="alarm" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo('Timer')} style={styles.button}>
              <Ionicons name="timer-outline" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo('Stopwatch')} style={styles.button}>
              <MaterialCommunityIcons name="timer-sand" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo('WorldClock')} style={styles.button}>
              <MaterialCommunityIcons name="earth" size={24} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => goTo('Home')} style={styles.button}>
              <Ionicons name="home-outline" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo('Clock')} style={styles.button}>
              <Ionicons name="time-outline" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo('Sleep')} style={styles.button}>
              <MaterialCommunityIcons name="sleep" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCalendarVisible(true)} style={styles.button}>
              <FontAwesome name="calendar" size={24} />
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.button}>
          <Ionicons name="menu" size={24} />
        </TouchableOpacity>
      </View>

      {/* Calendar Modal */}
      <Modal visible={calendarVisible} transparent animationType="slide">
        <TouchableOpacity style={styles.modalBackdrop} onPress={() => setCalendarVisible(false)}>
          <View style={styles.modalContent}>
            <Calendar
              onDayPress={(day) => {
                console.log('Selected day:', day);
                setCalendarVisible(false);
              }}
              style={styles.calendarStyle}
              theme={{
                selectedDayBackgroundColor: '#2196F3',
                todayTextColor: '#2196F3',
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Burger Menu Modal */}
      <Modal visible={menuVisible} transparent animationType="slide">
        <TouchableOpacity style={styles.modalBackdrop} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Menu</Text>
            <TouchableOpacity onPress={() => goTo('Profile')}>
              <Text style={styles.menuItem}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo('Settings')}>
              <Text style={styles.menuItem}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo('About')}>
              <Text style={styles.menuItem}>About App</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo('Logout')}>
              <Text style={styles.menuItem}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  calendarStyle: {
    borderRadius: 20,
    paddingTop: 10,
  },
  menuContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: Dimensions.get('window').width * 0.65,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default SharedNavBar;
