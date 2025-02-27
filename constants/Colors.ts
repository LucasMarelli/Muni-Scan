/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { StatusOrDeliveredValues } from "@/components/DeviceStatus/DeviceStatus";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const statusColors: Record<StatusOrDeliveredValues, string> = {
  "Sin Revisar": "#FFC8AA",
  "En Reparación": "#0A53A8",
  "En Service": "#E6CFF2",
  Reparado: "#11734B",
  "Sin Reparación": "#B10202",
  Sí: "#11734B",
  No: "#B10202",
};
