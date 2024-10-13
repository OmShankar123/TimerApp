import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Timer from '../components/Timer';
import { colors } from '../theme/colors';

const TimerScreen = ({ route, navigation }) => {
  const { duration, index, onRemove } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Timer ${index + 1}`}</Text>
      <Timer 
        duration={duration} 
        onRemove={() => {
          onRemove(index);  // Call the remove function passed from HomeScreen
          navigation.goBack();  // Navigate back after removal
        }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

export default TimerScreen;
