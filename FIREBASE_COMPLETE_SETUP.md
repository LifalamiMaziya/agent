# Firebase Setup - Final Steps

## ✅ Completed Steps

1. ✅ **Firebase Project Created**: `vektra-app`
2. ✅ **Web App Created**: `vektra-web`
3. ✅ **Environment Variables**: `.env.local` file created with your Firebase credentials

## 🔧 Remaining Manual Steps

You need to complete these steps in the Firebase Console to enable authentication and database features.

### Step 1: Enable Firestore Database

1. Open the Firebase Console: **[https://console.firebase.google.com/project/vektra-app/firestore](https://console.firebase.google.com/project/vektra-app/firestore)**

2. Click **"Create database"**

3. Choose **"Start in test mode"** for development
   - This allows read/write access for testing
   - We'll secure it later for production

4. Select a location:
   - Recommended: **us-central1** (or closest to your users)
   - Click **"Enable"**

5. Wait for the database to be provisioned (takes 1-2 minutes)

### Step 2: Enable Authentication

1. Open Authentication: **[https://console.firebase.google.com/project/vektra-app/authentication](https://console.firebase.google.com/project/vektra-app/authentication)**

2. Click **"Get started"**

3. Go to the **"Sign-in method"** tab

4. Click on **"Email/Password"**

5. **Enable** the first toggle switch (Email/Password)
   - Leave "Email link (passwordless sign-in)" disabled for now

6. Click **"Save"**

### Step 3: Configure Authorized Domains

1. Still in Authentication, go to the **"Settings"** tab

2. Scroll down to **"Authorized domains"**

3. Your Firebase Studio domain should already be authorized, but verify:
   - `localhost` - should be present
   - If you deploy, add your production domain here later

## 🧪 Test Your Setup

Once you've completed the steps above:

1. **Restart the preview server** (Firebase Studio should auto-restart)

2. Navigate to your preview URL

3. Click **"Get started"** or go to `/auth/signup`

4. Create a test account:
   ```
   Name: Test User
   Email: test@example.com
   Password: test123
   ```

5. You should be:
   - ✅ Redirected to the home page
   - ✅ See your name in the navigation
   - ✅ Be able to access the Dashboard
   - ✅ Be able to edit your profile

6. **Verify in Firebase Console**:
   - Go to **Authentication → Users**: You should see your test user
   - Go to **Firestore → Data**: You should see a `users` collection with your user document

## 🐛 Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you enabled Email/Password in Authentication → Sign-in method
- Wait 30 seconds after enabling for changes to propagate

### "Missing or insufficient permissions"
- Verify Firestore is in **test mode**
- Check Firestore Rules tab - should look like:
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if request.time < timestamp.date(2025, 2, 1);
      }
    }
  }
  ```

### Preview not updating
- Restart the Firebase Studio preview
- Clear browser cache
- Check browser console for errors

## 📊 Verify Your Firebase Project

Your Firebase project details:
```
Project ID:      vektra-app
Project Name:    Vektra
App ID:          1:289172742733:web:8e05eb77d2f2ef27fa7204
Auth Domain:     vektra-app.firebaseapp.com
```

**Quick Links:**
- [Project Overview](https://console.firebase.google.com/project/vektra-app/overview)
- [Authentication](https://console.firebase.google.com/project/vektra-app/authentication)
- [Firestore Database](https://console.firebase.google.com/project/vektra-app/firestore)
- [Project Settings](https://console.firebase.google.com/project/vektra-app/settings/general)

## 🚀 Next Steps After Testing

1. **Secure Firestore Rules** - Replace test mode with proper security rules:
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

2. **Enable Email Verification** (Optional):
   - Authentication → Templates → Email verification
   - Customize the email template
   - Update code to require verified emails

3. **Add More Auth Providers**:
   - Google OAuth
   - GitHub OAuth
   - Twitter/X OAuth

4. **Password Reset**:
   - Already supported by Firebase
   - Customize email template in Authentication → Templates

## ✨ What You'll Have

After completing these steps, you'll have:
- ✅ Full email/password authentication
- ✅ User profiles stored in Firestore
- ✅ Protected routes (Dashboard, Profile)
- ✅ Persistent login sessions
- ✅ Sign in, Sign up, and Sign out functionality
- ✅ Editable user profiles

Enjoy your fully functional authentication system! 🎉
