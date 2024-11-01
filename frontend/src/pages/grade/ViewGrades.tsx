import { useState } from 'react';
import ViewAllLayout from '../../component/layout/ViewAllLayout';
import useFetchData from '../../hooks/useFetchData';

interface Grade {
  _id: string;
  studentName: string; 
  score: number; 
  createdAt: Date; 
}

export const ViewGrades = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); 
  const { data: grades } = useFetchData<{ items: Grade[]; totalCount: number }>('/grade', page, limit);

  return (
    <ViewAllLayout 
      data={grades} 
      currentPage={page} 
      setPage={setPage} 
      setLimit={setLimit} 
    />
  );
};

