import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      throw new Error('Permissão de localização negada');
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      timeout: 5000,
    });

    return location.coords;
  } catch (error) {
    console.warn('Erro ao obter localização:', error);
    throw error;
  }
};
