# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication for the Vektra application.

## Prerequisites

- A Google account
- Access to [Firebase Console](https://console.firebase.google.com/)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or select an existing project
3. Enter your project name (e.g., "Vektra")
4. Follow the setup wizard (you can disable Google Analytics if not needed)
5. Click **"Create project"**

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon (</>) ** to add a web app
2. Enter an app nickname (e.g., "Vektra Web")
3. **Do NOT** check "Set up Firebase Hosting" (we're using Next.js)
4. Click **"Register app"**
5. You'll see your Firebase configuration - **keep this page open**

## Step 3: Enable Authentication

1. In the Firebase Console sidebar, click **"Authentication"**
2. Click **"Get started"**
3. Go to the **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Enable the **first toggle** (Email/Password)
6. Click **"Save"**

## Step 4: Enable Firestore Database

1. In the Firebase Console sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** for development (you can secure it later)
4. Select your preferred region
5. Click **"Enable"**

## Step 5: Configure Environment Variables

1. Copy the `.env.local.example` file to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and fill in your Firebase configuration values from Step 2:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. **Important**: The `.env.local` file is gitignored and will NOT be committed to version control

## Step 6: Test the Authentication

1. The dev server should already be running in Firebase Studio
2. Open your preview URL
3. Click **"Get started"** or navigate to `/auth/signup`
4. Create a test account with:
   - Full name
   - Email address
   - Password (minimum 6 characters)
5. You should be redirected to the home page and see your name in the navigation
6. Try signing out and signing back in

## Features Implemented

### Pages Created
- **`/auth/signin`** - Sign in page with email/password
- **`/auth/signup`** - Sign up page with email/password
- **`/dashboard`** - Protected dashboard (requires authentication)
- **`/profile`** - User profile page with editable display name

### Components
- **`AuthContext`** - Global authentication state management
- **`ProtectedRoute`** - Wrapper component for protected pages
- **`Navigation`** - Updated with auth-aware UI (shows different options for logged in/out users)

### Authentication Features
- Email/password sign up and sign in
- User profile storage in Firestore
- Protected routes (redirects to sign in if not authenticated)
- Sign out functionality
- Profile editing (display name)
- Persistent authentication state

## Security Notes

### Current Setup (Development)
- Firestore is in **test mode** - anyone can read/write
- This is fine for development but **NOT for production**

### Production Recommendations
1. **Secure Firestore Rules**: Update your Firestore security rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

2. **API Key Security**: The Firebase API key in `.env.local` is safe to expose in client-side code, but:
   - Add your domain to authorized domains in Firebase Console > Authentication > Settings
   - Implement proper security rules in Firestore

3. **Email Verification**: Consider enabling email verification:
   - Firebase Console > Authentication > Templates > Email verification

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you've enabled Email/Password authentication in Firebase Console
- Check that all environment variables are set correctly in `.env.local`

### "Firebase: Error (auth/invalid-api-key)"
- Verify your `NEXT_PUBLIC_FIREBASE_API_KEY` in `.env.local`
- Make sure there are no extra spaces or quotes

### "User redirected to sign in immediately after signing up"
- Check browser console for errors
- Verify Firestore is enabled and in test mode
- Check that the `users` collection can be written to

### Environment variables not loading
- Restart the dev server after creating/modifying `.env.local`
- In Firebase Studio, you may need to restart the preview

## Next Steps

1. **Add more authentication providers**: Google, GitHub, etc.
2. **Implement password reset**: Use Firebase's password reset emails
3. **Add email verification**: Require users to verify their email
4. **Secure Firestore**: Update security rules for production
5. **Add user roles**: Implement admin/user role system
6. **Profile pictures**: Add user avatar upload functionality

## Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
