import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormHelperText from '@mui/material/FormHelperText';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import { useUserStore } from '../../store/useUserStore';
import { signupValidationSchema, SignupFormValues } from '../../utils/validation/validation'; // Import the validation schema and interface
const theme = createTheme();
const SignUp: React.FC = () => {
  const { registerUser, isLoading, error, resetError } = useUserStore();
  const formik = useFormik<SignupFormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      avatar:''
    },
    validationSchema: signupValidationSchema, // Use the imported schema
    onSubmit: async (values, { resetForm }) => {
      values.avatar = "https://i.imgur.com/yhW6Yw1.jpg";
      await registerUser(values);
      resetForm(); // Reset the form after successful submission
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
            Sign Up
          </Typography>
          {/* {error && (
        <FormHelperText error>{error}</FormHelperText>
      )} */}
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <label>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </label>
            <label>
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
           
            </label>
            <label>
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
           
             </label>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
               size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? 'Registering...' : 'Sign Up'}
            </Button>
          </Box>
          {/* Error Handling */}
        
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
