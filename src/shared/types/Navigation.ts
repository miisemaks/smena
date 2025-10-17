import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NavigationStackParamList = {
  List: undefined;
  Smena: { id: number };
};

export type NavigationScreenProps<T extends keyof NavigationStackParamList> =
  NativeStackScreenProps<NavigationStackParamList, T>;
