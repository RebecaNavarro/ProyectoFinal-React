import {
  Container,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
} from "@mui/material";

import { useLogin } from "../hooks/useLogin";


function LoginPage() {
  const { formik } = useLogin();

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      
      <Stack
        sx={{ paddingTop: 2, justifyContent: "center", alignItems: "center" }}
        spacing={2}
        maxWidth={"35%"}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Card sx={{ boxShadow: 3 }}>
            <CardContent
              sx={{
                padding: 4,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  marginY: 2,
                }}
                variant="h5"
                component="h1"
                gutterBottom
              >
                Iniciar Sesión
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                id="name"
                name="name"
                label="Nombre"
                type="text"
                fullWidth
                margin="normal"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
                <TextField
                id="password"
                name="password"
                label="Contraseña"
                type="password"
                fullWidth
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
                
                <Button
                  sx={{
                    marginTop: 2,
                    width: "100%",
                  }}
                  variant="contained"
                  type="submit"
                >
                  Ingresar
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Stack>
      
    </Container>
  );
}

export default LoginPage;
