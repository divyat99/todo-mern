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
  CircularProgress,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useState, ReactElement, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CryptoJs from "crypto-js";
import config from 'config';
import { encryptLocalStorageData, toastifyError, toastifySuccess } from "../../Utility/Utility";
import { rootPaths } from 'routes/paths';
import Image from 'components/base/Image';
import logoWithText from '/Logo-with-text.png';

// Define the structure of the state
interface ValueState {
  email: string;
  password: string;
}

interface ErrorState {
  email?: string;
  password?: string;
}

const Login = (): ReactElement => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [value, setValue] = useState<ValueState>({ email: '', password: '' });
  const [error, setError] = useState<ErrorState>({});
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });

    setError({
      ...error,
      [e.target.name]: '',
    });
  };

  const encryptData = (data: any, key: string): string => {
    return CryptoJs.AES.encrypt(JSON.stringify(data), key).toString();
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: ErrorState = {};

    if (!value.email) {
      isValid = false;
      newErrors.email = 'Please enter a valid email address.';
    } else if (!/\S+@\S+\.\S+/.test(value.email)) {
      isValid = false;
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!value.password) {
      isValid = false;
      newErrors.password = 'Please enter your password.';
    }

    setError(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true); // Show loader
    try {
      const res = await axios.post(`${config.url}/login`, value);
      if (res.status === 200) {
        const { token, user } = res.data;
        const dataParam = {
          token,
          login_id: user._id,
          name: user.name,
          image: user.image,
          email: user.email,
        };
        encryptLocalStorageData('web-secret', dataParam, 'DoNotTryToAccess');
        toastifySuccess('Login successful!');
        setTimeout(() => navigate(rootPaths.homeRoot), 2000);
      } else {
        toastifyError('Something went wrong!');
      }
    } catch (error: any) {
      console.error(error);
      toastifyError(error?.response?.data?.message || 'An error occurred while logging in.');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
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
            Log In
          </Typography>
          <Typography variant="h6" fontWeight={500} textAlign="center" color="text.primary">
            Don’t have an account?{' '}
            <Link href="/authentication/sign-up" underline="none">
              Sign up
            </Link>
          </Typography>
          <TextField
            variant="filled"
            label="Email"
            name="email"
            value={value.email}
            onChange={handleChange}
            type="email"
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
            helperText={error.email}
            error={!!error.email}
          />
          <TextField
            variant="filled"
            label="Password"
            name="password"
            value={value.password}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
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
                    onClick={handleClickShowPassword}
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
            helperText={error.password}
            error={!!error.password}
          />
          <Button
            onClick={handleSubmit}
            sx={{
              fontWeight: 'fontWeightRegular',
              position: 'relative', // Make sure the spinner is positioned relative to the button
              width: '100%',
            }}
            disabled={loading} // Disable button while loading
          >
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-12px',
                  marginTop: '-12px',
                }}
              />
            )}
            Log In
          </Button>
          <Divider />
        </Stack>
      </Paper>
    </>
  );
};

export default Login;
