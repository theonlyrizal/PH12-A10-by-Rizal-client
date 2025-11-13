import { Outlet, useNavigation } from 'react-router';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { ToastContainer, Zoom } from 'react-toastify';

function App() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div>
      <Navbar />
      <div className="h-20"></div>

      <div className="flex justify-center items-center min-h-screen">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <span className="loading loading-spinner loading-xl text-primary"></span>
          </div>
        ) : (
          <Outlet />
        )}
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
      <Footer />
    </div>
  );
}

export default App;
