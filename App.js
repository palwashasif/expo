import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import EmployeeListScreen from './screens/EmployeeListScreen';
import AddEmployeeScreen from './screens/AddEmployeeScreen';
import DepartmentListScreen from './screens/DepartmentListScreen';

const Stack = createNativeStackNavigator();

// Custom theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2563eb', // blue-600
    accent: '#64748b', // slate-500
    background: '#f8fafc', // slate-50
    surface: '#ffffff', // white
    text: '#1e293b', // slate-800
    placeholder: '#64748b',
    disabled: '#cbd5e1',
    onSurface: '#1e293b',
  },
};

export default function App() {
  useEffect(() => {
    Font.loadAsync({
      ...MaterialCommunityIcons.font,
    });
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider
        theme={theme}
        settings={{
          icon: (props) => <MaterialCommunityIcons {...props} />,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              contentStyle: {
                backgroundColor: theme.colors.background,
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'Employee Management' }}
            />
            <Stack.Screen 
              name="EmployeeList" 
              component={EmployeeListScreen} 
              options={{ title: 'Employees' }}
            />
            <Stack.Screen 
              name="AddEmployee" 
              component={AddEmployeeScreen} 
              options={{ title: 'Add Employee' }}
            />
            <Stack.Screen 
              name="DepartmentList" 
              component={DepartmentListScreen} 
              options={{ title: 'Departments' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
