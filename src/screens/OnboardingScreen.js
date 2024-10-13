// OnboardingScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

const STORAGE_KEYS = {
  USER_NAME: 'userName',
};

const OnboardingScreen = () => {
  const [name, setName] = useState('');
  const [storedName, setStoredName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadName = async () => {
      try {
        const nameFromStorage = await AsyncStorage.getItem(STORAGE_KEYS.USER_NAME);
        if (nameFromStorage) {
          setStoredName(nameFromStorage);
        }
      } catch (error) {
        console.error('Failed to load name:', error);
      }
    };

    loadName();
  }, []);

  const handleSubmit = async () => {
    if (name.trim() === '') {
      Alert.alert('Input Required', 'Please enter your name.');
    } else {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_NAME, name);
        Alert.alert('Welcome!', `Hello, ${name}! Thank you for using the Timer App.`);
        navigation.navigate('Home'); // Navigate to Home screen after submission
      } catch (error) {
        console.error('Failed to save name:', error);
      }
    }
  };

  const handleGetStarted = () => {
    if (storedName) {
      Alert.alert('Welcome Back!', `Hello, ${storedName}!`);
      navigation.replace('Home'); // Navigate to Home if name exists
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Timer App!</Text>
      <Text style={styles.description}>
        This app allows you to set multiple timers and track your time effectively.
      </Text>
      <Text style={styles.highlightedDescription}>
        You can manage your timers and view the history of completed timers to help you stay organized and efficient!
      </Text>
      {storedName ? (
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hello, {storedName}!</Text>
          <TouchableOpacity style={styles.submitButton} onPress={handleGetStarted}>
            <Text style={styles.submitButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          placeholder="Enter your name to know you better 😊 "
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor={colors.placeholder}
        />
      )}
      {!storedName && (
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Get Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 15,
    textAlign: 'center',
  },
  highlightedDescription: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  greetingContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 20,
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 15,
    width: '90%',
    borderColor: colors.secondary,
    backgroundColor: colors.surface,
    color: colors.text,
    borderRadius: 25,
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 15,
    width: '90%',
    alignItems: 'center',
    borderRadius: 25,
  },
  submitButtonText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default OnboardingScreen;
