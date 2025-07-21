# 🔐 Social Login Test App

A simple Node.js/Express application for testing Google OAuth login integration.

## 🚀 Quick Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Google OAuth:**
   - Go to [Google Developers Console](https://console.developers.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API (or Google Identity API)
   - Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
   - Set application type to **"Web application"**
   - Add authorized redirect URI: `http://localhost:3000/auth/google/callback`
   - Copy your Client ID and Client Secret

3. **Configure environment variables:**
   ```bash
   copy .env.example .env
   ```
   Edit `.env` and add your Google OAuth credentials:
   ```
   GOOGLE_CLIENT_ID=your_actual_client_id
   GOOGLE_CLIENT_SECRET=your_actual_client_secret
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
   - Click "Login with Google"
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
- ✅ Session management
- ✅ Protected routes
- ✅ User profile display
- ✅ Logout functionality
- ✅ Simple HTML interface
- ✅ Error handling

## 🛠️ Technology Stack

- **Backend:** Node.js + Express
- **Authentication:** Passport.js with Google OAuth 2.0
- **Sessions:** express-session
- **Environment:** dotenv

## 📝 Notes

- This is a minimal MVP for testing purposes
- In production, you'd want to add a database, proper error handling, and security measures
- The user data is stored only in the session (not persisted)
- HTTPS should be used in production

## 🔍 Troubleshooting

- Make sure your Google OAuth redirect URI exactly matches: `http://localhost:3000/auth/google/callback`
- Ensure your `.env` file has the correct credentials
- Check the console for any error messages
- Verify that your Google project has the necessary APIs enabled
