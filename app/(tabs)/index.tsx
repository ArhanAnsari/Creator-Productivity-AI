import { Button } from "@/components/ui/Button";
import { Card, GradientCard } from "@/components/ui/Card";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { BorderRadius, Colors, Spacing, Typography } from "@/constants/design";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? Colors.dark : Colors.light;
  const router = useRouter();

  const { user } = useAuthStore();
  const { ideas, scripts, streak, streakLoading, loadStreak } = useAppStore();

  useEffect(() => {
    if (user) {
      loadStreak(user.$id);
    }
  }, [user]);

  if (streakLoading || !user) {
    return <LoadingScreen message="Loading dashboard..." />;
  }

  const getUserGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "🌅 Good morning";
    if (hour < 18) return "☀️ Good afternoon";
    return "🌙 Good evening";
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.greeting,
              { color: colors.text + "80" },
              Typography.body,
            ]}
          >
            {getUserGreeting()}
          </Text>
          <Text
            style={[styles.userName, { color: colors.text }, Typography.h2]}
          >
            {user.name}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.profileButton,
            { backgroundColor: colors.tint + "20" },
          ]}
          onPress={() => router.push("/(tabs)/profile")}
        >
          <Text style={{ fontSize: 24 }}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Productivity Score */}
      <GradientCard colors={["#6366f1", "#8b5cf6"]} style={styles.scoreCard}>
        <View style={{ alignItems: "center", gap: Spacing.md }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: BorderRadius.full,
              backgroundColor: "rgba(255,255,255,0.2)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[{ color: "#fff", fontSize: 40 }]}>
              {streak?.productivityScore || 0}%
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={[{ color: "#fff" }, Typography.h3]}>
              Productivity Score
            </Text>
            <Text style={[{ color: "rgba(255,255,255,0.8)" }, Typography.body]}>
              🔥 {streak?.currentStreak || 0} day streak
            </Text>
          </View>
        </View>
      </GradientCard>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <Card style={StyleSheet.flatten([styles.statCard, { flex: 1 }]) as any}>
          <View style={styles.statContent}>
            <Text style={[{ fontSize: 24 }]}>💡</Text>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {ideas.length}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: colors.text + "80" },
                Typography.bodySmall,
              ]}
            >
              Ideas
            </Text>
          </View>
        </Card>

        <Card style={StyleSheet.flatten([styles.statCard, { flex: 1 }]) as any}>
          <View style={styles.statContent}>
            <Text style={[{ fontSize: 24 }]}>📝</Text>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {scripts.length}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: colors.text + "80" },
                Typography.bodySmall,
              ]}
            >
              Scripts
            </Text>
          </View>
        </Card>

        <Card style={StyleSheet.flatten([styles.statCard, { flex: 1 }]) as any}>
          <View style={styles.statContent}>
            <Text style={[{ fontSize: 24 }]}>📊</Text>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {streak?.totalPosts || 0}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: colors.text + "80" },
                Typography.bodySmall,
              ]}
            >
              Posts
            </Text>
          </View>
        </Card>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: colors.text }, Typography.h3]}
        >
          Quick Actions
        </Text>

        <Button
          title="✨ Generate Ideas"
          onPress={() => router.push("/(tabs)/ideas")}
          size="large"
          style={styles.actionButton}
        />

        <Button
          title="📝 Write Script"
          onPress={() => router.push("/(tabs)/scripts")}
          variant="secondary"
          size="large"
          style={styles.actionButton}
        />

        <Button
          title="📅 Plan Content"
          onPress={() => router.push("/(tabs)/planner")}
          variant="outline"
          size="large"
          style={styles.actionButton}
        />
      </View>

      {/* Focus Tip */}
      <Card
        style={
          StyleSheet.flatten([
            styles.tipCard,
            {
              backgroundColor: colors.tint + "10",
              borderColor: colors.tint + "30",
            },
          ]) as any
        }
      >
        <View
          style={{
            flexDirection: "row",
            gap: Spacing.md,
            alignItems: "flex-start",
          }}
        >
          <Text style={{ fontSize: 24 }}>💭</Text>
          <View style={{ flex: 1 }}>
            <Text style={[{ color: colors.text }, Typography.button]}>
              Focus Hour Pro Tip
            </Text>
            <Text
              style={[
                { color: colors.text + "80", marginTop: Spacing.sm },
                Typography.bodySmall,
              ]}
            >
              Start your day with a 45-minute focus session for maximum
              productivity.
            </Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  greeting: {},
  userName: {
    marginTop: Spacing.sm,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreCard: {
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.xl,
  },
  statsGrid: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCard: {
    marginVertical: 0,
  },
  statContent: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
  },
  statLabel: {},
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.lg,
  },
  actionButton: {
    marginVertical: Spacing.sm,
  },
  tipCard: {
    marginTop: Spacing.lg,
  },
});
