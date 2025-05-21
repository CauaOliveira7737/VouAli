import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../components/layout/SearchBar';
import EventList from '../components/events/EventList';
import { getEventsByLocation } from '../services/eventService';
import { getCurrentLocation } from '../utils/getCurrentLocation';
import { getCityFromCoords } from '../utils/geolocationHelpers';
import { Ionicons } from '@expo/vector-icons';

const Index = ({ onLogout }) => {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('loggedInUser');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setName(parsedUser.nome);
        }
      } catch (e) {
        console.error('Erro ao carregar usuário:', e);
      }
    };

    const loadSavedCityOrGetCurrent = async () => {
      try {
        const savedCity = await AsyncStorage.getItem('userCity');
        if (savedCity) {
          setCity(savedCity);
        } else {
          const coords = await getCurrentLocation();
          const cityName = await getCityFromCoords(coords);
          setCity(cityName);
          await AsyncStorage.setItem('userCity', cityName);
        }
      } catch (e) {
        console.error('Erro ao obter cidade atual:', e);
      }
    };

    loadUser();
    loadEvents(); 
    loadSavedCityOrGetCurrent(); 
  }, []);

  const loadEvents = async (searchLocation = '') => {
    try {
      const fetchedEvents = await getEventsByLocation(searchLocation);
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    }
  };

  const upcomingEvents = events.slice(0, 3);
  const highlyRatedEvents = [...events].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3);
  const recentlyAttended = events.slice(2, 5);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.g_01_header}>
          <View style={styles.nomerow}>
            <Ionicons name="person-circle-outline" size={40} color="#fff" />
            <Text style={styles.headerText}>{name || 'visitante'}</Text>
          </View>
          {city && (
            <View style={styles.cityRow}>
              <Ionicons name="location-outline" size={16} color="#fff" />
              <Text style={styles.subHeaderText}>{city}</Text>
            </View>
          )}
        </View>
        <Image source={require('../assets/logobranca.png')} style={styles.image} />
      </View>

      <SearchBar onSearch={loadEvents} />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <EventList events={upcomingEvents} title="Em Breve" />
        <EventList events={recentlyAttended} title="Recentemente Visitados" />
        <EventList events={highlyRatedEvents} title="Mais Bem Avaliados" />
        <View style={{ height: 40 }} />
      </ScrollView>

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
    paddingTop: 38,
    paddingBottom: 12,
    backgroundColor: '#4D7E53',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: -3,
    marginLeft: 2,
  },
  subHeaderText: {
    fontSize: 14,
    color: '#fff',
    marginTop: -1,
    fontWeight: '400',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  image: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
    margin: -30,
    alignSelf: 'center',
  },
  g_01_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: -35,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 4,
  },
  nomerow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Index;
