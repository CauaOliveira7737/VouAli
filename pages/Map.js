import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Map = () => (
  <View style={styles.container}>
    <Text style={styles.title}>🗺️ Mapa de Eventos</Text>
    <Text style={styles.subtitle}>Funcionalidade em desenvolvimento.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0369A1',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#0369A1',
  },
});

export default Map;
