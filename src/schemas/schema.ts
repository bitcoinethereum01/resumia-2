import * as yup from 'yup'

/* const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; */

export const userSchema = yup.object().shape({
  name: yup.string().required('A name is required'),
  userName: yup.string(),
  email: yup.string().email().required('An email is required')
});

export const signupSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('An email is required'),
  name: yup.string(),
  fullName: yup.string().required('Your first name is required'),
  password: yup.string()
  .min(8, 'Must have at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain at least one capital letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
  .required('A password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Password must match').required('Please confirm your password')
})

export const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Please enter your email'),
  password: yup.string().min(8).required('A password is required')//.matches(passwordRules, {message: 'Please create a stronger password'})
})