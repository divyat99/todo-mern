import React, { useState, ChangeEvent, KeyboardEvent, ReactElement } from 'react';
import config from 'config';
import profileImg from '../../assets/images/account/Profile.jpg';
import {
  Box,
  Link,
  Paper,
  Stack,
  Button,
  Divider,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
  Grid,
  Input,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useNavigate } from 'react-router-dom';
import { rootPaths } from 'routes/paths';
import Image from 'components/base/Image';
import axios from 'axios';
import logoWithText from '/Logo-with-text.png';

const SignUp = (): ReactElement => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    image: profileImg,
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
 // const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setFormState({
  //       ...formState,
  //       image: URL.createObjectURL(e.target.files[0]), // For preview
  //     });
  //     setImageFile(e.target.files[0]); // Store the actual file
  //   }
  // };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      image: '',
    };

    if (!formState.name) {
      isValid = false;
      newErrors.name = 'Name is required.';
    }

    if (!formState.email) {
      isValid = false;
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      isValid = false;
      newErrors.email = 'Invalid email address.';
    }

    if (!formState.password) {
      isValid = false;
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('password', formState.password);
      // if (imageFile) {
      //   formData.append('image', imageFile); // Append the file object
      // }else{
      //   formData.append('image', profileImg);
      // }

      console.log('FormData being sent:', formData); // Debugging

      const response = await axios.post(`${config.url}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response from server:', response.data); // Debugging

      if (response.data.success) {
        navigate('/authentication/login');
      } else {
        console.error('Registration error:', response.data.msg);
        // Show user-friendly error message
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      // Show user-friendly error message
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <Box component="figure" mb={3} mx="auto" textAlign="center">
        <Link href={rootPaths.homeRoot}>
          <Image src={logoWithText} alt="logo with text" height={60} width={215} />
        </Link>
      </Box>
      <Paper
        sx={{
          py: 6,
          px: { xs: 5, sm: 7.5 },
        }}
      >
        <Stack justifyContent="center" gap={5}>
          <Typography variant="h3" textAlign="center" color="text.secondary">
            Create New Account
          </Typography>
          <Typography variant="h6" fontWeight={500} textAlign="center" color="text.primary">
            Have an account?{' '}
            <Link href="/authentication/login" underline="none">
              Log In
            </Link>
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  label="Name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  type="text"
                  fullWidth
                  sx={{
                    '.MuiFilledInput-root': {
                      bgcolor: 'grey.A100',
                      ':hover': {
                        bgcolor: 'background.default',
                      },
                      ':focus': {
                        bgcolor: 'background.default',
                      },
                      ':focus-within': {
                        bgcolor: 'background.default',
                      },
                    },
                    borderRadius: 2,
                  }}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  label="Email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  type="email"
                  fullWidth
                  sx={{
                    '.MuiFilledInput-root': {
                      bgcolor: 'grey.A100',
                      ':hover': {
                        bgcolor: 'background.default',
                      },
                      ':focus': {
                        bgcolor: 'background.default',
                      },
                      ':focus-within': {
                        bgcolor: 'background.default',
                      },
                    },
                    borderRadius: 2,
                  }}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  label="Password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  sx={{
                    '.MuiFilledInput-root': {
                      bgcolor: 'grey.A100',
                      ':hover': {
                        bgcolor: 'background.default',
                      },
                      ':focus': {
                        bgcolor: 'background.default',
                      },
                      ':focus-within': {
                        bgcolor: 'background.default',
                      },
                    },
                    borderRadius: 2,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          size="small"
                          edge="end"
                          sx={{
                            mr: 2,
                          }}
                        >
                          {showPassword ? (
                            <IconifyIcon icon="el:eye-open" color="text.secondary" />
                          ) : (
                            <IconifyIcon icon="el:eye-close" color="text.primary" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <label htmlFor="image-upload">
                  <Input
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                    id="image-upload"
                    sx={{
                      display: 'none',
                    }}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    fullWidth
                    sx={{
                      height: 56, // Equal height to match other fields
                      bgcolor: 'grey.A100',
                      ':hover': {
                        bgcolor: 'background.default',
                      },
                      borderRadius: 2,
                    }}
                  >
                    Upload Image
                  </Button>
                </label>
                {formState.image && (
                  <Box mt={2}>
                    <img
                      src={formState.image}
                      alt="Uploaded Preview"
                      style={{ width: '10%', height: 'auto' }}
                    />
                  </Box>
                )}
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              sx={{
                fontWeight: 'fontWeightRegular',
                mt: 3,
                height: 56, // Increased height to match image upload button
                bgcolor: 'primary.main',
                ':hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Sign Up
            </Button>
          </form>
          <Typography variant="body1" textAlign="center">
            By creating an account, you agree to our{' '}
            <Link href="#!" underline="none">
              Terms of Service
            </Link>
          </Typography>
          <Divider />
        </Stack>
      </Paper>
    </>
  );
};

export default SignUp;
