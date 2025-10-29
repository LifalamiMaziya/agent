# Firebase Setup Checklist for Vektra

## ✅ Automated Steps (Already Completed)

- [x] Firebase project created: `vektra-app`
- [x] Firebase web app created: `vektra-web`
- [x] `.env.local` file created with credentials
- [x] Authentication code implemented
- [x] Firestore integration ready
- [x] Protected routes configured

## 📋 Manual Steps (Do These Now)

### 1. Enable Firestore Database
- [ ] Open [Firestore Console](https://console.firebase.google.com/project/vektra-app/firestore)
- [ ] Click "Create database"
- [ ] Select "Start in test mode"
- [ ] Choose location: `us-central1`
- [ ] Click "Enable"
- [ ] Wait for provisioning (~2 minutes)

### 2. Enable Email/Password Authentication
- [ ] Open [Authentication Console](https://console.firebase.google.com/project/vektra-app/authentication)
- [ ] Click "Get started"
- [ ] Go to "Sign-in method" tab
- [ ] Click "Email/Password"
- [ ] Enable the toggle switch
- [ ] Click "Save"

### 3. Test Authentication
- [ ] Restart preview server (if needed)
- [ ] Navigate to `/auth/signup`
- [ ] Create test account
- [ ] Verify login works
- [ ] Check dashboard access
- [ ] Verify profile editing
- [ ] Test sign out

### 4. Verify in Firebase Console
- [ ] Check [Authentication → Users](https://console.firebase.google.com/project/vektra-app/authentication/users) for test user
- [ ] Check [Firestore → Data](https://console.firebase.google.com/project/vektra-app/firestore) for `users` collection

## 🎯 After Testing

- [ ] Review [security rules](https://console.firebase.google.com/project/vektra-app/firestore/rules)
- [ ] Plan production security rules
- [ ] Consider enabling email verification
- [ ] Add more authentication providers (optional)

## 📖 Documentation

- See `FIREBASE_COMPLETE_SETUP.md` for detailed instructions
- See `AUTH_SUMMARY.md` for feature overview
- See `FIREBASE_SETUP.md` for general setup guide

---

**Estimated time to complete**: 5-10 minutes
