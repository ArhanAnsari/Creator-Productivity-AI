import { BorderRadius, Colors, Spacing, Typography } from "@/constants/design";
import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    useColorScheme,
    ViewStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "medium",
  style,
  textStyle,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? Colors.dark : Colors.light;

  const getBackgroundColor = () => {
    if (disabled) return colors.backgroundSecondary;
    if (variant === "primary") return colors.tint;
    if (variant === "secondary") return colors.tint;
    return "transparent";
  };

  const getTextColor = () => {
    if (variant === "outline") return colors.tint;
    return "#fff";
  };

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md };
      case "large":
        return { paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xl };
      default:
        return { paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: colors.tint,
          borderWidth: variant === "outline" ? 2 : 0,
          ...getSizeStyle(),
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: getTextColor() },
            Typography.button,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Spacing.sm,
  },
  text: {
    fontWeight: "600",
  },
});
