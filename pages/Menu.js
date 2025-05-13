import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Menu = () => (
  <View style={styles.container}>
    <Text style={styles.title}>📋 Menu</Text>
    <Text style={styles.text}>Aqui ficará o menu de opções do usuário.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#047857',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#065F46',
  },
});

export default Menu;