import React, { useState } from 'react';
import { Box, Button, Card, Divider, Tabs, Tab, TextField, Container } from '@mui/material';
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

export const ViewStudent = () => {
  const { id } = useParams(); 
  const { goTo } = useRouting();
  const { data: student } = useFetchData(`/student/${id}`); 
  const { deleteById } = useDelete(); 
  const [value, setValue] = useState(0); 
  const [openDeleteModal, setOpenDeleteModal] = useState(false); 
  const { showMessage } = useSnackbar();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDelete = async () => {
    try {
      await deleteById('/student',id);
      showMessage('Student deleted successfully!'); 
      goTo('/student');
    } catch (error) {
      showMessage('Failed to delete the student.','error'); 
    }
    setOpenDeleteModal(false); 
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={6} sx={{display:'flex',flexWrap:'nowrap'}}>
          <Button 
            variant="contained" 
            startIcon={<EditIcon />} 
            onClick={() => goTo(`/student/edit/${id}`)}
          >
            Edit
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            sx={{ ml: 2 }} 
            startIcon={<DeleteIcon />}
            onClick={() => setOpenDeleteModal(true)} // Open the delete modal
          >
            Delete
          </Button>
        </Grid>
        <Grid size={6}>
          <Button 
            variant="contained" 
            startIcon={<ArrowBackIos />} 
            onClick={() => goTo('/student')} 
            sx={{ float: 'right' }}
          >
            Back
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />
      <Container sx={{ width: '100%', backgroundColor: '#fff', borderRadius: 4, p: 5, mt: 2 }}>
        <Tabs value={value} onChange={handleChange} sx={{ mt: 2 }}>
          <Tab label="Student Details" />
          <Tab label="Address" />
          <Tab label="Emergency Contact" />
        </Tabs>

        {value === 0 && (
          <Box sx={{ mt: 2, padding: 2 }}>
            <Grid container spacing={2}>
              <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <img
                  src={student?.photo || ''}
                  alt='SP'
                  style={{ width: 100, height: 100, borderRadius: '50%' }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Name"
                  value={student?.name || ''}
                  fullWidth
                  margin="normal"
                  disabled
                  variant="standard"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Father's Name"
                  value={student?.fatherName || ''}
                  fullWidth
                  margin="normal"
                  disabled
                  variant="standard"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Grandfather's Name"
                  value={student?.grandfatherName || ''}
                  fullWidth
                  margin="normal"
                  disabled
                  variant="standard"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Birthdate"
                  variant="standard"
                  value={new Date(student?.birthdate).toLocaleDateString() || ''}
                  fullWidth
                  margin="normal"
                  disabled
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Gender"
                  variant="standard"
                  value={student?.gender || ''}
                  fullWidth
                  margin="normal"
                  disabled
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <TextField
                  label="Grade"
                  variant="standard"
                  value={student?.grades?.grade || ''}
                  fullWidth
                  margin="normal"
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {value === 1 && (
          <Box component={Card} sx={{ mt: 2, padding: 2 }}>
            <Grid container spacing={2}>
              <Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                  label="Kebele"
                  variant="standard"
                  value={student?.address.kebele || ''}
                  fullWidth
                  margin="normal"
                  disabled
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Wereda"
                  variant="standard"
                  value={student?.address.wereda || ''}
                  fullWidth
                  margin="normal"
                  disabled
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="City"
                  variant="standard"
                  value={student?.address.city || ''}
                  fullWidth
                  margin="normal"
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {value === 2 && (
          <Box component={Card} sx={{ mt: 2, padding: 2 }}>
            <Grid container spacing={2}>
              <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <img
                  src={student?.emergencyContactPhoto}
                  alt="EC"
                  style={{ width: 100, height: 100, borderRadius: '50%' }}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Contact Name"
                  variant="standard"
                  value={student?.emergencyContactName || ''}
                  fullWidth
                  margin="normal"
                  disabled
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Relation"
                  variant="standard"
                  value={student?.emergencyContactRelation || ''}
                  fullWidth
                  margin="normal"
                  disabled
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  variant="standard"
                  label="Phone"
                  value={student?.emergencyContactPhone || ''}
                  fullWidth
                  margin="normal"
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>

      {/* Delete Modal Integration */}
      <DeleteModal 
        open={openDeleteModal} 
        setOpen={setOpenDeleteModal} 
        action={handleDelete} 
      />
    </Box>
  );
};
