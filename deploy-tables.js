#!/usr/bin/env node

/**
 * Appwrite Tables Deployment Script
 * This script helps deploy the database tables and verify the configuration
 */

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function checkAppwriteCLI() {
  try {
    await execAsync("appwrite.cmd --version");
    log("✅ Appwrite CLI found", "green");
    return true;
  } catch (error) {
    log("❌ Appwrite CLI not found. Installing...", "yellow");
    try {
      await execAsync("npm.cmd install -g appwrite-cli", { stdio: "inherit" });
      log("✅ Appwrite CLI installed", "green");
      return true;
    } catch (err) {
      log("❌ Failed to install Appwrite CLI", "red");
      return false;
    }
  }
}

async function pushTables() {
  log("\n🚀 Pushing tables to Appwrite...", "cyan");

  try {
    // Change to project directory
    const projectDir =
      "d:\\My Projects\\VS Code Projects\\React Native\\Creator-Productivity-AI";
    process.chdir(projectDir);

    // Try to push tables
    const { stdout, stderr } = await execAsync("appwrite.cmd push tables", {
      timeout: 60000,
    });

    if (stdout) {
      log(stdout, "green");
    }

    if (stderr) {
      log("⚠️  " + stderr, "yellow");
    }

    log("✅ Tables pushed successfully!", "green");
  } catch (error) {
    log("❌ Failed to push tables: " + error.message, "red");

    // Provide fallback instructions
    log("\n📋 MANUAL SETUP INSTRUCTIONS:", "yellow");
    log("1. Run: appwrite.cmd login", "cyan");
    log("2. Run: appwrite.cmd push tables", "cyan");
    log("3. Check the Appwrite Console for table creation status", "cyan");

    return false;
  }
}

async function verifyConfiguration() {
  log("\n📋 Verifying Configuration...", "cyan");

  const configPath = path.join(
    "d:\\My Projects\\VS Code Projects\\React Native\\Creator-Productivity-AI\\appwrite.config.json",
  );

  try {
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    log(`✅ Configuration file loaded`, "green");
    log(`\n📊 Database: ${config.tablesDB[0].name}`, "blue");
    log(`   Database ID: ${config.tablesDB[0].$id}`, "cyan");

    log(`\n📋 Tables configured: ${config.tables.length}`, "blue");

    config.tables.forEach((table) => {
      const columnCount = table.columns.length;
      log(`   • ${table.$id} (${columnCount} columns)`, "cyan");

      table.columns.forEach((col) => {
        log(`      - ${col.key} (${col.type})`, "cyan");
      });
    });

    log("\n✅ Configuration verified!", "green");
  } catch (error) {
    log("❌ Failed to verify configuration: " + error.message, "red");
  }
}

async function main() {
  log("\n========================================", "blue");
  log("  Appwrite Tables Deployment Tool", "blue");
  log("========================================\n", "blue");

  // Step 1: Check CLI
  const cliAvailable = await checkAppwriteCLI();
  if (!cliAvailable) {
    log(
      "\n⚠️  Appwrite CLI not available. Please install it manually:",
      "yellow",
    );
    log("npm install -g appwrite-cli", "cyan");
    process.exit(1);
  }

  // Step 2: Verify configuration
  await verifyConfiguration();

  // Step 3: Push tables
  await pushTables();

  log("\n========================================", "blue");
  log("   Setup Complete!", "green");
  log("========================================\n", "blue");

  log("Next steps:", "yellow");
  log("1. Verify tables in Appwrite Console", "cyan");
  log("2. Run: npm run dev (or expo start)", "cyan");
  log("3. Test the app in Expo Go", "cyan");
}

main().catch((error) => {
  log("Error: " + error.message, "red");
  process.exit(1);
});
