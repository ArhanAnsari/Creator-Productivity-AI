// Example Appwrite Function for secure AI content generation
// Deploy this function to Appwrite for server-side processing

import fetch from "node-fetch";

export default async (req, res, context) => {
  try {
    const { type, niche, title, hook, scriptType } = JSON.parse(
      context.req.body || "{}",
    );
    const geminiKey =
      context.req.headers["x-gemini-key"] || process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      return res.json({ error: "API key not configured" }, 500);
    }

    let prompt = "";

    if (type === "idea") {
      prompt = `Generate 10 engaging content ideas for the niche: "${niche}". 
For each idea, provide JSON with: title, hook, description.
Format: [{"title": "...", "hook": "...", "description": "..."}]`;
    } else if (type === "script") {
      prompt = `Write a ${scriptType}-form video script.
Title: "${title}"
Hook: "${hook}"
Include: HOOK, PROBLEM, BODY, CTA sections.
Keep it engaging and ready-to-shoot.`;
    }

    // Call Gemini API
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": geminiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    );

    const data = await response.json();
    const content = data.candidates[0]?.content?.parts[0]?.text || "";

    return res.json({
      success: true,
      data: content,
      type: type,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Function error:", error);
    return res.json({ error: error.message }, 500);
  }
};
