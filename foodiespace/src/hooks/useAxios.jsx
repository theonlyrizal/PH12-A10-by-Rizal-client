import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PORT || 'https://foodiespace-server.vercel.app/',
});

const useAxios = () => axiosInstance;

export default useAxios;
