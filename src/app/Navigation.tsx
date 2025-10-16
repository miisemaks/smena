import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListSmena } from 'screens/ListSmena/index';
import { Smena } from 'screens/Smena';
import {
  DrawerParamList,
  NavigationStackParamList,
} from 'shared/types/Navigation';

const Drawer = createDrawerNavigator<DrawerParamList>();

const Stack = createNativeStackNavigator<NavigationStackParamList>();

const DrawerScreens = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="List"
        component={ListSmena}
        options={{
          title: 'Список',
        }}
      />
    </Drawer.Navigator>
  );
};

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Drawer"
          component={DrawerScreens}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Smena" component={Smena} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
