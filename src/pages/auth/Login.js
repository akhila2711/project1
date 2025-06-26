import React, { useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Paper,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, isLoading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = (data) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (user) {
      if (user.role === 'Admin') navigate('/admin/dashboard');
      else if (user.role === 'Manager') navigate('/manager/assigned-projects');
      else if (user.role === 'Engineer') navigate('/engineer');
      else if (user.role === 'Client') navigate('/client');
      else navigate('/');
    }
  }, [user, navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #e3f0ff 0%, #f8fdff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 5,
          maxWidth: 400,
          width: '100%',
          boxShadow: 8,
          background: 'linear-gradient(120deg, #fff 60%, #e3f0ff 100%)'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 2
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
          <Typography variant="h4" fontWeight={700} sx={{ color: '#1976d2', letterSpacing: 1 }}>
            Login
          </Typography>
        </Box>
        {error && (
          <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon color="primary" />
                </InputAdornment>
              )
            }}
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <FormControlLabel
            control={<Checkbox {...register('rememberMe')} />}
            label="Remember Me"
            sx={{ mt: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 2,
              py: 1.3,
              fontWeight: 700,
              fontSize: 18,
              background: 'linear-gradient(90deg, #1976d2 60%, #26c6da 100%)'
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Link to="/forgot-password" style={{ color: '#1976d2', fontWeight: 500, textDecoration: 'none' }}>
              Forgot Password?
            </Link>
            <Link to="/register" style={{ color: '#1976d2', fontWeight: 500, textDecoration: 'none' }}>
              Register
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;