import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Colors, Spacing, Typography } from "@/constants/design";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";
import React, { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

export default function PlannerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? Colors.dark : Colors.light;

  const { user } = useAuthStore();
  const { plans, addPlan, updatePlan, removePlan, loadPlans } = useAppStore();

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (user) {
      loadPlans(user.$id);
    }
  }, [user]);

  const handleAddPlan = async () => {
    if (!title || !dueDate) {
      Alert.alert("Error", "Please fill in title and date");
      return;
    }
    if (!user) return;

    try {
      await addPlan(user.$id, {
        title,
        description,
        dueDate,
        status: "scheduled",
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      Alert.alert("Success", "Plan added!");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleUpdateStatus = async (
    planId: string,
    status: "scheduled" | "in-progress" | "completed",
  ) => {
    try {
      await updatePlan(planId, { status });
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return colors.success;
      case "in-progress":
        return colors.warning;
      default:
        return colors.tint;
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: colors.text }, Typography.h2]}>
        📅 Content Planner
      </Text>

      <Card style={{ marginBottom: Spacing.lg }}>
        <Input
          placeholder="Content title"
          label="Title"
          value={title}
          onChangeText={setTitle}
        />

        <Input
          placeholder="e.g., 2024-12-25"
          label="Due Date"
          value={dueDate}
          onChangeText={setDueDate}
        />

        <Input
          placeholder="Optional description"
          label="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        <Button title="Add to Plan" onPress={handleAddPlan} size="large" />
      </Card>

      {/* Planned Content */}
      {plans.length > 0 ? (
        <View>
          <Text
            style={[styles.sectionTitle, { color: colors.text }, Typography.h3]}
          >
            Scheduled Content ({plans.length})
          </Text>
          {plans.map((plan) => (
            <Card
              key={plan.$id}
              style={{
                marginBottom: Spacing.md,
                borderLeftWidth: 4,
                borderLeftColor: getStatusColor(plan.status),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: Spacing.md,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[{ color: colors.text }, Typography.button]}>
                    {plan.title}
                  </Text>
                  <Text
                    style={[
                      { color: colors.text + "80", marginTop: Spacing.sm },
                      Typography.bodySmall,
                    ]}
                  >
                    📅 {plan.dueDate}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => removePlan(plan.$id)}
                  style={{ padding: Spacing.sm }}
                >
                  <Text style={{ fontSize: 18 }}>❌</Text>
                </TouchableOpacity>
              </View>

              {plan.description && (
                <Text
                  style={[
                    { color: colors.text + "60", marginBottom: Spacing.md },
                    Typography.bodySmall,
                  ]}
                >
                  {plan.description}
                </Text>
              )}

              <View style={{ flexDirection: "row", gap: Spacing.sm }}>
                <Button
                  title={
                    plan.status === "scheduled" ? "✓ Scheduled" : "Scheduled"
                  }
                  onPress={() => handleUpdateStatus(plan.$id, "scheduled")}
                  variant={plan.status === "scheduled" ? "primary" : "outline"}
                  size="small"
                  style={{ flex: 1 }}
                />
                <Button
                  title={
                    plan.status === "in-progress"
                      ? "✓ In Progress"
                      : "In Progress"
                  }
                  onPress={() => handleUpdateStatus(plan.$id, "in-progress")}
                  variant={
                    plan.status === "in-progress" ? "primary" : "outline"
                  }
                  size="small"
                  style={{ flex: 1 }}
                />
                <Button
                  title={plan.status === "completed" ? "✓ Done" : "Done"}
                  onPress={() => handleUpdateStatus(plan.$id, "completed")}
                  variant={plan.status === "completed" ? "primary" : "outline"}
                  size="small"
                  style={{ flex: 1 }}
                />
              </View>
            </Card>
          ))}
        </View>
      ) : (
        <Card style={{ alignItems: "center", paddingVertical: Spacing.xxl }}>
          <Text style={[{ color: colors.text + "80" }, Typography.body]}>
            No content planned yet
          </Text>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  title: { marginBottom: Spacing.xl },
  sectionTitle: { marginBottom: Spacing.lg },
});
