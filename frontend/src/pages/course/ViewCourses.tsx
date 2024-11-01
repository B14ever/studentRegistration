import { useState } from 'react';
import ViewAllLayout from '../../component/layout/ViewAllLayout';
import useFetchData from '../../hooks/useFetchData';

interface Course {
  _id: string;
  name: string;
  createdAt: Date;
}

export const ViewCourses = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // State for dynamic rows per page
  const { data: courses } = useFetchData<{ items: Course[]; totalCount: number }>('/course', page, limit);

  return (
    <ViewAllLayout 
      data={courses} 
      currentPage={page} 
      setPage={setPage} 
      setLimit={setLimit} // Pass setLimit to allow changing rows per page
    />
  );
};
