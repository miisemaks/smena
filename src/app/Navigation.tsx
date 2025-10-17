import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListSmena } from 'screens/ListSmena/index';
import { Smena } from 'screens/Smena';
import { NavigationStackParamList } from 'shared/types/Navigation';

const Stack = createNativeStackNavigator<NavigationStackParamList>();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListSmena} />
        <Stack.Screen name="Smena" component={Smena} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
