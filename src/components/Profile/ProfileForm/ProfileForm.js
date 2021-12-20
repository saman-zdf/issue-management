import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useStyles } from './ProfileFormStyle';
import { createProfile } from '../../../apiServices/ProfileApi';
import { useGlobalContext } from '../../../contextReducer/Context';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { uploadProfileImage } from '../../../apiServices/ProfileApi';
import ProfileInput from './ProfileInput';

const ProfileForm = () => {
  const navigate = useNavigate();
  const [createdProfile, setCreatedProfile] = useState({});
  const { state, dispatch } = useGlobalContext();

  const classes = useStyles();
  const { user } = state;
  if (state.user.error && state.user.error.code) {
    navigate('/login');
  } else if (state.userProfile) {
    navigate('/issues');
  }
  // check if state is on updateMode
  const [isFetching, setIsFetching] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [profileImageInput, setProfileImageInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsFetching(true);
    data.userId = (user && user.uid) || '';
    uploadProfileImage({ image: profileImageInput })
      .then((imageData) => {
        data.image = imageData && imageData.image.src;
        createProfile(data)
          .then((formData) => setCreatedProfile(formData))
          .catch((err) => console.log(err));
        if (state.userProfile === undefined) {
          localStorage.setItem('profile', JSON.stringify(data));
        }
        navigate('/issues');
        console.log(createdProfile);
        setIsFetching(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (state.user) {
      const match = state.profiles.filter(
        (profile) => profile.userId === state.user.uid
      );
      dispatch({ type: 'CURRENT_PROFILE', data: match[0] });
      localStorage.setItem('profile', JSON.stringify(match[0]));
    }
  }, [state.user, state.userProfile]);

  return (
    <>
      <Box>
        <Typography variant='h3' align='center' className={classes.heading}>
          Profile
        </Typography>
        <form autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container spacing={3}>
                <ProfileInput
                  icons={<PersonOutlineIcon />}
                  register={register}
                  label='Name'
                  name='fullName'
                  type='text'
                  errors={errors}
                  errorMessage="Name can't be blank"
                  xs={12}
                  md={12}
                  size={3}
                  classes={classes.icon}
                />

                <ProfileInput
                  icons={<ImportContactsIcon />}
                  register={register}
                  label='Address'
                  name='address'
                  type='text'
                  errors={errors}
                  errorMessage="Address can't be blank"
                  xs={12}
                  md={12}
                  size={5}
                />

                <ProfileInput
                  icons={<ImportContactsIcon />}
                  register={register}
                  label='Emergency Contact'
                  name='emergencyContact'
                  type='text'
                  errors={errors}
                  errorMessage="Emergency Contact can't be blank"
                  xs={12}
                  md={12}
                  size={3}
                />

                <ProfileInput
                  icons={<LocalPhoneIcon />}
                  register={register}
                  label='Phone Number'
                  name='mobilePhone'
                  type='tel'
                  placeholder='0470555555'
                  errors={errors}
                  errorMessage="Phone number can't be blank and must contain only numbers"
                  xs={12}
                  md={6}
                />

                <ProfileInput
                  icons={<PermContactCalendarIcon />}
                  register={register}
                  label='D.O.B'
                  name='dateOfBirth'
                  type='date'
                  errors={errors}
                  errorMessage="D.O.B can't be blank"
                  xs={12}
                  md={6}
                />
                <Grid item md={12} xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      p: 2,
                    }}
                  >
                    <Button
                      color='primary'
                      variant='contained'
                      className={classes.button}
                      style={{ marginLeft: '5px', backgroundColor: '#6787E3' }}
                    >
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(e) =>
                          setProfileImageInput(e.target.files[0])
                        }
                      />
                    </Button>
                    <Button
                      color='primary'
                      variant='contained'
                      style={{ marginLeft: '5px', backgroundColor: '#6787E3' }}
                      type='submit'
                    >
                      {isFetching ? 'Wait...' : 'Create'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
          </Card>
        </form>
      </Box>
    </>
  );
};

export default ProfileForm;
