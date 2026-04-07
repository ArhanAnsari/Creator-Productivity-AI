import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Colors, Spacing, Typography } from "@/constants/design";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from "react-native";

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? Colors.dark : Colors.light;

  const { user } = useAuthStore();
  const { focusSessions, addFocusSession, loadFocusSessions } = useAppStore();

  const [duration, setDuration] = useState("25");
  const [sessionName, setSessionName] = useState("Focus Session");
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const progressAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (user) {
      loadFocusSessions(user.$id);
    }
  }, [user]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setIsActive(false);
            Alert.alert("Session Complete! 🎉", `${sessionName} completed!`);
            handleSaveSession();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStartSession = async () => {
    const mins = parseInt(duration) || 25;
    setTimeLeft(mins * 60);
    setIsActive(true);
  };

  const handleSaveSession = async () => {
    if (!user) return;
    try {
      await addFocusSession(user.$id, {
        duration: parseInt(duration) || 25,
        sessionName,
        breakInterval: 5,
        completedAt: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error("Error saving session:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress =
    (parseInt(duration) * 60 - timeLeft) / (parseInt(duration) * 60);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: colors.text }, Typography.h2]}>
        ⏱️ Focus Mode
      </Text>

      {/* Timer Display */}
      <Card
        style={
          StyleSheet.flatten([
            styles.timerCard,
            { backgroundColor: colors.tint + "20", borderColor: colors.tint },
          ]) as any
        }
      >
        <View style={styles.timerCircle}>
          <Text style={[styles.timerText, { color: colors.tint }]}>
            {formatTime(timeLeft)}
          </Text>
        </View>
        <Text
          style={[
            { color: colors.text, marginTop: Spacing.lg, textAlign: "center" },
            Typography.body,
          ]}
        >
          {isActive ? "🎯 In Progress" : "Ready to Focus?"}
        </Text>
      </Card>

      {/* Settings */}
      {!isActive && (
        <Card style={{ marginBottom: Spacing.lg }}>
          <Input
            placeholder="Focus Session"
            label="Session Name"
            value={sessionName}
            onChangeText={setSessionName}
          />

          <View style={{ marginBottom: Spacing.lg }}>
            <Text
              style={[
                { color: colors.text },
                Typography.button,
                { marginBottom: Spacing.md },
              ]}
            >
              Duration (minutes)
            </Text>
            <View style={{ flexDirection: "row", gap: Spacing.sm }}>
              {["15", "25", "45", "60"].map((min) => (
                <Button
                  key={min}
                  title={duration === min ? `✓ ${min}m` : `${min}m`}
                  onPress={() => setDuration(min)}
                  variant={duration === min ? "primary" : "outline"}
                  size="small"
                  style={{ flex: 1 }}
                />
              ))}
            </View>
          </View>

          <Button
            title="Start Focus Session"
            onPress={handleStartSession}
            size="large"
          />
        </Card>
      )}

      {/* Active Controls */}
      {isActive && (
        <Card style={{ marginBottom: Spacing.lg }}>
          <Button
            title="Stop Session"
            onPress={() => setIsActive(false)}
            variant="outline"
            size="large"
          />
        </Card>
      )}

      {/* Session History */}
      {focusSessions.length > 0 && (
        <View>
          <Text
            style={[styles.sectionTitle, { color: colors.text }, Typography.h3]}
          >
            Recent Sessions ({focusSessions.length})
          </Text>
          {focusSessions.slice(0, 5).map((session, idx) => (
            <Card key={idx} style={{ marginBottom: Spacing.md }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={[{ color: colors.text }, Typography.button]}>
                    {session.sessionName}
                  </Text>
                  <Text
                    style={[
                      { color: colors.text + "80", marginTop: Spacing.sm },
                      Typography.bodySmall,
                    ]}
                  >
                    ⏱️ {session.duration} minutes
                  </Text>
                </View>
                <Text style={{ fontSize: 20 }}>✅</Text>
              </View>
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  title: { marginBottom: Spacing.xl },
  timerCard: {
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.xxl,
    alignItems: "center",
  },
  timerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  timerText: {
    fontSize: 56,
    fontWeight: "700",
  },
  sectionTitle: { marginBottom: Spacing.lg },
});
