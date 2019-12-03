import AsyncStorage from '@react-native-community/async-storage'

class Storage {
	constructor () {

	}

	async set(key, value) {
		try {
	    await AsyncStorage.setItem(key, value)
	  } catch (e) {
	    // saving error
	  }
	}

	async get(key) {
		try {
	    return await AsyncStorage.getItem(key)
	  } catch(e) {
	    // error reading value
	  }
	}

}

export default new Storage()