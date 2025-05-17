export const getCityFromCoords = async ({ latitude, longitude }) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      return data.address.city || data.address.town || data.address.village || 'Localidade não identificada';
    } catch (error) {
      console.error('Erro ao obter cidade:', error);
      return 'Localidade não identificada';
    }
  };
  