// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import BookScreen from './src/screens/BookScreen';
import type { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: '絵本一覧' }}
        />
        <Stack.Screen
          name="Book"
          component={BookScreen}
          options={{ title: '絵本' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
