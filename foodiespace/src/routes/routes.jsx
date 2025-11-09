import { createBrowserRouter } from 'react-router';
import App from '../App';
import Home from '../pages/Home/Home';
import AllReviews from '../pages/AllReviews/AllReviews';
import AddReview from '../pages/AddReview/AddReview';
import Login from '../pages/LogIn/Login';
import Register from '../pages/Register/Register';
import MyReviews from '../pages/MyReviews/MyReviews';
import PrivateRoute from './PrivateRoute';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>Nope!</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/all-Reviews',
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
        path: '/add-review',
        element: (
          <PrivateRoute>
            <AddReview />
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
    ],
  },
]);
