import React from 'react';
import { StyleSheet, View } from 'react-native';
import ChatApp from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <ChatApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
});