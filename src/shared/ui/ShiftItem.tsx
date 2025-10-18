import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { LogoCompany } from './LogoCompany';
import { colors } from 'shared/styles/colors';
import { getPrice } from 'shared/lib';
import React from 'react';

export const ShiftItem = React.memo(
  ({
    companyName,
    url,
    address,
    price,
    date,
    timeStart,
    timeEnd,
    rating,
    onPress,
  }: {
    companyName: string;
    url: string | null;
    address: string;
    price: number;
    date: string;
    timeStart: string;
    timeEnd: string;
    rating: number;
    onPress: () => void;
  }) => {
    const { width } = useWindowDimensions();
    const size = width - 88;

    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.companyView}>
          <LogoCompany size={40} url={url} />
          <View>
            <Text
              style={[
                styles.companyName,
                {
                  width: size,
                },
              ]}
              numberOfLines={1}
            >
              {companyName}
            </Text>
            {rating ? (
              <Text style={{ color: colors.yellow, fontWeight: 500 }}>
                {rating}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={styles.priceView}>
          <Text style={styles.price}>{getPrice(price)}</Text>
          <Text style={styles.date}>
            {timeStart} - {timeEnd}, {date}
          </Text>
        </View>
        <Text
          numberOfLines={1}
          style={[
            styles.address,
            {
              width: size + 24,
            },
          ]}
        >
          {address}
        </Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    gap: 4,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 12,
  },
  companyView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 500,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 14,
    fontWeight: 500,
  },
  date: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: 500,
  },
  address: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
