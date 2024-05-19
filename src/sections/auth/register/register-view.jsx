import * as Yup from 'yup';
import { useState } from 'react';
import { Form, useFormik, FormikProvider } from 'formik';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const userSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleClick = () => {
    const formData = {
      firstName: document.getElementsByName('firstName')[0].value,
      lastName: document.getElementsByName('lastName')[0].value,
      email: document.getElementsByName('email')[0].value,
      password: document.getElementsByName('password')[0].value,
    };
    console.log('Datos del formulario de registro:', formData);
    router.push('/dashboard');
  };

  const renderForm = (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <Stack spacing={3} sx={{ mb: 5 }}>
          <TextField name="firstName" label="Nombre" />
          <TextField name="lastName" label="Apellido" />
          <TextField name="email" label="Correo electrónico" />

          <TextField
            name="password"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" color="info">
          Registrarse
        </LoadingButton>
      </Form>
    </FormikProvider>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 450,
          }}
        >
          <Typography variant="h4">Registrarse</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            ¿Ya tienes una cuenta?
            <Link variant="subtitle2" sx={{ ml: 0.5 }} href="/login">
              Inicia sesión
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
