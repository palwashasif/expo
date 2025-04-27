import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Title, Surface, IconButton, useTheme } from 'react-native-paper';

const actions = [
  {
    label: 'View Employees',
    icon: 'account-group',
    nav: 'EmployeeList',
    color: '#2563eb',
  },
  {
    label: 'Add New Employee',
    icon: 'account-plus',
    nav: 'AddEmployee',
    color: '#64748b',
  },
  {
    label: 'View Departments',
    icon: 'folder-multiple',
    nav: 'DepartmentList',
    color: '#0ea5e9',
  },
];

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Title style={[styles.title, { color: theme.colors.primary }]}>Employee Management System</Title>
        <View style={styles.actionGrid}>
          {actions.map((action, idx) => (
            <View key={action.label} style={styles.actionCard}>
              <IconButton
                icon={action.icon}
                size={48}
                iconColor={action.color}
                style={styles.icon}
              />
              <Button
                mode="contained"
                onPress={() => navigation.navigate(action.nav)}
                style={[styles.button, { backgroundColor: action.color }]}
                labelStyle={styles.buttonLabel}
                contentStyle={{ height: 48 }}
              >
                {action.label}
              </Button>
            </View>
          ))}
        </View>
      </Surface>
    </View>
  );
}

const { width } = Dimensions.get('window');
const isWide = width > 700;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: isWide ? 40 : 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  surface: {
    padding: isWide ? 40 : 16,
    elevation: 4,
    borderRadius: 16,
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 900,
    minHeight: 350,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: isWide ? 60 : 20,
  },
  title: {
    fontSize: isWide ? 32 : 22,
    marginBottom: isWide ? 40 : 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  actionGrid: {
    flexDirection: isWide ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: isWide ? 32 : 16,
    width: '100%',
  },
  actionCard: {
    alignItems: 'center',
    marginBottom: isWide ? 0 : 24,
    flex: 1,
    minWidth: isWide ? 220 : '100%',
    maxWidth: 300,
  },
  icon: {
    marginBottom: 8,
  },
  button: {
    borderRadius: 24,
    width: isWide ? 220 : '100%',
    elevation: 2,
  },
  buttonLabel: {
    fontSize: isWide ? 18 : 16,
    fontWeight: 'bold',
    color: 'white',
  },
}); 