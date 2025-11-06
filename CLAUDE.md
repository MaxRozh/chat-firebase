# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Setup

```bash
pnpm install              # Install dependencies
pnpm prepare              # Set up Husky git hooks
```

### Development

```bash
pnpm dev                  # Start Vite dev server (http://localhost:5173)
pnpm build                # Build for production (outputs to dist/)
pnpm preview              # Preview production build locally
```

### Code Quality

```bash
pnpm lint                 # Run ESLint
pnpm format               # Format code with Prettier
pnpm format:check         # Check formatting without changes
```

### Firebase Deployment

```bash
pnpm deploy               # Build and deploy to Firebase Hosting
pnpm deploy:rules         # Deploy Firestore security rules only

# Manual Firebase CLI commands
firebase deploy --only firestore:rules    # Deploy Firestore rules
firebase deploy --only database          # Deploy Realtime DB rules
firebase deploy                          # Deploy all Firebase services
```

## Architecture Overview

### Tech Stack

- **Frontend**: React 18 + TypeScript (strict mode) + Vite
- **UI**: Material UI v7 with Emotion styling
- **Backend**: Firebase (Auth, Firestore, Realtime Database)
- **Routing**: React Router v7
- **Package Manager**: pnpm with workspace support

### Core Architecture Patterns

**1. Dual Database Strategy**

- **Firestore**: Persistent data (users, rooms, messages)
- **Realtime Database**: Ephemeral data (presence, typing indicators)
- Rationale: Firestore for structured queries + RTDB for low-latency real-time events

**2. Real-time Subscription Pattern**

- All data hooks use Firebase's `onSnapshot` or `onValue` for real-time updates
- Subscriptions automatically clean up in `useEffect` return functions
- Pattern: `[data, loading]` tuple return from custom hooks

**3. Authentication Flow**

- `useAuthState` hook wraps Firebase auth state changes
- `AuthGate` component guards all authenticated routes
- On first sign-in: auto-creates user doc + default "General" room
- `initializePresence` sets up RTDB presence tracking with `onDisconnect`

**4. Service Layer Organization**

```
src/services/
├── firestore.ts   # CRUD operations for Firestore collections
├── presence.ts    # RTDB presence tracking (online/offline status)
└── typing.ts      # RTDB typing indicators (per room)
```

**5. Custom Hooks Pattern**

```
src/hooks/
├── useAuthState.ts         # Auth state management
├── useRooms.ts             # Real-time rooms subscription
├── useMessages.ts          # Real-time messages subscription
├── useTyping.ts            # Send typing indicators
└── useTypingIndicator.ts   # Listen to typing indicators
```

### Data Model

**Firestore Collections:**

```
/users/{uid}                          # User profiles
/rooms/{roomId}                       # Chat rooms
/rooms/{roomId}/messages/{messageId}  # Messages (subcollection)
```

**Realtime Database:**

```
/presence/{uid}           # { online: boolean, lastSeen: timestamp }
/typing/{roomId}/{uid}    # boolean (true when typing)
```

**Key TypeScript Types** (src/types.ts):

- `UserDoc`: User profile with timestamps
- `Room`: Chat room with participants array and metadata
- `Message`: Chat message with author info
- `MessageInput`, `RoomInput`: Input DTOs for mutations

### Security Rules

**Firestore** (firestore.rules):

- Requires authentication for all operations
- Users can only read/write their own profile (`/users/{uid}`)
- Rooms: only participants can read/write
- Messages: only room participants can read; users can only edit/delete their own messages
- Enforces data validation: message length (1-1000 chars), room name length (1-100 chars)
- Enforces server timestamps for `createdAt` fields

**Realtime Database** (database.rules.json):

- Presence: anyone can read, users can only write their own status
- Typing: anyone can read, users can only write their own typing status

### Component Architecture

**Layout Structure:**

```
App.tsx
└── ErrorBoundary
    └── SnackbarProvider (global notifications)
        └── BrowserRouter
            └── AuthGate (auth required)
                └── ChatLayout (sidebar + content)
                    ├── Routes
                    ├── Home (/)
                    └── ChatRoom (/r/:roomId)
```

**Key Components:**

- `AuthGate`: Handles sign-in flow, initializes presence on auth
- `ChatLayout`: Two-column layout with RoomList sidebar
- `MessageList`: Auto-scrolls to bottom, groups consecutive messages
- `MessageComposer`: Text input with typing indicator emission (800ms debounce)
- `ErrorBoundary`: Global error handling for React tree

### Important Implementation Details

**Message Grouping:**

- Messages from same user within 3 minutes are visually grouped
- Reduces visual clutter and improves readability

**Typing Indicators:**

- 800ms debounce before marking user as "stopped typing"
- Uses RTDB for sub-second latency
- Cleaned up on component unmount

**Presence System:**

- Uses Firebase's `onDisconnect` for automatic offline detection
- Cleaned up on sign-out via `cleanupPresence`
- Presence state synced on every auth state change

**Path Alias:**

- `@/` resolves to `src/` (configured in vite.config.ts)
- Currently not used in codebase (relative imports preferred)

## Firebase Configuration

**Required Environment Variables** (.env.local):

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_DATABASE_URL    # For Realtime Database
```

See `.env.example` for template. Never commit `.env.local` to git.

**First-Time Firebase Setup:**

1. Create Firebase project at console.firebase.google.com
2. Enable Google Authentication (Authentication > Sign-in method)
3. Create Firestore database (start in test mode)
4. Create Realtime Database (start in test mode, note the URL)
5. Get web app config (Project Settings > Your apps > Web)
6. Copy `.env.example` to `.env.local` and fill in values
7. Deploy security rules: `firebase deploy --only firestore:rules,database`

See FIREBASE_SETUP.md for comprehensive setup guide.

## Git Workflow

**Pre-commit Hooks:**

- Husky + lint-staged automatically run on commit
- ESLint --fix on TypeScript files
- Prettier --write on all supported files

**Branch:** main (default branch for PRs)

## Common Tasks

**Adding a New Firestore Collection:**

1. Define TypeScript types in `src/types.ts`
2. Create service functions in `src/services/firestore.ts`
3. Create custom hook in `src/hooks/` for real-time subscription
4. Update `firestore.rules` with appropriate security rules
5. Deploy rules: `pnpm deploy:rules`

**Adding a New Real-time Feature:**

1. Create service in `src/services/` using RTDB
2. Create custom hook using `onValue` subscription
3. Update `database.rules.json` with security rules
4. Deploy: `firebase deploy --only database`

**Debugging Firestore/RTDB Issues:**

- Check browser console for Firebase errors
- Verify security rules in Firebase Console
- Use Firebase Emulator Suite for local testing (not currently configured)
- Check Network tab for denied requests (403 = permission denied)
