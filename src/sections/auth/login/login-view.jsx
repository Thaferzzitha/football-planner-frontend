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

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const userSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleClick = () => {
    const formData = {
      email: document.getElementsByName('email')[0].value,
      password: document.getElementsByName('password')[0].value,
    };
    console.log('Datos del formulario de iniciar sesión:', formData);
    router.push('/dashboard');
  };

  const renderForm = (
      <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField name="email" label="Correo electrónico" />
        {formik.touched.email && formik.errors.email ? (
          <Typography variant="body2" color="error">
              {formik.errors.email}
            </Typography>
          ) : null}
          
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
        {formik.touched.password && formik.errors.password ? (
          <Typography variant="body2" color="error">
              {formik.errors.password}
          </Typography>
        ) : null}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          ¿Olvidaste tu contraseña?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="info" onClick={handleClick}>
        Iniciar Sesion
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
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Iniciar Sesión</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            ¿Aún no tienes una cuenta?
            <Link variant="subtitle2" sx={{ ml: 0.5 }} href="/register">
              Registrarse
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
