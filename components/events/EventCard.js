import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EventCard = ({ id, title, description, date, time, location, image, rating = 0 }) => {
  const navigation = useNavigation();
  const defaultImage = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop';

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EventDetails', { id })}>
      <Image source={{ uri: image || defaultImage }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <Text style={styles.info}>{`${date} às ${time}`}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    maxWidth: 320,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 160,
  },
  detailsContainer: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  info: {
    fontSize: 13,
    color: '#374151',
  },
  location: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 6,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
  },
});

export default EventCard;