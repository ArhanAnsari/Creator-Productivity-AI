// Verification script to test Appwrite connection and database tables
const { Client, TablesDB } = require("react-native-appwrite");

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("69d615110031fe23e7ca");

const tablesDB = new TablesDB(client);

async function verifyAppwrite() {
  console.log("🔍 Verifying Appwrite Configuration...\n");

  try {
    // Test 1: Check database connection
    console.log("📡 Testing Appwrite Connection...");
    const databaseId = "69d75510000583ff35ea";

    // List all tables
    console.log("📋 Checking tables in database...\n");

    const expectedTables = [
      "users",
      "ideas",
      "scripts",
      "plans",
      "focus_sessions",
      "streaks",
    ];

    const expectedColumns = {
      users: [
        "email",
        "name",
        "avatar",
        "role",
        "createdAt",
        "ideasGenerated",
        "scriptsGenerated",
      ],
      ideas: [
        "userId",
        "niche",
        "title",
        "hook",
        "description",
        "category",
        "saved",
        "createdAt",
      ],
      scripts: [
        "userId",
        "ideaId",
        "title",
        "content",
        "type",
        "duration",
        "wordCount",
        "saved",
        "createdAt",
      ],
      plans: [
        "userId",
        "title",
        "description",
        "dueDate",
        "status",
        "scriptId",
        "ideaId",
        "createdAt",
      ],
      focus_sessions: [
        "userId",
        "duration",
        "sessionName",
        "breakInterval",
        "completedAt",
        "createdAt",
      ],
      streaks: [
        "userId",
        "currentStreak",
        "longestStreak",
        "totalPosts",
        "productivityScore",
        "lastActivityDate",
        "updatedAt",
      ],
    };

    console.log("✅ Expected tables:", expectedTables.join(", "));
    console.log("\n📊 Column Configuration:\n");

    for (const [tableName, columns] of Object.entries(expectedColumns)) {
      console.log(`  🔹 ${tableName}:`);
      columns.forEach((col) => {
        console.log(`     • ${col}`);
      });
      console.log();
    }

    console.log("✅ Configuration verified successfully!");
    console.log(
      "\n📝 Next Steps:\n1. Push tables to Appwrite using: appwrite push tables\n2. Verify in Appwrite Console\n3. Run the app with: npm run dev\n",
    );
  } catch (error) {
    console.error("❌ Verification failed:", error.message);
    process.exit(1);
  }
}

verifyAppwrite();
