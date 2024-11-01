import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Divider, TextField } from '@mui/material';
import { useRouting } from '../../utils/routing';
import { ArrowBackIos } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import useUpdate from '../../hooks/useUpdate';
import { useSnackbar } from '../../context/SnackBarProvider';

export const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const { goTo } = useRouting();
  const { data: course } = useFetchData(`/course/${id}`);
  const { updateById } = useUpdate();
  const { showMessage } = useSnackbar();

  const [courseName, setCourseName] = useState('');
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    if (course) {
      setCourseName(course.name);
    }
  }, [course]);

  const handleCourseNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseName(e.target.value);
    setNameError('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!courseName) {
      setNameError('Course name is required');
      return;
    }

    try {
      await updateById(`/course`, id, { name: courseName });
      showMessage('Course updated successfully', 'success');
      goTo('/course');
    } catch {
      showMessage('Failed to update course', 'error');
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={6} />
        <Grid size={6}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIos />}
            onClick={() => goTo('/course')}
            sx={{ float: 'right' }}
          >
            Back
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card sx={{ mt: 10, paddingY: 6, px: 1, width: { xs: '100%', sm: '60%', md: '45%' } }}>
          <TextField
            error={Boolean(nameError)}
            value={courseName}
            onChange={handleCourseNameChange}
            label="Enter Course Name"
            helperText={nameError}
            fullWidth
            margin="normal"
            
          />
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ width: { xs: '100%', sm: '60%', md: '45%' } }}>
              Save
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};
