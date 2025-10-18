import React from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationScreenProps } from 'shared/types/Navigation';
import { observer } from 'mobx-react-lite';
import ShiftStore from 'shared/store/ShiftStore';
import { LogoCompany } from 'shared/ui/LogoCompany';
import { colors } from 'shared/styles/colors';
import { getPrice } from 'shared/lib';
import { Chip } from 'shared/ui/Chip';

type Props = NavigationScreenProps<'Shift'>;

export const Shift = observer((props: Props) => {
  const {} = props;
  const { left, right, bottom } = useSafeAreaInsets();
  const data = ShiftStore.shift;

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: 16,
        paddingLeft: 16 + (left ?? 0),
        paddingRight: 16 + (right ?? 0),
        paddingBottom: bottom ?? 0,
        backgroundColor: colors.bgSecondary,
      }}
      contentContainerStyle={{ gap: 16 }}
    >
      <View style={styles.companyView}>
        <LogoCompany size={32} url={data?.logo!} />
        <View>
          <Text style={styles.companyName}>{data?.companyName}</Text>
          {data?.customerRating ? (
            <Text style={styles.rating}>{data.customerRating}</Text>
          ) : null}
        </View>
      </View>
      <Text style={styles.price}>{getPrice(data?.priceWorker ?? 0)}</Text>
      <Text>{data?.address}</Text>
      <Text>
        {data?.timeStartByCity} - {data?.timeEndByCity}, {data?.dateStartByCity}
      </Text>
      <Text>
        Работники: {data?.currentWorkers} / {data?.planWorkers}
      </Text>
      <View style={{ gap: 4 }}>
        <Text>Услуги</Text>
        <FlatList
          data={data?.workTypes ?? []}
          horizontal
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Chip text={item.name} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  companyView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  companyName: {
    fontWeight: 500,
    fontSize: 16,
  },
  rating: {
    color: colors.yellow,
    fontWeight: 500,
  },
  price: {
    fontSize: 16,
    fontWeight: 500,
  },
});
