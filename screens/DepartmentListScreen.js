import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { List, Searchbar, Divider, Surface, useTheme } from 'react-native-paper';
import { supabase } from '../lib/supabase';

export default function DepartmentListScreen() {
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
        .order('department');

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error loading employees:', error.message);
    }
  };

  const getDepartments = () => {
    const departments = {};
    employees.forEach(employee => {
      if (!departments[employee.department]) {
        departments[employee.department] = [];
      }
      departments[employee.department].push(employee);
    });
    return departments;
  };

  const filteredDepartments = Object.entries(getDepartments())
    .filter(([department]) =>
      department.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const renderDepartment = ({ item: [department, employees] }) => (
    <List.Accordion
      title={department}
      description={`${employees.length} employees`}
      left={props => <List.Icon {...props} icon="folder" color={theme.colors.primary} />}
      style={styles.accordion}
    >
      {employees.map(employee => (
        <List.Item
          key={employee.id}
          title={employee.name}
          description={employee.position}
          left={props => <List.Icon {...props} icon="account" color={theme.colors.accent} />}
          style={styles.listItem}
        />
      ))}
    </List.Accordion>
  );

  return (
    <View style={styles.bg}>
      <Surface style={styles.card}>
        <Searchbar
          placeholder="Search departments"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
        <FlatList
          data={filteredDepartments}
          renderItem={renderDepartment}
          keyExtractor={([department]) => department}
          ItemSeparatorComponent={() => <Divider />}
          style={styles.list}
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
  },
  searchbar: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f4f3fa',
  },
  list: {
    flex: 1,
  },
  accordion: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    marginBottom: 4,
  },
  listItem: {
    borderRadius: 8,
    marginBottom: 2,
    backgroundColor: '#fff',
  },
}); 