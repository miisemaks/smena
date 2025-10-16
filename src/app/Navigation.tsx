import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ListSmena } from 'screens/ListSmena/index';

const Drawer = createDrawerNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="List"
          component={ListSmena}
          options={{
            title: 'Список',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
