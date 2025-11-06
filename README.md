# Firebase Chat Application

A simple chat application built with React, TypeScript, Firebase, and Material UI.

## Features

### Authentication & Security

- **Google Authentication** - Sign in with Google account using Firebase Auth
- **Auth State Management** - Custom `useAuthState` hook for managing authentication state
- **Protected Routes** - `AuthGate` component guards authenticated content
- **Online Presence** - Real-time user online/offline status using Firebase Realtime Database

### Real-time Chat

- **Real-time Messaging** - Instant message delivery with Firestore subscriptions
- **Room Management** - Create and join chat rooms
- **Message Grouping** - Groups consecutive messages within 3 minutes
- **Typing Indicators** - See when other users are typing (800ms debounce)
- **Auto-scroll** - Automatically scrolls to latest messages

### User Experience

- **Responsive Layout** - Mobile-first design with Material UI
- **Message Bubbles** - Modern chat UI with rounded bubbles
- **Loading States** - Skeleton loaders for better UX
- **Error Handling** - ErrorBoundary component and global Snackbar notifications
- **Empty States** - Friendly messages when no content exists

### Code Quality

- **Type Safety** - Full TypeScript support with strict mode
- **ESLint & Prettier** - Consistent code style
- **Husky Hooks** - Pre-commit linting and formatting
- **Firestore Security Rules** - Comprehensive data validation and access control

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Firebase** - Backend services
- **Material UI** - Component library
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **pnpm** - Package manager

## Project Structure

```
chat-firebase/
├── src/
│   ├── components/     # React components
│   ├── services/       # Firebase and API services
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # App entry point
│   └── index.css       # Global styles
├── public/             # Static assets
└── ...config files
```

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google provider
3. Create a Firestore database:
   - Go to Firestore Database > Create database
   - Start in test mode (you can change rules later)
4. Create a Realtime Database (for presence and typing indicators):
   - Go to Realtime Database > Create database
   - Start in test mode
   - Note the database URL (e.g., `https://your-project-id-default-rtdb.firebaseio.com`)
5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and click the web icon (`</>`)
   - Copy your Firebase configuration
6. Create `.env.local` file in the project root:
   ```bash
   cp .env.example .env.local
   ```
7. Fill in your Firebase credentials in `.env.local`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
   ```

### 3. Deploy Firestore Security Rules

The project includes secure Firestore rules in `firestore.rules`. Deploy them to your Firebase project:

**Option 1: Using Firebase Console**

1. Go to Firestore Database > Rules
2. Copy the contents of `firestore.rules`
3. Paste and publish

**Option 2: Using Firebase CLI**

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

### 4. Run development server

```bash
pnpm dev
```

## Data Structure

### TypeScript Types

The application uses strict TypeScript types defined in `src/types.ts`:

**UserDoc** - User profile stored in `/users/{uid}`

- `uid`: User ID
- `email`: User email
- `displayName`: Display name
- `photoURL`: Profile photo URL
- `createdAt`: Account creation timestamp
- `lastSeen`: Last activity timestamp

**Room** - Chat room stored in `/rooms/{roomId}`

- `id`: Room ID
- `name`: Room name (max 100 chars)
- `description`: Optional room description
- `participants`: Array of user UIDs
- `createdBy`: Room creator UID
- `createdAt`, `updatedAt`: Timestamps
- `lastMessage`, `lastMessageAt`: Last message preview

**Message** - Chat message stored in `/rooms/{roomId}/messages/{messageId}`

- `id`: Message ID
- `roomId`: Parent room ID
- `uid`: Author UID
- `displayName`: Author name
- `photoURL`: Author photo
- `text`: Message content (max 1000 chars)
- `createdAt`: Creation timestamp
- `edited`, `editedAt`: Edit tracking

## Security Rules

The Firestore security rules (`firestore.rules`) enforce:

1. **Authentication Required** - All operations require user authentication
2. **Room Access Control** - Users can only read/write rooms they are participants of
3. **Message Validation**:
   - Maximum message length: 1000 characters
   - Users can only send messages in rooms they belong to
   - Users can only edit/delete their own messages
4. **Data Integrity**:
   - Validates required fields and data types
   - Enforces server timestamps for `createdAt`
   - Prevents unauthorized field modifications
5. **User Privacy** - Users can only access their own profile data

## Available Scripts

### Build for production

```bash
pnpm build
```

### Preview production build

```bash
pnpm preview
```

### Lint code

```bash
pnpm lint
```

### Format code

```bash
pnpm format
```

### Deploy to Firebase Hosting

```bash
pnpm deploy
```

### Deploy Firestore Rules only

```bash
pnpm deploy:rules
```

## Deployment

### Prerequisites

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase in your project (if not already done):
   ```bash
   firebase init
   ```
   Select:
   - Firestore
   - Hosting
   - Use existing project

### Deploy Steps

1. **Build the application:**

   ```bash
   pnpm build
   ```

2. **Deploy to Firebase Hosting:**

   ```bash
   pnpm deploy
   ```

   This will:
   - Build the production bundle
   - Deploy to Firebase Hosting
   - Your app will be available at `https://your-project-id.web.app`

3. **Deploy Firestore Rules separately:**
   ```bash
   pnpm deploy:rules
   ```

### Firebase Hosting Configuration

The `firebase.json` configures:

- **Public directory**: `dist` (Vite build output)
- **SPA rewrites**: All routes redirect to `/index.html`
- **Caching headers**: Static assets cached for 1 year
- **Firestore rules**: Deployed from `firestore.rules`

### Environment Variables for Production

Make sure to set up your environment variables in Firebase Hosting if needed, or ensure your `.env.local` is properly configured before building.

## Git Hooks

This project uses Husky and lint-staged to automatically format and lint code before commits.
