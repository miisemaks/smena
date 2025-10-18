import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { colors } from 'shared/styles/colors';

type Props = {
  text: string;
};

export const Chip = React.memo((props: Props) => {
  const { text } = props;

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.bgPrimary,
  },
});
