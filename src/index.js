
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MessageBubble from './MessageBubble';

const ChatApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const messageListRef = useRef(null);

  const specialties = [
    'Cardiologist',
    'Dermatologist',
    'Endocrinologist',
    'Gastroenterologist',
    'Hematologist',
    'Neurologist',
    'Oncologist',
    'Pediatrician',
    'Psychiatrist',
    'Rheumatologist',
    'Urologist',
    'General Physician',
    'Psychologist',
    'Radiologist'
  ];

  const [questionCount, setQuestionCount] = useState(0);
  const MAX_QUESTIONS = 5;
  
  const sendMessage = async () => {
    try {
      if (questionCount >= MAX_QUESTIONS) {
        return;
      }
  
      setLoading(true);
      setQuestionCount(count => count + 1);
  
      const newMessage = { content: inputValue, role: 'user' };
      setMessages(prevState => [newMessage, ...prevState]);
      setInputValue('');
      Keyboard.dismiss();
  
      const messages = [
        { role: 'system', content: `Act as an expert ${selectedSpecialty}` },
        { role: 'user', content: inputValue },
      ];
      if (selectedSpecialty) {
        messages.unshift({ role: 'system', content: `You will perform virtual triage by asking the user questions related to consultation of the ${selectedSpecialty}` });
      }
  
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer API_KEY`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          temperature: 0.7,
          max_tokens: 1024,
          n: 1,
          stop: 'none',
          messages,
        }),
      });
      const json = await response.json();
      const botMessage = { content: json.choices[0].message.content, role: 'bot' };
      setMessages(prevState => [botMessage, ...prevState]);
      setLoading(false);
      if (questionCount === MAX_QUESTIONS - 1) {
        const finalMessage = { content: 'Consultation is complete. Please consult our doctor for further assistance.', role: 'bot' };
        setMessages(prevState => [finalMessage, ...prevState]);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#008080" />
        <Text style={styles.loadingText}>Triage Bot is Generating ...</Text>
      </View>
    );
  };

  const renderSpecialtyItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.specialtyItem,
          selectedSpecialty === item ? styles.selectedSpecialtyItem : null,
        ]}
        onPress={() => {
          setSelectedSpecialty(item);
          setModalVisible(false);
        }}
      >
        <Text style={styles.specialtyText}>{`${index + 1}. ${item}`}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollToOffset({ offset: 0, animated: false });
    }
  }, [messages]);

  useEffect(() => {
    setMessages([]);
  }, [selectedSpecialty]);

    
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      androidEnabled={true}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
        <View style={styles.header}>
  <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 10 }}>
    <Image source={require('./Assets/TriageBot.png')} style={styles.botIcon} />
    <Text style={styles.headerTitle}>Triage Bot</Text>
  </View>

  <View style={{ flexDirection: 'column', alignItems: 'center' }}>
    <Image source={require('./Assets/Doctor.png')} style={styles.specialtyIcon} />
    <TouchableOpacity style={styles.specialtyButton} onPress={() => setModalVisible(true)}>
      <Text style={styles.specialtyButtonText}>
        {selectedSpecialty || 'Select a specialty'}
      </Text>
    </TouchableOpacity>
  </View>
</View>


  
          <FlatList
            ref={messageListRef}
            inverted
            data={messages}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => <MessageBubble content={item.content} role={item.role} />}
            style={styles.messageList}
            contentContainerStyle={{ paddingTop: 90 }}
          />
  
          {!selectedSpecialty && questionCount === 0 ? (
            <View style={styles.initialTextContainer}>
              <Text style={styles.initialText}>
                Initiate the virtual triage by selecting a specialty through the designated button located above.
              </Text>
            </View>
          ) : null}
  
          {selectedSpecialty && questionCount < MAX_QUESTIONS ? (
            <>
              <View style={styles.selectedSpecialtyContainer}>
                <Text style={styles.selectedSpecialtyText}>
                  I am Your Virtual {selectedSpecialty}, How can i help You!
                </Text>
              </View>
  
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type your message here..."
                  value={inputValue}
                  onChangeText={setInputValue}
                  onSubmitEditing={sendMessage}
                  returnKeyType="send"
                  blurOnSubmit={false}
                />
                <Button title="Send" onPress={sendMessage} />
              </View>
  
              <Text style={styles.questionCountText}>
                {`Inputs remaining: ${MAX_QUESTIONS - questionCount}`}
              </Text>
            </>
          ) : null}
  
          {loading && renderLoading()}
  
          <Modal animationType="slide" transparent={false} visible={modalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                  Select the specialty you want
                </Text>
                <FlatList
                  data={specialties}
                  keyExtractor={(item, index) => `${index}`}
                  renderItem={renderSpecialtyItem}
                  contentContainerStyle={{ alignItems: 'flex-start' }}
                />
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
    };

   const styles = StyleSheet.create({
    header: {
      backgroundColor: '#008080',
      paddingHorizontal: 20,
      paddingVertical: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 28,
      color: 'white',
      fontWeight: 'bold',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 18,
      color: '#008080',
      marginTop: 10,
    },
    initialTextContainer: {
      backgroundColor: '#008080',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20,
      marginTop: 10,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 50,
    },
    botIcon: {
      width: 80,
      height: 80,
      marginRight: 10,
      borderRadius:40,
    },
    
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      marginVertical: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#F7F7F7',
      borderRadius: 30,
    },
    textInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 18,
    },
    sendButton: {
      marginLeft: 10,
      borderRadius: 20,
    },
    sendButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    messageContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginHorizontal: 20,
      marginVertical: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: '#008080',
      borderRadius: 20,
      alignSelf: 'flex-start',
      maxWidth: '80%',
      paddingHorizontal: 15, // add this line
    },
    messageContainerBot: {
      backgroundColor: '#e5f1ff',
      alignSelf: 'flex-end',
      paddingHorizontal: 15, // add this line
    },
    specialtyIcon: {
      width: 80,
      height: 80,
      marginHorizontal: 10,
      borderRadius:40,
    },
    
    messageText: {
      fontSize: 18,
      flexWrap: 'wrap',
    },
    messageTextBot: {
      color: '#008080',
    },
    specialtyButton: {
      marginHorizontal: 20,
      marginVertical: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#00bfff',
      borderRadius: 30,
    },
    specialtyButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: '#008080',
      padding: 20,
      // Change the width property to adjust the width of the list
      width: '100%',
      alignSelf: 'flex-start',
    },
    initialText: {
      fontSize: 25,
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif',
      },
    modalContent: {
      backgroundColor: 'lightblue',
      borderRadius: 10,
      padding: 20,
      width: '100%',
    },
    specialtyItem: {
      paddingVertical: 15,
      marginHorizontal: 20,
      borderRadius: 10,
      borderBottomWidth: 0,
    },
    selectedSpecialtyItem: {
      backgroundColor: '#66c2ff',
      borderRadius: 10,
    },
    specialtyText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'left',
    },
    selectedSpecialtyContainer: {
      backgroundColor: '#008080',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginHorizontal: 20,
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    selectedSpecialtyText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
    questionCountText: {
      fontSize: 14,
      color: '#999',
      alignSelf: 'flex-end',
      marginRight: 20,
      marginBottom: 10,
      fontWeight: 'bold',
    },
    
  });
export default ChatApp;