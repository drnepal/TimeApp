// LayoutWrapper.tsx
import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import TopNavBar from './TopNavBar';
import SharedNavBar from './SharedNavbar';

interface LayoutWrapperProps {
  children: ReactNode;
  type?: 'default' | 'clock';
}

const LayoutWrapper = ({ children, type = 'default' }: LayoutWrapperProps) => {
  return (
    <View style={styles.wrapper}>
      <TopNavBar showBack={true} showHome={true} />
      <View style={styles.content}>
        {children}
      </View>
      <SharedNavBar type={type} />
    </View>
  );
};


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingBottom: 90, // spacing for navbar
  },
});

export default LayoutWrapper;
