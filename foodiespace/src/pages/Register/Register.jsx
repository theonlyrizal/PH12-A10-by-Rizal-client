import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import SectionBody from '../../wrappers/SectionBody';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaArrowRight, FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const axiosInstance = useAxios();
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

  const navigate = useNavigate();
  const location = useLocation();

  const [sixChar, setSixChar] = useState(false);
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const validatePass = (e) => {
    const pass = e.target.value;
    pass.length >= 6 ? setSixChar(true) : setSixChar(false);
    /[A-Z]/.test(pass) ? setUpper(true) : setUpper(false);
    /[a-z]/.test(pass) ? setLower(true) : setLower(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    setSuccess(false);
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      await createUser(email, password);
      await updateUserProfile(name, photo);

      //make user
      const newUser = {
        name,
        email,
        photoURL: photo,
        createdAt: new Date(),
        favorites: [],
      };
      //send to mongoDb
      const res = await axiosInstance.post('/users', newUser);
      console.log('data after user save:', res.data);

      setSuccess(true);
      e.target.reset();
      navigate(location.state || '/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        console.log(result.user);

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
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
      });
  };

  return (
    <SectionBody>
      <form onSubmit={handleRegister}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="text-3xl text-primary font-bold">Register</legend>
          <label className="label">Name</label>{' '}
          <input name="name" type="text" className="input" placeholder="John Marston" required />
          <label className="label">Photo URL</label>{' '}
          <input
            name="photo"
            type="text"
            className="input"
            placeholder="Leave blank for default image"
          />
          <label className="label">Email</label>{' '}
          <input
            name="email"
            type="email"
            className="input"
            placeholder="email@example.com"
            required
          />
          <label className="label">Password</label>
          <div className="relative">
            <input
              onChange={validatePass}
              name="password"
              type={showPassword ? 'text' : 'password'} // ← toggle works now
              className="input pr-10" // make room for button
              placeholder="*******"
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
          <div>
            <ul>
              <li className={`${sixChar ? 'text-accent' : 'text-red-500'} flex items-center `}>
                <FaArrowRight /> 6 character long
              </li>
              <li className={`${upper ? 'text-accent' : 'text-red-500'} flex items-center `}>
                <FaArrowRight /> At least one Upper Case
              </li>
              <li className={`${lower ? 'text-accent' : 'text-red-500'} flex items-center `}>
                <FaArrowRight /> At least one Lower Case
              </li>
            </ul>
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={sixChar && upper && lower ? false : true}
          >
            Register
          </button>
          <div className="divider my-1"></div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-primary"
          >
            <FaGoogle /> <p>Sign Up with Google</p>{' '}
          </button>{' '}
        </fieldset>
      </form>{' '}
      <Link className={`text-blue-400 underline`} to="/login">
        Already have an account?
      </Link>{' '}
    </SectionBody>
  );
};

export default Register;
