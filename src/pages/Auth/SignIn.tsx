import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import { useUserStore } from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';

import { loginValidationSchema, SigninFormValues } from '../../utils/validation/validation';
const theme = createTheme();
  const SignIn: React.FC = () => {
  const { loginUser, isLoading, error, resetError } = useUserStore();
  const navigate = useNavigate();
  const formik = useFormik<SigninFormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginValidationSchema, // Use the imported schema
    onSubmit: async (values, { resetForm }) => {
      await loginUser(values, () => navigate('/'));
      //resetForm(); // Reset the form after successful submission
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          {/* {error && (
        <FormHelperText error>{error}</FormHelperText>
      )} */}
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? 'Logging In...' : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
