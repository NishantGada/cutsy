import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { mockSalons } from '../../data/mockData';

export default function SearchScreen({ navigation }) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSalons, setFilteredSalons] = useState(mockSalons);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredSalons(mockSalons);
    } else {
      const filtered = mockSalons.filter(
        (salon) =>
          salon.name.toLowerCase().includes(text.toLowerCase()) ||
          salon.services.some((service) =>
            service.toLowerCase().includes(text.toLowerCase())
          )
      );
      setFilteredSalons(filtered);
    }
  };

  const renderSalonItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('SalonDetail', { salon: item })}
      style={[styles.salonCard, { backgroundColor: theme.colors.card }]}
    >
      <Image source={{ uri: item.image }} style={styles.salonImage} />
      <View style={styles.salonInfo}>
        <Text style={[styles.salonName, { color: theme.colors.text }]}>
          {item.name}
        </Text>
        <View style={styles.salonMeta}>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#FFC107" />
            <Text style={[styles.ratingText, { color: theme.colors.text }]}>
              {item.rating}
            </Text>
            <Text style={[styles.reviews, { color: theme.colors.textSecondary }]}>
              ({item.reviews})
            </Text>
          </View>
          <View style={styles.distance}>
            <Ionicons
              name="location"
              size={14}
              color={theme.colors.textSecondary}
            />
            <Text style={[styles.distanceText, { color: theme.colors.textSecondary }]}>
              {item.distance}
            </Text>
          </View>
        </View>
        <Text style={[styles.address, { color: theme.colors.textSecondary }]}>
          {item.address}
        </Text>
        <View style={styles.services}>
          {item.services.slice(0, 3).map((service, index) => (
            <View
              key={index}
              style={[styles.serviceTag, { backgroundColor: theme.colors.surface }]}
            >
              <Text style={[styles.serviceText, { color: theme.colors.primary }]}>
                {service}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Search Salons
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Input */}
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface }]}>
        <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search by name or service..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={handleSearch}
          autoFocus
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Results */}
      <View style={styles.resultsHeader}>
        <Text style={[styles.resultsText, { color: theme.colors.textSecondary }]}>
          {filteredSalons.length} salons found
        </Text>
      </View>

      <FlatList
        data={filteredSalons}
        renderItem={renderSalonItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 20,
  },
  salonCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  salonImage: {
    width: 120,
    height: 140,
  },
  salonInfo: {
    flex: 1,
    padding: 12,
  },
  salonName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  salonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 12,
    marginLeft: 4,
  },
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    marginLeft: 4,
  },
  address: {
    fontSize: 12,
    marginBottom: 8,
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginTop: 4,
  },
  serviceText: {
    fontSize: 11,
    fontWeight: '600',
  },
});