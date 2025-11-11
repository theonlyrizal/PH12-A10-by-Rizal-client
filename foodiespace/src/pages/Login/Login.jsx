import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import SectionBody from '../../wrappers/SectionBody';
import { FaGoogle } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';

const Login = () => {
  const { signInUser, signInWithGoogle, user } = useContext(AuthContext);

  const axiosInstance = useAxios();

  const location = useLocation();
  const navigate = useNavigate();

  if (user) {
    navigate(location.state || '/');
  }

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success(`Login Successful!`);
      setSuccess(false);
    }
  }, [success]);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError('');
    setSuccess(false);

    signInUser(email, password)
      .then(() => {
        setSuccess(true);
        e.target.reset();
        navigate(location.state || '/');
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
      });
  };

  // const handlePassReset = (e) => {
  //   e.preventDefault();
  //   const email = e.currentTarget.form.elements.email.value;
  //   if (!email) {
  //     toast.error('Please enter your email address to reset the password.');
  //     return;
  //   }
  //   passReset(email)
  //     .then(() => {
  //       setTimeout(() => {
  //         window.open('https://mail.google.com', '_blank');
  //       }, 4000);
  //       toast.success(`A password reset mail has been sent to ${email}`);
  //       toast.warning(`You will soon be redirected to 'mail.google.com' `);
  //     })
  //     .catch((error) => toast.error(error.message));
  // };

  const handleGoogleSignIn = () => {
    setError('');
    setSuccess(false);
    signInWithGoogle()
      .then(async (result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          createdAt: new Date(),
          favorites: [],
        };

        try {
          const res = await axiosInstance.post('/users', newUser);
          console.log('data after user save:', res.data);
        } catch (err) {
          console.error('Error saving user:', err);
        }

        setSuccess(true);
        navigate(location.state || '/');
      })
      .catch((err) => setError(err.message.replace('Firebase: ', '')));
  };

  return (
    <SectionBody>
      <div className="flex flex-col justify-center items-center p-5">
        <h1 className="text-primary text-4xl font-bold">
          {location.state?.startsWith('/plants/') ? 'Login to view Plant' : 'Login'}
        </h1>
      </div>

      <form onSubmit={handleLogin}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="text-3xl text-primary font-bold">Login</legend>

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="email@example.com"
            required
          />

          <label className="label">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="input w-full pr-10"
              data-daisyui-password-toggle={false}
              placeholder="******"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Login
          </button>

          <button
            type="button"
            className="hover:cursor-pointer text-blue-400 underline w-full text-left mt-2"
            // onClick={handlePassReset}
          >
            Forgot password?
          </button>

          <div className="divider my-1"></div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-primary"
          >
            <FaGoogle /> <p>Log In with Google</p>
          </button>
        </fieldset>
      </form>

      <Link className="text-blue-400 underline" to="/register" state={location?.state}>
        Don't have an account?
      </Link>
    </SectionBody>
  );
};

export default Login;
