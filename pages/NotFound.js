import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotFound = () => (
  <View style={styles.container}>
    <Text style={styles.title}>🚫 Página não encontrada</Text>
    <Text style={styles.message}>Verifique se o endereço está correto.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B91C1C',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#7F1D1D',
    textAlign: 'center',
  },
});

export default NotFound;
