// AddCourse.tsx
import React, { useState } from 'react';
import { Box, Button, Card, Divider, TextField } from '@mui/material';
import useCreate from '../../hooks/useCreate';
import { useSnackbar } from '../../context/SnackBarProvider';
import { ArrowBackIos } from '@mui/icons-material';
import { useRouting } from '../../utils/routing';

export const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [nameError, setNameError] = useState('');
  const { create} = useCreate();
  const { showMessage } = useSnackbar();
  const { goTo } = useRouting();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!courseName) {
      setNameError('Course name is required');
      return;
    }
    setNameError('');

    try {
      await create('/course', { name: courseName });
      setCourseName('');
      showMessage('Course added successfully', 'success');
    } catch {
      showMessage('Failed to add course', 'error');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseName(e.target.value);
    setNameError('');
  };
  return (
    <Box>
    <Button variant='contained' startIcon={<ArrowBackIos/>} onClick={()=>goTo('/course')}>Back</Button>
    <Divider sx={{mt:2}}/>
    <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ mt: 10, paddingY: 6, px: 1, width: { xs: '100%', sm: '60%', md: '45%' } }}>
        <TextField
          error={Boolean(nameError)}
          value={courseName}
          onChange={handleChange}
          label="Enter Course Name"
          helperText={nameError}
          fullWidth
        />
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button type='submit' variant='contained' sx={{ width: { xs: '100%', sm: '60%', md: '45%' } }} >
             Save
          </Button>
        </Box>
      </Card>
    </Box>
    </Box>
  );
};
