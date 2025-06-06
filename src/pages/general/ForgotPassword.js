import React from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { useForm } from 'react-hook-form';

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle password reset logic here
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="form-container">
      <Typography variant="h4">Forgot Password</Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        {...register('email', { required: 'Email is required' })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Button type="submit" variant="contained" fullWidth>Reset Password</Button>
      <Link href="/" variant="body2" display="block" textAlign="center">Back to Login</Link>
    </Box>
  );
}

export default ForgotPassword;
