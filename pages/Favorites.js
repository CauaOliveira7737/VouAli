import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Favorites = () => (
  <View style={styles.container}>
    <Text style={styles.title}>⭐ Meus Favoritos</Text>
    <Text style={styles.message}>Você ainda não adicionou nenhum evento favorito.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFCE8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#92400E',
    textAlign: 'center',
  },
});

export default Favorites;