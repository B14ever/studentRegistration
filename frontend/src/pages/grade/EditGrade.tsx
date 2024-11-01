import React, { useEffect, useState } from 'react'; 
import { Box, Button, Card, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput, TextField, Divider } from '@mui/material';
import { useRouting } from '../../utils/routing';
import { ArrowBackIos } from '@mui/icons-material';

import useFetchData from '../../hooks/useFetchData';
import { useParams } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';
import { useSnackbar } from '../../context/SnackBarProvider';
import useUpdate from '../../hooks/useUpdate';

interface Course {
  _id: string;
  name: string;
}

export const EditGrade = () => {
  const { id } = useParams<{ id: string }>();
  const { goTo } = useRouting();
  const { data: grade } = useFetchData(`/grade/${id}`);
  const { data: courses } = useFetchData<Course[]>('/course');
  const { updateById } = useUpdate();
  const { showMessage } = useSnackbar();

  const [gradeValue, setGradeValue] = useState('');
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [gradeError, setGradeError] = useState('');

  useEffect(() => {
    if (grade) {
      setGradeValue(grade.grade);
      setSelectedCourseIds(grade.course.map((course: Course) => course._id));
    }
  }, [grade]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!gradeValue) {
      setGradeError('Grade is required');
      return;
    }
    
    setGradeError('');

    const updatedCourses = grade.course.filter((course: Course) =>
      selectedCourseIds.includes(course._id)
    );

    try {
      await updateById(`/grade`, id, { grade: gradeValue, course: updatedCourses });
      showMessage('Grade updated successfully', 'success');
      goTo('/grade');
    } catch {
      showMessage('Failed to update grade', 'error');
    }
  };

  const handleCourseChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedCourseIds(event.target.value as string[]);
  };

  const handleGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGradeValue(event.target.value);
    setGradeError('');
  };

  return (
    <Box>
      <Button variant='contained' startIcon={<ArrowBackIos />} onClick={() => goTo('/grade')}>Back</Button>
      <Divider sx={{ mt: 2 }} />
      <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card sx={{ mt: 10, paddingY: 6, px: 1, width: { xs: '100%', sm: '60%', md: '45%' } }}>
          <TextField
            error={Boolean(gradeError)}
            value={gradeValue}
            onChange={handleGradeChange}
            label="Enter Grade"
            helperText={gradeError}
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="course-select-label">Select Courses</InputLabel>
            <Select
              labelId="course-select-label"
              multiple
              value={selectedCourseIds}
              onChange={handleCourseChange}
              input={<OutlinedInput label="Select Courses" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {selected.map((id) => (
                    <Chip key={id} label={courses?.items.find(course => course._id === id)?.name} sx={{ m: 0.5 }} />
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
