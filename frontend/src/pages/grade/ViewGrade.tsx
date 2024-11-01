import React, { useState } from 'react';
import { Box, Button, Card, Divider, TextField } from '@mui/material';
import { useRouting } from '../../utils/routing';
import { ArrowBackIos } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid2';
import useFetchData from '../../hooks/useFetchData';
import { useParams } from 'react-router-dom';
import DeleteModal from '../../component/ui/deleteModal';
import useDelete from '../../hooks/useDelete';
import { useSnackbar } from '../../context/SnackBarProvider';

export const ViewGrade = () => {
  const { id } = useParams();
  const { goTo } = useRouting();
  const { data: grade } = useFetchData(`/grade/${id}`);
  const { deleteById } = useDelete();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { showMessage } = useSnackbar();

  const handleDelete = async () => {
    try {
      await deleteById('/grade', id);
      showMessage('Grade deleted successfully!');
      goTo('/grade');
    } catch (error) {
      showMessage('Failed to delete the grade.', 'error');
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
            onClick={() => goTo(`/grade/edit/${id}`)}
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
            onClick={() => goTo('/grade')}
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
              label="Grade"
              value={grade?.grade || ''}
              fullWidth
              margin="normal"
              disabled
              variant="standard"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Associated Courses"
              value={
                grade?.course?.length
                  ? grade.course.map((course) => course.name).join(', ')
                  : 'No associated course found.'
              }
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
