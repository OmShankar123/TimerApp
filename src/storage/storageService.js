import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  TIMERS: 'timers',
  TIMER_HISTORY: 'timerHistory',
};

const storageService = {
  async loadTimers() {
    try {
      const storedTimers = await AsyncStorage.getItem(STORAGE_KEYS.TIMERS);
      return storedTimers ? JSON.parse(storedTimers) : { timers: Array(5).fill(null), labels: Array(5).fill('') };
    } catch (error) {
      console.error('Failed to load timers:', error);
      return { timers: Array(5).fill(null), labels: Array(5).fill('') }; // Default value
    }
  },

  async loadTimerHistory() {
    try {
      const storedHistory = await AsyncStorage.getItem(STORAGE_KEYS.TIMER_HISTORY);
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
      console.error('Failed to load timer history:', error);
      return []; // Default value
    }
  },

  async saveTimers(timersData) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TIMERS, JSON.stringify(timersData));
    } catch (error) {
      console.error('Failed to save timers:', error);
    }
  },

  async saveTimerHistory(timerHistory) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TIMER_HISTORY, JSON.stringify(timerHistory));
    } catch (error) {
      console.error('Failed to save timer history:', error);
    }
  },
};

export default storageService;
