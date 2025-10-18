import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NavigationStackParamList = {
  List: undefined;
  Shift: { id: string };
};

export type NavigationScreenProps<T extends keyof NavigationStackParamList> =
  NativeStackScreenProps<NavigationStackParamList, T>;
