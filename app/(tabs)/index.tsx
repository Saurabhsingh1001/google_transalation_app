import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to English

  const languages = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    pt: 'Portuguese',
  };

  const translateText = async () => {
    const API_KEY = 'AIzIaSyD-aG793553l0PIZlLRkJVDN2RpJkHoNqH-SBII';
    // https://translation.googleapis.com/language/translate/v2?key=YOUR_RANDOM_API_KEY&q=hello&target=fr

    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

    try {
      const response = await axios.post(url, {
        q: text,
        target: selectedLanguage,
      });

      const translatedText = response.data.data.translations[0].translatedText;
      setTranslatedText(translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter text to translate:</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={(text) => setText(text)}
        placeholder="Enter text"
      />

      <Text style={styles.label}>Select a language:</Text>
      <Picker
        selectedValue={selectedLanguage}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
      >
        {Object.keys(languages).map((lang) => (
          <Picker.Item key={lang} label={languages[lang]} value={lang} />
        ))}
      </Picker>

      <Button title="Translate" onPress={translateText} />

      {translatedText !== '' && (
        <Text style={styles.result}>Translated Text: {translatedText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
