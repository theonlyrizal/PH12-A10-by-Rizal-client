# 🍴 Foodie Space - Local Food Lovers Network

A full-stack MERN application connecting food enthusiasts to share authentic food experiences, discover local restaurants, and build a community around great food.

**Live Site:** [Your Live URL Here]

## ✨ Key Features

- **Share Food Reviews** - Post authentic reviews with photos, ratings, and detailed descriptions of your favorite local meals
- **Discover Local Gems** - Browse reviews from other food lovers to find hidden gems and authentic local restaurants in your area
- **Personalized Favorites** - Save your favorite reviews and build a curated collection of must-try foods and restaurants
- **Real-time Community** - Connect with other food enthusiasts, see what others are enjoying, and get honest recommendations from real people
- **Responsive Design** - Seamless experience across all devices - mobile, tablet, and desktop with beautiful, intuitive user interface

## 🛠️ Tech Stack

**Frontend:**

- React 19 + Vite
- Tailwind CSS + DaisyUI
- Firebase Authentication
- React Router 7
- Axios for API calls
- React Icons
- React Toastify for notifications

**Backend:**

- Node.js + Express
- MongoDB with Mongoose
- Firebase Admin SDK
- JWT Token Verification

## 📋 Core Features

### Authentication

- Email/Password Registration with password validation
- Google OAuth Login
- Protected Routes
- Persistent user sessions

### Review Management

- Create detailed food reviews with images
- Edit your own reviews
- Delete your own reviews
- View all reviews sorted by date
- Detailed review pages

### Favorites System

- Mark reviews as favorites
- View all favorite reviews
- Remove from favorites

### Search & Filter

- Search reviews by food name using MongoDB $regex
- Sort reviews by date (newest first)

## 📱 Pages

1. **Home** - Hero section, featured reviews, and community highlights
2. **All Reviews** - Browse all reviews with search functionality
3. **My Reviews** - Manage your posted reviews in table format
4. **My Favorites** - View and manage your favorite reviews
5. **Add Review** - Create new food reviews
6. **Edit Review** - Update existing reviews
7. **Authentication** - Login and Register pages
8. **404 Page** - Error handling for invalid routes

## 🔒 Security Features

- Firebase Authentication for user management
- Token-based API authorization
- User-specific data access control
- Secure password validation on registration

## 📈 Project Statistics

- 15+ commits on client-side
- 8+ commits on server-side
- Fully responsive design
- Zero external dependencies for styling (pure Tailwind)
- No errors on route reload

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB account
- Firebase project setup

### Installation

**Client Side:**

```bash
cd foodiespace
npm install
npm run dev
```

**Server Side:**

```bash
npm install
npm start
```

## 📝 Environment Variables

### Client (.env)

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_BASE_URL=http://localhost:5050
```

### Server (.env)

```
PORT=5050
DB_USER=
DB_PASS=
```

## 👨‍💻 Author

**Your Name** - Local Food Lovers Network Developer

## 📄 License

This project is open source and available under the MIT License.

---

**Build with ❤️ for food lovers everywhere**
