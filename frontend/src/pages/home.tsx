import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/Subject';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';

const Home = () => {
  const navigate = useNavigate();
  const { data: students, } = useFetchData('/student');
  const { data: courses, } = useFetchData('/course');
  const { data: grades,} = useFetchData('/grade');
  
  const GridComponent = ({ title, Icon, count, link }) => {
    return (
      <Grid size={{ xs: 12, md: 4 }}>
        <Box
          onClick={() => navigate(link)}
          sx={{ cursor: 'pointer' }}
        >
          <Card>
            <Box p={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Icon sx={{ mr: 1 }} />
                <Typography variant="h5">{title}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Total</Typography>
                <Typography>{count}</Typography>
              </Box>
            </Box>
          </Card>
        </Box>
      </Grid>
    );
  };

  return (
    <Grid container spacing={2}>
      <GridComponent title="Students" Icon={SwitchAccountIcon} count={students?.items?.length || 0} link="/student" />
      <GridComponent title="Courses" Icon={SubjectIcon} count={courses?.items?.length || 0} link="/course" />
      <GridComponent title="Grades" Icon={ClassIcon} count={grades?.items?.length || 0} link="/grade" />
    </Grid>
  );
};

export default Home;
