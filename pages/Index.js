import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
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
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>Olá, visitante 👋</Text>
        <Text style={styles.subHeaderText}>Vamos encontrar algo legal perto de você</Text>
      </View>

      <SearchBar onSearch={loadEvents} />

      {onLogout && (
        <View style={styles.logoutButtonContainer}>
          <Button title="Sair" color="#EF4444" onPress={onLogout} />
        </View>
      )}

      <TouchableOpacity style={styles.locationButton} onPress={handleUseCurrentLocation}>
        <Text style={styles.locationButtonText}>🎯 Usar minha localização</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <EventList events={nearbyEvents} title="📍 Eventos Próximos" />
        <EventList events={upcomingEvents} title="📅 Em Breve" />
        <EventList events={recentlyAttended} title="✅ Recentemente Visitados" />
        <EventList events={highlyRatedEvents} title="⭐ Mais Bem Avaliados" />
        <View style={{ height: 40 }} />
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', 
  },
  headerWrapper: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937', 
  },
  subHeaderText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  logoutButtonContainer: {
    marginHorizontal: 20,
    marginTop: 6,
    marginBottom: 6,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  locationButton: {
    marginHorizontal: 20,
    marginTop: 6,
    marginBottom: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#4D7E53', 
    alignItems: 'center',
  },
  locationButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default Index;
