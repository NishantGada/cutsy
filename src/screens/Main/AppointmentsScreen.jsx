import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { mockAppointments } from '../../data/mockData';

export default function AppointmentsScreen() {
  const { theme } = useTheme();

  const upcomingAppointments = mockAppointments.filter((apt) => apt.status === 'upcoming');
  const pastAppointments = mockAppointments.filter((apt) => apt.status === 'completed');

  const renderAppointment = (appointment, isUpcoming) => (
    <View
      key={appointment.id}
      style={[styles.appointmentCard, { backgroundColor: theme.colors.card }]}
    >
      <View style={styles.appointmentHeader}>
        <View style={styles.appointmentInfo}>
          <Text style={[styles.salonName, { color: theme.colors.text }]}>
            {appointment.salonName}
          </Text>
          <Text style={[styles.service, { color: theme.colors.textSecondary }]}>
            {appointment.service}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: isUpcoming
                ? theme.colors.success + '20'
                : theme.colors.textSecondary + '20',
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: isUpcoming ? theme.colors.success : theme.colors.textSecondary,
              },
            ]}
          >
            {isUpcoming ? 'Upcoming' : 'Completed'}
          </Text>
        </View>
      </View>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>
            {appointment.date}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>
            {appointment.time}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="cash" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>
            {appointment.price}
          </Text>
        </View>
      </View>

      {isUpcoming && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}
          >
            <Text style={[styles.actionText, { color: theme.colors.text }]}>
              Reschedule
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.error + '20' }]}
          >
            <Text style={[styles.actionText, { color: theme.colors.error }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          My Appointments
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Upcoming
            </Text>
            {upcomingAppointments.map((apt) => renderAppointment(apt, true))}
          </View>
        )}

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Past Appointments
            </Text>
            {pastAppointments.map((apt) => renderAppointment(apt, false))}
          </View>
        )}

        {mockAppointments.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={theme.colors.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No appointments yet
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  appointmentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  salonName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  service: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  appointmentDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
  },
});
