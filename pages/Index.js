import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Button, SafeAreaView } from 'react-native';
import SearchBar from '../components/layout/SearchBar';
import EventList from '../components/events/EventList';
import BottomNav from '../components/layout/BottomNav';
import { getEventsByLocation } from '../services/eventService';
import { getCurrentLocation } from '../utils/getCurrentLocation';

const Index = ({ onLogout }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async (searchLocation = '') => {
    try {
      const fetchedEvents = await getEventsByLocation(searchLocation);
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      const coords = await getCurrentLocation();
      console.log('Localização atual:', coords);
    } catch (error) {
      console.warn('Erro ao obter localização:', error);
    }
  };

  const upcomingEvents = events.slice(0, 3);
  const highlyRatedEvents = [...events].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3);
  const recentlyAttended = events.slice(2, 5);
  const nearbyEvents = events.slice(1, 4);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <SearchBar onSearch={loadEvents} />

        {onLogout && (
          <View style={styles.logoutButtonContainer}>
            <Button title="Sair" color="#DC2626" onPress={onLogout} />
          </View>
        )}

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.locationButtonContainer}>
            <Button title="Usar minha localização" onPress={handleUseCurrentLocation} />
          </View>

          <EventList events={nearbyEvents} title="Eventos Próximos" />
          <EventList events={upcomingEvents} title="Em Breve" />
          <EventList events={recentlyAttended} title="Recentemente Visitados" />
          <EventList events={highlyRatedEvents} title="Mais Bem Avaliados" />
        </ScrollView>

        <BottomNav />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB',
  },
  inner: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 120,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  logoutButtonContainer: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  locationButtonContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
});

export default Index;
