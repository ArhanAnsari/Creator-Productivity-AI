import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Colors, Spacing, Typography } from "@/constants/design";
import geminiService from "@/services/gemini";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";
import React, { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";

export default function ScriptsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? Colors.dark : Colors.light;

  const { user } = useAuthStore();
  const { scripts, addScript, removeScript, loadScripts, ideas } =
    useAppStore();

  const [selectedIdea, setSelectedIdea] = useState<string>("");
  const [scriptType, setScriptType] = useState<"short" | "long">("short");
  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<any>(null);

  useEffect(() => {
    if (user) {
      loadScripts(user.$id);
    }
  }, [user]);

  const handleGenerateScript = async () => {
    if (!selectedIdea) {
      Alert.alert("Error", "Please select an idea");
      return;
    }

    const idea = ideas.find((i) => i.$id === selectedIdea);
    if (!idea) return;

    setLoading(true);
    try {
      const script = await geminiService.generateScript(
        idea.title,
        idea.hook,
        scriptType,
      );
      setGeneratedScript(script);
    } catch (error: any) {
      Alert.alert("Generation Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveScript = async () => {
    if (!user || !generatedScript) return;
    try {
      await addScript(user.$id, {
        ...generatedScript,
        ideaId: selectedIdea,
        saved: true,
      });
      Alert.alert("Success", "Script saved!");
      setGeneratedScript(null);
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
        📝 AI Script Generator
      </Text>

      <Card style={{ marginBottom: Spacing.lg }}>
        <Text
          style={[
            { color: colors.text },
            Typography.button,
            { marginBottom: Spacing.md },
          ]}
        >
          Select Idea
        </Text>
        {ideas.length > 0 ? (
          ideas.map((idea) => (
            <Button
              key={idea.$id}
              title={selectedIdea === idea.$id ? `✓ ${idea.title}` : idea.title}
              onPress={() => setSelectedIdea(idea.$id)}
              variant={selectedIdea === idea.$id ? "primary" : "outline"}
              size="small"
              style={{ marginBottom: Spacing.sm }}
            />
          ))
        ) : (
          <Text style={[{ color: colors.text + "80" }, Typography.bodySmall]}>
            No ideas found. Generate some first!
          </Text>
        )}

        <View style={{ marginTop: Spacing.lg, marginBottom: Spacing.lg }}>
          <Text
            style={[
              { color: colors.text },
              Typography.button,
              { marginBottom: Spacing.md },
            ]}
          >
            Script Type
          </Text>
          <View style={{ flexDirection: "row", gap: Spacing.md }}>
            <Button
              title={scriptType === "short" ? "✓ Short Form" : "Short Form"}
              onPress={() => setScriptType("short")}
              variant={scriptType === "short" ? "primary" : "outline"}
              size="small"
              style={{ flex: 1 }}
            />
            <Button
              title={scriptType === "long" ? "✓ Long Form" : "Long Form"}
              onPress={() => setScriptType("long")}
              variant={scriptType === "long" ? "primary" : "outline"}
              size="small"
              style={{ flex: 1 }}
            />
          </View>
        </View>

        <Button
          title={loading ? "Generating..." : "Generate Script"}
          onPress={handleGenerateScript}
          loading={loading}
          size="large"
        />
      </Card>

      {/* Generated Script */}
      {generatedScript && (
        <View>
          <Text
            style={[styles.sectionTitle, { color: colors.text }, Typography.h3]}
          >
            Generated Script
          </Text>
          <Card style={{ marginBottom: Spacing.md }}>
            <Badge
              label={generatedScript.type === "short" ? "60-90s" : "5-10m"}
              size="small"
            />
            <Text
              style={[
                { color: colors.text, marginTop: Spacing.md },
                Typography.bodySmall,
              ]}
            >
              {generatedScript.content}
            </Text>
            <Text
              style={[
                { color: colors.text + "60", marginTop: Spacing.md },
                Typography.bodySmall,
              ]}
            >
              📊 {generatedScript.wordCount} words
            </Text>
            <Button
              title="Save Script"
              onPress={handleSaveScript}
              size="medium"
              style={{ marginTop: Spacing.md }}
            />
          </Card>
        </View>
      )}

      {/* Saved Scripts */}
      {scripts.length > 0 && (
        <View style={{ marginTop: Spacing.xl }}>
          <Text
            style={[styles.sectionTitle, { color: colors.text }, Typography.h3]}
          >
            Saved Scripts ({scripts.length})
          </Text>
          {scripts.map((script) => (
            <Card key={script.$id} style={{ marginBottom: Spacing.md }}>
              <Badge
                label={script.type === "short" ? "Short" : "Long"}
                size="small"
                variant="success"
              />
              <Text
                style={[
                  { color: colors.text, marginTop: Spacing.md },
                  Typography.button,
                ]}
              >
                {script.title}
              </Text>
              <Text
                style={[
                  { color: colors.text + "60", marginTop: Spacing.sm },
                  Typography.bodySmall,
                ]}
              >
                📊 {script.wordCount} words
              </Text>
              <Button
                title="Delete"
                onPress={() => removeScript(script.$id)}
                variant="outline"
                size="small"
                style={{ marginTop: Spacing.md }}
              />
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
