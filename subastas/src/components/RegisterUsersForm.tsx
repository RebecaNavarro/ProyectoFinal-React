import {
  Button,
  Container,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BadgeIcon from "@mui/icons-material/Badge";
import PasswordIcon from '@mui/icons-material/Password';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { t } from "i18next";
import { useUserRegistry } from "../hooks/useUserRegister";

interface RegisterUsersProps {
  open: boolean;
  onClose: () => void;
}

export const RegisterUsers = ({ open, onClose }: RegisterUsersProps) => {

  const { formik, handleClose } = useUserRegistry(onClose);

  return (
    <>

      <Modal open={open} onClose={() => { }} disableEscapeKeyDown>
        <Container
          maxWidth="xs"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 24,
            padding: 4,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ textAlign: "center", marginBottom: 2, fontWeight: "bold" }}
          >
            Registro de Votantes
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              label={t("registerUser.name")}
              name="name"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.name}
              helperText={formik.touched.name && formik.errors.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              style={{ marginTop: "16px" }}
              label={t("registerUser.password")}
              name="password"
              fullWidth
              type="password"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.password}
              helperText={formik.touched.password && formik.errors.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <FormControl
              style={{ marginTop: "16px" }}
              fullWidth variant="standard"
              sx={{ mb: 2 }}>
              <InputLabel>{t("registerUser.role")}</InputLabel>
              <Select

                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
                startAdornment={
                  <InputAdornment position="start">
                    <ManageAccountsIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="user">{t("registerUser.roleOptions.user")}</MenuItem>
                <MenuItem value="admin">{t("registerUser.roleOptions.admin")}</MenuItem>
              </Select>
              {formik.touched.role && formik.errors.role && (
                <Typography color="error" variant="caption">
                  {formik.errors.role}
                </Typography>
              )}
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              {t("registerUser.submit")}
            </Button>

          </form>
        </Container>
      </Modal>
    </>
  );
};

export default RegisterUsers;
