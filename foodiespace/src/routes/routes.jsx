import { createBrowserRouter } from 'react-router';
import App from '../App';
import Home from '../pages/Home/Home';
import AllReviews from '../pages/AllReviews/AllReviews';
import AddReview from '../pages/AddReview/AddReview';
import EditReview from '../pages/EditReview/EditReview';
import Login from '../pages/LogIn/Login';
import Register from '../pages/Register/Register';
import MyReviews from '../pages/MyReviews/MyReviews';
import MyFavorites from '../pages/MyFavorites/MyFavorites';
import NotFound from '../pages/NotFound/NotFound';
import PrivateRoute from './PrivateRoute';
import ReviewDetails from '../pages/ReviewDetails/ReviewDetails';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import FAQ from '../pages/FAQ/FAQ';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService/TermsOfService';
import DashboardLayout from '../pages/Dashboard/DashboardLayout';
import DashboardOverview from '../pages/Dashboard/DashboardOverview';
import UserProfile from '../pages/Dashboard/UserProfile';
import AdminRoute from './AdminRoute';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import ReviewApproval from '../pages/Admin/ReviewApproval';
import AllReviewsAdmin from '../pages/Admin/AllReviews';
import UserManagement from '../pages/Admin/UserManagement';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/all-reviews',
        element: <AllReviews />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/faq',
        element: <FAQ />,
      },
      {
        path: '/privacy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/terms',
        element: <TermsOfService />,
      },
      {
        path: '/my-reviews',
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-favorites',
        element: (
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        ),
      },
      {
        path: '/add-review',
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        ),
      },
      {
        path: '/reviews/:id',
        element: <ReviewDetails />, // Now publicly accessible
      },
      {
        path: '/edit-review/:id',
        element: (
          <PrivateRoute>
            <EditReview />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardOverview />,
          },
          {
            path: 'profile',
            element: <UserProfile />,
          },
        ],
      },
      {
        path: '/admin',
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
        children: [
          {
            index: true,
            element: <div>Overview Stats (Coming Soon)</div>,
          },
          {
            path: 'pending-reviews',
            element: <ReviewApproval />,
          },
          {
            path: 'all-reviews',
            element: <AllReviewsAdmin />,
          },
          {
            path: 'users',
            element: <UserManagement />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
