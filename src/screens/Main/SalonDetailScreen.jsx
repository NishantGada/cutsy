import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

export default function SalonDetailScreen({ navigation, route }) {
  const { salon } = route.params;
  const { theme } = useTheme();
  const [selectedService, setSelectedService] = useState(null);

  const handleBookAppointment = () => {
    if (!selectedService) {
      Alert.alert('Select Service', 'Please select a service to book');
      return;
    }
    Alert.alert(
      'Booking Confirmed',
      `Your appointment at ${salon.name} for ${selectedService} has been booked!`,
      [{ text: 'OK', onPress: () => navigation.navigate('Appointments') }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: salon.image }} style={styles.headerImage} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Salon Info */}
        <View style={styles.content}>
          <View style={styles.nameContainer}>
            <Text style={[styles.salonName, { color: theme.colors.text }]}>
              {salon.name}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={[styles.price, { color: theme.colors.primary }]}>
                {salon.price}
              </Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="star" size={18} color="#FFC107" />
              <Text style={[styles.metaText, { color: theme.colors.text }]}>
                {salon.rating} ({salon.reviews} reviews)
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="location" size={18} color={theme.colors.primary} />
              <Text style={[styles.metaText, { color: theme.colors.text }]}>
                {salon.distance}
              </Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="time" size={18} color={theme.colors.textSecondary} />
              <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                {salon.openTime} - {salon.closeTime}
              </Text>
            </View>
          </View>

          <Text style={[styles.address, { color: theme.colors.textSecondary }]}>
            <Ionicons name="location-outline" size={14} /> {salon.address}
          </Text>

          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              About
            </Text>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
              {salon.description}
            </Text>
          </View>

          {/* Services */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Services
            </Text>
            {salon.services.map((service, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedService(service)}
                style={[
                  styles.serviceItem,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor:
                      selectedService === service
                        ? theme.colors.primary
                        : theme.colors.border,
                    borderWidth: selectedService === service ? 2 : 1,
                  },
                ]}
              >
                <View style={styles.serviceInfo}>
                  <Text style={[styles.serviceName, { color: theme.colors.text }]}>
                    {service}
                  </Text>
                  <Text style={[styles.servicePrice, { color: theme.colors.textSecondary }]}>
                    From $30
                  </Text>
                </View>
                {selectedService === service && (
                  <Ionicons name="checkmark-circle" size={24} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Book Button */}
      <View style={[styles.footer, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity onPress={handleBookAppointment}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.secondary]}
            style={styles.bookButton}
          >
            <Text style={styles.bookButtonText}>Book Appointment</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageContainer: { position: 'relative' },
  headerImage: {
    width: '100%',
    height: 250,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  salonName: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  priceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FF6B9D20',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    marginLeft: 6,
    fontSize: 14,
  },
  address: {
    fontSize: 14,
    marginBottom: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  bookButton: {
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});