import React, { useState } from 'react';
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
import useCreate from '../../hooks/useCreate';
import { useSnackbar } from '../../context/SnackBarProvider';
import { ArrowBackIos } from '@mui/icons-material';
import { useRouting } from '../../utils/routing';

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
}

interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
  photo: string;
}

interface Grade {
  _id: string;
  grade: string;
}

export const AddStudent: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { data: grades } = useFetchData<Grade[]>('/grade'); // Fetch grades
  const { create} = useCreate();
  const { goTo } = useRouting();
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
  });

  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact>({
    name: '',
    relation: '',
    phone: '',
    photo: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { showMessage } = useSnackbar();
  const steps = ['Student Information', 'Address Information', 'Emergency Contact Information'];

  const handleNext = () => {
    const newErrors: { [key: string]: string } = {};

    // Step validation checks
    if (activeStep === 0) {
      if (!studentInfo.photo) newErrors.photo = 'Photo is required';
      if (!studentInfo.name) newErrors.name = 'Name is required';
      if (!studentInfo.fatherName) newErrors.fatherName = 'Father\'s name is required';
      if (!studentInfo.grandfatherName) newErrors.grandfatherName = 'Grandfather\'s name is required';
      if (!studentInfo.birthdate) newErrors.birthdate = 'Birthdate is required';
      if (!studentInfo.gender) newErrors.gender = 'Gender is required';
      if (!studentInfo.grade) newErrors.grade = 'Grade is required';
    } else if (activeStep === 1) {
      if (!studentInfo.address.kebele) newErrors.kebele = 'Kebele is required';
      if (!studentInfo.address.wereda) newErrors.wereda = 'Wereda is required';
      if (!studentInfo.address.city) newErrors.city = 'City is required';
    } else if (activeStep === 2) {
      if (!emergencyContact.photo) newErrors.photo = 'Photo is required';
      if (!emergencyContact.name) newErrors.name = 'Contact name is required';
      if (!emergencyContact.relation) newErrors.relation = 'Relation is required';
      if (!emergencyContact.phone) newErrors.phone = 'Phone number is required';
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
      await create('/student', {
        photo: studentInfo.photo,
        name: studentInfo.name,
        fatherName: studentInfo.fatherName,
        grandfatherName: studentInfo.grandfatherName,
        birthdate: studentInfo.birthdate,
      
        gender: studentInfo.gender,
        emergencyContactName: emergencyContact.name,
        emergencyContactRelation: emergencyContact.relation,
        emergencyContactPhone: emergencyContact.phone,
        emergencyContactPhoto: emergencyContact.photo,
        grades: studentInfo.grade,
        address: {
          kebele: studentInfo.address.kebele,
          wereda: studentInfo.address.wereda,
          city: studentInfo.address.city,
        },
      });
      showMessage('Student added successfully', 'success');

  
      setStudentInfo({
        photo: '',
        name: '',
        fatherName: '',
        grandfatherName: '',
        birthdate: '',
        gender: '',
        grade: '',
        address: { kebele: '', wereda: '', city: '' },
      });
      setEmergencyContact({
        name: '',
        relation: '',
        phone: '',
        photo: '',
      });
      setActiveStep(0);
    } catch (error) {
      showMessage('Failed to add student', 'error');
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { value: unknown }>,
    section: 'student' | 'emergency' | 'address'
  ) => {
    const { name, value } = event.target;

    if (section === 'student') {
      if (name === 'grade') {
        setStudentInfo({ ...studentInfo, [name]: value as string });
      } else {
        setStudentInfo({ ...studentInfo, [name]: value });
      }
    } else if (section === 'address') {
      setStudentInfo({ ...studentInfo, address: { ...studentInfo.address, [name]: value } });
    } else if (section === 'emergency') {
      setEmergencyContact({ ...emergencyContact, [name]: value });
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
        setEmergencyContact({ ...emergencyContact, photo: reader.result as string });
      }
      
    };
    if (file) {
      reader.readAsDataURL(file);
      setErrors({ ...errors, 'photo': '' });
    }
  };

  return (
    <Box> 
    <Button variant='contained' startIcon={<ArrowBackIos/>} onClick={()=>goTo('/student')}>Back</Button>
     <Divider sx={{mt:2}}/>
    <Container sx={{ width: '100%',backgroundColor:'#fff',borderRadius:4,p:5,mt: 1 }} >
      <Stepper activeStep={activeStep} alternativeLabel sx={{width:'100%'}}>
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
              <Grid size={12} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
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
              <Grid size={{xs:12, md :4}}>
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
              <Grid size={{xs:12, md :4}}>
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
              <Grid size={{xs:12, md :4}}>
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
              <Grid size={{xs:12,md:6}}>
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
                    InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{xs:12,md:6}}>
              <TextField
                label="Gender"
                name="gender"
                value={studentInfo.gender}
                onChange={(e) => handleChange(e, 'student')}
                fullWidth
                margin="normal"
                select
                error={!!errors.gender}
                helperText={errors.gender}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
              </Grid>
              <FormControl fullWidth margin="normal" error={!!errors.grade}>
                <InputLabel>Select Grade</InputLabel>
                <Select
                  name="grade"
                  value={studentInfo.grade}
                  onChange={(e) => handleChange(e, 'student')}
                  input={<OutlinedInput label="Select Grade" />}
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
          )}
          {activeStep === 1 && (
            <Grid container spacing={2} >
               <Grid size={12}>
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
              <Grid size={12}>
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
               <Grid size={12}>
                 <TextField
                  label="Kebele"
                name="kebele"
                value={studentInfo.address.kebele}
                onChange={(e) => handleChange(e, 'address')}
                fullWidth
                margin="normal"
                error={!!errors.kebele}
                  helperText={errors.kebele}/>
               </Grid>
              </Grid>
          )}
          {activeStep === 2 && (
           <Grid container spacing={2}>
             <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  id="emergency-photo-upload"
                  onChange={(e) => handleFileUpload(e, 'emergency')}
                />
                <label htmlFor="emergency-photo-upload">
                  <Avatar
                    src={emergencyContact.photo || undefined}
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
            <Grid size={12}>
              <TextField
                label="Contact Name"
                name="name"
                value={emergencyContact.name}
                onChange={(e) => handleChange(e, 'emergency')}
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
          <Grid size={12}>
              <TextField
                label="Relation"
                name="relation"
                value={emergencyContact.relation}
                onChange={(e) => handleChange(e, 'emergency')}
                fullWidth
                margin="normal"
                error={!!errors.relation}
                helperText={errors.relation}
              />
          </Grid>
          <Grid size={12}>
              <TextField
                label="Phone"
                name="phone"
                value={emergencyContact.phone}
                onChange={(e) => handleChange(e, 'emergency')}
                fullWidth
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            </Grid> 
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Box>
      )}
    </Container>
    </Box>
  );
};
