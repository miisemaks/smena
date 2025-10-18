import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationScreenProps } from 'shared/types/Navigation';
import {
  check,
  request,
  RESULTS,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';
import GetLocation from 'react-native-get-location';
import { useForm } from 'react-hook-form';
import { colors } from 'shared/styles/colors';
import { useQuery } from '@tanstack/react-query';
import { getShiftList } from 'shared/api/shift';
import { ShiftItem } from 'shared/ui/ShiftItem';
import { observer } from 'mobx-react-lite';
import ShiftStore from 'shared/store/ShiftStore';

type Props = NavigationScreenProps<'List'>;

export const ListShift = observer((props: Props) => {
  const { navigation } = props;
  const { left, right, bottom } = useSafeAreaInsets();
  const { watch, setValue } = useForm<{
    latitude: number | null;
    longitude: number | null;
    setting_visible: boolean;
  }>({
    defaultValues: {
      latitude: null,
      longitude: null,
      setting_visible: false,
    },
  });
  const { latitude, longitude, setting_visible } = watch();
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['shift_list'],
    queryFn: () => getShiftList({ latitude: latitude!, longitude: longitude! }),
    enabled: !!latitude && !!longitude,
  });

  const locationRequest = useCallback(async () => {
    try {
      const checkResult = await check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );

      switch (checkResult) {
        case RESULTS.GRANTED:
        case RESULTS.LIMITED:
          const location = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
          });
          setValue('latitude', location.latitude);
          setValue('longitude', location.longitude);
          break;
        case RESULTS.BLOCKED:
        case RESULTS.DENIED:
        case RESULTS.UNAVAILABLE:
          const resultRequest = await request(
            Platform.OS === 'ios'
              ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
              : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
          switch (resultRequest) {
            case RESULTS.GRANTED:
            case RESULTS.LIMITED:
              const location2 = await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 60000,
              });
              setValue('latitude', location2.latitude);
              setValue('longitude', location2.longitude);
              setValue('setting_visible', false);
              break;
            case RESULTS.BLOCKED:
            case RESULTS.DENIED:
            case RESULTS.UNAVAILABLE:
              setValue('setting_visible', true);
              break;
          }

          break;
      }
    } catch {
      setValue('setting_visible', true);
    }
  }, [setValue]);

  useEffect(() => {
    locationRequest();
  }, [locationRequest]);

  return (
    <View
      style={{
        flex: 1,
        paddingLeft: left ?? 0,
        paddingRight: right ?? 0,
        backgroundColor: colors.bgSecondary,
      }}
    >
      {setting_visible && (
        <Text
          style={{
            color: colors.link,
            marginHorizontal: 16,
            marginTop: 16,
          }}
          onPress={() => {
            openSettings('application');
          }}
        >
          Открыть настройки
        </Text>
      )}
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={data?.data ?? []}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ShiftItem
              companyName={item.companyName}
              url={item.logo}
              address={item.address}
              price={item.priceWorker}
              date={item.dateStartByCity}
              timeStart={item.timeStartByCity}
              timeEnd={item.timeEndByCity}
              onPress={() => {
                ShiftStore.setShiftData(item);
                navigation.navigate('Shift', { id: item.id });
              }}
              rating={item.customerRating}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          contentContainerStyle={{
            gap: 16,
            paddingBottom: 16 + (bottom ?? 0),
            paddingTop: 16,
            paddingHorizontal: 16,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
});
