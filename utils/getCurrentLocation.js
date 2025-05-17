import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const getCurrentLocation = () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          return reject('Permissão de localização negada');
        }
      }

      Geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords); // latitude, longitude, etc.
        },
        (error) => {
          reject(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};
