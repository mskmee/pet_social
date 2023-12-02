import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  constructor() {
    this.storage = AsyncStorage;
  }

  async set(key, value) {
    try {
      return await this.storage.setItem(key, value);
    } catch (error) {
      console.log('Error setting key', error);
    }
  }

  async get(key) {
    try {
      return await this.storage.getItem(key);
    } catch (error) {
      console.log('Error getting value', error);
    }
  }
}

export const storage = new Storage();
