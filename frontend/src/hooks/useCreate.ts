import axiosInstance from '../api/api';
import axios  from 'axios';
import { useLoading } from '../context/loadingContext';

const useCreate = <T>() => {
  const {setLoading} = useLoading()


  const create = async (url: string, data: T) => {
    setLoading(true);

    try {
      const response = await axiosInstance.post<T>(url, data);
      return response.data; 
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data?.message || err.message);
      } else {
        throw new Error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { create, };
};

export default useCreate;
