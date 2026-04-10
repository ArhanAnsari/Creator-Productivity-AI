const ENV = {
  appwrite: {
    endpoint:
      process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ||
      "https://fra.cloud.appwrite.io/v1",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "69d615110031fe23e7ca",
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || "69d75510000583ff35ea",
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
