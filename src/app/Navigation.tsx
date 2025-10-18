import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListShift } from 'screens/ListShift/index';
import { Shift } from 'screens/Shift';
import { NavigationStackParamList } from 'shared/types/Navigation';
import ShiftStore from 'shared/store/ShiftStore';

const Stack = createNativeStackNavigator<NavigationStackParamList>();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListShift} />
        <Stack.Screen
          name="Shift"
          component={Shift}
          options={{ title: '' }}
          listeners={{
            beforeRemove: () => {
              ShiftStore.clearShift();
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
