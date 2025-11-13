import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://foodiespaceonline.web.app',
});

const useAxios = () => axiosInstance;

export default useAxios;
