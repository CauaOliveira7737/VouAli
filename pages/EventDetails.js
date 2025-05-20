import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { getEventById } from '../services/eventService';

const EventDetails = ({ route, navigation }) => {
  const { id } = route.params;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const result = await getEventById(id);
      setEvent(result);
    };
    fetchEvent();
  }, [id]);

  if (!event) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4D7E53" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source ={{ uri: event.image }}
          style={styles.image}
        />

        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.date}>{event.date} às {event.time}</Text>
          <Text style={styles.location}>📍 {event.location}</Text>

          <Text style={styles.sectionTitle}>Sobre o Evento</Text>
          <Text style={styles.description}>{event.description}</Text>

          <Text style={styles.sectionTitle}>Categoria</Text>
          <Text style={styles.category}>{event.category}</Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>⬅ Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 60,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  category: {
    fontSize: 14,
    color: '#4B5563',
  },
  backButton: {
    marginTop: 28,
    backgroundColor: '#4D7E53',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default EventDetails;
