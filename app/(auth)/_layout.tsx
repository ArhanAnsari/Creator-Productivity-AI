import { Colors } from "@/constants/design";
import React from "react";
import { useColorScheme, View } from "react-native";

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? Colors.dark : Colors.light;

  return <View style={{ flex: 1, backgroundColor: colors.background }} />;
}
