import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { TextInput, Button, HelperText, useTheme, Surface } from 'react-native-paper';
import { supabase } from '../lib/supabase';

export default function AddEmployeeScreen({ navigation, route }) {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (route.params?.employee) {
      const { employee } = route.params;
      setName(employee.name);
      setDepartment(employee.department);
      setPosition(employee.position);
      setEmail(employee.email);
      setPhone(employee.phone);
    }
  }, [route.params?.employee]);

  const saveEmployee = async () => {
    if (!name || !department) {
      setError('Name and department are required');
      return;
    }

    try {
      const employeeData = {
        name,
        department,
        position,
        email,
        phone,
      };

      if (route.params?.employee) {
        // Update existing employee
        const { error } = await supabase
          .from('employees')
          .update(employeeData)
          .eq('id', route.params.employee.id);

        if (error) throw error;
      } else {
        // Insert new employee
        const { error } = await supabase
          .from('employees')
          .insert([employeeData]);

        if (error) throw error;
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error saving employee:', error.message);
      setError('Failed to save employee');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Surface style={styles.card}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          mode="flat"
          underlineColor={theme.colors.primary}
        />
        <TextInput
          label="Department"
          value={department}
          onChangeText={setDepartment}
          style={styles.input}
          mode="flat"
          underlineColor={theme.colors.primary}
        />
        <TextInput
          label="Position"
          value={position}
          onChangeText={setPosition}
          style={styles.input}
          mode="flat"
          underlineColor={theme.colors.primary}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
          mode="flat"
          underlineColor={theme.colors.primary}
        />
        <TextInput
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
          mode="flat"
          underlineColor={theme.colors.primary}
        />
        {error ? <HelperText type="error">{error}</HelperText> : null}
        <Button mode="contained" onPress={saveEmployee} style={styles.button}>
          {route.params?.employee ? 'Update Employee' : 'Add Employee'}
        </Button>
      </Surface>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const isWide = width > 700;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    paddingVertical: isWide ? 40 : 20,
  },
  card: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: isWide ? 40 : 16,
    elevation: 4,
    marginTop: isWide ? 40 : 10,
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#f4f3fa',
    borderRadius: 8,
  },
  button: {
    marginTop: 16,
    borderRadius: 24,
    paddingVertical: 8,
    fontWeight: 'bold',
    fontSize: isWide ? 18 : 16,
  },
}); 