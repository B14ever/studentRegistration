import React, { useState } from 'react';
import ViewAllLayout from '../../component/layout/ViewAllLayout';
import useFetchData from '../../hooks/useFetchData';

interface Student {
  _id: string;
  name: string;
  fatherName: string;
  grandfatherName: string;
  birthdate: Date;
  age: number;
  gender: string;
  
}

export const ViewStudents = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); 
  const { data: students, error, loading } = useFetchData<{ items: Student[]; totalCount: number }>('/student', page, limit);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching students: {error.message}</div>;

  return (
    <ViewAllLayout 
      data={students} 
      currentPage={page} 
      setPage={setPage} 
      setLimit={setLimit} 
    />
  );
}
