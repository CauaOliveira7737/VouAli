import * as Location from 'expo-location';

export async function getCurrentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permissão de localização negada');
  }

  const location = await Location.getCurrentPositionAsync({});
  return location;
}