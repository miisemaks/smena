import React, { useCallback, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
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

type Props = NavigationScreenProps<'List'>;

export const ListSmena = (props: Props) => {
  const {} = props;
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
  const { setting_visible } = watch();

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
        paddingBottom: bottom ?? 0,
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
    </View>
  );
};
