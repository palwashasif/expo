import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { List, FAB, Searchbar, Surface, useTheme } from 'react-native-paper';
import { supabase } from '../lib/supabase';

export default function EmployeeListScreen({ navigation }) {
  const theme = useTheme();
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('name');

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error loading employees:', error.message);
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderEmployee = ({ item }) => (
    <List.Item
      title={item.name}
      description={`Department: ${item.department}`}
      left={props => <List.Icon {...props} icon="account" color={theme.colors.primary} />}
      right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.accent} />}
      onPress={() => navigation.navigate('AddEmployee', { employee: item })}
      style={styles.listItem}
    />
  );

  return (
    <View style={styles.bg}>
      <Surface style={styles.card}>
        <Searchbar
          placeholder="Search employees"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
        <FlatList
          data={filteredEmployees}
          renderItem={renderEmployee}
          keyExtractor={item => item.id}
          style={styles.list}
        />
        <FAB
          style={styles.fab}
          icon="plus"
          color="#fff"
          onPress={() => navigation.navigate('AddEmployee')}
        />
      </Surface>
    </View>
  );
}

const { width } = Dimensions.get('window');
const isWide = width > 700;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    paddingVertical: isWide ? 40 : 20,
  },
  card: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: isWide ? 40 : 16,
    elevation: 4,
    minHeight: 400,
    flex: 1,
    position: 'relative',
  },
  searchbar: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f4f3fa',
  },
  list: {
    flex: 1,
  },
  listItem: {
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: '#f8fafc',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2563eb',
  },
}); 