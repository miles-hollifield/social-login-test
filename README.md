# 🔐 Social Login Test App

A simple Node.js/Express application for testing Google and Facebook OAuth login integration.

## 🚀 Quick Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up OAuth providers:**

   ### Google OAuth Setup:
   - Go to [Google Developers Console](https://console.developers.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API (or Google Identity API)
   - Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
   - Set application type to **"Web application"**
   - Add authorized redirect URI: `http://localhost:3000/auth/google/callback`
   - Copy your Client ID and Client Secret

   ### Facebook OAuth Setup:
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create a new app or select an existing one
   - Add **"Facebook Login"** product to your app
   - In Facebook Login settings → **Valid OAuth Redirect URIs**, add: `http://localhost:3000/auth/facebook/callback`
   - Go to **Settings** → **Basic** to get your App ID and App Secret

3. **Configure environment variables:**
   ```bash
   copy .env.example .env
   ```
   Edit `.env` and add your OAuth credentials:
   ```
   GOOGLE_CLIENT_ID=your_actual_google_client_id
   GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
   FACEBOOK_APP_ID=your_actual_facebook_app_id
   FACEBOOK_APP_SECRET=your_actual_facebook_app_secret
   SESSION_SECRET=any_random_string_here
   ```

4. **Run the application:**
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Test the login:**
   - Open http://localhost:3000
   - Click "Login with Google" or "Login with Facebook"
   - Complete the OAuth flow
   - You'll be redirected to a dashboard showing your profile info

## 📁 Project Structure

```
social-login-test/
├── server.js          # Main Express server with OAuth logic
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
├── .env              # Your actual environment variables (create this)
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## 🔧 Features

- ✅ Google OAuth 2.0 integration
- ✅ Facebook OAuth 2.0 integration
- ✅ Session management
- ✅ Protected routes
- ✅ User profile display (shows which provider was used)
- ✅ Logout functionality
- ✅ Simple HTML interface
- ✅ Error handling

## 🛠️ Technology Stack

- **Backend:** Node.js + Express
- **Authentication:** Passport.js with Google & Facebook OAuth 2.0
- **Sessions:** express-session
- **Environment:** dotenv

## 📝 Notes

- This is a minimal MVP for testing purposes
- In production, you'd want to add a database, proper error handling, and security measures
- The user data is stored only in the session (not persisted)
- HTTPS should be used in production

## 🔍 Troubleshooting

- Make sure your OAuth redirect URIs exactly match:
  - Google: `http://localhost:3000/auth/google/callback`
  - Facebook: `http://localhost:3000/auth/facebook/callback`
- Ensure your `.env` file has the correct credentials for both providers
- Check the console for any error messages
- Verify that your projects have the necessary APIs/products enabled:
  - Google: Google+ API or Google Identity API
  - Facebook: Facebook Login product
