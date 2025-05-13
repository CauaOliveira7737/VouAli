import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventDetails = ({ route }) => {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes do Evento</Text>
      <Text style={styles.text}>ID do evento: {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111827',
  },
  text: {
    fontSize: 16,
    color: '#4B5563',
  },
});

export default EventDetails;
