import axiosInstance from '../api/api'; 
import axios from 'axios';
import { useLoading } from '../context/loadingContext';

const useUpdate = <T>() => {
  const { setLoading } = useLoading(); 

  const updateById = async (url: string, id: string, data: T) => {
    setLoading(true); 
    try {
      const response = await axiosInstance.put<T>(`${url}/${id}`, data);
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

  return { updateById }; 
};

export default useUpdate;
