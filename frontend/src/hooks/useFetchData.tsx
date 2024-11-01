import { useState, useEffect } from 'react';
import axiosInstance from '../api/api';
import { AxiosError } from 'axios';
import { useLoading } from '../context/loadingContext';

interface UseFetchData<T> {
  data: T | null;
  error: string | null;
}

const useFetchData = <T,>(
  endpoint: string,
  page: number = 1, 
  limit?: number,   
  id?: string | number
): UseFetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const { setLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
       
        const url = id ? `${endpoint}/${id}` : `${endpoint}?page=${page}${limit ? `&limit=${limit}` : ''}`;
        const response = await axiosInstance.get<T>(url);
        setData(response.data);
        setError(null);
      } catch (err) {
        if (err instanceof AxiosError && err.response) {
          setError(err.response.data || err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, id, page, limit]);

  return { data, error };
};

export default useFetchData;
