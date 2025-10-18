import React from 'react';
import { Image, View } from 'react-native';
import { Document } from 'shared/icons';

export const LogoCompany = ({
  size,
  url,
}: {
  size: number;
  url: string | null;
}) => {
  if (url) {
    return (
      <Image
        source={{ uri: url }}
        style={{
          aspectRatio: '1 / 1',
          width: size,
          borderRadius: 4,
        }}
      />
    );
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
      }}
    >
      <Document size={32} color="#84868a" />
    </View>
  );
};
