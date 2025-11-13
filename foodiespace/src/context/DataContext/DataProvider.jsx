import React, { useEffect, useState } from 'react';
import { DataContext } from './DataContext';
import useAxios from '../../hooks/useAxios';

const DataProvider = ({ children }) => {
  const axiosInstance = useAxios();
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get('/reviews');
        setReviewsData(response.data);
      } catch (error) {
        console.error('Failed to fetch Data', error);
      }
    };

    fetchReviews();
  }, [axiosInstance]);

  // console.log(reviewsData);

  return (
    <DataContext.Provider value={{ reviewsData, setReviewsData }}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
