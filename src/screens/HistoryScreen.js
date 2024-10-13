import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const HistoryScreen = ({ route }) => {
  const navigation = useNavigation();
  const { timerHistory } = route.params; // Get history from route params
  console.log("History ", timerHistory);

  const renderItem = ({ item }) => (
    <View style={styles.historyItemContainer}>
      <Text style={styles.historyItem}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Timer History</Text>
      </View>
      
      {timerHistory.length > 0 ? (
        <FlatList
          data={timerHistory}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noHistory}>No history available.</Text>
      )}
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
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  historyItemContainer: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  historyItem: {
    color: colors.text,
    fontSize: 16,
  },
  noHistory: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default HistoryScreen;
