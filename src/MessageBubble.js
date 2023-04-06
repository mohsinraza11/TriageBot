import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const MessageBubble = (props) => {
  const { content, role, sendQuestion } = props;
  const isUser = role === 'user';
  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.botContainer]}>
      {!isUser && <Image source={require('./Assets/TriageBot.png')} style={styles.botImage} />}
      <Text style={isUser ? styles.userText : styles.botText}>{content}</Text>
      {isUser && <Image source={require('./Assets/UserImage.png')} style={styles.userImage} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '70%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userContainer: {
    backgroundColor: '#008080',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
    marginLeft: 'auto',
    paddingHorizontal: 20,
  },
  botContainer: {
    backgroundColor: '#F7F7F7',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
    marginRight: 'auto',
    paddingHorizontal: 20,
  },
  
  userText: {
    color: 'white',
    marginLeft: 10,
  },
  botText: {
    color: '#333',
    marginRight: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
  },
  botImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
});

export default MessageBubble;