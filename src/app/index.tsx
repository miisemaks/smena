/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigation } from './Navigation';
import { QueryClientProvider } from '@tanstack/react-query';
import { client } from 'shared/api/client';
import { Provider } from 'mobx-react';
import ShiftStore from 'shared/store/ShiftStore';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <Provider shiftStore={ShiftStore}>
        <QueryClientProvider client={client}>
          <GestureHandlerRootView>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <AppNavigation />
          </GestureHandlerRootView>
        </QueryClientProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
