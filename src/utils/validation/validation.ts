import * as Yup from 'yup';

// Interface for the signup form
export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  avatar:string;
}
export interface SigninFormValues {
  email: string;
  password: string;
}
// Validation Schema for Signup Form
export const signupValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Validation Schema for Login Form
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});
