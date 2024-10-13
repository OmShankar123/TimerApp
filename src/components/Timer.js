import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useTimer from '../hooks/useTimer';
import { colors } from '../theme/colors';
import { PieChart as GiftedPieChart } from 'react-native-gifted-charts';

const Timer = ({ duration, onRemove, label, onComplete }) => {
  const { time, start, pause, reset, isActive } = useTimer(duration, () => {
    Alert.alert("Timer Finished", `Timer "${label}" finished. Initial Time: ${formatTime(duration)}`);
    onComplete(duration);
  });

  const data = [
    { value: time, color: colors.primary, label: 'Remaining' },
    { value: duration - time, color: colors.secondary, label: 'Elapsed' },
  ];

  const confirmRemove = () => {
    Alert.alert(
      "Delete Timer",
      `Are you sure you want to delete the timer "${label}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: onRemove }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.initialTime}>{`Initial Time: ${formatTime(duration)}`}</Text>

      <View style={styles.chartContainer}>
        <GiftedPieChart
          data={data}
          donut
          showGradient
          radius={60}
          innerRadius={45}
          innerCircleColor={'#232B5D'}
          centerLabelComponent={() => (
            <View style={styles.centerLabel}>
              <Text style={styles.centerLabelText}>{`${formatTime(time)}`}</Text>
              <Text style={styles.centerLabelSubText}>Remaining</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={isActive ? pause : start}>
          <Icon name={isActive ? "pause" : "play"} size={20} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Icon name="refresh" size={20} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={confirmRemove}>
          <Icon name="trash" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: colors.surface,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  label: {
    color: colors.text,
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  initialTime: {
    color: colors.text,
    fontSize: 14,
    marginBottom: 5,
  },
  chartContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLabelText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  centerLabelSubText: {
    fontSize: 14,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    borderRadius: 5,
    elevation: 3,
  },
});

export default Timer;
