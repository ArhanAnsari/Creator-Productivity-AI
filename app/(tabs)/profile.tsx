import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, GradientCard } from "@/components/ui/Card";
import { Colors, Spacing, Typography } from "@/constants/design";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? Colors.dark : Colors.light;
  const router = useRouter();

  const { user, logout } = useAuthStore();
  const { ideas, scripts, streak, plans, focusSessions, loadStreak } =
    useAppStore();

  useEffect(() => {
    if (user) {
      loadStreak(user.$id);
    }
  }, [user]);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Logout",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  if (!user) return null;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Profile Header */}
      <GradientCard colors={["#6366f1", "#8b5cf6"]} style={styles.headerCard}>
        <View style={{ alignItems: "center", gap: Spacing.md }}>
          <Text style={{ fontSize: 64 }}>👤</Text>
          <Text style={[{ color: "#fff" }, Typography.h2]}>{user.name}</Text>
          <Badge label={user.role === "free" ? "🆓 Free Tier" : "⭐ Premium"} />
          <Text
            style={[{ color: "rgba(255,255,255,0.8)" }, Typography.bodySmall]}
          >
            {user.email}
          </Text>
        </View>
      </GradientCard>

      {/* Stats Overview */}
      <View style={styles.statsGrid}>
        <Card style={{ flex: 1 }}>
          <View style={styles.statItem}>
            <Text style={{ fontSize: 24 }}>💡</Text>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {ideas.length}
            </Text>
            <Text style={[{ color: colors.text + "80" }, Typography.bodySmall]}>
              Ideas
            </Text>
          </View>
        </Card>

        <Card style={{ flex: 1 }}>
          <View style={styles.statItem}>
            <Text style={{ fontSize: 24 }}>📝</Text>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {scripts.length}
            </Text>
            <Text style={[{ color: colors.text + "80" }, Typography.bodySmall]}>
              Scripts
            </Text>
          </View>
        </Card>

        <Card style={{ flex: 1 }}>
          <View style={styles.statItem}>
            <Text style={{ fontSize: 24 }}>📅</Text>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {plans.length}
            </Text>
            <Text style={[{ color: colors.text + "80" }, Typography.bodySmall]}>
              Planned
            </Text>
          </View>
        </Card>

        <Card style={{ flex: 1 }}>
          <View style={styles.statItem}>
            <Text style={{ fontSize: 24 }}>⏱️</Text>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {focusSessions.length}
            </Text>
            <Text style={[{ color: colors.text + "80" }, Typography.bodySmall]}>
              Sessions
            </Text>
          </View>
        </Card>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: colors.text }, Typography.h3]}
        >
          🏆 Achievements
        </Text>

        <Card style={{ marginBottom: Spacing.md }}>
          <View style={styles.achievementItem}>
            <Text style={{ fontSize: 28 }}>🔥</Text>
            <View style={{ flex: 1, marginLeft: Spacing.lg }}>
              <Text style={[{ color: colors.text }, Typography.button]}>
                {streak?.currentStreak || 0} Day Streak
              </Text>
              <Text
                style={[{ color: colors.text + "80" }, Typography.bodySmall]}
              >
                Keep the momentum going!
              </Text>
            </View>
          </View>
        </Card>

        <Card style={{ marginBottom: Spacing.md }}>
          <View style={styles.achievementItem}>
            <Text style={{ fontSize: 28 }}>📊</Text>
            <View style={{ flex: 1, marginLeft: Spacing.lg }}>
              <Text style={[{ color: colors.text }, Typography.button]}>
                {streak?.totalPosts || 0} Total Posts
              </Text>
              <Text
                style={[{ color: colors.text + "80" }, Typography.bodySmall]}
              >
                Amazing content creator!
              </Text>
            </View>
          </View>
        </Card>

        <Card>
          <View style={styles.achievementItem}>
            <Text style={{ fontSize: 28 }}>⭐</Text>
            <View style={{ flex: 1, marginLeft: Spacing.lg }}>
              <Text style={[{ color: colors.text }, Typography.button]}>
                {streak?.longestStreak || 0} Day Best Streak
              </Text>
              <Text
                style={[{ color: colors.text + "80" }, Typography.bodySmall]}
              >
                Your personal record!
              </Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Account Actions */}
      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: colors.text }, Typography.h3]}
        >
          Account
        </Text>

        <Button
          title="📖 Terms & Privacy"
          onPress={() => Alert.alert("Info", "Coming soon!")}
          variant="outline"
          size="medium"
        />

        <Button
          title="🤝 Help & Support"
          onPress={() => Alert.alert("Support", "Email: support@creatorai.app")}
          variant="outline"
          size="medium"
        />

        <Button
          title="🚪 Logout"
          onPress={handleLogout}
          variant="outline"
          size="large"
          textStyle={{ color: colors.error }}
        />
      </View>

      {/* App Version */}
      <Text
        style={[
          {
            color: colors.text + "40",
            textAlign: "center",
            marginTop: Spacing.xl,
          },
          Typography.bodySmall,
        ]}
      >
        Creator Productivity AI v1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  headerCard: {
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.xl,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statItem: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.lg,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
  },
});
