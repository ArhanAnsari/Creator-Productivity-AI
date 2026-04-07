# Creator Productivity AI - Architecture & API Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Native App (Expo)                  │
│ ┌──────────────────┬──────────────────┬────────────────────┐│
│ │  Auth Screens    │  Feature Screens │   Profile Screen   ││
│ │ • Login          │ • Ideas          │ • Stats            ││
│ │ • Signup         │ • Scripts        │ • Achievements     ││
│ └──────────────────┴──────────────────┴────────────────────┘│
│                            ↓  ↑                             │
│ ┌────────────────────────────────────────────────────────┐ │
│ │              Zustand State Management                  │ │
│ │ • authStore (user, auth state)                        │ │
│ │ • appStore (data, loading states)                     │ │
│ └────────────────────────────────────────────────────────┘ │
│                            ↓  ↑                             │
│ ┌────────────────────────────────────────────────────────┐ │
│ │              Service Layer                             │ │
│ │ • appwrite.ts (DB, Auth)                              │ │
│ │ • gemini.ts (AI)                                       │ │
│ └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
        ↓                           ↓
┌──────────────────┐       ┌────────────────────┐
│   Appwrite API   │       │   Gemini API       │
│ • Auth           │       │ • Generate Ideas   │
│ • Database       │       │ • Write Scripts    │
│ • Realtime       │       │ • Analyze Trends   │
└──────────────────┘       └────────────────────┘
```

## Data Flow

### 1. Authentication Flow

```
User Input (Email/Password)
    ↓
LoginScreen/SignupScreen
    ↓
useAuthStore.login/signup()
    ↓
appwriteService.loginWithEmail / createAccount()
    ↓
Appwrite Auth API
    ↓
Session Created + User Doc in DB
    ↓
Store user in authStore
    ↓
Router redirects to (tabs)
```

### 2. Content Generation Flow

```
User selects niche
    ↓
Ideas Screen
    ↓
handleGenerateIdeas()
    ↓
geminiService.generateIdeas(niche)
    ↓
Google Gemini API (streaming)
    ↓
Parse JSON response
    ↓
Display in UI
    ↓
handleSaveIdea()
    ↓
useAppStore.addIdea()
    ↓
appwriteService.saveIdea()
    ↓
Appwrite Database (ideas collection)
    ↓
Realtime update broadcast
```

### 3. Data Fetching Flow

```
Component Mount
    ↓
useEffect()
    ↓
Check if user exists
    ↓
useAppStore.loadIdeas(userId)
    ↓
appwriteService.getUserIdeas(userId)
    ↓
Query DB with userId filter
    ↓
Set store state
    ↓
UI re-renders with data
```

## API Services

### AppwriteService (appwrite.ts)

**Authentication:**

```typescript
createAccount(email, password, name) → User
loginWithEmail(email, password) → User
logout() → void
getCurrentUser() → User | null
```

**Ideas:**

```typescript
saveIdea(userId, idea) → Idea
getUserIdeas(userId) → Idea[]
deleteIdea(ideaId) → void
```

**Scripts:**

```typescript
saveScript(userId, script) → Script
getUserScripts(userId) → Script[]
deleteScript(scriptId) → void
```

**Plans:**

```typescript
createContentPlan(userId, plan) → ContentPlan
getUserContentPlans(userId) → ContentPlan[]
updateContentPlan(planId, updates) → ContentPlan
deleteContentPlan(planId) → void
```

**Focus Sessions:**

```typescript
createFocusSession(userId, session) → FocusSession
getUserFocusSessions(userId) → FocusSession[]
```

**Streaks:**

```typescript
getOrCreateStreak(userId) → Streak
updateStreak(streakId, updates) → Streak
```

### GeminiService (gemini.ts)

**Content Generation:**

```typescript
generateIdeas(niche, count) → Idea[]
generateScript(title, hook, type) → Script
improveContent(content, instruction) → string
analyzeTrends(niche) → string[]
```

**Internal:**

```typescript
categorizeNiche(niche) → string
```

## State Management (Zustand)

### authStore

```typescript
user: User | null;
isLoading: boolean;
isAuthenticated: boolean;
error: string | null;

Methods: -login(email, password) -
  signup(email, password, name) -
  logout() -
  checkAuth() -
  clearError();
```

### appStore

```typescript
// Collections
ideas: Idea[]
scripts: Script[]
plans: ContentPlan[]
streak: Streak | null
focusSessions: FocusSession[]

// Loading states
ideasLoading: boolean
scriptsLoading: boolean
plansLoading: boolean
streakLoading: boolean
focusLoading: boolean

Methods:
- loadIdeas/Scripts/Plans/Streak/FocusSessions()
- addIdea/Script(userId, data)
- removeIdea/Script(id)
- updatePlan(planId, updates)
- updateStreak(streakId, updates)
```

## Component Hierarchy

```
RootLayout (_layout.tsx)
├── (auth)
│   ├── login.tsx
│   └── signup.tsx
└── (tabs)
    ├── _layout.tsx (Navigation)
    ├── index.tsx (Dashboard)
    ├── ideas.tsx (Idea Generator)
    ├── scripts.tsx (Script Generator)
    ├── planner.tsx (Content Calendar)
    ├── explore.tsx (Focus Mode)
    └── profile.tsx (Profile)

UI Components (components/ui/)
├── Button.tsx
├── Input.tsx
├── Card.tsx
├── Badge.tsx
└── LoadingScreen.tsx
```

## Type System

```typescript
// User Management
interface User {
  $id: string;
  email: string;
  name: string;
  role: "free" | "premium" | "admin";
  createdAt: string;
  ideasGenerated: number;
  scriptsGenerated: number;
}

// Content
interface Idea {
  $id: string;
  userId: string;
  niche: string;
  title: string;
  hook: string;
  description: string;
  category: string;
  saved: boolean;
  createdAt: string;
}

interface Script {
  $id: string;
  userId: string;
  ideaId: string;
  title: string;
  content: string;
  type: "short" | "long";
  duration?: number;
  wordCount: number;
  saved: boolean;
  createdAt: string;
}

// Tracking
interface Streak {
  $id: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  totalPosts: number;
  productivityScore: number;
  lastActivityDate: string;
  updatedAt: string;
}
```

## Error Handling

### Try-Catch Pattern

```typescript
try {
  // API call or async operation
  const result = await appwriteService.method();
  // Update UI
  updateState(result);
} catch (error) {
  // Log error
  console.error(error);
  // Show user-friendly message
  Alert.alert("Error", error.message);
}
```

### Store Error States

```typescript
// In Zustand store
catch (error: any) {
  set({
    error: error.message || 'Unknown error',
    loading: false
  })
}
```

## Security Considerations

1. **API Keys**: Never hardcoded, use .env
2. **Sessions**: Token auto-refresh handled by Appwrite
3. **Permissions**: Row-level security via user filters
4. **Input**: Validated before sending to APIs
5. **CORS**: Configured in Appwrite

## Performance Optimization

1. **State**: Zustand for minimal re-renders
2. **Navigation**: Expo Router with lazy loading
3. **Lists**: FlatList/ScrollView virtualization ready
4. **Images**: Expo Image with caching
5. **API**: Debounced search, pagination ready

## Realtime Updates (Ready to Implement)

```typescript
// Listen to subscription for realtime updates
const unsubscribe = appwriteService
  .getClient()
  .subscribe("databases.DATABASE_ID.collections.IDEAS.documents", (payload) => {
    // Update store on server changes
    updateStore(payload);
  });
```

## Environment Variables

```
EXPO_PUBLIC_APPWRITE_ENDPOINT
EXPO_PUBLIC_APPWRITE_PROJECT_ID
EXPO_PUBLIC_APPWRITE_DATABASE_ID
EXPO_PUBLIC_GEMINI_API_KEY
EXPO_PUBLIC_FREE_TIER_LIMIT
EXPO_PUBLIC_PREMIUM_TIER_LIMIT
```

## Deployment Checklist

- [ ] Set production API endpoints
- [ ] Enable CORS in Appwrite
- [ ] Configure OAuth providers
- [ ] Set up error logging
- [ ] Enable analytics
- [ ] Configure backups
- [ ] Test all features
- [ ] Performance testing
- [ ] Security audit
- [ ] App store submission

---

**Architecture designed for scalability, maintainability, and user experience!**
