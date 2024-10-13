import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import Timer from '../components/Timer';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import storageService from '../storage/storageService'; 
import Icon from 'react-native-vector-icons/Ionicons'; // Importing the icon library

const MAX_TIMERS = 5;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [timers, setTimers] = useState(Array(MAX_TIMERS).fill(null));
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [timerLabels, setTimerLabels] = useState(Array(MAX_TIMERS).fill(''));
  const [currentLabel, setCurrentLabel] = useState('');
  const [timerHistory, setTimerHistory] = useState([]);

  useEffect(() => {
    const loadTimers = async () => {
      const storedTimers = await storageService.loadTimers();
      const storedHistory = await storageService.loadTimerHistory();

      setTimers(storedTimers.timers);
      setTimerLabels(storedTimers.labels);
      setTimerHistory(storedHistory);
    };

    loadTimers();
  }, []);

  useEffect(() => {
    const storeTimers = async () => {
      await storageService.saveTimers({ timers, labels: timerLabels });
      await storageService.saveTimerHistory(timerHistory);
    };

    storeTimers();
  }, [timers, timerLabels, timerHistory]);

  const addTimer = (totalTime, label) => {
    const updatedTimers = [...timers];
    const index = updatedTimers.findIndex((t) => t === null);
    
    if (index !== -1) {
      updatedTimers[index] = totalTime;
      setTimers(updatedTimers);
      const updatedLabels = [...timerLabels];
      updatedLabels[index] = label;
      setTimerLabels(updatedLabels);
    } else {
      Alert.alert('Maximum Timer Limit', 'You can only set a maximum of five timers.');
    }
  };

  const handleInputSubmit = () => {
    const totalTime =
      (parseInt(hours) || 0) * 3600 +
      (parseInt(minutes) || 0) * 60 +
      (parseInt(seconds) || 0);
    
    if (totalTime > 0 && currentLabel.trim() !== '') {
      addTimer(totalTime, currentLabel.trim());
      setHours('');
      setMinutes('');
      setSeconds('');
      setCurrentLabel('');
    } else {
      Alert.alert('Invalid Input', 'Please enter valid time greater than 0 and a label.');
    }
  };

  const removeTimer = (index) => {
    const updatedTimers = [...timers];
    updatedTimers[index] = null;
    setTimers(updatedTimers);
    const updatedLabels = [...timerLabels];
    updatedLabels[index] = '';
    setTimerLabels(updatedLabels);
  };

  const handleTimerComplete = (originalTime, label) => {
    const completedTime = formatTime(originalTime);
    setTimerHistory((prevHistory) => [...prevHistory, `${label}: ${completedTime}`]);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Enter Timer Duration:</Text>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('History', { timerHistory })}
        >
          <Icon name="time-outline" size={30} color={colors.text} /> 
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Hours"
          keyboardType="numeric"
          value={hours}
          onChangeText={setHours}
          style={styles.input}
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          placeholder="Minutes"
          keyboardType="numeric"
          value={minutes}
          onChangeText={setMinutes}
          style={styles.input}
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          placeholder="Seconds"
          keyboardType="numeric"
          value={seconds}
          onChangeText={setSeconds}
          style={styles.input}
          placeholderTextColor={colors.placeholder}
        />
      </View>
      <TextInput
        placeholder="Timer Label"
        value={currentLabel}
        onChangeText={setCurrentLabel}
        style={styles.input}
        placeholderTextColor={colors.placeholder}
      />
      
      <TouchableOpacity style={styles.addButton} onPress={handleInputSubmit}>
        <Icon name="timer-outline" size={24} color={colors.text} /> 
        <Text style={styles.addButtonText}>Add Timer</Text>
      </TouchableOpacity>

      <ScrollView style={styles.timerList}>
        {timers.map((duration, index) => {
          return duration ? (
            <Timer
              key={index}
              duration={duration}
              onRemove={() => removeTimer(index)}
              label={timerLabels[index]}
              onComplete={(time) => handleTimerComplete(time, timerLabels[index])}
            />
          ) : null;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 15,
    width: '30%',
    borderColor: colors.secondary,
    backgroundColor: colors.surface,
    color: colors.text,
    borderRadius: 8,
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10, 
  },
  historyButton: {
    padding: 10,
    bottom:10
  },
  timerList: {
    marginTop: 10,
  },
});

export default HomeScreen;
