import { Colors, Spacing, Typography } from "@/constants/design";
import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from "react-native";

interface LoadingProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingProps> = ({
  message = "Loading...",
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.tint} />
      <Text style={[styles.message, { color: colors.text }, Typography.body]}>
        {message}
      </Text>
    </View>
  );
};

interface ErrorProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorScreen: React.FC<ErrorProps> = ({
  title,
  message,
  onRetry,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.error }, Typography.h2]}>
        {title}
      </Text>
      <Text style={[styles.message, { color: colors.text }, Typography.body]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },
  message: {
    marginTop: Spacing.lg,
    textAlign: "center",
  },
  title: {
    marginBottom: Spacing.md,
  },
});
