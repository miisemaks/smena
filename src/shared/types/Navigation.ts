import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NavigationStackParamList = {
  Drawer: DrawerParamList;
  Smena: { id: number };
};

export type NavigationScreenProps<T extends keyof NavigationStackParamList> =
  NativeStackScreenProps<NavigationStackParamList, T>;

export type DrawerParamList = {
  List: undefined;
};

export type DrawerScreensProps<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    NativeStackScreenProps<NavigationStackParamList>
  >;
