import ENV from "@/config/env";
import { Idea, Script } from "@/types";
import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(ENV.gemini.apiKey);
  }

  async generateIdeas(niche: string, count: number = 10): Promise<Idea[]> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Generate ${count} engaging and viral content ideas for the niche: "${niche}". 
      For each idea, provide:
      1. A catchy title (max 10 words)
      2. A compelling hook (max 20 words that grab attention immediately)
      3. A brief description (2-3 sentences about the content idea)
      
      Format as JSON array with objects containing: { title, hook, description }`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      // Parse JSON from response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("Could not parse AI response");

      const parsed = JSON.parse(jsonMatch[0]);

      // Transform to Idea format (without userId and _id, those are set by the caller)
      const ideas: Omit<Idea, "$id" | "userId" | "createdAt">[] = parsed.map(
        (item: any) => ({
          niche,
          title: item.title,
          hook: item.hook,
          description: item.description,
          category: this.categorizeNiche(niche),
          saved: false,
        }),
      );

      return ideas as any;
    } catch (error) {
      console.error("Error generating ideas:", error);
      throw error;
    }
  }

  async generateScript(
    title: string,
    hook: string,
    scriptType: "short" | "long" = "short",
  ): Promise<Script> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

      const lengthGuide =
        scriptType === "short"
          ? "60-90 seconds (300-450 words)"
          : "5-10 minutes (2000-3000 words)";

      const prompt = `Write a high-retention ${scriptType}-form video script.
      
      Title: "${title}"
      Hook: "${hook}"
      Length: ${lengthGuide}
      
      Structure:
      1. HOOK (first 3 seconds - must grab attention)
      2. PROBLEM/INTRIGUE (why viewer should care)
      3. BODY (valuable content, tips, or story)
      4. CTA (call to action - like, subscribe, comment)
      
      Make it engaging, use simple language, include specific examples.
      Format as a ready-to-shoot script with [ACTION] tags where needed.`;

      const result = await model.generateContent(prompt);
      const scriptContent = result.response.text();

      const wordCount = scriptContent.split(/\s+/).length;
      const duration = scriptType === "short" ? 75 : 420; // seconds

      return {
        title,
        content: scriptContent,
        type: scriptType,
        duration,
        wordCount,
        saved: false,
      } as any;
    } catch (error) {
      console.error("Error generating script:", error);
      throw error;
    }
  }

  async improveContent(content: string, instruction: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Please improve the following content based on this instruction: "${instruction}"
      
      Content:
      ${content}
      
      Provide only the improved version without explanations.`;

      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Error improving content:", error);
      throw error;
    }
  }

  async analyzeTrends(niche: string): Promise<string[]> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `What are the top 5 trending topics and keywords in the "${niche}" niche right now? 
      Provide as a JSON array of strings.
      Format: ["trend1", "trend2", ...]`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("Could not parse trends");

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error("Error analyzing trends:", error);
      throw error;
    }
  }

  private categorizeNiche(niche: string): string {
    const lowerNiche = niche.toLowerCase();

    if (
      lowerNiche.includes("code") ||
      lowerNiche.includes("tech") ||
      lowerNiche.includes("program")
    ) {
      return "Technology";
    } else if (
      lowerNiche.includes("fit") ||
      lowerNiche.includes("gym") ||
      lowerNiche.includes("health")
    ) {
      return "Fitness";
    } else if (
      lowerNiche.includes("cook") ||
      lowerNiche.includes("recipe") ||
      lowerNiche.includes("food")
    ) {
      return "Cooking";
    } else if (lowerNiche.includes("music") || lowerNiche.includes("song")) {
      return "Music";
    } else if (
      lowerNiche.includes("business") ||
      lowerNiche.includes("entrepreneur")
    ) {
      return "Business";
    } else if (
      lowerNiche.includes("education") ||
      lowerNiche.includes("learn")
    ) {
      return "Education";
    } else if (lowerNiche.includes("travel")) {
      return "Travel";
    } else if (lowerNiche.includes("lifestyle")) {
      return "Lifestyle";
    }

    return "General";
  }
}

export default new GeminiService();
