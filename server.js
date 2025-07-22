const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-for-testing',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  // In a real app, you'd save user to database here
  console.log('Google Profile:', profile);
  profile.provider = 'google'; // Add provider info
  return done(null, profile);
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, done) => {
  // In a real app, you'd save user to database here
  console.log('Facebook Profile:', profile);
  profile.provider = 'facebook'; // Add provider info
  return done(null, profile);
}));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

// Routes
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Social Login Test</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
          .login-btn { 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 5px; 
            display: inline-block;
            margin: 10px 5px;
            font-weight: bold;
          }
          .google-btn { background: #4285f4; }
          .google-btn:hover { background: #357ae8; }
          .facebook-btn { background: #1877f2; }
          .facebook-btn:hover { background: #166fe5; }
          .login-container { text-align: center; margin: 30px 0; }
        </style>
      </head>
      <body>
        <h1>🔐 Social Login Test App</h1>
        <p>This is a simple test application for social OAuth login.</p>
        <div class="login-container">
          <a href="/auth/google" class="login-btn google-btn">🔑 Login with Google</a>
          <a href="/auth/facebook" class="login-btn facebook-btn">📘 Login with Facebook</a>
        </div>
        <div style="margin-top: 40px; padding: 20px; background: #f5f5f5; border-radius: 5px;">
          <h3>Setup Instructions:</h3>
          <ol>
            <li>Copy <code>.env.example</code> to <code>.env</code></li>
            <li>Get OAuth credentials from:
              <ul>
                <li><strong>Google:</strong> <a href="https://console.developers.google.com/" target="_blank">Google Developers Console</a></li>
                <li><strong>Facebook:</strong> <a href="https://developers.facebook.com/" target="_blank">Facebook Developers</a></li>
              </ul>
            </li>
            <li>Add your credentials to the <code>.env</code> file</li>
            <li>Restart the server</li>
          </ol>
        </div>
      </body>
      </html>
    `);
  }
});

// Google OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/dashboard');
  }
);

// Facebook OAuth routes
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/dashboard');
  }
);

// Protected dashboard route
app.get('/dashboard', isAuthenticated, (req, res) => {
  const user = req.user;
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Dashboard - Social Login Test</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        .profile-card { 
          background: #f9f9f9; 
          padding: 20px; 
          border-radius: 10px; 
          margin: 20px 0; 
        }
        .profile-img { 
          width: 80px; 
          height: 80px; 
          border-radius: 50%; 
          margin-right: 20px; 
          vertical-align: middle;
        }
        .logout-btn { 
          background: #dc3545; 
          color: white; 
          padding: 10px 20px; 
          text-decoration: none; 
          border-radius: 5px; 
          display: inline-block;
          margin-top: 20px;
        }
        .logout-btn:hover { background: #c82333; }
        .user-info { display: inline-block; vertical-align: middle; }
      </style>
    </head>
    <body>
      <h1>✅ Welcome to your Dashboard!</h1>
      <p>You have successfully logged in with ${user.provider ? user.provider.charAt(0).toUpperCase() + user.provider.slice(1) : 'a social provider'}!</p>
      
      <div class="profile-card">
        <h3>👤 Your Profile Information:</h3>
        <img src="${user.photos?.[0]?.value || ''}" alt="Profile" class="profile-img">
        <div class="user-info">
          <p><strong>Name:</strong> ${user.displayName}</p>
          <p><strong>Email:</strong> ${user.emails?.[0]?.value || 'Not provided'}</p>
          <p><strong>Provider:</strong> ${user.provider ? user.provider.charAt(0).toUpperCase() + user.provider.slice(1) : 'Unknown'}</p>
          <p><strong>ID:</strong> ${user.id}</p>
        </div>
      </div>
      
      <a href="/logout" class="logout-btn">🚪 Logout</a>
      
      <div style="margin-top: 40px; padding: 15px; background: #e8f5e8; border-radius: 5px;">
        <h4>🎉 Success!</h4>
        <p>Your social OAuth integration is working correctly. In a real application, you would:</p>
        <ul>
          <li>Save user data to a database</li>
          <li>Create user sessions</li>
          <li>Implement proper error handling</li>
          <li>Add more social login providers</li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send(`
    <h1>Something went wrong!</h1>
    <p>Error: ${err.message}</p>
    <a href="/">Go back home</a>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📝 Make sure to set up your .env file with Google OAuth credentials!');
});
