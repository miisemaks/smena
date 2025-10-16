import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationScreenProps } from 'shared/types/Navigation';

type Props = NavigationScreenProps<'Smena'>;

export const Smena = (props: Props) => {
  const {} = props;
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
      <Text>Smena Screen</Text>
    </View>
  );
};
