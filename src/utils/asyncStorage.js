import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (method,value) => {
    console.log(method,value,'store data')
    try {
      await AsyncStorage.setItem(method, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

 export  const getData = async (method) => {
    try {
      const savedData = await AsyncStorage.getItem(method);
      const currentData = JSON.parse(savedData);
      console.log(currentData,'dataa here');
    } catch (error) {
      console.log(error);
    }
  };

  export const removeData = async () => {
    try {
      const savedData = await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };


 