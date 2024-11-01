import React, { useState } from 'react';
import { Box, Button, Card, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput, TextField, Divider } from '@mui/material';
import useCreate from '../../hooks/useCreate';
import { useSnackbar } from '../../context/SnackBarProvider';
import useFetchData from '../../hooks/useFetchData';
import { SelectChangeEvent } from '@mui/material/Select';
import { ArrowBackIos } from '@mui/icons-material';
import { useRouting } from '../../utils/routing';

interface Course {
  _id: string; 
  name: string;
}

export const AddGrade = () => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [grade, setGrade] = useState(''); 
  const [nameError, setNameError] = useState('');
  const [gradeError, setGradeError] = useState('');
  const { create } = useCreate();
  const { data: courses } = useFetchData<Course[]>('/course'); 
  const { showMessage } = useSnackbar();
  const { goTo } = useRouting();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (selectedCourses.length === 0) {
      setNameError('At least one course must be selected');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!grade) {
      setGradeError('Grade is required');
      hasError = true;
    } else {
      setGradeError('');
    }

    if (hasError) return; 

    try {
      await create('/grade', { course: selectedCourses, grade });
      setGrade('');
      setSelectedCourses([])
      showMessage('Grade added successfully', 'success');
    } catch {
      showMessage('Failed to add grade', 'error');
    }
  };

  const handleCourseChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedCourses(event.target.value as string[]);
    setNameError('');
  };

  const handleGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(event.target.value);
    setGradeError('');
  };

  return (
   <Box>
     <Button variant='contained' startIcon={<ArrowBackIos/>} onClick={()=>goTo('/grade')}>Back</Button>
     <Divider sx={{mt:2}}/>
     <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
     
     <Card sx={{ mt: 10, paddingY: 6, px: 1, width: { xs: '100%', sm: '60%', md: '45%' } }}>
     <TextField
         error={Boolean(gradeError)}
         value={grade}
         onChange={handleGradeChange}
         label="Enter Grade"
         helperText={gradeError}
         fullWidth
         sx={{ mb: 2 }} 
       />
       <FormControl fullWidth error={Boolean(nameError)} sx={{ mb: 2 }}>
         <InputLabel id="course-select-label">Select Courses</InputLabel>
         <Select
           labelId="course-select-label"
           multiple
           value={selectedCourses}
           onChange={handleCourseChange}
           input={<OutlinedInput label="Select Courses" />}
           renderValue={(selected) => (
             <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
               {selected.map((value) => (
                 <Chip key={value} label={courses?.items?.find(course => course._id === value)?.name} sx={{ m: 0.5 }} />
               ))}
             </Box>
           )}
         >
           {courses?.items?.map((course: Course) => ( 
             <MenuItem key={course._id} value={course._id}>
               {course.name}
             </MenuItem>
           ))}
         </Select>
         {nameError && <span>{nameError}</span>} 
       </FormControl>

      
       <Box sx={{ textAlign: 'center', mt: 2 }}>
         <Button type='submit' variant='contained' sx={{ width: { xs: '100%', sm: '60%', md: '45%' } }}>
           Save
         </Button>
       </Box>
     </Card>
   </Box>
   </Box>
  );
};
