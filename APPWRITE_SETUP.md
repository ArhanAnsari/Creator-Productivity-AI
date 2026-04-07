# Creator Productivity AI - Appwrite Setup Guide

## Database Schema

Your Appwrite database should have the following collections:

### 1. **users**

- `$id` (string) - User ID from Appwrite Auth
- `email` (string) - User email
- `name` (string) - User's full name
- `avatar` (string) - Avatar URL (optional)
- `role` (enum) - 'free', 'premium', 'admin'
- `createdAt` (datetime) - Account creation date
- `ideasGenerated` (integer) - Number of ideas generated
- `scriptsGenerated` (integer) - Number of scripts generated

### 2. **ideas**

- `userId` (string) - Reference to users.$id
- `niche` (string) - Content niche (e.g., coding, fitness)
- `title` (string) - Idea title
- `hook` (string) - Catchy hook for the idea
- `description` (string) - Full description
- `category` (string) - Categorized niche
- `saved` (boolean) - Whether saved by user
- `createdAt` (datetime) - When idea was created

### 3. **scripts**

- `userId` (string) - Reference to users.$id
- `ideaId` (string) - Reference to ideas.$id
- `title` (string) - Script title
- `content` (text) - Full script text
- `type` (enum) - 'short' or 'long'
- `duration` (integer) - Duration in seconds
- `wordCount` (integer) - Word count
- `saved` (boolean) - Whether saved by user
- `createdAt` (datetime) - When script was created

### 4. **plans**

- `userId` (string) - Reference to users.$id
- `title` (string) - Plan title
- `description` (string) - Plan description
- `dueDate` (date) - When content is due
- `status` (enum) - 'scheduled', 'in-progress', 'completed'
- `scriptId` (string) - Reference to scripts.$id (optional)
- `ideaId` (string) - Reference to ideas.$id (optional)
- `createdAt` (datetime) - When plan was created

### 5. **focus_sessions**

- `userId` (string) - Reference to users.$id
- `duration` (integer) - Session duration in minutes
- `sessionName` (string) - Name of focus session
- `breakInterval` (integer) - Break duration in minutes
- `completedAt` (datetime) - When session was completed
- `createdAt` (datetime) - When session was created

### 6. **streaks**

- `userId` (string) - Reference to users.$id
- `currentStreak` (integer) - Current streak count
- `longestStreak` (integer) - Longest streak ever
- `totalPosts` (number) - Total posts created
- `productivityScore` (number) - Productivity percentage
- `lastActivityDate` (datetime) - Last activity date
- `updatedAt` (datetime) - Last update

## Setup Instructions

### Step 1: Create Appwrite Project

```bash
# Go to https://cloud.appwrite.io or self-host
# Create a new project
# Copy PROJECT_ID and ENDPOINT
```

### Step 2: Create Database

```bash
# Via Appwrite Console:
# 1. Go to Databases
# 2. Create new database
# 3. Name it (e.g., "CreatorAI")
# Copy DATABASE_ID
```

### Step 3: Create Collections

Create all collections listed above with the specified attributes.

### Step 4: Set Environment Variables

Update `.env` file:

```
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://your-region.cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_key
```

### Step 5: Configure Auth

```bash
# In Appwrite Console:
# 1. Go to Settings > Auth Methods
# 2. Enable Email/Password
# 3. Add your app OAuth URLs for Google login
```

### Step 6: Set Permissions

For each collection, set permissions:

- Owner can read/write
- Anyone can login to read their own documents

## Appwrite Functions Setup (Optional - for Server-side AI)

Create a function in Appwrite to handle AI securely:

```bash
appwrite init functions
```

Create `functions/generateContent/index.js`:

```javascript
import { Client, Users } from "node-appwrite";

export default async (context) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const body = JSON.parse(context.req.body || "{}");

  // Call Gemini API securely
  // Return results to client

  return context.res.json({
    success: true,
    data: "generated_content",
  });
};
```

Deploy with:

```bash
appwrite push functions
```

## Testing the Setup

1. **Test Authentication:**
   - Try signing up with email/password
   - Verify user is created in database

2. **Test Database:**
   - Generate an idea
   - Verify it appears in Appwrite Console

3. **Test Permissions:**
   - Login as different user
   - Ensure they can only see their data

## Troubleshooting

**Issue: "Project ID not found"**

- Check `.env` file has correct PROJECT_ID
- Ensure app is linked to the correct Appwrite instance

**Issue: "Database not found"**

- Create database via Console first
- Update DATABASE_ID in `.env`

**Issue: "Permission denied"**

- Check collection/document permissions
- Ensure auth is working correctly

## Next Steps

1. Deploy to Appwrite Cloud or self-host
2. Enable realtime subscriptions for live updates
3. Set up backups and security policies
4. Monitor usage and optimize queries
