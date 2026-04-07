# Creator Productivity AI - Project Setup & Architecture

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

### 3. Get Required API Keys

#### Appwrite

- Go to https://cloud.appwrite.io
- Create a free project
- Copy PROJECT_ID and ENDPOINT
- Create a database and copy DATABASE_ID

#### Google Gemini API

- Go to https://ai.google.dev
- Create API key for Gemini
- Add to `.env`

### 4. Run the App

```bash
npm start

# For iOS
npm run ios

# For Android
npm run android

# For Web
npm run web
```

## Project Structure

```
app/
├── (auth)/
│   ├── _layout.tsx
│   ├── login.tsx
│   └── signup.tsx
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx (Dashboard)
│   ├── ideas.tsx (Idea Generator)
│   ├── scripts.tsx (Script Generator)
│   ├── planner.tsx (Content Calendar)
│   ├── explore.tsx (Focus Mode)
│   └── profile.tsx (User Profile)

components/
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   └── LoadingScreen.tsx

services/
├── appwrite.ts (Database & Auth)
├── gemini.ts (AI Integration)

store/
├── authStore.ts (Auth State)
└── appStore.ts (App State)

types/
└── index.ts (TypeScript Types)

config/
└── env.ts (Configuration)

constants/
└── design.ts (Theme & Styles)
```

## Key Features

### ✨ AI Idea Generator

- Input: Content niche (coding, fitness, etc.)
- AI generates 10 catchy content ideas
- Each idea includes title, hook, and description
- Save favorites to database

### 📝 AI Script Generator

- Select an idea
- Choose short-form (60-90s) or long-form (5-10min)
- AI generates full script with structure
- Save and edit scripts

### 📅 Content Planner

- Calendar-based planning
- Schedule content with due dates
- Track status (scheduled → in-progress → done)
- Realtime updates

### ⏱️ Focus Mode

- Customizable timer sessions (15, 25, 45, 60 minutes)
- Track completed sessions
- Gamified productivity tracking

### 📊 Progress Tracker

- Productivity score
- Daily streak tracking
- Total posts count
- Achievement badges

### 👤 User Profile

- View account statistics
- Manage account settings
- Track achievements

## Authentication Flow

1. **Signup**: User creates account with email/password
2. **Login**: Credentials stored in Appwrite Auth
3. **Session**: Auto-refresh token maintained
4. **Protected Routes**: Tab screens require auth
5. **Logout**: Session destroyed

## Data Flow

```
User Action -> UI Component
            ↓
       Zustand Store
            ↓
Appwrite Service (SDK)
            ↓
Appwrite Backend
            ↓
Database/Auth
```

## State Management

Using **Zustand** for lightweight state:

```typescript
// Auth Store
- user info
- login/signup/logout

// App Store
- ideas, scripts, plans
- focus sessions
- streaks/achievements
```

## Error Handling

All operations include proper error handling:

- Network failures → User alert
- Auth errors → Redirect to login
- DB errors → Show error message

## Performance Optimizations

1. **Image Optimization**: Expo Image
2. **Animation**: Reanimated 4 (GPU)
3. **Navigation**: Expo Router
4. **State Management**: Zustand (minimal)
5. **Code Splitting**: Route-based

## Testing

### Test Accounts

- Email: `test@example.com`
- Password: `Test@123`

### Test Workflows

1. Sign up → Create account
2. Generate ideas → Save to DB
3. Write script → Modify & save
4. Plan content → Update status
5. Focus session → Complete
6. View profile → Check stats

## Deployment

### iOS

```bash
npm run ios
eas build --platform ios
```

### Android

```bash
npm run android
eas build --platform android
```

### Web

```bash
npm run web
npm run build
```

## Monetization Features

### Feature Flags Implemented

- `user.role` determines tier (free/premium)
- Free tier: Limited AI calls per day
- Premium: Unlimited AI access
- AdMob integration ready

### Upgrade Path

- In-app purchase flow structure
- Premium features highlighted
- Trial period logic

## Security Best Practices

1. **API Keys**: Never commit `.env` file
2. **Auth**: Session-based with refresh
3. **Database**: Row-level security via rules
4. **Functions**: Server-side validation
5. **CORS**: Configured in Appwrite

## Troubleshooting

### App won't start

```bash
npm install
npm start --clear
```

### Appwrite connection fails

- Check `EXPO_PUBLIC_APPWRITE_ENDPOINT`
- Verify PROJECT_ID
- Check network connectivity

### AI generation fails

- Verify GEMINI_API_KEY
- Check API quota
- Ensure valid niche input

## Future Enhancements

- [ ] Real-time notifications
- [ ] Video preview integration
- [ ] Collaboration features
- [ ] Analytics dashboard
- [ ] Mobile app store listings
- [ ] Payment gateway integration
- [ ] Advanced scheduling
- [ ] Content calendar export
- [ ] Team management
- [ ] API rate limiting

## Support

For issues, check:

1. `.env` configuration
2. Appwrite Console status
3. Network connectivity
4. Browser console errors

## License

MIT - Feel free to use and modify!
