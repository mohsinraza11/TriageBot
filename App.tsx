import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ChatApp from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <ChatApp/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
