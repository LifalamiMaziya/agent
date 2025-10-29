'use client';

import { useState, FormEvent } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}

function SettingsContent() {
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'preferences' | 'account'>('profile');

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'subscription' as const, label: 'Subscription', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'preferences' as const, label: 'Preferences', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
    { id: 'account' as const, label: 'Account', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl font-semibold">Settings</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm text-muted hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
                Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs */}
          <aside className="md:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeTab === tab.id
                      ? 'bg-accent/10 text-accent font-medium'
                      : 'text-foreground hover:bg-subtle'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Tab Content */}
          <div className="flex-1">
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'subscription' && <SubscriptionTab />}
            {activeTab === 'preferences' && <PreferencesTab />}
            {activeTab === 'account' && <AccountTab />}
          </div>
        </div>
      </main>
    </div>
  );
}

function ProfileTab() {
  const { user, userProfile } = useAuth();
  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (user) {
        await updateProfile(user, { displayName });
        await updateDoc(doc(db, 'users', user.uid), { displayName });
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface border border-border rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Profile Information</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 text-sm">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium mb-2">
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-3 bg-subtle border border-border rounded-lg text-muted cursor-not-allowed"
            />
            <p className="text-xs text-muted mt-2">Email cannot be changed</p>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setDisplayName(userProfile?.displayName || '');
                setError('');
                setSuccess('');
              }}
              className="bg-background hover:bg-subtle text-foreground border border-border px-6 py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-muted">Display Name</label>
            <p className="text-lg">{userProfile?.displayName || 'Not set'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-muted">Email Address</label>
            <p className="text-lg">{user?.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-muted">Account Created</label>
            <p className="text-lg">
              {userProfile?.createdAt
                ? new Date(userProfile.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Unknown'}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function SubscriptionTab() {
  const { user } = useAuth();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['5 projects', 'Basic AI generation', 'Community support', 'Standard templates'],
      current: true,
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      features: ['Unlimited projects', 'Advanced AI generation', 'Priority support', 'Premium templates', 'Export code'],
      current: false,
    },
    {
      name: 'Team',
      price: '$49',
      period: 'per month',
      features: ['Everything in Pro', 'Team collaboration', 'Custom branding', 'API access', 'Dedicated support'],
      current: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-2">Subscription</h2>
        <p className="text-muted">Choose the plan that&apos;s right for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-surface border rounded-2xl p-6 ${
              plan.current ? 'border-accent ring-2 ring-accent/20' : 'border-border'
            }`}
          >
            {plan.current && (
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full mb-4">
                Current Plan
              </span>
            )}
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted ml-2">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              disabled={plan.current}
              className={`w-full py-3 rounded-lg transition-colors font-medium ${
                plan.current
                  ? 'bg-subtle text-muted cursor-not-allowed'
                  : 'bg-accent hover:bg-accent-hover text-white'
              }`}
            >
              {plan.current ? 'Current Plan' : user ? 'Upgrade' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function PreferencesTab() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface border border-border rounded-2xl p-6 md:p-8 space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Preferences</h2>
        <p className="text-muted">Customize your Vektra experience.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Appearance</h3>
        <div className="space-y-2">
          {(['system', 'light', 'dark'] as const).map((option) => (
            <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-subtle cursor-pointer">
              <input
                type="radio"
                name="theme"
                value={option}
                checked={theme === option}
                onChange={() => setTheme(option)}
                className="w-4 h-4 text-accent"
              />
              <span className="capitalize">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-8">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 rounded-lg hover:bg-subtle cursor-pointer">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted">Receive email updates about your account</p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-4 h-4"
            />
          </label>
          <label className="flex items-center justify-between p-4 rounded-lg hover:bg-subtle cursor-pointer">
            <div>
              <p className="font-medium">Project Updates</p>
              <p className="text-sm text-muted">Get notified when your projects are updated</p>
            </div>
            <input
              type="checkbox"
              checked={projectUpdates}
              onChange={(e) => setProjectUpdates(e.target.checked)}
              className="w-4 h-4"
            />
          </label>
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <button className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg transition-colors">
          Save Preferences
        </button>
      </div>
    </motion.div>
  );
}

function AccountTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
        <p className="text-muted">Manage your account security and preferences.</p>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
        <h3 className="text-lg font-semibold mb-4">Password</h3>
        <p className="text-muted mb-4">Change your password to keep your account secure.</p>
        <button className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg transition-colors">
          Change Password
        </button>
      </div>

      <div className="bg-surface border border-red-200 dark:border-red-900 rounded-2xl p-6 md:p-8">
        <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">Danger Zone</h3>
        <p className="text-muted mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
          Delete Account
        </button>
      </div>
    </motion.div>
  );
}
