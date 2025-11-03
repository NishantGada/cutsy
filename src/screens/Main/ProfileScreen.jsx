import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: logout, style: 'destructive' },
    ]);
  };

  const menuItems = [
    { id: '1', icon: 'person-outline', title: 'Edit Profile', action: () => { } },
    { id: '2', icon: 'notifications-outline', title: 'Notifications', action: () => { } },
    { id: '3', icon: 'heart-outline', title: 'Favorites', action: () => { } },
    { id: '4', icon: 'card-outline', title: 'Payment Methods', action: () => { } },
    { id: '5', icon: 'settings-outline', title: 'Settings', action: () => { } },
    { id: '6', icon: 'help-circle-outline', title: 'Help & Support', action: () => { } },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary]}
          style={styles.profileHeader}
        >
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <Text style={styles.phone}>{user?.phone}</Text>
        </LinearGradient>

        {/* Stats */}
        <View style={[styles.statsContainer, { backgroundColor: theme.colors.card }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>12</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Bookings
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>8</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Reviews
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>5</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Favorites
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.action}
              style={[styles.menuItem, { backgroundColor: theme.colors.card }]}
            >
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon} size={24} color={theme.colors.text} />
                <Text style={[styles.menuTitle, { color: theme.colors.text }]}>
                  {item.title}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          ))}

          {/* Theme Toggle */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={[styles.menuItem, { backgroundColor: theme.colors.card }]}
          >
            <View style={styles.menuLeft}>
              <Ionicons
                name={isDark ? 'moon' : 'sunny'}
                size={24}
                color={theme.colors.text}
              />
              <Text style={[styles.menuTitle, { color: theme.colors.text }]}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </View>
            <View
              style={[
                styles.toggle,
                { backgroundColor: isDark ? theme.colors.primary : theme.colors.border },
              ]}
            >
              <View
                style={[
                  styles.toggleCircle,
                  { transform: [{ translateX: isDark ? 20 : 2 }] },
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutContainer}>
          <LinearGradient
            colors={[theme.colors.error, '#C0392B']}
            style={styles.logoutButton}
          >
            <Ionicons name="log-out-outline" size={24} color="#FFF" />
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={[styles.version, { color: theme.colors.textSecondary }]}>
          Version 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileHeader: {
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFF',
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
  phone: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  menuContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 20,
  },
});