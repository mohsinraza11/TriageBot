// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
// import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
// import axios from "axios";

// // Your OpenAI API key
// const apiKey = "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";

// // Your ChatGPT model ID
// const modelId = "davinci";

// // Default theme for PaperProvider
// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: "#6200EE",
//     accent: "#03DAC4",
//   },
// };

// const ChatGPT = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   const handleMessageSend = async () => {
//     if (!message) return;

//     // Add the user's message to the message history
//     setMessages([...messages, { text: message, fromUser: true }]);
//     setMessage("");

//     // Send the user's message to the ChatGPT API
//     try {
//       const response = await axios({
//         method: 'post',
//         url: 'https://api.openai.com/v1/completions',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${apiKey}`,
//           'model' : modelId 
//         },
//         data: {
//           prompt: message,
//           model: modelId,
//           max_tokens: 1024,
//           n: 1,
//           stop: '\n',
//           temperature: 0.7
//         }
//       });

//       console.log('======res', response.data.choices[0].text);
//       // Add the bot's response to the message history
//       setMessages([
//         ...messages,
//         { text: response.data.choices[0].text, fromUser: false },
//       ]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <PaperProvider theme={theme}>
//       <View style={{ flex: 1 }}>
//         <ScrollView
//           style={{ flex: 1, padding: 20 }}
//           contentContainerStyle={{ justifyContent: "flex-end" }}
//         >
//           {messages.map((message, index) => (
//             <View
//               key={index}
//               style={{
//                 alignSelf: message.fromUser ? "flex-end" : "flex-start",
//                 backgroundColor: message.fromUser ? "#6200EE" : "#03DAC4",
//                 borderRadius: 5,
//                 marginTop: 10,
//                 maxWidth: "80%",
//               }}
//             >
//               <Text style={{ padding: 10, color: "#FFF" }}>{message.text}</Text>
//             </View>
//           ))}
//         </ScrollView>
//         <View style={{ flexDirection: "row", padding: 10 }}>
//           <TextInput
//             style={{ flex: 1, marginRight: 10 }}
//             placeholder="Type your message here"
//             value={message}
//             onChangeText={setMessage}
//           />
//           <TouchableOpacity
//             style={{ backgroundColor: "#6200EE", padding: 10, borderRadius: 5 }}
//             onPress={handleMessageSend}
//           >
//             <Text style={{ color: "#FFF" }}>Send</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </PaperProvider>
//   );
// };

// export default ChatGPT;

// import React, { useState } from 'react';
// import { SafeAreaView, StyleSheet, TextInput, View, Text, Button } from 'react-native';
// import axios from 'axios';

// const GPT35Turbo = () => {
//   const [prompt, setPrompt] = useState('');
//   const [response, setResponse] = useState('');

//   const sendRequest = async () => {
//     try {
//       const requestBody = {
//         model: 'gpt-3.5-turbo',
//         temperature: 0.7,
//         max_tokens: 1024,
//         n: 1,
//         stop: 'none',
//         messages: [
//           {
//             role: 'system',
//             content: 'you are as a psychologist and will act like one'
//           },
//           {
//             role: 'user',
//             content: prompt
//           }
//         ]
//       };
//       const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer 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'
//         }
//       });
      
//       setResponse(response.data.choices[0].text);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.textInput}
//           multiline
//           placeholder="Type your message here..."
//           onChangeText={(text) => setPrompt(text)}
//           value={prompt}
//         />
//         <Button title="Send" onPress={sendRequest} />
//       </View>
//       <View style={styles.responseContainer}>
//         {response !== '' && <Text style={styles.responseText}>{response}</Text>}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingVertical: 24
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   textInput: {
//     flex: 1,
//     marginRight: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     padding: 8
//   },
//   responseContainer: {
//     marginTop: 24
//   },
//   responseText: {
//     fontSize: 18,
//     lineHeight: 24
//   }
// });

// export default GPT35Turbo;

// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';

// const ChatApp = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([]);

//   const sendMessage = async () => {
//     try {
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer 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'
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           temperature: 0.7,
//           max_tokens: 1024,
//           n: 1,
//           stop: '\n',
//           messages: [
//             { role: 'system', content: 'you are as a psychologist and will act like one' },
//             { role: 'user', content: inputValue }
//           ]
//         })
//       });
//       const json = await response.json();
//       const newMessage = { content: json.choices[0].message.content, role: 'bot' };
//       setMessages(prevState => [...prevState, newMessage]);
//       setInputValue('');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={messages}
//         renderItem={({ item }) => (
//           <View style={item.role === 'user' ? styles.userMessage : styles.botMessage}>
//             <Text>{item.content}</Text>
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         inverted
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.textInput}
//           onChangeText={text => setInputValue(text)}
//           value={inputValue}
//           placeholder="Type your message here"
//         />
//         <Button title="Send" onPress={sendMessage} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   botMessage: {
//     backgroundColor: '#f2f2f2',
//     padding: 8,
//     borderRadius: 10,
//     maxWidth: '80%',
//     alignSelf: 'flex-start',
//     margin: 5,
//   },
//   userMessage: {
//     backgroundColor: '#DCF8C6',
//     padding: 8,
//     borderRadius: 10,
//     maxWidth: '80%',
//     alignSelf: 'flex-end',
//     margin: 5,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#f2f2f2',
//     borderTopWidth: 1,
//     borderTopColor: '#e5e5e5',
//   },
//   textInput: {
//     height: 40,
//     flex: 1,
//     marginRight: 10,
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     backgroundColor: 'white',
//   },
// });

// export default ChatApp;

// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';

// const ChatApp = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([]);

//   const sendMessage = async () => {
//     try {
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer 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'
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           temperature: 0.7,
//           max_tokens: 1024,
//           n: 1,
//           stop: 'none',
//           messages: [
//             { role: 'system', content: 'you are a psychologist and will act like one' },
//             { role: 'user', content: inputValue }
//           ]
//         })
//       });
  //     const json = await response.json();
  //     const newMessage = { content: json.choices[0].message.content, role: 'bot' };
  //     setMessages(prevState => [...prevState, newMessage]);
  //     setInputValue('');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={messages.reverse()} // Reverse the order of messages
//         renderItem={({ item }) => (
//           <View style={item.role === 'user' ? styles.userMessage : styles.botMessage}>
//             <Text>{item.content}</Text>
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         inverted
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.textInput}
//           onChangeText={text => setInputValue(text)}
//           value={inputValue}
//           placeholder="Type your message here"
//         />
//         <Button title="Send" onPress={sendMessage} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   botMessage: {
//     backgroundColor: '#f2f2f2',
//     padding: 8,
//     borderRadius: 10,
//     maxWidth: '80%',
//     alignSelf: 'flex-start',
//     margin: 5,
//   },
//   userMessage: {
//     backgroundColor: '#DCF8C6',
//     padding: 8,
//     borderRadius: 10,
//     maxWidth: '80%',
//     alignSelf: 'flex-end',
//     margin: 5,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#f2f2f2',
//     borderTopWidth: 1,
//     borderTopColor: '#e5e5e5',
//   },
//   textInput: {
//     height: 40,
//     flex: 1,
//     marginRight: 10,
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     backgroundColor: 'white',
//   },
// });



// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';

// const ChatApp = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([]);

//   const sendMessage = async () => {
//     try {
//       const newMessage = { content: inputValue, role: 'user' };
//       setMessages(prevState => [newMessage, ...prevState]);
//       setInputValue('');

//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer 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'
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           temperature: 0.7,
//           max_tokens: 1024,
//           n: 1,
//           stop: 'none',
//           messages: [
//             { role: 'system', content: 'you are a psychologist and will act like one' },
//             { role: 'user', content: inputValue }
//           ]
//         })
//       });
//       const json = await response.json();
//       setInputValue('');
//       const botMessage = { content: json.choices[0].message.content, role: 'bot' };
//       setMessages(prevState => [botMessage, ...prevState]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={messages}
//         renderItem={({ item }) => (
//           <View style={item.role === 'user' ? styles.userMessage : styles.botMessage}>
//             <Text style={styles.messageText}>{item.content}</Text>
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={styles.messagesContainer}
//         inverted={true}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.textInput}
//           onChangeText={text => setInputValue(text)}
//           value={inputValue}
//           placeholder="Type your message here"
//         />
//         <Button title="Send" onPress={sendMessage} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   messagesContainer: {
//     flexGrow: 1,
//     justifyContent: 'flex-end',
//   },
//   botMessage: {
//     backgroundColor: '#f2f2f2',
//     padding: 8,
//     borderRadius: 10,
//     maxWidth: '80%',
//     alignSelf: 'flex-start',
//     marginVertical: 5, // vertical margin only
//     marginRight: '20%', // add right margin to distinguish from user messages
//   },
//   userMessage: {
//     backgroundColor: '#DCF8C6',
//     padding: 8,
//     borderRadius: 10,
//     maxWidth: '80%',
//     alignSelf: 'flex-end',
//     marginVertical: 5, // vertical margin only
//     marginLeft: '20%', // add left margin to distinguish from bot messages
//   },
//   messageText: {
//     fontSize: 16, // increase font size for better readability
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#f2f2f2',
//     borderTopWidth: 1,
//     borderTopColor: '#e5e5e5',
//   },
//   textInput: {
//     height: 40,
//     flex: 1,
//     marginRight: 10,
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     backgroundColor: 'white',
//   },
// })


// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, FlatList, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';

// const ChatApp = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     try {
//       setLoading(true);
//       const newMessage = { content: inputValue, role: 'user' };
//       setMessages(prevState => [newMessage, ...prevState]);
//       setInputValue('');

//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer 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'
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           temperature: 0.7,
//           max_tokens: 1024,
//           n: 1,
//           stop: '\n',
//           messages: [
//             { role: 'system', content: 'you are a psychologist and will act like one' },
//             { role: 'user', content: inputValue }
//           ]
//         })
//       });
//       const json = await response.json();
//       setInputValue('');
//       const botMessage = { content: json.choices[0].message.content, role: 'bot' };
//       setMessages(prevState => [botMessage, ...prevState]);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   const renderLoading = () => {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#008080" />
//         <Text style={styles.loadingText}>Please wait...</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: 'white' }}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Triage Bot</Text>
//       </View>
//       <FlatList
//         data={messages}
//         renderItem={({ item }) => (
//           <View style={item.role === 'user' ? styles.userMessage : styles.botMessage}>
//             <Text style={styles.messageText}>{item.content}</Text>
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={styles.messagesContainer}
//         inverted={true}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.textInput}
//           onChangeText={text => setInputValue(text)}
//           value={inputValue}
//           placeholder="Type your message here"
//         />
//         <Button title="Send" onPress={sendMessage} />
//       </View>
//       {loading && renderLoading()}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: 'white',
//     backgroundColor: '#008080', // add a background color for the header
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//     textAlign: 'center',
//   },
//   messagesContainer: {
//     flexGrow: 1,
//     justifyContent: 'flex-end',
// backgroundColor: '#f2f2f2', // add a background color for the message container
// },
// botMessage: {
// backgroundColor: '#f2f2f2',
// padding: 8,
// borderRadius: 10,
// maxWidth: '80%',
// alignSelf: 'flex-start',
// marginVertical: 5, // vertical margin only
// },
// userMessage: {
// backgroundColor: '#DCF8C6',
// padding: 8,
// borderRadius: 10,
// maxWidth: '80%',
// alignSelf: 'flex-end',
// marginVertical: 5, // vertical margin only
// marginLeft: '20%', // add left margin to distinguish from bot messages
// },
// messageText: {
// fontSize: 16, // increase font size for better readability
// },
// inputContainer: {
// flexDirection: 'row',
// justifyContent: 'space-between',
// alignItems: 'center',
// padding: 10,
// backgroundColor: '#f2f2f2',
// borderTopWidth: 1,
// borderTopColor: '#e5e5e5',
// },
// textInput: {
// height: 40,
// flex: 1,
// marginRight: 10,
// borderWidth: 1,
// borderRadius: 10,
// paddingHorizontal: 10,
// backgroundColor: 'white',
// },
// loadingContainer: {
// ...StyleSheet.absoluteFill,
// backgroundColor: 'rgba(0, 0, 0, 0.5)',
// alignItems: 'center',
// justifyContent: 'center',
// },
// loadingText: {
// fontSize: 20,
// color: 'white',
// marginTop: 10,
// },
// });

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import MessageBubble from './MessageBubble';

const ChatApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

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

  const sendMessage = async () => {
    try {
      setLoading(true);
      const newMessage = { content: inputValue, role: 'user' };
      setMessages(prevState => [newMessage, ...prevState]);
      setInputValue('');

      const messages = [
        { role: 'system', content: `Act as an expert ${selectedSpecialty}` },
        { role: 'user', content: inputValue },
      ];
      if (selectedSpecialty) {
        messages.unshift({ role: 'system', content: `Act as an expert ${selectedSpecialty}` });
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer API_KEY',
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
      setInputValue('');
      const botMessage = { content: json.choices[0].message.content, role: 'bot' };
      setMessages(prevState => [botMessage, ...prevState]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#008080" />
        <Text style={styles.loadingText}>Please wait...</Text>
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

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Triage Bot</Text>
        <TouchableOpacity style={styles.specialtyButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.specialtyButtonText}>
            {selectedSpecialty || 'Select a specialty'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        inverted
        data={messages}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <MessageBubble content={item.content} role={item.role} />
        )}
        style={styles.messageList}
      />
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
      {loading && renderLoading()}
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Select the specialty you want</Text>
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
      backgroundColor: '#F7F7F7',
      borderRadius: 20,
      alignSelf: 'flex-start',
      maxWidth: '80%',
    },
    messageContainerBot: {
      backgroundColor: '#e5f1ff',
      alignSelf: 'flex-end',
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
      backgroundColor: '#00bfff',
      padding: 20,
      // Change the width property to adjust the width of the list
      width: '100%',
      alignSelf: 'flex-start',
    },
    modalContent: {
      backgroundColor: 'white',
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
  });
 export default ChatApp;