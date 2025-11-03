import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { mockSalons } from '../../data/mockData';

export default function HomeScreen({ navigation }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const { user } = useAuth();

  const categories = [
    { id: '1', name: 'Haircut', icon: 'cut' },
    { id: '2', name: 'Spa', icon: 'water' },
    { id: '3', name: 'Makeup', icon: 'color-palette' },
    { id: '4', name: 'Nails', icon: 'hand-left' },
  ];

  const featuredSalons = mockSalons.slice(0, 3);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.colors.textSecondary }]}>
              Hello,
            </Text>
            <Text style={[styles.userName, { color: theme.colors.text }]}>
              {user?.name || 'Guest'}
            </Text>
          </View>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
            <Ionicons
              name={isDark ? 'sunny' : 'moon'}
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.7}
        >
          <View style={[styles.searchBar, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
            <Text style={[styles.searchPlaceholder, { color: theme.colors.textSecondary }]}>
              Search salons, services...
            </Text>
          </View>
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Categories
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { backgroundColor: theme.colors.surface }]}
              >
                <LinearGradient
                  colors={[theme.colors.primary, theme.colors.secondary]}
                  style={styles.categoryIcon}
                >
                  <Ionicons name={category.icon} size={24} color="#FFF" />
                </LinearGradient>
                <Text style={[styles.categoryName, { color: theme.colors.text }]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Salons */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Featured Salons
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Text style={[styles.seeAll, { color: theme.colors.primary }]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {featuredSalons.map((salon) => (
            <TouchableOpacity
              key={salon.id}
              onPress={() => navigation.navigate('SalonDetail', { salon })}
              style={[styles.salonCard, { backgroundColor: theme.colors.card }]}
            >
              <Image source={{ uri: salon.image }} style={styles.salonImage} />
              <View style={styles.salonInfo}>
                <Text style={[styles.salonName, { color: theme.colors.text }]}>
                  {salon.name}
                </Text>
                <View style={styles.salonMeta}>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={14} color="#FFC107" />
                    <Text style={[styles.ratingText, { color: theme.colors.text }]}>
                      {salon.rating}
                    </Text>
                    <Text style={[styles.reviews, { color: theme.colors.textSecondary }]}>
                      ({salon.reviews})
                    </Text>
                  </View>
                  <View style={styles.distance}>
                    <Ionicons
                      name="location"
                      size={14}
                      color={theme.colors.textSecondary}
                    />
                    <Text style={[styles.distanceText, { color: theme.colors.textSecondary }]}>
                      {salon.distance}
                    </Text>
                  </View>
                </View>
                <View style={styles.services}>
                  {salon.services.slice(0, 3).map((service, index) => (
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
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 14,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  themeToggle: {
    padding: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 24,
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,  // Remove bottom margin when inside sectionHeader
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 16,
    padding: 16,
    borderRadius: 12,
    width: 100,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
  },
  salonCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
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
    height: 120,
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
    marginBottom: 8,
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