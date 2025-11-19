# FoodieSpace — Local Food Lovers Network (Client)

Brief client-side repository for the FoodieSpace project — a community-driven MERN app where users share food reviews, rate dishes, save favorites, and discover local restaurants.

Live site: https://YOUR_CLIENT_LIVE_URL_HERE


## Overview

- Community platform to post and browse food reviews with images and star ratings.
- Users sign up or sign in with Firebase (Email/Password + Google), create reviews, edit/delete their own reviews, and mark favorites.

## Tech Stack

- React 19 + Vite
- Tailwind CSS + DaisyUI
- Firebase Authentication (client)
- Axios for API requests
- React Router for SPA navigation
- React Toastify + SweetAlert2 for notifications and confirmations

## Main Features

- User registration & login (Email/Password + Google)
- Add, edit, delete reviews (protected)
- All Reviews page (public) with search
- My Reviews (protected) — table with Edit/Delete actions
- Favorite system (heart button & My Favorites page)
- Featured top-rated reviews on Home
- 404 page and loading states

## Dependencies (client)

See `foodiespace/package.json` — key dependencies:

- react, react-dom
- vite
- tailwindcss, daisyui
- firebase
- axios
- react-router
- react-toastify
- sweetalert2
- swiper

## Run locally

Prerequisites:

- Node.js (v16+ recommended)
- A running instance of the server (see server README)

Steps:

1. Install client dependencies

```powershell
cd PH12-A10-by-Rizal-client/foodiespace
npm install
```

2. Configure environment

- Copy `.env.example` (if present) to `.env` and add your Firebase config and the API base URL (server).

3. Run dev server

```powershell
npm run dev
```

4. Open the app

- Navigate to `http://localhost:5173` (Vite default) and test features.

## Server

Server source lives in the sibling folder `PH12-A10-by-Rizal-server`.

Quick server run (from repository root):

```powershell
cd ..\PH12-A10-by-Rizal-server
npm install
node index.js
```

## Live Links

- Client (live): https://YOUR_CLIENT_LIVE_URL_HERE
- Server (API): https://YOUR_SERVER_URL_HERE
- (Add Firebase authorized domain for your client live URL in the Firebase console)

## Notes & Checklist Before Submission

- Ensure Firebase Authorized Domains includes the deployed client domain.
- Verify both client and server are deployed and the API URL in client `.env` points to the deployed server.
- Confirm at least 15 client commits and 8 server commits exist on the respective repos.

## Contributing

If you'd like to contribute or test, open an issue or submit a PR to the client or server folder. Keep commits small and descriptive.

## License

This project is created for learning/assignment purposes.
