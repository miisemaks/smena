import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ListSmena = () => {
  const { left, right, bottom } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingLeft: left ?? 0,
        paddingRight: right ?? 0,
        paddingBottom: bottom ?? 0,
      }}
    >
      <Text>ListSmena</Text>
    </View>
  );
};
