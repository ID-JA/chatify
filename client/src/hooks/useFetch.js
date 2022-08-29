import { useEffect, useState } from 'react';
import axiosInstance from '../axios';

export default (endpoint) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`${endpoint}`);
      setData(res.data);
    } catch (e) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => getData, [endpoint]);

  return { data, isLoading, error };
};
