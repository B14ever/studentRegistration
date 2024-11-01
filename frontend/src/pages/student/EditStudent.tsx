import React, { useState, useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Box,
  MenuItem,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  FormHelperText,
  Container,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import useFetchData from '../../hooks/useFetchData';
import useUpdate from '../../hooks/useUpdate';
import { useSnackbar } from '../../context/SnackBarProvider';
import { ArrowBackIos } from '@mui/icons-material';
import { useRouting } from '../../utils/routing';
import { useParams } from 'react-router-dom';


interface StudentInfo {
  photo: string;
  name: string;
  fatherName: string;
  grandfatherName: string;
  birthdate: string;
  gender: string;
  grade: string;
  address: {
    kebele: string;
    wereda: string;
    city: string;
  };
  emergencyContactName: string; 
  emergencyContactRelation: string; 
  emergencyContactPhone: string; 
  emergencyContactPhoto: string; 
}

interface Grade {
  _id: string;
  grade: string;
}

interface EditStudentProps {
  studentId: string;
}

export const EditStudent: React.FC<EditStudentProps> = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { data: grades } = useFetchData<Grade[]>('/grade'); 
  const { updateById } = useUpdate<StudentInfo>();
  const { showMessage } = useSnackbar();
  const { goTo } = useRouting();
  const { id } = useParams(); 
  const { data: studentData } = useFetchData<StudentInfo>(`/student/${id}`);
  
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    photo: '',
    name: '',
    fatherName: '',
    grandfatherName: '',
    birthdate: '',
    gender: '',
    grade: '',
    address: {
      kebele: '',
      wereda: '',
      city: '',
    },
    emergencyContactName: "", 
    emergencyContactRelation: "", 
    emergencyContactPhone: "", 
    emergencyContactPhoto: "", 
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const steps = ['Student Information', 'Address Information', 'Emergency Contact Information'];

  useEffect(() => {
    if (studentData) {
      setStudentInfo({
        ...studentData,
        birthdate: studentData.birthdate.slice(0, 10),
        address: studentData.address || {
          kebele: '',
          wereda: '',
          city: '',
        },
      });
    }
  }, [studentData]);

  const handleNext = () => {
    const newErrors: { [key: string]: string } = {};


    if (activeStep === 0) {
      if (!studentInfo.photo) newErrors.photo = 'Photo is required';
      if (!studentInfo.name) newErrors.name = 'Name is required';
      if (!studentInfo.fatherName) newErrors.fatherName = 'Father\'s name is required';
      if (!studentInfo.grandfatherName) newErrors.grandfatherName = 'Grandfather\'s name is required';
      if (!studentInfo.birthdate) newErrors.birthdate = 'Birthdate is required';
      if (!studentInfo.gender) newErrors.gender = 'Gender is required';
      if (!studentInfo.grades.grade) newErrors.grade = 'Grade is required';
    } else if (activeStep === 1) {
      if (!studentInfo.address.kebele) newErrors.kebele = 'Kebele is required';
      if (!studentInfo.address.wereda) newErrors.wereda = 'Wereda is required';
      if (!studentInfo.address.city) newErrors.city = 'City is required';
    } else if (activeStep === 2) {
      if (!studentInfo.emergencyContactPhoto) newErrors.photo = 'Photo is required';
      if (!studentInfo.emergencyContactName) newErrors.name = 'Contact name is required';
      if (!studentInfo.emergencyContactRelation) newErrors.relation = 'Relation is required';
      if (!studentInfo.emergencyContactPhone) newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (activeStep === steps.length - 1) {
        handleSubmit();
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleSubmit = async () => {
    try {
      const response = await updateById(`/student`, id, studentInfo);
      showMessage('Student updated successfully', 'success');
     
      setStudentInfo({
        ...response, 
        address: {
          ...response.address,
        },
      });
      
      setActiveStep(0);
    } catch (error) {
      showMessage('Failed to update student', 'error');
    }
  };
  

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { value: unknown }> ,
    section: 'student' | 'address' | 'emergency'
  ) => {
    const { name, value } = event.target;

    if (section === 'student') {
      setStudentInfo({ ...studentInfo, [name]: value });
    } else if (section === 'address') {
      setStudentInfo({ ...studentInfo, address: { ...studentInfo.address, [name]: value } });
    } else if (section === 'emergency') {
      setStudentInfo({ ...studentInfo, [name]: value });
    }

    setErrors({ ...errors, [name]: '' });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, section: 'student' | 'emergency') => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (section === 'student') {
        setStudentInfo({ ...studentInfo, photo: reader.result as string });
      } else if (section === 'emergency') {
        setStudentInfo({ ...studentInfo, emergencyContactPhoto: reader.result as string });
      }
    };
    if (file) {
      reader.readAsDataURL(file);
      setErrors({ ...errors, 'photo': '' });
    }
  };

  return (
    <Box> 
      <Button variant='contained' startIcon={<ArrowBackIos />} onClick={() => goTo('/student')}>Back</Button>
      <Divider sx={{ mt: 2 }} />
      <Container sx={{ width: '100%', backgroundColor: '#fff', borderRadius: 4, p: 5, mt: 1 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%' }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="h5">All steps completed - form submitted</Typography>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            {activeStep === 0 && (
              <Grid container spacing={2}>
                <Grid size={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      id="photo-upload"
                      onChange={(e) => handleFileUpload(e, 'student')}
                    />
                    <label htmlFor="photo-upload">
                      <Avatar
                        src={studentInfo.photo || undefined}
                        sx={{
                          width: 100,
                          height: 100,
                          cursor: 'pointer',
                          position: 'relative',
                        }}
                      />
                    </label>
                    {errors.photo && <Typography color="error">{errors.photo}</Typography>}
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Name"
                    name="name"
                    value={studentInfo.name}
                    onChange={(e) => handleChange(e, 'student')}
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Father's Name"
                    name="fatherName"
                    value={studentInfo.fatherName}
                    onChange={(e) => handleChange(e, 'student')}
                    fullWidth
                    margin="normal"
                    error={!!errors.fatherName}
                    helperText={errors.fatherName}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Grandfather's Name"
                    name="grandfatherName"
                    value={studentInfo.grandfatherName}
                    onChange={(e) => handleChange(e, 'student')}
                    fullWidth
                    margin="normal"
                    error={!!errors.grandfatherName}
                    helperText={errors.grandfatherName}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Birthdate"
                    name="birthdate"
                    type="date"
                    value={studentInfo.birthdate}
                    onChange={(e) => handleChange(e, 'student')}
                    fullWidth
                    margin="normal"
                    error={!!errors.birthdate}
                    helperText={errors.birthdate}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <FormControl fullWidth margin="normal" error={!!errors.gender}>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      name="gender"
                      value={studentInfo.gender}
                      onChange={(e) => handleChange(e, 'student')}
                      input={<OutlinedInput label="Gender" />}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                     
                    </Select>
                    <FormHelperText>{errors.gender}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={12}>
                <FormControl fullWidth error={!!errors.grade}>
                  <InputLabel id="grade-label">Grade</InputLabel>
                  <Select
                    labelId="grade-label"
                    name="grade"
                    value={studentInfo.grades?._id || ''} 
                    onChange={(e) => setStudentInfo({ 
                      ...studentInfo, 
                      grades: { ...studentInfo.grades, _id: e.target.value as string } 
                    })}
                    input={<OutlinedInput label="Grade" />}
                  >
                    {grades?.items?.map((grade) => (
                      <MenuItem key={grade._id} value={grade._id}>
                        {grade.grade}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.grade && <FormHelperText>{errors.grade}</FormHelperText>}
                </FormControl>

                </Grid>
              </Grid>
            )}
            {activeStep === 1 && (
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Kebele"
                    name="kebele"
                    value={studentInfo.address.kebele}
                    onChange={(e) => handleChange(e, 'address')}
                    fullWidth
                    margin="normal"
                    error={!!errors.kebele}
                    helperText={errors.kebele}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Wereda"
                    name="wereda"
                    value={studentInfo.address.wereda}
                    onChange={(e) => handleChange(e, 'address')}
                    fullWidth
                    margin="normal"
                    error={!!errors.wereda}
                    helperText={errors.wereda}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="City"
                    name="city"
                    value={studentInfo.address.city}
                    onChange={(e) => handleChange(e, 'address')}
                    fullWidth
                    margin="normal"
                    error={!!errors.city}
                    helperText={errors.city}
                  />
                </Grid>
              </Grid>
            )}
            {activeStep === 2 && (
              <Grid container spacing={2}>
                <Grid size={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      id="emergency-contact-photo-upload"
                      onChange={(e) => handleFileUpload(e, 'emergency')}
                    />
                    <label htmlFor="emergency-contact-photo-upload">
                      <Avatar
                        src={studentInfo.emergencyContactPhoto || undefined}
                        sx={{
                          width: 100,
                          height: 100,
                          cursor: 'pointer',
                          position: 'relative',
                        }}
                      />
                    </label>
                    {errors.photo && <Typography color="error">{errors.photo}</Typography>}
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Contact Name"
                    name="emergencyContactName"
                    value={studentInfo.emergencyContactName}
                    onChange={(e) => handleChange(e, 'emergency')}
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Relation"
                    name="emergencyContactRelation"
                    value={studentInfo.emergencyContactRelation}
                    onChange={(e) => handleChange(e, 'emergency')}
                    fullWidth
                    margin="normal"
                    error={!!errors.relation}
                    helperText={errors.relation}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Phone Number"
                    name="emergencyContactPhone"
                    value={studentInfo.emergencyContactPhone}
                    onChange={(e) => handleChange(e, 'emergency')}
                    fullWidth
                    margin="normal"
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Grid>
              </Grid>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};
