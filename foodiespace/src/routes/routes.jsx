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
        element: (
          <PrivateRoute>
            <ReviewDetails />
          </PrivateRoute>
        ),
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
