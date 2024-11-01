import axiosInstance from '../api/api';
import axios from 'axios';
import { useLoading } from '../context/loadingContext';

const useDelete = () => {
  const { setLoading } = useLoading();

  const deleteById = async (url: string, id: string | number) => {
    setLoading(true);

    try {
      await axiosInstance.delete(`${url}/${id}`); 
      return true; 
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

  return { deleteById };
};

export default useDelete;
