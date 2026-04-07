import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Colors, Spacing, Typography } from "@/constants/design";
import geminiService from "@/services/gemini";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";
import { Idea } from "@/types";
import React, { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from "react-native";

export default function IdeasScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? Colors.dark : Colors.light;

  const { user } = useAuthStore();
  const { ideas, addIdea, removeIdea, loadIdeas } = useAppStore();

  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      loadIdeas(user.$id);
    }
  }, [user]);

  const handleGenerateIdeas = async () => {
    if (!niche.trim()) {
      Alert.alert("Error", "Please enter a niche");
      return;
    }

    setLoading(true);
    try {
      const ideas = await geminiService.generateIdeas(niche, 10);
      setGeneratedIdeas(ideas);
    } catch (error: any) {
      Alert.alert(
        "Generation Failed",
        error.message || "Failed to generate ideas",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveIdea = async (idea: any) => {
    if (!user) return;
    try {
      await addIdea(user.$id, {
        ...idea,
        saved: true,
      });
      Alert.alert("Success", "Idea saved!");
      setGeneratedIdeas(generatedIdeas.filter((i) => i !== idea));
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: colors.text }, Typography.h2]}>
        ✨ AI Idea Generator
      </Text>

      <Card style={{ marginBottom: Spacing.lg }}>
        <Input
          placeholder="e.g., coding, fitness, cooking, music"
          label="Content Niche"
          value={niche}
          onChangeText={setNiche}
        />

        <Button
          title={loading ? "Generating..." : "Generate 10 Ideas"}
          onPress={handleGenerateIdeas}
          loading={loading}
          size="large"
        />
      </Card>

      {/* Generated Ideas */}
      {generatedIdeas.length > 0 && (
        <View>
          <Text
            style={[styles.sectionTitle, { color: colors.text }, Typography.h3]}
          >
            Generated Ideas
          </Text>
          {generatedIdeas.map((idea, index) => (
            <Card key={index} style={{ marginBottom: Spacing.md }}>
              <Badge label={idea.category || "General"} size="small" />
              <Text
                style={[
                  { color: colors.text, marginTop: Spacing.md },
                  Typography.button,
                ]}
              >
                {idea.title}
              </Text>
              <Text
                style={[
                  { color: colors.text + "80", marginTop: Spacing.sm },
                  Typography.bodySmall,
                ]}
              >
                Hook: {idea.hook}
              </Text>
              <Text
                style={[
                  { color: colors.text + "60", marginTop: Spacing.sm },
                  Typography.bodySmall,
                ]}
              >
                {idea.description}
              </Text>
              <Button
                title="Save Idea"
                onPress={() => handleSaveIdea(idea)}
                size="small"
                variant="secondary"
                style={{ marginTop: Spacing.md }}
              />
            </Card>
          ))}
        </View>
      )}

      {/* Saved Ideas */}
      {ideas.length > 0 && (
        <View style={{ marginTop: Spacing.xl }}>
          <Text
            style={[styles.sectionTitle, { color: colors.text }, Typography.h3]}
          >
            Saved Ideas ({ideas.length})
          </Text>
          {ideas.map((idea: Idea) => (
            <Card key={idea.$id} style={{ marginBottom: Spacing.md }}>
              <Badge label={idea.category} size="small" variant="success" />
              <Text
                style={[
                  { color: colors.text, marginTop: Spacing.md },
                  Typography.button,
                ]}
              >
                {idea.title}
              </Text>
              <Text
                style={[
                  { color: colors.text + "80", marginTop: Spacing.sm },
                  Typography.bodySmall,
                ]}
              >
                {idea.hook}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: Spacing.sm,
                  marginTop: Spacing.md,
                }}
              >
                <Button
                  title="Delete"
                  onPress={() => removeIdea(idea.$id)}
                  variant="outline"
                  size="small"
                  style={{ flex: 1 }}
                />
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
  sectionTitle: { marginBottom: Spacing.lg },
});
