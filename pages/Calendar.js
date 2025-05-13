import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Calendar = () => (
  <View style={styles.container}>
    <Text style={styles.title}>📅 Calendário de Eventos</Text>
    <Text style={styles.subtitle}>Em breve...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default Calendar;