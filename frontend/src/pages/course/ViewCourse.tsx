import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Divider, TextField } from '@mui/material';
import { useRouting } from '../../utils/routing';
import { ArrowBackIos } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import DeleteModal from '../../component/ui/deleteModal';
import useDelete from '../../hooks/useDelete';
import { useSnackbar } from '../../context/SnackBarProvider';

export const ViewCourse = () => {
  const { id } = useParams<{ id: string }>();
  const { goTo } = useRouting();
  const { data: course } = useFetchData(`/course/${id}`);
  const { deleteById } = useDelete();
  const { showMessage } = useSnackbar();

  const [courseName, setCourseName] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    if (course) {
      setCourseName(course.name);
    }
  }, [course]);

  const handleDelete = async () => {
    try {
      await deleteById('/course', id);
      showMessage('Course deleted successfully!');
      goTo('/course');
    } catch {
      showMessage('Failed to delete the course.', 'error');
    }
    setOpenDeleteModal(false);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={6} sx={{ display: 'flex', flexWrap: 'nowrap' }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => goTo(`/course/edit/${id}`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ ml: 2 }}
            startIcon={<DeleteIcon />}
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete
          </Button>
        </Grid>
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
      <Card sx={{ mt: 2, padding: 2 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              label="Course Name"
              value={courseName}
              fullWidth
              margin="normal"
              disabled
              variant="standard"
            />
          </Grid>
        </Grid>
      </Card>
      
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        action={handleDelete}
      />
    </Box>
  );
};
