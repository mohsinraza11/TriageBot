import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageBubble = ({ content, role }) => {
  const isUser = role === 'user';
  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.botContainer]}>
      <Text style={isUser ? styles.userText : styles.botText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
  },
  userContainer: {
    backgroundColor: '#008080',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  botContainer: {
    backgroundColor: '#F7F7F7',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  userText: {
    color: 'white',
  },
  botText: {
    color: '#333',
  },
});

export default MessageBubble;