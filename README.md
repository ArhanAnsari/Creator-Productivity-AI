# Creator Productivity AI - Complete Project

A production-ready React Native mobile app built with Expo, TypeScript, Appwrite, and Google Gemini AI. Turn content ideas into scripts in seconds with AI assistance.

## 🎯 Core Features

### ✨ AI Idea Generator

Generate viral content ideas for any niche in seconds. Each idea includes:

- Catchy titles
- Attention-grabbing hooks
- Full descriptions
- Category classification

### 📝 AI Script Generator

Transform ideas into ready-to-shoot video scripts:

- **Short-form**: 60-90 second YouTube Shorts scripts
- **Long-form**: 5-10 minute video scripts
- Structure: Hook → Problem → Body → CTA
- Word counts and timing estimates

### 📅 Smart Content Planner

Organize your content calendar with:

- Schedule content by date
- Track status (Scheduled → In Progress → Done)
- Calendar integration
- Realtime updates via Appwrite

### ⏱️ Focus Mode

Productivity timer with:

- Customizable session lengths (15, 25, 45, 60 min)
- Session history tracking
- Gamified streak system
- Break interval management

### 📊 Progress Tracker

Visualize your productivity:

- Productivity score (0-100%)
- Daily streak tracking (🔥)
- Total posts count
- Achievement badges
- Longest streak record

### 👤 User Profile & Settings

- Account management
- Achievement showcase
- Stats overview
- Logout option

## 🏗️ Architecture

### Frontend Stack

- **React Native** 0.81 with Expo 54
- **TypeScript** for type safety
- **Expo Router** for navigation
- **Zustand** for state management
- **Reanimated** for animations
- **React Native Gesture Handler** for gestures

### Backend Integration

- **Appwrite** for:
  - Authentication (Email/Password + OAuth)
  - Database (TablesDB)
  - Realtime updates
  - File storage
  - Functions (optional)
- **Google Gemini Pro** for AI content generation

### Design System

- Dark & Light mode support
- Modern Gen-Z friendly UI
- Smooth animations
- Gradient cards
- Custom components

## 📦 Project Structure

```
creator-productivity-ai/
├── app/ (Expo Router)
│   ├── (auth)/
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/
│   │   ├── index.tsx (Dashboard)
│   │   ├── ideas.tsx
│   │   ├── scripts.tsx
│   │   ├── planner.tsx
│   │   ├── explore.tsx (Focus)
│   │   ├── profile.tsx
│   │   └── _layout.tsx
│   └── _layout.tsx
├── components/ui/
├── services/ (API integrations)
├── store/ (Zustand state)
├── types/ (TypeScript)
├── config/ (Environment)
└── constants/ (Design tokens)
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- Expo CLI
- Appwrite account (free)
- Google Gemini API key

### Installation

```bash
# Clone and install
git clone <repo>
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Run the app
npm start
```

## 📱 Test It Out

1. **Sign Up**: Create account with email
2. **Generate Ideas**: Pick a niche (e.g., "coding")
3. **Create Scripts**: Turn ideas into video scripts
4. **Plan Content**: Schedule upcoming videos
5. **Track Progress**: Monitor productivity stats

## 🔐 Authentication

- Email/Password signup
- Google OAuth (optional)
- Role-based access (Free/Premium)
- Persistent sessions

## 💾 Database

6 collections in Appwrite:

- `users` - Accounts
- `ideas` - AI-generated ideas
- `scripts` - Video scripts
- `plans` - Content calendar
- `focus_sessions` - Productivity data
- `streaks` - Achievement tracking

## 🤖 AI Integration

Uses **Google Gemini Pro**:

- Content idea generation
- Script writing
- Trend analysis
- Content improvement

## 💰 Monetization Ready

Feature flags implemented:

- **Free Tier**: 5 ideas/day, 2 scripts/day
- **Premium**: Unlimited AI, advanced analytics

## 🎨 UI Highlights

- Dark/Light mode
- Modern card-based design
- Smooth animations
- Gen-Z friendly
- Fully responsive

## 📊 State Management

Using **Zustand**:

- `authStore` - User info, login/logout
- `appStore` - Ideas, scripts, plans, streaks

## 🧪 Test Accounts

```
Email: demo@example.com
Password: Demo@123
```

## 📚 Documentation

- `SETUP.md` - Complete setup guide
- `APPWRITE_SETUP.md` - Database configuration
- See code comments for architecture

## 🚀 Deployment

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android

# Web
npm run build
```

## 🛣️ Roadmap

- ✅ Core app
- ✅ Authentication
- ✅ AI generation
- ✅ Content planning
- ⏳ Real-time notifications
- ⏳ Team collaboration
- ⏳ Analytics
- ⏳ Marketplace

## 📄 License

MIT - Free to use and modify

## 🆘 Support

Check `SETUP.md` for troubleshooting or see GitHub issues for common problems.

---

**Ready to scale your content creation?** 🚀

Built with ❤️ using React Native, Appwrite, and Gemini AI.

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
