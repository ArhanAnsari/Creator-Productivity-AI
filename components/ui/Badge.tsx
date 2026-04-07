import { BorderRadius, Colors, Spacing, Typography } from "@/constants/design";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
    ViewStyle,
} from "react-native";

interface BadgeProps {
  label: string;
  color?: string;
  variant?: "default" | "success" | "warning" | "error";
  size?: "small" | "medium";
  dismissible?: boolean;
  onDismiss?: () => void;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  color,
  variant = "default",
  size = "medium",
  dismissible = false,
  onDismiss,
  style,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? Colors.dark : Colors.light;

  const getBackgroundColor = () => {
    if (color) return color;
    switch (variant) {
      case "success":
        return colors.success;
      case "warning":
        return colors.warning;
      case "error":
        return colors.error;
      default:
        return colors.tint;
    }
  };

  const paddingStyle =
    size === "small"
      ? { paddingVertical: 4, paddingHorizontal: Spacing.sm }
      : { paddingVertical: 6, paddingHorizontal: Spacing.md };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          ...paddingStyle,
        },
        style,
      ]}
    >
      <Text
        style={[
          { color: "#fff" },
          size === "small" ? Typography.bodySmall : Typography.body,
          styles.text,
        ]}
      >
        {label}
      </Text>
      {dismissible && (
        <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
          <MaterialCommunityIcons name="close" size={14} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.full,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
  },
  dismissButton: {
    marginLeft: Spacing.sm,
  },
});
