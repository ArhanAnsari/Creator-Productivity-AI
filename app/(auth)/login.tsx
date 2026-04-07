import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { BorderRadius, Colors, Spacing, Typography } from "@/constants/design";
import { useAuthStore } from "@/store/authStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? Colors.dark : Colors.light;
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: colors.tint + "20" },
            ]}
          >
            <MaterialCommunityIcons
              name="lightbulb-on-20"
              size={40}
              color={colors.tint}
            />
          </View>
          <Text style={[styles.title, { color: colors.text }, Typography.h1]}>
            Creator Productivity AI
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: colors.text + "80" },
              Typography.body,
            ]}
          >
            Turn ideas into scripts in seconds
          </Text>
        </View>

        {/* Form */}
        <Card style={styles.formCard}>
          <Text
            style={[styles.formTitle, { color: colors.text }, Typography.h3]}
          >
            Welcome Back
          </Text>

          <Input
            placeholder="Enter your email"
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Input
            placeholder="Enter your password"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            size="large"
          />

          <TouchableOpacity
            onPress={() => router.push("/(auth)/signup")}
            style={styles.signupLink}
          >
            <Text style={[{ color: colors.text }, Typography.body]}>
              Don't have an account?{" "}
              <Text style={{ color: colors.tint, fontWeight: "600" }}>
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>
        </Card>

        {/* Demo Credentials */}
        <Card style={styles.demoCard}>
          <Text style={[{ color: colors.text }, Typography.bodySmall]}>
            🧪 Demo Account (for testing)
          </Text>
          <Text
            style={[
              { color: colors.text + "80" },
              Typography.bodySmall,
              { marginTop: Spacing.sm },
            ]}
          >
            Email: demo@example.com
          </Text>
          <Text style={[{ color: colors.text + "80" }, Typography.bodySmall]}>
            Password: Demo@123
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  title: {
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    textAlign: "center",
  },
  formCard: {
    marginBottom: Spacing.lg,
  },
  formTitle: {
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  signupLink: {
    alignItems: "center",
    marginTop: Spacing.md,
  },
  demoCard: {
    backgroundColor: "#f0f9ff",
    borderColor: "#0ea5e9",
  },
});
