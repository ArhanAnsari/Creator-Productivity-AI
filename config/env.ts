const ENV = {
  appwrite: {
    endpoint:
      process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ||
      "https://cloud.appwrite.io/v1",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "",
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || "",
  },
  gemini: {
    apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY || "",
  },
  app: {
    freeTierLimit: parseInt(process.env.EXPO_PUBLIC_FREE_TIER_LIMIT || "5"),
    premiumTierLimit: parseInt(
      process.env.EXPO_PUBLIC_PREMIUM_TIER_LIMIT || "50",
    ),
  },
};

export default ENV;
